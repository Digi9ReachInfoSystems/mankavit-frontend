import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PageWrapper,
  Header,
  BackLink,
  BackIcon,
  MainTitle,
  HeaderSection,
  CourseDetails,
  CourseInfo,
  TabSection,
  VideoList,
  VideoItem,
  Playbutton,
  NotesSection,
  NoteItem,
  BlinkingIcon,
  TVIcon,
  LiveClass,
  Statdesc,
} from "./ContinueCourse.styles";

import { FaFilePdf, FaDownload } from "react-icons/fa";
import {
  FaArrowLeft,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

import { getCourseById } from "../../api/courseApi";
import {
  getMocktestBySubjectId,
  getAllUserAttemptByUserId,
  checkMockTestAttempted,
  viewUserMocktestAttemptResult,
  getMockTestStats,
} from "../../api/mocktestApi";
import {
  getCourseByIdWithUSerProgress,
  startSubject,
  startLecturer,
} from "../../api/userProgressApi";
import { getCookiesData } from "../../utils/cookiesService";
import { getLiveMeetings } from "../../api/meetingApi";
import { getUserByUserId } from "../../api/authApi";
import PDFViewer from "../../module/admin/component/PdfViewer/PdfViewer";

/* ---------------------- small util: force download ---------------------- */
const downloadFile = (url, fallbackName = "download.pdf") => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fallbackName; // browsers may override via Content-Disposition
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// const AccordionList = ({
//   data,
//   activeIndex,
//   onClick,
//   navigate,
//   courseId,
//   handleStartSubject,
//   handleStartLecture,
//   completedLectures = [],
//   completedSubjects = [],
//   isMockTestTab = false,
//   userId,
//   attemptsData = {}, // <— cache injected from parent
// }) => {
//   const [resumeTests, setResumeTests] = React.useState({});

//   // Fetch resumetest for lectures when data changes
//   React.useEffect(() => {
//     const apiCaller = async () => {
//       data.map((item, idx) => {
//         item.lectures.map(async (lecture, i) => {
//           attemptsData[lecture._id];
//           const response = await checkMockTestAttempted(
//             userId,
//             lecture._id,
//             item._id
//           );
//           const viewResults = await viewUserMocktestAttemptResult(
//             userId,
//             lecture._id
//           );
//           // attemptsData[lecture._id].resumetest = response.success || false;
//           attemptsData[lecture._id].viewResults =
//             Object.keys(viewResults.result).length === 0
//               ? false
//               : true || false;
    
//         });
//       });
//     };
//     apiCaller();
//   }, [attemptsData]);
//   return (
//     <VideoList>
//       {data && data.length === 0 && (
//         <p style={{ padding: 24 }}>No items found.</p>
//       )}

//       {data &&
//         data.map((item, idx) => (
//           <div key={item._id || idx}>
//             <VideoItem
//               style={{
//                 background: "#f5f6fa",
//                 boxShadow: activeIndex === idx ? "0 2px 8px #eee" : "none",
//                 position: "relative",
//               }}
//               onClick={async () => {
//                 const newIndex = idx === activeIndex ? null : idx;
//                 onClick(newIndex);
//                 if (newIndex !== null && !isMockTestTab) {
//                   await handleStartSubject(item._id);
//                 }
//               }}
//             >
//               <div className="video-info">
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <p style={{ fontWeight: 600 }}>{item.name}</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 {item.completed && (
//                   <FaCheckCircle style={{ color: "green", marginRight: 10 }} />
//                 )}
//                 <Playbutton>
//                   {activeIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
//                 </Playbutton>
//               </div>
//             </VideoItem>

//             {activeIndex === idx && (
//               <div
//                 style={{
//                   paddingLeft: 24,
//                   background: "#fff",
//                   borderRadius: 8,
//                   marginTop: 4,
//                 }}
//               >
//                 {item.lectures && item.lectures.length > 0 ? (
//                   item.lectures.map((lecture, i) => {
//                     /* ------------------------- Mock Test Row ------------------------- */
//                     if (isMockTestTab) {
//                       const meta = attemptsData[lecture._id];

//                       // instant defaults
//                       const defaultMaxText =
//                         lecture.maxAttempts == null
//                           ? "Unlimited"
//                           : lecture.maxAttempts;

//                       const infoLine = meta
//                         ? `${lecture.duration} | Max Attempts: ${meta.isUnlimited ? "Unlimited" : meta.max
//                         }`
//                         : `${lecture.duration} | Max Attempts: ${defaultMaxText}`;

//                         const showViewResults = meta?.viewResults;

                  
//                       const canStart = meta?.canStart || false;

//                       const remainingText =
//                         meta &&
//                           !meta.isUnlimited ?
//                           meta.remaining > 0
//                             ? ` | Remaining: ${meta.remaining}`
//                             : " | Remaining:0"
//                           : "";

//                       return (
//                         <VideoItem
//                           key={lecture._id || i}
//                           style={{
//                             boxShadow: "none",
//                             background: "none",
//                             cursor: "pointer",
//                             marginBottom: 4,
//                             padding: "12px 0",
//                             borderBottom: "1px solid #eee",
//                           }}
//                         >
//                           <div className="video-info" style={{ width: "100%" }}>
//                             <FaPlay
//                               style={{ marginRight: 12, color: "#007bff" }}
//                             />
//                             <div
//                               style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 width: "100%",
//                               }}
//                             >
//                               <p style={{ fontSize: 16, fontWeight: 500 }}>
//                                 {lecture.lectureName}
//                               </p>

//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   width: "100%",
//                                   alignItems: "center",
//                                   marginTop: 4,
//                                 }}
//                               >
//                                 <span style={{ fontSize: 14, color: "#888" }}>
//                                   {infoLine}
//                                   {remainingText}
//                                 </span>

//                                 <div style={{ display: "flex", gap: 8 }}>
//                                   {showViewResults && (
//                                     <button
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         navigate(
//                                           `/user-view-results/${userId}/${lecture._id}`
//                                         );
//                                       }}
//                                       style={{
//                                         background: "transparent",
//                                         border: "1px solid #4CAF50",
//                                         color: "#4CAF50",
//                                         padding: "4px 8px",
//                                         borderRadius: 4,
//                                         fontSize: 14,
//                                       }}
//                                     >
//                                       View Results
//                                     </button>
//                                   )}

//                                   {meta?.resumetest ? (
//                                     <div
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         navigate(
//                                           `/start-test/${lecture._id}/${item._id}`
//                                         );
//                                       }}
//                                       style={{
//                                         fontSize: 14,
//                                         color: "#007bff",
//                                         textDecoration: "none",
//                                         cursor: "pointer",
//                                         padding: "4px 8px",
//                                         border: "1px solid #007bff",
//                                         borderRadius: 4,
//                                       }}
//                                     >
//                                       Resume Test
//                                     </div>
//                                   ) : canStart ? (
//                                     <div
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         navigate(
//                                           `/start-test/${lecture._id}/${item._id}`
//                                         );
//                                       }}
//                                       style={{
//                                         fontSize: 14,
//                                         color: "#007bff",
//                                         textDecoration: "none",
//                                         cursor: "pointer",
//                                         padding: "4px 8px",
//                                         border: "1px solid #007bff",
//                                         borderRadius: 4,
//                                       }}
//                                     >
//                                       Start Test
//                                     </div>
//                                   ) : null}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </VideoItem>
//                       );
//                     }

//                     /* ------------------ Normal lecture rows (unchanged) ----------------- */
//                     return (
//                       <VideoItem
//                         key={lecture._id || i}
//                         style={{
//                           boxShadow: "none",
//                           background: "none",
//                           cursor: "pointer",
//                           marginBottom: 4,
//                           padding: "12px 0",
//                           borderBottom: "1px solid #eee",
//                         }}
//                         onClick={async () => {
//                           await handleStartLecture(item._id, lecture._id);
//                           navigate(
//                             `/course/liveclass/${courseId}/${item._id}/${lecture._id}`
//                           );
//                         }}
//                       >
//                         <div className="video-info" style={{ width: "100%" }}>
//                           <FaPlay
//                             style={{ marginRight: 12, color: "#007bff" }}
//                           />
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               width: "100%",
//                             }}
//                           >
//                             <p style={{ fontSize: 16, fontWeight: 500 }}>
//                               {lecture.lectureName}
//                               {lecture.completed && (
//                                 <FaCheckCircle
//                                   style={{ color: "green", marginLeft: 6 }}
//                                 />
//                               )}
//                             </p>
//                             <p
//                               style={{
//                                 fontSize: 14,
//                                 color: "#666",
//                                 margin: "4px 0",
//                               }}
//                               dangerouslySetInnerHTML={{
//                                 __html: lecture.description,
//                               }}
//                             />
//                             <div
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 width: "100%",
//                               }}
//                             >
//                               <span style={{ fontSize: 14, color: "#888" }} />
//                               <div
//                                 style={{
//                                   fontSize: 14,
//                                   color: "#007bff",
//                                   textDecoration: "none",
//                                 }}
//                               >
//                                 Join Class
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </VideoItem>
//                     );
//                   })
//                 ) : (
//                   <div style={{ padding: "16px 8px", color: "#888" }}>
//                     No {isMockTestTab ? "mock tests" : "lectures"} found.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//     </VideoList>
//   );
// };

// Replace your current AccordionList with this simplified version:

const AccordionList = ({
  data,
  navigate,
  courseId,
  handleStartSubject,
  handleStartLecture,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <VideoList>
        <p style={{ padding: 24 }}>No subjects found.</p>
      </VideoList>
    );
  }

  const goToSubject = async (subject) => {
    try {
      // 1) Start subject for progress tracking
      await handleStartSubject(subject._id);

      // 2) Decide target lecture: first incomplete, else first
      const lectures = Array.isArray(subject.lectures) ? subject.lectures : [];
      const nextLecture =
        lectures.find((l) => !l.completed) || lectures[0];

      if (nextLecture?._id) {
        // 3) Start lecture for progress tracking
        await handleStartLecture(subject._id, nextLecture._id);

        // 4) Navigate to the live class page for this subject/lecture
        navigate(
          `/course/liveclass/${courseId}/${subject._id}/${nextLecture._id}`
        );
      } else {
        // Subject has no lectures — fall back (optional: show a toast)
        navigate(`/continueCourse/${courseId}`);
      }
    } catch (err) {
      console.error("Failed to open subject:", err);
    }
  };

  return (
    <VideoList>
      {data.map((subject) => (
        <VideoItem
          key={subject._id}
          style={{
            background: "#f5f6fa",
            boxShadow: "none",
            position: "relative",
            cursor: "pointer",
            marginBottom: 8,
          }}
          onClick={() => goToSubject(subject)}
        >
          <div className="video-info">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontWeight: 600, margin: 0 }}>{subject.name}</p>
              {/* optional subject progress */}
              {"completedPercentage" in subject && (
                <span style={{ fontSize: 12, color: "#888" }}>
                  {subject.completedPercentage || 0}% complete
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {subject.completed && (
              <FaCheckCircle style={{ color: "green", marginRight: 10 }} />
            )}
            {/* Right-side “go” affordance */}
            {/* <Playbutton title="Open">
              <FaPlay />
            </Playbutton> */}
          </div>
        </VideoItem>
      ))}
    </VideoList>
  );
};

const ContinueCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Subjects");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [course, setCourse] = useState(null);
  const [userId, setUserId] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [completedSubjects, setCompletedSubjects] = useState([]);
  const [progressData, setProgressData] = useState(null);
  const [liveClass, setLiveClass] = useState(false);
  const [liveClassData, setLiveClassData] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [notes, setNotes] = useState([]);


  // NEW: global attempts cache + warm flag
  const [attemptsCache, setAttemptsCache] = useState({}); // { [lectureId]: meta }
  const [attemptsWarm, setAttemptsWarm] = useState(false);

  /* ------------------------ computeAttemptMeta (shared) ----------------------- */
  const computeAttemptMeta = useCallback(async (lecture, attemptsArr) => {
    const attemptsCount = Array.isArray(attemptsArr) ? attemptsArr.length : 0;
    const rawMax = lecture?.maxAttempts;
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

    const response = await getMockTestStats(uid, lecture._id);
   
    return response
  }, []);

  const prefetchAttempts = useCallback(
    async (lectures = [], uid, concurrency = 6) => {
      if (!uid || !lectures.length) return;

      const toFetch = lectures.filter((l) => !attemptsCache[l._id]);
      if (!toFetch.length) return;

      let idx = 0;

      const worker = async () => {
        while (idx < toFetch.length) {
          const lecture = toFetch[idx++];
          try {
            const res = await getAllUserAttemptByUserId(uid, lecture._id);
            const meta = await computeAttemptMeta(lecture, res?.data || []);
            const viewResults = await viewUserMocktestAttemptResult(
              userId,
              lecture._id
            );
            const canStart = meta.data.start || false;
            setAttemptsCache((prev) => ({
              ...prev,
              [lecture._id]: {
                ...meta,
                max: meta.data.maxAttempts,
                resumetest: meta.data.resume,
                canStart: canStart,
                isUnlimited: meta.data.isUnlimited,
                attemptsCount: meta.data.attemptCount,
                remaining: meta.data.maxAttempts - meta.data.attemptCount,
              },
            }));
          } catch (e) {
            const meta = await computeAttemptMeta(lecture, []);
            setAttemptsCache((prev) => ({
              ...prev,
              [lecture._id]: {
                ...meta,
                max: meta.data.maxAttempts,
                resumetest: meta.data.resume,
                canStart: meta.data.start,
                isUnlimited: meta.data.isUnlimited,
                attemptsCount: meta.data.attemptCount,
                remaining: meta.data.maxAttempts - meta.data.attemptCount,
              },
            }));
          }
        }
      };

      const workers = Array.from(
        { length: Math.min(concurrency, toFetch.length) },
        worker
      );
      await Promise.all(workers);
    },
    [attemptsCache, computeAttemptMeta]
  );

  /* ------------------------------- live class ping --------------------------- */
  useEffect(() => {
    const apiCaller = async () => {
      const cookies = await getCookiesData();
      const liveClassRes = await getLiveMeetings({
        courseIds: [id],
        // studentId: cookies.userId,
      });
      if (Array.isArray(liveClassRes?.data) && liveClassRes.data.length > 0) {
        setLiveClass(true);
        setLiveClassData(liveClassRes.data[0]);
      } else {
        setLiveClass(false);
        setLiveClassData(null);
      }
    };
    apiCaller();
    const intervalId = setInterval(apiCaller, 30000);
    return () => clearInterval(intervalId);
  }, [id]);

  /* ---------------------------- initial course load -------------------------- */
  useEffect(() => {
    const init = async () => {
      const cookies = await getCookiesData();
      setUserId(cookies.userId);

      try {
        const progressResponse = await getCourseByIdWithUSerProgress(
          cookies.userId,
          id
        );
        if (progressResponse?.success) {
          setProgressData(progressResponse.data);
          setCourse(progressResponse.data);

          const lectures = [];
          const subjects = [];
          (progressResponse.data.subjects || []).forEach((subject) => {
            if (subject.completed) subjects.push(subject._id);
            (subject.lectures || []).forEach((lecture) => {
              if (lecture.completed) lectures.push(lecture._id);
            });
          });
          setCompletedLectures(lectures);
          setCompletedSubjects(subjects);
        } else {
          throw new Error("progress fetch failed");
        }
      } catch (error) {
        // console.error("Error fetching course with progress:", error);
        const response = await getCourseById(id);
        if (response?.success) setCourse(response.data);
      }
    };
    init();
  }, [id]);

  /* -------------------------------- notes sync -------------------------------- */
  useEffect(() => {
    if (course?.notes) setNotes(course.notes);
  }, [course]);

  /* ------------------------------ helpers/actions ---------------------------- */
  const handleStartSubject = async (subjectId) => {
    if (!userId || !course?._id || !subjectId) return;
    try {
      await startSubject(userId, course._id, subjectId);
    } catch (err) {
      // console.error("Failed to start subject:", err);
    }
  };

  const handleStartLecture = async (subjectId, lectureId) => {
    if (!userId || !course?._id || !subjectId || !lectureId) return;
    try {
      await startLecturer(userId, course._id, subjectId, lectureId);
    } catch (err) {
      // console.error("Failed to start lecture:", err);
    }
  };

  const handleOpenNote = (note) => {
    if (!note?.fileUrl) {
      return;
    }
    if (note.isDownload) {
      downloadFile(note.fileUrl, note.originalName || `note-${note._id}.pdf`);
    } else {
      setCurrentNote({
        file: note.fileUrl,
        name: note.originalName || `note-${note._id}.pdf`,
        isDownloadable: false,
      });
      setShowPDFViewer(true);
    }
  };

  const fetchMockTestsForSubject = async (subjectId) => {
    try {
      const response = await getMocktestBySubjectId(subjectId);
      return response.data || [];
    } catch (error) {
      // console.error("Error fetching mock tests:", error);
      return [];
    }
  };

  const getAccordionData = async () => {
    if (!course) return { Subjects: [], "Mock Test": [], "Recorded Class": [] };

    const subjects = (course.subjects || []).map((subject) => ({
      _id: subject._id,
      name: subject.subjectDisplayName || "Subject",
      completedPercentage: subject.completedPercentage || 0,
      completed: subject.completed || false,
      lectures: (subject.lectures || []).map((lec) => ({
        _id: lec._id,
        lectureName: lec.lectureName || "Untitled Lecture",
        description: lec.description || "No description available",
        duration: lec.duration || "Duration not specified",
        videoUrl: lec.videoUrl || "#",
        completedPercentage: lec.completedPercentage || 0,
        completed: lec.completed || false,
      })),
    }));

    let mockTestData = [];
    if (course.subjects && course.subjects.length > 0) {
      mockTestData = await Promise.all(
        course.subjects.map(async (subject) => {
          const mockTests = await fetchMockTestsForSubject(subject._id);
          return {
            _id: subject._id,
            name: subject.subjectName || "Subject",
            lectures: mockTests.map((test, idx) => ({
              _id: test._id,
              lectureName: test.title || `Mock Test ${idx + 1}`,
              duration: `${test.number_of_questions ?? "N/A"} Questions | ${test.duration ?? "N/A"
                } mins`,
              maxAttempts: test.maxAttempts,
              videoUrl: "#",
            })),
          };
        })
      );
    }

    const recordedClasses = subjects;

    return {
      Subjects: subjects,
      "Mock Test": mockTestData,
      "Recorded Class": recordedClasses,
    };
  };

  const [accordionData, setAccordionData] = useState({
    Subjects: [],
    "Mock Test": [],
    "Recorded Class": [],
  });

  /* -------- when course ready, build accordion and warm attempts cache ------- */
  useEffect(() => {
    if (!course) return;
    let cancelled = false;

    (async () => {
      const data = await getAccordionData();
      if (cancelled) return;
      setAccordionData(data);

      // Warm attempts cache immediately (once) so Mock Test tab is instant
      if (!attemptsWarm && userId) {
        const allMockLectures = (data["Mock Test"] || []).flatMap(
          (s) => s.lectures || []
        );
        prefetchAttempts(allMockLectures, userId).finally(() =>
          setAttemptsWarm(true)
        );
      }
    })();

    return () => {
      cancelled = true;
    };
    // include userId so we warm once we have it
  }, [course, userId, attemptsWarm, prefetchAttempts]);

  /* ------------------------------ progress (optional) ------------------------ */
  const calculateProgress = () => {
    if (!progressData || !progressData.subjects) return 0;
    let totalLectures = 0;
    let completed = 0;
    progressData.subjects.forEach((subject) => {
      if (subject.lectures) {
        totalLectures += subject.lectures.length;
        subject.lectures.forEach((lecture) => {
          if (lecture.completed) completed++;
        });
      }
    });
    return totalLectures > 0
      ? Math.round((completed / totalLectures) * 100)
      : 0;
  };

  const filteredData = (accordionData[activeTab] || []).filter(
    (item) => Array.isArray(item.lectures) && item.lectures.length > 0
  );

  return (
    <PageWrapper>
      <Header>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon>
            <FaArrowLeft />
          </BackIcon>
        </BackLink>
        <MainTitle>{course?.courseDisplayName || "Course Name"}</MainTitle>
      </Header>

      <CourseInfo>
        <HeaderSection>
          <CourseDetails>
            <button
              style={{ border: "none", background: "transparent" }}
              onClick={async () => {
                const cookiesData = await getCookiesData();
                const userData = await getUserByUserId(cookiesData.userId);
                // navigate(`/user/meeting-join`, {
                //   state: {
                //     meetingNumber: liveClassData?.zoom_meeting_id,
                //     passWord: liveClassData?.zoom_passcode,
                //     meetingTitle: liveClassData?.meeting_title,
                //     role: 1,
                //     userName: userData.user.displayName || "React",
                //     userEmail: userData.user.email || "",
                //     leaveUrl: `/continueCourse/${id}`,
                //   },
                // });
                 navigate(`/zoom-meeting`, {
                  state: {
                    meetingNumber: liveClassData?.zoom_meeting_id,
                    passWord: liveClassData?.zoom_passcode,
                    meetingTitle: liveClassData?.meeting_title,
                    role: 0,
                    userName: userData.user.displayName || "React",
                    userEmail: userData.user.email || "",
                    leaveUrl: `/continueCourse/${id}`,
                  },
                  replace: true 
                });
              }}
            >
              {liveClass && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "24px", marginTop: "14px" }}>
                    Join Live Class Now
                  </p>
                  <BlinkingIcon>
                    <MdLiveTv color="#ff4757" size={28} />
                  </BlinkingIcon>
                </div>
              )}
            </button>
            <Statdesc>{/* ✅Progress: {calculateProgress()}% */}</Statdesc>
          </CourseDetails>
        </HeaderSection>
      </CourseInfo>

      {course?.live_class && (
        <LiveClass>
          Live Class{" "}
          <TVIcon>
            <MdLiveTv />
          </TVIcon>
        </LiveClass>
      )}

      {notes.length > 0 && (
        <NotesSection>
          <h3>Course Notes</h3>
          {notes.map((note) => (
            <NoteItem
              key={note._id}
              onClick={() => handleOpenNote(note)}
              isDownloadable={note.isDownload}
            >
              <div className="note-icon">
                <FaFilePdf />
                {note.isDownload && (
                  <FaDownload
                    className="download-icon"
                    style={{ color: "green" }}
                  />
                )}
              </div>
              <div className="note-info">
                <h4>{note.name || "Untitled Note"}</h4>
                <p>{note.isDownload ? "Downloadable" : "View Only"}</p>
              </div>
            </NoteItem>
          ))}
        </NotesSection>
      )}

      {showPDFViewer && currentNote && (
        <PDFViewer
          file={currentNote.file}
          isDownloadable={currentNote.isDownloadable}
          onClose={() => setShowPDFViewer(false)}
        />
      )}

      <TabSection>
        <button
          className={activeTab === "Subjects" ? "active" : ""}
          onClick={() => {
            setActiveTab("Subjects");
            setActiveAccordion(null);
          }}
        >
          Subject
        </button>
        {/* <button
          className={activeTab === "Mock Test" ? "active" : ""}
          onClick={() => {
            setActiveTab("Mock Test");
            setActiveAccordion(null);
          }}
        >
          Mock Test
        </button> */}
      </TabSection>

      <AccordionList
        data={filteredData}
        activeIndex={activeAccordion}
        onClick={async (newIndex) => {
          setActiveAccordion(newIndex);
          if (newIndex !== null && activeTab === "Subjects") {
            const subject = accordionData.Subjects[newIndex];
            if (subject?._id) await handleStartSubject(subject._id);
          }
        }}
        navigate={navigate}
        courseId={course?._id}
        handleStartSubject={handleStartSubject}
        handleStartLecture={handleStartLecture}
        completedLectures={completedLectures}
        completedSubjects={completedSubjects}
        isMockTestTab={activeTab === "Mock Test"}
        userId={userId}
        /* NEW: pass warmed cache */
        attemptsData={attemptsCache}
      />
    </PageWrapper>
  );
};

export default ContinueCourse;
