import React from "react";
import Header from "../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from "../LandingPage/Footer/Footer";
import IndividualCourses from "../../component/CourseDetailsComponents/IndivitualCourse/IndivitualCourse";
import CourseFeatures from "../../component/CourseDetailsComponents/CourseFeatures/CourseFeatures";
import VideoAndReviews from "../../component/LandingPageComponents/VideoAndReviews/VideoAndReviews";
import SectionWrapper from "../../component/LandingPageComponents/SectionWrapper";

const CourseDetails = () => {
  return (
    <div>
      <Header />
      <SectionWrapper>
        {" "}
        <IndividualCourses />
      </SectionWrapper>
      {/* <CourseFeatures /> */}
      {/* <VideoAndReviews />  */}
      {/* <Footer /> */}
    </div>
  );
};

export default CourseDetails;
