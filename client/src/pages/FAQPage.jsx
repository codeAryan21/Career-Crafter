import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FAQPage() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);
    const [activeTab, setActiveTab] = useState('general');

    const faqData = {
        general: [
            {
                question: "Is Career Crafter free to use?",
                answer: "Yes! Career Crafter is completely free for job seekers. Recruiters can also post jobs and manage applications at no cost."
            },
            {
                question: "Who can use Career Crafter?",
                answer: "Anyone looking for jobs or hiring talent. Job seekers can browse and apply for positions, while recruiters can post jobs and find candidates."
            },
            {
                question: "How secure is my data?",
                answer: "We use industry-standard encryption and security measures. Your personal information is never shared without your explicit consent."
            },
            {
                question: "How do I contact support?",
                answer: "Email us at support@careercrafter.com or use our contact form. We respond within 24 hours."
            }
        ],
        jobseekers: [
            {
                question: "How do I create an effective profile?",
                answer: "Complete all sections including skills, experience, and education. Upload a professional resume and add relevant keywords for better job matches."
            },
            {
                question: "What resume formats are accepted?",
                answer: "We accept PDF files up to 5MB. Ensure your resume has clear, readable text for our AI parser to extract your skills effectively."
            },
            {
                question: "Can I apply to multiple jobs?",
                answer: "Yes! You can apply to as many jobs as you want. Track all your applications in the Applications section of your dashboard."
            },
            {
                question: "How does job matching work?",
                answer: "Our AI algorithm matches jobs based on your skills, experience, location preferences, and career goals. Keep your profile updated for better matches."
            },
            {
                question: "Can I update my resume after applying?",
                answer: "Yes, you can update your resume anytime. However, jobs you've already applied to will use the resume version from when you applied."
            }
        ],
        recruiters: [
            {
                question: "How do I post a job?",
                answer: "Login to your recruiter dashboard, click 'Add Job', fill in the details, and publish. Your job goes live immediately."
            },
            {
                question: "How long does a job stay active?",
                answer: "Jobs remain active until you close them or they expire (if you set an expiry date). You can edit or deactivate jobs anytime."
            },
            {
                question: "Can I edit jobs after posting?",
                answer: "No, jobs cannot be edited after posting. You can delete and repost if changes are needed."
            },
            {
                question: "How do I manage applications?",
                answer: "Use the 'View Applications' section to see all candidates, review their profiles, and update application status (Accept/Reject)."
            },
            {
                question: "How can I make my jobs more visible?",
                answer: "Write clear titles and detailed descriptions, use relevant keywords, complete your company profile, and keep postings updated."
            }
        ]
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: '❓' },
        { id: 'jobseekers', label: 'Job Seekers', icon: '👤' },
        { id: 'recruiters', label: 'Recruiters', icon: '🏢' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600">
                        Find answers to common questions about Career Crafter
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-1 shadow-md">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setOpenIndex(null);
                                }}
                                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Content */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {faqData[activeTab].map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index}>
                                    <button
                                        className="w-full px-6 py-5 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                                {faq.question}
                                            </h3>
                                            <svg
                                                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed pt-3">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-blue-100 mb-6">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <a
                        href="mailto:support@careercrafter.com"
                        className="inline-flex items-center bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;