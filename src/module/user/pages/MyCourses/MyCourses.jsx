import React from 'react';
import {
    MainContainer,
    CourseWrapper,
    Title,
    FilterBar,
    FilterButton,
    CardGrid,
    CourseCard,
    ImageWrapper,
    ProgressContainer, ProgressLabel, ProgressBar, ProgressFill,
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
    SectionTitle,
    ListSection,
    ListCard,
    ListTime,
    Testdate,
    Testmonth,
    Testtime,
    ListContent,
    Testtitle,
    Testsubtitle,
    Testpara,
    Testattempt,
    Testdetails,
    // Testduration,
    // Testquestions,
    // Testmarks,
    ClassCard,
    Classtime,
    LiveBadge,
    ViewAllLink
} from './MyCourses.styles';
import lawimg from "../../../../assets/lawentrance.png";
import { FaStar } from "react-icons/fa";
import { FcOk, FcCalendar, FcClock } from "react-icons/fc";

const MyCourses = () => {

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

    const upcomingTests = [
        { date: "13", month: "March", time: "11:00 AM", title: "Mankavit Mock Test — ", subtitle: "CLAT 2025", type: "Practice Test", attempt: "Attempted - 1", duration: "120 minutes", questions: "50", marks: "100" },
        { date: "13", month: "March", time: "11:00 AM", title: "Mankavit Mock Test — ", subtitle: "CLAT 2025", type: "Practice Test", attempt: "Attempted - 1", duration: "120 minutes", questions: "50", marks: "100" },
    ];

    const liveClasses = [
        { date: "13", month: "March", time: "11:00 AM", title: "Dummy Live —", subtitle: "CLAT 2025 Practice", type: "Dummy Topic", live: true, attempt: "Ongoing",  duration: "120 minutes" },
        { date: "13", month: "March", time: "11:00 AM", title: "Dummy Live —", subtitle: "CLAT 2025 Practice", type: "Dummy Topic", live: false, attempt: "28:00 min remaining", duration: "120 minutes" },
    ];

    return (
        <MainContainer>
            <CourseWrapper>
                <Title>
                    My Courses
                </Title>

                <FilterBar>
                    <FilterButton active>All</FilterButton>
                    <FilterButton>Popular</FilterButton>
                    <FilterButton>Most Liked</FilterButton>
                </FilterBar>

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
                                <ProgressContainer>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                        <ProgressLabel>Reviewed</ProgressLabel>
                                        <div style={{ display: 'flex' }}>
                                            {renderStars(course.rating)}
                                        </div>
                                    </div>
                                </ProgressContainer>
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


            {/* Upcoming Tests */}
            <ListSection>
                <SectionTitle>Upcoming Test <ViewAllLink>View all</ViewAllLink></SectionTitle>
                {upcomingTests.map((test, index) => (
                    <ListCard key={index}>
                        <ListTime>
                            <Testdate>{test.date}</Testdate>
                            <Testmonth>{test.month}</Testmonth>
                            <Testtime>{test.time}</Testtime>
                        </ListTime>
                        <ListContent>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Testtitle>{test.title}</Testtitle>
                                <Testsubtitle>{test.subtitle}</Testsubtitle>
                            </div>
                            <Testpara>{test.type}</Testpara>
                            <Testattempt>{test.attempt}</Testattempt>
                            <Testdetails>
                                    <p className='testDetails'>🕒 Duration: {test.duration} </p> <div className='endLine'></div>

                                    <p className='testDetails'>📋 Total Questions:{test.questions}</p> <div className='endLine'></div>

                                    <p className='testDetails'>🎯 Total Marks: {test.marks}</p> 
                            </Testdetails>

                        </ListContent>
                    </ListCard>
                ))}
            </ListSection>

            {/* Upcoming Live Classes */}
            <ListSection>
                <SectionTitle>Upcoming Live Classes <ViewAllLink>View all</ViewAllLink></SectionTitle>
                {liveClasses.map((cls, index) => (
                    <ListCard key={index} live>
                        <ClassCard>
                            <Testdate>{cls.date}</Testdate>
                            <Testmonth>{cls.month}</Testmonth>
                            <Classtime>
                                {cls.live ? (
                                    <LiveBadge>LIVE <div className='liveDot'></div></LiveBadge>
                                ) : (
                                    cls.time
                                )}
                            </Classtime>
                        </ClassCard>
                        <ListContent>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Testtitle>{cls.title}</Testtitle>
                                <Testsubtitle>{cls.subtitle}</Testsubtitle>
                            </div>
                            <Testpara>{cls.type}</Testpara>
                            <Testattempt>{cls.attempt}</Testattempt>
                            <Testdetails>

                            <p className='testDetails'>🕒 Duration: {cls.duration} </p> 

                            </Testdetails>
                        </ListContent>
                    </ListCard>
                ))}
            </ListSection>


        </MainContainer>
    );
};

export default MyCourses;
