const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send("get call from user");
})

app.post("/user",(req,res)=>{
    res.send("post call from user");
})

app.delete("/user",(req,res)=>{
    res.send("delete call from user");
})

app.patch("/user",(req,res)=>{
    res.send("patch call from user");
})

app.head("/user",(req,res)=>{
    res.send("head call from user");
})



app.use("/test/hello",(req,res)=>{
    res.send("hello from hello")
})

app.listen(3000,()=>{
    console.log("server started")
})