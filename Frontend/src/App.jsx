import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import StudentHome from './StudentPage/StudentHome'
import TakeStudentAttendence from './Pages/TakeStudentAttendence'
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
import TeacherPayment from './TeacherPages/TeacherPayment'
import { StudentData } from './context/Student'
import StudentRegister from './TeacherPages/StudentRegister'
import StudentProfile from './StudentPage/StudentProfile'
import { BookSaleSubmit } from './TeacherPages/BookSaleSubmit'
import BookSaleHistory from './TeacherPages/BookSaleHistory'
import StudentAttendence from './StudentPage/StudentAttendence'
import StudentResult from './StudentPage/StudentResult'
import StudentFees from './StudentPage/StudentFees'
import StudentTimetable from './StudentPage/StudentTimetable'
import BookForm from './TeacherPages/BookForm'
import BookPriceHistory from './TeacherPages/BookPriceHistory'

const App = () => {
  const { isAuth, loading } = UserData();
  const { StudentAuth, studentLoading } = StudentData();
  return (
    <>
      <ToastContainer />
      {loading || studentLoading ? (
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
            <Route path='/student-attendence' element={isAuth ? <TakeStudentAttendence/> : <TeacherLoginPage/>}/>
            <Route path='/teacher-payment' element={isAuth ? <TeacherPayment/> : <TeacherLoginPage/>}/>
            <Route path='/student-register' element={ isAuth ? <StudentRegister/> : <TeacherLoginPage/> }/>
            <Route path='/book-sale-data' element={ isAuth ? <BookSaleSubmit/> : <TeacherLoginPage/> }/>
            <Route path='/book-sale-history' element= {isAuth ? <BookSaleHistory/> : <TeacherLoginPage/> } />
            <Route path='/book-form' element={isAuth ? <BookForm/> : <TeacherLoginPage/>}/>
            <Route path='/book-price' element={isAuth ? <BookPriceHistory/> : <TeacherLoginPage/>}/>
            {/* student routes */}
            <Route path='/student-home' element={StudentAuth ? <StudentHome/> : <LoginPage/>}/>
            <Route path='/student-profile' element={StudentAuth ? <StudentProfile/> : <LoginPage/>}/>
            <Route path='/student-attendance' element={StudentAuth ? <StudentAttendence/> : <LoginPage/>}/>
            <Route path='/student-result' element={StudentAuth ? <StudentResult/> : <LoginPage/>}/>
            <Route path='/fee-submit' element={StudentAuth ? <StudentFees/> : <LoginPage/>}/>
            <Route path='/student-time-table' element={StudentAuth ? <StudentTimetable/> : <LoginPage/>}/>
          </Routes>
        </BrowserRouter>
      }
    </>
  )
}

export default App
