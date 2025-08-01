const validator = require("validator")

const validateSignUpData =(req)=>{

    const {firstName , lastName , email , password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter valid name");
    } else if(!validator.isEmail(email)){
        throw new Error("Enter valid email")
    }
}

const validateEditProfileData = (req)=>{

    const AllowedEditFields = ["firstName","lastName","email","about","gender","age","photoUrl","skills"];

    const isEditAllowed = Object.keys(req.body).every((field)=> AllowedEditFields.includes(field))

    return isEditAllowed;

}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}