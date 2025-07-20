const express = require("express");

const app = express();
//const {adminAuth, userAuth } = require("./middleware/auth")

// using this url http://localhost:3000/user?userId=100&name=lak will give in console userId=100  name=lak
// app.get("/user",(req,res,next)=>{
//     console.log("1st route")
//     //res.send("get call from user");

//     next();
// },(req,res,next)=>{
// console.log("2nd route")
// res.send("2nd response")
// })


// app.get("/admin",adminAuth);
// app.use("/admin/getAllData",adminAuth,(req,res)=>{
//     res.send("hello from getalldata")
// })

// app.use("/user/login",(req,res)=>{
//     res.send("please login with your details")
// })
// app.use("/user",userAuth,(req,res)=>{
//     res.send("user here");
// })
























// using this url http://localhost:3000/user/100/lak will give in console userid:100 and name:lak 
// app.get("/user/:userId/:name",(req,res)=>{
//     console.log(req.params);--
//     res.send("get call from user");
// })
// app.get("/user",(req,res)=>{
//     res.send("get call from user");
// })


//code for error handling
app.use("/user",(req,res,next)=>{
    throw new Error(",hfkgc")
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
})


app.listen(3000,()=>{
    console.log("server started")
})