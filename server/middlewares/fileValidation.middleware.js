import { ApiError } from '../utils/ApiError.js';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPES = ['application/pdf'];

export const validateImageUpload = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    if (!ALLOWED_IMAGE_TYPES.includes(req.file.mimetype)) {
        throw new ApiError(400, 'Only JPEG, PNG, and WebP images are allowed');
    }

    if (req.file.size > MAX_IMAGE_SIZE) {
        throw new ApiError(400, 'Image size must be less than 5MB');
    }

    next();
};

export const validateResumeUpload = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    if (!ALLOWED_PDF_TYPES.includes(req.file.mimetype)) {
        throw new ApiError(400, 'Only PDF files are allowed for resume');
    }

    if (req.file.size > MAX_PDF_SIZE) {
        throw new ApiError(400, 'Resume size must be less than 10MB');
    }

    next();
};