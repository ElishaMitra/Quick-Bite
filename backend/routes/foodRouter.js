import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

// Ensure 'uploads' directory exists
import fs from "fs";
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (5MB)
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed!"));
        }
    },
});

// Routes
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }
        const image_filename = req.file.filename;
        // Call your addFood controller and pass image filename as needed
        addFood(req, res, image_filename);
    } catch (error) {
        next(error);
    }
});

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

// Error handling middleware
foodRouter.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: err.message || "Something went wrong!" });
});

export default foodRouter;
