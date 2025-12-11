import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate } from 'react-router-dom'

function ResetPassword(){
    const { backendUrl } = useContext(AppContext)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const isRecruiter = searchParams.get('type') === 'recruiter'
    
    const [step, setStep] = useState(1) // 1: email, 2: otp+password
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const requestOtp = async (e) => {
        e.preventDefault()
        if(!email) return toast.error('Email is required')
        setLoading(true)
        try{
            const endpoint = isRecruiter ? '/api/auth/recruiter/forgot-password' : '/api/auth/forgot-password'
            const { data } = await axios.post(`${backendUrl}${endpoint}`, { email })
            if(data.success){
                toast.success(data.message)
                setStep(2) // move to OTP+password step
            } else toast.error(data.message)
        }catch(err){
            toast.error(err.response?.data?.message || err.message)
        }
        setLoading(false)
    }

    const resetPassword = async (e) => {
        e.preventDefault()
        if(!otp) return toast.error('OTP is required')
        if(!newPassword) return toast.error('Password is required')
        if(newPassword.length < 6) return toast.error('Password must be at least 6 characters long')
        setLoading(true)
        try{
            const endpoint = isRecruiter ? '/api/auth/recruiter/reset-password' : '/api/auth/reset-password'
            const { data } = await axios.post(`${backendUrl}${endpoint}`, { email, otp, newPassword })
            if(data.success){
                toast.success(data.message)
                navigate('/')
            } else toast.error(data.message)
        }catch(err){
            toast.error(err.response?.data?.message || err.message)
        }
        setLoading(false)
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
            <form onSubmit={step === 1 ? requestOtp : resetPassword} className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md'>
                <div className='text-center mb-6'>
                    <div className='mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
                        <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>{step === 1 ? 'Reset Password' : 'Reset Password'}</h2>
                    <p className='text-gray-600 text-sm'>
                        {step === 1 
                            ? 'Enter your email to receive a password reset OTP' 
                            : `Enter the OTP sent to ${email}`
                        }
                    </p>
                </div>
                {step === 1 ? (
                    <>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                <input type='email' value={email} onChange={e=>setEmail(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition' placeholder='you@example.com' />
                            </div>
                            <button disabled={loading} className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors shadow-lg'>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>OTP (6 digits)</label>
                                <input type='text' value={otp} onChange={e=>setOtp(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest transition' placeholder='000000' maxLength='6' />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
                                <input type='password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition' placeholder='Enter new password' />
                            </div>
                            <button disabled={loading} className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors shadow-lg'>{loading ? 'Resetting...' : 'Reset Password'}</button>
                            <button type='button' onClick={() => { setStep(1); setOtp(''); setNewPassword(''); }} disabled={loading} className='w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 transition-colors'>
                                ← Back to Email
                            </button>
                        </div>
                    </>
                )}
                <div className='mt-6 text-center'>
                    <a href='/' className='text-sm text-blue-600 hover:text-blue-800 font-medium'>← Back to Home</a>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword