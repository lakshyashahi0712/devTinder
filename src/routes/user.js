const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();


userRouter.get("/user/requests/received" , userAuth , async(req,res)=>{

try{

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
            }).populate("fromUserId", "firstName lastName age gender skills about photoUrl")

    //}).populate("fromUserId",["firstName" , "lasttName"])

    res.json({
        messagee: "data fetched successfully" , 
        data: connectionRequests
    })

}catch(err){
    res.status(404).send("ERROR: " + err.message)
}
})

userRouter.get("/user/connections" , userAuth , async(req,res)=>{

    try
    {const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        $or:[
            {toUserId: loggedInUser._id , status: "accepted"},
            {fromUserId: loggedInUser._id , status:"accepted"}
        ]
    }).populate("fromUserId" , "firstName lastName age gender skills about photoUrl").populate("toUserId" , "firstName lastName age gender skills about photoUrl");

    const data = connectionRequests.map(row => {
        if(row.toUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
    });

    res.json({data})
}catch(err){
    res.status(404).send("ERROR: " + err.message)
}
})

module.exports = userRouter