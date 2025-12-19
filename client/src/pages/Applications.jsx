import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { assets } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Applications() {

    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)

    const { backendUrl, userApplications, fetchUserData, fetchUserApplications, employeeToken, employeeData } = useContext(AppContext);

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.type !== 'application/pdf') {
            toast.error('Only PDF files are allowed');
            return;
        }

        if (file.size > maxSize) {
            toast.error('Resume must be smaller than 10MB');
            return;
        }

        setResume(file);
    }

    // Function to update a resume
    const updateResume = async () => {
        try {
            const formData = new FormData();
            formData.append("resume", resume)

            const { data } = await axios.post(`${backendUrl}/api/users/update-resume`, formData,
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                toast.success(data.message)
                await fetchUserData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message || "An error occurred. Please try again.";
            toast.error(message);
        }

        setIsEdit(false);
        setResume(null);
    }

    useEffect(() => {
        if (employeeToken) {
            fetchUserApplications()
        }
    }, [employeeToken])

    return (
        <>
            <Navbar />
            <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>Your Resume</h2>

                {/* Resume section */}
                <div className='flex gap-3 mt-4 mb-8'>
                    {isEdit || (employeeData?.resume === "")
                        ? <>
                            <label className='flex items-center cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 px-5 py-3 rounded-xl transition-all' htmlFor="resumeUpload">
                                <svg className='w-5 h-5 text-blue-600 mr-3' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className='text-blue-700 font-semibold text-sm'>
                                    {resume ? resume.name : "Select Resume (PDF)"}
                                </p>
                                <input
                                    onChange={handleResumeChange}
                                    accept='application/pdf' type="file" id='resumeUpload' hidden />
                            </label>

                            <button
                                onClick={updateResume}
                                className='bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'>
                                Save Resume
                            </button>
                        </>

                        : <div className='flex gap-3'>
                            <a target='_blank' href={employeeData?.resume} className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2'>
                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Resume
                            </a>
                            <button
                                onClick={() => setIsEdit(true)}
                                className='text-gray-700 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 font-semibold px-6 py-3 rounded-xl cursor-pointer transition-all duration-300'>
                                Edit
                            </button>
                        </div>
                    }
                </div>

                {/* Applied job section */}
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>Jobs Applied</h2>
                <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200'>
                    <table className='min-w-full'>
                        <thead>
                            <tr className='bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200'>
                                <th className='py-4 px-6 text-left font-semibold text-gray-700'>Company</th>
                                <th className='py-4 px-6 text-left font-semibold text-gray-700'>Job Title</th>
                                <th className='py-4 px-6 text-left font-semibold text-gray-700 max-sm:hidden'>Location</th>
                                <th className='py-4 px-6 text-left font-semibold text-gray-700 max-sm:hidden'>Date</th>
                                <th className='py-4 px-6 text-left font-semibold text-gray-700'>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userApplications.length == 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-16">
                                        <div className='flex flex-col items-center'>
                                            <svg className='w-16 h-16 text-gray-300 mb-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-xl sm:text-2xl font-semibold text-gray-700">No applications found</p>
                                            <p className='text-gray-500 mt-2'>Start applying to jobs to see them here</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                userApplications.map((job, index) => true ? (
                                    <tr key={index} className='hover:bg-blue-50 transition-colors'>
                                        <td className='py-4 px-6 flex items-center border-b border-gray-100 gap-3'>
                                            <img className='w-10 h-10 rounded-lg object-contain bg-gray-50 p-1' src={job.companyId?.image || assets.company_icon} alt="" />
                                            <span className='font-semibold text-gray-800'>{job.companyId?.name || 'Company'}</span>
                                        </td>
                                        <td className='py-4 px-6 border-b border-gray-100 font-medium text-gray-700'>{job.jobId?.title || 'Job Title'}</td>
                                        <td className='py-4 px-6 border-b border-gray-100 max-sm:hidden text-gray-600'>
                                            <span className='inline-flex items-center gap-1'>
                                                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                {job.jobId?.location || 'Location'}
                                            </span>
                                        </td>
                                        <td className='py-4 px-6 border-b border-gray-100 max-sm:hidden text-gray-600'>{moment(job.createdAt).format('ll')}</td>
                                        <td className='py-4 px-6 border-b border-gray-100'>
                                            <span className={`inline-flex items-center gap-1.5 font-semibold py-2 px-4 rounded-full text-sm ${
                                                job.status == 'Accepted' ? 'bg-green-100 text-green-700' : 
                                                job.status == 'Rejected' ? 'bg-red-100 text-red-700' : 
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {job.status == 'Accepted' && (
                                                    <svg className='w-4 h-4' fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {job.status == 'Rejected' && (
                                                    <svg className='w-4 h-4' fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {job.status}
                                            </span>
                                        </td>
                                    </tr>
                                ) : (null))
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Applications