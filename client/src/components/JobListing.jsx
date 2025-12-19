import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

function JobListing() {

    const { searchFilter, isSearched, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllLocations, setShowAllLocations] = useState(false)

    // to store the filtered job data
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    // If the selected category is already their then it will removed, if it is not their then we add it.
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category)
            } else {
                return [...prev, category]
            }
        })
    }    

    const handleLocationChange = (location) => {
        setSelectedLocation(prev => {
            if (prev.includes(location)) {
                return prev.filter(l => l !== location)
            } else {
                return [...prev, location]
            }
        })
    }

    useEffect(() => {
        // that filter the data according to our filter
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
        const matchesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location);

        const matchesTitle = job => {
            if (searchFilter.title === "") return true;
            const searchTerm = searchFilter.title.toLowerCase();
            const titleMatch = job.title.toLowerCase().includes(searchTerm) ||
                             job.category.toLowerCase().includes(searchTerm);
            return titleMatch;
        }
        
        const matchesSearchLocation = job => {
            if (searchFilter.location === "") return true;
            const searchLocation = searchFilter.location.toLowerCase();
            const locationMatch = job.location.toLowerCase().includes(searchLocation);
            return locationMatch;
        }

        // we use reverse because we want the latest data at the top of the search result
        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    }, [jobs,selectedCategories,selectedLocation,searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto py-12 px-4'>
            <div className='flex flex-col lg:flex-row gap-8'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-6 py-6 rounded-2xl shadow-md h-fit lg:sticky lg:top-24'>
                {/* Search filter from Hero component */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-bold text-lg mb-4 text-gray-800'>Active Filters</h3>
                            <div className='mb-6 flex flex-wrap gap-2'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2 bg-blue-100 text-blue-700 border border-blue-300 px-4 py-2 rounded-full font-medium'>
                                        {searchFilter.title}
                                        <button onClick={e => setSearchFilter(prev => ({ ...prev, title: '' }))} className='hover:bg-blue-200 rounded-full p-0.5 transition-colors'>
                                            <img className='w-3 h-3' src={assets.cross_icon} alt="" />
                                        </button>
                                    </span>
                                )}

                                {searchFilter.location && (
                                    <span className='inline-flex items-center gap-2 bg-purple-100 text-purple-700 border border-purple-300 px-4 py-2 rounded-full font-medium'>
                                        {searchFilter.location}
                                        <button onClick={e => setSearchFilter(prev => ({ ...prev, location: '' }))} className='hover:bg-purple-200 rounded-full p-0.5 transition-colors'>
                                            <img className='w-3 h-3' src={assets.cross_icon} alt="" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-2.5 bg-blue-600 text-white font-semibold border-none lg:hidden rounded-xl cursor-pointer hover:bg-blue-700 transition-colors mb-4 w-full'>
                    {showFilter ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Category filter */}
                <div className={showFilter ? " " : 'max-lg:hidden'}>
                    <h4 className='font-bold text-lg py-4 text-gray-800 border-b border-gray-200'>Categories</h4>
                    <ul className='space-y-3 text-gray-700 mt-4'>
                        {
                            (showAllCategories ? JobCategories : JobCategories.slice(0, 5)).map((category, index) => (
                                <li className='flex gap-3 items-center hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer' key={index}>
                                    <input 
                                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                                    type="checkbox" 
                                    id={`category-${index}`}
                                    onChange={() => handleCategoryChange(category)} 
                                    checked={selectedCategories.includes(category)}
                                    />
                                    <label htmlFor={`category-${index}`} className='cursor-pointer font-medium'>{category}</label>
                                </li>
                            ))
                        }
                    </ul>
                    {JobCategories.length > 5 && (
                        <button 
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className='mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors'
                        >
                            {showAllCategories ? 'Show Less' : `Show More (${JobCategories.length - 5})`}
                        </button>
                    )}
                </div>

                {/* Location filter */}
                <div className={showFilter ? " " : 'max-lg:hidden'}>
                    <h4 className='pt-8 font-bold text-lg py-4 text-gray-800 border-b border-gray-200'>Locations</h4>
                    <ul className='space-y-3 text-gray-700 mt-4'>
                        {
                            (showAllLocations ? JobLocations : JobLocations.slice(0, 5)).map((location, index) => (
                                <li className='flex gap-3 items-center hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer' key={index}>
                                    <input 
                                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' 
                                    type="checkbox" 
                                    id={`location-${index}`}
                                    onChange={() => handleLocationChange(location)} 
                                    checked={selectedLocation.includes(location)} 
                                    />
                                    <label htmlFor={`location-${index}`} className='cursor-pointer font-medium flex items-center gap-2'>
                                        <img src={assets.location_icon} alt="Location" className="w-4 h-4 opacity-60" />
                                        {location}
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                    {JobLocations.length > 5 && (
                        <button 
                            onClick={() => setShowAllLocations(!showAllLocations)}
                            className='mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors'
                        >
                            {showAllLocations ? 'Show Less' : `Show More (${JobLocations.length - 5})`}
                        </button>
                    )}
                </div>

            </div>

            {/* Job Listings */}
            <section className='w-full lg:w-3/4 text-gray-800 lg:pl-8'>
                <div className='mb-8'>
                    <h3 className='font-bold text-4xl text-gray-800 mb-2' id='job-list'>Latest Jobs</h3>
                    <p className='text-gray-600 text-lg'>Discover your next career opportunity from top companies</p>
                    <div className='mt-4 flex items-center gap-2 text-sm text-gray-600'>
                        <span className='font-semibold text-blue-600'>{filteredJobs.length}</span> jobs found
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-3 mt-12'>
                        <a onClick={() => setCurrentPage(Math.max(currentPage-1,1))} href="#job-list" 
                           className='w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer'>
                            <img src={assets.left_arrow_icon} alt="Previous" className='w-5 h-5' />
                        </a>

                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg font-semibold transition-all ${
                                        currentPage === index + 1 
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg' 
                                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                    }`}>
                                    {index + 1}
                                </button>
                            </a>
                        ))}

                        <a onClick={() => setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))} href="#job-list"
                           className='w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer'>
                            <img src={assets.right_arrow_icon} alt="Next" className='w-5 h-5' />
                        </a>
                    </div>
                )}

            </section>
            </div>
        </div>
    )
}

export default JobListing