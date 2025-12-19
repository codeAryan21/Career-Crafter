import { Router } from "express"
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, logoutCompany, postJob, registerCompany, updateCompanyProfile, getPublicCompanyProfile, getCompanyAnalytics, deleteJob } from "../controllers/company.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyCompanyJWT } from "../middlewares/authCompany.middleware.js";
import { loginLimiter, uploadLimiter } from '../middlewares/rateLimiter.middleware.js';
import { validateImageUpload } from '../middlewares/fileValidation.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { postJobSchema } from "../validators/job.validator.js";

const router = Router();

// Routes for company
router.post('/register', uploadLimiter, upload.single('image'), validateImageUpload, registerCompany);
router.post('/login', loginLimiter, loginCompany);
router.post('/logout', verifyCompanyJWT, logoutCompany);

router.get('/company', verifyCompanyJWT, getCompanyData)
router.post('/post-job', verifyCompanyJWT, validate(postJobSchema), postJob);
router.get('/applicants', verifyCompanyJWT, getCompanyJobApplicants)
router.get('/list-jobs', verifyCompanyJWT, getCompanyPostedJobs)

router.post('/change-status', verifyCompanyJWT, changeJobApplicationStatus)
router.post('/change-visibility', verifyCompanyJWT, changeVisibility)

// Company profile routes
router.patch('/update-profile', verifyCompanyJWT, updateCompanyProfile)
router.get('/profile/:companyId', getPublicCompanyProfile)

// Analytics route
router.get('/analytics', verifyCompanyJWT, getCompanyAnalytics)

// Delete job route
router.delete('/delete-job', verifyCompanyJWT, deleteJob)

export default router