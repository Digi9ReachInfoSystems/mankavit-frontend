import react from "react";
import Header from "./LandingHeader/LandingHeader";
import StudyWithUs from "../../component/LandingPageComponents/StudyWithUs/StudyWithUs";
import Achievers from "../../component/LandingPageComponents/Achievers/Achievers";
import VideoAndReviews from "../../component/LandingPageComponents/VideoAndReviews/VideoAndReviews";
import WantToLearn from "../../component/LandingPageComponents/WantToLearn/WantToLearn";
import GotQuestion from "../../component/LandingPageComponents/GotQuestions/GotQuestions";
import Footer from "../../pages/LandingPage/Footer/Footer";
import LegalEducationHero from "../../component/LandingPageComponents/LegalEducationHero/LegalEducationHero";

const LandingPage = () => {
    return <>
    <Header />
    <LegalEducationHero />
    <StudyWithUs />
    <Achievers />
    <VideoAndReviews /> 
    <WantToLearn />
    <GotQuestion />
    <Footer />
    </>;
};

export default LandingPage;