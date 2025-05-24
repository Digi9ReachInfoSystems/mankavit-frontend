import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    VideoContainer,
    StyledVideo,
    OverlayText,
    Tag,
    PhoneNumber,
    VideoPlayer,
    BottomTitle,
    TopBar,
    ButtonGroup,
    ActionButton,
    TabContentWrapper,
    ContentText
} from './CoursesLiveclass.styles';
import { FaUser, FaDownload, FaPlay, FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import { getCourseById } from '../../api/courseApi';
import { completeLecturer, startSubject, startLecturer } from '../../api/userProgressApi';
import { getCookiesData } from '../../utils/cookiesService';

const CoursesLiveclass = () => {
    const { courseId, lectureId } = useParams();
    const navigate = useNavigate();
    const tabContentRef = useRef(null);
    const videoRef = useRef(null);

    const [activeTab, setActiveTab] = useState('Overview');
    const [course, setCourse] = useState(null);
    const [lecture, setLecture] = useState(null);
    const [subjectId, setSubjectId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);
    const [userId, setUserId] = useState(null);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [completedLectures, setCompletedLectures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const cookies = await getCookiesData();
            setUserId(cookies.userId);

            const response = await getCourseById(courseId);
            if (response?.success) {
                const courseData = response.data;
                setCourse(courseData);

                for (const subject of courseData.subjects || []) {
                    const found = (subject.lectures || []).find(lec => lec._id === lectureId);
                    if (found) {
                        setLecture(found);
                        setSubjectId(subject._id);
                        break;
                    }
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [courseId, lectureId]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            setActiveTab(hash || 'Overview');
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        setActiveTab(window.location.hash.replace('#', '') || 'Overview');
    }, []);

    useEffect(() => {
        if (tabContentRef.current) {
            tabContentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeTab]);

    const handleVideoError = () => {
        setVideoError(true);
        console.error("Error loading video");
    };

    const handleVideoEnd = async () => {
        if (userId && courseId && subjectId && lectureId) {
          await completeLecturer(userId, courseId, subjectId, lectureId);
setCompletedLectures(prev => [...prev, lectureId]);

        }
    };

    const handleStartSubject = async (subjectId) => {
        if (userId && courseId && subjectId) {
            await startSubject(userId, courseId, subjectId);
        }
    };

    const handleStartLecture = async (subjectId, lecId) => {
        if (userId && courseId && subjectId && lecId) {
            await startLecturer(userId, courseId, subjectId, lecId);
            navigate(`/course/liveclass/${courseId}/${lecId}`);
        }
    };

    const renderTabContent = () => {
        if (loading) return <ContentText>Loading...</ContentText>;
        if (!course) return <ContentText>Course not found.</ContentText>;

        if (activeTab === 'Notes') {
            const allNotes = (course.subjects || []).flatMap(subject => subject.notes || []);
            if (!allNotes.length) return <ContentText>No notes available for this course.</ContentText>;

            return allNotes.map((note, i) => (
                <ContentText key={i}>
                    <div className="note-header">
                        <span className="pdf-title">{note.noteName || `Note ${i + 1}`}</span>
                        <a href={note.fileUrl} download target="_blank" rel="noopener noreferrer" className="download-link">
                            <FaDownload />
                        </a>
                    </div>
                    <p>{note.noteDisplayName || 'No description available'}</p>
                </ContentText>
            ));
        }

        if (activeTab === 'Overview') {
            return course.subjects.map((subject, sIdx) => (
                <div key={subject._id} style={{ marginBottom: 24 }}>
                    <div
                        style={{ cursor: 'pointer', padding: 12, background: '#f5f6fa', borderRadius: 8 }}
                        onClick={async () => {
                            const newIndex = sIdx === activeAccordion ? null : sIdx;
                            setActiveAccordion(newIndex);
                            if (newIndex !== null) await handleStartSubject(subject._id);
                        }}
                    >
                        <strong>{subject.subjectName}</strong>
                        <span style={{ float: 'right' }}>{activeAccordion === sIdx ? <FaChevronUp /> : <FaChevronDown />}</span>
                    </div>
                    {activeAccordion === sIdx && (
                        <div style={{ paddingLeft: 16, marginTop: 8 }}>
                            {(subject.lectures || []).map((lec, lIdx) => {
                                const isCompleted = completedLectures.includes(lec._id);
                                return (
                                    <div
                                        key={lec._id}
                                        onClick={() => handleStartLecture(subject._id, lec._id)}
                                        style={{
                                            padding: 12,
                                            borderBottom: '1px solid #eee',
                                            cursor: 'pointer',
                                            backgroundColor: lec._id === lectureId ? '#e9f5ff' : 'transparent',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 500 }}>
                                                {lec.lectureName}{" "}
                                                {isCompleted && (
                                                    <FaCheckCircle style={{ color: 'green', marginLeft: 6 }} />
                                                )}
                                            </p>
                                            <p style={{ margin: '4px 0', color: '#666' }}>{lec.description}</p>
                                            <p style={{ fontSize: 12, color: '#888' }}><strong>Duration:</strong> {lec.duration}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ));
        }

        return <ContentText>Tab not found.</ContentText>;
    };

    if (loading) return <Container>Loading...</Container>;

    return (
        <Container>
            <VideoContainer>
                <StyledVideo>
                    <VideoPlayer
                        controls
                        ref={videoRef}
                        onError={handleVideoError}
                        onEnded={handleVideoEnd}
                        poster={course?.image || ""}
                    >
                        {lecture?.videoUrl && !videoError ? (
                            <source src={lecture.videoUrl} type="video/mp4" />
                        ) : (
                            <div className="video-error">
                                {videoError ? "Error loading video" : "Your browser does not support the video tag or video URL is missing."}
                            </div>
                        )}
                    </VideoPlayer>

                    <TopBar>
                        <OverlayText>
                            <h4>{lecture?.lectureName || 'Lecture'}</h4>
                            <Tag>📊 Topic</Tag>
                        </OverlayText>
                        <PhoneNumber>
                            <FaUser style={{ marginRight: '8px' }} />
                            {course?.student_enrolled?.length || 0} students enrolled
                        </PhoneNumber>
                    </TopBar>
                    <BottomTitle>
                        Course: {course?.courseDisplayName || 'Course'}
                    </BottomTitle>
                </StyledVideo>
            </VideoContainer>

            <TabContentWrapper ref={tabContentRef}>
                <ButtonGroup>
                    <ActionButton active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>
                        Overview
                    </ActionButton>
                    <ActionButton active={activeTab === 'Notes'} onClick={() => setActiveTab('Notes')}>
                        Notes ({course?.no_of_notes || 0})
                    </ActionButton>
                </ButtonGroup>
                {renderTabContent()}
            </TabContentWrapper>
        </Container>
    );
};

export default CoursesLiveclass;
