import React from "react";
import Header from "./LandingHeader/LandingHeader";
import StudyWithUs from "../../component/LandingPageComponents/StudyWithUs/StudyWithUs";
import Achievers from "../../component/LandingPageComponents/Achievers/Achievers";
import VideoAndReviews from "../../component/LandingPageComponents/VideoAndReviews/VideoAndReviews";
import WantToLearn from "../../component/LandingPageComponents/WantToLearn/WantToLearn";
import GotQuestions2 from "../../component/LandingPageComponents/GotQuestions2/GotQuestions2";
import Footer from "../../pages/LandingPage/Footer/Footer";
import LegalEducationHero from "../../component/LandingPageComponents/LegalEducationHero/LegalEducationHero";
import Aspirants from "../../component/AboutUsComponents/Aspirants/Aspirants";
import SectionWrapper from "../../component/LandingPageComponents/SectionWrapper"; // 👈 import

const LandingPage = () => {
  return (
    <>
      <Header />
      <SectionWrapper>
        <LegalEducationHero />
      </SectionWrapper>

      <SectionWrapper delay={0.1}>
        <StudyWithUs />
      </SectionWrapper>

      <SectionWrapper delay={0.2}>
        <Achievers />
      </SectionWrapper>

      <SectionWrapper delay={0.3}>
        <VideoAndReviews />
      </SectionWrapper>

      <SectionWrapper delay={0.4}>
        <Aspirants />
      </SectionWrapper>

      <SectionWrapper delay={0.5}>
        <WantToLearn />
      </SectionWrapper>

      <SectionWrapper delay={0.6}>
        <GotQuestions2 />
      </SectionWrapper>

      <Footer />
    </>
  );
};

export default LandingPage;
