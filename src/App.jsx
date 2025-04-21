import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import GlobalStyle from './theme/GlobalStyle'
import theme from './theme/Theme'
import './App.css'
import BaseLayout from './component/BaseLayout/BaseLayout'
import Dashboard from './module/admin/pages/Dashboard/Dashboard'
import Homepage from './module/admin/pages/Homepage/Homepage'
import Login from './pages/Login/Login'
import OtpLogin from './pages/OtpLogin/OtpLogin'
import Test from './pages/Test/Test'
import SignUp from './pages/Signup/Signup'
import OtpSignup from './pages/OtpSignup/OtpSignup'
import Course from './module/admin/pages/Course/Course'
import StudentsTable from './module/admin/pages/StudentManagement/StudentManagement'
import StudentManagement from './module/admin/pages/StudentManagement/StudentManagement'
import Payment from './module/admin/pages/Payment/Payment'
import Subjects from './module/admin/pages/Subjects/Subject'
import AddSubject from './module/admin/component/AddSubject/AddSubject'
import NotesManagement from './module/admin/pages/Notes/Notes'
import CoursesTable from './module/admin/pages/Course/Course'
import AddCourse from './module/admin/component/AddCourse/AddCourse'
import AddNote from './module/admin/component/AddNotes/AddNotes'
import LandingPage from './LandingPage/Pages/LandingMainPage/LangingPage'
import AboutUs from './LandingPage/Pages/AboutUs/ABoutUs'
import OurCourses from './LandingPage/Pages/OurCourses/OurCourses'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/loginOtp" element={<OtpLogin />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/signupOtp" element={<OtpSignup/>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/ourcourses" element={<OurCourses />} />

          <Route path="/user" element={<Test />} >

          </Route>




          <Route path="/admin" element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="web-management/home" element={<Homepage />} />
            <Route path="course-management" element={<Course />} />
            <Route path="courses/create" element={<AddCourse />} />
            <Route path="student-management" element={<StudentManagement />} />
            <Route path="payment-management" element={<Payment />} />
            <Route path="subject-management" element={<Subjects />} />
            <Route path="subjects/create" element={<AddSubject />} />
            <Route path="notes-management" element={<NotesManagement />} />
            <Route path="notes/create" element={<AddNote />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}


export default App
