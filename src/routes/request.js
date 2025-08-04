
const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");

const requestRouter  = express.Router();

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
    
    res.json({
        message: req.user.firstName+ " is " + status + " in " + toUser.firstName
    })
}catch(err){
    res.status(404).send("error in sending connection request")
}
})

module.exports = requestRouter