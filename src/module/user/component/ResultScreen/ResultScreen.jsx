// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { toast } from "react-toastify";
// import styled from "styled-components";
// import {
//   Container,
//   Content,
//   Header,
//   LeftDiv,
//   LeftIcon,
//   HeaderLeft,
//   Language,
//   RightIcon,
//   QuestionType,
//   Timer,
//   Text,
//   Complier,
//   QuestionNumber,
//   QuestionTitle,
//   Section,
//   PassageBox,
//   HorizontalLine,
//   QuestionBox,
//   OptionsList,
//   OptionLabel,
//   ButtonGroup,
//   LeftButton,
//   ClearButton,
//   RightButton,
//   NextButton,
//   SidebarContainer,
//   Divider,
//   Legend,
//   OptionLabelList,
//   LegendText,
//   LegendItem,
//   QuestionNav,
//   Grid,
//   GridButton,
//   FooterButtons,
//   SummaryContainer,
//   SummaryItem,
//   SummaryLabel,
//   SummaryValue,
//   ToggleSidebarBtn,
// } from "./ResultScreen.styles";
// import {
//   getMocktestById,
//   getMocktestAttempts,
// } from "../../../../api/mocktestApi";
// import { getCookiesData } from "../../../../utils/cookiesService";

// import { FaAngleDoubleLeft } from "react-icons/fa";
// import { FaAngleDoubleRight } from "react-icons/fa";
// // --- small helpers for layout inside this file only ---
// const PassageContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   width: 100%;
// `;
// const PassageSection = styled.div`
//   flex: 1;
// `;
// const QuestionSection = styled.div`
//   flex: 1;
// `;
// const QuestionText = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// export default function ResultScreen() {
//   const { testId, subjectId, attemptId } = useParams();
//   const navigate = useNavigate();
//   const { userId } = getCookiesData();

//   const [test, setTest] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [summaryData, setSummaryData] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const unwrap = (r) => r?.data?.body?.data ?? r?.data;

//   useEffect(() => {
//     (async () => {
//       try {
//         // 1) Test meta
//         const resTest = await getMocktestById(testId);
//         const testData = unwrap(resTest);
//         setTest(testData);

//         // 2) Attempts
//         const resAtts = await getMocktestAttempts(userId, testId);
//         console.log("resAtts", resAtts);
//         const arr = unwrap(resAtts) || [];
//         const latestAttempt =
//           arr.find((a) => a._id === attemptId) || arr[arr.length - 1] || {};

//         // 3) Normalize to EXACTLY 3 statuses: correct | incorrect | not-answered
//         const processed = (latestAttempt.answers || []).map((ans) => {
//           const details = ans.questionDetails || {};
//           const type = details.type || "mcq";

//           let status = "not-answered";
//           if (type === "mcq") {
//             if (ans.answerIndex != null) {
//               status = ans.isCorrect ? "correct" : "incorrect";
//             }
//           } else {
//             // subjective:
//             const hasText =
//               typeof ans.answer === "string" && ans.answer.trim() !== "";
//             if (hasText) {
//               if (typeof ans.isCorrect === "boolean") {
//                 status = ans.isCorrect ? "correct" : "incorrect";
//               } else if (typeof ans.marksAwarded === "number") {
//                 status = ans.marksAwarded > 0 ? "correct" : "incorrect";
//               } else {
//                 // not evaluated yet -> keep as not-answered to avoid misleading
//                 status = "not-answered";
//               }
//             }
//           }

//           return {
//             id: ans.questionId,
//             text: details.questionText || "",
//             options: details.options || [],
//             selectedOption: ans.answerIndex,
//             correctAnswer: details.correctAnswer,
//             isCorrect: ans.isCorrect,
//             marks: ans.marksAwarded || 0,
//             explanation: details.expectedAnswer || "",
//             type,
//             status,
//             isPassage: details.isPassage,
//             passageText: details.passageText || "",
//             answer: ans.answer,
//             expectedAnswer: details.expectedAnswer || "",
//           };
//         });

//         setQuestions(processed);

//         // 4) Build summary conditionally
//         const totalQuestions = testData?.questions?.length || processed.length;
//         const attempted = processed.filter(
//           (q) => q.status !== "not-answered"
//         ).length;
//         const correct = processed.filter((q) => q.status === "correct").length;

//         const mcqScore = latestAttempt.mcqScore || 0;
//         const subjectiveScore = latestAttempt.subjectiveScore || 0;
//         const totalMarks =
//           latestAttempt.totalMarks ?? mcqScore + subjectiveScore;

//         const hasMCQ = processed.some((q) => q.type === "mcq");
//         const hasSubjective = processed.some((q) => q.type !== "mcq");

//         let summary = [
//           { label: "Total Questions", value: totalQuestions },
//           { label: "Attempted Questions", value: attempted },
//           { label: "Correct Answers", value: correct },
//         ];

//         if (hasMCQ && !hasSubjective) {
//           // Only Objective
//           summary.push({ label: "MCQ Marks Obtained", value: mcqScore });
//         } else if (hasMCQ && hasSubjective) {
//           // Both Objective & Subjective
//           summary.push(
//             { label: "MCQ Marks Obtained", value: mcqScore },
//             { label: "Subjective Marks Obtained", value: subjectiveScore },
//             { label: "Total Marks Obtained", value: totalMarks }
//           );
//         } else if (!hasMCQ && hasSubjective) {
//           // Only Subjective (graceful handling)
//           summary.push(
//             { label: "Subjective Marks Obtained", value: subjectiveScore },
//             { label: "Total Marks Obtained", value: totalMarks }
//           );
//         }

//         setSummaryData(summary);
//       } catch (err) {
//         console.error(err);
//         toast.error("Could not load results");
//         navigate(-1);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [testId, attemptId, userId, navigate]);

//   if (loading) return <div>Loading results…</div>;
//   if (!test) return <div>Unable to load your attempt.</div>;

//   const current = questions[currentIndex] || {};
//   const isMCQ = current.type === "mcq";
//   const isPassage = current.isPassage;

//   // counts for the 3 indicators
//   const counts = questions.reduce((acc, q) => {
//     acc[q.status] = (acc[q.status] || 0) + 1;
//     return acc;
//   }, {});
//   const getCount = (st) => counts[st] || 0;

//   // circular nav
//   const goPrev = () => {
//     if (!questions.length) return;
//     setCurrentIndex((i) => (i - 1 + questions.length) % questions.length);
//   };
//   const goNext = () => {
//     if (!questions.length) return;
//     setCurrentIndex((i) => (i + 1) % questions.length);
//   };

//   // 2) Add this tiny renderer near your other small helpers
//   const ExpectedAnswer = ({ html }) => {
//     if (!html) return null;
//     return (
//       <div style={{ marginTop: 16 }}>
//         <p>
//           <strong>Expected Answer:</strong>
//         </p>
//         <div dangerouslySetInnerHTML={{ __html: html }} />
//       </div>
//     );
//   };

//   return (
//     <Container>
//       <Content $sidebarOpen={sidebarOpen}>
//         <ToggleSidebarBtn
//           onClick={() => setSidebarOpen((s) => !s)}
//           aria-label="Toggle question navigator"
//           title={sidebarOpen ? "Hide navigator" : "Show navigator"}
//         >
//           {sidebarOpen ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
//         </ToggleSidebarBtn>
        
//         <Header>
//           <LeftDiv>
//             <LeftIcon onClick={() => navigate(-1)}>
//               <FaAngleLeft />
//             </LeftIcon>
//             <HeaderLeft>
//               <Language>Back</Language>
//             </HeaderLeft>
//           </LeftDiv>

//           {/* <RightIcon><FaAngleRight /></RightIcon> */}
//         </Header>

//         <div style={{ flex: 1, textAlign: "left" }}>
//           <h4 style={{ margin: 0 }}>{test?.title || "Mock Test"}</h4>
//         </div>
//         <QuestionType>
//           {isPassage ? "Passage" : isMCQ ? "MCQ" : "Subjective"}
//         </QuestionType>
//         <SummaryContainer>
//           {summaryData.map((s, i) => (
//             <SummaryItem key={i}>
//               <SummaryLabel>{s.label}</SummaryLabel>
//               <SummaryValue>{s.value}</SummaryValue>
//             </SummaryItem>
//           ))}
//         </SummaryContainer>

//         <Complier>
//           <QuestionNumber>
//             <QuestionTitle>Question {currentIndex + 1}</QuestionTitle>
//           </QuestionNumber>

//           <Section>
//             {current.isPassage ? (
//               <PassageContainer>
//                 <PassageSection>
//                   <PassageBox
//                     dangerouslySetInnerHTML={{ __html: current.passageText }}
//                   />
//                 </PassageSection>

//                 <QuestionSection>
//                   <QuestionBox>
//                     <QuestionText
//                       dangerouslySetInnerHTML={{ __html: current.text }}
//                     />
//                     {isMCQ ? (
//                       <OptionsList>
//                         {current.options.map((opt, idx) => {
//                           const isSel = idx === current.selectedOption;
//                           const isCor = idx === current.correctAnswer;
//                           let cls = "plain";
//                           if (isSel && current.status === "correct")
//                             cls = "correct-attempted";
//                           if (isSel && current.status === "incorrect")
//                             cls = "incorrect-attempted";
//                           if (!isSel && isCor) cls = "correct-unattempted";

//                           return (
//                             <OptionLabel key={idx} status={cls}>
//                               <input type="radio" checked={isSel} readOnly />
//                               {opt.text || opt}
//                               {isCor && (
//                                 <span
//                                   style={{ marginLeft: 10, color: "green" }}
//                                 >
//                                   (Correct)
//                                 </span>
//                               )}
//                             </OptionLabel>
//                           );
//                         })}
//                       </OptionsList>
//                     ) : (
//                       <div>
//                         <p>
//                           <strong>Your Answer:</strong>
//                         </p>
//                         <p>{current.answer || <em>Not Answered</em>}</p>
//                         {/* <p>Expected answer is: {current.expectedAnswer}</p> */}
//                       </div>
//                     )}
//                     <ExpectedAnswer html={current.expectedAnswer} />{" "}
//                     {/* ⬅️ ADD THIS */}
//                   </QuestionBox>
//                 </QuestionSection>
//               </PassageContainer>
//             ) : (
//               <>
//                 <PassageBox
//                   dangerouslySetInnerHTML={{ __html: current.text }}
//                 />
//                 <HorizontalLine />
//                 <QuestionBox>
//                   {isMCQ ? (
//                     <OptionsList>
//                       {current.options.map((opt, idx) => {
//                         const isSel = idx === current.selectedOption;
//                         const isCor = idx === current.correctAnswer;
//                         let cls = "plain";
//                         if (isSel && current.status === "correct")
//                           cls = "correct-attempted";
//                         if (isSel && current.status === "incorrect")
//                           cls = "incorrect-attempted";
//                         if (!isSel && isCor) cls = "correct-unattempted";

//                         return (
//                           <OptionLabel key={idx} status={cls}>
//                             <input type="radio" checked={isSel} readOnly />
//                             {opt.text || opt}
//                             {isCor && (
//                               <span style={{ marginLeft: 10, color: "green" }}>
//                                 (Correct)
//                               </span>
//                             )}
//                           </OptionLabel>
//                         );
//                       })}
//                     </OptionsList>
//                   ) : (
//                     <div>
//                       <p>
//                         <strong>Your Answer:</strong>
//                       </p>
//                       <p>{current.answer || <em>Not Answered</em>}</p>
//                       {/* <p>Expected answer is: {current.expectedAnswer}</p> */}
//                     </div>
//                   )}
//                   <ExpectedAnswer html={current.expectedAnswer} />
//                 </QuestionBox>
//               </>
//             )}
//           </Section>

//           <ButtonGroup>
//             <LeftButton>
//               <ClearButton onClick={goPrev}>Previous</ClearButton>
//             </LeftButton>
//             <RightButton>
//               <NextButton onClick={goNext}>Next</NextButton>
//             </RightButton>
//           </ButtonGroup>
//         </Complier>
//       </Content>

//       {/* Sidebar with just 3 indicators */}
//       <SidebarContainer $open={sidebarOpen}>
//         <Divider />
//         <Legend>
//           <OptionLabelList>
//             <LegendItem className="correct">{getCount("correct")}</LegendItem>
//             <LegendText>Correct</LegendText>
//           </OptionLabelList>

//           <OptionLabelList>
//             <LegendItem className="incorrect">
//               {getCount("incorrect")}
//             </LegendItem>
//             <LegendText>Incorrect</LegendText>
//           </OptionLabelList>

//           <OptionLabelList>
//             <LegendItem className="not-answered">
//               {getCount("not-answered")}
//             </LegendItem>
//             <LegendText>Not Answered</LegendText>
//           </OptionLabelList>
//         </Legend>

//         <QuestionNav>
//           <Grid>
//             {questions.map((_, i) => (
//               <GridButton
//                 key={i}
//                 className={questions[i].status} // correct | incorrect | not-answered
//                 active={i === currentIndex}
//                 onClick={() => setCurrentIndex(i)}
//               >
//                 {i + 1}
//               </GridButton>
//             ))}
//           </Grid>
//         </QuestionNav>

//         <FooterButtons>
//           <NextButton onClick={() => navigate("/user")}>
//             Back to Dashboard
//           </NextButton>
//         </FooterButtons>
//       </SidebarContainer>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  Container,
  Content,
  Header,
  LeftDiv,
  LeftIcon,
  HeaderLeft,
  QuestionType,
  SummaryContainer,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  Section,
  PassageBox,
  HorizontalLine,
  QuestionBox,
  OptionsList,
  OptionLabel,
  SidebarContainer,
  Divider,
  Legend,
  OptionLabelList,
  LegendText,
  LegendItem,
  QuestionNav,
  Grid,
  GridButton,
  ToggleSidebarBtn,
  QuestionNumber,
  QuestionTitle,
  // NEW (same design bits as Test screen)
  PageTitle,
  StickyActionBar,
  LeftButtonsWrap,
  RightStickyButton,
} from "./ResultScreen.styles";
import {
  getMocktestById,
  getMocktestAttempts,
} from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

// --- small helpers for layout inside this file only ---
const PassageContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;
const PassageSection = styled.div`
  flex: 1;
`;
const QuestionSection = styled.div`
  flex: 1;
`;
const QuestionText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function ResultScreen() {
  const { testId, subjectId, attemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summaryData, setSummaryData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unwrap = (r) => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // 1) Test meta
        const resTest = await getMocktestById(testId);
        const testData = unwrap(resTest);
        setTest(testData);

        // 2) Attempts
        const resAtts = await getMocktestAttempts(userId, testId);
        const arr = unwrap(resAtts) || [];
        const latestAttempt =
          arr.find((a) => a._id === attemptId) || arr[arr.length - 1] || {};

        // 3) Normalize to EXACTLY 3 statuses: correct | incorrect | not-answered
        const processed = (latestAttempt.answers || []).map((ans) => {
          const details = ans.questionDetails || {};
          const type = details.type || "mcq";

          let status = "not-answered";
          if (type === "mcq") {
            if (ans.answerIndex != null) {
              status = ans.isCorrect ? "correct" : "incorrect";
            }
          } else {
            const hasText =
              typeof ans.answer === "string" && ans.answer.trim() !== "";
            if (hasText) {
              if (typeof ans.isCorrect === "boolean") {
                status = ans.isCorrect ? "correct" : "incorrect";
              } else if (typeof ans.marksAwarded === "number") {
                status = ans.marksAwarded > 0 ? "correct" : "incorrect";
              } else {
                status = "not-answered"; // not evaluated yet
              }
            }
          }

          return {
            id: ans.questionId,
            text: details.questionText || "",
            options: details.options || [],
            selectedOption: ans.answerIndex,
            correctAnswer: details.correctAnswer,
            isCorrect: ans.isCorrect,
            marks: ans.marksAwarded || 0,
            explanation: details.expectedAnswer || "",
            type,
            status,
            isPassage: details.isPassage,
            passageText: details.passageText || "",
            answer: ans.answer,
            expectedAnswer: details.expectedAnswer || "",
          };
        });

        setQuestions(processed);

        // 4) Build summary
        const totalQuestions = testData?.questions?.length || processed.length;
        const attempted = processed.filter(
          (q) => q.status !== "not-answered"
        ).length;
        const correct = processed.filter((q) => q.status === "correct").length;

        const mcqScore = latestAttempt.mcqScore || 0;
        const subjectiveScore = latestAttempt.subjectiveScore || 0;
        const totalMarks =
          latestAttempt.totalMarks ?? mcqScore + subjectiveScore;

        const hasMCQ = processed.some((q) => q.type === "mcq");
        const hasSubjective = processed.some((q) => q.type !== "mcq");

        let summary = [
          { label: "Total Questions", value: totalQuestions },
          { label: "Attempted Questions", value: attempted },
          { label: "Correct Answers", value: correct },
        ];

        if (hasMCQ && !hasSubjective) {
          summary.push({ label: "MCQ Marks Obtained", value: mcqScore });
        } else if (hasMCQ && hasSubjective) {
          summary.push(
            { label: "MCQ Marks Obtained", value: mcqScore },
            { label: "Subjective Marks Obtained", value: subjectiveScore },
            { label: "Total Marks Obtained", value: totalMarks }
          );
        } else if (!hasMCQ && hasSubjective) {
          summary.push(
            { label: "Subjective Marks Obtained", value: subjectiveScore },
            { label: "Total Marks Obtained", value: totalMarks }
          );
        }

        setSummaryData(summary);
      } catch (err) {
        console.error(err);
        toast.error("Could not load results");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, attemptId, userId, navigate]);

  if (loading) return <div>Loading results…</div>;
  if (!test) return <div>Unable to load your attempt.</div>;

  const current = questions[currentIndex] || {};
  const isMCQ = current.type === "mcq";
  const isPassage = current.isPassage;

  // counts for the 3 indicators
  const counts = questions.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    return acc;
  }, {});
  const getCount = (st) => counts[st] || 0;

  // circular nav
  const goPrev = () => {
    if (!questions.length) return;
    setCurrentIndex((i) => (i - 1 + questions.length) % questions.length);
  };
  const goNext = () => {
    if (!questions.length) return;
    setCurrentIndex((i) => (i + 1) % questions.length);
  };

  const ExpectedAnswer = ({ html }) => {
    if (!html) return null;
    return (
      <div style={{ marginTop: 16 }}>
        <p>
          <strong>Expected Answer:</strong>
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  };

  return (
    <Container>
      <Content $sidebarOpen={sidebarOpen}>
        <ToggleSidebarBtn
          onClick={() => setSidebarOpen((s) => !s)}
          aria-label="Toggle question navigator"
          title={sidebarOpen ? "Hide navigator" : "Show navigator"}
        >
          {sidebarOpen ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </ToggleSidebarBtn>

        {/* HEADER — Back + Title tight */}
        <Header>
          <LeftDiv>
            <LeftIcon onClick={() => navigate(-1)} aria-label="Back">
              <FaAngleLeft />
            </LeftIcon>
            <HeaderLeft />
            <PageTitle title={test?.title || "Mock Test"}>
              {test?.title || "Mock Test"}
            </PageTitle>
          </LeftDiv>

          <QuestionType>{isPassage ? "Passage" : isMCQ ? "MCQ" : "Subjective"}</QuestionType>
        </Header>

        <SummaryContainer>
          {summaryData.map((s, i) => (
            <SummaryItem key={i}>
              <SummaryLabel>{s.label}</SummaryLabel>
              <SummaryValue>{s.value}</SummaryValue>
            </SummaryItem>
          ))}
        </SummaryContainer>

        <QuestionNumber>
          <QuestionTitle>Question {currentIndex + 1}</QuestionTitle>
        </QuestionNumber>

        <Section>
          {current.isPassage ? (
            <PassageContainer>
              <PassageSection>
                <PassageBox
                  dangerouslySetInnerHTML={{ __html: current.passageText }}
                />
              </PassageSection>

              <QuestionSection>
                <QuestionBox>
                  <QuestionText
                    dangerouslySetInnerHTML={{ __html: current.text }}
                  />
                  {isMCQ ? (
                    <OptionsList>
                      {current.options.map((opt, idx) => {
                        const isSel = idx === current.selectedOption;
                        const isCor = idx === current.correctAnswer;
                        let cls = "plain";
                        if (isSel && current.status === "correct")
                          cls = "correct-attempted";
                        if (isSel && current.status === "incorrect")
                          cls = "incorrect-attempted";
                        if (!isSel && isCor) cls = "correct-unattempted";

                        return (
                          <OptionLabel key={idx} status={cls}>
                            <input type="radio" checked={isSel} readOnly />
                            {opt.text || opt}
                            {isCor && (
                              <span style={{ marginLeft: 10, color: "green" }}>
                                (Correct)
                              </span>
                            )}
                          </OptionLabel>
                        );
                      })}
                    </OptionsList>
                  ) : (
                    <div>
                      <p>
                        <strong>Your Answer:</strong>
                      </p>
                      <p>{current.answer || <em>Not Answered</em>}</p>
                    </div>
                  )}
                  <ExpectedAnswer html={current.expectedAnswer} />
                </QuestionBox>
              </QuestionSection>
            </PassageContainer>
          ) : (
            <>
              <PassageBox dangerouslySetInnerHTML={{ __html: current.text }} />
              <HorizontalLine />
              <QuestionBox>
                {isMCQ ? (
                  <OptionsList>
                    {current.options.map((opt, idx) => {
                      const isSel = idx === current.selectedOption;
                      const isCor = idx === current.correctAnswer;
                      let cls = "plain";
                      if (isSel && current.status === "correct")
                        cls = "correct-attempted";
                      if (isSel && current.status === "incorrect")
                        cls = "incorrect-attempted";
                      if (!isSel && isCor) cls = "correct-unattempted";

                      return (
                        <OptionLabel key={idx} status={cls}>
                          <input type="radio" checked={isSel} readOnly />
                          {opt.text || opt}
                          {isCor && (
                            <span style={{ marginLeft: 10, color: "green" }}>
                              (Correct)
                            </span>
                          )}
                        </OptionLabel>
                      );
                    })}
                  </OptionsList>
                ) : (
                  <div>
                    <p>
                      <strong>Your Answer:</strong>
                    </p>
                    <p>{current.answer || <em>Not Answered</em>}</p>
                  </div>
                )}
                <ExpectedAnswer html={current.expectedAnswer} />
              </QuestionBox>
            </>
          )}
        </Section>

        {/* STICKY ACTION BAR — parity with Test screen */}
        <StickyActionBar>
          <LeftButtonsWrap>
            <button className="prev" onClick={goPrev}>Previous</button>
            <button className="next" onClick={goNext}>Next</button>
          </LeftButtonsWrap>

          <RightStickyButton onClick={() => navigate("/user")}>
            Back to Dashboard
          </RightStickyButton>
        </StickyActionBar>
      </Content>

      {/* Sidebar with 3 indicators, scrollable question map */}
      <SidebarContainer $open={sidebarOpen}>
        <Divider />
        <Legend>
          <OptionLabelList>
            <LegendItem className="correct">{getCount("correct")}</LegendItem>
            <LegendText>Correct</LegendText>
          </OptionLabelList>

          <OptionLabelList>
            <LegendItem className="incorrect">
              {getCount("incorrect")}
            </LegendItem>
            <LegendText>Incorrect</LegendText>
          </OptionLabelList>

          <OptionLabelList>
            <LegendItem className="not-answered">
              {getCount("not-answered")}
            </LegendItem>
            <LegendText>Not Answered</LegendText>
          </OptionLabelList>
        </Legend>

        <QuestionNav>
          <Grid>
            {questions.map((_, i) => (
              <GridButton
                key={i}
                className={questions[i].status} // correct | incorrect | not-answered
                active={i === currentIndex}
                onClick={() => setCurrentIndex(i)}
              >
                {i + 1}
              </GridButton>
            ))}
          </Grid>
        </QuestionNav>
      </SidebarContainer>
    </Container>
  );
}
