const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: 'dzovfqenj', 
  api_key: '554147881716912', 
  api_secret: 'b4BmsCH9h3ZH7DVE1eA2fpureqU'
});

const uploadOnCloudinary = async(localFilePath)=>{

    try{

        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath , {
           resource_type: "auto"
        })
        console.log("file uploade successfuly" , response.url);
        return response
    }catch{
        fs.unlinkSync(localFilePath);
        return null;
    }
}
module.exports = uploadOnCloudinary;
