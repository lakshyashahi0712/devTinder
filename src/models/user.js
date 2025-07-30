const mongoose = require("mongoose");
const validator = require("validator")
const jwt  = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName : {
        type : String,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required:true,
        unique:true,
        minLength: 3,
        maxLength: 50,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email:" + value)
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min: 18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("invalid gender")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid email:" + value)
            }
        }
    },
    about:{
        type:String,
        default:"this is defalt about of user"
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true
}
)

userSchema.methods.getJWT = async function() {
    
    const user = this;

    const token = await jwt.sign({_id:user._id},"DEV@TINDER", {expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
    
}

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}