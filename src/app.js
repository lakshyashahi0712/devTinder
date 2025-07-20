const express = require("express");

const app = express();

// using this url http://localhost:3000/user?userId=100&name=lak will give in console userId=100  name=lak
app.get("/user",(req,res,next)=>{
    console.log("1st route")
    //res.send("get call from user");

    next();
},(req,res,next)=>{

console.log("2nd route")
res.send("2nd response")

})
// using this url http://localhost:3000/user/100/lak will give in console userid:100 and name:lak 
// app.get("/user/:userId/:name",(req,res)=>{
//     console.log(req.params);
//     res.send("get call from user");
// })
// app.get("/user",(req,res)=>{
//     res.send("get call from user");
// })


app.listen(3000,()=>{
    console.log("server started")
})