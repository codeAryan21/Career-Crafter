import crypto from 'crypto'
import { User } from '../models/user.model.js'
import { Company } from '../models/company.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { sendEmail } from '../utils/email.js'
import bcrypt from 'bcrypt'

const forgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) throw new ApiError(400, 'Email is required')

    const user = await User.findOne({ email })
    if (!user) throw new ApiError(404, 'User not found')

    // generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

    user.resetPasswordToken = hashedOtp
    // OTP valid for 10 minutes
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000
    await user.save({ validateBeforeSave: false })

    const message = `Your Carrer Crafter password reset OTP is: <strong>${otp}</strong>. It expires in 10 minutes.`

    // Log OTP in non-production for debugging
    // if (process.env.NODE_ENV !== 'production') {
    //     console.log(`Password reset OTP for ${email}: ${otp}`)
    // }

    try {
        await sendEmail({
            to: email,
            subject: 'Carrer Crafter - Password Reset OTP',
            text: `Your OTP: ${otp}`,
            html: `<p>${message}</p>`
        })

        return res.status(200).json(new ApiResponse(200, null, 'OTP sent to your email'))
    } catch (error) {
        // cleanup
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save({ validateBeforeSave: false })

        console.error('Email send error:', error && (error.stack || error.message || error))
        throw new ApiError(500, `Failed to send reset email: ${error && (error.message || 'unknown error')}`)
    }
}

const resetPassword = async (req, res) => {
    const { otp, newPassword, email } = req.body
    if (!otp || !newPassword || !email) throw new ApiError(400, 'OTP, email and new password are required')

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

    const user = await User.findOne({
        email,
        resetPasswordToken: hashedOtp,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) throw new ApiError(400, 'Invalid or expired OTP')

    if (newPassword.length < 8) throw new ApiError(400, 'Password must be at least 8 characters long')
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(newPassword)) {
        throw new ApiError(400, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return res.status(200).json(new ApiResponse(200, null, 'Password has been reset successfully'))
}

const recruiterForgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) throw new ApiError(400, 'Email is required')

    const company = await Company.findOne({ email })
    if (!company) throw new ApiError(404, 'Company not found')

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

    company.resetPasswordToken = hashedOtp
    company.resetPasswordExpires = Date.now() + 10 * 60 * 1000
    await company.save({ validateBeforeSave: false })

    const message = `Your Carrer Crafter password reset OTP is: <strong>${otp}</strong>. It expires in 10 minutes.`

    try {
        await sendEmail({
            to: email,
            subject: 'Carrer Crafter - Password Reset OTP',
            text: `Your OTP: ${otp}`,
            html: `<p>${message}</p>`
        })

        return res.status(200).json(new ApiResponse(200, null, 'OTP sent to your email'))
    } catch (error) {
        company.resetPasswordToken = undefined
        company.resetPasswordExpires = undefined
        await company.save({ validateBeforeSave: false })

        console.error('Email send error:', error && (error.stack || error.message || error))
        throw new ApiError(500, `Failed to send reset email: ${error && (error.message || 'unknown error')}`)
    }
}

const recruiterResetPassword = async (req, res) => {
    const { otp, newPassword, email } = req.body
    if (!otp || !newPassword || !email) throw new ApiError(400, 'OTP, email and new password are required')

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

    const company = await Company.findOne({
        email,
        resetPasswordToken: hashedOtp,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!company) throw new ApiError(400, 'Invalid or expired OTP')

    if (newPassword.length < 8) throw new ApiError(400, 'Password must be at least 8 characters long')
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(newPassword)) {
        throw new ApiError(400, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    }

    const salt = await bcrypt.genSalt(10)
    company.password = await bcrypt.hash(newPassword, salt)
    company.resetPasswordToken = undefined
    company.resetPasswordExpires = undefined
    await company.save()

    return res.status(200).json(new ApiResponse(200, null, 'Password has been reset successfully'))
}

export { forgotPassword, resetPassword, recruiterForgotPassword, recruiterResetPassword }