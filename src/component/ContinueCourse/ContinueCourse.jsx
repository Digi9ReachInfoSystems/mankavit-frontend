import React, { useState } from "react";
import {
    PageWrapper,
    Header,
    BackLink,
    BackIcon,
    MainTitle,
    CourseImage,
    HeaderSection,
    Rating,
    CourseDetails,
    PlayButton,
    CourseSubject,
    CourseStats,
    LiveClass,
    TVIcon,
    StatLink,
    Statdesc,
    StarContainer,
    CourseInfo,
    FeaturesContainer,
    FeatureColumn,
    FeatureItem,
    TabSection,
    VideoList,
    VideoItem,
    Playbutton,
    Playing
} from "./ContinueCourse.styles";

import { useNavigate } from "react-router-dom";
import { MdLiveTv } from "react-icons/md";
import { FaArrowLeft, FaPlay, FaStar, FaStarHalfAlt, FaRegStar, FaRegStickyNote, FaGraduationCap } from 'react-icons/fa';
import courseImg from "../../assets/courseDetails.png";

const ContinueCourse = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Subjects');
    const rating = 4.3;
    const subjects = ['English', 'Logical Reasoning', 'Legal Aptitude'];
const [selectedSubject, setSelectedSubject] = useState(null);


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


    const course = [
        { courseDisplayName: "CLAT" },
        { courseName: "Preparation" },
    ]

    const features = [
        ["Comprehensive Curriculum", "Expert Faculty", "Live & Recorded Session"],
        ["Regular Mock Tests", "Personalized Guidance", "Daily Updates"],
    ];

    const videos = [
        {
            title: "Introduction to CLAT English",
            duration: "07 min",
            type: "Video",
            image: courseImg
        },
        {
            title: "Reading Comprehension Basics",
            duration: "Notes",
            type: "Notes",
            image: courseImg
        },

        ...Array(8).fill({ title: "Vocabulary & Synonyms", duration: "20 min", image: courseImg }),

        {
            title: "CLAT English Practice Questions",
            duration: "120 minutes | 150 Questions | Marks: 150",
            type: "Video",
            image: courseImg
        }
    ];

    return (
        <PageWrapper>
            <Header>
                <BackLink onClick={() => navigate(-1)}>
                    <BackIcon><FaArrowLeft /></BackIcon>
                </BackLink>
                <MainTitle>
                    {course.courseDisplayName}
                    <span> {course.courseName}</span>
                </MainTitle>
            </Header>

            <CourseImage src={courseImg} alt="Law Entrance Exams" />

            <CourseInfo>

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

                        <Statdesc>
                            📅 Duration: 6-12 Months  🏆 Success Rate: 90%+
                        </Statdesc>
                    </CourseDetails>
                </HeaderSection>

                <FeaturesContainer>
                    {features.map((column, colIndex) => (
                        <FeatureColumn key={colIndex}>
                            {column.map((feature, i) => (
                                <FeatureItem key={i}>{feature}</FeatureItem>
                            ))}
                        </FeatureColumn>
                    ))}
                </FeaturesContainer>
            </CourseInfo>

            <LiveClass>
                Live Class   <TVIcon> <MdLiveTv /></TVIcon>
            </LiveClass>
            <TabSection>
                <button
                    className={activeTab === 'Subjects' ? 'active' : ''}
                    onClick={() => setActiveTab('Subjects')}
                >
                    Subjects
                </button>
                <button
                    className={activeTab === ' Mock Test' ? 'active' : ''}
                    onClick={() => setActiveTab(' Mock Test')}
                >
                    Mock Test
                </button>
                <button
                    className={activeTab === 'Recorded Class' ? 'active' : ''}
                    onClick={() => setActiveTab('Recorded Class')}
                >
                    Recorded Class
                </button>

            </TabSection>

           {activeTab === 'Subjects' && (
  <>
    {!selectedSubject ? (
      <VideoList>
        {subjects.map((subject, index) => (
          <VideoItem key={index} onClick={() => setSelectedSubject(subject)}>
            <div className="video-info">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>{subject}</p>
              </div>
            </div>
          </VideoItem>
        ))}
      </VideoList>
    ) : (
      <>
        <BackLink onClick={() => setSelectedSubject(null)}>
          <BackIcon><FaArrowLeft /></BackIcon> Back
        </BackLink>
        <h3 style={{ margin: "16px 0" }}>{selectedSubject} - Videos</h3>
        <VideoList>
          {videos.map((video, index) => (
            <VideoItem key={index}>
              <div className="video-info">
                <img src={video.image} alt="" className="videoimage" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p>{video.title}</p>
                  <span>{video.duration}</span>
                </div>
              </div>
              <Playbutton>
                <Playing>
                  {video.type === 'Notes' ? <FaRegStickyNote /> : <FaPlay />}
                </Playing>
              </Playbutton>
            </VideoItem>
          ))}
        </VideoList>
      </>
    )}
  </>
)}

        </PageWrapper>
    );
};

export default ContinueCourse;
