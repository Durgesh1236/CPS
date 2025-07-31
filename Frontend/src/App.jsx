import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import StudentHome from './Pages/StudentHome'
import StuAttendence from './Pages/StuAttendence'

const App = () => {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/student-home' element={<StudentHome />} /> 
          <Route path='/attendance' element= {<StuAttendence/>} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
