const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const {userAuth} = require("./middleware/auth")
const {validateSignUpData} = require("./utils/validate")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

const app = express();
console.log("✅ App instance created");

app.use(express.json());
app.use(cookieParser());
console.log("✅ Middleware added");


app.post("/signup" , async(req,res)=>{
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


app.post("/login",async(req,res)=>{
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


app.get("/profile",userAuth, async(req,res)=>{
  try{
    const user = req.user
    res.send(user);
  }catch(err){

    res.status(404).send("error")
  }
})


app.get("/user",async(req,res)=>{
  const userEmail = req.body.email;

  try{
    console.log(userEmail);
    const user = await User.findOne({email:userEmail});
    if(!userEmail){
      res.status(404)
    }else{
      res.send(user);
    }
  }catch(err){
    res.status(400).send("something went wrong")
  }
})


//update data of user
app.patch("/user/:userId", async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;

  try{
const ALLOWED_UPDATES = ["photoUrl", "about","gender","age","skills"];

const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
if (!isUpdateAllowed){
 throw new Error("update not allowed")
}
if(data?.skills.length > 10){
  throw new Error("skills cannot exceed 10")
}
    const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after" , runValidators:true});
    console.log(user);
    res.send("user updated success")
  } catch(err){
    res.status(400).send("update failed" + err.message)
  }
})


//code to delete daata from databse
app.delete("/user", async(req,res)=>{
  const userId = req.body.userId;

  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully")
  } catch(err){
    res.status(400).send("Error saving the user");
  }
})



console.log("🧠 Connecting to DB...");
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(3000, () => {
      console.log("🚀 Server started on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
