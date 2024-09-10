import multer from "multer";

// Configure multer to handle file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory for upload to Firebase
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;