import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='container px-4 2xl:px-20 mx-auto flex flex-col items-center gap-2 py-3 mt-20'>
            <div className='w-full flex items-center justify-between gap-4'>
                <img width={160} src={assets.logo} alt="" />
                <p className='flex-1 pl-4 text-gray-500 max-sm:hidden'>&copy; Copyright 2025 | All Rights Reserved by AryanSingh.</p>
                <div className='flex gap-2.5'>

                    <a href="https://github.com/codeAryan21" target="_blank" rel="noopener noreferrer">
                        <img width={38} src={assets.github} alt="GitHub" />
                    </a>

                    <a href="https://linkedin.com/in/aryan-singh-3405a8351" target="_blank" rel="noopener noreferrer">
                        <img width={38} src={assets.linkedin} alt="LinkedIn" />
                    </a>

                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img width={38} src={assets.twitter_icon} alt="" />
                    </a>
                </div>
            </div>
            <p className='text-gray-500 sm:hidden text-center'>&copy; Copyright 2025 | All Rights Reserved by AryanSingh.</p>
        </div>
    )
}

export default Footer