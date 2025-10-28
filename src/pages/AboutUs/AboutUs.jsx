import React, { useEffect } from 'react'
import Header from '../../pages/LandingPage/LandingHeader/LandingHeader'
import AboutContainer from '../../component/AboutUsComponents/AboutContainer/AboutContainer'
import Mission from '../../component/AboutUsComponents/Mission/Mission'
import Aspirants from '../../component/AboutUsComponents/Aspirants/Aspirants'
import Footer from '../../pages/LandingPage/Footer/Footer'
import { useLocation } from 'react-router-dom'

const AboutUs = () => {
      const { pathname } = useLocation();

  useEffect(() => {
    document.getElementsByClassName('aboutus')[0].scrollIntoView();
  
  }, [pathname]);
  return (
    <div className='aboutus'>
      <Header />
      <AboutContainer/>
      <Mission/>
      <Aspirants/>
      <Footer/>
    </div>
  )
}

export default AboutUs
