// src/module/user/components/Courses/Courses.jsx
import React, { useState, useEffect } from 'react';
import {
  CourseWrapper,
  Title,
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
  NoCourseFoundButton,
  BlinkingIcon,
  ShowMoreBar,        // ⬅️ make sure these are exported in your styles file
  ToggleAllButton,    // ⬅️ make sure these are exported in your styles file
} from './Courses.styles';

import lawimg from "../../../../assets/lawentrance.png";
import { FaStar } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

import { getAllEnrolledCourses } from '../../../../api/userDashboardAPI';
import { getCookiesData } from '../../../../utils/cookiesService';
import { startCourse } from '../../../../api/userProgressApi';
import { getLiveMeetings } from '../../../../api/meetingApi';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = getCookiesData();
  const navigate = useNavigate();
  const [liveStatus, setLiveStatus] = useState({});
  const [viewAll, setViewAll] = useState(false); // ⬅️ view-all toggle

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllEnrolledCourses(userId);

        if (response && response.enrolledCourses) {
          setCourses(response.enrolledCourses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCourses();
    } else {
      setError('User ID not found. Please login again.');
      setLoading(false);
    }
  }, [userId]);

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

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i <= Math.floor(rating) ? '#facc15' : '#e4e5e9'}
          style={{ marginRight: 4 }}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <CourseWrapper>
        <Title>My Courses</Title>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading your courses...
        </div>
      </CourseWrapper>
    );
  }

  if (error) {
    return (
      <CourseWrapper>
        <Title>My Courses</Title>
        <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
          {error}
        </div>
      </CourseWrapper>
    );
  }

  // show 8 cards (4x2) by default; expand to all with the toggle
  const displayedCourses = viewAll ? courses : courses.slice(0, 8);

  return (
    <CourseWrapper>
      <Title>My Courses</Title>

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <ProgressLabel style={{ color: "#22c55e" }} />
                  {/* Optional ratings */}
                  {/* <div className='stars' style={{ color: '#facc15' }}>
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
                    {course.courseDisplayName || course.courseName || 'Course Title'}
                  </CourseTitle>
                  {/* <CourseMinititle>{course?.subtitle || ''}</CourseMinititle> */}
                </CourseMain>

                {course.course_status !== "completed" ? (
                  <Details>
                    <DetailItemok>
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
                  onClick={async () => {
                    if (course.kycStatus) {
                      const response = await startCourse(userId, course._id);
                      if (response) {
                        navigate(`/continueCourse/${course._id}`);
                      }
                    } else {
                      if (
                        course.userKycStatus === "not-applied" ||
                        course.userKycStatus === "rejected"
                      ) {
                        navigate(`/kyc`);
                      } else {
                        const response = await startCourse(userId, course._id);
                        if (response?.success) {
                          // navigate(`/continueCourse/${course._id}`);
                        }
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
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem',
              fontSize: '1.2rem',
              color: '#666',
              gridColumn: '1 / -1',
            }}
          >
            <div>
              No courses found.
              <Link to={"/ourcoursedetails"}>
                <NoCourseFoundButton>Explore our courses</NoCourseFoundButton>
              </Link>
            </div>
          </div>
        )}
      </CardGrid>

      {courses.length > 8 && (
        <ShowMoreBar>
          <ToggleAllButton onClick={() => setViewAll((v) => !v)}>
            {viewAll ? 'Show less' : `View all (${courses.length - 8} more)`}
          </ToggleAllButton>
        </ShowMoreBar>
      )}
    </CourseWrapper>
  );
};

export default Courses;
