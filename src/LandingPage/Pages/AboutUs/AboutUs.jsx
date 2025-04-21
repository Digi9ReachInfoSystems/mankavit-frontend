import React from 'react'
import Header from '../../Components/LandingHeader/LandingHeader'
import AboutContainer from '../../Components/AboutContainer/AboutContainer'
import Mission from '../../Components/Mission/Mission'
import Aspirants from '../../Components/Aspirants/Aspirants'
import Footer from '../../Components/Footer/Footer'

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
