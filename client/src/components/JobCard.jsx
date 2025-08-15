import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function JobCard({ job }) {
    const navigate = useNavigate();

    return (
        <div className='border-none shadow p-6 rounded'>
            <div className='flex items-center justify-between'>
                <img className='h-8' src={job.companyId.image} alt="" />
            </div>

            <h4 className='font-medium text-xl mt-2'>{job.title}</h4>

            <div className='flex items-center gap-3 mt-2 text-xs'>
                <span className='bg-blue-50 border border-blue-200 px-3 py-1.5 rounded flex items-center gap-1'>
                    <img className='w-4 h-4' src={assets.location_icon} alt="Location" />
                    {job.location}
                </span>
                <span className='bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded'>{job.level}</span>
            </div>

            <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>

            <div className='mt-4 flex gap-3 text-sm'>
                <button
                    onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
                    className='bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded m-1 px-5 py-2'
                >
                    Apply now
                </button>

                <button
                    onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
                    className='text-gray-500 border border-gray-500 cursor-pointer rounded m-1 px-5 py-2'
                >
                    Learn more
                </button>
            </div>
        </div>
    )
}

export default JobCard