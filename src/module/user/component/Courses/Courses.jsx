import React from 'react';
import {
    CourseWrapper,
    Title,
    CardGrid,
    CourseCard,
    ImageWrapper,
    ProgressContainer, 
    ProgressLabel, 
    ProgressBar, 
    ProgressBarContainer,
    ProgressFill,
    CourseContent,
    CourseMain,
    CourseHead,
    CourseTitle,
    CourseMinititle,
    CourseDesc,
    Details,
    DetailItem,
    DetailItemok,
    PriceActions,
    ViewButton,
} from './Courses.styles';
import lawimg from "../../../../assets/lawentrance.png";
import { FcCalendar } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { FcOk } from "react-icons/fc";

const Courses = () => {
   

    const courses = [
        {
          title: "CLAT",
          subtitle: "Preparation",
          description: "Comprehensive coaching to crack CLAT and enter top law schools.",
          duration: "6-12 Months",
          successRate: "90%+",
          progress: 63,
          completed: false,
        },
        {
          title: "CLAT",
          subtitle: "Preparation",
          description: "Comprehensive coaching to crack CLAT and enter top law schools.",
          duration: "6-12 Months",
          successRate: "90%+",
          progress: 63,
          completed: false,
        },
        {
          title: "CLAT",
          subtitle: "Preparation",
          description: "Comprehensive coaching to crack CLAT and enter top law schools.",
          duration: "6-12 Months",
          successRate: "90%+",
          progress: 100,
          completed: true,
          rating: 4.3,
        },
        {
            title: "CLAT",
            subtitle: "Preparation",
            description: "Comprehensive coaching to crack CLAT and enter top law schools.",
            duration: "6-12 Months",
            successRate: "90%+",
            progress: 63,
            completed: false,
          },
          {
            title: "CLAT",
            subtitle: "Preparation",
            description: "Comprehensive coaching to crack CLAT and enter top law schools.",
            duration: "6-12 Months",
            successRate: "90%+",
            progress: 63,
            completed: false,
          },
          {
            title: "CLAT",
            subtitle: "Preparation",
            description: "Comprehensive coaching to crack CLAT and enter top law schools.",
            duration: "6-12 Months",
            successRate: "90%+",
            progress: 100,
            completed: true,
            rating: 4.3,
          },
      ];



    const renderStars = (rating) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i <= Math.floor(rating) ? '#facc15' : '#e4e5e9'}
                    size={20}
                    style={{ marginRight: 4 }}
                />
            );
        }

        return stars;
    };

    return (
            <CourseWrapper>
                <Title>
                    My Courses
                </Title>

                <CardGrid>
                    {courses.map((course, index) => (
                        <CourseCard key={index} completed={course.completed}>
                            <ImageWrapper>
                                <img src={lawimg} alt="Law Banner" />
                            </ImageWrapper>

                            {!course.completed ? (
                                <ProgressContainer>
                                    <ProgressLabel>{course.progress}% Completed</ProgressLabel>
                                    <ProgressBar>
                                        <ProgressFill style={{ width: `${course.progress}%` }} />
                                    </ProgressBar>
                                </ProgressContainer>
                            ) : (
                                <ProgressBarContainer>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                        <ProgressLabel>Reviewed</ProgressLabel>
                                        <div style={{ display: 'flex' }}>
                                            {renderStars(course.rating)}
                                        </div>
                                    </div>
                                </ProgressBarContainer>
                            )}

                            <CourseContent>
                                <CourseMain>
                                    <CourseHead>
                                        <CourseTitle>{course.title}</CourseTitle>
                                        <CourseMinititle>{course.subtitle}</CourseMinititle>
                                    </CourseHead>
                                    <CourseDesc>{course.description}</CourseDesc>
                                </CourseMain>

                                {!course.completed ? (
                                    <Details>
                                        <DetailItem><FcCalendar /> Duration: {course.duration}</DetailItem>
                                        <DetailItem>🏆 Success Rate: {course.successRate}</DetailItem>
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
                                <ViewButton completed={course.completed}>
                                    {course.completed ? 'Completed' : 'Continue Learning'}
                                </ViewButton>
                            </PriceActions>
                        </CourseCard>
                    ))}
                </CardGrid>
            </CourseWrapper>
    );
};

export default Courses;
