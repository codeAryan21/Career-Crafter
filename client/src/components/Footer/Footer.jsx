import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-20'>
            <div className='container px-4 2xl:px-20 mx-auto py-8'>
                <div className='w-full flex items-center justify-between gap-6 flex-wrap'>
                    <img width={160} src={assets.logo} alt="Career Crafter" className='hover:opacity-80 transition-opacity' />
                    <div className='flex items-center gap-6 max-sm:hidden'>
                        <Link to='/faq' className='text-gray-600 hover:text-blue-600 font-medium transition-colors'>
                            Help & FAQ
                        </Link>
                        <span className='text-gray-400'>|</span>
                        <p className='text-gray-600 font-medium'>&copy; 2025 Career Crafter. All Rights Reserved by <span className='text-blue-600'>Aryan Singh</span></p>
                    </div>
                    <div className='flex gap-3'>
                        <a href="https://github.com/codeAryan21" target="_blank" rel="noopener noreferrer" 
                           className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-gray-200'>
                            <img width={20} src={assets.github} alt="GitHub" />
                        </a>

                        <a href="https://linkedin.com/in/aryan-singh-3405a8351" target="_blank" rel="noopener noreferrer"
                           className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-gray-200'>
                            <img width={20} src={assets.linkedin} alt="LinkedIn" />
                        </a>

                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
                           className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-gray-200'>
                            <img width={20} src={assets.twitter_icon} alt="Twitter" />
                        </a>
                    </div>
                </div>
                <div className='sm:hidden text-center mt-4 space-y-2'>
                    <Link to='/faq' className='block text-blue-600 font-medium hover:text-blue-700 transition-colors'>
                        Help & FAQ
                    </Link>
                    <p className='text-gray-600 font-medium'>&copy; 2025 Career Crafter. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer