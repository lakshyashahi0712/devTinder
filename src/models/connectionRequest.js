const mongoose = require("mongoose");

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required: true
    },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId , 
         ref:"User",
        required : true
    },
    status:{
        type : String,
        enum : {
            values: ["ignore","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        } 
    }
},
{
    timestamps: true
});

connectionRequestSchema.index({fromUserId:1 , toUserId:1});// this is called index which make the app faster 

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel" , connectionRequestSchema);

module.exports = ConnectionRequestModel