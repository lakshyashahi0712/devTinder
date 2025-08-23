const {userAuth} = require("../middleware/auth")


const express = require("express");
const { validateEditProfileData } = require("../utils/validate");
const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, async(req,res)=>{
  try{
    const user = req.user
    res.send(user);
  }catch(err){

    res.status(404).send("error")
  }
})

profileRouter.patch("/profile/edit", userAuth , async(req,res)=>{

  try{
    console.log("👉 Incoming PATCH body:", req.body);
  if(!validateEditProfileData(req)){
    throw new Error("Invalid edit request - only allowed fields: firstName, lastName, email, about, gender, age, photoUrl, skills")
  }

  const loggedInUser = req.user;

  Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
  await loggedInUser.save();
 
  res.json({
    message: `${loggedInUser.firstName}, your profile is updated`,
    data: loggedInUser
  })
}catch(err){
  console.error("❌ Profile edit error:", err.message);
  res.status(400).json({ error: err.message })
}
})


//make forgot password api


module.exports = profileRouter;