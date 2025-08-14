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
  if(!validateEditProfileData(req)){
    throw new Error("invalid edit request")
  }

  const loggedInUser = req.user;

  Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
  await loggedInUser .save();
 
  res.json({
    message: `${loggedInUser} , your profile is updated`,
    data: loggedInUser
  })
}catch(err){
  res.status(400).send("error")
}
})


//make forgot password api


module.exports = profileRouter;