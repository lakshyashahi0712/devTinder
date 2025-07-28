const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();
console.log("✅ App instance created");

app.use(express.json());
console.log("✅ Middleware added");



app.post("/signup" , async(req,res)=>{
  const user = new User(req.body);
  try{
    await user.save();
    res.send("user added successfully");
  }catch(err){
    res.status(400).send("error saving the user" + err.message);
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

// // Test root route to confirm server is alive
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Signup route
// app.post("/signup", async (req, res) => {
//   console.log("📩 POST /signup hit");
//   const user = new User(req.body);
//   try {
//     await user.save();
//     res.send("User added successfully");
//   } catch (err) {
//     console.error("❌ Error saving user:", err.message);
//     res.status(400).send("Error saving the user");
//   }
// });

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
