import express from 'express';
import { getWallpaper, getWallpaperById, uploadWallpaper } from '../Controllers/wallpaperController.js';
import { upload } from '../Middlewares/multerMiddleware.js';
const router = express.Router();



router.post("/uploadwallpaper",upload.single("file"),uploadWallpaper);
router.get("/allwallpaper",getWallpaper);
router.get("/wallpaper/:id", getWallpaperById);





export default router;