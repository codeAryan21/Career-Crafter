import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function CompanyProfile() {
    const { companyData, companyToken, backendUrl, fetchCompanyData } = useContext(AppContext);
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        website: '',
        industry: '',
        companySize: '1-10',
        location: '',
        founded: ''
    });

    useEffect(() => {
        if (companyData) {
            setFormData({
                description: companyData.description || '',
                website: companyData.website || '',
                industry: companyData.industry || '',
                companySize: companyData.companySize || '1-10',
                location: companyData.location || '',
                founded: companyData.founded || ''
            });
        }
    }, [companyData]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const updateProfile = async () => {
        try {
            const { data } = await axios.patch(
                `${backendUrl}/api/company/update-profile`,
                formData,
                { headers: { token: companyToken } }
            );

            toast.success("Company profile updated successfully");
            fetchCompanyData();
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    if (!companyData) {
        return <p className="text-center mt-10 text-gray-600">Please log in</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-2xl p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Company Profile</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="space-x-2">
                        <button
                            onClick={updateProfile}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Company Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                            placeholder="Tell users about your company..."
                        />
                    ) : (
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg min-h-[100px]">
                            {companyData.description || "No description provided"}
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        {isEditing ? (
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                placeholder="https://company.com"
                            />
                        ) : (
                            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {companyData.website ? (
                                    <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {companyData.website}
                                    </a>
                                ) : "No website provided"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                placeholder="e.g., Technology, Healthcare"
                            />
                        ) : (
                            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {companyData.industry || "No industry specified"}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    {isEditing ? (
                        <select
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                        >
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="501-1000">501-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                        </select>
                    ) : (
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {companyData.companySize} employees
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                            placeholder="City, Country"
                        />
                    ) : (
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {companyData.location || "No location specified"}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Founded</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="founded"
                            value={formData.founded}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                            placeholder="e.g., 2025"
                        />
                    ) : (
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {companyData.founded || "Not specified"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CompanyProfile;