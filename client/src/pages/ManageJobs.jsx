import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageJobs() {

    const navigate = useNavigate();

    const { backendUrl, companyToken } = useContext(AppContext)
    const [jobs, setJobs] = useState(false)

    // Function to fetch company Job Applications Data 
    const fetchCompanyJob = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`,
                { headers: { token: companyToken } }
            );

            if (data.success) {
                console.log(data.data);
                setJobs(data.data.reverse());
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

    // Function to toggle Job Visibility
    const toggleJobVisibility = async (id) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/company/change-visibility`,
                { jobId: id },
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success(data.message);
                fetchCompanyJob();
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

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJob();
        }
    }, [companyToken])

    return jobs ? jobs.length == 0 ? (
        <div className='flex flex-col items-center justify-center h-[70vh] bg-white rounded-2xl shadow-md'>
            <svg className='w-20 h-20 text-gray-300 mb-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className='text-xl sm:text-2xl font-semibold text-gray-700'>No jobs available yet!</p>
            <p className='text-gray-500 mt-2'>Start by posting your first job</p>
        </div>
    ) : (
        <div className='container max-w-6xl'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Manage Your Jobs</h2>
            <div className='overflow-x-auto bg-white rounded-2xl shadow-md'>
                <table className='min-w-full max-sm:text-sm'>

                    <thead>
                        <tr className='bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200'>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700 max-sm:hidden'>#</th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700'>Job Title</th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700 max-sm:hidden'>Date</th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700 max-sm:hidden'>Location</th>
                            <th className='px-6 py-4 text-center font-semibold text-gray-700'>Applicants</th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700'>Visible</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className='text-gray-700 hover:bg-blue-50 transition-colors'>
                                <td className='px-6 py-4 border-b border-gray-100 max-sm:hidden font-medium text-gray-500'>{index + 1}</td>
                                <td className='px-6 py-4 border-b border-gray-100 font-semibold text-gray-800'>{job.title}</td>
                                <td className='px-6 py-4 border-b border-gray-100 max-sm:hidden text-gray-600'>{moment(job.date).format('ll')}</td>
                                <td className='px-6 py-4 border-b border-gray-100 max-sm:hidden'>
                                    <span className='inline-flex items-center gap-1 text-gray-600'>
                                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {job.location}
                                    </span>
                                </td>
                                <td className='px-6 py-4 border-b border-gray-100 text-center'>
                                    <span className='inline-flex items-center justify-center bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm'>
                                        {job.applicants}
                                    </span>
                                </td>
                                <td className='px-6 py-4 border-b border-gray-100'>
                                    <label className='relative inline-flex items-center cursor-pointer'>
                                        <input onChange={() => toggleJobVisibility(job._id)} type="checkbox" checked={job.visible} className='sr-only peer' />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='mt-6 flex justify-end'>
                <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl cursor-pointer hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2'
                    onClick={() => navigate('/dashboard/add-job')}
                >
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Job
                </button>
            </div>

        </div>
    )
    : <div className='flex items-center justify-center h-[70vh]'>
        <div className='flex flex-col items-center gap-4'>
            <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
            <p className='text-gray-600 font-medium'>Loading jobs...</p>
        </div>
    </div>
}

export default ManageJobs