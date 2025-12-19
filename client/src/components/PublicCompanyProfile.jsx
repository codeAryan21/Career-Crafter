import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function PublicCompanyProfile() {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanyProfile();
    }, [companyId]);

    const fetchCompanyProfile = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/company/profile/${companyId}`);
            if (data.success) {
                setCompany(data.data);
            }
        } catch (error) {
            toast.error("Failed to load company profile");
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
                        <p className="text-gray-600 text-lg">Loading company profile...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="text-center py-32">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🏢</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Company Not Found</h2>
                        <p className="text-gray-600 mb-8">The company profile you're looking for doesn't exist or has been removed.</p>
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
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <img
                                src={company.image}
                                alt={company.name}
                                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{company.name}</h1>
                            {company.industry && (
                                <p className="text-xl text-blue-100 mb-4">{company.industry}</p>
                            )}
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                                {company.location && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <span>📍</span>
                                        <span>{company.location}</span>
                                    </div>
                                )}
                                {company.companySize && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <span>👥</span>
                                        <span>{company.companySize} employees</span>
                                    </div>
                                )}
                                {company.founded && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <span>📅</span>
                                        <span>Founded {company.founded}</span>
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
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 text-lg">ℹ️</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">About {company.name}</h2>
                            </div>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {company.description || "This company hasn't added a description yet. Stay tuned for updates about their mission, values, and what makes them unique!"}
                                </p>
                            </div>
                        </div>

                        {company.website && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600 text-lg">🌐</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Website</h3>
                                </div>
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
                                >
                                    {company.website}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Company Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 text-lg">📊</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Company Stats</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 font-medium">Active Jobs</span>
                                    <span className="font-bold text-2xl text-blue-600">{company.activeJobsCount || 0}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 font-medium">Team Size</span>
                                    <span className="font-semibold text-gray-800">{company.companySize}</span>
                                </div>
                                {company.founded && (
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 font-medium">Founded</span>
                                        <span className="font-semibold text-gray-800">{company.founded}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600 text-lg">📞</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Company Info</h3>
                            </div>
                            <div className="space-y-4">
                                {company.location && (
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 text-sm font-medium block mb-1">Location</span>
                                        <span className="font-semibold text-gray-800">{company.location}</span>
                                    </div>
                                )}
                                {company.industry && (
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 text-sm font-medium block mb-1">Industry</span>
                                        <span className="font-semibold text-gray-800">{company.industry}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
                            <h3 className="text-lg font-bold mb-2">Interested in working here?</h3>
                            <p className="text-blue-100 text-sm mb-4">Check out their current job openings</p>
                            <Link 
                                to="/" 
                                className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                View Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PublicCompanyProfile;