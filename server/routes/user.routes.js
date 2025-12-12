import { Router } from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume, registerUser, loginUser, logoutUser, changeCurrentPassword, updateProfileDetails, updateUserImage } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyUserJWT } from '../middlewares/authUser.middlewares.js'
import { loginLimiter, uploadLimiter } from '../middlewares/rateLimiter.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerUserSchema, loginUserSchema, applyJobSchema } from '../validators/user.validator.js';
import { validateImageUpload, validateResumeUpload } from '../middlewares/fileValidation.middleware.js';

const router = Router()

router.post('/register', uploadLimiter, upload.single('image'), validateImageUpload, validate(registerUserSchema), registerUser);
router.post('/login', loginLimiter, validate(loginUserSchema), loginUser);
router.post('/logout', verifyUserJWT, logoutUser);

router.get('/user', verifyUserJWT, getUserData)
router.get('/job-applications', verifyUserJWT, getUserJobApplications)

router.post('/apply-job', validate(applyJobSchema), verifyUserJWT, applyForJob)
router.post('/update-resume', uploadLimiter, upload.single('resume'), validateResumeUpload, verifyUserJWT, updateUserResume);

router.post('/change-password', verifyUserJWT, changeCurrentPassword)

router.patch('/update-profile', verifyUserJWT, updateProfileDetails)
router.patch('/update-image', uploadLimiter, upload.single('image'), validateImageUpload, verifyUserJWT, updateUserImage);

export default router