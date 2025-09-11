import React from 'react'
import Header from '../LandingPage/LandingHeader/LandingHeader'
import AllCourses from '../../component/AllCoursesComponents/AllCourses/AllCourses'
import LawAcademy from '../../component/AllCoursesComponents/LawAcademy/LawAcademy'
import EnrollCourse from '../../component/AllCoursesComponents/EnrollCourse/EnrollCourse'
import Aspirants from '../../component/AboutUsComponents/Aspirants/Aspirants'
import Footer from '../LandingPage/Footer/Footer'
import AllCoursesDetails from '../../component/AllCoursesComponents/AllCoursesDetails/AllCoursesDetails'

const OurCoursesDetails = () => {
  return (
    <div>
      <Header/>
      <AllCoursesDetails/>
      <LawAcademy/>
      <EnrollCourse/>
      <Aspirants/>
      <Footer/>
    </div>
  )
}

export default OurCoursesDetails;