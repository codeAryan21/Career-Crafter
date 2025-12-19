import { useState} from 'react';

function ProfileSections({ employeeData, isEditing, profileSections, setProfileSections }) {
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill.trim()) {
            setProfileSections({
                ...profileSections,
                skills: [...profileSections.skills, newSkill.trim()]
            });
            setNewSkill('');
        }
    };

    const removeSkill = (index) => {
        setProfileSections({
            ...profileSections,
            skills: profileSections.skills.filter((_, i) => i !== index)
        });
    };

    const addExperience = () => {
        setProfileSections({
            ...profileSections,
            experience: [...profileSections.experience, {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            }]
        });
    };

    const updateExperience = (index, field, value) => {
        const updated = profileSections.experience.map((exp, i) => 
            i === index ? { ...exp, [field]: value } : exp
        );
        setProfileSections({ ...profileSections, experience: updated });
    };

    const removeExperience = (index) => {
        setProfileSections({
            ...profileSections,
            experience: profileSections.experience.filter((_, i) => i !== index)
        });
    };

    const addEducation = () => {
        setProfileSections({
            ...profileSections,
            education: [...profileSections.education, {
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                gpa: ''
            }]
        });
    };

    const updateEducation = (index, field, value) => {
        const updated = profileSections.education.map((edu, i) => 
            i === index ? { ...edu, [field]: value } : edu
        );
        setProfileSections({ ...profileSections, education: updated });
    };

    const removeEducation = (index) => {
        setProfileSections({
            ...profileSections,
            education: profileSections.education.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Professional Profile</h2>
            </div>

            {/* Skills Section */}
            <section className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
                {isEditing ? (
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill"
                                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                            />
                            <button
                                onClick={addSkill}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profileSections.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {skill}
                                    <button
                                        onClick={() => removeSkill(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {employeeData?.profile?.skills?.length > 0 ? (
                            employeeData.profile.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500">No skills added yet</p>
                        )}
                    </div>
                )}
            </section>

            {/* Experience Section */}
            <section className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                    {isEditing && (
                        <button
                            onClick={addExperience}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                            + Add Experience
                        </button>
                    )}
                </div>
                
                {isEditing ? (
                    <div className="space-y-4">
                        {profileSections.experience.map((exp, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                    <h4 className="font-medium">Experience {index + 1}</h4>
                                    <button
                                        onClick={() => removeExperience(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Position"
                                        value={exp.position}
                                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Start Date"
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="End Date"
                                        value={exp.endDate}
                                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                        disabled={exp.current}
                                    />
                                </div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                    />
                                    <span className="text-sm">Currently working here</span>
                                </label>
                                <textarea
                                    placeholder="Description"
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    rows="3"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {employeeData?.profile?.experience?.length > 0 ? (
                            employeeData.profile.experience.map((exp, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-semibold">{exp.position}</h4>
                                    <p className="text-blue-600">{exp.company}</p>
                                    <p className="text-sm text-gray-500">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </p>
                                    {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No experience added yet</p>
                        )}
                    </div>
                )}
            </section>

            {/* Education Section */}
            <section className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                    {isEditing && (
                        <button
                            onClick={addEducation}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                            + Add Education
                        </button>
                    )}
                </div>
                
                {isEditing ? (
                    <div className="space-y-4">
                        {profileSections.education.map((edu, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                    <h4 className="font-medium">Education {index + 1}</h4>
                                    <button
                                        onClick={() => removeEducation(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Institution"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Field of Study"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="GPA (optional)"
                                        value={edu.gpa}
                                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Start Date"
                                        value={edu.startDate}
                                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="End Date"
                                        value={edu.endDate}
                                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {employeeData?.profile?.education?.length > 0 ? (
                            employeeData.profile.education.map((edu, index) => (
                                <div key={index} className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                                    <p className="text-green-600">{edu.institution}</p>
                                    <p className="text-sm text-gray-500">
                                        {edu.startDate} - {edu.endDate}
                                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No education added yet</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

export default ProfileSections;