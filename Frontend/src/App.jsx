import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import StudentHome from './Pages/StudentHome'
import StuAttendence from './Pages/StuAttendence'
import { FeeSubmitPage } from './AccountentPages/FeeSubmitPage'
import StudentFeeHistory from './AccountentPages/StudentFeeHistory'
import TeacherHomePage from './TeacherPages/TeacherHomePage'
import TeacherRegistrationPage from './TeacherPages/TeacherRegistrationPage'
import TeacherLoginPage from './Pages/TeacherLoginPage'
import { ToastContainer } from 'react-toastify'
import { UserData } from './context/User'
import { RingLoader } from "react-spinners";
import TeacherProfile from './TeacherPages/TeacherProfile'
import TeacherData from './TeacherPages/TeacherData'
import Spend from './Pages/Spend'
import SpendHistory from './Pages/SpendHistory'
import StudentDataInput from './Pages/StudentDataInput'
import StudentDataSearch from './Pages/StudentDataSearch'

const App = () => {
  const { isAuth, loading } = UserData();

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <RingLoader
            color="#0e12f9"
            size={70}
            speedMultiplier={2}
          />
        </div>
      ) :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/teacher-login' element={<TeacherLoginPage />} />
            <Route path='/student-home' element={<StudentHome />} />
            <Route path='/attendance' element={<StuAttendence />} />
            <Route path='/student-fee-submit' element={isAuth ? <FeeSubmitPage /> : <TeacherLoginPage />} />
            <Route path='/student-fee-history' element={isAuth ? <StudentFeeHistory /> : <TeacherLoginPage />} />
            <Route path='/teacher-home' element={isAuth ? <TeacherHomePage /> : <TeacherLoginPage />} />
            <Route path='/teacher-registration' element={isAuth ? <TeacherRegistrationPage /> : <TeacherLoginPage />} />
            <Route path='/teacher-profile' element={isAuth ? <TeacherProfile /> : <TeacherLoginPage />}/>
            <Route path='/teacher-data' element = {isAuth ? <TeacherData /> : <TeacherLoginPage/>}/>
            <Route path='/total-spend' element={isAuth ? <Spend/> : <TeacherLoginPage/>}/>
            <Route path='/spend-history' element={isAuth ? <SpendHistory/> : <TeacherLoginPage/>}/>
            <Route path='/student-data-input' element={isAuth ? <StudentDataInput/> : <TeacherLoginPage/>}/>
            <Route path='/student-data' element={isAuth ? <StudentDataSearch/> : <TeacherLoginPage/>}/> 
          </Routes>
        </BrowserRouter>
      }
    </>
  )
}

export default App
