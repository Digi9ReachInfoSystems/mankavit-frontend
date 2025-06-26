


// // src/module/user/components/TextScreen/TextScreen.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//   Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
//   RightIcon, QuestionType, Timer, Text, TimeSlot,
//   Complier, QuestionNumber, QuestionTitle, Section, PassageBox, HorizontalLine,
//   QuestionBox, QuestionText, OptionsList, OptionLabel, ButtonGroup,
//   LeftButton, ReviewButton, ClearButton, RightButton, NextButton,
//   SidebarContainer, UserCard, UserImage, UserInfo, UserName, UserEmail,
//   Divider, Legend, OptionLabelList, LegendItem, LegendText,
//   QuestionNav, Grid, GridButton, FooterButtons, SaveButton
// } from './TextScreen.styles';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
// import Profile from '../../../../assets/profile.png';
// import {
//   getMocktestById,
//   getMocktestAttempts,
//   startMocktest,
//   saveMocktest,
//   submitMocktest
// } from '../../../../api/mocktestApi';
// import { getCookiesData } from '../../../../utils/cookiesService';

// export default function TextScreen() {
//   const { testId, subjectId, attemptId: urlAttemptId } = useParams();
//   const navigate = useNavigate();
//   const { userId } = getCookiesData();

//   const [mockTest, setMockTest] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState({ m: 0, s: 0 });
//   const [marked, setMarked] = useState(new Set());
//   const [answered, setAnswered] = useState(new Set());
//   const [savedForLater, setSavedForLater] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [initialTime, setInitialTime] = useState(0); // in minutes

//   const unwrap = r => r?.data?.body?.data ?? r?.data;

//   // 1) Fetch test, attempts, restore timer from localStorage
//   useEffect(() => {
//     (async () => {
//       try {
//         // fetch test
//         const resTest = await getMocktestById(testId);
//         const test = unwrap(resTest);
//         setMockTest(test);
//         setQuestions(test.questions);
//         setInitialTime(test.duration);

//         // restore timer
//         const key = `testTime_${testId}_${urlAttemptId}`;
//         const stored = localStorage.getItem(key);
//         if (stored) {
//           const { remainingTime, timestamp } = JSON.parse(stored);
//           const elapsedMin = Math.floor((Date.now() - timestamp) / 1000 / 60);
//           const newRem = remainingTime - elapsedMin;
//           if (newRem > 0) {
//             setTimeLeft({ m: newRem, s: 0 });
//           } else {
//             setTimeLeft({ m: 0, s: 0 });
//           }
//         } else {
//           setTimeLeft({ m: test.duration, s: 0 });
//         }

//         // fetch attempts
//         const resAttempts = await getMocktestAttempts(userId, testId);
//         const arr = unwrap(resAttempts) || [];
//         let attempt = urlAttemptId
//           ? arr.find(a => a._id === urlAttemptId)
//           : null;

//         if (!attempt) {
//           if (arr.length >= test.maxAttempts) {
//             toast.error(`You have reached the maximum of ${test.maxAttempts} attempts.`);
//             return navigate(-1);
//           }
//           const resStart = await startMocktest({ mockTestId: testId, subject: subjectId, user_id: userId });
//           attempt = unwrap(resStart);
//         }

//         if (!urlAttemptId && attempt._id) {
//           navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`, { replace: true });
//         }

//         // build answers state
//         setAnswers(test.questions.map(q => {
//           const saved = (attempt.answers || []).find(a => a.questionId === q._id) || {};
//           return {
//             attemptId: attempt._id,
//             questionId: q._id,
//             answer: saved.answer || '',
//             answerIndex: saved.answerIndex ?? null
//           };
//         }));

//         // init status sets
//         const newMarked = new Set();
//         const newAnswered = new Set();
//         const newSaved = new Set();
//         test.questions.forEach((q, i) => {
//           const saved = (attempt.answers || []).find(a => a.questionId === q._id);
//           if (saved) {
//             if (saved.answer || saved.answerIndex !== null) newAnswered.add(i+1);
//             else newSaved.add(i+1);
//           }
//         });
//         setMarked(newMarked);
//         setAnswered(newAnswered);
//         setSavedForLater(newSaved);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.message || 'Failed to load test.');
//         navigate('/error', { state: { message: err.message } });
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [testId, subjectId, userId, urlAttemptId, navigate]);

//   // 2) Countdown & persist every tick
//   useEffect(() => {
//     if (loading || !initialTime) return;
//     const key = `testTime_${testId}_${urlAttemptId}`;

//     const timer = setInterval(() => {
//       setTimeLeft(({ m, s }) => {
//         let nm = m, ns = s;
//         if (m === 0 && s === 0) {
//           clearInterval(timer);
//           handleSubmit();
//           return { m:0, s:0 };
//         }
//         if (s > 0) ns = s-1;
//         else { nm = m-1; ns = 59; }
//         // store only minutes to simplify
//         localStorage.setItem(key, JSON.stringify({
//           remainingTime: nm,
//           timestamp: Date.now()
//         }));
//         return { m: nm, s: ns };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [loading, initialTime, testId, urlAttemptId]);

//   if (loading) return <div>Loading…</div>;
//   if (!mockTest) return <div>No test data</div>;

//   const currentQ = questions[currentIndex];
//   const currAns = answers[currentIndex] || {};
//   const isMCQ = currentQ.type === 'mcq';

//   function updateAnswer(upd) {
//     setAnswers(a => {
//       const copy = [...a];
//       copy[currentIndex] = { ...copy[currentIndex], ...upd };
//       return copy;
//     });
//   }

//   const handleOptionSelect = idx => {
//     const opt = currentQ.options[idx];
//     const text = typeof opt === 'object' ? opt.text : opt;
//     updateAnswer({ answer: text, answerIndex: idx });
//   };
//   const handleTextChange = e => updateAnswer({ answer: e.target.value, answerIndex: null });

//   const handleMarkAndNext = () => {
//     setMarked(m => new Set(m).add(currentIndex+1));
//     setSavedForLater(s => { const ns = new Set(s); ns.delete(currentIndex+1); return ns; });
//     if (currentIndex+1 < questions.length) setCurrentIndex(i => i+1);
//   };

//   const saveAndNext = async () => {
//     const ans = answers[currentIndex];
//     const payload = {
//       attemptId: ans.attemptId,
//       user_id: userId,
//       questionId: ans.questionId,
//       ...(isMCQ
//         ? { userAnswerIndex: ans.answerIndex, answer: ans.answer }
//         : { answer: ans.answer })
//     };
//     try {
//       await saveMocktest(payload);
//       toast.success('Answer saved');
//       setAnswered(s => new Set(s).add(currentIndex+1));
//       setSavedForLater(s => { const ns = new Set(s); ns.delete(currentIndex+1); return ns; });
//       if (currentIndex+1 < questions.length) setCurrentIndex(i => i+1);
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to save answer');
//     }
//   };

//   const handleClear = () => {
//     updateAnswer({ answer: '', answerIndex: null });
//     setAnswered(s => { const ns = new Set(s); ns.delete(currentIndex+1); return ns; });
//   };

//   // Bottom‐left: always skip to next
//   const handleSkip = () => {
//     if (currentIndex+1 < questions.length) setCurrentIndex(i => i+1);
//   };

//   const handleSubmit = async () => {
//     const ans = answers[currentIndex];
//     const payload = {
//       attemptId: ans.attemptId,
//       user_id: userId,
//       questionId: ans.questionId,
//       ...(isMCQ
//         ? { userAnswerIndex: ans.answerIndex, answer: ans.answer }
//         : { answer: ans.answer })
//     };
//     try {
//       await saveMocktest(payload);
//       const res = await submitMocktest({ attemptId: ans.attemptId, user_id: userId });
//       const data = unwrap(res);
//       if (data) {
//         localStorage.removeItem(`testTime_${testId}_${urlAttemptId}`);
//         toast.success('Test submitted');
//         navigate(`/test-submitted`);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to submit test');
//     }
//   };

//   const getStatus = n => {
//     if (marked.has(n)) return 'marked';
//     if (answered.has(n)) return 'answered';
//     if (savedForLater.has(n)) return 'saveForLater';
//     return 'unanswered';
//   };

//   return (
//     <Container>
//       <Content>
//         <Header>
//           <LeftDiv>
//             <LeftIcon onClick={() => navigate(-1)}><FaAngleLeft/></LeftIcon>
//             <HeaderLeft><Language>ENG</Language></HeaderLeft>
//           </LeftDiv>
//           <RightIcon><FaAngleRight/></RightIcon>
//         </Header>

//         <QuestionType>{isMCQ ? 'MCQ' : 'Subjective'}</QuestionType>
//         <Timer>
//           <Text>Time Left:</Text>
//           <TimeSlot>
//             {String(timeLeft.m).padStart(2,'0')}:
//             {String(timeLeft.s).padStart(2,'0')}
//           </TimeSlot>
//         </Timer>

//         <Complier>
//           <QuestionNumber>
//             <QuestionTitle>Q {currentIndex+1}</QuestionTitle>
//           </QuestionNumber>
//           <Section>
//             <PassageBox><p>{currentQ.questionText}</p></PassageBox>
//             <HorizontalLine/>
//             <QuestionBox>
//               <QuestionText><strong>{currentQ.questionText}</strong></QuestionText>
//               {isMCQ ? (
//                 <OptionsList>
//                   {currentQ.options.map((opt, idx) => {
//                     const label = typeof opt === 'object' ? opt.text : opt;
//                     return (
//                       <OptionLabel key={idx}>
//                         <input
//                           type="radio"
//                           checked={currAns.answerIndex === idx}
//                           onChange={() => handleOptionSelect(idx)}
//                         />
//                         {label}
//                       </OptionLabel>
//                     );
//                   })}
//                 </OptionsList>
//               ) : (
//                 <textarea
//                   className="textarea"
//                   value={currAns.answer}
//                   onChange={handleTextChange}
//                   placeholder="Type your answer…"
//                 />
//               )}
//             </QuestionBox>
//           </Section>
//         </Complier>

//         <ButtonGroup>
//           <LeftButton>
//             <ReviewButton onClick={handleMarkAndNext}>Mark & Next</ReviewButton>
//             <ClearButton onClick={handleClear}>Clear Response</ClearButton>
//           </LeftButton>
//           <RightButton>
//             <NextButton onClick={saveAndNext}>Save & Next</NextButton>
//           </RightButton>
//         </ButtonGroup>
//       </Content>

//       <SidebarContainer>
//         <UserCard>
//           <UserImage src={Profile} alt="user"/>
//           <UserInfo>
//             <UserName>You</UserName>
//             <UserEmail>{userId}</UserEmail>
//           </UserInfo>
//         </UserCard>
//         <Divider/>

//         <Legend>
//           <OptionLabelList>
//             <LegendItem className="answered">1</LegendItem><LegendText>Answered</LegendText>
//           </OptionLabelList>
//           <OptionLabelList>
//             <LegendItem className="marked">2</LegendItem><LegendText>Marked</LegendText>
//           </OptionLabelList>
//           <OptionLabelList>
//             <LegendItem className="saveForLater">3</LegendItem><LegendText>Saved for Later</LegendText>
//           </OptionLabelList>
//           <OptionLabelList>
//             <LegendItem className="unanswered">4</LegendItem><LegendText>Unanswered</LegendText>
//           </OptionLabelList>
//         </Legend>

//         <QuestionNav>
//           <Grid>
//             {questions.map((_, i) => (
//               <GridButton
//                 key={i}
//                 className={getStatus(i+1)}
//                 onClick={() => setCurrentIndex(i)}
//               >{i+1}</GridButton>
//             ))}
//           </Grid>
//         </QuestionNav>

//         <FooterButtons>
//           <SaveButton onClick={handleSkip}>Skip</SaveButton>
//           <NextButton onClick={handleSubmit}>Submit Test</NextButton>
//         </FooterButtons>
//       </SidebarContainer>
//     </Container>
//   );
// }

















// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//   Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
//   RightIcon, QuestionType, Timer, Text, TimeSlot,
//   Complier, QuestionNumber, QuestionTitle, Section, PassageBox, HorizontalLine,
//   QuestionBox, QuestionText, OptionsList, OptionLabel, ButtonGroup,
//   LeftButton, ReviewButton, ClearButton, RightButton, NextButton,
//   SidebarContainer, UserCard, UserImage, UserInfo, UserName, UserEmail,
//   Divider, Legend, OptionLabelList, LegendItem, LegendText,
//   QuestionNav, Grid, GridButton, FooterButtons, SaveButton
// } from './TextScreen.styles';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
// import Profile from '../../../../assets/profile.png';
// import {
//   getMocktestById,
//   getMocktestAttempts,
//   startMocktest,
//   saveMocktest,
//   submitMocktest
// } from '../../../../api/mocktestApi';
// import { getCookiesData } from '../../../../utils/cookiesService';

// export default function TextScreen() {
//   const { testId, subjectId, attemptId: urlAttemptId } = useParams();
//   const navigate = useNavigate();
//   const { userId } = getCookiesData();

//   const [mockTest, setMockTest] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState({ m: 0, s: 0 });
//   const [marked, setMarked] = useState(new Set());
//   const [answered, setAnswered] = useState(new Set());
//   const [savedForLater, setSavedForLater] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [initialTime, setInitialTime] = useState(0); // Store initial time in minutes

//   // unwrap { data } or { body: { data } }
//   const unwrap = r => r?.data?.body?.data ?? r?.data;

//   useEffect(() => {
//     (async () => {
//       try {
//         // 1) fetch test
//         const resTest = await getMocktestById(testId);
//         const test = unwrap(resTest);
//         setMockTest(test);
//         setQuestions(test.questions);
//         setInitialTime(test.duration); // Store initial duration
        
//         // Calculate remaining time from localStorage if available
//         const storedTime = localStorage.getItem(`testTime_${testId}_${urlAttemptId}`);
//         if (storedTime) {
//           const { remainingTime, timestamp } = JSON.parse(storedTime);
//           const timeElapsed = Math.floor((Date.now() - timestamp) / 1000 / 60); // in minutes
//           const updatedRemaining = remainingTime - timeElapsed;
          
//           if (updatedRemaining > 0) {
//             setTimeLeft({
//               m: updatedRemaining,
//               s: 0
//             });
//           } else {
//             setTimeLeft({ m: 0, s: 0 });
//           }
//         } else {
//           setTimeLeft({ m: test.duration, s: 0 });
//         }

//         // 2) fetch existing attempts
//         const resAttempts = await getMocktestAttempts(userId, testId);
//         const arr = unwrap(resAttempts) || [];

//         let attempt = null;
//         // if URL already has an attemptId, load that one:
//         if (urlAttemptId) {
//           attempt = arr.find(a => a._id === urlAttemptId);
//         }
//         // otherwise, if fewer than maxAttempts, start fresh:
//         if (!attempt) {
//           if (arr.length >= test.maxAttempts) {
//             toast.error(`You have reached the maximum of ${test.maxAttempts} attempts.`);
//             return navigate(-1);
//           }
//           const resStart = await startMocktest({
//             mockTestId: testId,
//             subject: subjectId,
//             user_id: userId
//           });
//           attempt = unwrap(resStart);
//         }

//         // if we just created it, push its ID into the URL
//         if (!urlAttemptId && attempt._id) {
//           navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`, { replace: true });
//         }

//         // 3) build answers state
//         setAnswers(test.questions.map(q => {
//           const saved = (attempt.answers || []).find(a => a.questionId === q._id) || {};
//           return {
//             attemptId: attempt._id,
//             questionId: q._id,
//             answer: saved.answer || '',
//             answerIndex: saved.answerIndex ?? null
//           };
//         }));

//         // Initialize status sets from saved answers
//         const newMarked = new Set();
//         const newAnswered = new Set();
//         const newSavedForLater = new Set();

//         test.questions.forEach((q, i) => {
//           const saved = (attempt.answers || []).find(a => a.questionId === q._id);
//           if (saved) {
//             if (saved.answer || saved.answerIndex !== null) {
//               newAnswered.add(i + 1);
//             } else {
//               newSavedForLater.add(i + 1);
//             }
//           }
//         });

//         setMarked(newMarked);
//         setAnswered(newAnswered);
//         setSavedForLater(newSavedForLater);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.message || 'Failed to load test.');
//         navigate('/error', { state: { message: err.message } });
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [testId, subjectId, userId, urlAttemptId]);

//   // countdown
//   useEffect(() => {
//     if (loading || !initialTime) return;
    
//     // Store time in localStorage when leaving the page
//     const handleBeforeUnload = () => {
//       localStorage.setItem(`testTime_${testId}_${urlAttemptId}`, JSON.stringify({
//         remainingTime: timeLeft.m,
//         timestamp: Date.now()
//       }));
//     };
    
//     window.addEventListener('beforeunload', handleBeforeUnload);
    
//     const timer = setInterval(() => {
//       setTimeLeft(({ m, s }) => {
//         if (m === 0 && s === 0) {
//           clearInterval(timer);
//           handleSubmit();
//           return { m: 0, s: 0 };
//         }
//         if (s > 0) return { m, s: s - 1 };
//         return { m: m - 1, s: 59 };
//       });
//     }, 1000);
    
//     return () => {
//       clearInterval(timer);
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [loading, initialTime]);

//   if (loading) return <div>Loading…</div>;
//   if (!mockTest) return <div>No test data</div>;

//   const currentQ = questions[currentIndex];
//   const currAns = answers[currentIndex] || {};
//   const isMCQ = currentQ.type === 'mcq';

//   function updateAnswer(upd) {
//     setAnswers(a => {
//       const copy = [...a];
//       copy[currentIndex] = { ...copy[currentIndex], ...upd };
//       return copy;
//     });
//   }

//   const handleOptionSelect = idx => {
//     const opt = currentQ.options[idx];
//     const text = typeof opt === 'object' ? opt.text : opt;
//     updateAnswer({ answer: text, answerIndex: idx });
//   };
  
//   const handleTextChange = e => {
//     updateAnswer({ answer: e.target.value, answerIndex: null });
//   };

//   const handleMarkAndNext = () => {
//     setMarked(m => new Set(m).add(currentIndex + 1));
//     setSavedForLater(s => {
//       const newSet = new Set(s);
//       newSet.delete(currentIndex + 1);
//       return newSet;
//     });
//     if (currentIndex + 1 < questions.length) setCurrentIndex(i => i + 1);
//   };

//   const saveAndNext = async () => {
//     const ans = answers[currentIndex];
//     const payload = {
//       attemptId: ans.attemptId,
//       user_id: userId,
//       questionId: ans.questionId
//     };
    
//     if (isMCQ) {
//       payload.userAnswerIndex = ans.answerIndex;
//       payload.answer = ans.answer;
//     } else {
//       payload.answer = ans.answer;
//     }

//     try {
//       await saveMocktest(payload);
//       toast.success('Answer saved');
//       setAnswered(s => new Set(s).add(currentIndex + 1));
//       setSavedForLater(s => {
//         const newSet = new Set(s);
//         newSet.delete(currentIndex + 1);
//         return newSet;
//       });
//       if (currentIndex + 1 < questions.length) {
//         setCurrentIndex(i => i + 1);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to save answer');
//     }
//   };

//   const handleClear = () => {
//     updateAnswer({ answer: '', answerIndex: null });
//     setAnswered(s => {
//       const newSet = new Set(s);
//       newSet.delete(currentIndex + 1);
//       return newSet;
//     });
//   };

//   const handleSaveForLater = async () => {
//     const ans = answers[currentIndex];
//     const payload = {
//       attemptId: ans.attemptId,
//       user_id: userId,
//       questionId: ans.questionId,
//       answer: ans.answer,
//       answerIndex: ans.answerIndex
//     };

//     try {
//       await saveMocktest(payload);
//       toast.success('Saved for later');
//       setSavedForLater(s => new Set(s).add(currentIndex + 1));
//       setAnswered(a => {
//         const newSet = new Set(a);
//         newSet.delete(currentIndex + 1);
//         return newSet;
//       });
//       if (currentIndex + 1 < questions.length) {
//         setCurrentIndex(i => i + 1);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to save for later');
//     }
//   };

//   const handleSubmit = async () => {
//     const ans = answers[currentIndex];
//     const payload = {
//       attemptId: ans.attemptId,
//       user_id: userId,
//       questionId: ans.questionId
//     };
    
//     if (currentQ.type === 'mcq') {
//       payload.userAnswerIndex = ans.answerIndex;
//       payload.answer = ans.answer;
//     } else {
//       payload.answer = ans.answer;
//     }

//     try {
//       await saveMocktest(payload);
//       const res = await submitMocktest({
//         attemptId: ans.attemptId,
//         user_id: userId
//       });
//       console.log("res", res);
//       const data = unwrap(res);
//       if (data) {
//         // Clear stored time on successful submit
//         localStorage.removeItem(`testTime_${testId}_${urlAttemptId}`);
//         toast.success('Test submitted');
//         navigate(`/test-submitted`);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to submit test');
//     }
//   };

//   const getStatus = n => {
//     if (marked.has(n)) return 'marked';
//     if (answered.has(n)) return 'answered';
//     if (savedForLater.has(n)) return 'saveForLater';
//     return 'unanswered';
//   };

//   return (
//     <Container>
//       <Content>
//         <Header>
//           <LeftDiv>
//             <LeftIcon onClick={() => navigate(-1)}><FaAngleLeft/></LeftIcon>
//             <HeaderLeft><Language>ENG</Language></HeaderLeft>
//           </LeftDiv>
//           <RightIcon><FaAngleRight/></RightIcon>
//         </Header>

//         <QuestionType>{isMCQ ? 'MCQ' : 'Subjective'}</QuestionType>
//         <Timer>
//           <Text>Time Left:</Text>
//           <TimeSlot>
//             {String(timeLeft.m).padStart(2,'0')}:
//             {String(timeLeft.s).padStart(2,'0')}
//           </TimeSlot>
//         </Timer>

//         <Complier>
//           <QuestionNumber>
//             <QuestionTitle>Q {currentIndex + 1}</QuestionTitle>
//           </QuestionNumber>
//           <Section>
//             <PassageBox><p>{currentQ.questionText}</p></PassageBox>
//             <HorizontalLine/>
//             <QuestionBox>
//               <QuestionText>
//                 <strong>{currentQ.questionText}</strong>
//               </QuestionText>
//               {isMCQ ? (
//                 <OptionsList>
//                   {currentQ.options.map((opt, idx) => {
//                     const label = typeof opt === 'object' ? opt.text : opt;
//                     return (
//                       <OptionLabel key={idx}>
//                         <input
//                           type="radio"
//                           checked={currAns.answerIndex === idx}
//                           onChange={() => handleOptionSelect(idx)}
//                         />
//                         {label}
//                       </OptionLabel>
//                     );
//                   })}
//                 </OptionsList>
//               ) : (
//                 <textarea
//                   className="textarea"
//                   value={currAns.answer}
//                   onChange={handleTextChange}
//                   placeholder="Type your answer…"
//                 />
//               )}
//             </QuestionBox>
//           </Section>
//         </Complier>

//         <ButtonGroup>
//           <LeftButton>
//             <ReviewButton onClick={handleMarkAndNext}>Mark & Next</ReviewButton>
//             <ClearButton onClick={handleClear}>Clear Response</ClearButton>
//           </LeftButton>
//           <RightButton>
//             <NextButton onClick={saveAndNext}>Save & Next</NextButton>
//           </RightButton>
//         </ButtonGroup>
//       </Content>

//       <SidebarContainer>
//         <UserCard>
//           <UserImage src={Profile} alt="user"/>
//           <UserInfo>
//             <UserName>You</UserName>
//             <UserEmail>{userId}</UserEmail>
//           </UserInfo>
//         </UserCard>
//         <Divider/>

//         <Legend>
//           <OptionLabelList>
//             <LegendItem className="answered">1</LegendItem>
//             <LegendText>Answered</LegendText>
//           </OptionLabelList>
//           <OptionLabelList>
//             <LegendItem className="marked">2</LegendItem>
//             <LegendText>Marked</LegendText>
//           </OptionLabelList>
//           <OptionLabelList>
//             <LegendItem className="saveForLater">3</LegendItem>
//             <LegendText>Saved for Later</LegendText>
//           </OptionLabelList>
//           <OptionLabelList>
//             <LegendItem className="unanswered">4</LegendItem>
//             <LegendText>Unanswered</LegendText>
//           </OptionLabelList>
//         </Legend>

//         <QuestionNav>
//           <Grid>
//             {questions.map((_, i) => (
//               <GridButton
//                 key={i}
//                 className={getStatus(i+1)}
//                 onClick={() => setCurrentIndex(i)}
//               >
//                 {i+1}
//               </GridButton>
//             ))}
//           </Grid>
//         </QuestionNav>

//         <FooterButtons>
//           <SaveButton onClick={handleSaveForLater}>Save For Later</SaveButton>
//           <NextButton onClick={handleSubmit}>Submit Test</NextButton>
//         </FooterButtons>
//       </SidebarContainer>
//     </Container>
//   );
// }

// src/module/user/components/TextScreen/TextScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
  RightIcon, QuestionType, Timer, Text, TimeSlot,
  Complier, QuestionNumber, QuestionTitle, Section, PassageBox, HorizontalLine,
  QuestionBox, QuestionText, OptionsList, OptionLabel, ButtonGroup,
  LeftButton, ReviewButton, ClearButton, RightButton, NextButton,
  SidebarContainer, UserCard, UserImage, UserInfo, UserName, UserEmail,
  Divider, Legend, OptionLabelList, LegendItem, LegendText,
  QuestionNav, Grid, GridButton, FooterButtons, SaveButton
} from './TextScreen.styles';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Profile from '../../../../assets/profile.png';
import {
  getMocktestById,
  getMocktestAttempts,
  startMocktest,
  saveMocktest,
  submitMocktest
} from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';

export default function TextScreen() {
  const { testId, subjectId, attemptId: urlAttemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [mockTest, setMockTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ m: 0, s: 0 });
  const [marked, setMarked] = useState(new Set());
  const [answered, setAnswered] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [initialTime, setInitialTime] = useState(0);

  // unwrap { data } or { body: { data } }
  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // 1) fetch test
        const resTest = await getMocktestById(testId);
        const test = unwrap(resTest);
        setMockTest(test);
        setQuestions(test.questions);
        setInitialTime(test.duration);

        // Check for existing time in localStorage
        const timeKey = `testTime_${testId}_${urlAttemptId}`;
        const storedTime = localStorage.getItem(timeKey);
        
        if (storedTime) {
          const { remainingMinutes, remainingSeconds, timestamp } = JSON.parse(storedTime);
          const timeElapsedMs = Date.now() - timestamp;
          const timeElapsedSeconds = Math.floor(timeElapsedMs / 1000);
          
          const totalRemainingSeconds = (remainingMinutes * 60) + remainingSeconds - timeElapsedSeconds;
          
          if (totalRemainingSeconds > 0) {
            const minutes = Math.floor(totalRemainingSeconds / 60);
            const seconds = totalRemainingSeconds % 60;
            setTimeLeft({ m: minutes, s: seconds });
          } else {
            setTimeLeft({ m: 0, s: 0 });
          }
        } else {
          setTimeLeft({ m: test.duration, s: 0 });
        }

        // 2) fetch existing attempts
        const resAttempts = await getMocktestAttempts(userId, testId);
        const arr = unwrap(resAttempts) || [];

        let attempt = null;
        if (urlAttemptId) {
          attempt = arr.find(a => a._id === urlAttemptId);
        }
        if (!attempt) {
          if (arr.length >= test.maxAttempts) {
            toast.error(`You have reached the maximum of ${test.maxAttempts} attempts.`);
            return navigate(-1);
          }
          const resStart = await startMocktest({
            mockTestId: testId,
            subject: subjectId,
            user_id: userId
          });
          attempt = unwrap(resStart);
        }

        if (!urlAttemptId && attempt._id) {
          navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`, { replace: true });
        }

        // 3) build answers state
        setAnswers(test.questions.map(q => {
          const saved = (attempt.answers || []).find(a => a.questionId === q._id) || {};
          return {
            attemptId: attempt._id,
            questionId: q._id,
            answer: saved.answer || '',
            answerIndex: saved.answerIndex ?? null
          };
        }));

        // Initialize status sets
        const newMarked = new Set();
        const newAnswered = new Set();

        test.questions.forEach((q, i) => {
          const saved = (attempt.answers || []).find(a => a.questionId === q._id);
          if (saved && (saved.answer || saved.answerIndex !== null)) {
            newAnswered.add(i + 1);
          }
        });

        setMarked(newMarked);
        setAnswered(newAnswered);
      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Failed to load test.');
        navigate('/error', { state: { message: err.message } });
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, subjectId, userId, urlAttemptId]);

  // countdown
  useEffect(() => {
    if (loading || !initialTime) return;
    
    const timeKey = `testTime_${testId}_${urlAttemptId}`;
    
    const handleBeforeUnload = () => {
      localStorage.setItem(timeKey, JSON.stringify({
        remainingMinutes: timeLeft.m,
        remainingSeconds: timeLeft.s,
        timestamp: Date.now()
      }));
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    const timer = setInterval(() => {
      setTimeLeft(({ m, s }) => {
        // Save time every minute to localStorage
        if (s === 0) {
          localStorage.setItem(timeKey, JSON.stringify({
            remainingMinutes: m,
            remainingSeconds: s,
            timestamp: Date.now()
          }));
        }
        
        if (m === 0 && s === 0) {
          clearInterval(timer);
          handleSubmit();
          return { m: 0, s: 0 };
        }
        if (s > 0) return { m, s: s - 1 };
        return { m: m - 1, s: 59 };
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loading, initialTime]);

  if (loading) return <div>Loading…</div>;
  if (!mockTest) return <div>No test data</div>;

  const currentQ = questions[currentIndex];
  const currAns = answers[currentIndex] || {};
  const isMCQ = currentQ.type === 'mcq';

  function updateAnswer(upd) {
    setAnswers(a => {
      const copy = [...a];
      copy[currentIndex] = { ...copy[currentIndex], ...upd };
      return copy;
    });
  }

  const handleMarkedQuestionAnswered = (questionNumber) => {
  setMarked(m => {
    const newMarked = new Set(m);
    newMarked.delete(questionNumber);
    return newMarked;
  });
  setAnswered(a => new Set(a).add(questionNumber));
};

 // Modify the handleOptionSelect and handleTextChange functions to include this check
const handleOptionSelect = idx => {
  const opt = currentQ.options[idx];
  const text = typeof opt === 'object' ? opt.text : opt;
  updateAnswer({ answer: text, answerIndex: idx });
  
  // If this question was marked, change its status to answered
  if (marked.has(currentIndex + 1)) {
    handleMarkedQuestionAnswered(currentIndex + 1);
  }
};
  
  const handleTextChange = e => {
  updateAnswer({ answer: e.target.value, answerIndex: null });
  
  // If this question was marked, change its status to answered
  if (marked.has(currentIndex + 1)) {
    handleMarkedQuestionAnswered(currentIndex + 1);
  }
};

  const handleMarkAndNext = () => {
    setMarked(m => new Set(m).add(currentIndex + 1));
    if (currentIndex + 1 < questions.length) setCurrentIndex(i => i + 1);
  };

  const handleSkip = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
    }
  };

 const saveAndNext = async () => {
  const ans = answers[currentIndex];
  const payload = {
    attemptId: ans.attemptId,
    user_id: userId,
    questionId: ans.questionId
  };
  
  if (isMCQ) {
    payload.userAnswerIndex = ans.answerIndex;
    payload.answer = ans.answer;
  } else {
    payload.answer = ans.answer;
  }

  try {
    await saveMocktest(payload);
    toast.success('Answer saved');
    
    // If this question was marked, change its status to answered
    if (marked.has(currentIndex + 1)) {
      handleMarkedQuestionAnswered(currentIndex + 1);
    } else {
      setAnswered(s => new Set(s).add(currentIndex + 1));
    }
    
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to save answer');
  }
};

  const handleClear = () => {
    updateAnswer({ answer: '', answerIndex: null });
    setAnswered(s => {
      const newSet = new Set(s);
      newSet.delete(currentIndex + 1);
      return newSet;
    });
  };

  const handleSubmit = async () => {
    const ans = answers[currentIndex];
    
    try {
      // Directly submit without saving current question first
      const res = await submitMocktest({
        attemptId: ans.attemptId,
        user_id: userId
      });
      
      const data = unwrap(res);
      if (data) {
        localStorage.removeItem(`testTime_${testId}_${urlAttemptId}`);
        toast.success('Test submitted successfully');
        // navigate(`/test-submitted`);
navigate(`/test-results/${testId}/${subjectId}/${urlAttemptId}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit test');
    }
  };

  const getStatus = n => {
    if (marked.has(n)) return 'marked'; // Yellow background
    if (answered.has(n)) return 'answered'; // Green background
    return 'unanswered'; // White background
  };

  return (
    <Container>
      <Content>
        <Header>
          <LeftDiv>
            <LeftIcon onClick={() => navigate(-1)}><FaAngleLeft/></LeftIcon>
            <HeaderLeft><Language>ENG</Language></HeaderLeft>
          </LeftDiv>
          <RightIcon><FaAngleRight/></RightIcon>
        </Header>

        <QuestionType>{isMCQ ? 'MCQ' : 'Subjective'}</QuestionType>
        <Timer>
          <Text>Time Left:</Text>
          <TimeSlot>
            {String(timeLeft.m).padStart(2,'0')}:
            {String(timeLeft.s).padStart(2,'0')}
          </TimeSlot>
        </Timer>

        <Complier>
          <QuestionNumber>
            <QuestionTitle>Q {currentIndex + 1}</QuestionTitle>
          </QuestionNumber>
          <Section>
            <PassageBox><p>{currentQ.questionText}</p></PassageBox>
            <HorizontalLine/>
            <QuestionBox>
              <QuestionText>
                <strong>{currentQ.questionText}</strong>
              </QuestionText>
              {isMCQ ? (
                <OptionsList>
                  {currentQ.options.map((opt, idx) => {
                    const label = typeof opt === 'object' ? opt.text : opt;
                    return (
                      <OptionLabel key={idx}>
                        <input
                          type="radio"
                          checked={currAns.answerIndex === idx}
                          onChange={() => handleOptionSelect(idx)}
                        />
                        {label}
                      </OptionLabel>
                    );
                  })}
                </OptionsList>
              ) : (
                <textarea
                  className="textarea"
                  value={currAns.answer}
                  onChange={handleTextChange}
                  placeholder="Type your answer…"
                />
              )}
            </QuestionBox>
          </Section>
        </Complier>

        <ButtonGroup>
          <LeftButton>
            <ReviewButton onClick={handleMarkAndNext}>Mark & Next</ReviewButton>
            <ClearButton onClick={handleClear}>Clear Response</ClearButton>
          </LeftButton>
          <RightButton>
            <NextButton onClick={handleSkip}>Skip</NextButton>
            <NextButton onClick={saveAndNext}>Save & Next</NextButton>
            
          </RightButton>
        </ButtonGroup>
      </Content>

      <SidebarContainer>
        <UserCard>
          <UserImage src={Profile} alt="user"/>
          <UserInfo>
            <UserName>You</UserName>
            <UserEmail>{userId}</UserEmail>
          </UserInfo>
        </UserCard>
        <Divider/>

        <Legend>
          <OptionLabelList>
            <LegendItem className="answered">1</LegendItem>
            <LegendText>Answered</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="marked">2</LegendItem>
            <LegendText>Marked</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="unanswered">3</LegendItem>
            <LegendText>Unanswered</LegendText>
          </OptionLabelList>
        </Legend>

        <QuestionNav>
          <Grid>
            {questions.map((_, i) => (
              <GridButton
                key={i}
                className={getStatus(i+1)}
                onClick={() => setCurrentIndex(i)}
              >
                {i+1}
              </GridButton>
            ))}
          </Grid>
        </QuestionNav>

        <FooterButtons>
          <NextButton onClick={handleSubmit}>Submit Test</NextButton>
        </FooterButtons>
      </SidebarContainer>
    </Container>
  );
}