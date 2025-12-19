import { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const { setShowRecruiterLogin, setShowUserLogin, employeeData, logoutEmployee, companyData, logoutCompany } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);
    const user = employeeData;
    const company = companyData;

    return (
        <nav className='sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center py-4'>
                <img onClick={() => navigate('/')} className='cursor-pointer h-10 hover:opacity-80 transition-opacity' src={assets.logo} alt="logo" />

                {
                    user ?
                        <div className="flex items-center gap-4">
                            <Link to={'/applications'} className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 max-sm:text-sm'>
                                Applied Jobs
                            </Link>
                            <span className='text-gray-300'>|</span>
                            <Link to={'/career-tools'} className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 max-sm:text-sm'>
                                Career Tools
                            </Link>
                            <span className='text-gray-300'>|</span>
                            <p className='max-sm:hidden text-gray-700 font-medium'>Hi, <span className='text-blue-600'>{user.fullName}</span></p>
                            <div className='relative'>
                                <img src={user.image} alt="profile" className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 hover:border-blue-600 transition-all duration-200 shadow-sm"
                                    onClick={() => setShowMenu(!showMenu)}
                                />
                                {showMenu && (
                                    <div className="absolute right-0 top-14 bg-white shadow-xl rounded-xl w-48 py-2 z-50 border border-gray-100 animate-fadeIn">
                                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMenu(false)} >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            My Profile
                                        </Link>
                                        <button onClick={() => { logoutEmployee();}} className="w-full flex items-center gap-2 text-left px-4 py-2.5 hover:bg-red-50 text-red-600 cursor-pointer transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    : company ?
                        <div className="flex items-center gap-4">
                            <Link to={'/dashboard/analytics'} className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 max-sm:text-sm'>
                                Dashboard
                            </Link>
                            <span className='text-gray-300'>|</span>
                            <p className='max-sm:hidden text-gray-700 font-medium'>Welcome, <span className='text-blue-600'>{company.name}</span></p>
                            <div className='relative'>
                                <img src={company.image} alt="company" className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 hover:border-blue-600 transition-all duration-200 shadow-sm"
                                    onClick={() => setShowMenu(!showMenu)}
                                />
                                {showMenu && (
                                    <div className="absolute right-0 top-14 bg-white shadow-xl rounded-xl w-48 py-2 z-50 border border-gray-100 animate-fadeIn">
                                        <Link to="/dashboard/company-profile" className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setShowMenu(false)} >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H3m2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10.02" />
                                            </svg>
                                            Company Profile
                                        </Link>
                                        <button onClick={() => { logoutCompany();}} className="w-full flex items-center gap-2 text-left px-4 py-2.5 hover:bg-red-50 text-red-600 cursor-pointer transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <div className='flex gap-3 max-sm:text-xs items-center'>
                            <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50'>
                                Recruiter Login
                            </button>
                            <button onClick={() => setShowUserLogin(true)} className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium sm:px-8 px-5 py-2.5 rounded-full cursor-pointer hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'>
                                Login
                            </button>
                        </div>
                }
            </div>
        </nav>
    )
}

export default Navbar