import React, { useEffect } from 'react'
import Header from '../LandingPage/LandingHeader/LandingHeader'
import AllCourses from '../../component/AllCoursesComponents/AllCourses/AllCourses'
import LawAcademy from '../../component/AllCoursesComponents/LawAcademy/LawAcademy'
import EnrollCourse from '../../component/AllCoursesComponents/EnrollCourse/EnrollCourse'
import Aspirants from '../../component/AboutUsComponents/Aspirants/Aspirants'
import Footer from '../LandingPage/Footer/Footer'
import AllCoursesDetails from '../../component/AllCoursesComponents/AllCoursesDetails/AllCoursesDetails'
import { useLocation } from 'react-router-dom'

const OurCoursesDetails = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementsByClassName('ourcoursesdetails')[0].scrollIntoView();
  
  }, [pathname]);
  return (
    <div className='ourcoursesdetails' >
      <Header />
      <AllCoursesDetails />
      <LawAcademy />
      <EnrollCourse />
      <Aspirants />
      <Footer />
    </div>
  )
}

export default OurCoursesDetails;