import React, { useEffect, useState } from "react";
import {
  Container,
  CourseImage,
  CourseSubject,
  Statdesc,
  EnrollButton,
  FeaturesContainer,
  FeatureColumn,
  Bullet,
  Hello,
  Feature,
  LeftCol,
  LeftSticky,
  RightCol,
} from "./IndivitualCourse.styles";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCourseById } from "../../../api/courseApi";
import { getCookiesData } from "../../../utils/cookiesService";
import { getUserByUserId } from "../../../api/authApi";
import { addCourseToStudent } from "../../../api/userApi";
import PurchaseModal from "../../PurchaseModal/PurchaseModal";
import { Achievement } from "../../LandingPageComponents/Achievers/Achievers.styles";
import Achievers from "../../LandingPageComponents/Achievers/Achievers";
import VideoAndReviews from "../../LandingPageComponents/VideoAndReviews/VideoAndReviews";
import Aspirants from "../../AboutUsComponents/Aspirants/Aspirants";

const IndividualCourses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // init user + enrollment state
  useEffect(() => {
    const init = async () => {
      try {
        const cookieData = getCookiesData();
        if (cookieData?.userId) {
          const user = await getUserByUserId(cookieData.userId);
          if (user?.user) setUserLoggedIn(true);
        }
      } catch {
        // ignore
      } finally {
        setIsEnrolled(Boolean(location.state?.isEnrolled));
      }
    };
    init();
  }, [location.state]);

  // fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(id);
        setCourse(response.data);
      } catch (err) {
        setError(err?.message || "Failed to fetch course details");
        toast.error("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  const handleEnrollFreeCourse = async (courseId) => {
    try {
      const cookieData = getCookiesData();
      const response = await addCourseToStudent({
        userId: cookieData.userId,
        courseIds: [courseId],
      });
      if (response) {
        setIsEnrolled(true);
        toast.success("Successfully enrolled course", {
          onClose: () => navigate("/user"),
        });
      }
    } catch (err) {
      toast.error("Failed to enroll course");
    }
  };

  if (loading) return <Container>Loading course details...</Container>;
  if (error) return <Container>Error: {error}</Container>;
  if (!course) return <Container>Course not found</Container>;

  return (
    <>
    <Container>
      {/* Two-column layout:
          LEFT (sticky): image + enroll button
          RIGHT (scrolls): name + description (+ subjects) */}
      <Hello>
        <LeftCol>
          <LeftSticky>
            <CourseImage src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${course?.image}`} alt="Course" />
            {userLoggedIn ? (
              <>
                {isEnrolled ? (
                  <EnrollButton onClick={() => navigate("/user")}>
                    Continue Learning
                  </EnrollButton>
                ) : course.price > 0 ? (
                  <EnrollButton onClick={() => setShowModal(true)}>
                    Enroll Now ₹
                    {course.discountActive
                      ? course.discountPrice
                      : course.price}
                    /-
                  </EnrollButton>
                ) : (
                  <EnrollButton
                    onClick={() => handleEnrollFreeCourse(course._id)}
                  >
                    Enroll Now
                  </EnrollButton>
                )}
              </>
            ) : (
              <EnrollButton onClick={() => navigate(`/login`)}>
                Enroll Now ₹
                {course.discountActive ? course.discountPrice : course.price}/-
                {course.discountActive && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: 8,
                      color: "#999",
                    }}
                  >
                    ₹{course.price}
                  </span>
                )}
              </EnrollButton>
            )}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </LeftSticky>
        </LeftCol>

        {/* RIGHT Content Column */}
        <RightCol>  <CourseSubject style={{ marginLeft: 0 }}>
            {course?.courseDisplayName || "Course Title"}
          </CourseSubject>

          <Statdesc
            dangerouslySetInnerHTML={{
              __html: course?.description || "N/A",
            }}
          />

        
        </RightCol>
      </Hello>

      {showModal && (
        <PurchaseModal course={course} onClose={() => setShowModal(false)} />
      )}
    </Container>
    {/* <Aspirants /> */}
   {/* <Achievers/> */}
    </>
  );
};

export default IndividualCourses;
