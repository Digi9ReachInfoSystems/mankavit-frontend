import React, { useState, useEffect } from "react";
import {
  CourseWrapper,
  Title,
  FilterBar,
  FilterButton,
  CardGrid,
  CourseCard,
  ImageWrapper,
  ProgressContainer,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  CourseContent,
  CourseMain,
  CourseTitle,
  Details,
  DetailItemok,
  PriceActions,
  ViewButton,
  BlinkingIcon,
  ShowMoreBar,
  ToggleAllButton,
} from "./UserCourses.styles";
import { useNavigate } from "react-router-dom";
import lawimg from "../../../../assets/lawentrance.png";
import { FcOk } from "react-icons/fc";
import {
  getAllEnrolledCourses,
  getAllOngoingCourses,
  getAllCompletedCourses,
} from "../../../../api/userDashboardAPI";
import { getCookiesData } from "../../../../utils/cookiesService";
import { getLiveMeetings } from "../../../../api/meetingApi";
import { getUserByUserId } from "../../../../api/authApi";
import { startCourse } from "../../../../api/userProgressApi"; // already imported ✅

const UserCourses = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [userData, setUserData] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [liveStatus, setLiveStatus] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [submitting, setSubmitting] = useState({}); // ✅ per-card loading

  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const getCtaText = (course) => {
    const completed = course.course_status === "completed";
    const pct = Number(course.completePercentage || 0);

    if (completed) return "Completed";
    if (
      !course.kycStatus &&
      (course.userKycStatus === "not-applied" ||
        course.userKycStatus === "rejected")
    ) {
      return "Complete KYC to continue";
    }
    return pct === 0 ? "Start Learning" : "Continue Learning";
  };

  // ✅ common handler for Start/Continue
  const handleStartOrContinue = async (course) => {
    try {
      // KYC gate
      if (
        userData?.kyc_status === "not-applied" ||
        userData?.kyc_status === "rejected"
      ) {
        navigate(`/user/kycStatus`);
        return;
      }

      // Completed → just navigate
      if (course.course_status === "completed") {
        navigate(`/continueCourse/${course._id}`);
        return;
      }

      // Call startCourse for BOTH Start and Continue
      setSubmitting((s) => ({ ...s, [course._id]: true }));
      await startCourse(userId, course._id);

      // Navigate after success
      navigate(`/continueCourse/${course._id}`);
    } catch (e) {
      console.error("Failed to start course", e);
      setError(
        e?.response?.data?.message ||
          "Failed to start the course. Please try again."
      );
    } finally {
      setSubmitting((s) => ({ ...s, [course._id]: false }));
    }
  };

  // Fetch courses on tab change
  useEffect(() => {
    const fetchCourses = async () => {
      if (!userId) {
        setError("User not logged in.");
        setCourses([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const userDataRes = await getUserByUserId(userId);
        setUserData(userDataRes.user);

        let response = {};
        if (activeTab === "All") {
          response = await getAllEnrolledCourses(userId);
        } else if (activeTab === "Ongoing") {
          response = await getAllOngoingCourses(userId);
        } else if (activeTab === "Completed") {
          response = await getAllCompletedCourses(userId);
        }

        setCourses(
          Array.isArray(response.enrolledCourses)
            ? response.enrolledCourses
            : []
        );
        setShowAll(false); // reset view
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
        setCourses([]);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [activeTab, userId]);

  // Poll live statuses
  useEffect(() => {
    if (courses.length === 0) return;
    const ids = courses.map((c) => c._id);
    pollLiveStatuses(ids);
    const interval = setInterval(() => pollLiveStatuses(ids), 30000);
    return () => clearInterval(interval);
  }, [courses]);

  const pollLiveStatuses = async (courseIds) => {
    try {
      const res = await getLiveMeetings({ courseIds });
      const statusMap = {};
      res.data.forEach((meeting) => {
        meeting.course_Ref.forEach((id) => {
          statusMap[id._id] = true;
        });
      });
      setLiveStatus(statusMap);
    } catch (err) {
      console.error("Error fetching live statuses", err);
    }
  };

  // Slice courses if not "show all"
  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <CourseWrapper>
      <Title>My Courses </Title>

      <FilterBar>
        <FilterButton
          active={activeTab === "All"}
          onClick={() => setActiveTab("All")}
        >
          All
        </FilterButton>
        <FilterButton
          active={activeTab === "Ongoing"}
          onClick={() => setActiveTab("Ongoing")}
        >
          Ongoing
        </FilterButton>
        <FilterButton
          active={activeTab === "Completed"}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </FilterButton>
      </FilterBar>

      {loading && (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Loading courses...
        </div>
      )}
      {error && (
        <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <CardGrid>
            {displayedCourses.length > 0 ? (
              displayedCourses.map((course, index) => {
                const isCompleted = course.course_status === "completed";
                const isSubmitting = !!submitting[course._id];

                return (
                  <CourseCard key={index} completed={isCompleted}>
                    <ImageWrapper>
                      <img
                        src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${course.image}` || lawimg}
                        alt="Course Banner"
                      />
                    </ImageWrapper>

                    <ProgressContainer>
                      <ProgressLabel>
                        {course.completePercentage || 0}% Completed
                      </ProgressLabel>
                      <ProgressBar>
                        <ProgressFill
                          style={{
                            width: `${course.completePercentage || 0}%`,
                          }}
                        />
                      </ProgressBar>
                    </ProgressContainer>

                    {liveStatus[course._id] && (
                      <BlinkingIcon>🔴 Live Class Ongoing</BlinkingIcon>
                    )}

                    <CourseContent>
                      <CourseMain>
                        <CourseTitle>
                          {course.courseDisplayName ||
                            course.courseName ||
                            "Course Title"}
                        </CourseTitle>
                      </CourseMain>

                      {!isCompleted ? (
                        <Details>
                          <DetailItemok style={{ color: "#206666ff" }}>
                            Finish 100% to unlock the certificate
                          </DetailItemok>
                        </Details>
                      ) : (
                        <Details>
                          <DetailItemok>
                            <FcOk fontSize={30} /> You have successfully
                            Completed this course
                          </DetailItemok>
                        </Details>
                      )}
                    </CourseContent>

                    <PriceActions>
                      <ViewButton
                        completed={isCompleted}
                        disabled={isSubmitting}
                        onClick={() => handleStartOrContinue(course)} // ✅
                      >
                        {isSubmitting ? "Please wait…" : getCtaText(course)}
                      </ViewButton>
                    </PriceActions>
                  </CourseCard>
                );
              })
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "2rem",
                  fontSize: "1.2rem",
                  color: "#666",
                }}
              >
                No courses found. Enroll in a course to get started.
              </div>
            )}
          </CardGrid>

          {courses.length > 4 && (
            <ShowMoreBar>
              <ToggleAllButton onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "View All"}
              </ToggleAllButton>
            </ShowMoreBar>
          )}
        </>
      )}
    </CourseWrapper>
  );
};

export default UserCourses;
