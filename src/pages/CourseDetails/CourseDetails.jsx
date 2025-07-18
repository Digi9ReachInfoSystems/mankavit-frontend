import React from 'react';
import Header from "../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from '../LandingPage/Footer/Footer';
import IndividualCourses from '../../component/CourseDetailsComponents/IndivitualCourse/IndivitualCourse';
import CourseFeatures from '../../component/CourseDetailsComponents/CourseFeatures/CourseFeatures';
import VideoAndReviews from '../../component/LandingPageComponents/VideoAndReviews/VideoAndReviews';

const CourseDetails = () => {
  return (
    <div>
      <Header/>
      <IndividualCourses />
      {/* <CourseFeatures /> */}
      {/* <VideoAndReviews />  */}
      <Footer />
    </div>
  )
}

export default CourseDetails;
