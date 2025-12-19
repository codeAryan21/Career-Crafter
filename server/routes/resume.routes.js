import { Router } from "express";
import { 
    parseUploadedResume, 
    getRecommendations, 
    createResume, 
    getResume, 
    generatePDF,
    updatePreferences 
} from "../controllers/resume.controller.js";
import { verifyUserJWT } from "../middlewares/authUser.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Parse resume
router.route("/parse").post(verifyUserJWT, upload.single("resume"), parseUploadedResume);

// Job recommendations
router.route("/recommendations").get(verifyUserJWT, getRecommendations);

// Resume builder
router.route("/").post(verifyUserJWT, createResume);
router.route("/").get(verifyUserJWT, getResume);
router.route("/pdf").get(verifyUserJWT, generatePDF);

// User preferences
router.route("/preferences").put(verifyUserJWT, updatePreferences);

export default router;