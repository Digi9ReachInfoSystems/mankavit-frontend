// src/module/user/components/UserCourses/UserCourses.jsx
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
  CourseMinititle,
  CourseDesc,
  Details,
  DetailItem,
  DetailItemok,
  PriceActions,
  ViewButton,
  BlinkingIcon,
  ShowMoreBar,
  ToggleAllButton,
} from "./UserCourses.styles";
import { useNavigate } from "react-router-dom";
import lawimg from "../../../../assets/lawentrance.png";
import { FaStar } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import {
  getAllEnrolledCourses,
  getAllOngoingCourses,
  getAllCompletedCourses,
} from "../../../../api/userDashboardAPI";
import { getCookiesData } from "../../../../utils/cookiesService";
import { getLiveMeetings } from "../../../../api/meetingApi";

const UserCourses = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [liveStatus, setLiveStatus] = useState({});
  const [viewAll, setViewAll] = useState(false); // ⬅️ View all / Show less toggle
  const navigate = useNavigate();

  // Get userId from cookies
  const { userId } = getCookiesData();

  const getCtaText = (course) => {
    const completed = course.course_status === "completed";
    const pct = Number(course.completePercentage || 0);
    const isZero = pct === 0;

    if (completed) return "Completed";
    if (
      !course.kycStatus &&
      (course.userKycStatus === "not-applied" || course.userKycStatus === "rejected")
    ) {
      return "Complete KYC to continue";
    }
    return isZero ? "Start Learning" : "Continue Learning";
  };

  useEffect(() => {
    if (courses.length === 0) return;
    const ids = courses.map((c) => c._id);
    pollLiveStatuses(ids);
    const interval = setInterval(() => pollLiveStatuses(ids), 30000);
    return () => clearInterval(interval);
  }, [courses]);

  // Fetch courses based on activeTab
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
        let response = {};
        if (activeTab === "All") {
          response = await getAllEnrolledCourses(userId);
        } else if (activeTab === "Ongoing") {
          response = await getAllOngoingCourses(userId);
        } else if (activeTab === "Completed") {
          response = await getAllCompletedCourses(userId);
        }
        setCourses(Array.isArray(response.enrolledCourses) ? response.enrolledCourses : []);
        // Reset viewAll whenever the tab changes
        setViewAll(false);
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
        setCourses([]);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [activeTab, userId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i <= Math.floor(rating) ? "#facc15" : "#e4e5e9"}
          size={20}
          style={{ marginRight: 4 }}
        />
      );
    }
    return stars;
  };

  const pollLiveStatuses = async (courseIds) => {
    try {
      const res = await getLiveMeetings({ courseIds });
      const statusMap = {};
      (res?.data || []).forEach((meeting) => {
        (meeting?.course_Ref || []).forEach((id) => {
          statusMap[id._id] = true;
        });
      });
      setLiveStatus(statusMap);
    } catch (err) {
      console.error("Error fetching live statuses", err);
    }
  };

  // Show 8 (4x2) by default; expand to all with the toggle
  const displayedCourses = viewAll ? courses : courses.slice(0, 8);

  return (
    <CourseWrapper>
      <Title>My Courses</Title>

      <FilterBar>
        <FilterButton active={activeTab === "All"} onClick={() => setActiveTab("All")}>
          All
        </FilterButton>
        <FilterButton active={activeTab === "Ongoing"} onClick={() => setActiveTab("Ongoing")}>
          Ongoing
        </FilterButton>
        <FilterButton active={activeTab === "Completed"} onClick={() => setActiveTab("Completed")}>
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
              displayedCourses.map((course, index) => (
                <CourseCard key={index} completed={course.course_status === "completed"}>
                  <ImageWrapper>
                    <img src={course.image || lawimg} alt="Course Banner" />
                  </ImageWrapper>

                  <ProgressContainer>
                    <ProgressLabel>{course.completePercentage || 0}% Completed</ProgressLabel>
                    <ProgressBar>
                      <ProgressFill style={{ width: `${course.completePercentage || 0}%` }} />
                    </ProgressBar>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <ProgressLabel style={{ color: "#22c55e" }} />
                      {/* <div className="stars" style={{ color: "#facc15" }}>
                        {renderStars(course.course_rating)}
                      </div> */}
                    </div>
                  </ProgressContainer>

                  {liveStatus[course._id] && (
                    <BlinkingIcon>🔴 Live Class Ongoing</BlinkingIcon>
                  )}

                  <CourseContent>
                    <CourseMain>
                      <CourseTitle>
                        {course.courseDisplayName || course.courseName || "Course Title"}
                      </CourseTitle>
                      {/* <CourseMinititle>{course.shortDescription || 'Course Description'}</CourseMinititle> */}
                    </CourseMain>

                    {course.course_status !== "completed" ? (
                      <Details>
                        <DetailItemok style={{ color: "#206666ff" }}>
                          Finish 100% to unlock the certificate
                        </DetailItemok>
                      </Details>
                    ) : (
                      <Details>
                        <DetailItemok>
                          <FcOk fontSize={30} /> You have successfully Completed this course
                        </DetailItemok>
                      </Details>
                    )}
                  </CourseContent>

                  <PriceActions>
                    <ViewButton
                      completed={course.course_status === "completed"}
                      onClick={() => {
                        if (course.kycStatus) {
                          navigate(`/continueCourse/${course._id}`);
                        } else {
                          if (
                            course.userKycStatus === "not-applied" ||
                            course.userKycStatus === "rejected"
                          ) {
                            navigate(`/kyc`);
                          } else {
                            navigate(`/continueCourse/${course._id}`);
                          }
                        }
                      }}
                    >
                      {getCtaText(course)}
                    </ViewButton>
                  </PriceActions>
                </CourseCard>
              ))
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

          {/* View all / Show less toggle (only when more than 8) */}
          {courses.length > 8 && (
            <ShowMoreBar>
              <ToggleAllButton onClick={() => setViewAll((v) => !v)}>
                {viewAll ? "Show less" : `View all (${courses.length - 8} more)`}
              </ToggleAllButton>
            </ShowMoreBar>
          )}
        </>
      )}
    </CourseWrapper>
  );
};

export default UserCourses;
