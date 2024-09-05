import Wallpaper from "../Models/wallpaperModel.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import cloudinary from "cloudinary";
import fs from "fs";
import wrapAsync from "../Utils/wrapAsync.js";
import { errorHandler } from "../Utils/errorHandler.js";
import { ApiResponse } from "../Utils/responseHandler.js";

export const uploadWallpaper = wrapAsync(async (req, res) => {
    if (!req.file) {
        throw new errorHandler(400, "No file uploaded");
    }
    const filePath = req.file.path; // File path after multer processes it
    const cloudinaryResponse = await uploadOnCloudinary(filePath);

    if (!cloudinaryResponse) {
        throw new errorHandler(500, "Failed to upload image to Cloudinary");
    }

    const wallpaper = new Wallpaper({
        title: req.body.title,
        url: cloudinaryResponse.secure_url,
        category: req.body.category,
        uploadedBy: req.body.adminId, // Assuming adminId is passed in the request body
        isPremium: req.body.isPremium || false,
        hide: req.body.hide || false,
    });

    const saveWallpaper = await wallpaper.save();
    res.status(201).json(
        new ApiResponse(201, saveWallpaper, "Wallpaper uploaded successfully")
    );
});

export const getWallpaper = wrapAsync(async (req, res) => {
    const wallpaper = await Wallpaper.find();
    res.status(200).json(
        new ApiResponse(200, wallpaper, "All wallpapers fetched successfully")
    );
});

export const getWallpaperById = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const wallpaper = await Wallpaper.findById(id);
    if (!wallpaper) {
        throw new errorHandler(404, "Wallpaper not found");
    }
    res.status(200).json(
        new ApiResponse(200, wallpaper, "Wallpaper fetched successfully")
    );
});

export const deleteWallpaper = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const wallpaper = await Wallpaper.findById(id);
    if (!wallpaper) {
        throw new errorHandler(404, "Wallpaper not found");
    }

    const deleteWallpaper = await Wallpaper.findByIdAndDelete(id);
    if (!deleteWallpaper) {
        throw new errorHandler(500, "Failed to delete wallpaper");
    }

    const publicId = wallpaper.url.split("/").pop().split(".")[0];

    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Cloudinary deletion error:", error);
    }

    res.status(200).json(
        new ApiResponse(200, deleteWallpaper, "Wallpaper deleted successfully")
    );
});
