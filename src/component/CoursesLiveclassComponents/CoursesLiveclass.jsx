import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  ContentText,
  MovingOverlay,
  VideoPlayerContainer,
  FullscreenButton,
  MainContainer,
} from "./CoursesLiveclass.styles";
import {
  FaUser,
  FaDownload,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
} from "react-icons/fa";
import { getCourseById } from "../../api/courseApi";
import { getCourseByIdWithUSerProgress } from "../../api/userProgressApi";
import {
  completeLecturer,
  startSubject,
  startLecturer,
} from "../../api/userProgressApi";
import { getCookiesData } from "../../utils/cookiesService";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { getBackendAssets, getUserByUserId } from "../../api/authApi";
import { FaFilePdf } from "react-icons/fa";
import {
  getMocktestBySubjectId,
  getAllUserAttemptByUserId,
  checkMockTestAttempted,
  viewUserMocktestAttemptResult,
  getMockTestStats,
} from "../../api/mocktestApi";
import PdfModal from "./PDFModal";
import { m } from "framer-motion";
import api from "../../config/axiosConfig";



const CoursesLiveclass = () => {
  const { courseId, subjectid, lectureId } = useParams();
  const navigate = useNavigate();
  const tabContentRef = useRef(null);
  const videoRef = useRef(null);

  const [activeTab, setActiveTab] = useState("Overview");
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
  const [overlayPosition, setOverlayPosition] = useState({ top: 50, left: 50 });
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const videoContainerRef = useRef(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Mock Test integration state ---
  const [mockData, setMockData] = useState([]); // subjects -> lectures (mock tests)
  const [mockActiveAccordion, setMockActiveAccordion] = useState(null);
  const [attemptsData, setAttemptsData] = useState({}); // { [mockId]: { attemptsCount, max, remaining, isUnlimited, attempts[] } }
  const [attemptsLoading, setAttemptsLoading] = useState({}); // { [mockId]: boolean }
  const [resumeTests, setResumeTests] = useState({});
  const [viewResults, setViewResults] = useState({});
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const pdfContainerRef = useRef(null);

  const handlePdfFullscreen = () => {
    const el = pdfContainerRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsPdfFullscreen(false);
    } else {
      el.requestFullscreen?.();
      el.webkitRequestFullscreen?.();
      el.msRequestFullscreen?.();
      el.mozRequestFullScreen?.();
      setIsPdfFullscreen(true);
    }
  };

  const checkResumeMockTest = async (userId, mockId, subjectId) => {
    try {
      const res = await checkMockTestAttempted(userId, mockId, subjectId);

      setResumeTests((prev) => ({ ...prev, [mockId]: res.success }));
    } catch (error) {
      setResumeTests((prev) => ({ ...prev, [mockId]: false }));
    }
  };
  const checkViewResultMockTest = async (userId, mockId) => {
    try {
      const res = await viewUserMocktestAttemptResult(userId, mockId);
      setViewResults((prev) => ({
        ...prev, [mockId]: Object.keys(res.result).length === 0
          ? false
          : true || false
      }));
    } catch (error) {
      setViewResults((prev) => ({ ...prev, [mockId]: false }));
    }
  };
  useEffect(() => {
    const handleFSChange = () => {
      // check vendor-prefixed properties too
      const active =
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.msFullscreenElement;
      setIsFullscreen(active);
    };

    document.addEventListener("fullscreenchange", handleFSChange);
    document.addEventListener("webkitfullscreenchange", handleFSChange);
    document.addEventListener("mozfullscreenchange", handleFSChange);
    document.addEventListener("MSFullscreenChange", handleFSChange);

    // initialize once
    handleFSChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFSChange);
      document.removeEventListener("webkitfullscreenchange", handleFSChange);
      document.removeEventListener("mozfullscreenchange", handleFSChange);
      document.removeEventListener("MSFullscreenChange", handleFSChange);
    };
  }, []);

  // Move overlay regularly
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 80) + 5; // 5–85%
      const left = Math.floor(Math.random() * 80) + 5;
      setOverlayPosition({ top, left });
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  if (!course) return;
  const sub = course.subjects?.find(s => s._id === subjectid);
  const lecObj = sub?.lectures?.find(l => l._id === lectureId);

  if (lecObj && lecObj._id !== lecture?._id) {
    setSubjectId(sub?._id);
    setLecture(lecObj);
    setVideoError(false);

    // hard reset the video element so the new source loads immediately
    queueMicrotask(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.load();
        // keep autoplay if you want; otherwise remove next line
        videoRef.current.play().catch(() => {});
      }
    });
  }
}, [course, subjectid, lectureId]);  // ← depends on URL params


  // Auto fullscreen when play
  useEffect(() => {
    const player = videoRef.current;
    if (player) {
      const onPlay = () => handleFullscreen();
      player.addEventListener("play", onPlay);
      return () => player.removeEventListener("play", onPlay);
    }
  }, []);

  // --- Attempts math + fetchers for mock tests ---
  const computeAttemptMeta = async (lec, attemptsArr) => {
    const attemptsCount = Array.isArray(attemptsArr) ? attemptsArr.length : 0;
    const rawMax = lec?.maxAttempts;
    const hasFiniteMax =
      rawMax !== null &&
      rawMax !== undefined &&
      Number.isFinite(Number(rawMax));
    const max = hasFiniteMax ? Number(rawMax) : Infinity;
    const remaining = Number.isFinite(max)
      ? Math.max(max - attemptsCount, 0)
      : Infinity;
    const cookiesData = await getCookiesData();
    const uid = cookiesData.userId;

    const response = await getMockTestStats(uid, lec._id);
    return response;
    // return {
    //   attemptsCount,
    //   max,
    //   remaining,
    //   isUnlimited: !Number.isFinite(max),
    // };
  };

  const prefetchAttemptsForLectures = async (lectures = [], uid) => {
    if (!uid || !lectures.length) return;

    const toFetch = lectures.filter((l) => !attemptsData[l._id]);
    if (toFetch.length === 0) return;

    setAttemptsLoading((prev) => {
      const next = { ...prev };
      toFetch.forEach((l) => (next[l._id] = true));
      return next;
    });

    try {
      const results = await Promise.all(
        toFetch.map(async (l) => {
          try {
            const res = await getAllUserAttemptByUserId(uid, l._id);
            const meta = await computeAttemptMeta(l, res?.data || []);
            return [l._id, {
              attempts: res?.data || [],
              ...meta,
              max: meta.data.maxAttempts,
              resumetest: meta.data.resume,
              canStart: meta.data.start,
              isUnlimited: meta.data.isUnlimited,
              attemptsCount: meta.data.attemptCount,
              remaining: meta.data.maxAttempts - meta.data.attemptCount,
            }];
          } catch (e) {
            // // // console.error("attempts fetch failed:", e);
            const meta = await computeAttemptMeta(l, []);
            return [l._id, {
              attempts: [],
              ...meta,
              max: meta.data.maxAttempts,
              resumetest: meta.data.resume,
              canStart: meta.data.start,
              isUnlimited: meta.data.isUnlimited,
              attemptsCount: meta.data.attemptCount,
              remaining: meta.data.maxAttempts - meta.data.attemptCount,
            }];
          }
        })
      );

      setAttemptsData((prev) => {
        const merged = { ...prev };
        results.forEach(([id, val]) => (merged[id] = val));
        return merged;
      });
    } finally {
      setAttemptsLoading((prev) => {
        const next = { ...prev };
        toFetch.forEach((l) => delete next[l._id]);
        return next;
      });
    }
  };
  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.load();   // reload the video element
    videoRef.current.play().catch(() => {}); // autoplay, ignore if blocked
  }
}, [lectureId]);


  const buildMockData = async (courseObj) => {
    const list = await Promise.all(
      (courseObj.subjects || []).map(async (subject) => {
        try {
          const resp = await getMocktestBySubjectId(subject._id);
          const tests = (resp?.data || []).map((t, idx) => ({
            _id: t._id,
            lectureName: t.title || `Mock Test ${idx + 1}`,
            duration: `${t.number_of_questions || "N/A"} Questions | ${t.duration || "N/A"
              } mins`,
            maxAttempts: t.maxAttempts,
          }));
          return {
            _id: subject._id,
            name: subject.subjectDisplayName || "Subject",
            lectures: tests,
          };
        } catch (e) {
          // // console.error("mock tests fetch error:", e);
          return {
            _id: subject._id,
            name: subject.subjectName || "Subject",
            lectures: [],
          };
        }
      })
    );

    setMockData(
      list.filter((s) => Array.isArray(s.lectures) && s.lectures.length > 0)
    );
  };

  // Fetch data (course, progress, lecture) + build mock data
  useEffect(() => {
    const fetchData = async () => {
      const cookies = await getCookiesData();
      const userData = await getUserByUserId(cookies.userId);
      setUserId(cookies.userId);
      setUserPhoneNumber(userData.user.phone);

      try {
        const progressResponse = await getCourseByIdWithUSerProgress(
          cookies.userId,
          courseId
        );
        if (progressResponse?.success) {
          setCourse(progressResponse.data);

          // Extract completed lectures and subjects
          const lectures = [];
          const subjects = [];

          (progressResponse.data.subjects || []).forEach(
            async (subject, subIndex) => {
              if (subject.completed) subjects.push(subject._id);

              if (subject._id === subjectid) {
                setSubjectId(subject._id);
                await handleStartSubject(subject._id);
                setActiveAccordion(subIndex);

                (subject.lectures || []).forEach((lecture) => {
                  if (lecture.completed) lectures.push(lecture._id);
                  if (lecture._id === lectureId) {
                    setLecture(lecture);
                    startLecturer(
                      cookies.userId,
                      courseId,
                      subject._id,
                      lecture._id
                    );
                  }
                });
              }
            }
          );

          setCompletedLectures(lectures);
          setCompletedSubjects(subjects);

          // Build mock test data for this course
          await buildMockData(progressResponse.data);
        }
      } catch (error) {
        // // console.error("Error fetching course with progress:", error);

        // Fallback to regular course fetch if progress fails
        const response = await getCourseById(courseId);
        if (response?.success) {
          const courseData = response.data;
          setCourse(courseData);

          for (const subject of courseData.subjects || []) {
            const found = (subject.lectures || []).find(
              (lec) => lec._id === lectureId
            );
            if (found) {
              setLecture(found);
              setSubjectId(subject._id);
              break;
            }
          }

          // Build mock test data for fallback course object
          await buildMockData(courseData);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [courseId, subjectid, lectureId]);

  // Handle hash routing (if you use it)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveTab(hash || "Overview");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    setActiveTab(window.location.hash.replace("#", "") || "Overview");
  }, []);

  useEffect(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  // Prefetch attempts for mock tests on tab open / data change
  useEffect(() => {
    if (activeTab !== "MockTest" || !userId) return;
    const allLectures = mockData.flatMap((s) => s.lectures || []);
    if (allLectures.length) prefetchAttemptsForLectures(allLectures, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, userId, JSON.stringify(mockData)]);

  // Ensure active subject's mock tests are fetched (fast if cached)
  useEffect(() => {
    if (activeTab !== "MockTest" || mockActiveAccordion == null || !userId)
      return;
    const subject = mockData[mockActiveAccordion];
    const lectures = Array.isArray(subject?.lectures) ? subject.lectures : [];
    if (lectures.length) prefetchAttemptsForLectures(lectures, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockActiveAccordion, activeTab, userId]);

  const handleVideoError = () => {
    setVideoError(true);
    // // console.error("Error loading video");
  };

  const handleVideoEnd = async () => {
    if (userId && courseId && subjectId && lectureId) {
      try {
        const data = await completeLecturer(
          userId,
          courseId,
          subjectid,
          lectureId
        );

        let nextLecture = null;
        let nextSubject = null;

        for (const subject of course.subjects) {
          if (subject._id === subjectid) {
            const currentIndex = subject.lectures.findIndex(
              (lec) => lec._id === lectureId
            );

            if (currentIndex !== -1) {
              if (currentIndex < subject.lectures.length - 1) {
                nextLecture = subject.lectures[currentIndex + 1];
                nextSubject = subject._id;
                setLecture(nextLecture);
              } else {
                const currentSubjectIndex = course.subjects.findIndex(
                  (sub) => sub._id === subjectId
                );
                for (
                  let i = currentSubjectIndex + 1;
                  i < course.subjects.length;
                  i++
                ) {
                  if (course.subjects[i].lectures.length > 0) {
                    setSubjectId(course.subjects[i]._id);
                    setLecture(course.subjects[i].lectures[0]);
                    await handleStartSubject(course.subjects[i]._id);
                    nextSubject = course.subjects[i]._id;
                    nextLecture = course.subjects[i].lectures[0];
                    break;
                  }
                }
              }
            }
            break;
          }
        }

        if (nextLecture) {
          await handleStartSubject(nextSubject);
          await handleStartLecture(nextSubject, nextLecture._id);
          navigate(
            `/course/liveclass/${courseId}/${nextSubject}/${nextLecture._id}`
          );
          setLecture(nextLecture);
          return nextLecture._id;
        } else if (nextLecture == null && nextSubject == null) {
          const cookies = await getCookiesData();
          const progressResponse = await getCourseByIdWithUSerProgress(
            cookies.userId,
            courseId
          );
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
      } catch (error) {
        // // console.error("Error completing lecture:", error);
      }
    }
  };

  const handleStartSubject = async (subId) => {
    setSubjectId(subId);
    if (userId && courseId && subId) {
      try {
        await startSubject(userId, courseId, subId);
      } catch (error) {
        // // console.error("Error starting subject:", error);
      }
    }
  };

  // const handleStartLecture = async (subId, lecId) => {
  //   if (userId && courseId && subId && lecId) {
  //     try {
  //       await startLecturer(userId, courseId, subId, lecId);
  //       navigate(`/course/liveclass/${courseId}/${subId}/${lecId}`);
  //     } catch (error) {
  //       // // console.error("Error starting lecture:", error);
  //     }
  //   }
  // };

  const handleStartLecture = async (subId, lecId) => {
  // 1) set state right away so UI updates instantly
  const lecObj =
    course?.subjects?.find(s => s._id === subId)?.lectures?.find(l => l._id === lecId);
  if (lecObj) {
    setSubjectId(subId);
    setLecture(lecObj);
    setVideoError(false);
  }

  // 2) fire backend calls (best-effort)
  if (userId && courseId && subId && lecId) {
    try { await startLecturer(userId, courseId, subId, lecId); } catch {}
  }

  // 3) navigate after state set
  navigate(`/course/liveclass/${courseId}/${subId}/${lecId}`);
};


  const renderMockTestsTab = () => {
    if (!mockData.length)
      return <ContentText>No mock tests available.</ContentText>;

    return mockData.map((subject, sIdx) => (
      <div key={subject._id} style={{ marginBottom: 24 }}>
        <div
          style={{
            cursor: "pointer",
            padding: 12,
            background: "#f5f6fa",
            borderRadius: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() =>
            setMockActiveAccordion(sIdx === mockActiveAccordion ? null : sIdx)
          }
        >
          <strong>{subject.name}</strong>
          <div style={{ display: "flex", alignItems: "center" }}>
            {subject.completed && (
              <FaCheckCircle style={{ color: "green", marginRight: 10 }} />
            )}
            {mockActiveAccordion === sIdx ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        {mockActiveAccordion === sIdx && (
          <div style={{ paddingLeft: 16, marginTop: 8 }}>
            {(subject.lectures || []).map((lec) => {
              const meta = attemptsData[lec._id];
              const isLoading = !!attemptsLoading[lec._id];
              if (resumeTests[lec._id] === undefined && userId) {
                checkResumeMockTest(userId, lec._id, subject._id);
                checkViewResultMockTest(userId, lec._id);
              }

              const Skeleton = () => (
                <div style={{ display: "flex", gap: 8 }}>
                  <div
                    style={{
                      height: 30,
                      width: 110,
                      borderRadius: 4,
                      background: "#eee",
                    }}
                  />
                  <div
                    style={{
                      height: 30,
                      width: 100,
                      borderRadius: 4,
                      background: "#eee",
                    }}
                  />
                </div>
              );

              let infoLine = lec.duration;
              let showRemaining = false;
              let remainingText = "";
              // let showViewResults = false;
              const showViewResults = viewResults[lec._id];
              let canStart = true;
              const resumetest = resumeTests[lec._id];
              //  const  canStart=canAttend[lec._id] || false;

              if (!isLoading && meta) {
                const { attemptsCount, isUnlimited, max, remaining } = meta;
                // // console.log(
                //   "meta", meta,
                // )
                // showViewResults = attemptsCount > 0;
                canStart = meta.canStart;
                //   isUnlimited || (Number.isFinite(remaining) && remaining > 0);

                const maxText = isUnlimited
                  ? "Unlimited"
                  : Number.isFinite(max)
                    ? max
                    : lec.maxAttempts ?? "Unlimited";
                infoLine = `${lec.duration} | Max Attempts: ${maxText}`;

                if (
                  !isUnlimited &&
                  Number.isFinite(remaining) &&
                  remaining > 0
                ) {
                  showRemaining = true;
                  remainingText = ` | Remaining: ${remaining}`;
                }
              } else if (!meta) {
                const maxText =
                  lec.maxAttempts == null ? "Unlimited" : lec.maxAttempts;
                infoLine = `${lec.duration} | Max Attempts: ${maxText}`;
              }


              return (
                <div
                  key={lec._id}
                  style={{
                    padding: 12,
                    borderBottom: "1px solid #eee",
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>
                      {lec.lectureName}
                    </p>
                    <span style={{ fontSize: 14, color: "#888" }}>
                      {infoLine}
                      {showRemaining ? remainingText : ""}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        {showViewResults && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/user-view-results/${userId}/${lec._id}`
                              );
                            }}
                            style={{
                              background: "transparent",
                              border: "1px solid #4CAF50",
                              color: "#4CAF50",
                              padding: "4px 8px",
                              borderRadius: 4,
                              fontSize: 14,
                            }}
                          >
                            View Results
                          </button>
                        )}

                        {/* {canStart && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/start-test/${lec._id}/${subject._id}`);
                            }}
                            style={{
                              fontSize: 14,
                              color: "#007bff",
                              textDecoration: "none",
                              cursor: "pointer",
                              padding: "4px 8px",
                              border: "1px solid #007bff",
                              borderRadius: 4,
                            }}
                          >
                            Start Test
                          </div>
                        )} */}
                        {resumetest ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/start-test/${lec._id}/${subject._id}`);
                            }}
                            style={{
                              fontSize: 14,
                              color: "#007bff",
                              textDecoration: "none",
                              cursor: "pointer",
                              padding: "4px 8px",
                              border: "1px solid #007bff",
                              borderRadius: 4,
                            }}
                          >
                            Resume Test
                          </div>
                        ) : canStart ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/start-test/${lec._id}/${subject._id}`);
                            }}
                            style={{
                              fontSize: 14,
                              color: "#007bff",
                              textDecoration: "none",
                              cursor: "pointer",
                              padding: "4px 8px",
                              border: "1px solid #007bff",
                              borderRadius: 4,
                            }}
                          >
                            Start Test
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ));
  };

  const NoteDownload = ({ noteUrl, noteName }) => {
    const [signedUrl, setSignedUrl] = useState(null);

    useEffect(() => {
       if (!noteUrl) return;
      const fetchSignedUrl = async () => {
        try {
          const res = await getBackendAssets(noteUrl);
          setSignedUrl(res.url); // backend returns { url: signedUrl }
        } catch (err) {
          // // console.error("Failed to fetch signed URL", err);
        }
      };
      if (noteUrl) fetchSignedUrl();
    }, [noteUrl]);

    // if (!signedUrl) {
    //   return (
    //     <button
    //       disabled
    //       style={{
    //         background: "#ccc",
    //         color: "white",
    //         padding: "6px 12px",
    //         borderRadius: 4,
    //       }}
    //     >
    //       Preparing...
    //     </button>
    //   );
    // }

    return (
      // <a
      //   href={signedUrl}
      //   download
      //   style={{
      //     background: "#d4b200",
      //     color: "white",
      //     padding: "6px 12px",
      //     borderRadius: 4,
      //     textDecoration: "none",
      //   }}
      // >
      //   Download
      // </a>
      <button
        onClick={
          async () => {
            try {
              const ext = noteUrl.split(".").pop().toLowerCase().split("?")[0];

              if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(ext)) {
                window.open(signedUrl, "_blank");
                return;
              }
              // // // console.log("signedUrl", signedUrl);
              const response = await fetch(signedUrl);
              // // // console.log("response inside", response);
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = noteName || "document";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            } catch (err) {
              // // console.error("Download failed", err);
            }
          }
        }
        style={{
          background: "#d4b200",
          color: "white",
          padding: "6px 12px",
          borderRadius: 4,
          textDecoration: "none",
        }}
      >
        Download 
      </button>
    );
  };

  const renderTabContent = () => {
    if (loading) return <ContentText>Loading...</ContentText>;
    if (!course) return <ContentText>Course not found.</ContentText>;

    if (activeTab === "Notes") {
      const allNotes = [];
      (course.subjects || []).forEach((subject) => {
        if (Array.isArray(subject.notes)) {
          subject.notes.forEach((note) =>
            allNotes.push({ ...note, subjectName: subject.subjectName })
          );
        }
      });
      if (!allNotes.length)
        return <ContentText>No notes available for this course.</ContentText>;

      return (
        <>
          {allNotes.map((note, i) => {
            // const noteUrl = note.fileUrl?.startsWith("http")
            //   ? note.fileUrl
            //   : `${import.meta.env.REACT_APP_API_BASE_URL}${note.fileUrl}`;
            const noteUrl = note.fileUrl;
            return (
              <ContentText key={i}>
                <div
                  className="note-header"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <FaFilePdf style={{ marginRight: 8, color: "#e74c3c" }} />
                    {note.noteDisplayName || `Note ${i + 1}`}
                  </span>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() =>
                        setCurrentNote({
                          file: noteUrl,
                          name: note.noteName,
                          isDownloadable: note.isDownload,
                        })
                      }
                      style={{
                        background: "#0494fa",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: 4,
                      }}
                    >
                      View
                    </button>
                    {/* {note.isDownload && (
                      <a
                        // href={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${noteUrl}`}
                        // href={async (noteUrl) => {
                        //   const response = await getBackendAssets(noteUrl);
                        //   return response.url

                        // }}
                        href="https://mankavith.5b9eb21514883c06ea627a2bb5a71815.r2.cloudflarestorage.com/ProjectUploads/notes/17579442637661751548664879-certificate-Jayanth%20B%20R.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=30819f87a7a689cc76f47b602533c81f%2F20250916%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250916T053005Z&X-Amz-Expires=172800&X-Amz-Signature=4be69a3330587bcd0c9be17f766bfd006f825fca26ec82505f59ebdd7be1ff09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                        download
                        style={{
                          background: "#d4b200",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: 4,
                          textDecoration: "none",
                        }}
                      >
                        Download 
                      </a>
                    )} */}
                    {note.isDownload && (
                      <NoteDownload noteUrl={noteUrl} noteName={note.noteName} />
                    )}
                  </div>
                </div>
              </ContentText>
            );
          })}
          {currentNote && (
            <PdfModal
              file={currentNote.file}
              name={currentNote.name}
              isDownloadable={currentNote.isDownloadable}
              onClose={() => setCurrentNote(null)}
            />
          )}
        </>
      );
    }

    if (activeTab === "Overview") {
      return (course.subjects || []).map((subject, sIdx) => (
        <div key={subject._id} style={{ marginBottom: 24 }}>
          <div
            style={{
              cursor: "pointer",
              padding: 12,
              background: "#f5f6fa",
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={async () => {
              const newIndex = sIdx === activeAccordion ? null : sIdx;
              setActiveAccordion(newIndex);
              if (newIndex !== null) await handleStartSubject(subject._id);
            }}
          >
            <strong>{subject.subjectDisplayName}</strong>
            <div style={{ display: "flex", alignItems: "center" }}>
              {subject.completed && (
                <FaCheckCircle style={{ color: "green", marginRight: 10 }} />
              )}
              {activeAccordion === sIdx ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          {activeAccordion === sIdx && (
            <div style={{ paddingLeft: 16, marginTop: 8 }}>
              {(subject.lectures || []).map((lec) => (
                <div
                  key={lec._id}
                  onClick={() => handleStartLecture(subject._id, lec._id)}
                  style={{
                    padding: 12,
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    backgroundColor:
                      lec._id === lectureId ? "#e9f5ff" : "transparent",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>
                      {lec.lectureName}{" "}
                      {lec.completed && (
                        <FaCheckCircle
                          style={{ color: "green", marginLeft: 6 }}
                        />
                      )}
                    </p>
                    {/* <p
                      dangerouslySetInnerHTML={{ __html: lec.description }}
                      style={{ margin: "4px 0", color: "#666" }}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ));
    }

    if (activeTab === "MockTest") {
      return renderMockTestsTab();
    }

    return <ContentText>Tab not found.</ContentText>;
  };

  const calculateProgress = () => {
    if (!course || !course.subjects) return 0;

    let totalLectures = 0;
    let completed = 0;

    course.subjects.forEach((subject) => {
      if (subject.lectures) {
        totalLectures += subject.lectures.length;
        subject.lectures.forEach((lecture) => {
          if (completedLectures.includes(lecture._id)) completed++;
        });
      }
    });

    return totalLectures > 0
      ? Math.round((completed / totalLectures) * 100)
      : 0;
  };

  if (loading) return <Container>Loading...</Container>;

  const handleReviewSubmit = async ({ rating, review }) => {
    try {
      // // console.log("Review submitted:");
    } catch (error) {
      // // console.error("Error submitting review:", error);
    }
  };

  //   const handleFullscreen = () => {
  //     const container = videoContainerRef.current;
  //     if (container?.requestFullscreen) container.requestFullscreen();
  //     else if (container?.webkitRequestFullscreen)
  //       container.webkitRequestFullscreen();
  //     else if (container?.msRequestFullscreen) container.msRequestFullscreen();
  //   };

  const handleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!el) return;

    // Toggle: exit if already in fullscreen, else request
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
      return;
    }

    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); // Safari
    else if (el.msRequestFullscreen) el.msRequestFullscreen(); // IE/Edge (old)
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen(); // Firefox (old)
  };

  return (
    <MainContainer>
      <VideoContainer>
        <StyledVideo ref={videoContainerRef}>
          {lecture && (
            <>

              <VideoPlayerContainer key={`${subjectid}-${lectureId}`}>
                <VideoPlayer
                  
                  ref={videoRef}
                  onError={handleVideoError}
                  onEnded={handleVideoEnd}
                  controls
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                >


                  {lecture?.videoUrl && !videoError ? (
                    <source src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${lecture.videoUrl}`} />
                  ) : (
                    <div className="video-error">
                      {videoError ? "Error loading video" : "Your browser does not support the video tag"}
                    </div>
                  )}
                  {userId && (
                    <MovingOverlay
                      style={{ top: `${overlayPosition.top}%`, left: `${overlayPosition.left}%` }}
                    >
                      {userPhoneNumber || userId}
                    </MovingOverlay>
                  )}
                </VideoPlayer>

                {/* Keep overlay duplication if you need it */}
                {userId && (
                  <MovingOverlay
                    style={{ top: `${overlayPosition.top}%`, left: `${overlayPosition.left}%` }}
                  >
                    {userPhoneNumber || userId}
                  </MovingOverlay>
                )}

                {/* ✅ Top-right fullscreen toggle */}
                {/* <FullscreenButton
    onClick={handleFullscreen}
    aria-label={isFullscreen ? "View in Small Screen" : "[]]"}
  >
    {isFullscreen ? "View Small Screen" : "[]"}
  </FullscreenButton> */}
              </VideoPlayerContainer>

            </>
          )}
          {/* Fullscreen button OUTSIDE the video player, exactly below it */}
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 12 }}
          >
            <FullscreenButton
              onClick={handleFullscreen}
              aria-label={
                isFullscreen ? "[  ]" : "[  ]"
              }
            >
              {isFullscreen ? "[  ]" : "[  ]"}
            </FullscreenButton>
          </div>

          <TopBar>
            <OverlayText>
              <h4>{lecture?.lectureName || "Lecture"}</h4>
            </OverlayText>
          </TopBar>
          <BottomTitle>
            Course: {course?.courseDisplayName || "Course"} | Progress:{" "}
            {course?.completedPercentage || 0}%
          </BottomTitle>
        </StyledVideo>
      </VideoContainer>

      <TabContentWrapper ref={tabContentRef}>
        <ButtonGroup>
          <ActionButton
            active={activeTab === "Overview"}
            onClick={() => setActiveTab("Overview")}
          >
            Video lectures
          </ActionButton>
          <ActionButton
            active={activeTab === "Notes"}
            onClick={() => setActiveTab("Notes")}
          >
            Notes ({course?.no_of_notes || 0})
          </ActionButton>
          <ActionButton
            active={activeTab === "MockTest"}
            onClick={() => setActiveTab("MockTest")}
          >
            Mock Test
          </ActionButton>
        </ButtonGroup>
        {renderTabContent()}
      </TabContentWrapper>
    </MainContainer>
  );
};

export default CoursesLiveclass;
