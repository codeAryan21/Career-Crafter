import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function RecruiterLogin() {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (state == 'SignUp' && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true)
        }

        // we will make api call using backendUrl
        try {
            if (state == "Login") {
                const { data } = await axios.post(`${backendUrl}/api/company/login`, {
                    email,
                    password
                });

                if(data.success){
                    // console.log(data);
                    toast.success(data.message)
                    setCompanyData(data.data.company);
                    setCompanyToken(data.data.token);

                    // setting token to local storage so that if user reload the web page then the token remains in our application
                    localStorage.setItem('companyToken', data.data.token);
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                }else{
                    toast.error(data.message);
                }

            } else {

                const formData = new FormData()
                formData.append("name", name)
                formData.append("email", email)
                formData.append("password", password)
                formData.append("image", image)

                const { data } = await axios.post(`${backendUrl}/api/company/register`, formData);

                if(data.success){
                    // console.log(data);
                    toast.success(data.message)
                    setCompanyData(data.data.company);
                    setCompanyToken(data.data.token);

                    localStorage.setItem('companyToken', data.data.token);
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                }else{
                    toast.error(data.message);
                }

            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
        }

    }

    // this useEffect is for when recruiter login/signup page is open then user cannot scroll the web page
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])
    
    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 text-slate-600 rounded-xl'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
                <p className='text-sm'>Welcome back! Please {state == 'Login' ? 'sign in' : "sign up"} to continue</p>

                {state == 'SignUp' && isTextDataSubmitted
                    ? <>
                        <div className='flex items-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-16 rounded-full cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>

                            <p>Upload Company <br />Logo</p>
                        </div>
                    </>

                    : <>
                        {state != 'Login' && (
                            <div className='px-4 py-2 flex items-center gap-2 mt-5 rounded-full border border-gray-200'>
                                <img src={assets.person_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company name' required />
                            </div>
                        )}

                        <div className='px-4 py-2 flex items-center gap-2 mt-5 rounded-full border border-gray-200'>
                            <img src={assets.email_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' required />
                        </div>

                        <div className='px-4 py-2 flex items-center gap-2 mt-5 rounded-full border border-gray-200'>
                            <img src={assets.lock_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' required />
                        </div>

                        {state == 'Login' && <p className='text-blue-400 text-sm mt-3 cursor-pointer'>Forgot password?</p>}
                    </>
                }

                <button type='submit' className='bg-blue-600 w-full text-white py-2 mt-4 rounded-full cursor-pointer hover:bg-blue-700' >
                    {state == 'Login' ? 'Login' : isTextDataSubmitted ? 'Create account' : 'Next'}
                </button>

                {state == 'Login'
                    ? <p className='text-sm mt-3 text-center'>Don't have an account? <span className='text-blue-500 cursor-pointer underline' onClick={() => setState("SignUp")}>SignUp</span></p>
                    : <p className='text-sm mt-3 text-center'>Already have an account? <span className='text-blue-500 cursor-pointer underline' onClick={() => setState("Login")}>Login</span></p>
                }

                <img onClick={e => setShowRecruiterLogin(false)} className='absolute top-6 right-6 cursor-pointer' src={assets.cross_icon} alt="" />

            </form>
        </div>
    )
}

export default RecruiterLogin