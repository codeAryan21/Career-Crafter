import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function PublicUserProfile() {
    const { userId } = useParams();
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/profile/${userId}`);
            if (data.success) {
                setUser(data.data);
            }
        } catch (error) {
            toast.error("Failed to load user profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center py-32">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading user profile...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="text-center py-32">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">👤</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">User Not Found</h2>
                        <p className="text-gray-600 mb-8">The user profile you're looking for doesn't exist or has been removed.</p>
                        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                    {/* Back Button */}
                    <div className="mb-8">
                        <button 
                            onClick={() => navigate('/dashboard/view-applications')}
                            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Applications
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <img
                                src={user.image}
                                alt={user.fullName}
                                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{user.fullName}</h1>
                            <p className="text-xl text-blue-100 mb-4">@{user.username}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span>📅</span>
                                    <span>Member since {new Date(user.createdAt).getFullYear()}</span>
                                </div>
                                {user.profile?.skills?.length > 0 && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <span>🛠️</span>
                                        <span>{user.profile.skills.length} Skills</span>
                                    </div>
                                )}
                                {user.resume && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <span>📄</span>
                                        <span>Resume Available</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Skills Section */}
                        {user.profile?.skills?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 text-lg">🛠️</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Skills & Expertise</h2>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {user.profile.skills.map((skill, index) => (
                                        <span key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Experience Section */}
                        {user.profile?.experience?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600 text-lg">💼</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
                                </div>
                                <div className="space-y-6">
                                    {user.profile.experience.map((exp, index) => (
                                        <div key={index} className="relative pl-8 pb-6 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                                            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <h4 className="text-lg font-semibold text-gray-800">{exp.position}</h4>
                                                <p className="text-blue-600 font-medium">{exp.company}</p>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                                </p>
                                                {exp.description && (
                                                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education Section */}
                        {user.profile?.education?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600 text-lg">🎓</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">Education</h3>
                                </div>
                                <div className="space-y-4">
                                    {user.profile.education.map((edu, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-lg font-semibold text-gray-800">{edu.degree} in {edu.field}</h4>
                                            <p className="text-green-600 font-medium">{edu.institution}</p>
                                            <p className="text-sm text-gray-500">
                                                {edu.startDate} - {edu.endDate}
                                                {edu.gpa && ` | GPA: ${edu.gpa}`}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 text-lg">📊</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Profile Stats</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 font-medium">Skills</span>
                                    <span className="font-bold text-2xl text-blue-600">{user.profile?.skills?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 font-medium">Experience</span>
                                    <span className="font-semibold text-gray-800">{user.profile?.experience?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 font-medium">Education</span>
                                    <span className="font-semibold text-gray-800">{user.profile?.education?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600 text-lg">📞</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Contact Info</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 text-sm font-medium block mb-1">Full Name</span>
                                    <span className="font-semibold text-gray-800">{user.fullName}</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 text-sm font-medium block mb-1">Username</span>
                                    <span className="font-semibold text-gray-800">@{user.username}</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 text-sm font-medium block mb-1">Email</span>
                                    <span className="font-semibold text-gray-800">{user.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Resume Download */}
                        {user.resume && (
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Resume Available</h3>
                                <p className="text-blue-100 text-sm mb-4">Download candidate's resume</p>
                                <a 
                                    href={user.resume} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Download Resume
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PublicUserProfile;