import { Router } from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.get('/user', getUserData)
router.get('/job-applications', getUserJobApplications)

router.post('/apply-job', applyForJob)
router.post('/update-resume', upload.single('resume') , updateUserResume)

export default router