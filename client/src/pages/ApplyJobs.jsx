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
import { useAuth } from '@clerk/clerk-react'

function ApplyJobs() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getToken } = useAuth()

    const [jobData, setJobData] = useState(null)
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

    const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

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
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
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

            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/api/users/apply-job`,
                { jobId: jobData._id },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message);
                fetchUserApplications()
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

                <div className='bg-white text-black w-full rounded-lg'>
                    {/* top card of the page */}
                    <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
                        {/* left side of the top card along with company deatils */}
                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border-none' src={jobData.companyId.image} alt="" />
                            <div className='text-center md:text-left text-neutral-700'>
                                <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>

                                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                                    <span className='flex items-center gap-1'>
                                        <img src={assets.suitcase_icon} alt="" />
                                        {jobData.companyId.name}
                                    </span>

                                    <span className='flex items-center gap-1'>
                                        <img src={assets.location_icon} alt="" />
                                        {jobData.location}
                                    </span>

                                    <span className='flex items-center gap-1'>
                                        <img src={assets.person_icon} alt="" />
                                        {jobData.level}
                                    </span>

                                    <span className='flex items-center gap-1'>
                                        <img src={assets.money_icon} alt="" />
                                        CTC: ${kconvert.convertTo(jobData.salary)}
                                    </span>

                                </div>
                            </div>
                        </div>

                        {/* right side of the top card */}
                        <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
                            <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded m-1 px-10 py-2'>
                                {isAlreadyApplied ? 'Already applied' : 'Apply now'}
                            </button>

                            <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-start'>
                        {/* Left part of the job description page */}
                        <div className='w-full lg:w-2/3'>
                            <h2 className='text-2xl font-bold mb-4'>Job description</h2>

                            <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
                            <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded mt-10 m-1 px-10 py-2'>
                                {isAlreadyApplied ? 'Already applied' : 'Apply now'}
                            </button>

                        </div>

                        {/* Right part of the job description page */}
                        <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
                            <h2>More jobs from {jobData.companyId.name}</h2>
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
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'>

            </div>
        </div>
    )
}

export default ApplyJobs