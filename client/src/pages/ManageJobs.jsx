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
        <div className='flex items-center justify-center h-[70vh] '>
            <p className='text-xl sm:text-2xl'>No jobs availabe yet!</p>
        </div>
    ) : (
        <div className='container max-w-5xl p-4'>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>

                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className='px-4 py-2 text-left max-sm:hidden'>#</th>
                            <th className='px-4 py-2 text-left'>Job Title</th>
                            <th className='px-4 py-2 text-left max-sm:hidden'>Date</th>
                            <th className='px-4 py-2 text-left max-sm:hidden'>Location</th>
                            <th className='px-4 py-2 text-center'>Applicants</th>
                            <th className='px-4 py-2 text-left'>Visible</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className='text-gray-700'>
                                <td className='px-4 py-2 border-b border-gray-200 max-sm:hidden'>{index + 1}</td>
                                <td className='px-4 py-2 border-b border-gray-200'>{job.title}</td>
                                <td className='px-4 py-2 border-b border-gray-200 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                                <td className='px-4 py-2 border-b border-gray-200 max-sm:hidden'>{job.location}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center'>{job.applicants}</td>
                                <td className='px-4 py-2 border-b border-gray-200'>
                                    <input onChange={() => toggleJobVisibility(job._id)} className='scale-125 ml-4' type="checkbox" checked={job.visible} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='mt-4 flex justify-end'>
                <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700'
                    onClick={() => navigate('/dashboard/add-job')}
                >
                    Add new job
                </button>
            </div>

        </div>
    )
    : <div>
        <p>Loading...</p>
    </div>
        // : <Loading />
}

export default ManageJobs