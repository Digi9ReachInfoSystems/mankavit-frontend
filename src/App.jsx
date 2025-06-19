// import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
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
import AddSubject from './module/admin/component/Subject/AddSubject/AddSubject'
import NotesManagement from './module/admin/pages/Notes/Notes'
import CoursesTable from './module/admin/pages/Course/Course'
import AddCourse from './module/admin/component/Course/AddCourse/AddCourse'
import AddNote from './module/admin/component/Notes/AddNotes/AddNotes'
import LandingPage from './pages/LandingPage/LangingPage'
import AboutUs from './pages/AboutUs/AboutUs'
import OurCourses from './pages/OurCourses/OurCourses'
import FAQ from './module/admin/pages/WebManagement/FAQ/FAQ';
import Questionpaper from './module/admin/pages/WebManagement/QuestionPaper/QuestionPaper'
import AddQuestionpaper from './module/admin/component/WebManagement/Questionpaper/AddQuestionPaper/AddQuestionpaper'
import LiveClass from './module/admin/pages/WebManagement/LiveClass/LiveClass'
import AddLiveClass from './module/admin/component/WebManagement/LiveClass/AddLiveClass'
import RecordedClass from './module/admin/pages/WebManagement/RecordedClass/RecordedClass'
import AddRecordedClass from './module/admin/component/WebManagement/RecordedClass/AddRecordedClass/AddRecordedClass'
import AddFaq from './module/admin/component/WebManagement/Faq/AddFaq/AddFaq'
// import StaticPage from './module/admin/pages/WebManagement/StaticPage/StaticPage'
import Aboutus from './module/admin/pages/WebManagement/AboutUs/AboutUs'
import WhyMankavit from './module/admin/pages/WebManagement/WhyMankavit/WhyMankavit'
import Testimonial from './module/admin/pages/WebManagement/Testinomial/Testinomial'
import Achievements from './module/admin/pages/WebManagement/Achievements/Achievements'
import AddAchievements from './module/admin/component/WebManagement/Achievement/AddAchievement/AddAchievement'
import Notification from './module/admin/pages/WebManagement/Notification/Notification'
import UserBaseLayout from './module/user/component/UserBaseLayout/UserBaseLayout'
import UserDashboard from './module/user/pages/UserDashboard/UserDashboard';
import SocialMedia from './module/admin/pages/WebManagement/SocialMedia/SocialMedia';
import AddStudent from './module/admin/component/Student/AddStudent/AddStudent'
import Mocktest from './module/admin/pages/Mocktest/Mocktest'
import Staticpage from './module/admin/pages/Staticpage/Staticpage'
import EditFaq from './module/admin/component/WebManagement/Faq/EditFaq/EditFaq'
import Profile from './module/user/pages/Profile/Profile'
import Mycourses from './module/user/pages/MyCourses/MyCourses'
import ContactSupport from './module/user/pages/ContactSupport/ContactSupport'
import TandC from './module/user/pages/TandC/TandC'
import UserNotifications from './module/user/pages/UserNotifications/UserNotifications'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import WhyEntranceCourses from './pages/WhyEntranceCourses/WhyEntranceCourses'
import Category from './module/admin/pages/Category/Category'
import Addcategory from './module/admin/component/Category/AddCategory/AddCategory'
import EditAchievement from './module/admin/component/WebManagement/Achievement/EditAchievement/EditAchievement'
import EditQuestionPaper from './module/admin/component/WebManagement/Questionpaper/EditQuestionPaper/EditQuestionPaper'
import AddTestimonial from './module/admin/component/WebManagement/Testimonial/AddTestimonial/AddTestimonial'
import EditTestimonial from './module/admin/component/WebManagement/Testimonial/EditTestimonial/EditTestimonial'
import AdminMission from './module/admin/pages/WebManagement/AdminMission/AdminMission'
// import AddMission from './module/admin/component/WebManagement/AddMission/AddMission'
import EditStudent from './module/admin/component/Student/EditStudent/EditStudent'
import ViewStudent from './module/admin/component/Student/ViewStudent/ViewStudent'
import EditCourse from './module/admin/component/Course/EditCourse/EditCourse'
import ViewCourse from './module/admin/component/Course/ViewCourse/ViewCourse'
import EditSubject from './module/admin/component/Subject/EditSubject/EditSubject'
import ViewSubject from './module/admin/component/Subject/ViewSubject/ViewSubject'
import EditNotes from './module/admin/component/Notes/EditNotes/EditNotes'
import ViewNotes from './module/admin/component/Notes/ViewNotes/ViewNotes'
import EditCategory from './module/admin/component/Category/EditCategory/EditCategory'
import Lecturer from './module/admin/pages/Lecturer/Lecturer'
import AddLecturer from './module/admin/component/Lecturer/AddLecturer/AddLecturer'
import EditLecturer from './module/admin/component/Lecturer/EditLecturer/EditLecturer'
import ViewLecturer from './module/admin/component/Lecturer/ViewLecturer/ViewLecturer'
import EditLiveclass from './module/admin/component/WebManagement/LiveClass/EditLiveclass/EditLiveclass'
import EditRecordedClass from './module/admin/component/WebManagement/RecordedClass/EditRecordedClass/EditRecordedClass'
import EditMission from './module/admin/component/WebManagement/Mission/EditMission/EditMission'
import AddMission from './module/admin/component/WebManagement/Mission/AddMission/AddMission'
import Results from './pages/Results/Results'
import PrevYearsQuestion from './pages/PrevYearsQuestion/PrevYearsQuestion'
import ViewAchievement from './module/admin/component/WebManagement/Achievement/ViewAchievement/ViewAchievement'
import ViewTestimonial from './module/admin/component/WebManagement/Testimonial/ViewTestimonial/ViewTestimonial'
import ViewQuestionPaper from './module/admin/component/WebManagement/Questionpaper/ViewQuestionPaper/ViewQuestionPaper'
import ViewMission from './module/admin/component/WebManagement/Mission/ViewMission/ViewMission'
import OurCoursesDetails from './pages/OurCoursesDetails/OurCoursesDetails'
import WhyStudyWithUs from './module/admin/pages/WebManagement/WhyStudyWithUs/WhyStudyWithUs'
import AddWhyStudyWithUs from './module/admin/component/WebManagement/WhystudyWithUs/AddWhyStudyWithUs/AddWhyStudyWithUs'
import EditWhyStudyWithUs from './module/admin/component/WebManagement/WhystudyWithUs/EditWhyStudyWithUs/EditWhyStudyWithUs'
import ViewWhyStudyWithUs from './module/admin/component/WebManagement/WhystudyWithUs/ViewWhyStudyWithUs/ViewWhyStudyWithUs'
import CompletedCoursesPage from './pages/CompletedCoursesPage/CompletedCoursesPage'
import Blog from './module/admin/pages/WebManagement/Blog/Blog'
import AddBlog from './module/admin/component/WebManagement/blog/AddBlog/AddBlog'
import EditBlog from './module/admin/component/WebManagement/blog/EditBlog/EditBlog'
import ViewBlog from './module/admin/component/WebManagement/blog/ViewBlog/ViewBlog'
import ContinueCoursePage from './pages/ContinueCoursePage/ContinueCoursePage'
import ContactSupportView from './module/admin/pages/WebManagement/ContactSupportView/ContactSupportView'
import UserFeedback from './module/admin/pages/WebManagement/UserFeedback/UserFeedback'
import CoursesLiveclassPage from './pages/CoursesLiveclassPage/CoursesLiveclassPage'
import ViewRecordedClass from './module/admin/component/WebManagement/RecordedClass/ViewRecordedClass/ViewRecordedClass'
import KYCpage from './pages/KYCpage/KYCpage'
import UserBlog from './pages/UserBlog/UserBlog'
import ReadPost from './component/UserBlogComponents/ReadPost/ReadPost'
import StarttestPage from './module/user/pages/StarttestPage/StarttestPage'
import TestInstructionsPage from './module/user/pages/TestInstructionsPage/TestInstructionsPage'
import TestsubmittedPage from './module/user/pages/TestsubmittedPage/TestsubmittedPage'
import ExamSummary from './module/user/pages/ExamSummary/ExamSummary'
import TestResults from './module/user/pages/TestResults/TestResults'
import TextQuestionPage from './module/user/pages/TextQuestionPage/TextQuestionPage'
import AddMockTest from './module/admin/component/MockTestComponents/AddMockTests/AddMockTest'
import ViewMockTest from './module/admin/component/MockTestComponents/ViewMockTest/ViewMockTest'
import EditMockTest from './module/admin/component/MockTestComponents/EditMocktest/EditMocktest'
// import ContactSupport from './module/user/pages/ContactSupport/ContactSupport'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewUser from './module/admin/component/MockTestComponents/ViewUser/ViewUser'
import ViewUserResults from './module/admin/component/MockTestComponents/ViewUserResults/ViewUserResults'
import CourseCompletionPage from './component/CourseCompletionPage/CourseCompletionPage'
import CreateKYC from './module/user/component/CreateKYC/CreateKYC'
import ViewStudentFeedback from './module/admin/component/WebManagement/ViewStudentFeedback/ViewStudentFeedback'
import UpdateKYC from './module/admin/component/Student/updateKYC/updateKYC'
import ViewUserAttempts from './module/admin/component/MockTestComponents/ViewUserAttempts/ViewUserAttempts'
import ViewUserRanking from './module/admin/component/MockTestComponents/ViewUserRanking/ViewUserRanking'
import CreateMockTest from './module/admin/component/MockTestComponents/CreateMockTest/CreateMockTest'
import YouTube from './module/admin/pages/WebManagement/YouTube/YouTube'
import AddYoutube from './module/admin/component/WebManagement/YoutubeComponents/AddYoutube/AddYoutube'
import EditYoutube from './module/admin/component/WebManagement/YoutubeComponents/EditYoutube/EditYoutube.'
import ViewYoutube from './module/admin/component/WebManagement/YoutubeComponents/ViewYoutube/ViewYoutube'
import MockTestQuestionsList from './module/admin/component/MockTestComponents/MockTestQuestionsLists/MockTestQuestionsList'
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/loginOtp" element={<OtpLogin />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/signupOtp" element={<OtpSignup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/ourcourses" element={<OurCourses />} />
          <Route path="/coursedetails/:id" element={<CourseDetails />} />
          <Route path="/why-entrance-courses" element={<WhyEntranceCourses />} />
          <Route path='/results' element={<Results />} />
          <Route path="/prev-years-question" element={<PrevYearsQuestion />} />
          <Route path="/ourcoursedetails" element={<OurCoursesDetails />} />
          <Route path="/course/liveclass/:courseId/:subjectid/:lectureId" element={<CoursesLiveclassPage />} />

          <Route path="/coursedetails/completed-courses" element={<CompletedCoursesPage />} />
          <Route path='/continueCourse/:id' element={<ContinueCoursePage />} />
          <Route path='/kyc' element={<KYCpage />} />
          <Route path="/userblog" element={<UserBlog />} />
          <Route path='/userblog/post/:id' element={<ReadPost />} />
          <Route path="/test" element={<Test />} />

          <Route path='/start-test/:testId/:subjectId' element={<StarttestPage />} />
          <Route path='/test-instructions/:testId/:subjectId' element={<TestInstructionsPage />} />
          <Route path='/test-submitted' element={<TestsubmittedPage />} />
          <Route path='/exam-summary' element={<ExamSummary />} />
          <Route path='/test-results/:testId/:subjectId/:attemptId' element={<TestResults />} />


          <Route path='/createkyc' element={<CreateKYC />} />


          <Route path='/test-question/:testId/:subjectId/:attemptId' element={<TextQuestionPage />} />
          <Route path='/courseComplte/:courseId' element={<CourseCompletionPage />} />

          <Route path="/user" element={<UserBaseLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="tandc" element={<TandC />} />
            <Route path='my-courses' element={<Mycourses />} />
            <Route path="contactsupport" element={<ContactSupport />} />
            <Route path="notification" element={<UserNotifications />} />

            <Route path="completed-courses" element={<CompletedCoursesPage />} />
            {/* </Route> */}

          </Route>




          <Route path="/admin" element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="course-management" element={<Course />} />
            <Route path="course-management/create" element={<AddCourse />} />
            <Route path="course-management/edit/:id" element={<EditCourse />} />
            <Route path="course-management/view/:id" element={<ViewCourse />} />

            <Route path="student-management" element={<StudentManagement />} />
            <Route path="student-management/create" element={<AddStudent />} />
            <Route path="student-management/edit/:id" element={<EditStudent />} />
            <Route path="student-management/view/:id" element={<ViewStudent />} />
            <Route path='student-management/update-kyc/:userId' element={<UpdateKYC />} />
            <Route path="mock-test" element={<Mocktest />} />
            <Route path="mock-test/create-mock-test" element={<CreateMockTest />} />
            <Route path="mock-test/questions-list/:mockTestId" element={<MockTestQuestionsList />} />
            <Route path="mock-test/create" element={<AddMockTest />} />
            <Route path="mock-test/view/:id" element={<ViewMockTest />} />
            <Route path='mock-test/edit/:mockTestId' element={<EditMockTest />} />
            <Route path='mock-test/user-result/:mockTestId/:subjectId' element={<ViewUser />} />
            <Route path='mock-test/user-ranking/:mockTestId/:subjectId' element={<ViewUserRanking />} />
            <Route path='mock-test/user-attempts/:mockTestId/:userId' element={<ViewUserAttempts />} />
            <Route path='mock-test/user-result/view-result/:attemptId' element={<ViewUserResults />} />

            <Route path="payment-management" element={<Payment />} />

            <Route path="subject-management" element={<Subjects />} />
            <Route path="subject-management/create" element={<AddSubject />} />
            <Route path="subject-management/edit/:id" element={<EditSubject />} />
            <Route path="subject-management/view/:id" element={<ViewSubject />} />

            <Route path="notes-management" element={<NotesManagement />} />
            <Route path="notes-management/create" element={<AddNote />} />
            <Route path="notes-management/edit/:id" element={<EditNotes />} />
            <Route path="notes-management/view/:id" element={<ViewNotes />} />

            <Route path="category-management" element={<Category />} />
            <Route path="category-management/create" element={<Addcategory />} />
            <Route path="category-management/edit/:id" element={<EditCategory />} />

            <Route path="lecturer-management" element={<Lecturer />} />
            <Route path="lecturer-management/create" element={<AddLecturer />} />
            <Route path="lecturer-management/edit/:id" element={<EditLecturer />} />
            <Route path="lecturer-management/view/:id" element={<ViewLecturer />} />

            <Route path="static-page" element={<Staticpage />} />


            {/* <Route path="static-pages" element={<StaticPage />} /> */}

            <Route path="web-management/home" element={<Homepage />} />

            <Route path="web-management/faq" element={<FAQ />} />
            <Route path="web-management/faq/create" element={<AddFaq />} />
            <Route path="web-management/faq/edit/:id" element={<EditFaq />} />

            <Route path="web-management/question-paper" element={< Questionpaper />} />
            <Route path="web-management/question-paper/create" element={<AddQuestionpaper />} />
            <Route path="web-management/question-paper/edit/:id" element={<EditQuestionPaper />} />
            <Route path="web-management/question-paper/view/:id" element={<ViewQuestionPaper />} />

            <Route path="web-management/live-classes" element={<LiveClass />} />
            <Route path="web-management/live-classes/create" element={<AddLiveClass />} />
            <Route path="web-management/live-classes/edit/:id" element={<EditLiveclass />} />

            <Route path="web-management/recorded-class" element={<RecordedClass />} />
            <Route path="web-management/recorded-classes/create" element={<AddRecordedClass />} />
            <Route path="web-management/recorded-classes/edit/:id" element={<EditRecordedClass />} />
            <Route path="web-management/recorded-classes/view/:id" element={<ViewRecordedClass />} />

            <Route path="web-management/aboutus" element={<Aboutus />} />
            <Route path="web-management/why-mankavit" element={<WhyMankavit />} />

            <Route path="web-management/testinomial" element={<Testimonial />} />
            <Route path="web-management/testinomial/create" element={<AddTestimonial />} />
            <Route path="web-management/testinomial/edit/:id" element={<EditTestimonial />} />
            <Route path="web-management/testinomial/view/:id" element={<ViewTestimonial />} />

            <Route path="web-management/achievement" element={<Achievements />} />
            <Route path="web-management/achievement/create" element={<AddAchievements />} />
            <Route path='web-management/achievement/edit/:id' element={<EditAchievement />} />
            <Route path="web-management/achievement/view/:id" element={<ViewAchievement />} />

            <Route path="web-management/social-media" element={<SocialMedia />} />

            <Route path="web-management/notification" element={<Notification />} />
            <Route path="web-management/mission" element={<AdminMission />} />
            <Route path="web-management/mission/create" element={<AddMission />} />
            <Route path="web-management/mission/edit/:id" element={<EditMission />} />
            <Route path="web-management/mission/view/:id" element={<ViewMission />} />

            <Route path="web-management/why-study-with-us" element={<WhyStudyWithUs />} />
            <Route path="web-management/why-study-with-us/create" element={<AddWhyStudyWithUs />} />
            <Route path="web-management/why-study-with-us/edit/:id" element={<EditWhyStudyWithUs />} />
            <Route path="web-management/why-study-with-us/view/:id" element={<ViewWhyStudyWithUs />} />

            <Route path="web-management/blog" element={<Blog />} />
            <Route path="web-management/blog/create" element={<AddBlog />} />
            <Route path="web-management/blog/edit/:id" element={<EditBlog />} />
            <Route path="web-management/blog/view/:id" element={<ViewBlog />} />

            <Route path="web-management/contact-support" element={<ContactSupportView />} />

            <Route path="web-management/user-feedback" element={<UserFeedback />} />
            <Route path="web-management/user-feedback/view/:id" element={<ViewStudentFeedback />} />
            
            <Route path='web-management/youtubelinks' element={<YouTube />} />
            <Route path='web-management/youtubelinks/create' element={<AddYoutube />} />
            <Route path='web-management/youtubelinks/edit/:id' element={<EditYoutube />} />
            <Route path="web-management/youtubelinks/view/:id" element={<ViewYoutube />} />
          </Route>


        </Routes>
      </Router>
    </ThemeProvider>
  )
}


export default App
