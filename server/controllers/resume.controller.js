import { Resume } from '../models/resume.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { parseResume } from '../utils/resumeParser.js';
import { generateResumePDFKit } from '../utils/pdfkitGenerator.js';
import { getJobRecommendations } from '../utils/jobRecommendation.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

// Parse uploaded resume
const parseUploadedResume = async (req, res) => {
    const resumeLocalPath = req.file?.path;
    if (!resumeLocalPath) {
        throw new ApiError(400, "Resume file is required");
    }

    try {
        const parsedData = await parseResume(resumeLocalPath);
        
        // Update user with parsed resume data
        await User.findByIdAndUpdate(req.user._id, {
            $set: { parsedResume: parsedData }
        });

        // Clean up local file
        fs.unlinkSync(resumeLocalPath);

        return res.status(200).json(
            new ApiResponse(200, parsedData, "Resume parsed successfully")
        );
    } catch (error) {
        if (fs.existsSync(resumeLocalPath)) {
            fs.unlinkSync(resumeLocalPath);
        }
        throw new ApiError(500, "Failed to parse resume");
    }
};

// Get job recommendations
const getRecommendations = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const recommendations = await getJobRecommendations(
        user._id,
        user.parsedResume?.skills || [],
        user.preferences
    );

    return res.status(200).json(
        new ApiResponse(200, recommendations, "Job recommendations fetched successfully")
    );
};

// Create/Update resume
const createResume = async (req, res) => {
    const resumeData = req.body;
    
    let resume = await Resume.findOne({ userId: req.user._id });
    
    if (resume) {
        resume = await Resume.findByIdAndUpdate(resume._id, resumeData, { new: true });
    } else {
        resume = await Resume.create({ ...resumeData, userId: req.user._id });
    }

    return res.status(200).json(
        new ApiResponse(200, resume, "Resume saved successfully")
    );
};

// Get user's resume
const getResume = async (req, res) => {
    const resume = await Resume.findOne({ userId: req.user._id });
    
    return res.status(200).json(
        new ApiResponse(200, resume, "Resume fetched successfully")
    );
};

// Generate PDF resume
const generatePDF = async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user._id });
        if (!resume) {
            throw new ApiError(404, "Resume not found. Please create a resume first.");
        }

        console.log('Generating PDF for user:', req.user._id);
        const pdfBuffer = await generateResumePDFKit(resume);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        
        return res.send(pdfBuffer);
    } catch (error) {
        console.error('PDF generation error:', error);
        throw new ApiError(500, error.message || "Failed to generate PDF");
    }
};

// Update user preferences
const updatePreferences = async (req, res) => {
    const { jobCategories, locations, salaryRange } = req.body;
    
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                preferences: { jobCategories, locations, salaryRange }
            }
        },
        { new: true }
    ).select('-password');

    return res.status(200).json(
        new ApiResponse(200, user.preferences, "Preferences updated successfully")
    );
};

export {
    parseUploadedResume,
    getRecommendations,
    createResume,
    getResume,
    generatePDF,
    updatePreferences
};