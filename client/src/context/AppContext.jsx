import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { user } = useUser()
    const { getToken } = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])
    

    // we have to create a function to get the jobs data from the api call and store them in the jobs state variable
    // Function to fetch jobs data.
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/jobs`);
            if(data.success){
                // console.log(data.data);
                setJobs(data.data);
            }else{
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
    }

    // Function to fetch company data.
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/company`, { headers: { token: companyToken } })
            if (data.success) {
                console.log(data);
                setCompanyData(data.data);
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
    }

    // Function to fetch user data.
    const fetchUserData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/api/users/user`, 
                { headers: { Authorization: `Bearer ${token}` }}
            )
            
            // TODO:  

            if (data.success) {
                console.log(data);
                setUserData(data.data);
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
    }

    // Function to fetch user's applied applications data
    const fetchUserApplications = async () => {
        try {
            const token = getToken()
            const { data } = await axios.get(`${backendUrl}/api/users/job-applications`,
                { headers: { Authorization: `Bearer ${token}` }}
            )

            if(data.success){
                setUserApplications(data.applications);
            }else{
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
    }
     

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [user])


    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched, 
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}