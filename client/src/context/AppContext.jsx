import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Helper function for consistent error handling
export const getErrorMessage = (error) => {
    return error.response?.data?.message || 
           error.message || 
           "An error occurred. Please try again.";
};

export const AppContext = createContext();
export const AppContextProvider = (props) => {

    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [employeeToken, setEmployeeToken] = useState(null)
    const [employeeData, setEmployeeData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])


    // we have to create a function to get the jobs data from the api call and store them in the jobs state variable
    // Function to fetch jobs data.
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/jobs`);
            if (data.success) {
                // console.log(data.data);
                setJobs(data.data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    }

    // Function to fetch company data.
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/company`, { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    }

    // Function to fetch user data.
    const fetchUserData = async () => {
        if (!employeeToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/user`,
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                const user = data.user || data.data?.user || data.data;
                // console.log(user);
                setUserData(user);
                setEmployeeData(user);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    }

    // Function to fetch user's applied applications data
    const fetchUserApplications = async () => {
        if (!employeeToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/job-applications`,
                { headers: { token: employeeToken } }
            )

            if (data.success) {
                setUserApplications(data.applications || data.data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    }

    const logoutEmployee = async () => {
        try {
            await axios.post(`${backendUrl}/api/users/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.log('Logout error:', error);
        } finally {
            setEmployeeToken(null);
            localStorage.removeItem("employeeToken");
            setEmployeeData(null);
            setUserData(null);
            setUserApplications([]);
            navigate('/')
        }
    }

    const logoutCompany = async () => {
        try {
            await axios.post(`${backendUrl}/api/company/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.log('Logout error:', error);
        } finally {
            setCompanyToken(null);
            localStorage.removeItem('companyToken');
            setCompanyData(null);
            navigate('/')
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

        const storedEmployeeToken = localStorage.getItem("employeeToken");
        if (storedEmployeeToken) {
            setEmployeeToken(storedEmployeeToken);
        }

    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken])

    useEffect(() => {
        if (employeeToken) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [employeeToken])


    const value = {
        // search/jobs
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,

        // recruiter/company
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,

        // user/employee
        showUserLogin, setShowUserLogin,
        employeeToken, setEmployeeToken,
        employeeData, setEmployeeData,

        // fetchers
        fetchUserData,
        fetchUserApplications,
        fetchCompanyData,

        // user info / apps
        userData, setUserData,
        userApplications, setUserApplications,

        // misc
        backendUrl,
        logoutEmployee,
        logoutCompany
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}