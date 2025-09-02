const express = require("express");
const upload = require("../middleware/multer");
const uploadOnCloudinary = require("../utils/cloudinary");
const { userAuth } = require("../middleware/auth");

const uploadRouter = express.Router();

uploadRouter.post("/upload-image", userAuth, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }

        // Upload to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        
        if (!cloudinaryResponse) {
            return res.status(500).json({ error: "Failed to upload image to cloud" });
        }

        // Return the secure URL
        res.json({
            message: "Image uploaded successfully",
            imageUrl: cloudinaryResponse.secure_url
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Internal server error during upload" });
    }
});

module.exports = uploadRouter;