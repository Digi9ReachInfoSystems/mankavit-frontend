import react from "react";
import Header from "../LandingPage/LandingHeader/LandingHeader";
import Footer from "../LandingPage/Footer/Footer";
import CompletedCourses from "../../component/CompletedCoursesComponents/CompletedCourses/CompletedCourses";
import CompletedCourseReviews from "../../component/CompletedCoursesComponents/CompletedCourseReviews/CompletedCourseReviews";

const CompletedCoursesPage = () => {
    return (
        <div>
            <Header />
            <CompletedCourses />
            <CompletedCourseReviews />
            <Footer />
        </div>
    );
};

export default CompletedCoursesPage;