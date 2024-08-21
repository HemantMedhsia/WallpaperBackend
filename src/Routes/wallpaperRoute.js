import express from 'express';
import { uploadWallpaper } from '../Controllers/wallpaperController.js';
import { upload } from '../Middlewares/multerMiddleware.js';
const router = express.Router();



router.post("/uploadwallpaper",upload.single("file"),uploadWallpaper);




export default router;