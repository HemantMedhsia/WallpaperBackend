import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = process.env.NODE_ENV === "production" ? "/tmp" : path.join(__dirname, "../public/temp");

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Ensure the path is correct
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage: storage });
