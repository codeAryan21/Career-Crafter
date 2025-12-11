import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';


function Profile() {
    const { employeeData, employeeToken, fetchUserData, backendUrl, logoutEmployee } = useContext(AppContext);

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(employeeData?.fullName || "");
    const [username, setUsername] = useState(employeeData?.username || "");
    const [image, setImage] = useState(null);

    const [resume, setResume] = useState(null);
    const [isResumeEdit, setIsResumeEdit] = useState(false);

    const [password, setPassword] = useState({ oldPassword: "", newPassword: "" });

    if (!employeeData) {
        return <p className="text-center mt-10 text-gray-600">Please log in</p>;
    }

    // Function to update user profile
    const updateProfile = async () => {
        try {
            const { data } = await axios.patch(`${backendUrl}/api/users/update-profile`,
                { fullName, username },
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                toast.success(data.message)
                await fetchUserData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
        }
        setIsEditing(false);
    }

    // Function to update user cover Image
    const updateImage = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);

            const { data } = await axios.patch(`${backendUrl}/api/users/update-image`, formData,
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                await fetchUserData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
        }
        setIsEditing(false);
    }

    // Function to update password
    const updateUserPassword = async () => {
        if (!password.oldPassword || !password.newPassword) return;

        try {
            const { data } = await axios.post(`${backendUrl}/api/users/change-password`,
                { oldPassword: password.oldPassword, newPassword: password.newPassword },
                { headers: { token: employeeToken } }
            )

            if (data.data?.logout) {
                toast.success(data.message);
                logoutEmployee();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
        }
        setPassword({ oldPassword: "", newPassword: "" });
    }

    // Function to update resume
    const updateResume = async () => {
        if (!resume) return;
        try {
            const formData = new FormData();
            formData.append("resume", resume)

            const { data } = await axios.post(`${backendUrl}/api/users/update-resume`, formData,
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                toast.success(data.message)
                await fetchUserData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                (error.response && JSON.stringify(error.response.data)) ||
                error.message ||
                "An error occurred. Please try again."
            );
        }
        setIsResumeEdit(false);
        setResume(null);
    }

    const handleSave = () => {
        if (image) {
            updateImage();
        }
        if (fullName || username) {
            updateProfile();
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Profile Header */}
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <img
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                src={image ? URL.createObjectURL(image) : employeeData.image}
                                alt="profile"
                            />
                            {isEditing && (
                                <>
                                    <label
                                        htmlFor="image"
                                        className="absolute bottom-2 right-2 bg-white text-blue-600 hover:bg-blue-50 p-2 rounded-full shadow-md cursor-pointer transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="hidden"
                                    />
                                </>
                            )}
                        </div>

                        {/* Name & Email */}
                        <div className="text-center sm:text-left flex-1">
                            <p className="text-sm opacity-80">{employeeData.email}</p>
                            {isEditing ? (
                                <div className="space-y-3 mt-3">
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                                        placeholder="Username"
                                    />
                                </div>
                            ) : (
                                <div className="mt-3">
                                    <h2 className="text-2xl font-bold">{employeeData.fullName}</h2>
                                    <p className="opacity-90">@{employeeData.username}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="bg-white shadow-md rounded-2xl p-8 mt-8 space-y-10">
                    {/* Buttons */}
                    <div className="flex gap-4 justify-center sm:justify-start">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    // onClick={() => { updateProfile(); updateImage(); }}

                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg shadow-md transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Change Password */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Change Password</h2>
                        <div className="flex flex-col gap-3">
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={password.oldPassword}
                                onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                                className="border px-3 py-2 rounded-lg outline-none"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={password.newPassword}
                                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                className="border px-3 py-2 rounded-lg outline-none"
                            />
                            <button
                                onClick={updateUserPassword}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md transition"
                            >
                                Update Password
                            </button>
                        </div>
                    </section>

                    {/* Resume Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Resume</h2>
                        <div className="flex flex-wrap gap-4">
                            {isResumeEdit || !employeeData?.resume ? (
                                <>
                                    <label
                                        htmlFor="resumeUpload"
                                        className="flex items-center gap-3 cursor-pointer bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-300 transition"
                                    >
                                        <span className="text-blue-600 text-sm">{resume ? resume.name : "Select resume (PDF)"}</span>
                                        <input
                                            onChange={e => setResume(e.target.files[0])}
                                            accept="application/pdf"
                                            type="file"
                                            id="resumeUpload"
                                            hidden
                                        />
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                            strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M4 4v16h16V4H4zm4 4h8v2H8V8zm0 4h8v2H8v-2z" />
                                        </svg>
                                    </label>
                                    <button
                                        onClick={updateResume}
                                        className="bg-green-100 hover:bg-green-200 text-slate-700 px-5 py-2.5 rounded-lg shadow-md transition border border-green-500"
                                    >
                                        Save Resume
                                    </button>
                                </>
                            ) : (
                                <div className="flex gap-3">
                                    <a target="_blank" href={employeeData?.resume}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md transition">
                                        View Resume
                                    </a>
                                    <button
                                        onClick={() => setIsResumeEdit(true)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg shadow-md transition border border-gray-300"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Profile;