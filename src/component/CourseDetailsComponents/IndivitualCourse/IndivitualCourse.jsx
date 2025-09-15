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
  Feature,
} from "./IndivitualCourse.styles";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCourseById } from "../../../api/courseApi";
import { getCookiesData } from "../../../utils/cookiesService";
import { getUserByUserId } from "../../../api/authApi";
import { addCourseToStudent } from "../../../api/userApi";
import PurchaseModal from "../../PurchaseModal/PurchaseModal";

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
    <Container>
      {/* Two-column layout:
          LEFT (sticky): image + enroll button
          RIGHT (scrolls): name + description (+ subjects) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) 2fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT Sticky Column */}
        <div
          style={{
            position: "sticky",
            top: 16, // adjust if you have a fixed header
            alignSelf: "start",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <CourseImage src={course?.image} alt="Course" />
          {userLoggedIn ? (
            <>
              {isEnrolled ? (
                <EnrollButton onClick={() => navigate("/user")}>
                  Continue Learning
                </EnrollButton>
              ) : course.price > 0 ? (
                <EnrollButton onClick={() => setShowModal(true)}>
                  Enroll Now ₹
                  {course.discountActive ? course.discountPrice : course.price}/-
                </EnrollButton>
              ) : (
                <EnrollButton onClick={() => handleEnrollFreeCourse(course._id)}>
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
        </div>

        {/* RIGHT Content Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <CourseSubject style={{ marginLeft: 0 }}>
            {course?.courseDisplayName || "Course Title"}
          </CourseSubject>

          <Statdesc
            dangerouslySetInnerHTML={{
              __html: course?.description || "N/A",
            }}
          />

          {/* Optional: keep subjects list under description */}
          {Array.isArray(course?.subjects) && course.subjects.length > 0 && (
            <FeaturesContainer>
              <FeatureColumn>
                <p style={{ fontWeight: "bold", fontSize: 24 }}>
                  Subjects included:
                </p>
                {course.subjects.map((subj, idx) => (
                  <div key={idx} style={{ display: "flex" }}>
                    <Bullet>•</Bullet>
                    <Feature>{subj.subjectName}</Feature>
                  </div>
                ))}
              </FeatureColumn>
            </FeaturesContainer>
          )}
        </div>
      </div>

      {showModal && (
        <PurchaseModal course={course} onClose={() => setShowModal(false)} />
      )}
    </Container>
  );
};

export default IndividualCourses;
