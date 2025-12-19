import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext, getErrorMessage } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserLogin() {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [image, setImage] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const { setShowUserLogin, backendUrl, setEmployeeToken, setEmployeeData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (state == 'SignUp' && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true)
        }
        // we will make api call using backendUrl
        setIsSubmitting(true)
        try {
            if (state == "Login") {
                const { data } = await axios.post(`${backendUrl}/api/users/login`, {
                    email,
                    password
                }, { withCredentials: true });
                
                if (data.success) {
                    // console.log(data);
                    toast.success(data.message)
                    setEmployeeData(data.data.user);
                    setEmployeeToken(data.data.token);

                    // setting token to local storage so that if user reload the web page then the token remains in our application
                    localStorage.setItem('employeeToken', data.data.token);
                    setShowUserLogin(false)
                    navigate('/')
                } else {
                    toast.error(data.message);
                }

            } else {

                const formData = new FormData()
                formData.append("fullName", fullName)
                formData.append("email", email)
                formData.append("username", username)
                formData.append("password", password)
                formData.append("image", image)

                const { data } = await axios.post(`${backendUrl}/api/users/register`, formData, { withCredentials: true });

                if (data.success) {
                    // console.log(data);
                    toast.success(data.message)
                    setEmployeeData(data.data.user);
                    setEmployeeToken(data.data.token);

                    localStorage.setItem('employeeToken', data.data.token);
                    setShowUserLogin(false)
                    navigate('/')
                } else {
                    toast.error(data.message);
                }

            }

        } catch (error) {
            const message = getErrorMessage(error);
            if (error.response?.status === 429) {
                toast.error('Too many attempts. Please try again in 15 minutes.', { autoClose: 5000 })
            } else {
                toast.error(message);
            }
        } finally {
            setIsSubmitting(false)
        }

    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp'
        ];

        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            toast.error('Only JPG, PNG and WebP images are allowed');
            return;
        }

        if (file.size > maxSize) {
            toast.error('Image must be smaller than 5MB');
            return;
        }

        setImage(file);
    }

    // this useEffect is for when employee login/signup page is open then user cannot scroll the web page
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-md bg-black/40 flex justify-center items-center p-4 animate-fadeIn'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 text-slate-600 rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-slideIn border border-gray-100'>
                <h1 className='text-center text-3xl text-gray-800 font-bold mb-2'>{state} to Career Crafter</h1>
                <p className='text-sm text-center text-gray-600 mb-8'>Welcome! Please {state == 'Login' ? 'sign in' : "sign up"} to continue</p>

                {state == 'SignUp' && isTextDataSubmitted
                    ? <>
                        <div className='flex flex-col items-center gap-4 my-8'>
                            <label htmlFor="image" className='cursor-pointer group'>
                                <div className='relative'>
                                    <img className='w-28 h-28 object-cover rounded-full border-4 border-blue-200 group-hover:border-blue-400 transition-all duration-300 shadow-lg' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                    <div className='absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                        <svg className='w-8 h-8 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                                <input onChange={handleImageChange} type="file" id="image" hidden accept="image/jpeg,image/jpg,image/png,image/webp" />
                            </label>
                            <p className='text-sm text-gray-700 font-semibold'>Upload your Profile Picture</p>
                        </div>
                        <button type='button' onClick={() => setIsTextDataSubmitted(false)} className='w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors mb-4'>
                            ← Back to Details
                        </button>
                    </>

                    : <>
                    {state != 'Login' && (
                        <>
                        <div className='px-4 py-3.5 flex items-center gap-3 mt-5 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-md transition-all bg-gray-50 focus-within:bg-white'>
                            <img src={assets.person_icon} alt="" className='w-5 opacity-60' />
                            <input className='outline-none text-sm w-full bg-transparent' onChange={e => setFullName(e.target.value)} value={fullName} type="text" placeholder='Enter your full name' required />
                        </div>

                        <div className='px-4 py-3.5 flex items-center gap-3 mt-4 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-md transition-all bg-gray-50 focus-within:bg-white'>
                            <img src={assets.person_icon} alt="" className='w-5 opacity-60' />
                            <input className='outline-none text-sm w-full bg-transparent' onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder='Choose a username' required />
                        </div> 
                        </>
                        )}

                        <div className='px-4 py-3.5 flex items-center gap-3 mt-4 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-md transition-all bg-gray-50 focus-within:bg-white'>
                            <img src={assets.email_icon} alt="" className='w-5 opacity-60' />
                            <input className='outline-none text-sm w-full bg-transparent' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' required />
                        </div>

                        <div className='px-4 py-3.5 flex items-center gap-3 mt-4 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-md transition-all bg-gray-50 focus-within:bg-white'>
                            <img src={assets.lock_icon} alt="" className='w-5 opacity-60' />
                            <input className='outline-none text-sm w-full bg-transparent' onChange={e => setPassword(e.target.value)} value={password} type={showPassword ? 'text' : 'password'} placeholder='Create a password' required />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-xs text-blue-600 hover:text-blue-700 font-medium'>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {state === 'SignUp' && <p className='text-xs text-red-500 mt-1'>Must be 8+ characters with uppercase, lowercase, number, and special character</p>}
                    </>
                    }

                {state == 'Login' && <p className='text-blue-600 text-sm mt-4 cursor-pointer hover:text-blue-700 font-medium' onClick={() => { setShowUserLogin(false); navigate('/forgot-password?type=user') }}>Forgot password?</p>}

                <button type='submit' disabled={isSubmitting} className='bg-gradient-to-r from-blue-600 to-indigo-600 w-full text-white py-3.5 mt-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed' >
                    {isSubmitting ? 'Please wait...' : (state == 'Login' ? 'Login' : isTextDataSubmitted ? 'Create account' : 'Next')}
                </button>

                {state == 'Login'
                    ? <p className='text-sm mt-5 text-center text-gray-600'>Don't have an account? <span className='text-blue-600 cursor-pointer font-bold hover:text-blue-700 transition-colors' onClick={() => setState("SignUp")}>Sign Up</span></p>
                    : <p className='text-sm mt-5 text-center text-gray-600'>Already have an account? <span className='text-blue-600 cursor-pointer font-bold hover:text-blue-700 transition-colors' onClick={() => setState("Login")}>Login</span></p>
                }

                <button type='button' onClick={e => setShowUserLogin(false)} className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'>
                    <img className='w-4 h-4' src={assets.cross_icon} alt="Close" />
                </button>

            </form>
        </div>
    )

}

export default UserLogin