import { Router } from "express"
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/company.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Routes for company
router.post('/register',
    upload.single('image'),
    registerCompany
);

router.post('/login', loginCompany);

router.get('/company', verifyJWT, getCompanyData)
router.post('/post-job', verifyJWT, postJob)
router.get('/applicants', verifyJWT, getCompanyJobApplicants)
router.get('/list-jobs', verifyJWT, getCompanyPostedJobs)

router.post('/change-status', verifyJWT, changeJobApplicationStatus)
router.post('/change-visibility', verifyJWT, changeVisibility)

export default router