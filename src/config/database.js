const mongoose = require("mongoose");

 const connectDB = async()=>{

    await mongoose.connect("mongodb+srv://lakshyashahi0712:lakshyashahi0712@cluster0.6j7dqek.mongodb.net/devTinder")

}



module.exports = {connectDB}