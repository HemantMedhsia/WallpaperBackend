import Wallpaper from "../Models/wallpaperModel.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import fs from "fs";
import wrapAsync from "../Utils/wrapAsync.js";

export const uploadWallpaper = wrapAsync(async (req, res) => {
    console.log(req.body);
    console.log(req.file);
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
    });

    await wallpaper.save();
    res.status(201).json({
        message: "Wallpaper uploaded successfully",
        wallpaper,
    });
});








