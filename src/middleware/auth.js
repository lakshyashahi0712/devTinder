const jwt = require("jsonwebtoken");
const {User} = require("../models/user")

const userAuth = async(req,res,next)=>{
   
    const cookies = req.cookies;

    const {token} = cookies;
    if(!token){
return res.status(401).send("Please Login")
    }

    const decodedObj = await jwt.verify(token,"DEV@TINDER")

    const {_id} = decodedObj;
    //console.log("logged in user is: " + _id);

    const user = await User.findById(_id);
    if(!user){
      throw new Error("user not exist");
    }
    req.user = user
    next();
}

module.exports = {
    userAuth
}