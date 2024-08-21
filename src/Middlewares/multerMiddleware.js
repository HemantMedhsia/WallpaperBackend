import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/temp')); // Ensure the path is correct
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Naming the file
    },
});

export const upload = multer({ storage: storage });