import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error("File does not exist at the provided path");
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "wallpapers",
            use_filename: true,
            unique_filename: false,
            overwrite: true
        });

        console.log("Upload successful:", response);
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
};

export {uploadOnCloudinary};