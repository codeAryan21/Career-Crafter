import { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function AddJob() {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('Bangalore')
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner evel')
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(`${backendUrl}/api/company/post-job`, {
                title,
                description,
                location,
                category,
                level,
                salary
                },
                { headers: { token: companyToken }}
            )

            if(data.success){
                toast.success(data.message);
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            }else{
                toast.error(data.message)
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
        // Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            })
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className='container p-6 flex flex-col w-full items-start gap-6 bg-white rounded-2xl shadow-md'>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Post a New Job</h2>
            
            <div className='w-full'>
                <label className='block mb-2 font-semibold text-gray-700'>Job Title</label>
                <input type="text" placeholder='e.g. Senior Software Engineer'
                    onChange={e => setTitle(e.target.value)} value={title} required
                    className='w-full max-w-lg px-4 py-3 border-2 border-gray-300 rounded-xl outline-none text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
            </div>

            <div className='w-full max-w-3xl'>
                <label className='block mb-2 font-semibold text-gray-700'>Job Description</label>
                <div ref={editorRef} className='bg-white border-2 border-gray-300 rounded-xl min-h-[200px] focus-within:border-blue-500 transition-all'>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-4 sm:gap-6 flex-wrap'>
                <div className='flex-1 min-w-[200px]'>
                    <label className='block mb-2 font-semibold text-gray-700'>Job Category</label>
                    <select className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white'
                        onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className='flex-1 min-w-[200px]'>
                    <label className='block mb-2 font-semibold text-gray-700'>Job Location</label>
                    <select className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white'
                        onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div className='flex-1 min-w-[200px]'>
                    <label className='block mb-2 font-semibold text-gray-700'>Job Level</label>
                    <select className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white'
                        onChange={e => setLevel(e.target.value)}>
                        <option value="Beginner level">Beginner level</option>
                        <option value="Intermediate level">Intermediate level</option>
                        <option value="Senior level">Senior level</option>
                    </select>
                </div>
            </div>

            <div>
                <label className='block mb-2 font-semibold text-gray-700'>Annual Salary (USD)</label>
                <input className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl sm:w-[200px] outline-none text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                    onChange={e => setSalary(e.target.value)} value={salary} type="number" placeholder='50000' min={0}
                />
            </div>

            <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold mt-4 px-8 py-3 rounded-xl cursor-pointer hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5'>
                Post Job
            </button>
        </form>
    )
}

export default AddJob