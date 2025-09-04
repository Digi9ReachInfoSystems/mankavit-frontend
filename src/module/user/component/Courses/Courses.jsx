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
    // ProgressBarContainer,
    ProgressFill,
    CourseContent,
    CourseMain,
    // CourseHead,
    CourseTitle,
    CourseMinititle,
    CourseDesc,
    Details,
    DetailItem,
    DetailItemok,
    PriceActions,
    ViewButton,
    NoCourseFoundButton
} from './Courses.styles';
import lawimg from "../../../../assets/lawentrance.png";
import { FcCalendar } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import {
    getAllEnrolledCourses,
} from '../../../../api/userDashboardAPI';
import { getCookiesData } from '../../../../utils/cookiesService';
import { Link, useNavigate } from 'react-router-dom';
import { startCourse } from '../../../../api/userProgressApi';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = getCookiesData();
    const navigate = useNavigate();
    const getCtaText = (course) => {
        const completed = course.course_status === "completed";
        const pct = Number(course.completePercentage || 0);
        const isZero = pct === 0;

        if (completed) return "Completed";
        // If KYC required and user hasn't applied / was rejected, keep your original message
        if (
            !course.kycStatus &&
            (course.userKycStatus === "not-applied" ||
                course.userKycStatus === "rejected")
        ) {
            return "Complete KYC to continue";
        }
        // Otherwise decide based on progress
        return isZero ? "Start Learning" : "Continue Learning";
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await getAllEnrolledCourses(userId);
                console.log("response", response);
                // Corrected data extraction based on your API response
                if (response && response.enrolledCourses) {
                    setCourses(response.enrolledCourses);
                }
                else {
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

    return (
        <CourseWrapper>
            <Title>My Courses </Title>

            <CardGrid>
                {courses.length > 0 ? (
                    courses.map((course, index) => (
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
                                    <ProgressLabel style={{ color: "#22c55e" }}></ProgressLabel>
                                    {/* <div className='stars' style={{ color: '#facc15' }}>
                                        {renderStars(course.course_rating)}
                                    </div> */}
                                </div>
                            </ProgressContainer>


                            <CourseContent>
                                <CourseMain>
                                    {/* <CourseHead> */}
                                    <CourseTitle>{course.courseDisplayName || course.courseName || 'Course Title'}</CourseTitle>
                                    {/* <CourseMinititle>{course.shortDescription || 'Course Description'}</CourseMinititle> */}
                                    {/* </CourseHead> */}
                                    {/* <CourseMinititle dangerouslySetInnerHTML={{ __html: course.shortDescription.slice(0, 60) + "..." || 'Course Description' }} /> */}
                                    {/* <CourseDesc>{course.description || 'Course description not available'}</CourseDesc> */}
                                    {/* <CourseDesc dangerouslySetInnerHTML={{ __html: course.description.slice(0, 60) + "..." || 'Course description not available' }} /> */}
                                </CourseMain>

                                {course.course_status !== "completed" ? (
                                    <Details>
                                        {/* <DetailItem><FcCalendar /> Duration: {course.duration || 'N/A'} months</DetailItem> */}
                                        {/* <DetailItem>🏆 Success Rate: {course.successRate || 'N/A'}%</DetailItem> */}
                                        <DetailItemok style={{ color: "#206666ff" }}>Finish 100% to unlock the certificate</DetailItemok>

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
                                            console.log("KYC already done", course);
                                            const response = await startCourse(userId, course._id);
                                            console.log("start course response", response);
                                            if (response) {
                                                // Successfully started the course, navigate to course content
                                                navigate(`/continueCourse/${course._id}`);
                                            } else {

                                            }
                                            // navigate(`/continueCourse/${course._id}`);
                                        } else {
                                            if (
                                                course.userKycStatus == "not-applied" ||
                                                course.userKycStatus == "rejected"
                                            ) {
                                                navigate(`/kyc`);
                                            } else {

                                                const response = await startCourse(userId, course._id);
                                                console.log("start course response", response);
                                                if (response.success) {
                                                    // Successfully started the course, navigate to course content
                                                    // navigate(`/continueCourse/${course._id}`);
                                                } else {

                                                }
                                                //   navigate(`/continueCourse/${course._id}`);
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
                    <div style={{
                        // gridColumn: '1 / -1',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '2rem',
                        fontSize: '1.2rem',
                        color: '#666'

                    }}>
                        <div>
                            No courses found.
                            <Link to={"/ourcoursedetails"}>  <NoCourseFoundButton >
                                Explore our courses
                            </NoCourseFoundButton></Link>
                        </div>
                    </div>
                )}
            </CardGrid>
        </CourseWrapper>
    );
};

export default Courses;