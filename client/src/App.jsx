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
        </>
          : null
        }

        <Route path='/dashboard' element={<Dashboard />}>
          {/* If user have company token then only we show these pages to user */}
          {companyToken ? <>
            <Route path='add-job' element={<AddJob />} />
            <Route path='manage-jobs' element={<ManageJobs />} />
            <Route path='view-applications' element={<ViewApplications />} />
          </>
            : null
          }
        </Route>
      </Routes>
    </>
  )
}

export default App
