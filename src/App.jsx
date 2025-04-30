// import { useState } from 'react'
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
import SignUp from './pages/SignUp/SignUp'
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
import LandingPage from './pages/LandingPage/LangingPage'
import AboutUs from './pages/AboutUs/AboutUs'
import OurCourses from './pages/OurCourses/OurCourses'
import FAQ from './module/admin/pages/WebManagement/FAQ/FAQ';
import Questionpaper from './module/admin/pages/WebManagement/QuestionPaper/QuestionPaper'
import AddQuestionpaper from './module/admin/component/WebManagement/Questionpaper/AddQuestionpaper'
import LiveClass from './module/admin/pages/WebManagement/LiveClass/LiveClass'
import AddLiveClass from './module/admin/component/WebManagement/LiveClass/AddLiveClass'
import RecordedClass from './module/admin/pages/WebManagement/RecordedClass/RecordedClass'
import AddRecordedClass from './module/admin/component/WebManagement/RecordedClass/AddRecordedClass'
import AddFaq from './module/admin/component/WebManagement/Faq/AddFaq/AddFaq'
// import StaticPage from './module/admin/pages/WebManagement/StaticPage/StaticPage'
import Aboutus from './module/admin/pages/WebManagement/AboutUs/AboutUs'
import WhyMankavit from './module/admin/pages/WebManagement/WhyMankavit/WhyMankavit'
import Testimonial from './module/admin/pages/WebManagement/Testinomial/Testinomial'
import Achievements from './module/admin/pages/WebManagement/Achievements/Achievements'
import AddAchievements from './module/admin/component/WebManagement/AddAchievement/AddAchievement'
import Notification from './module/admin/pages/WebManagement/Notification/Notification'
import UserBaseLayout from './module/user/component/UserBaseLayout/UserBaseLayout'
import UserDashboard from './module/user/pages/UserDashboard/UserDashboard';
import SocialMedia from './module/admin/pages/WebManagement/SocialMedia/SocialMedia'; 
import AddStudent from './module/admin/component/AddStudent/AddStudent'
import Mocktest from './module/admin/pages/Mocktest/Mocktest'
import Staticpage from './module/admin/pages/Staticpage/Staticpage'
import EditFaq from './module/admin/component/WebManagement/Faq/EditFaq/EditFaq'
import Profile from './module/user/pages/Profile/Profile'
import Mycourses from './module/user/pages/MyCourses/MyCourses'
import ContactSupport from './module/user/pages/ContactSupport/ContactSupport'

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
          <Route path="/contactsupport" element={<ContactSupport />} />
          <Route path="/userdash" element={<UserDashboard />} />
          

          {/* <Route path="/user" element={<Test />} > */}


          <Route path="/user" element={<UserBaseLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path='my-courses' element={<Mycourses/>} />
            <Route path="contactsupport" element={<ContactSupport />} />

          {/* </Route> */}

          </Route>




          <Route path="/admin" element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="course-management" element={<Course />} />
            <Route path="course-management/create" element={<AddCourse />} />
            <Route path="student-management" element={<StudentManagement />} />
            <Route path="student-management/create" element={<AddStudent />} />
            <Route path="mock-test"element={<Mocktest/>} />
            <Route path="payment-management" element={<Payment />} />
            <Route path="subject-management" element={<Subjects />} />
            <Route path="subject-management/create" element={<AddSubject />} />
            <Route path="notes-management" element={<NotesManagement />} />
            <Route path="notes-management/create" element={<AddNote />} />
            <Route path="static-page" element={<Staticpage />} />

            
            {/* <Route path="static-pages" element={<StaticPage />} /> */}
            
            <Route path="web-management/home" element={<Homepage />} />

            <Route path="web-management/faq" element={<FAQ />} />
            <Route path="web-management/faq/create" element={<AddFaq />} />
            <Route path="web-management/faq/edit/:id" element={<EditFaq />} />

            <Route path="web-management/question-paper" element={< Questionpaper/>} />
            <Route path="web-management/question-paper/create" element={<AddQuestionpaper />} />

            <Route path="web-management/live-classes" element={<LiveClass />} />
            <Route path="web-management/live-classes/create" element={<AddLiveClass/>} />

            <Route path="web-management/recorded-class" element={<RecordedClass />} />
            <Route path="web-management/recorded-classes/create" element={<AddRecordedClass/>} />

            <Route path="web-management/aboutus" element={<Aboutus />} />
            <Route path="web-management/why-mankavit" element={<WhyMankavit />} />
            <Route path="web-management/testinomial" element={<Testimonial />} />
            <Route path="web-management/achievement" element={<Achievements />} />
            <Route path="web-management/achievement/create" element={<AddAchievements />} />
            <Route path="web-management/social-media" element={<SocialMedia />} />

            <Route path="web-management/notification" element={<Notification />} />
          </Route>

          
                  </Routes>
      </Router>
    </ThemeProvider>
  )
}


export default App
