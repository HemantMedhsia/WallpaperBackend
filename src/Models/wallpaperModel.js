import mongoose from "mongoose";

const wallpaperSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            trim: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin", // Assuming only admins can upload wallpapers
            required: true,
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        hide: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);
export default Wallpaper;
