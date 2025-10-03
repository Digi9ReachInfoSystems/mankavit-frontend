// import React, { useState, useEffect } from 'react';
// import {
//   CourseWrapper,
//   Title,
//   CardGrid,
//   CourseCard,
//   ImageWrapper,
//   ProgressContainer,
//   ProgressLabel,
//   ProgressBar,
//   ProgressFill,
//   CourseContent,
//   CourseMain,
//   CourseTitle,
//   Details,
//   DetailItemok,
//   PriceActions,
//   ViewButton,
//   NoCourseFoundButton,
//   BlinkingIcon,
//   ViewAllButton
// } from './Courses.styles';
// import lawimg from "../../../../assets/lawentrance.png";
// import { FcOk } from "react-icons/fc";
// import {
//   getAllEnrolledCourses,
// } from '../../../../api/userDashboardAPI';
// import { getCookiesData } from '../../../../utils/cookiesService';
// import { Link, useNavigate } from 'react-router-dom';
// import { startCourse } from '../../../../api/userProgressApi';
// import { getLiveMeetings } from '../../../../api/meetingApi';
// import { getUserByUserId } from '../../../../api/authApi';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { userId } = getCookiesData();
//   const [userData, setUserData] = useState({});
//   const navigate = useNavigate();
//   const [liveStatus, setLiveStatus] = useState({});
//   const [showAll, setShowAll] = useState(false);

//   const getCtaText = (course) => {
//     const completed = course.course_status === "completed";
//     const pct = Number(course.completePercentage || 0);
//     const isZero = pct === 0;

//     if (completed) return "Completed";
//     if (
//       !course.kycStatus &&
//       (course.userKycStatus === "not-applied" || course.userKycStatus === "rejected")
//     ) {
//       return "Complete KYC to continue";
//     }
//     return isZero ? "Start Learning" : "Continue Learning";
//   };

//   useEffect(() => {
//     if (courses.length === 0) return;
//     const ids = courses.map(c => c._id);
//     pollLiveStatuses(ids);
//     const interval = setInterval(() => pollLiveStatuses(ids), 30000);
//     return () => clearInterval(interval);
//   }, [courses]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const userData = await getUserByUserId(userId);
//         setUserData(userData.user);
//         const response = await getAllEnrolledCourses(userId);
//         if (response && response.enrolledCourses) {
//           setCourses(response.enrolledCourses);
//         } else {
//           setCourses([]);
//         }
//       } catch (err) {
//         setError(err.message || 'Failed to fetch courses');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchCourses();
//     } else {
//       setError('User ID not found. Please login again.');
//       setLoading(false);
//     }
//   }, [userId]);

//   const pollLiveStatuses = async (courseIds) => {
//     try {
//       const res = await getLiveMeetings({ courseIds });
//       const statusMap = {};
//       res.data.forEach(meeting => {
//         meeting.course_Ref.map(id => {
//           statusMap[id._id] = true;
//         });
//       });
//       setLiveStatus(statusMap);
//     } catch (err) {
//       console.error("Error fetching live statuses", err);
//     }
//   };

//   if (loading) {
//     return (
//       <CourseWrapper>
//         <Title>My Courses</Title>
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           Loading your courses...
//         </div>
//       </CourseWrapper>
//     );
//   }

//   if (error) {
//     return (
//       <CourseWrapper>
//         <Title>My Courses</Title>
//         <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
//           {error}
//         </div>
//       </CourseWrapper>
//     );
//   }

//   // Slice courses if showAll is false
//   const displayedCourses = showAll ? courses : courses.slice(0, 4);

//   return (
//     <CourseWrapper>
//       <Title>My Courses</Title>
//       <CardGrid>
//         {displayedCourses.length > 0 ? (
//           displayedCourses.map((course, index) => (
//             <CourseCard key={index} completed={course.course_status === "completed"}>
//               <ImageWrapper>
//                 <img src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${course.image}` || lawimg} alt="Course Banner" />
//               </ImageWrapper>

//               <ProgressContainer>
//                 <ProgressLabel>{course.completePercentage || 0}% Completed</ProgressLabel>
//                 <ProgressBar>
//                   <ProgressFill style={{ width: `${course.completePercentage || 0}%` }} />
//                 </ProgressBar>
//               </ProgressContainer>

//               {liveStatus[course._id] && (
//                 <BlinkingIcon>🔴 Live Class Ongoing</BlinkingIcon>
//               )}

//               <CourseContent>
//                 <CourseMain>
//                   <CourseTitle>
//                     {course.courseDisplayName || course.courseName || 'Course Title'}
//                   </CourseTitle>
//                 </CourseMain>

//                 {course.course_status !== "completed" ? (
//                   <Details>
//                     <DetailItemok style={{ color: "#206666ff" }}>
//                       Finish 100% to unlock the certificate
//                     </DetailItemok>
//                   </Details>
//                 ) : (
//                   <Details>
//                     <DetailItemok>
//                       <FcOk fontSize={30} /> You have successfully completed this course
//                     </DetailItemok>
//                   </Details>
//                 )}
//               </CourseContent>

//               <PriceActions>
//                 <ViewButton
//                   completed={course.course_status === "completed"}
//                   onClick={() => {
//                     if (
//                       userData.kyc_status === "not-applied" ||
//                       userData.kyc_status === "rejected"
//                     ) {
//                       navigate(`/user/kycStatus`);
//                     } else {
//                       navigate(`/continueCourse/${course._id}`);
//                     }
//                   }}
//                 >
//                   {getCtaText(course)}
//                 </ViewButton>
//               </PriceActions>
//             </CourseCard>
//           ))
//         ) : (
//           <div style={{ textAlign: 'center', padding: '2rem' }}>
//             No courses found.{" "}
//             <Link to={"/ourcoursedetails"}>
//               <NoCourseFoundButton>Explore our courses</NoCourseFoundButton>
//             </Link>
//           </div>
//         )}
//       </CardGrid>

//       {/* Show "View All" if more than 4 courses */}
//       {courses.length > 4 && (
//         <div style={{ textAlign: "center", marginTop: "1rem" }}>
//           <ViewAllButton onClick={() => setShowAll(!showAll)}>
//             {showAll ? "Show Less" : "View All"}
//           </ViewAllButton>
//         </div>
//       )}
//     </CourseWrapper>
//   );
// };

// export default Courses;

// Courses.jsx
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
  Details,
  DetailItemok,
  PriceActions,
  ViewButton,
  NoCourseFoundButton,
  BlinkingIcon,
  ViewAllButton
} from './Courses.styles';
import lawimg from "../../../../assets/lawentrance.png";
import { FcOk } from "react-icons/fc";
import { getAllEnrolledCourses } from '../../../../api/userDashboardAPI';
import { getCookiesData } from '../../../../utils/cookiesService';
import { Link, useNavigate } from 'react-router-dom';
import { startCourse } from '../../../../api/userProgressApi'; // ✅ make sure this exists (section 1)
import { getLiveMeetings } from '../../../../api/meetingApi';
import { getUserByUserId } from '../../../../api/authApi';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = getCookiesData();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [liveStatus, setLiveStatus] = useState({});
  const [showAll, setShowAll] = useState(false);

  // Track per-course submission (to disable just that button)
  const [submitting, setSubmitting] = useState({}); // { [courseId]: boolean }

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
    const ids = courses.map(c => c._id);
    pollLiveStatuses(ids);
    const interval = setInterval(() => pollLiveStatuses(ids), 30000);
    return () => clearInterval(interval);
  }, [courses]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const userDataRes = await getUserByUserId(userId);
        setUserData(userDataRes.user);
        const response = await getAllEnrolledCourses(userId);
        if (response && response.enrolledCourses) {
          setCourses(response.enrolledCourses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
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
      res.data.forEach(meeting => {
        meeting.course_Ref.forEach(id => {
          statusMap[id._id] = true;
        });
      });
      setLiveStatus(statusMap);
    } catch (err) {
      console.error("Error fetching live statuses", err);
    }
  };

  // ✅ Centralized click handler for Start/Continue
  const handleStartOrContinue = async (course) => {
    // KYC gate
    if ( userData?.kyc_status === "rejected") {
      navigate(`/user/kycStatus`);
      return;
    }

    // If already completed, just navigate (don't call startCourse)
    const isCompleted = course.course_status === "completed";
    if (isCompleted) {
      navigate(`/continueCourse/${course._id}`);
      return;
    }

    try {
      setSubmitting(prev => ({ ...prev, [course._id]: true }));

      // 🔔 Hit startCourse for BOTH Start and Continue
      await startCourse(userId, course._id);

      // Then head into the course
      navigate(`/continueCourse/${course._id}`);
    } catch (e) {
      console.error('Failed to start course', e);
      const msg = e?.response?.data?.message || 'Failed to start the course';
      setError(msg);
    } finally {
      setSubmitting(prev => ({ ...prev, [course._id]: false }));
    }
  };

  // if (loading) {
  //   return (
  //     <CourseWrapper>
  //       <Title>My Courses</Title>
  //       <div style={{ textAlign: 'center', padding: '2rem' }}>
  //         Loading your courses...
  //       </div>
  //     </CourseWrapper>
  //   );
  // }

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

  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <CourseWrapper>
      <Title>My Courses</Title>
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
                  <ProgressLabel>{course.completePercentage || 0}% Completed</ProgressLabel>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${course.completePercentage || 0}%` }} />
                  </ProgressBar>
                </ProgressContainer>

                {liveStatus[course._id] && (
                  <BlinkingIcon>🔴 Live Class Ongoing</BlinkingIcon>
                )}

                <CourseContent>
                  <CourseMain>
                    <CourseTitle>
                      {course.courseDisplayName || course.courseName || 'Course Title'}
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
                        <FcOk fontSize={30} /> You have successfully completed this course
                      </DetailItemok>
                    </Details>
                  )}
                </CourseContent>

                <PriceActions>
                  <ViewButton
                    completed={isCompleted}
                    disabled={isSubmitting}
                    onClick={() => handleStartOrContinue(course)}
                  >
                    {isSubmitting ? 'Please wait…' : getCtaText(course)}
                  </ViewButton>
                </PriceActions>
              </CourseCard>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            No courses found.{" "}
            <Link to={"/ourcoursedetails"}>
              <NoCourseFoundButton>Explore our courses</NoCourseFoundButton>
            </Link>
          </div>
        )}
      </CardGrid>

      {courses.length > 4 && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <ViewAllButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All"}
          </ViewAllButton>
        </div>
      )}
    </CourseWrapper>
  );
};

export default Courses;
