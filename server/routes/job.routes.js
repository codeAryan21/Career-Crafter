import { Router } from 'express'
import { getJobById, getJobs } from '../controllers/job.controller.js'

const router = Router()

// Route to get all jobs data
router.get('/', getJobs);

// Route to get a single job by ID
router.get('/:id', getJobById)

export default router