import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, '../public/temp');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("this is my file name :", uploadPath);
        cb(null, uploadPath); // Ensure the path is correct
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + '-' + file.originalname);
        console.log("this is my file name :", file.originalname);
        cb(null, file.originalname);
    }, 
});

export const upload = multer({ storage: storage });