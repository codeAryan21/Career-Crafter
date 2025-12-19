import { useContext } from 'react'
import './App.css'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJobs from './pages/ApplyJobs'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './components/UserLogin'
import UserProfile from './components/UserProfile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import CareerTools from './pages/CareerTools'
import CompanyProfile from './components/CompanyProfile'
import PublicCompanyProfile from './components/PublicCompanyProfile'
import PublicUserProfile from './components/PublicUserProfile'
import RecruiterAnalytics from './components/RecruiterAnalytics'
import FAQPage from './pages/FAQPage'

function App() {

  const { showRecruiterLogin, companyToken, showUserLogin, employeeToken } = useContext(AppContext);
  return (
    <>
      {/* we check if the state is true then only we render this component */}
      {showRecruiterLogin && <RecruiterLogin />}
      {showUserLogin && <UserLogin />}
      <ToastContainer />
  <Routes>
  <Route path='/forgot-password' element={<ForgotPassword />} />
  <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/' element={<Home />} />
        {employeeToken ? <>
          <Route path="/profile" element={<UserProfile />} />
          <Route path='/applications' element={<Applications />} />
          <Route path='/apply-job/:id' element={<ApplyJobs />} />
          <Route path='/career-tools' element={<CareerTools />} />
        </>
          : null
        }

        <Route path='/company/:companyId' element={<PublicCompanyProfile />} />
        <Route path='/user/:userId' element={<PublicUserProfile />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {/* If user have company token then only we show these pages to user */}
          {companyToken ? <>
            <Route path='analytics' element={<RecruiterAnalytics />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='manage-jobs' element={<ManageJobs />} />
            <Route path='view-applications' element={<ViewApplications />} />
            <Route path='company-profile' element={<CompanyProfile />} />
          </> : <>
            <Route path='*' element={<div className="flex items-center justify-center h-screen"><p className="text-xl text-gray-600">Please log in as a recruiter to access this page.</p></div>} />
          </>
          }
        </Route>
      </Routes>
    </>
  )
}

export default App
