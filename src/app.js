const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const {User} = require("./models/user");

app.use(express.json())
app.post("/signup",async (req,res)=>{

    console.log(req.body)
    const user = new User(req.body);

    try{
    await user.save();
    res.send("User added successfully");
    } catch(err){
        res.status(400).send("error saving the user")
    }
})

connectDB().then(()=>{
    console.log("database connected");
    app.listen(3000,()=>{
    console.log("server started")
})
}).catch((err)=>{
    console.error("something went wrong")
})
