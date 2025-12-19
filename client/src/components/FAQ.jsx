import { useState } from 'react';

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: "For Job Seekers",
            questions: [
                {
                    question: "How do I create an effective profile?",
                    answer: "Complete all sections of your profile including skills, experience, and education. Upload a professional resume and add a clear profile picture. Keep your information updated and use relevant keywords."
                },
                {
                    question: "What file formats are supported for resume upload?",
                    answer: "We support PDF files for resume uploads. Make sure your file is under 5MB and contains clear, readable text."
                },
                {
                    question: "How can I track my job applications?",
                    answer: "Go to your Applications page to see all jobs you've applied for, their current status (Pending, Accepted, Rejected), and application dates."
                },
                {
                    question: "How does the job matching work?",
                    answer: "Our AI algorithm matches jobs based on your skills, experience, location preferences, and career goals. Keep your profile updated for better matches."
                }
            ]
        },
        {
            category: "For Recruiters",
            questions: [
                {
                    question: "How do I post a job listing?",
                    answer: "Login to your recruiter dashboard, go to 'Add Job', fill in the job details including title, description, requirements, and location. Your job will be live immediately after posting."
                },
                {
                    question: "How can I manage job applications?",
                    answer: "Use the 'View Applications' section to see all candidates who applied. You can accept or reject applications, and view candidate profiles and resumes."
                },
                {
                    question: "Can I edit my company profile?",
                    answer: "Yes, go to 'Company Profile' in your dashboard to update company information, description, website, industry, and other details."
                },
                {
                    question: "How do I make my jobs more visible?",
                    answer: "Write clear job titles, detailed descriptions, and use relevant keywords. Complete your company profile and keep job postings updated."
                }
            ]
        },
        {
            category: "General",
            questions: [
                {
                    question: "Is Career Crafter free to use?",
                    answer: "Yes, Career Crafter is free for job seekers. Recruiters can post jobs and manage applications at no cost during our launch period."
                },
                {
                    question: "How do I reset my password?",
                    answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
                },
                {
                    question: "Is my personal information secure?",
                    answer: "Yes, we use industry-standard security measures to protect your data. Your personal information is never shared without your consent."
                },
                {
                    question: "How do I contact support?",
                    answer: "You can reach our support team at support@careercrafter.com or use the contact form. We typically respond within 24 hours."
                }
            ]
        }
    ];

    const toggleFAQ = (categoryIndex, questionIndex) => {
        const index = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Find answers to common questions about Career Crafter
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Category Header */}
                            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                                <h3 className="text-xl font-semibold text-blue-900">
                                    {category.category}
                                </h3>
                            </div>

                            {/* Questions */}
                            <div className="divide-y divide-gray-200">
                                {category.questions.map((faq, questionIndex) => {
                                    const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                                    return (
                                        <div key={questionIndex}>
                                            <button
                                                className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                                                onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-lg font-medium text-gray-900 pr-4">
                                                        {faq.question}
                                                    </h4>
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
                                                <div className="px-6 pb-4">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 text-center">
                    <div className="bg-blue-600 rounded-lg p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-blue-100 mb-6">
                            Can't find the answer you're looking for? Our support team is here to help.
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
        </section>
    );
}

export default FAQ;