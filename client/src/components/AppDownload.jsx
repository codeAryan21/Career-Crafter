import { assets } from '../assets/assets'

function AppDownload() {
    return (
        <div className='container px-4 2xl:px-20 mx-auto py-20'>
            <div className='relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-12 sm:p-24 lg:p-32 rounded-3xl shadow-xl overflow-hidden border border-blue-100'>
                {/* Decorative background */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl'></div>
                
                <div className='relative z-10'>
                    <h1 className='text-3xl font-bold sm:text-5xl mb-4 max-w-md text-gray-800 leading-tight'>Download Mobile App</h1>
                    <p className='text-gray-600 mb-8 max-w-md text-lg'>Get the best job hunting experience on your mobile device</p>
                    <div className='flex gap-4 flex-wrap'>
                        <a href="#" className='inline-block transform hover:scale-105 transition-transform duration-300'>
                            <img className='h-14 shadow-md rounded-lg' src={assets.play_store} alt="" />
                        </a>
                        <a href="#" className='inline-block transform hover:scale-105 transition-transform duration-300'>
                            <img className='h-14 shadow-md rounded-lg' src={assets.app_store} alt="" />
                        </a>
                    </div>
                </div>
                <img className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden drop-shadow-2xl' src={assets.app_main_img} alt="" />
            </div>
        </div>
    )
}

export default AppDownload