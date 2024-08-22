import Wallpaper from "../Models/wallpaperModel.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import fs from "fs";
import wrapAsync from "../Utils/wrapAsync.js";

export const uploadWallpaper = wrapAsync(async (req, res) => {
    if(!req.file) {
        return res.status(400).send("no file uploaded");
    }
    console.log("this is my req.body ",req.body);
    console.log("this is my req.file ",req.file);
    const filePath = req.file.path; // File path after multer processes it
    const cloudinaryResponse = await uploadOnCloudinary(filePath);
    

    if (!cloudinaryResponse) {
        return res
            .status(500)
            .json({ message: "Failed to upload image to Cloudinary" });
    }

    const wallpaper = new Wallpaper({
        title: req.body.title,
        url: cloudinaryResponse.secure_url,
        category: req.body.category,
        uploadedBy: req.body.adminId, // Assuming adminId is passed in the request body
        isPremium: req.body.isPremium || false,
        hide: req.body.hide || false,
    });

    await wallpaper.save();
    res.status(201).json({
        message: "Wallpaper uploaded successfully",
        wallpaper,
    });
});








