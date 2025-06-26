import React, { useState, useEffect } from 'react';
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
    CourseContent,
    CourseMain,
    CourseTitle,
    CourseMinititle,
    CourseDesc,
    Details,
    DetailItem,
    DetailItemok,
    PriceActions,
    ViewButton,
} from './UserCourses.styles';
import { useNavigate } from 'react-router-dom';
import lawimg from "../../../../assets/lawentrance.png";
import { FaStar } from "react-icons/fa";
import { FcOk, FcCalendar } from "react-icons/fc";
import {
    getAllEnrolledCourses,
    getAllOngoingCourses,
    getAllCompletedCourses
} from '../../../../api/userDashboardAPI';
import { getCookiesData } from '../../../../utils/cookiesService';

const UserCourses = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Get userId from cookies
    const { userId } = getCookiesData();

    // Fetch courses based on activeTab
    useEffect(() => {
        const fetchCourses = async () => {
            if (!userId) {
                setError("User not logged in.");
                setCourses([]);
                return;
            }
            setLoading(true);
            setError("");
            try {
                let response = {};
                if (activeTab === "All") {
                    response = await getAllEnrolledCourses(userId);
                    console.log("Enrolle course", response);
                } else if (activeTab === "Ongoing") {
                    response = await getAllOngoingCourses(userId);
                    console.log("Ongoing course", response);
                } else if (activeTab === "Completed") {
                    response = await getAllCompletedCourses(userId);
                    console.log("Completed course", response);
                }
                // Now, set courses from response.enrolledCourses
                setCourses(Array.isArray(response.enrolledCourses) ? response.enrolledCourses : []);
            } catch (err) {
                setError("Failed to fetch courses. Please try again.");
                setCourses([]);
            }
            setLoading(false);
        };

        fetchCourses();
    }, [activeTab, userId]);

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

            {loading && <div style={{ padding: "2rem", textAlign: "center" }}>Loading courses...</div>}
            {error && <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>{error}</div>}

            {!loading && !error && (
                <CardGrid>
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <CourseCard key={index} completed={course.course_status === "completed"}>
                                <ImageWrapper>
                                    <img src={course.image} alt="Course Banner" />
                                </ImageWrapper>
                                <ProgressContainer>
                                    <ProgressLabel>{course.completePercentage || 0}% Completed</ProgressLabel>
                                    <ProgressBar>
                                        <ProgressFill style={{ width: `${course.completePercentage || 0}%` }} />
                                    </ProgressBar>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                        <ProgressLabel style={{ color: "#22c55e" }}></ProgressLabel>
                                        <div className='stars' style={{ color: '#facc15' }}>
                                            {renderStars(course.course_rating)}
                                        </div>
                                    </div>
                                </ProgressContainer>




                                <CourseContent>
                                    <CourseMain>
                                        <CourseTitle>{course.courseDisplayName || course.courseName || 'Course Title'}</CourseTitle>
                                        <CourseMinititle>{course.shortDescription || 'Course Description'}</CourseMinititle>
                                        <CourseDesc>{course.description || 'Course description not available'}</CourseDesc>
                                    </CourseMain>

                                    {course.course_status !== "completed" ? (
                                        <Details>
                                            <DetailItem><FcCalendar /> Duration: {course.duration || 'N/A'} months</DetailItem>
                                            <DetailItem>🏆 Success Rate: {course.successRate || 'N/A'}%</DetailItem>
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
                                        onClick={() => {
                                            if (course.kycStatus) {
                                                navigate(`/continueCourse/${course._id}`)
                                            } else {
                                                if (course.userKycStatus == "not-applied" || course.userKycStatus == "rejected") {
                                                    navigate(`/kyc`)
                                                } else {
                                                    navigate(`/continueCourse/${course._id}`)
                                                }
                                            }
                                        }}
                                    >
                                        {
                                            course.kycStatus ? (course.course_status === "completed" ? 'Completed' : 'Continue Learning') : course.userKycStatus == "not-applied" || course.userKycStatus == "rejected" ? "Complete KYC to continue" : "Continue Learning"
                                        }
                                    </ViewButton>

                                </PriceActions>
                            </CourseCard>
                        ))
                    ) : (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '2rem',
                            fontSize: '1.2rem',
                            color: '#666'
                        }}>
                            No courses found. Enroll in a course to get started.
                        </div>
                    )}
                </CardGrid>
            )}
        </CourseWrapper>
    );
};

export default UserCourses;
