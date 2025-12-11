import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

function Hero() {

    const {setSearchFilter, setIsSearched} = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
        // console.log({
        //     title: titleRef.current.value,
        //     location: locationRef.current.value
        // });
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-12 px-4'>
            <div className='relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 text-center mx-2 rounded-3xl shadow-2xl overflow-hidden'>
                {/* Decorative elements */}
                <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl'></div>
                
                <div className='relative z-10'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>Discover Your Dream Job</h2>
                    <p className='mb-10 max-w-2xl mx-auto text-base md:text-lg font-light px-5 text-blue-50'>Over 10,000+ opportunities waiting for you. Start your career journey today!</p>

                    <div className='flex items-center justify-between bg-white rounded-2xl text-gray-600 max-w-3xl mx-4 sm:mx-auto shadow-xl p-2'>
                        <div className='flex items-center flex-1 px-3'>
                            <img className='h-5 sm:h-6 mr-3' src={assets.search_icon} alt="" />
                            <input type="text" placeholder='Job title or keyword' className='max-sm:text-sm text-base p-2 rounded outline-none w-full placeholder-gray-400' ref={titleRef}/>
                        </div>

                        <div className='h-10 w-px bg-gray-300 max-sm:hidden'></div>

                        <div className='flex items-center flex-1 px-3 max-sm:hidden'>
                            <img className='h-5 sm:h-6 mr-3' src={assets.location_icon} alt="" />
                            <input type="text" placeholder='City or state' className='text-base p-2 rounded outline-none w-full placeholder-gray-400' ref={locationRef}/>
                        </div>

                        <button onClick={onSearch} className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer text-white rounded-xl font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg max-sm:px-4 max-sm:text-sm'>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className='bg-white border border-gray-200 shadow-lg mx-2 mt-8 p-8 rounded-2xl'>
                <div className='flex gap-8 lg:gap-16 justify-center items-center flex-wrap'>
                    <p className='font-semibold text-gray-700 text-lg'>Trusted by</p>
                    <img className='h-7 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0' src={assets.accenture_logo} alt="" />
                    <img className='h-7 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0' src={assets.microsoft_logo} alt="" />
                    <img className='h-7 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0' src={assets.walmart_logo} alt="" />
                    <img className='h-7 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0' src={assets.samsung_logo} alt="" />
                    <img className='h-7 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0' src={assets.amazon_logo} alt="" />
                    <img className='h-7 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0' src={assets.adobe_logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero