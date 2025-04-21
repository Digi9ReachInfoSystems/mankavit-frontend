import react from "react";
import Header from "./LandingHeader/LandingHeader";
import StudyWithUs from "../../component/LandingPageComponents/StudyWithUs/StudyWithUs";
import Achievers from "../../component/LandingPageComponents/Achievers/Achievers";
import VideoAndReviews from "../../component/LandingPageComponents/VideoAndReviews/VideoAndReviews";
import WantToLearn from "../../component/LandingPageComponents/WantToLearn/WantToLearn";
import GotQuestion from "../../component/LandingPageComponents/GotQuestions/GotQuestions";
// import Footer from "../../Components/Footer/Footer";

const LandingPage = () => {
    return <>
    <Header />
    <StudyWithUs />
    <Achievers />
    <VideoAndReviews /> 
    <WantToLearn />
    <GotQuestion />
    {/* <Footer /> */}
    </>;
};

export default LandingPage;