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
import { Link } from 'react-router-dom';

const IndividualCourses = () => {
  return (
    <Container>
        <Header>
      <BackLink><BackIcon><FaArrowLeft /></BackIcon></BackLink>
      <MainTitle>CLAT <span>Preparation</span></MainTitle>
      </Header>

      <CourseImage src={courseImage} alt="Law Entrance Exams" />

      <TitleRatingRow>
        <Title>CLAT Preparation</Title>
        <Rating>
          4.3 <FaStar color="#f8b400" />
        </Rating>
      </TitleRatingRow>

      <BulletList>
        <ListBull>Course Duration: 4 Months</ListBull>
        <ListBull>
          Mode Of Learning: <Highlight>Live Classes + Recorded Sessions</Highlight>
        </ListBull>
      </BulletList>

      <CourseIncludes> Course Includes: </CourseIncludes>
        <Description>
          <ListBull>ListBullve OnListBullne Classes: 3 Sessions Per Week With Expert Faculty.</ListBull>
          <ListBull>Study Materials: Books, Notes, Mock Tests, And Previous Year Papers.</ListBull>
          <ListBull>Practice: Weekly Quizzes And Practice Tests.</ListBull>
          <ListBull>Doubt Solving Sessions: Weekly Live Q&A Sessions With Faculty.</ListBull>
          <ListBull>Personalized Guidance: One-On-One Mentoring For Personalized Support.</ListBull>
        </Description>

        <CourseButton>


      <EnrollButton>Enroll Now ₹599/-</EnrollButton>

      <FeaturesRow>
        <Feature><RiLock2Fill  className="lock-icon"/></Feature>
        <FeatureItem><Link to= "#" className='link'><FaVideo /><IconText>17 Videos</IconText></Link></FeatureItem> |
        <FeatureItem><Link to= "#" className='link'><FaBook /><IconText>21 Subjects</IconText></Link></FeatureItem>  |
        <FeatureItem><Link to= "#" className='link'><FaFileAlt /><IconText>13 Notes</IconText></Link></FeatureItem>
      </FeaturesRow>
      </CourseButton>
    </Container>
  );
};

export default IndividualCourses;
