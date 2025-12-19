import { useState } from 'react';

function ContextualFAQ({ type = 'general', questions = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const defaultQuestions = {
        apply: [
            {
                question: "Can I apply to multiple jobs?",
                answer: "Yes! You can apply to as many jobs as you want and track them all in your dashboard."
            },
            {
                question: "Can I update my resume after applying?",
                answer: "You can update your resume anytime, but jobs already applied to will use the original version."
            }
        ],
        upload: [
            {
                question: "What file formats are accepted?",
                answer: "We accept PDF files up to 5MB with clear, readable text."
            },
            {
                question: "How does resume parsing work?",
                answer: "Our AI extracts skills and experience from your resume to improve job matching."
            }
        ],
        postJob: [
            {
                question: "How long does a job stay active?",
                answer: "Jobs remain active until you close them or they reach their expiry date."
            },
            {
                question: "Can I edit a job after posting?",
                answer: "No, jobs cannot be edited after posting. You'll need to delete and repost if changes are needed."
            }
        ],
        applications: [
            {
                question: "How do I change candidate status?",
                answer: "Click on any application to view details and update status to Accept or Reject."
            },
            {
                question: "Can I contact candidates directly?",
                answer: "You can view candidate contact information after they apply to your jobs."
            }
        ]
    };

    const faqQuestions = questions.length > 0 ? questions : defaultQuestions[type] || [];

    if (faqQuestions.length === 0) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left"
            >
                <div className="flex items-center">
                    <span className="text-blue-600 mr-2">❓</span>
                    <h4 className="font-semibold text-blue-900">Need help?</h4>
                </div>
                <svg
                    className={`w-4 h-4 text-blue-600 transform transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="mt-3 space-y-2">
                    {faqQuestions.map((faq, index) => (
                        <div key={index} className="border-t border-blue-200 pt-2">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="text-sm font-medium text-blue-800 hover:text-blue-900 text-left w-full"
                            >
                                {faq.question}
                            </button>
                            {openIndex === index && (
                                <p className="text-sm text-blue-700 mt-1 pl-2">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContextualFAQ;