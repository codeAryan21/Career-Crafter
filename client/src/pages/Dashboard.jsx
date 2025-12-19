import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { companyData, logoutCompany } = useContext(AppContext);

    useEffect(() => {
        if(companyData && location.pathname === '/dashboard'){
            navigate('/dashboard/analytics')
        }
    }, [companyData, location.pathname])

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Navbar for recruiter panel */}
            <div className='bg-white shadow-sm border-b border-gray-200 py-4 sticky top-0 z-40'>
                <div className='px-5 flex justify-between items-center'> 
                    <img onClick={e => {
                        if (companyData) navigate('/dashboard/analytics')
                        else navigate('/')
                    }} className='max-sm:w-32 cursor-pointer hover:opacity-80 transition-opacity h-10' src={assets.logo} alt="" />

                    { companyData && (
                        <div className='flex items-center gap-4'>
                        <p className='max-sm:hidden text-gray-700 font-medium'>Welcome, <span className='text-blue-600 font-semibold'>{companyData.name}</span></p>

                        <div className='relative group'>
                            <img className='w-10 h-10 border-2 border-blue-500 rounded-full cursor-pointer hover:border-blue-600 transition-all shadow-sm' src={companyData.image} alt="" />
                            {/* dropdown menu */}
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-14 cursor-pointer'>
                                <ul className='list-none m-0 py-2 bg-white rounded-xl text-sm border border-gray-200 shadow-xl min-w-[140px]'>
                                    <li onClick={logoutCompany} className='py-2.5 px-4 hover:bg-red-50 text-red-600 cursor-pointer transition-colors flex items-center gap-2 font-medium'>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
                    </div>
                    )}

                </div>
            </div>

            <div className='flex items-start'>
                {/* Left Sidebar with options to Add Jobs, Manage Jobs and View Applications */}
                <div className='min-h-screen inline-block bg-white border-r border-gray-200 shadow-sm'>
                    <ul className='flex flex-col items-start pt-6 text-gray-700'>
                        <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${isActive && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600 border-r-4 text-blue-700'}`} to={'/dashboard/analytics'}>
                            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className='max-sm:hidden'>Analytics</p>
                        </NavLink>

                        <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${isActive && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600 border-r-4 text-blue-700'}`} to={'/dashboard/add-job'}>
                            <img className='w-5 h-5' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${isActive && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600 border-r-4 text-blue-700'}`} to={'/dashboard/manage-jobs'}>
                            <img className='w-5 h-5' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${isActive && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600 border-r-4 text-blue-700'}`} to={'/dashboard/view-applications'}>
                            <img className='w-5 h-5' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>

                        <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${isActive && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600 border-r-4 text-blue-700'}`} to={'/dashboard/company-profile'}>
                            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H3m2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10.02" />
                            </svg>
                            <p className='max-sm:hidden'>Company Profile</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-4 sm:p-8 bg-gray-50'>
                    <Outlet/>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard