import { Router } from "express"
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/company.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyCompanyJWT } from "../middlewares/authCompany.middleware.js";
import { loginLimiter, uploadLimiter } from '../middlewares/rateLimiter.middleware.js';
import { validateImageUpload } from '../middlewares/fileValidation.middleware.js';

const router = Router();

// Routes for company
router.post('/register', uploadLimiter, upload.single('image'), validateImageUpload, registerCompany);
router.post('/login', loginLimiter, loginCompany);

router.get('/company', verifyCompanyJWT, getCompanyData)
router.post('/post-job', verifyCompanyJWT, postJob)
router.get('/applicants', verifyCompanyJWT, getCompanyJobApplicants)
router.get('/list-jobs', verifyCompanyJWT, getCompanyPostedJobs)

router.post('/change-status', verifyCompanyJWT, changeJobApplicationStatus)
router.post('/change-visibility', verifyCompanyJWT, changeVisibility)

export default router