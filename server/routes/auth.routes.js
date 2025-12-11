import { Router } from 'express'
import { forgotPassword, resetPassword, recruiterForgotPassword, recruiterResetPassword } from '../controllers/auth.controller.js'

const router = Router()

// User/Employee password reset
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

// Recruiter/Company password reset
router.post('/recruiter/forgot-password', recruiterForgotPassword)
router.post('/recruiter/reset-password', recruiterResetPassword)

export default router