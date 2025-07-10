import React from 'react';
import {
  Container,
  BackLink,
  CourseImage,
  TitleRatingRow,
  Title,
  Rating,
  Description,
  EnrollButton,
  FeaturesRow,
  FeatureItem,
  CourseButton,
  Feature,
  Statdesc,
  CourseStats,
  StatLink,
  StarContainer,
  PlayButton,
  HeaderSection,
  CourseInfo,
  CourseDetails,
  CourseSubject,
  liveClass,
  FeaturesContainer,
  FeatureColumn,
  Bullet
} from './IndivitualCourse.styles';
import courseImage from '../../../assets/courseDetails.png';
import { FaStar, FaVideo, FaBook, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import { RiLock2Fill } from "react-icons/ri";
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCourseById } from '../../../api/courseApi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PaymentComponent from '../../../module/admin/component/PaymentComponent/PaymentComponent';
import { getCookiesData } from '../../../utils/cookiesService';
import { getUserByUserId } from '../../../api/authApi';
import { FaRegStar, FaPlay } from 'react-icons/fa';
const IndividualCourses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const apiCaller = async () => {
      const cookieData = getCookiesData();
      if (cookieData && cookieData.userId) {
        const user = await getUserByUserId(cookieData.userId);
        console.log("user", user);
        if (user) {
          setUserData(user.user);
          setUserLoggedIn(true);
          setIsEnrolled(location.state.isEnrolled);

        }
      }
    };
    apiCaller();
  }, []);
  const featuresArray = course?.course_includes?.length
    ? [course.course_includes]
    : [
      ["Comprehensive Curriculum", "Expert Faculty", "Live & Recorded Session"],
      ["Regular Mock Tests", "Personalized Guidance", "Daily Updates"]
    ];
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={`full-${i}`} color="#fbc02d" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" color="#fbc02d" />);
    for (let i = 0; i < emptyStars; i++)
      stars.push(<FaRegStar key={`empty-${i}`} color="#ccc" />);
    return stars;
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(id);
        setCourse(response.data);
      } catch (error) {
        setError(error.message);
        toast.error('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return <Container>Loading course details...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  if (!course) {
    return <Container>Course not found</Container>;
  }

  return (
    <Container>

      <CourseImage src={course?.image || courseImgFallback} alt="Course" />

      <CourseInfo>
        <HeaderSection>
          <Rating>
            {course?.course_rating || 0}
            <StarContainer>{renderStars(course?.course_rating || 0)}</StarContainer>
          </Rating>
          <CourseDetails>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <PlayButton>
                {isEnrolled ? <FaPlay /> : <RiLock2Fill />}
              </PlayButton>
              <div>
                <CourseSubject style={{ cursor: "pointer" }}>
                  {course?.courseDisplayName || "Course Title"}
                </CourseSubject>
                <CourseStats>
                  <StatLink>{course?.no_of_videos || 0} Videos</StatLink> |
                  <StatLink>{course?.no_of_subjects || 0} Subjects</StatLink> |
                  <StatLink>{course?.no_of_notes || 0} Notes</StatLink>
                </CourseStats>
              </div>
            </div>

            <Statdesc>
              📅 Duration: {course?.duration || "N/A"} | 🏆 Success Rate:{" "}
              {course?.successRate ? `${course.successRate}%` : "N/A"}

            </Statdesc>
            {/* <Statdesc>
              📝 Description: {course?.description || "N/A"
              }{" "}
            </Statdesc> */}



            <FeaturesContainer>
              {featuresArray.map((column, colIndex) => (
                <FeatureColumn key={colIndex}>
                  {column.map((feature, i) => (
                    <FeatureItem key={i}>
                      <Bullet>•</Bullet>
                      <span>{feature}</span>
                    </FeatureItem>
                  ))}
                </FeatureColumn>
              ))}
            </FeaturesContainer>

            <Statdesc
              style={{ color: "#000", fontWeight: "400", fontSize: "20px" }}
              dangerouslySetInnerHTML={{ __html: course?.description || "N/A" }} />
          </CourseDetails>
        </HeaderSection>


      </CourseInfo>


      <CourseButton>
        {userLoggedIn ?
          <>
            {
              isEnrolled ?
                (<EnrollButton
                  onClick={() => { navigate(`/continueCourse/${course._id}`) }}>
                  Continue Learning
                  {/* ₹{course.discountActive ? course.discountPrice : course.price}/- */}
                  {/* {course.discountActive && (
                    <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: '#999' }}>
                      ₹{course.price}
                    </span>
                  )} */}
                </EnrollButton>) :
                (<PaymentComponent userId={userData?._id} amount={course.discountActive ? course.discountPrice : course.price} discountActive={course.discountActive} actualPrice={course.price} discountPrice={course.discountPrice} courseRef={course?._id} />)
            }
          </>
          :
          (<EnrollButton
            onClick={() => { navigate(`/login`) }}>
            Enroll Now ₹{course.discountActive ? course.discountPrice : course.price}/-
            {course.discountActive && (
              <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: '#999' }}>
                ₹{course.price}
              </span>
            )}
          </EnrollButton>)
        }

      </CourseButton>
    </Container>
  );
};

export default IndividualCourses;