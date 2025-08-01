const express = require("express");
const authRouter = express.Router();
const { User } = require("../models/user");
const {validateSignUpData} = require("../utils/validate")
const bcrypt = require("bcrypt")


authRouter.post("/signup" , async(req,res)=>{
try{
  //validation of data
  validateSignUpData(req);

  const {firstName , lastName , email , password} = req.body;

  //encrypt password
  const paswordHash = await bcrypt.hash(password,10);
  console.log(paswordHash);

  //creating new instance for user model
  const user = new User({firstName , lastName , email , password:paswordHash})

    await user.save();
    res.send("user added successfully");
  }catch(err){
    res.status(400).send("error saving the user" + err.message);
  }
})


authRouter.post("/login",async(req,res)=>{
  try{
  const {email,password} = req.body;

  const user = await User.findOne({email:email});
  if(!user){
    throw new Error("invalid credintials");
  }
  const isPasswordValid = await user.validatePassword(password);
  if(isPasswordValid){
    //CREATE A JWT TOKEN
    const token = await user.getJWT();
   
   
    //add token to cookie and send response back to user 
    res.cookie("token",token);
    res.send("login success")
  } else{
    throw new Error("invalid credintials")
  }
}catch(err){
  res.status(400).send("error saving the user" + err.message);
}
})


authRouter.post("/logout", (req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  res.send("logout successfully")
})

module.exports = authRouter