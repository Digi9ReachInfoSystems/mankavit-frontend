import react from "react";
import Header from "../../Components/LandingHeader/LandingHeader";
import StudyWithUs from "../../Components/StudyWithUs/StudyWithUs";
import Achievers from "../../Components/Achievers/Achievers";
import VideoAndReviews from "../../Components/VideoAndReviews/VideoAndReviews";
import WantToLearn from "../../Components/WantToLearn/WantToLearn";
import GotQuestion from "../../Components/GotQuestions/GotQuestions";
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