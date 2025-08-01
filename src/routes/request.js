
const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter  = express.Router();

requestRouter.get("/sendConnectionRequest",userAuth,async(requestRouter,res)=>{
    const user = req.user;

    res.send(user.firstName + " sent therequest");
})

module.exports = requestRouter