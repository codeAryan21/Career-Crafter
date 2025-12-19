import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ResumeParser = ({ onParsed }) => {
    const { backendUrl, employeeToken } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [parsedData, setParsedData] = useState(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post(`${backendUrl}/api/resume/parse`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'token': employeeToken
                }
            });
            
            if (response.data.success) {
                setParsedData(response.data.data);
                onParsed?.(response.data.data);
                toast.success('Resume parsed successfully!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to parse resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Resume Parser</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Upload Resume (PDF)
                </label>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {loading && (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Parsing resume...</p>
                </div>
            )}

            {parsedData && (
                <div className="mt-6 space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-700">Extracted Skills:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {parsedData.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {parsedData.summary && (
                        <div>
                            <h4 className="font-medium text-gray-700">Summary:</h4>
                            <p className="text-gray-600 text-sm mt-1">{parsedData.summary}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResumeParser;