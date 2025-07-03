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
  IconText,
  Highlight,
  BulletList,
  BackIcon,
  MainTitle,
  Header,
  ListBull,
  CourseIncludes,
  CourseButton,
  Feature
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
      <Header>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon><FaArrowLeft /></BackIcon>
        </BackLink>
        <MainTitle>
          {course.courseDisplayName}
          <span> {course.courseName}</span>
        </MainTitle>
      </Header>

      <CourseImage src={course.image || courseImage} alt={course.courseDisplayName} />

      <TitleRatingRow>
        <Title>{course.courseDisplayName}</Title>
        <Rating>
          {course.rating} <FaStar color="#f8b400" />
        </Rating>
      </TitleRatingRow>

      <BulletList>
        <ListBull>Course Duration: {course.duration}</ListBull>
        <ListBull>
          Mode Of Learning: <Highlight>
            {course.live_class ? 'Live Classes' : ''}
            {course.live_class && course.recorded_class ? ' + ' : ''}
            {course.recorded_class ? 'Recorded Sessions' : ''}
          </Highlight>
        </ListBull>
        {course.successRate && (
          <ListBull>Success Rate: {course.successRate}%</ListBull>
        )}
      </BulletList>

      <CourseIncludes>Course Includes:</CourseIncludes>
      <Description>
        {course.course_includes?.length > 0 ? (
          course.course_includes.map((item, i) => (
            <ListBull key={i}>{item}</ListBull>
          ))
        ) : (
          <>
            {/* <ListBull>{course.shortDescription}</ListBull> */}
            <ListBull dangerouslySetInnerHTML={{ __html: course.shortDescription }} />
            {/* <ListBull >{course.description}</ListBull> */}
            <ListBull dangerouslySetInnerHTML={{ __html: course.description }} />
          </>
        )}
      </Description>

      <CourseButton>
        {userLoggedIn ?
          <>
            {
              isEnrolled ?
                (<EnrollButton
                  onClick={() => { navigate(`/user`) }}>
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
        <FeaturesRow>
          <Feature><RiLock2Fill className="lock-icon" /></Feature>
          <FeatureItem>

            <FaVideo />
            <IconText>{course.no_of_videos} Videos</IconText>

          </FeatureItem> |
          <FeatureItem>

            <FaBook />
            <IconText>{course.no_of_subjects} Subjects</IconText>

          </FeatureItem> |
          <FeatureItem>

            <FaFileAlt />
            <IconText>{course.no_of_notes} Notes</IconText>

          </FeatureItem>
        </FeaturesRow>
      </CourseButton>
    </Container>
  );
};

export default IndividualCourses;