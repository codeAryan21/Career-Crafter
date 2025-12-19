import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { JobCategories, JobLocations } from '../assets/assets';

const Preferences = () => {
    const { backendUrl, employeeToken } = useContext(AppContext);
    const [preferences, setPreferences] = useState({
        jobCategories: [],
        locations: [],
        salaryRange: { min: 0, max: 200000 }
    });
    const [loading, setLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const categories = JobCategories;
    const locations = JobLocations;

    useEffect(() => {
        if (employeeToken) {
            fetchUserData();
        } else {
            setIsLoaded(true);
        }
    }, [employeeToken]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/users/user`, {
                headers: { 'token': employeeToken }
            });
            if (response.data.success && response.data.data?.preferences) {
                setPreferences({
                    jobCategories: response.data.data.preferences.jobCategories || [],
                    locations: response.data.data.preferences.locations || [],
                    salaryRange: response.data.data.preferences.salaryRange || { min: 0, max: 200000 }
                });
            }
        } catch (error) {
            console.log('Failed to fetch user preferences:', error);
        } finally {
            setIsLoaded(true);
        }
    };

    const handleCategoryChange = (category) => {
        setPreferences(prev => ({
            ...prev,
            jobCategories: prev.jobCategories.includes(category)
                ? prev.jobCategories.filter(c => c !== category)
                : [...prev.jobCategories, category]
        }));
    };

    const handleLocationChange = (location) => {
        setPreferences(prev => ({
            ...prev,
            locations: prev.locations.includes(location)
                ? prev.locations.filter(l => l !== location)
                : [...prev.locations, location]
        }));
    };

    const handleSalaryChange = (field, value) => {
        setPreferences(prev => ({
            ...prev,
            salaryRange: { ...prev.salaryRange, [field]: parseInt(value) || 0 }
        }));
    };

    const savePreferences = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${backendUrl}/api/resume/preferences`, preferences, {
                headers: { 'token': employeeToken }
            });
            if (response.data.success) {
                toast.success('Preferences saved successfully!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to save preferences');
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading preferences...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Job Preferences</h2>
                <p className="text-sm text-gray-500">Customize your job recommendations</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
            
            {/* Job Categories */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Preferred Job Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map(category => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={preferences.jobCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Locations */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Preferred Locations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {locations.map(location => (
                        <label key={location} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={preferences.locations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">{location}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Salary Range */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Salary Range</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Minimum Salary</label>
                        <input
                            type="number"
                            value={preferences.salaryRange.min}
                            onChange={(e) => handleSalaryChange('min', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Maximum Salary</label>
                        <input
                            type="number"
                            value={preferences.salaryRange.max}
                            onChange={(e) => handleSalaryChange('max', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="200000"
                        />
                    </div>
                </div>
            </div>

                <button
                    onClick={savePreferences}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                    {loading ? 'Saving...' : 'Save Preferences'}
                </button>
            </div>
        </div>
    );
};

export default Preferences;