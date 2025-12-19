import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import JobCard from './JobCard';

const JobRecommendations = () => {
    const { backendUrl, employeeToken, jobs } = useContext(AppContext);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/resume/recommendations`, {
                headers: { 'token': employeeToken }
            });
            if (response.data.success) {
                setRecommendations(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch recommendations');
        } finally {
            setLoading(false);
        }
    };

    const applyForJob = async (jobId) => {
        try {
            const response = await axios.post(`${backendUrl}/api/users/apply-job`, { jobId }, {
                headers: { 'token': employeeToken }
            });
            if (response.data.success) {
                toast.success('Applied successfully!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading recommendations...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Recommended Jobs for You</h2>
                <button 
                    onClick={() => {
                        setLoading(true);
                        fetchRecommendations();
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                    <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>
            
            {recommendations.length === 0 ? (
                <div className="space-y-6">
                    <div className="text-center py-8 bg-blue-50 rounded-lg">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Personalized Recommendations Yet</h3>
                        <p className="text-gray-600 mb-4">Upload your resume and set your preferences to get AI-powered job recommendations!</p>
                        <div className="flex justify-center space-x-4">
                            <p className="text-sm text-gray-600">Upload your resume and set preferences to get personalized recommendations!</p>
                        </div>
                    </div>
                    
                    {jobs.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Browse All Available Jobs</h3>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {jobs.slice(0, 6).map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.filter(job => job && job._id).map((job) => (
                        <div key={job._id} className="space-y-2">
                            {/* Match Score Badge */}
                            {job.matchScore > 0 && (
                                <div className="flex justify-end">
                                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {job.matchScore} skill matches
                                    </span>
                                </div>
                            )}
                            
                            {/* Use Same JobCard as Home Page */}
                            <JobCard job={job} />
                            
                            {/* Matching Skills Below Card */}
                            {job.matchingSkills?.length > 0 && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-sm font-medium text-green-800 mb-2">Your matching skills:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {job.matchingSkills.slice(0, 4).map((skill, index) => (
                                            <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                ✓ {skill}
                                            </span>
                                        ))}
                                        {job.matchingSkills.length > 4 && (
                                            <span className="text-xs text-green-600 px-2 py-1">+{job.matchingSkills.length - 4} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobRecommendations;