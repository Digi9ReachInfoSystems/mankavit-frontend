import React from 'react';
import {
  Container,
  Header,
  MainTitle,
  BackLink,
  BackIcon,
  CourseImage,
  VideoSection,
  SectionTabs,
  Tab,
  CourseList,
  CourseItem,
  CourseTitle,
  CourseDuration,
  CompletedButton,
  SuccessText,
  PlayIcon,
  NoteIcon,
  CertificateLink,
  HeaderSection,
  Rating,
  StarContainer,
  CourseDetails,
  PlayButton,
  CourseStats,
  StatLink,
  LiveClass,
  TVIcon,
  CourseSubject,
  Image,
  SubjectItem,
  SubjectName,
  Session,
  VideoIcon
} from './CompletedCourses.styles';
import courseImage from '../../../assets/courseDetails.png';
import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaPlay } from 'react-icons/fa';
import { MdLiveTv } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { MdCheckCircle } from "react-icons/md";
import { IoEye } from "react-icons/io5";

const CompletedCourses = () => {
  const courseModules = [
    {
      title: 'Introduction to CLAT English',
      duration: '07 min',
      type: 'video',
    },
    {
      title: 'Reading Comprehension Basics',
      duration: 'Notes',
      type: 'note',
    },
    {
      title: 'Vocabulary & Synonyms',
      duration: '20 min',
      type: 'video',
    },
    {
      title: 'CLAT English Practice Questions',
      duration: '120 minutes | 150 Questions | Marks: 150',
      type: 'video',
    },
  ];

  const rating = 4.3;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#fbc02d" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#fbc02d" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#ccc" />);
    }
    return stars;
  };

  return (
    <Container>
        <Header>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon><FaArrowLeft /></BackIcon>
        </BackLink>
        <MainTitle>
          CLAT
          <span>Preparation</span>
        </MainTitle>
      </Header>

      <CourseImage src={courseImage} alt="Course Image" />

      <HeaderSection>
      <Rating>
        {rating}
        <StarContainer>{renderStars(rating)}</StarContainer>
      </Rating>

      <CourseDetails>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PlayButton>
            <span><FaPlay /></span>
          </PlayButton>

          <div>
            <CourseSubject>CLAT Coaching</CourseSubject>
                    <CourseStats>
              <StatLink>17 Videos</StatLink> | <StatLink>21 Subjects</StatLink> | <StatLink>13 Notes</StatLink>
            </CourseStats>
          </div>
        </div>

        <LiveClass>
             Live Class   <TVIcon> <MdLiveTv /></TVIcon>
        </LiveClass>
      </CourseDetails>
    </HeaderSection>

      <VideoSection>
        <SectionTabs>
          <Tab active>All</Tab>
          <Tab>Subjects</Tab>
          <Tab>Mock Tests</Tab>
          <Tab>Recorded Classes</Tab>
        </SectionTabs>



        <CourseList>
            <SubjectItem>
            <SubjectName>English Language</SubjectName>
            <Session> 6 Sessions </Session>
            </SubjectItem>
          {courseModules.map((module, index) => (
            <CourseItem key={index}>
                <div className='courseDetails'>
                <Image src={courseImage} alt="Course Image" />
              <div>
                <CourseTitle>{module.title}</CourseTitle>
                <CourseDuration>{module.duration}</CourseDuration>
              </div>
              </div>
              {module.type === 'video' ? (<>
              <VideoIcon><FaPlay className='videoIcon' /></VideoIcon></>) : <CgNotes className='noteIcon' />}
            </CourseItem>
          ))}
        </CourseList>

        <CompletedButton>Completed</CompletedButton>
        <div className='success'>
        <SuccessText><MdCheckCircle /> You have successfully Completed this course</SuccessText>
        <CertificateLink><IoEye /> See your Certificate</CertificateLink>
        </div>
      </VideoSection>
    </Container>
  );
};

export default CompletedCourses;
