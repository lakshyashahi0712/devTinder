const mongoose = require("mongoose");

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId , 
        required: true
    },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId , 
        required : true
    },
    status:{
        type : String,
        enum : {
            values: ["ignore","interested","accepeted","rejected"],
            message: `{VALUE} is incorrect status type`
        } 
    }
},
{
    timestamps: true
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel" , connectionRequestSchema);

module.exports = ConnectionRequestModel