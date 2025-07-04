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
import { getCourseByIdWithUSerProgress } from '../../api/userProgressApi';
import { completeLecturer, startSubject, startLecturer } from '../../api/userProgressApi';
import { getCookiesData } from '../../utils/cookiesService';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

const CoursesLiveclass = () => {
    const { courseId, subjectid, lectureId } = useParams();
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
    const [completedSubjects, setCompletedSubjects] = useState([]);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [showFeedbackButton, setShowFeedbackButton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const cookies = await getCookiesData();
            setUserId(cookies.userId);
            try {
                const progressResponse = await getCourseByIdWithUSerProgress(cookies.userId, courseId);
                console.log("Progress Response:", progressResponse);
                if (progressResponse?.success) {
                    setCourse(progressResponse.data);

                    // Extract completed lectures and subjects
                    const lectures = [];
                    const subjects = [];

                    (progressResponse.data.subjects || []).forEach(async (subject, subIndex) => {
                        if (subject.completed) {
                            subjects.push(subject._id);
                        }
                        if (subject._id === subjectid) {
                            setSubjectId(subject._id);
                            await handleStartSubject(subject._id);
                            setActiveAccordion(subIndex);
                            console.log("Setting subjectId:", subject._id, "for lectureId:", lectureId);


                            (subject.lectures || []).forEach(lecture => {
                                if (lecture.completed) {
                                    lectures.push(lecture._id);
                                }
                                if (lecture._id === lectureId) {
                                    console.log("Setting lecture:", lecture, "for subject:", subject._id);
                                    setLecture(lecture);
                                    startLecturer(cookies.userId, courseId, subject._id, lecture._id);
                                    // setSubjectId(subject._id);
                                    //  console.log("", "lectureId", lectureId," subject._id", subject._id);
                                }
                            });
                        }
                    });

                    setCompletedLectures(lectures);
                    setCompletedSubjects(subjects);
                }
            } catch (error) {
                console.error("Error fetching course with progress:", error);

                // Fallback to regular course fetch if progress fails
                const response = await getCourseById(courseId);
                if (response?.success) {
                    const courseData = response.data;
                    setCourse(courseData);

                    for (const subject of courseData.subjects || []) {
                        const found = (subject.lectures || []).find(lec => lec._id === lectureId);
                        if (found) {
                            console.log("Found lecture:", found, "subject._id", subject._id);
                            setLecture(found);
                            setSubjectId(subject._id);
                            break;
                        }
                    }
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [courseId, subjectid, lectureId]);

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
            try {
                console.log("Completing lecture:", userId, courseId, subjectId, lectureId);
                const data = await completeLecturer(userId, courseId, subjectid, lectureId);
                console.log("Lecture completed:", data);
                // let next = false;
                // let nextLec;
                // const nextLecture = course.subjects.map(subject => {
                //     if (subject._id === subjectId) {

                //         subject.lectures.find((lec,index) => {
                //             if (next) {
                //                 nextLec = lec; // Set nextLec to the next lecture after the current one
                //                 next = false; // Stop searching after finding the next lecture
                //             };
                //             if (lec._id === lectureId) {
                //                 next = true; // Set next to true after finding the current lecture
                //                 // return false; // Skip the current lecture
                //             }
                //             if(subject.lectures.length - 1 === index&&(!next) ) {
                //                 // write logic to set subject to next, 
                //             }
                //         });

                //     }
                //     return null;
                // });
                let nextLecture = null;
                let nextSubject = null;
                // Loop through all subjects
                for (const subject of course.subjects) {
                    console.log("subject", subject)
                    if (subject._id === subjectid) {
                        // Find the index of the current lecture
                        const currentIndex = subject.lectures.findIndex(lec => lec._id === lectureId);

                        if (currentIndex !== -1) {
                            // Check if there's a next lecture in this subject
                            if (currentIndex < subject.lectures.length - 1) {
                                nextLecture = subject.lectures[currentIndex + 1];
                                nextSubject = subject._id; // Set the next subject to the current one
                                setLecture(nextLecture);
                            } else {
                                // Find the next subject with lectures
                                const currentSubjectIndex = course.subjects.findIndex(sub => sub._id === subjectId);
                                for (let i = currentSubjectIndex + 1; i < course.subjects.length; i++) {
                                    if (course.subjects[i].lectures.length > 0) {
                                        setSubjectId(course.subjects[i]._id);
                                        setLecture(course.subjects[i].lectures[0]);
                                        await handleStartSubject(course.subjects[i]._id);
                                        // Set the first lecture of the next subject
                                        nextSubject = course.subjects[i]._id;
                                        nextLecture = course.subjects[i].lectures[0];
                                        break;
                                    }
                                }
                            }
                        }
                        break; // We found our subject, no need to continue
                    }
                }
                console.log("Next Lecture:", nextLecture, "Next Subject:", nextSubject);

                if (nextLecture) {
                    await handleStartSubject(nextSubject);
                    await handleStartLecture(nextSubject, nextLecture._id);
                    navigate(`/course/liveclass/${courseId}/${nextSubject}/${nextLecture._id}`);
                    setLecture(nextLecture);
                    return nextLecture._id;
                } else if (nextLecture == null && nextSubject == null) {
                    const cookies = await getCookiesData();
                    const progressResponse = await getCourseByIdWithUSerProgress(cookies.userId, courseId);
                    // If no next lecture, navigate to course overview
                    // console.log("No next lecture found, navigating to course overview", course);
                    // navigate(`/courseComplte/${courseId}`);
                    
                    if (progressResponse.data?.completed) {
                        if (progressResponse.data?.viewedCertificate) {
                            navigate(`/user`);
                        } else {
                            navigate(`/courseComplte/${courseId}`);
                        }

                    } else {
                        navigate(`/continueCourse/${courseId}`);
                    }
                }
                // setCompletedLectures(prev => [...prev, lectureId]);

                // Check if all lectures in this subject are completed
                // const currentSubject = course.subjects.find(s => s._id === subjectId);
                // if (currentSubject) {
                //     const allLecturesCompleted = currentSubject.lectures.every(lec => 
                //         completedLectures.includes(lec._id) || lec._id === lectureId
                //     );

                //     if (allLecturesCompleted) {
                //         setCompletedSubjects(prev => [...prev, subjectId]);
                //     }
                // }
            } catch (error) {
                console.error("Error completing lecture:", error);
            }
        }
    };

    const handleStartSubject = async (subjectId) => {
        setSubjectId(subjectId);
        if (userId && courseId && subjectId) {
            try {
                const data = await startSubject(userId, courseId, subjectId);

                console.log("Subject started:", data);
            } catch (error) {
                console.error("Error starting subject:", error);
            }
        }
    };

    const handleStartLecture = async (subjectId, lecId) => {
        if (userId && courseId && subjectId && lecId) {
            try {
                await startLecturer(userId, courseId, subjectId, lecId);
                navigate(`/course/liveclass/${courseId}/${subjectId}/${lecId}`);
            } catch (error) {
                console.error("Error starting lecture:", error);
            }
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
            // const initialUpdate=async () => {
            //     course.subjects.forEach(async (subject) => {
            //         if (subject._id === subjectId) {
            //             setActiveAccordion(course.subjects.indexOf(subject));
            //             await handleStartSubject(subject._id);
            //         }
            //     });
            // }
            // initialUpdate();
            return course.subjects.map((subject, sIdx) => (
                <div key={subject._id} style={{ marginBottom: 24 }}>
                    <div
                        style={{
                            cursor: 'pointer',
                            padding: 12,
                            background: '#f5f6fa',
                            borderRadius: 8,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                        onClick={async () => {
                            const newIndex = sIdx === activeAccordion ? null : sIdx;
                            setActiveAccordion(newIndex);
                            if (newIndex !== null) await handleStartSubject(subject._id);
                        }}
                    >
                        <strong>{subject.subjectName}</strong>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {subject.completed && (
                                <FaCheckCircle style={{ color: 'green', marginRight: 10 }} />
                            )}
                            {activeAccordion === sIdx ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
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
                                                {lec.completed && (
                                                    <FaCheckCircle style={{ color: 'green', marginLeft: 6 }} />
                                                )}
                                            </p>
                                            {/* <p style={{ margin: '4px 0', color: '#666' }}>{lec.description}</p> */}
                                            <p dangerouslySetInnerHTML={{ __html: lec.description }}  style={{ margin: '4px 0', color: '#666' }} />
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

    const calculateProgress = () => {
        if (!course || !course.subjects) return 0;

        let totalLectures = 0;
        let completed = 0;

        course.subjects.forEach(subject => {
            if (subject.lectures) {
                totalLectures += subject.lectures.length;
                subject.lectures.forEach(lecture => {
                    if (completedLectures.includes(lecture._id)) completed++;
                });
            }
        });

        return totalLectures > 0 ? Math.round((completed / totalLectures) * 100) : 0;
    };

    if (loading) return <Container>Loading...</Container>;

    const handleReviewSubmit = async ({ rating, review }) => {
        try {

            console.log("Review submitted:",);
            // You might want to show a success message here
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };


    return (
        <Container>
            <VideoContainer>
                <StyledVideo>
                    {lecture && <VideoPlayer
                        controls
                        key={lecture?._id}
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
                    </VideoPlayer>}

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
                        Course: {course?.courseDisplayName || 'Course'} |
                        Progress: {course.completedPercentage || 0}%
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