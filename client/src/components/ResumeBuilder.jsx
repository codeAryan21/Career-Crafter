import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ResumeBuilder = () => {
    const { backendUrl, employeeToken } = useContext(AppContext);
    const [resumeData, setResumeData] = useState({
        template: 'modern',
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            linkedin: '',
            github: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/resume`, {
                headers: { 'token': employeeToken }
            });
            if (response.data.success && response.data.data) {
                setResumeData(response.data.data);
            }
        } catch (error) {
            console.log('No existing resume found');
        }
    };

    const handleInputChange = (section, field, value, index = null) => {
        setResumeData(prev => {
            if (index !== null) {
                const newArray = [...prev[section]];
                newArray[index] = { ...newArray[index], [field]: value };
                return { ...prev, [section]: newArray };
            } else if (section === 'personalInfo') {
                return {
                    ...prev,
                    personalInfo: { ...prev.personalInfo, [field]: value }
                };
            } else {
                return { ...prev, [field]: value };
            }
        });
    };

    const addArrayItem = (section) => {
        const templates = {
            experience: { company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
            education: { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
            projects: { name: '', description: '', technologies: [], url: '' },
            certifications: { name: '', issuer: '', date: '', url: '' }
        };
        
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], templates[section]]
        }));
    };

    const removeArrayItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const handleSkillsChange = (value) => {
        const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
        setResumeData(prev => ({ ...prev, skills }));
    };

    const saveResume = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/resume`, resumeData, {
                headers: { 'token': employeeToken }
            });
            if (response.data.success) {
                toast.success('Resume saved successfully!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to save resume');
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/resume/pdf`, {
                responseType: 'blob',
                headers: { 'token': employeeToken }
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            toast.success('Resume downloaded successfully!');
        } catch (error) {
            toast.error('Failed to download resume');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
                <div className="space-x-4">
                    <button
                        onClick={saveResume}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Resume'}
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={resumeData.personalInfo.address}
                        onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="url"
                        placeholder="LinkedIn Profile (https://linkedin.com/in/username)"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="url"
                        placeholder="GitHub Profile (https://github.com/username)"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                <textarea
                    placeholder="Write a brief summary about yourself..."
                    value={resumeData.summary}
                    onChange={(e) => handleInputChange(null, 'summary', e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <input
                    type="text"
                    placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
                    value={resumeData.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Experience */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Experience</h2>
                    <button
                        onClick={() => addArrayItem('experience')}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                        Add Experience
                    </button>
                </div>
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={exp.position}
                                onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <textarea
                            placeholder="Job description..."
                            value={exp.description}
                            onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <button
                            onClick={() => removeArrayItem('experience', index)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <button
                        onClick={() => addArrayItem('education')}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                        Add Education
                    </button>
                </div>
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Field of Study"
                                value={edu.field}
                                onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="GPA (optional)"
                                value={edu.gpa}
                                onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            onClick={() => removeArrayItem('education', index)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Projects */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    <button
                        onClick={() => addArrayItem('projects')}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                        Add Project
                    </button>
                </div>
                {resumeData.projects.map((project, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={project.name}
                                onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="url"
                                placeholder="Project URL (optional)"
                                value={project.url}
                                onChange={(e) => handleInputChange('projects', 'url', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <textarea
                            placeholder="Project description..."
                            value={project.description}
                            onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Technologies used (comma separated)"
                            value={project.technologies?.join(', ') || ''}
                            onChange={(e) => {
                                const techs = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                                handleInputChange('projects', 'technologies', techs, index);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <button
                            onClick={() => removeArrayItem('projects', index)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Certifications</h2>
                    <button
                        onClick={() => addArrayItem('certifications')}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                        Add Certification
                    </button>
                </div>
                {resumeData.certifications.map((cert, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Certification Name"
                                value={cert.name}
                                onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Issuing Organization"
                                value={cert.issuer}
                                onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="date"
                                placeholder="Date Obtained"
                                value={cert.date}
                                onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="url"
                                placeholder="Certificate URL (optional)"
                                value={cert.url}
                                onChange={(e) => handleInputChange('certifications', 'url', e.target.value, index)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            onClick={() => removeArrayItem('certifications', index)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeBuilder;