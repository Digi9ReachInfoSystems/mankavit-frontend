import React, { useState } from 'react';
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
    ProgressBarContainer,
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
} from './UserCourses.styles';

import lawimg from "../../../../assets/lawentrance.png";
import { FaStar } from "react-icons/fa";
import { FcOk, FcCalendar } from "react-icons/fc";

const UserCourses = () => {
    const [activeTab, setActiveTab] = useState("All");

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
            progress: 29,
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
            rating: 5,
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
            progress: 48,
            completed: false,
        },
        {
            title: "CLAT",
            subtitle: "Preparation",
            description: "Comprehensive coaching to crack CLAT and enter top law schools.",
            duration: "6-12 Months",
            successRate: "90%+",
            progress: 12,
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
            rating: 3,
        },
        {
            title: "CLAT",
            subtitle: "Preparation",
            description: "Comprehensive coaching to crack CLAT and enter top law schools.",
            duration: "6-12 Months",
            successRate: "90%+",
            progress: 100,
            completed: true,
            rating: 1,
        },
    ];

    const filteredCourses = courses.filter(course => {
        if (activeTab === "Ongoing") return !course.completed;
        if (activeTab === "Completed") return course.completed;
        return true; 
    });

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
            <Title>My Courses</Title>

            <FilterBar>
                <FilterButton active={activeTab === "All"} onClick={() => setActiveTab("All")}>All</FilterButton>
                <FilterButton active={activeTab === "Ongoing"} onClick={() => setActiveTab("Ongoing")}>Ongoing</FilterButton>
                <FilterButton active={activeTab === "Completed"} onClick={() => setActiveTab("Completed")}>Completed</FilterButton>
            </FilterBar>

            <CardGrid>
                {filteredCourses.map((course, index) => (
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
                                    <div className='stars'>
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

export default UserCourses;
