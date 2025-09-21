
const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");
const {run } = require("../utils/mailer");
const { testCronJob } = require("../utils/cronjob");


const requestRouter  = express.Router();

// Test email endpoint
requestRouter.post("/test-email", userAuth, async (req, res) => {
  try {
    const testResult = await run(
      "Test Email from DevTinder",
      "This is a test email to verify your mailer configuration is working!",
      req.user.email
    );
    
    res.json({
      message: "Test email sent successfully!",
      messageId: testResult.messageId
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send test email",
      details: error.message
    });
  }
});

// Test cron job endpoint
requestRouter.post("/test-cron", userAuth, async (req, res) => {
  try {
    const emailList = await testCronJob();
    
    res.json({
      message: "Cron job test completed!",
      emailsFound: emailList || [],
      count: emailList ? emailList.length : 0
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to test cron job",
      details: error.message
    });
  }
});

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested" , "ignored"];
    if(!allowedStatus.includes(status)){
        return res.json({
            message: `${status} status is not valid`
        })
    };
    if(fromUserId.equals(toUserId)){
        return res.status(404).send("cannot send request to yourself")
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId , toUserId},
            {fromUserId:toUserId , toUserId:fromUserId},
        ]
    });
    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({
            message: "user not found"
        })
    }
    if(existingConnectionRequest){
        return res
        .status(404).send("connection request already exists")
    }
    
    const connectionRequest = new ConnectionRequest ({
        fromUserId,
        toUserId,
        status
    })
   
    const data = await connectionRequest.save();

    try {
      await run(
        "New Connection Request",
        `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        toUser.email
      );
      console.log("✅ Email notification sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send email notification:", emailError.message);
      // Don't fail the request if email fails
    }

    res.json({
        message: req.user.firstName+ " is " + status + " in " + toUser.firstName ,
        data
    })
}catch(err){
    res.status(404).send("error in sending connection request")
}
})


requestRouter.post("/request/review/:status/:requestId" , userAuth , async(req,res)=>{

    try
    {const loggedInUser = req.user;
    const { status,requestId} = req.params;
    const allowedStatus = ["accepted" , "rejected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"status not allowed"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    });
    if(!connectionRequest){
        res.status(404).json({
            message:"connection request not found"
        })
    }
    connectionRequest.status = status;
    const data =  await connectionRequest.save();
    res.json({message:"connection request " + status  , 
        data
    })} catch(err){
        res.status(400).send("ERROR" + err.message);
    }
}) 



module.exports = requestRouter