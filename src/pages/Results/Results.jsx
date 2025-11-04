import React from "react";
import Header from "../LandingPage/LandingHeader/LandingHeader";
import MeetAchievers from "../../component/ResultsComponents/MeetAchievers/MeetAchievers";
import Footer from "../LandingPage/Footer/Footer";
import Aspirants from "../../component/AboutUsComponents/Aspirants/Aspirants";
import VideoandTestimonial from "../../component/ResultsComponents/VideoandTestimonial/VideoandTestimonial";
import Achievers from "../../component/LandingPageComponents/Achievers/Achievers";
import SectionWrapper from "../../component/LandingPageComponents/SectionWrapper";

const Results = () => {
  return (
    <div>
      <Header />
      {/* <MeetAchievers/> */}
      <SectionWrapper>
        <Achievers />
      </SectionWrapper>

      <SectionWrapper delay={0.1}>
        <VideoandTestimonial />
      </SectionWrapper>

      <SectionWrapper delay={0.2}>
        {" "}
        <Aspirants />
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default Results;
