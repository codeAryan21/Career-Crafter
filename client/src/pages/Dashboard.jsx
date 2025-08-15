import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

function Dashboard() {
    const navigate = useNavigate();
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    // Function to logout for recruiter
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if(companyData){
            navigate('/dashboard/add-job')
        }
    }, [companyData])

    return (
        <div className='min-h-screen'>
            {/* Navbar for recruiter pannel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'> 
                    <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />

                    { companyData && (
                        <div className='flex items-center gap-3'>
                        <p className='max-sm:hidden'>Welcome, {companyData.name}</p>

                        <div className='relative group'>
                            <img className='w-8 border border-gray-100 rounded-full cursor-pointer' src={companyData.image} alt="" />
                            {/* dropdown menu */}
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 cursor-pointer'>
                                <ul className='list-none m-0 py-2 px-4 border bg-gray-100 rounded-md text-sm border-gray-500 '>
                                    <li onClick={logout} className='py-1 px-2 pr-10 cursor-pointer'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    
                    </div>
                    )}

                </div>
            </div>

            <div className='flex items-start'>
                {/* Left Sidebar with options to Add Jobs, Manage Jobs and View Applications */}
                <div className='min-h-screen inline-block border-r-2 border-gray-200'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        {/* we were using dynamic classname */}
                        <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-blue-500 border-r-4 '}`} to={'/dashboard/add-job'}>
                            <img className='min-h-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-blue-500 border-r-4 '}`} to={'/dashboard/manage-jobs'}>
                            <img className='min-h-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-blue-500 border-r-4 '}`} to={'/dashboard/view-applications'}>
                            <img className='min-h-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet/>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard