import React from 'react'
import Header from '../LandingPage/LandingHeader/LandingHeader'
import MeetAchievers from '../../component/ResultsComponents/MeetAchievers/MeetAchievers'
import Footer from '../LandingPage/Footer/Footer'
import Aspirants from '../../component/AboutUsComponents/Aspirants/Aspirants'
import VideoandTestimonial from '../../component/ResultsComponents/VideoandTestimonial/VideoandTestimonial'

const Results = () => {
  return (
    <div>
      <Header/>
      <MeetAchievers/>
      <VideoandTestimonial/>
      <Aspirants/>
      <Footer/>
    </div>
  )
}

export default Results
