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
    Playbutton
} from "./ContinueCourse.styles";
import courseImgFallback from "../../assets/courseDetails.png";
import { getCourseById } from "../../api/courseApi";
import {getCourseByIdWithUSerProgress} from "../../api/userProgressApi";
import { startCourse, startSubject, startLecturer } from "../../api/userProgressApi";
import { getCookiesData } from "../../utils/cookiesService";
import { FaArrowLeft, FaPlay, FaStar, FaStarHalfAlt, FaRegStar, FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import { MdLiveTv } from "react-icons/md";

const AccordionList = ({ 
    data, 
    activeIndex, 
    onClick, 
    navigate, 
    courseId, 
    handleStartSubject, 
    handleStartLecture, 
    completedLectures = [], 
    completedSubjects = [] 
}) => (
    <VideoList>
        {data && data.length === 0 && <p style={{ padding: 24 }}>No items found.</p>}
        {data && data.map((item, idx) => (
            <div key={idx}>
                <VideoItem
                    style={{ 
                        background: "#f5f6fa", 
                        boxShadow: activeIndex === idx ? "0 2px 8px #eee" : "none",
                        position: 'relative'
                    }}
                    onClick={async () => {
                        const newIndex = idx === activeIndex ? null : idx;
                        onClick(newIndex);
                        if (newIndex !== null) {
                            await handleStartSubject(item._id);
                        }
                    }}
                >
                    <div className="video-info">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ fontWeight: 600 }}>{item.name}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {completedSubjects.includes(item._id) && (
                            <FaCheckCircle style={{ color: 'green', marginRight: 10 }} />
                        )}
                        <Playbutton>
                            {activeIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                        </Playbutton>
                    </div>
                </VideoItem>
                {activeIndex === idx && (
                    <div style={{ paddingLeft: 24, background: "#fff", borderRadius: 8, marginTop: 4 }}>
                        {item.lectures && item.lectures.length > 0 ? (
                            item.lectures.map((lecture, i) => (
                                <VideoItem
                                    key={i}
                                    style={{
                                        boxShadow: "none",
                                        background: "none",
                                        cursor: "pointer",
                                        marginBottom: 4,
                                        padding: "12px 0",
                                        borderBottom: "1px solid #eee"
                                    }}
                                    onClick={async () => {
                                        await handleStartLecture(item._id, lecture._id);
                                        navigate(`/course/liveclass/${courseId}/${lecture._id}`);
                                    }}
                                >
                                    <div className="video-info" style={{ width: "100%" }}>
                                        <FaPlay style={{ marginRight: 12, color: "#007bff" }} />
                                        <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                            <p style={{ fontSize: 16, fontWeight: 500 }}>
                                                {lecture.lectureName}
                                                {completedLectures.includes(lecture._id) && (
                                                    <FaCheckCircle style={{ color: 'green', marginLeft: 6 }} />
                                                )}
                                            </p>
                                            <p style={{ fontSize: 14, color: "#666", margin: "4px 0" }}>{lecture.description}</p>
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                <span style={{ fontSize: 14, color: "#888" }}>{lecture.duration}</span>
                                                <div style={{ fontSize: 14, color: "#007bff", textDecoration: "none" }}>
                                                    Join Class
                                                </div>
                                            </div>
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
    const [showContent, setShowContent] = useState(false);
    const [userId, setUserId] = useState(null);
    const [completedLectures, setCompletedLectures] = useState([]);
    const [completedSubjects, setCompletedSubjects] = useState([]);
    const [progressData, setProgressData] = useState(null);

    useEffect(() => {
        const init = async () => {
            const cookies = await getCookiesData();
            setUserId(cookies.userId);

            // Fetch course with user progress
            try {
                const progressResponse = await getCourseByIdWithUSerProgress(cookies.userId, id);
                if (progressResponse?.success) {
                    setProgressData(progressResponse.data);
                    setCourse(progressResponse.data);
                    
                    // Extract completed lectures and subjects
                    const lectures = [];
                    const subjects = [];
                    
                    (progressResponse.data.subjects || []).forEach(subject => {
                        if (subject.completed) {
                            subjects.push(subject._id);
                        }
                        (subject.lectures || []).forEach(lecture => {
                            if (lecture.completed) {
                                lectures.push(lecture._id);
                            }
                        });
                    });
                    
                    setCompletedLectures(lectures);
                    setCompletedSubjects(subjects);
                }
            } catch (error) {
                console.error("Error fetching course with progress:", error);
                
                // Fallback to regular course fetch if progress fails
                const response = await getCourseById(id);
                if (response?.success) {
                    setCourse(response.data);
                }
            }
        };
        init();
    }, [id]);

    const handleStartCourse = async () => {
        if (!userId || !course?._id) return;
        try {
            await startCourse(userId, course._id);
            setShowContent(true);
        } catch (err) {
            console.error("Failed to start course:", err);
        }
    };

    const handleStartSubject = async (subjectId) => {
        if (!userId || !course?._id || !subjectId) return;
        try {
            await startSubject(userId, course._id, subjectId);
        } catch (err) {
            console.error("Failed to start subject:", err);
        }
    };

    const handleStartLecture = async (subjectId, lectureId) => {
        if (!userId || !course?._id || !subjectId || !lectureId) return;
        try {
            await startLecturer(userId, course._id, subjectId, lectureId);
        } catch (err) {
            console.error("Failed to start lecture:", err);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} color="#fbc02d" />);
        if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" color="#fbc02d" />);
        for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={`empty-${i}`} color="#ccc" />);
        return stars;
    };

    const getAccordionData = () => {
        if (!course) return { Subjects: [], "Mock Test": [], "Recorded Class": [] };

        const subjects = (course.subjects || []).map(subject => ({
            _id: subject._id,
            name: subject.subjectName || "Subject",
            lectures: (subject.lectures || []).map(lec => ({
                _id: lec._id,
                lectureName: lec.lectureName || "Untitled Lecture",
                description: lec.description || "No description available",
                duration: lec.duration || "Duration not specified",
                videoUrl: lec.videoUrl || "#"
            }))
        }));

        const mockTests = (course.mockTests || []).map((test, idx) => ({
            name: test.title || `Mock Test ${idx + 1}`,
            lectures: [{
                lectureName: test.title,
                description: test.description || "Mock test for practice",
                duration: `${test.totalQuestions || "N/A"} Qs | ${test.duration || "N/A"}`,
                videoUrl: "#"
            }]
        }));

        const recordedClasses = subjects; // same structure reused

        return {
            Subjects: subjects,
            "Mock Test": mockTests,
            "Recorded Class": recordedClasses,
        };
    };

    const calculateProgress = () => {
        if (!progressData || !progressData.subjects) return 0;
        
        let totalLectures = 0;
        let completed = 0;
        
        progressData.subjects.forEach(subject => {
            if (subject.lectures) {
                totalLectures += subject.lectures.length;
                subject.lectures.forEach(lecture => {
                    if (lecture.completed) completed++;
                });
            }
        });
        
        return totalLectures > 0 ? Math.round((completed / totalLectures) * 100) : 0;
    };

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
                    {course?.courseDisplayName || "Course Name"}
                    <span> {course?.courseName || ""}</span>
                </MainTitle>
            </Header>

            <CourseImage src={course?.image || courseImgFallback} alt="Course" />

            <CourseInfo>
                <HeaderSection>
                    <Rating>
                        {course?.course_rating || 0}
                        <StarContainer>{renderStars(course?.course_rating || 0)}</StarContainer>
                    </Rating>
                    <CourseDetails>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <PlayButton onClick={handleStartCourse}>
                                <span><FaPlay /></span>
                            </PlayButton>
                            <div>
                                <CourseSubject>{course?.courseDisplayName || "Course Title"}</CourseSubject>
                                <CourseStats>
                                    <StatLink>{course?.no_of_videos || 0} Videos</StatLink> | 
                                    <StatLink>{course?.no_of_subjects || 0} Subjects</StatLink> | 
                                    <StatLink>{course?.no_of_notes || 0} Notes</StatLink>
                                </CourseStats>
                            </div>
                        </div>
                        <Statdesc>
                            📅 Duration: {course?.duration || "N/A"} | 
                            🏆 Success Rate: {course?.successRate ? `${course.successRate}%` : "N/A"} | 
                            ✅ Progress: {calculateProgress()}%
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

            {course?.live_class && (
                <LiveClass>
                    Live Class <TVIcon><MdLiveTv /></TVIcon>
                </LiveClass>
            )}

            {showContent && (
                <>
                    <TabSection>
                        <button className={activeTab === 'Subjects' ? 'active' : ''} onClick={() => { setActiveTab('Subjects'); setActiveAccordion(null); }}>Subjects</button>
                        <button className={activeTab === 'Mock Test' ? 'active' : ''} onClick={() => { setActiveTab('Mock Test'); setActiveAccordion(null); }}>Mock Test</button>
                        {course?.recorded_class && (
                            <button className={activeTab === 'Recorded Class' ? 'active' : ''} onClick={() => { setActiveTab('Recorded Class'); setActiveAccordion(null); }}>Recorded Class</button>
                        )}
                    </TabSection>

                    <AccordionList
                        data={getAccordionData()[activeTab]}
                        activeIndex={activeAccordion}
                        onClick={setActiveAccordion}
                        navigate={navigate}
                        courseId={course?._id}
                        handleStartSubject={handleStartSubject}
                        handleStartLecture={handleStartLecture}
                        completedLectures={completedLectures}
                        completedSubjects={completedSubjects}
                    />
                </>
            )}
        </PageWrapper>
    );
};

export default ContinueCourse;