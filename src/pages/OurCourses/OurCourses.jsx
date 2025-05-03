import React from 'react'
import Header from "../../pages/LandingPage/LandingHeader/LandingHeader"
import AllCourses from '../../component/AllCoursesComponents/AllCourses/AllCourses'
import Footer from '../LandingPage/Footer/Footer'
import LawAcademy from '../../component/AllCoursesComponents/LawAcademy/LawAcademy'
import Aspirants from '../../component/AboutUsComponents/Aspirants/Aspirants'
import EnrollCourse from '../../component/AllCoursesComponents/EnrollCourse/EnrollCourse'

const OurCourses = () => {
  return (
    <div>
      <Header/>
      <AllCourses/>
      <LawAcademy />
      <EnrollCourse />
      <Aspirants />
      <Footer />
    </div>
  )
}

export default OurCourses
