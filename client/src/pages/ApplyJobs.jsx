import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

function ApplyJobs() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [jobData, setJobData] = useState(null)
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

    const { jobs, backendUrl, userData, userApplications, fetchUserApplications, employeeToken } = useContext(AppContext)

    // to find the data from the jobs array that we will get from context
    const fetchJob = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`)
            if (data.success) {
                setJobData(data.data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message || "An error occurred. Please try again.";
            toast.error(message);
        }
    }

    const applyHandler = async () => {
        try {
            if (!userData) {
                return toast.error('Login to apply for Jobs');
            }

            if (!userData.resume) {
                navigate('/applications');
                return toast.error('Upload resume to apply for Jobs');
            }

            const { data } = await axios.post(`${backendUrl}/api/users/apply-job`,
                { jobId: jobData._id },
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                toast.success("Job applied successfully");
                fetchUserApplications()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message || "An error occurred. Please try again.";
            toast.error(message);
        }
    }

    // Function to check whether the user is already applied for a job or not.
    const checkWhetherApplied = () => {
        const hasApplied = userApplications.some(item => item.jobId._id == jobData._id)
        setIsAlreadyApplied(hasApplied);
    }

    useEffect(() => {
        fetchJob();
    }, [id])

    useEffect(() => {
        if(userApplications.length > 0 && jobData){
            checkWhetherApplied();
        }
    }, [userApplications, jobData, id])

    return jobData ? (
        <>
            <Navbar />

            {/* entire UI of the page */}
            <div className='container min-h-screen flex flex-col py-10 px-4 2xl:px-20 mx-auto'>

                <div className='bg-white text-black w-full rounded-2xl shadow-lg'>
                    {/* top card of the page */}
                    <div className='flex justify-center md:justify-between flex-wrap gap-8 px-8 md:px-14 py-16 mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl'>
                        {/* left side of the top card along with company details */}
                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='h-24 w-24 bg-white rounded-2xl p-4 mr-6 max-md:mb-4 shadow-md object-contain' src={jobData.companyId.image} alt="" />
                            <div className='text-center md:text-left text-neutral-700'>
                                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-3'>{jobData.title}</h1>

                                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-700 mt-3'>
                                    <span className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm font-medium'>
                                        <img src={assets.suitcase_icon} alt="" className='w-4 h-4' />
                                        {jobData.companyId.name}
                                    </span>

                                    <span className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm font-medium'>
                                        <img src={assets.location_icon} alt="" className='w-4 h-4' />
                                        {jobData.location}
                                    </span>

                                    <span className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm font-medium'>
                                        <img src={assets.person_icon} alt="" className='w-4 h-4' />
                                        {jobData.level}
                                    </span>

                                    <span className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm font-medium text-green-700'>
                                        <img src={assets.money_icon} alt="" className='w-4 h-4' />
                                        ${kconvert.convertTo(jobData.salary)}
                                    </span>

                                </div>
                            </div>
                        </div>

                        {/* right side of the top card */}
                        <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center gap-3'>
                            <button onClick={applyHandler} disabled={isAlreadyApplied} className={`${
                                isAlreadyApplied 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5'
                            } text-white font-semibold rounded-xl px-10 py-3 shadow-lg transition-all duration-300`}>
                                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                            </button>

                            <p className='text-gray-600 font-medium'>
                                <span className='text-gray-500'>Posted</span> {moment(jobData.date).fromNow()}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start gap-8 px-8 pb-12'>
                        {/* Left part of the job description page */}
                        <div className='w-full lg:w-2/3'>
                            <h2 className='text-3xl font-bold mb-6 text-gray-800 border-b-4 border-blue-600 pb-3 inline-block'>Job Description</h2>

                            <div className='rich-text mt-6 bg-gray-50 p-6 rounded-xl' dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
                            <button onClick={applyHandler} disabled={isAlreadyApplied} className={`${
                                isAlreadyApplied 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5'
                            } text-white font-semibold rounded-xl mt-8 mb-4 px-10 py-3 shadow-lg transition-all duration-300`}>
                                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                            </button>

                        </div>

                        {/* Right part of the job description page */}
                        <div className='w-full lg:w-1/3 mt-8 lg:mt-0 space-y-5'>
                            <h2 className='text-xl font-bold text-gray-800 mb-4'>More from {jobData.companyId.name}</h2>
                            {jobs.filter(job => job._id != jobData._id && job.companyId._id == jobData.companyId._id)
                                .filter(job => { // This filter removes jobs the user has already applied
                                    // Set of applied JobIds
                                    const appliedJobIds = new Set(userApplications.map(app => app.jobId && app.jobId._id));
                                    // return true if the user has not already applied for this job
                                    return !appliedJobIds.has(job._id);
                                })
                                .slice(0, 3)
                                .map((job, index) => <JobCard key={index} job={job} />)
                            }
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </>
    ) : (
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className='flex flex-col items-center gap-4'>
                <div className='w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
                <p className='text-gray-600 font-medium'>Loading job details...</p>
            </div>
        </div>
    )
}

export default ApplyJobs