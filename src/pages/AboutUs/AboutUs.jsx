import React from 'react'
import Header from '../../pages/LandingPage/LandingHeader/LandingHeader'
import AboutContainer from '../../component/AboutUsComponents/AboutContainer/AboutContainer'
import Mission from '../../component/AboutUsComponents/Mission/Mission'
import Aspirants from '../../component/AboutUsComponents/Aspirants/Aspirants'
import Footer from '../../pages/LandingPage/Footer/Footer'

const AboutUs = () => {
  return (
    <div>
      <Header />
      <AboutContainer/>
      <Mission/>
      <Aspirants/>
      <Footer/>
    </div>
  )
}

export default AboutUs
