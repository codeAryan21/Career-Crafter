import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

function JobCard({ job }) {
    const navigate = useNavigate();
    const { userData } = useContext(AppContext)

    const goToJob = (id) => {
        if (!userData) {
            toast.error('Log in to see the details')
            return
        }
        navigate(`/apply-job/${id}`)
        scrollTo(0, 0)
    }

    return (
        <div className='bg-white border border-gray-200 shadow-md hover:shadow-xl p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 card-hover group'>
            <div className='flex items-center justify-between mb-4'>
                <img className='h-10 w-10 object-contain rounded-lg bg-gray-50 p-1.5' src={job.companyId.image} alt="" />
                <span className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>{job.companyId.name}</span>
            </div>

            <h4 className='font-bold text-xl mt-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2'>{job.title}</h4>

            <div className='flex items-center gap-2 mt-3 text-xs flex-wrap'>
                <span className='bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium'>
                    <img className='w-3.5 h-3.5' src={assets.location_icon} alt="Location" />
                    {job.location}
                </span>
                <span className='bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full font-medium'>{job.level}</span>
            </div>

            <p className='text-gray-600 text-sm mt-4 line-clamp-3 leading-relaxed' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>

            <div className='mt-6 flex gap-3 text-sm'>
                <button
                    onClick={() => goToJob(job._id)}
                    className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg px-5 py-2.5 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                >
                    Apply now
                </button>

                <button
                    onClick={() => goToJob(job._id)}
                    className='text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 font-medium rounded-lg px-5 py-2.5 transition-all duration-300'
                >
                    Details
                </button>
            </div>
        </div>
    )
}

export default JobCard