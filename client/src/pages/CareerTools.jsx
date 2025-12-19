import { useState } from 'react';
import ResumeParser from '../components/ResumeParser';
import JobRecommendations from '../components/JobRecommendations';
import ResumeBuilder from '../components/ResumeBuilder';
import Preferences from '../components/Preferences';

const CareerTools = () => {
    const [activeTab, setActiveTab] = useState('recommendations');
    
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const tabs = [
        { id: 'recommendations', label: 'Job Recommendations', icon: '🎯' },
        { id: 'parser', label: 'Resume Parser', icon: '📄' },
        { id: 'builder', label: 'Resume Builder', icon: '🔧' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'recommendations':
                return <JobRecommendations />;
            case 'parser':
                return <ResumeParser onParsed={() => setActiveTab('recommendations')} />;
            case 'builder':
                return <ResumeBuilder />;
            case 'preferences':
                return <Preferences />;
            default:
                return <JobRecommendations />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Tools</h1>
                    <p className="text-lg text-gray-600">
                        Enhance your job search with AI-powered tools
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-sm p-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {renderContent()}
                </div>

                {/* Feature Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-3">🤖</div>
                        <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
                        <p className="text-gray-600 text-sm">
                            Get personalized job recommendations based on your skills and preferences
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-3">📊</div>
                        <h3 className="text-lg font-semibold mb-2">Resume Analysis</h3>
                        <p className="text-gray-600 text-sm">
                            Extract skills and experience from your resume automatically
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-3">✨</div>
                        <h3 className="text-lg font-semibold mb-2">Professional Resume</h3>
                        <p className="text-gray-600 text-sm">
                            Build and download professional resumes with multiple templates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerTools;