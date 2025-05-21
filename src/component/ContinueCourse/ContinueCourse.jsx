import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getCourseById } from "../../api/courseApi";
import { MdLiveTv } from "react-icons/md";
import {
    FaArrowLeft,
    FaPlay,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaRegStickyNote,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import courseImgFallback from "../../assets/courseDetails.png"; // fallback image if needed

// Accordion Component
const AccordionList = ({ data, activeIndex, onClick }) => (
    <VideoList>
        {data && data.length === 0 && <p style={{padding: 24}}>No items found.</p>}
        {data && data.map((item, idx) => (
            <div key={idx}>
                <VideoItem
                    style={{ background: "#f5f6fa", boxShadow: activeIndex === idx ? "0 2px 8px #eee" : "none" }}
                    onClick={() => onClick(idx === activeIndex ? null : idx)}
                >
                    <div className="video-info">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ fontWeight: 600 }}>{item.name}</p>
                        </div>
                    </div>
                    <Playbutton>
                        {activeIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                    </Playbutton>
                </VideoItem>
                {/* Dropdown content */}
                {activeIndex === idx && (
                    <div style={{ paddingLeft: 24, background: "#fff", borderRadius: 8, marginTop: 4 }}>
                        {item.lectures && item.lectures.length > 0 ? (
                            item.lectures.map((lecture, i) => (
                                <VideoItem
                                    key={i}
                                    style={{
                                        boxShadow: "none",
                                        background: "none",
                                        cursor: "default",
                                        marginBottom: 4
                                    }}
                                >
                                    <div className="video-info">
                                        {lecture.type === "Video" && (
                                            <FaPlay style={{ marginRight: 12, color: "#007bff" }} />
                                        )}
                                        {lecture.type === "Notes" && (
                                            <FaRegStickyNote style={{ marginRight: 12, color: "#ffa726" }} />
                                        )}
                                        {lecture.type === "PDF" && (
                                            <FaRegStickyNote style={{ marginRight: 12, color: "#43a047" }} />
                                        )}
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontSize: 16 }}>{lecture.title}</p>
                                            <span>{lecture.duration}</span>
                                        </div>
                                    </div>
                                </VideoItem>
                            ))
                        ) : (
                            <div style={{ padding: "16px 8px", color: "#888" }}>No lectures found.</div>
                        )}
                    </div>
                )}
            </div>
        ))}
    </VideoList>
);

const ContinueCourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState('Subjects');
    const [activeAccordion, setActiveAccordion] = useState(null);

    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourseById(id);
                if (response && response.success) {
                    setCourse(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCourses();
    }, [id]);

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

    // --- Prepare Accordion Data from API Response ---
    // For demo, fallback to empty arrays if data not loaded yet
    const getAccordionData = () => {
        if (!course) return { Subjects: [], "Mock Test": [], "Recorded Class": [] };

        // Subjects Tab
        const subjects = (course.subjects || []).map(subject => ({
            name: subject.subjectName || subject.name || "Subject",
            lectures: (subject.lectures || []).map(lec => ({
                type: lec.type || "Video", // or "Notes", etc.
                title: lec.title || "Untitled",
                duration: lec.duration || (lec.type === "Notes" ? "PDF" : "00:00")
            }))
        }));

        // Mock Test Tab
        const mockTests = (course.mockTests || []).map((test, idx) => ({
            name: test.title || `Mock Test ${idx + 1}`,
            lectures: [{
                type: "PDF",
                title: test.title || `Mock Test ${idx + 1}`,
                duration: `${test.totalQuestions || "N/A"} Qs | ${test.duration || "N/A"}`
            }]
        }));

        // Recorded Class Tab
        const recordedClasses = (course.recordedClasses || []).map((batch, idx) => ({
            name: batch.title || `Recorded Batch ${idx + 1}`,
            lectures: (batch.videos || []).map(video => ({
                type: "Video",
                title: video.title || "Untitled",
                duration: video.duration || "00:00"
            }))
        }));

        // If your backend has "recorded_class: true" and stores classes in subjects or other arrays,
        // You can map accordingly.

        return {
            Subjects: subjects,
            "Mock Test": mockTests,
            "Recorded Class": recordedClasses,
        };
    };

    // Prepare course includes/features (if any)
    const featuresArray = course?.course_includes?.length
        ? [course.course_includes]
        : [
            ["Comprehensive Curriculum", "Expert Faculty", "Live & Recorded Session"],
            ["Regular Mock Tests", "Personalized Guidance", "Daily Updates"]
        ];

    return (
        <PageWrapper>
            <Header>
                <BackLink onClick={() => navigate(-1)}>
                    <BackIcon><FaArrowLeft /></BackIcon>
                </BackLink>
                <MainTitle>
                    {(course && course.courseDisplayName) || "Course Name"}
                    <span> {(course && course.courseName) || ""}</span>
                </MainTitle>
            </Header>

            <CourseImage src={(course && course.image) || courseImgFallback} alt="Course" />

            <CourseInfo>
                <HeaderSection>
                    <Rating>
                        {course?.course_rating || 0}
                        <StarContainer>{renderStars(course?.course_rating || 0)}</StarContainer>
                    </Rating>
                    <CourseDetails>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <PlayButton>
                                <span><FaPlay /></span>
                            </PlayButton>
                            <div>
                                <CourseSubject>{(course && course.courseDisplayName) || "Course Title"}</CourseSubject>
                                <CourseStats>
                                    <StatLink>{course?.no_of_videos || 0} Videos</StatLink> | <StatLink>{course?.no_of_subjects || 0} Subjects</StatLink> | <StatLink>{course?.no_of_notes || 0} Notes</StatLink>
                                </CourseStats>
                            </div>
                        </div>
                        <Statdesc>
                            📅 Duration: {course?.duration || "N/A"}  🏆 Success Rate: {course?.successRate ? `${course.successRate}%` : "N/A"}
                        </Statdesc>
                    </CourseDetails>
                </HeaderSection>

                <FeaturesContainer>
                    {featuresArray.map((column, colIndex) => (
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
                    onClick={() => { setActiveTab('Subjects'); setActiveAccordion(null); }}
                >
                    Subjects
                </button>
                <button
                    className={activeTab === 'Mock Test' ? 'active' : ''}
                    onClick={() => { setActiveTab('Mock Test'); setActiveAccordion(null); }}
                >
                    Mock Test
                </button>
                <button
                    className={activeTab === 'Recorded Class' ? 'active' : ''}
                    onClick={() => { setActiveTab('Recorded Class'); setActiveAccordion(null); }}
                >
                    Recorded Class
                </button>
            </TabSection>

            {/* Accordion content per tab */}
            <AccordionList
                data={getAccordionData()[activeTab]}
                activeIndex={activeAccordion}
                onClick={setActiveAccordion}
            />
        </PageWrapper>
    );
};

export default ContinueCourse;
