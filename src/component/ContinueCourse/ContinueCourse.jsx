// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   PageWrapper,
//   Header,
//   BackLink,
//   BackIcon,
//   MainTitle,
//   CourseImage,
//   HeaderSection,
//   Rating,
//   CourseDetails,
//   PlayButton,
//   CourseSubject,
//   CourseStats,
//   LiveClass,
//   TVIcon,
//   StatLink,
//   Statdesc,
//   StarContainer,
//   CourseInfo,
//   FeaturesContainer,
//   FeatureColumn,
//   FeatureItem,
//   TabSection,
//   VideoList,
//   VideoItem,
//   Playbutton,
//   NoteItem,
//   NotesSection,
//   Bullet,
//   BlinkingIcon
// } from "./ContinueCourse.styles";
// import { FaFilePdf, FaDownload } from "react-icons/fa"; // Add these imports at the top

// import courseImgFallback from "../../assets/courseDetails.png";
// import { getCourseById } from "../../api/courseApi";
// import { getMocktestBySubjectId } from "../../api/mocktestApi";
// import {
//   getCourseByIdWithUSerProgress,
//   startCourse,
//   startSubject,
//   startLecturer
// } from "../../api/userProgressApi";
// import { getCookiesData } from "../../utils/cookiesService";
// import {
//   FaArrowLeft,
//   FaPlay,
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
//   FaChevronDown,
//   FaChevronUp,
//   FaCheckCircle
// } from "react-icons/fa";
// import { MdLiveTv } from "react-icons/md";
// import { getLiveMeetings } from "../../api/meetingApi";
// import { getUserByUserId } from "../../api/authApi";
// import { getAllUserAttemptByUserId } from "../../api/mocktestApi";
// import PDFViewer from "../../module/admin/component/PdfViewer/PdfViewer";

// const downloadFile = (url, fallbackName = "download.pdf") => {
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = fallbackName; // browsers may override via Content-Disposition
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

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
//   userId
// }) => {
//   const [attemptsData, setAttemptsData] = React.useState({});
//   const [attemptsLoading, setAttemptsLoading] = React.useState({}); // per-lecture loading flags

//   // Helper to normalize attempts math safely
//   const computeAttemptMeta = (lecture, attemptsArr) => {
//     const attemptsCount = Array.isArray(attemptsArr) ? attemptsArr.length : 0;

//     // Treat undefined/null as Unlimited
//     const rawMax = lecture?.maxAttempts;
//     const hasFiniteMax =
//       rawMax !== null && rawMax !== undefined && Number.isFinite(Number(rawMax));

//     const max = hasFiniteMax ? Number(rawMax) : Infinity;
//     const remaining = Number.isFinite(max)
//       ? Math.max(max - attemptsCount, 0)
//       : Infinity;

//     return { attemptsCount, max, remaining, isUnlimited: !Number.isFinite(max) };
//   };

//   // Batch prefetcher with caching: only fetch lectures we don't have yet
//   const prefetchAttemptsForLectures = React.useCallback(
//     async (lectures = [], uid) => {
//       if (!uid || !lectures.length) return;

//       const toFetch = lectures.filter((l) => !attemptsData[l._id]);
//       if (!toFetch.length) return; // everything already cached

//       setAttemptsLoading((prev) => {
//         const next = { ...prev };
//         toFetch.forEach((l) => (next[l._id] = true));
//         return next;
//       });

//       try {
//         const results = await Promise.all(
//           toFetch.map(async (lecture) => {
//             try {
//               const res = await getAllUserAttemptByUserId(uid, lecture._id);
//               const meta = computeAttemptMeta(lecture, res?.data || []);
//               return [lecture._id, { attempts: res?.data || [], ...meta }];
//             } catch (error) {
//               console.error("Error fetching attempts:", error);
//               const meta = computeAttemptMeta(lecture, []);
//               return [lecture._id, { attempts: [], ...meta }];
//             }
//           })
//         );

//         // Merge into cache (do not overwrite existing)
//         setAttemptsData((prev) => {
//           const merged = { ...prev };
//           results.forEach(([id, val]) => (merged[id] = val));
//           return merged;
//         });
//       } finally {
//         setAttemptsLoading((prev) => {
//           const next = { ...prev };
//           toFetch.forEach((l) => delete next[l._id]);
//           return next;
//         });
//       }
//     },
//     [attemptsData]
//   );

//   // 1) Prefetch ALL mock tests when the Mock Test tab is opened (one-time cache)
//   React.useEffect(() => {
//     if (!isMockTestTab || !userId || !Array.isArray(data)) return;
//     const allLectures = data.flatMap((s) => s?.lectures || []);
//     if (allLectures.length) prefetchAttemptsForLectures(allLectures, userId);
//   }, [isMockTestTab, userId, data, prefetchAttemptsForLectures]);

//   // 2) Ensure the expanded subject is prefetched (fast no-op if cached)
//   React.useEffect(() => {
//     if (!isMockTestTab || !userId) return;
//     if (activeIndex === null || activeIndex === undefined) return;

//     const subject = data?.[activeIndex];
//     if (!subject || !Array.isArray(subject.lectures)) return;

//     prefetchAttemptsForLectures(subject.lectures, userId);
//   }, [data, isMockTestTab, userId, activeIndex, prefetchAttemptsForLectures]);

//   return (
//     <VideoList>
//       {data && data.length === 0 && <p style={{ padding: 24 }}>No items found.</p>}
//       {data &&
//         data.map((item, idx) => (
//           <div key={item._id || idx}>
//             <VideoItem
//               style={{
//                 background: "#f5f6fa",
//                 boxShadow: activeIndex === idx ? "0 2px 8px #eee" : "none",
//                 position: "relative"
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
//                   marginTop: 4
//                 }}
//               >
//                 {item.lectures && item.lectures.length > 0 ? (
//                   item.lectures.map((lecture, i) => {
//                     // ----- Mock Test Row -----
//                     if (isMockTestTab) {
//                       const meta = attemptsData[lecture._id];
//                       const isLoading = !!attemptsLoading[lecture._id];

//                       // simple skeleton chips
//                       const Skeleton = () => (
//                         <div style={{ display: "flex", gap: 8 }}>
//                           <div
//                             style={{
//                               height: 30,
//                               width: 110,
//                               borderRadius: 4,
//                               background: "#eee"
//                             }}
//                           />
//                           <div
//                             style={{
//                               height: 30,
//                               width: 100,
//                               borderRadius: 4,
//                               background: "#eee"
//                             }}
//                           />
//                         </div>
//                       );

//                       // build info line + button conditions
//                       let infoLine = lecture.duration;
//                       let showRemaining = false;
//                       let remainingText = "";
//                       let showViewResults = false;
//                       let canStart = true;

//                       if (!isLoading && meta) {
//                         const { attemptsCount, isUnlimited, max, remaining } = meta;

//                         showViewResults = attemptsCount > 0;
//                         canStart =
//                           isUnlimited || (Number.isFinite(remaining) && remaining > 0);

//                         const maxText = isUnlimited
//                           ? "Unlimited"
//                           : Number.isFinite(max)
//                           ? max
//                           : lecture.maxAttempts ?? "Unlimited";
//                         infoLine = `${lecture.duration} | Max Attempts: ${maxText}`;

//                         if (!isUnlimited && Number.isFinite(remaining) && remaining > 0) {
//                           showRemaining = true;
//                           remainingText = ` | Remaining: ${remaining}`;
//                         }
//                       } else if (!meta) {
//                         const maxText =
//                           lecture.maxAttempts == null ? "Unlimited" : lecture.maxAttempts;
//                         infoLine = `${lecture.duration} | Max Attempts: ${maxText}`;
//                       }

//                       return (
//                         <VideoItem
//                           key={lecture._id || i}
//                           style={{
//                             boxShadow: "none",
//                             background: "none",
//                             cursor: "pointer",
//                             marginBottom: 4,
//                             padding: "12px 0",
//                             borderBottom: "1px solid #eee"
//                           }}
//                         >
//                           <div className="video-info" style={{ width: "100%" }}>
//                             <FaPlay style={{ marginRight: 12, color: "#007bff" }} />
//                             <div
//                               style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 width: "100%"
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
//                                   marginTop: 4
//                                 }}
//                               >
//                                 <span style={{ fontSize: 14, color: "#888" }}>
//                                   {infoLine}
//                                   {showRemaining ? remainingText : ""}
//                                 </span>

//                                 <div style={{ display: "flex", gap: 8 }}>
//                                   {isLoading ? (
//                                     <Skeleton />
//                                   ) : (
//                                     <>
//                                       {showViewResults && (
//                                         <button
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             navigate(
//                                               `/user-view-results/${userId}/${lecture._id}`
//                                             );
//                                           }}
//                                           style={{
//                                             background: "transparent",
//                                             border: "1px solid #4CAF50",
//                                             color: "#4CAF50",
//                                             padding: "4px 8px",
//                                             borderRadius: 4,
//                                             fontSize: 14
//                                           }}
//                                         >
//                                           View Results
//                                         </button>
//                                       )}

//                                       {canStart && (
//                                         <div
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             navigate(
//                                               `/start-test/${lecture._id}/${item._id}`
//                                             );
//                                           }}
//                                           style={{
//                                             fontSize: 14,
//                                             color: "#007bff",
//                                             textDecoration: "none",
//                                             cursor: "pointer",
//                                             padding: "4px 8px",
//                                             border: "1px solid #007bff",
//                                             borderRadius: 4
//                                           }}
//                                         >
//                                           Start Test
//                                         </div>
//                                       )}
//                                     </>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </VideoItem>
//                       );
//                     }

//                     // ----- Normal lectures (unchanged) -----
//                     return (
//                       <VideoItem
//                         key={lecture._id || i}
//                         style={{
//                           boxShadow: "none",
//                           background: "none",
//                           cursor: "pointer",
//                           marginBottom: 4,
//                           padding: "12px 0",
//                           borderBottom: "1px solid #eee"
//                         }}
//                         onClick={async () => {
//                           await handleStartLecture(item._id, lecture._id);
//                           navigate(
//                             `/course/liveclass/${courseId}/${item._id}/${lecture._id}`
//                           );
//                         }}
//                       >
//                         <div className="video-info" style={{ width: "100%" }}>
//                           <FaPlay style={{ marginRight: 12, color: "#007bff" }} />
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               width: "100%"
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
//                                 margin: "4px 0"
//                               }}
//                               dangerouslySetInnerHTML={{
//                                 __html: lecture.description
//                               }}
//                             />
//                             <div
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 width: "100%"
//                               }}
//                             >
//                               <span style={{ fontSize: 14, color: "#888" }} />
//                               <div
//                                 style={{
//                                   fontSize: 14,
//                                   color: "#007bff",
//                                   textDecoration: "none"
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

// const ContinueCourse = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [activeTab, setActiveTab] = useState("Subjects");
//   const [activeAccordion, setActiveAccordion] = useState(null);
//   const [course, setCourse] = useState(null);
//   const [showContent, setShowContent] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [completedLectures, setCompletedLectures] = useState([]);
//   const [completedSubjects, setCompletedSubjects] = useState([]);
//   const [progressData, setProgressData] = useState(null);
//   const [mockTestsBySubject, setMockTestsBySubject] = useState({});
//   const [liveClass, setLiveClass] = useState(false);
//   const [liveClassData, setLiveClassData] = useState(null);
//   const [currentNote, setCurrentNote] = useState(null);
//   const [showPDFViewer, setShowPDFViewer] = useState(false);
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const apiCaller = async () => {
//       const cookies = await getCookiesData();
//       const liveClass = await getLiveMeetings({
//         courseIds: [id],
//         studentId: cookies.userId
//       });
//       if (liveClass.data.length > 0) {
//         setLiveClass(true);
//         setLiveClassData(liveClass.data[0]);
//       }
//     };
//     apiCaller();
//     const intervalId = setInterval(apiCaller, 30000);
//     return () => clearInterval(intervalId);
//   }, [id]);

//   useEffect(() => {
//     const init = async () => {
//       const cookies = await getCookiesData();
//       setUserId(cookies.userId);

//       try {
//         const progressResponse = await getCourseByIdWithUSerProgress(
//           cookies.userId,
//           id
//         );
//         if (progressResponse?.success) {
//           setProgressData(progressResponse.data);
//           setCourse(progressResponse.data);

//           const lectures = [];
//           const subjects = [];

//           (progressResponse.data.subjects || []).forEach((subject) => {
//             if (subject.completed) {
//               subjects.push(subject._id);
//             }
//             (subject.lectures || []).forEach((lecture) => {
//               if (lecture.completed) {
//                 lectures.push(lecture._id);
//               }
//             });
//           });

//           setCompletedLectures(lectures);
//           setCompletedSubjects(subjects);
//         }
//       } catch (error) {
//         console.error("Error fetching course with progress:", error);
//         const response = await getCourseById(id);
//         if (response?.success) {
//           setCourse(response.data);
//         }
//       }
//     };
//     init();
//   }, [id]);

//   const fetchMockTestsForSubject = async (subjectId) => {
//     try {
//       const response = await getMocktestBySubjectId(subjectId);
//       return response.data || [];
//     } catch (error) {
//       console.error("Error fetching mock tests:", error);
//       return [];
//     }
//   };

//   // const handleStartCourse = async () => {
//   //   if (!userId || !course?._id) return;
//   //   try {
//   //     await startCourse(userId, course._id);
//   //     setShowContent(true);
//   //   } catch (err) {
//   //     console.error("Failed to start course:", err);
//   //   }
//   // };

//   const handleStartSubject = async (subjectId) => {
//     if (!userId || !course?._id || !subjectId) return;
//     try {
//       await startSubject(userId, course._id, subjectId);
//     } catch (err) {
//       console.error("Failed to start subject:", err);
//     }
//   };

//   const handleStartLecture = async (subjectId, lectureId) => {
//     if (!userId || !course?._id || !subjectId || !lectureId) return;
//     try {
//       await startLecturer(userId, course._id, subjectId, lectureId);
//     } catch (err) {
//       console.error("Failed to start lecture:", err);
//     }
//   };

//   // const handleOpenNote = (note) => {
//   //   if (!note?.fileUrl) return;

//   //   if (note.isDownload) {
//   //     // direct download
//   //     downloadFile(note.fileUrl, note.originalName || `note-${note._id}.pdf`);
//   //   } else {
//   //     // view inside PDFViewer (read-only)
//   //     setCurrentNote({ file: note.fileUrl, isDownloadable: false });
//   //     setShowPDFViewer(true);
//   //   }
//   // };
//   const handleOpenNote = (note) => {
//     if (!note?.fileUrl) {
//       console.error('No file URL found for this note');
//       return;
//     }

//     if (note.isDownload) {
//       // Direct download for downloadable notes
//       downloadFile(note.fileUrl, note.originalName || `note-${note._id}.pdf`);
//     } else {
//       // Show in modal for non-downloadable notes
//       setCurrentNote({
//         file: note.fileUrl,
//         name: note.originalName || `note-${note._id}.pdf`,
//         isDownloadable: false
//       });
//       setShowPDFViewer(true);
//     }
//   };

//   useEffect(() => {
//     if (course?.notes) {
//       setNotes(course.notes);
//     }
//   }, [course]);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating - fullStars >= 0.5;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//     for (let i = 0; i < fullStars; i++)
//       stars.push(<FaStar key={`full-${i}`} color="#fbc02d" />);
//     if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" color="#fbc02d" />);
//     for (let i = 0; i < emptyStars; i++)
//       stars.push(<FaRegStar key={`empty-${i}`} color="#ccc" />);
//     return stars;
//   };

//   const getAccordionData = async () => {
//     if (!course) return { Subjects: [], "Mock Test": [], "Recorded Class": [] };

//     const subjects = (course.subjects || []).map((subject) => ({
//       _id: subject._id,
//       name: subject.subjectName || "Subject",
//       completedPercentage: subject.completedPercentage || 0,
//       completed: subject.completed || false,
//       lectures: (subject.lectures || []).map((lec) => ({
//         _id: lec._id,
//         lectureName: lec.lectureName || "Untitled Lecture",
//         description: lec.description || "No description available",
//         duration: lec.duration || "Duration not specified",
//         videoUrl: lec.videoUrl || "#",
//         completedPercentage: lec.completedPercentage || 0,
//         completed: lec.completed || false
//       }))
//     }));

//     let mockTestData = [];
//     if (course.subjects && course.subjects.length > 0) {
//       mockTestData = await Promise.all(
//         course.subjects.map(async (subject) => {
//           const mockTests = await fetchMockTestsForSubject(subject._id);
//           return {
//             _id: subject._id,
//             name: subject.subjectName || "Subject",
//             lectures: mockTests.map((test, idx) => ({
//               _id: test._id,
//               lectureName: test.title || `Mock Test ${idx + 1}`,
//               // description: test.description || "Mock test for practice",
//               duration: `${test.number_of_questions || "N/A"
//                 } Questions | ${test.duration || "N/A"} mins`,
//               maxAttempts: test.maxAttempts,
//               videoUrl: "#"
//             }))
//           };
//         })
//       );
//     }

//     const recordedClasses = subjects;

//     return {
//       Subjects: subjects,
//       "Mock Test": mockTestData,
//       "Recorded Class": recordedClasses
//     };
//   };

//   const [accordionData, setAccordionData] = useState({
//     Subjects: [],
//     "Mock Test": [],
//     "Recorded Class": []
//   });

//   useEffect(() => {
//     if (course) {
//       getAccordionData().then((data) => {
//         setAccordionData(data);
//       });
//     }
//   }, [course, activeTab]);

//   const calculateProgress = () => {
//     if (!progressData || !progressData.subjects) return 0;

//     let totalLectures = 0;
//     let completed = 0;

//     progressData.subjects.forEach((subject) => {
//       if (subject.lectures) {
//         totalLectures += subject.lectures.length;
//         subject.lectures.forEach((lecture) => {
//           if (lecture.completed) completed++;
//         });
//       }
//     });

//     return totalLectures > 0
//       ? Math.round((completed / totalLectures) * 100)
//       : 0;
//   };

//   const featuresArray = course?.course_includes?.length
//     ? [course.course_includes]
//     : [
//       ["Comprehensive Curriculum", "Expert Faculty", "Live & Recorded Session"],
//       ["Regular Mock Tests", "Personalized Guidance", "Daily Updates"]
//     ];

//     const filteredData = (accordionData[activeTab] || []).filter(
//   item => Array.isArray(item.lectures) && item.lectures.length > 0
// );

//   return (

//     <PageWrapper>
//       <Header>
//         <BackLink onClick={() => navigate(-1)}>
//           <BackIcon>
//             <FaArrowLeft />
//           </BackIcon>
//         </BackLink>
//         <MainTitle>
//           {course?.courseDisplayName || "Course Name"}
//           {/* <span> {course?.courseName || ""}</span> */}
//         </MainTitle>
//       </Header>

//       {/* <CourseImage src={course?.image || courseImgFallback} alt="Course" /> */}

//       <CourseInfo>
//         <HeaderSection>
//           {/* <Rating>
//             {course?.course_rating || 0}
//             <StarContainer>{renderStars(course?.course_rating || 0)}</StarContainer>
//           </Rating> */}
//           <CourseDetails>

//             {/* <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <PlayButton >
//                 <span>
//                   <FaPlay />
//                 </span>
//               </PlayButton>
//               <div>
//                 <CourseSubject style={{ cursor: "pointer" }}>
//                   {course?.courseDisplayName || "Course Title"}
//                 </CourseSubject>
//                 {/* <CourseStats>
//                   <StatLink>{course?.no_of_videos || 0} Videos</StatLink> |
//                   <StatLink>{course?.no_of_subjects || 0} Subjects</StatLink> |
//                   <StatLink>{course?.no_of_notes || 0} Notes</StatLink>
//                 </CourseStats> */}
//               {/* </div> */}
//             {/* </div> */}

//             <button
//               style={{
//                 border: "none",
//                 background: "transparent"
//               }}
//               onClick={async () => {
//                 const cookiesData = await getCookiesData();
//                 const userData = await getUserByUserId(cookiesData.userId);
//                 // navigate(`/zoom-meeting`, {
//                 //   state: {
//                 //     meetingNumber: liveClassData?.zoom_meeting_id,
//                 //     passWord: liveClassData?.zoom_passcode,
//                 //     meetingTitle: liveClassData?.meeting_title,
//                 //     role: 1,
//                 //     userName: userData.user.displayName || "React",
//                 //     userEmail: userData.user.email || "",
//                 //     leaveUrl: `/continueCourse/${id}`
//                 //   }
//                 // });
//                 navigate(`/user/meeting-join`, {
//                   state: {
//                     meetingNumber: liveClassData?.zoom_meeting_id,
//                     passWord: liveClassData?.zoom_passcode,
//                     meetingTitle: liveClassData?.meeting_title,
//                     role: 1,
//                     userName: userData.user.displayName || "React",
//                     userEmail: userData.user.email || "",
//                     leaveUrl: `/continueCourse/${id}`
//                   }
//                 });
//               }}
//             >
//               {liveClass && (
//                 <div style={{ display: "flex", alignItems: "center", gap: "12px",  justifyContent: "center"}}>
//                   <p style={{ fontSize: "24px" ,marginTop: "14px"}}>Join Live Class Now</p>
//                   <BlinkingIcon>
//                     <MdLiveTv color="#ff4757" size={28}  />
//                   </BlinkingIcon>
//                 </div>
//               )}
//             </button>
//             <Statdesc>
//               {/* 📅 Duration: {course?.duration || "N/A"} | 🏆 Success Rate:{" "} */}
//               {/* {
//               course?.successRate ? `${course.successRate}%` : "N/A"} |  */}
//               {/* ✅Progress: {calculateProgress()}% */}
//             </Statdesc>
//             {/* <Statdesc>
//               📝 Description: {course?.description || "N/A"
//               }{" "}
//             </Statdesc> */}

//             {/* <FeaturesContainer>
//               {featuresArray.map((column, colIndex) => (
//                 <FeatureColumn key={colIndex}>
//                   {column.map((feature, i) => (
//                     <FeatureItem key={i}>
//                       <Bullet>•</Bullet>
//                       <span>{feature}</span>
//                     </FeatureItem>
//                   ))}
//                 </FeatureColumn>
//               ))}
//             </FeaturesContainer> */}
//             {/* <Statdesc
//               // style={{ color: "#000", fontWeight: "400", fontSize: "24px" }}
//               dangerouslySetInnerHTML={{ __html: course?.description || "N/A" }} /> */}
//           </CourseDetails>
//         </HeaderSection>

//       </CourseInfo>

//       {course?.live_class && (
//         <LiveClass>
//           Live Class{" "}
//           <TVIcon>
//             <MdLiveTv />
//           </TVIcon>
//         </LiveClass>
//       )}

//       {/* {showPDFViewer && currentNote && (
//   <PDFViewer
//     file={currentNote.file}
//     isDownloadable={currentNote.isDownloadable}
//     onClose={() => setShowPDFViewer(false)}
//   />
// )} */}

//       {notes.length > 0 && (
//         <NotesSection>
//           <h3>Course Notes</h3>
//           {notes.map((note) => (
//             <NoteItem
//               key={note._id}
//               onClick={() => handleOpenNote(note)}
//               isDownloadable={note.isDownload}
//             >
//               <div className="note-icon">
//                 <FaFilePdf />
//                 {note.isDownload && <FaDownload className="download-icon" style={{ color: "green" }} />}
//               </div>
//               <div className="note-info">
//                 <h4>{note.name || 'Untitled Note'}</h4>
//                 <p>{note.isDownload ? 'Downloadable' : 'View Only'}</p>
//               </div>
//             </NoteItem>
//           ))}
//         </NotesSection>
//       )}
//       {showPDFViewer && currentNote && (
//         <PDFViewer
//           file={currentNote.file}
//           isDownloadable={currentNote.isDownloadable}
//           onClose={() => setShowPDFViewer(false)}
//         />
//       )}

//       <TabSection>
//         <button
//           className={activeTab === "Subjects" ? "active" : ""}
//           onClick={() => {
//             setActiveTab("Subjects");
//             setActiveAccordion(null);
//           }}
//         >
//         Video Lectures
//         </button>
//         <button
//           className={activeTab === "Mock Test" ? "active" : ""}
//           onClick={() => {
//             setActiveTab("Mock Test");
//             setActiveAccordion(null);
//           }}
//         >
//           Mock Test
//         </button>
//         {/* {course?.recorded_class && (
//           <button
//             className={activeTab === "Recorded Class" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("Recorded Class");
//               setActiveAccordion(null);
//             }}
//           >
//             Recorded Class
//           </button>
//         )} */}
//       </TabSection>
//       <AccordionList
//       data={filteredData}
//         activeIndex={activeAccordion}
//         onClick={async (newIndex) => {
//           setActiveAccordion(newIndex);
//           if (newIndex !== null && activeTab === "Subjects") {
//             // start this subject when expanded:
//             const subject = accordionData.Subjects[newIndex];
//             await handleStartSubject(subject._id);
//           }
//         }}
//         navigate={navigate}
//         courseId={course?._id}
//         handleStartSubject={handleStartSubject}
//         handleStartLecture={handleStartLecture}
//         completedLectures={completedLectures}
//         completedSubjects={completedSubjects}
//         isMockTestTab={activeTab === "Mock Test"}
//         userId={userId}
//       />

//     </PageWrapper>

//   );
// };

// export default ContinueCourse;

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

/* ====================================================================== */
/*                           AccordionList (child)                        */
/*  - Now receives warmed attemptsData from parent (no heavy fetching)    */
/*  - Optimistic UI: Start/View buttons render instantly                  */
/* ====================================================================== */
const AccordionList = ({
  data,
  activeIndex,
  onClick,
  navigate,
  courseId,
  handleStartSubject,
  handleStartLecture,
  completedLectures = [],
  completedSubjects = [],
  isMockTestTab = false,
  userId,
  attemptsData = {}, // <— cache injected from parent
}) => {
  const [resumeTests, setResumeTests] = React.useState({});


  // Fetch resumetest for lectures when data changes
  React.useEffect(() => {
    const apiCaller = async () => {
      data.map((item, idx) => {
        item.lectures.map(async (lecture, i) => {
          attemptsData[lecture._id];
          const response = await checkMockTestAttempted(
            userId,
            lecture._id,
            item._id
          );
          attemptsData[lecture._id].resumetest = response.success || false;
          // console.log("resumetest",   attemptsData[lecture._id]);
        });
      });
    };
    apiCaller();
  }, [attemptsData]);
  return (
    <VideoList>
      {data && data.length === 0 && (
        <p style={{ padding: 24 }}>No items found.</p>
      )}

      {data &&
        data.map((item, idx) => (
          <div key={item._id || idx}>
            <VideoItem
              style={{
                background: "#f5f6fa",
                boxShadow: activeIndex === idx ? "0 2px 8px #eee" : "none",
                position: "relative",
              }}
              onClick={async () => {
                const newIndex = idx === activeIndex ? null : idx;
                onClick(newIndex);
                if (newIndex !== null && !isMockTestTab) {
                  await handleStartSubject(item._id);
                }
              }}
            >
              <div className="video-info">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: 600 }}>{item.name}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.completed && (
                  <FaCheckCircle style={{ color: "green", marginRight: 10 }} />
                )}
                <Playbutton>
                  {activeIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </Playbutton>
              </div>
            </VideoItem>

            {activeIndex === idx && (
              <div
                style={{
                  paddingLeft: 24,
                  background: "#fff",
                  borderRadius: 8,
                  marginTop: 4,
                }}
              >
                {item.lectures && item.lectures.length > 0 ? (
                  item.lectures.map((lecture, i) => {
                    /* ------------------------- Mock Test Row ------------------------- */
                    if (isMockTestTab) {
                      const meta = attemptsData[lecture._id];

                      // instant defaults
                      const defaultMaxText =
                        lecture.maxAttempts == null
                          ? "Unlimited"
                          : lecture.maxAttempts;

                      const infoLine = meta
                        ? `${lecture.duration} | Max Attempts: ${
                            meta.isUnlimited ? "Unlimited" : meta.max
                          }`
                        : `${lecture.duration} | Max Attempts: ${defaultMaxText}`;

                      const showViewResults = !!meta && meta.attemptsCount > 0;
                      // console.log("meta", meta);
                      // console.log(
                      //   "showViewResults",
                      //   userId,
                      //   lecture._id,
                      //   item._id
                      // );
                      // let resumetest = false;
                      // checkMockTestAttempted(userId, lecture._id, item._id)
                      //   .then((res) => {
                      //     console.log("resumetest bb  ", res);
                      //     resumetest = res.success;
                      //   })
                      //   .catch((err) => {
                      //     // console.log("resumetest", err);
                      //     resumetest = false;
                      //   });
                      // console.log("resumetest answer", resumetest);
                      // Optimistic: allow Start while meta is warming
                      const canStart = !meta
                        ? true
                        : meta.isUnlimited ||
                          (Number.isFinite(meta.remaining) &&
                            meta.remaining > 0);

                      const remainingText =
                        meta &&
                        !meta.isUnlimited &&
                        Number.isFinite(meta.remaining) &&
                        meta.remaining > 0
                          ? ` | Remaining: ${meta.remaining}`
                          : " | Remaining:0";

                      return (
                        <VideoItem
                          key={lecture._id || i}
                          style={{
                            boxShadow: "none",
                            background: "none",
                            cursor: "pointer",
                            marginBottom: 4,
                            padding: "12px 0",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          <div className="video-info" style={{ width: "100%" }}>
                            <FaPlay
                              style={{ marginRight: 12, color: "#007bff" }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <p style={{ fontSize: 16, fontWeight: 500 }}>
                                {lecture.lectureName}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  alignItems: "center",
                                  marginTop: 4,
                                }}
                              >
                                <span style={{ fontSize: 14, color: "#888" }}>
                                  {infoLine}
                                  {remainingText}
                                </span>

                                <div style={{ display: "flex", gap: 8 }}>
                                  {showViewResults && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                          `/user-view-results/${userId}/${lecture._id}`
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

                                  {meta?.resumetest ? (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                          `/start-test/${lecture._id}/${item._id}`
                                        );
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
                                        navigate(
                                          `/start-test/${lecture._id}/${item._id}`
                                        );
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </VideoItem>
                      );
                    }

                    /* ------------------ Normal lecture rows (unchanged) ----------------- */
                    return (
                      <VideoItem
                        key={lecture._id || i}
                        style={{
                          boxShadow: "none",
                          background: "none",
                          cursor: "pointer",
                          marginBottom: 4,
                          padding: "12px 0",
                          borderBottom: "1px solid #eee",
                        }}
                        onClick={async () => {
                          await handleStartLecture(item._id, lecture._id);
                          navigate(
                            `/course/liveclass/${courseId}/${item._id}/${lecture._id}`
                          );
                        }}
                      >
                        <div className="video-info" style={{ width: "100%" }}>
                          <FaPlay
                            style={{ marginRight: 12, color: "#007bff" }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <p style={{ fontSize: 16, fontWeight: 500 }}>
                              {lecture.lectureName}
                              {lecture.completed && (
                                <FaCheckCircle
                                  style={{ color: "green", marginLeft: 6 }}
                                />
                              )}
                            </p>
                            <p
                              style={{
                                fontSize: 14,
                                color: "#666",
                                margin: "4px 0",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: lecture.description,
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <span style={{ fontSize: 14, color: "#888" }} />
                              <div
                                style={{
                                  fontSize: 14,
                                  color: "#007bff",
                                  textDecoration: "none",
                                }}
                              >
                                Join Class
                              </div>
                            </div>
                          </div>
                        </div>
                      </VideoItem>
                    );
                  })
                ) : (
                  <div style={{ padding: "16px 8px", color: "#888" }}>
                    No {isMockTestTab ? "mock tests" : "lectures"} found.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
    </VideoList>
  );
};

/* ====================================================================== */
/*                           ContinueCourse (parent)                      */
/*  - Builds accordion data                                               */
/*  - Warms attempts cache right after course+subjects are ready          */
/*  - Passes attemptsData to AccordionList                                */
/* ====================================================================== */
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
  const computeAttemptMeta = useCallback((lecture, attemptsArr) => {
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
    return {
      attempts: attemptsArr || [],
      attemptsCount,
      max,
      remaining,
      isUnlimited: !Number.isFinite(max),
    };
  }, []);

  /* ---------------- concurrency-limited attempts prefetcher ------------------- */
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
            const meta = computeAttemptMeta(lecture, res?.data || []);
            console.log("getAllUserAttemptByUserId", lecture);
            setAttemptsCache((prev) => ({
              ...prev,
              [lecture._id]: {...meta,resumetest: false},
            }));
          } catch (e) {
            const meta = computeAttemptMeta(lecture, []);
            setAttemptsCache((prev) => ({ ...prev, [lecture._id]: {...meta,resumetest: false} }));
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
        studentId: cookies.userId,
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
        console.error("Error fetching course with progress:", error);
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

  const handleOpenNote = (note) => {
    if (!note?.fileUrl) {
      console.error("No file URL found for this note");
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

  /* ------------------------ build accordion data (subjects/mock) ------------- */
  const fetchMockTestsForSubject = async (subjectId) => {
    try {
      const response = await getMocktestBySubjectId(subjectId);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching mock tests:", error);
      return [];
    }
  };

  const getAccordionData = async () => {
    if (!course) return { Subjects: [], "Mock Test": [], "Recorded Class": [] };

    const subjects = (course.subjects || []).map((subject) => ({
      _id: subject._id,
      name: subject.subjectName || "Subject",
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
              duration: `${test.number_of_questions ?? "N/A"} Questions | ${
                test.duration ?? "N/A"
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

  /* ------------------------ tab data with empty-subject filter ---------------- */
  const filteredData = (accordionData[activeTab] || []).filter(
    (item) => Array.isArray(item.lectures) && item.lectures.length > 0
  );

  /* ================================== UI ==================================== */
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
                navigate(`/user/meeting-join`, {
                  state: {
                    meetingNumber: liveClassData?.zoom_meeting_id,
                    passWord: liveClassData?.zoom_passcode,
                    meetingTitle: liveClassData?.meeting_title,
                    role: 1,
                    userName: userData.user.displayName || "React",
                    userEmail: userData.user.email || "",
                    leaveUrl: `/continueCourse/${id}`,
                  },
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
          Video Lectures
        </button>
        <button
          className={activeTab === "Mock Test" ? "active" : ""}
          onClick={() => {
            setActiveTab("Mock Test");
            setActiveAccordion(null);
          }}
        >
          Mock Test
        </button>
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
