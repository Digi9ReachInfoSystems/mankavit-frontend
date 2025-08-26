// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { toast } from "react-toastify";

// import { FaAngleDoubleLeft } from "react-icons/fa";
// import { FaAngleDoubleRight } from "react-icons/fa";
// import styled from "styled-components";
// import {
//   Container,
//   Content,
//   Header,
//   LeftDiv,
//   LeftIcon,
//   HeaderLeft,
//   Language,
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
//   RankBadge,
//   AttemptInfo,
//   ToggleSidebarBtn,
// } from "../UserViewAttempResult/UserViewAttempResult.style";
// import {
//   getMocktestById,
//   viewUserMocktestAttemptResult,
// } from "../../../../api/mocktestApi";
// import { getCookiesData } from "../../../../utils/cookiesService";

// // --- styled components for passage layout ---
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

// // Helper component for expected answer display
// const ExpectedAnswer = ({ html }) => {
//   if (!html) return null;
//   return (
//     <div style={{ marginTop: 16 }}>
//       <p>
//         <strong>Expected Answer:</strong>
//       </p>
//       <div dangerouslySetInnerHTML={{ __html: html }} />
//     </div>
//   );
// };

// export default function UserViewAttempResult() {
//   const { userId, mockTestId } = useParams();
//   const navigate = useNavigate();

//   const [test, setTest] = useState(null);
//   const [attempt, setAttempt] = useState(null);
//   const [ranking, setRanking] = useState(null);
//   const [remainingAttempts, setRemainingAttempts] = useState(0);
//   const [summaryData, setSummaryData] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const unwrap = (r) => r?.data?.body?.data ?? r?.data;

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         setLoading(true);

//         // 1) get user attempt result
//         const res = await viewUserMocktestAttemptResult(userId, mockTestId);
//         console.log("viewUserMocktestAttemptResult", res);
//         if (!res.success) throw new Error(res.message || "Invalid response");
//         const { result, ranking, remainigAttempts } = res;
//         setAttempt(result);
//         setRanking(ranking);
//         setRemainingAttempts(remainigAttempts);

//         // 2) get test metadata
//         const resTest = await getMocktestById(mockTestId);
//         const testData = unwrap(resTest);
//         setTest(testData);

//         // 3) build summary
//         // 3) build summary
//         const totalQuestions = testData.questions?.length || 0;
//         const attempted = (result.answers || []).filter(
//           (a) => a.status !== "unattempted" && a.status !== "not-answered"
//         ).length;
//         const correct = (result.answers || []).filter(
//           (a) => a.isCorrect === true
//         ).length;

//         // Determine if test has MCQ and/or subjective questions
//         const hasMCQ =
//           testData.questions?.some((q) => q.type === "mcq") || false;
//         const hasSubjective =
//           testData.questions?.some((q) => q.type !== "mcq") || false;

//         const mcqScore = result.mcqScore || 0;
//         const subjectiveScore = result.subjectiveScore || 0;
//         const totalMarks = result.totalMarks || mcqScore + subjectiveScore;

//         let summary = [
//           { label: "Total Questions", value: totalQuestions },
//           { label: "Attempted Questions", value: attempted },
//           { label: "Correct Answers", value: correct },
//         ];

//         // Conditionally add marks based on test type
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
//           // Only Subjective
//           summary.push(
//             { label: "Subjective Marks Obtained", value: subjectiveScore },
//             { label: "Total Marks Obtained", value: totalMarks }
//           );
//         }

//         // Add ranking if available
//         if (ranking?.rank) {
//           summary.push({ label: "Rank", value: `#${ranking.rank}` });
//         }

//         setSummaryData(summary);

//         // 4) process questions, including passage and normalize status
//         const proc = (result.answers || []).map((a) => {
//           const raw = a.status || "unattempted";
//           const status = raw.endsWith("-for-review")
//             ? raw.replace("-for-review", "")
//             : raw;
//           const d = a.questionDetails || {};

//           // Normalize to 3 status types: correct, incorrect, not-answered
//           let normalizedStatus = "not-answered";
//           if (status === "answered" || status === "answered-marked") {
//             normalizedStatus = a.isCorrect ? "correct" : "incorrect";
//           } else if (
//             status === "unattempted" ||
//             status === "not-answered-marked"
//           ) {
//             normalizedStatus = "not-answered";
//           }

//           return {
//             id: a.questionId,
//             text: d.questionText || "",
//             passageText: d.passageText || "",
//             isPassage: !!d.isPassage,
//             options: d.options || [],
//             selectedOption: a.answerIndex,
//             selectedAnswer: a.answer,
//             correctAnswer: d.correctAnswer,
//             expectedAnswer: d.expectedAnswer || "",
//             isCorrect: a.isCorrect,
//             marks: a.marksAwarded || 0,
//             maxMarks: d.marks || 0,
//             type: d.type || "mcq",
//             status: normalizedStatus, // Use normalized status
//             originalStatus: status, // Keep original for display if needed
//           };
//         });
//         setQuestions(proc);
//       } catch (err) {
//         console.error("Load error:", err);
//         toast.error(err.message || "Could not load results");
//         navigate(-1);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, [userId, mockTestId, navigate]);

  

//   if (loading) return <div>Loading results...</div>;
//   if (!attempt || !test) return <div>Unable to load your attempt.</div>;

//   const current = questions[currentIndex] || {};
//   const isMCQ = current.type === "mcq";
//   const isPass = current.isPassage;

//   // count statuses using normalized status
//   const counts = questions.reduce((c, q) => {
//     c[q.status] = (c[q.status] || 0) + 1;
//     return c;
//   }, {});
//   const getCount = (st) => counts[st] || 0;

//   const goPrev = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);
//   const goNext = () =>
//     currentIndex < questions.length - 1 && setCurrentIndex((i) => i + 1);

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
//               {/* <AttemptInfo>
//                 Attempt {attempt.attemptNumber} — Submitted {new Date(attempt.submittedAt).toLocaleString()}
//               </AttemptInfo> */}
//             </HeaderLeft>
//           </LeftDiv>
//           {ranking?.rank && <RankBadge>Rank #{ranking.rank}</RankBadge>}
//         </Header>

//         <div style={{ flex: 1, textAlign: "left" }}>
//           <h4 style={{ margin: 0 }}>{test?.title || "Mock Test"}</h4>
//         </div>

//         <QuestionType>
//           {isPass ? "Passage" : isMCQ ? "MCQ" : "Subjective"}
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
//             {isPass ? (
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
//                           const sel = idx === current.selectedOption;
//                           const cor = idx === current.correctAnswer;
//                           let cls = "plain";
//                           if (sel && current.status === "correct")
//                             cls = "correct-attempted";
//                           if (sel && current.status === "incorrect")
//                             cls = "incorrect-attempted";
//                           if (!sel && cor) cls = "correct-unattempted";

//                           return (
//                             <OptionLabel key={idx} status={cls}>
//                               <input type="radio" checked={sel} readOnly />
//                               {opt.text || opt}
//                               {cor && (
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
//                         <p>{current.selectedAnswer || <em>Not Answered</em>}</p>
//                         <ExpectedAnswer html={current.expectedAnswer} />
//                       </div>
//                     )}
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
//                         const sel = idx === current.selectedOption;
//                         const cor = idx === current.correctAnswer;
//                         let cls = "plain";
//                         if (sel && current.status === "correct")
//                           cls = "correct-attempted";
//                         if (sel && current.status === "incorrect")
//                           cls = "incorrect-attempted";
//                         if (!sel && cor) cls = "correct-unattempted";

//                         return (
//                           <OptionLabel key={idx} status={cls}>
//                             <input type="radio" checked={sel} readOnly />
//                             {opt.text || opt}
//                             {cor && (
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
//                       <p>{current.selectedAnswer || <em>Not Answered</em>}</p>
//                       <ExpectedAnswer html={current.expectedAnswer} />
//                     </div>
//                   )}
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
//             {questions.map((q, i) => (
//               <GridButton
//                 key={i}
//                 className={q.status} // Use normalized status
//                 active={i === currentIndex}
//                 onClick={() => setCurrentIndex(i)}
//               >
//                 {i + 1}
//               </GridButton>
//             ))}
//           </Grid>
//         </QuestionNav>

//         <FooterButtons>
//           {/* {remainingAttempts > 0 && (
//             <NextButton onClick={() => navigate(`/test-instructions/${mockTestId}`)}>
//               Retake
//             </NextButton>
//           )} */}
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
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import {
  Container,
  Content,
  Header,
  LeftDiv,
  LeftIcon,
  HeaderLeft,
  QuestionType,
  Complier,
  QuestionNumber,
  QuestionTitle,
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
  SummaryContainer,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  RankBadge,
  ToggleSidebarBtn,
  // NEW (same as other screens)
  PageTitle,
  StickyActionBar,
  LeftButtonsWrap,
  RightStickyButton,
} from "../UserViewAttempResult/UserViewAttempResult.style";

import {
  getMocktestById,
  viewUserMocktestAttemptResult,
} from "../../../../api/mocktestApi";

// Helper component for expected answer display
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

// Local layout helpers
import styled from "styled-components";
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

export default function UserViewAttempResult() {
  const { userId, mockTestId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unwrap = (r) => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        // 1) get user attempt result
        const res = await viewUserMocktestAttemptResult(userId, mockTestId);
        if (!res.success) throw new Error(res.message || "Invalid response");
        const { result, ranking, remainigAttempts } = res;
        setAttempt(result);
        setRanking(ranking);

        // 2) get test metadata
        const resTest = await getMocktestById(mockTestId);
        const testData = unwrap(resTest);
        setTest(testData);

        // 3) build summary
        const totalQuestions = testData.questions?.length || 0;
        const attempted = (result.answers || []).filter(
          (a) => a.status !== "unattempted" && a.status !== "not-answered"
        ).length;
        const correct = (result.answers || []).filter(
          (a) => a.isCorrect === true
        ).length;

        const hasMCQ = testData.questions?.some((q) => q.type === "mcq") || false;
        const hasSubjective =
          testData.questions?.some((q) => q.type !== "mcq") || false;

        const mcqScore = result.mcqScore || 0;
        const subjectiveScore = result.subjectiveScore || 0;
        const totalMarks = result.totalMarks || mcqScore + subjectiveScore;

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

        if (ranking?.rank) {
          summary.push({ label: "Rank", value: `#${ranking.rank}` });
        }
        setSummaryData(summary);

        // 4) normalize questions to: correct | incorrect | not-answered
        const proc = (result.answers || []).map((a) => {
          const raw = a.status || "unattempted";
          const status = raw.endsWith("-for-review")
            ? raw.replace("-for-review", "")
            : raw;
          const d = a.questionDetails || {};

          let normalizedStatus = "not-answered";
          if (status === "answered" || status === "answered-marked") {
            normalizedStatus = a.isCorrect ? "correct" : "incorrect";
          } else if (
            status === "unattempted" ||
            status === "not-answered-marked"
          ) {
            normalizedStatus = "not-answered";
          }

          return {
            id: a.questionId,
            text: d.questionText || "",
            passageText: d.passageText || "",
            isPassage: !!d.isPassage,
            options: d.options || [],
            selectedOption: a.answerIndex,
            selectedAnswer: a.answer,
            correctAnswer: d.correctAnswer,
            expectedAnswer: d.expectedAnswer || "",
            isCorrect: a.isCorrect,
            marks: a.marksAwarded || 0,
            maxMarks: d.marks || 0,
            type: d.type || "mcq",
            status: normalizedStatus,
          };
        });
        setQuestions(proc);
      } catch (err) {
        console.error("Load error:", err);
        toast.error(err.message || "Could not load results");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [userId, mockTestId, navigate]);

  if (loading) return <div>Loading results...</div>;
  if (!attempt || !test) return <div>Unable to load your attempt.</div>;

  const current = questions[currentIndex] || {};
  const isMCQ = current.type === "mcq";
  const isPass = current.isPassage;

  // counts for legend
  const counts = questions.reduce((c, q) => {
    c[q.status] = (c[q.status] || 0) + 1;
    return c;
  }, {});
  const getCount = (st) => counts[st] || 0;

  const goPrev = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);
  const goNext = () =>
    currentIndex < questions.length - 1 && setCurrentIndex((i) => i + 1);

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

        {/* Tight header — Back + Title inline */}
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

          {ranking?.rank && <RankBadge>Rank #{ranking.rank}</RankBadge>}
        </Header>

        <QuestionType>{isPass ? "Passage" : isMCQ ? "MCQ" : "Subjective"}</QuestionType>

        <SummaryContainer>
          {summaryData.map((s, i) => (
            <SummaryItem key={i}>
              <SummaryLabel>{s.label}</SummaryLabel>
              <SummaryValue>{s.value}</SummaryValue>
            </SummaryItem>
          ))}
        </SummaryContainer>

        <Complier>
          <QuestionNumber>
            <QuestionTitle>Question {currentIndex + 1}</QuestionTitle>
          </QuestionNumber>

          <Section>
            {isPass ? (
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
                          const sel = idx === current.selectedOption;
                          const cor = idx === current.correctAnswer;
                          let cls = "plain";
                          if (sel && current.status === "correct")
                            cls = "correct-attempted";
                          if (sel && current.status === "incorrect")
                            cls = "incorrect-attempted";
                          if (!sel && cor) cls = "correct-unattempted";

                          return (
                            <OptionLabel key={idx} status={cls}>
                              <input type="radio" checked={sel} readOnly />
                              {opt.text || opt}
                              {cor && (
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
                        <p>{current.selectedAnswer || <em>Not Answered</em>}</p>
                        <ExpectedAnswer html={current.expectedAnswer} />
                      </div>
                    )}
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
                        const sel = idx === current.selectedOption;
                        const cor = idx === current.correctAnswer;
                        let cls = "plain";
                        if (sel && current.status === "correct")
                          cls = "correct-attempted";
                        if (sel && current.status === "incorrect")
                          cls = "incorrect-attempted";
                        if (!sel && cor) cls = "correct-unattempted";

                        return (
                          <OptionLabel key={idx} status={cls}>
                            <input type="radio" checked={sel} readOnly />
                            {opt.text || opt}
                            {cor && (
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
                      <p>{current.selectedAnswer || <em>Not Answered</em>}</p>
                      <ExpectedAnswer html={current.expectedAnswer} />
                    </div>
                  )}
                </QuestionBox>
              </>
            )}
          </Section>
        </Complier>

        {/* Sticky action bar — always visible */}
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

      {/* Sidebar with 3 indicators + scrollable map */}
      <SidebarContainer $open={sidebarOpen}>
        <Divider />
        <Legend>
          <OptionLabelList>
            <LegendItem className="correct">{getCount("correct")}</LegendItem>
            <LegendText>Correct</LegendText>
          </OptionLabelList>

          <OptionLabelList>
            <LegendItem className="incorrect">{getCount("incorrect")}</LegendItem>
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
            {questions.map((q, i) => (
              <GridButton
                key={i}
                className={q.status}
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
