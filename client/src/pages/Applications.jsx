import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { assets } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from 'axios'
import { toast } from 'react-toastify'

function Applications() {

    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)

    const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

    const { user } = useUser()
    const { getToken } = useAuth()

    // Function to update a resume
    const updateResume = async () => {
        try {
            const formData = new FormData();
            formData.append("resume", resume)

            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/api/users/update-resume`, formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                await fetchUserData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
        }

        setIsEdit(false);
        setResume(null);
    }

    useEffect(() => {
        if (user) {
            fetchUserApplications()
        }
    }, [user])

    return (
        <>
            <Navbar />
            <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
                <h2 className='text-xl font-semibold'>Your Resume</h2>

                {/* Resume section */}
                <div className='flex gap-2 mt-3 mb-6'>
                    {isEdit || userData && userData.resume == ""
                        ? <>
                            <label className='flex items-center cursor-pointer' htmlFor="resumeUpload">
                                <p className='bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg mr-3'>
                                    {resume ? resume.name : "Select resume"}
                                </p>

                                <input
                                    onChange={e => setResume(e.target.files[0])}
                                    accept='application/pdf' type="file" id='resumeUpload' hidden />

                                <img className='cursor-pointer' src={assets.profile_upload_icon} alt="" />
                            </label>

                            <button
                                onClick={updateResume}
                                className='bg-green-100 hover:bg-green-200 border border-green-400 px-4 py-2 rounded-lg cursor-pointer'>
                                Save
                            </button>
                        </>

                        : <div className='flex gap-3'>
                            <a target='_blank' href={userData.resume} className='bg-blue-100 hover:bg-blue-300 text-blue-600 px-4 py-2 rounded-lg'>
                                Resume
                            </a>
                            <button
                                onClick={() => setIsEdit(true)}
                                className='text-gray-500 border hover:bg-gray-200 border-gray-300 px-4 py-2 rounded-lg cursor-pointer'>
                                Edit
                            </button>
                        </div>
                    }
                </div>

                {/* Applied job section */}
                <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
                <table className='min-w-full bg-white border border-gray-100 shadow rounded-lg'>
                    <thead>
                        <tr>
                            <th className='py-3 px-4 border-b border-gray-100 text-left'>Company</th>
                            <th className='py-3 px-4 border-b border-gray-100 text-left'>Job Title</th>
                            <th className='py-3 px-4 border-b border-gray-100 text-left max-sm:hidden'>Location</th>
                            <th className='py-3 px-4 border-b border-gray-100 text-left max-sm:hidden'>Date</th>
                            <th className='py-3 px-4 border-b border-gray-100 text-left'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* If we have (job.jobId) then only we display applied job */}
                        {userApplications.map((job, index) => true ? (
                            <tr key={index}>
                                <td className='py-3 px-4 flex items-center border-b border-gray-100 gap-2'>
                                    <img className='w-8 h-8' src={job.companyId.image} alt="" />
                                    {job.companyId.name}
                                </td>
                                <td className='py-2 px-4 border-b border-gray-100'>{job.jobId.title}</td>
                                <td className='py-2 px-4 border-b border-gray-100 max-sm:hidden'>{job.jobId.location}</td>
                                <td className='py-2 px-4 border-b border-gray-100 max-sm:hidden'>{moment(job.createdAt).format('ll')}</td>
                                <td className='py-2 px-4 border-b border-gray-100'>
                                    <span className={`${job.status == 'Accepted' ? 'bg-green-100' : job.status == 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} py-1.5 px-4 rounded`}>
                                        {job.status}
                                    </span>
                                </td>
                            </tr>
                        ) : (null))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    )
}

export default Applications