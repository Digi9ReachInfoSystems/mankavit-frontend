import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
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
  PageTitle,
  StickyActionBar,
  LeftButtonsWrap,
  RightStickyButton,
  PassageContainer,
  RankBadge,
  CloseSidebarBtn,
} from "./ResultScreen.styles";
import {
  getMocktestById,
  getMocktestAttempts,
  viewUserMocktestAttemptResult,
} from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";

// Local helpers for this file only
const PassageSection = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
);
const QuestionSection = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
);

export default function ResultScreen() {
  const { testId, subjectId, attemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summaryData, setSummaryData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [passageExpanded, setPassageExpanded] = useState(false);
  const [ranking, setRanking] = useState(null);
  const unwrap = (r) => r?.data?.body?.data ?? r?.data;

  // reset passage expand on question change
  useEffect(() => {
    setPassageExpanded(false);
  }, [currentIndex]);

  useEffect(() => {
    (async () => {
      try {
        const resTest = await getMocktestById(testId);
        const testData = unwrap(resTest);
        setTest(testData);

        // const resAtts = await getMocktestAttempts(userId, testId);
        // console.log("resAtts", resAtts);
        // const arr = unwrap(resAtts) || [];
        //  const latestAttempt =
        //   arr.find((a) => a._id === attemptId) || arr[arr.length - 1] || {};
        const res = await viewUserMocktestAttemptResult(userId, testId);
        const { result, ranking } = res;
        const latestAttempt = result;
        setRanking(ranking);
        // Normalize to 3 statuses
        const processed = (latestAttempt.answers || []).map((ans) => {
          const details = ans.questionDetails || {};
          const type = details.type || "mcq";
          // console.log("answer",ans);
          let status = "not-answered";
          if (type === "mcq") {
            if (ans.answerIndex != null) {
              // status = ans.isCorrect ? "correct" : "incorrect";
              status =
                ans.answerIndex == ans.questionDetails.correctAnswer
                  ? "correct"
                  : "incorrect";
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
                status = "not-answered";
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

        // Build summary (compact for mobile via styles)
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
        toast.error("Could not load results");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, attemptId, userId, navigate]);

  if (!test) return <div>Unable to load your attempt.</div>;

  const current = questions[currentIndex] || {};
  const isMCQ = current.type === "mcq";
  const isPassage = current.isPassage;

  // counts for legend pills
  const counts = questions.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    return acc;
  }, {});
  const getCount = (st) => counts[st] || 0;

  const goPrev = () => {
    if (!questions.length) return;
    setCurrentIndex((i) => (i - 1 + questions.length) % questions.length);
  };
  const goNext = () => {
    if (!questions.length) return;
    setCurrentIndex((i) => (i + 1) % questions.length);
  };

  const onPickQuestion = (i) => {
    setCurrentIndex(i);
    if (window.innerWidth <= 768) setSidebarOpen(false); // auto-close on mobile
  };

  const ExpectedAnswer = ({ html }) => {
    if (!html) return null;
    return (
      <div style={{ marginTop: 16 }}>
        <p>
          <strong>Explanation:</strong>
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  };

  // Mobile clamp (read more/less) — 6 lines default
  const renderPassage = (html) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (!isMobile) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return (
      <div>
        <div
          className={passageExpanded ? "passage-full" : "passage-clamped"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <button
          className="read-toggle"
          onClick={() => setPassageExpanded((v) => !v)}
        >
          {passageExpanded ? "Read less" : "Read more"}
        </button>
      </div>
    );
  };

  return (
    <Container>
      {/* Toggle button - visible when sidebar is closed */}
      <ToggleSidebarBtn
        $open={sidebarOpen}
        onClick={() => setSidebarOpen(true)}
        aria-label="Show question navigator"
        title="Show navigator"
      >
        <RxDoubleArrowLeft />
      </ToggleSidebarBtn>

      <Content $sidebarOpen={sidebarOpen}>
        <Header>
          <LeftDiv>
            <LeftIcon onClick={() => navigate(-1)} aria-label="Back">
              <FaAngleLeft />
            </LeftIcon>
            <HeaderLeft />
            <PageTitle title={test?.title || "Mock Test"}>
              {test?.title || "Mock Test"}
            </PageTitle>
            {ranking?.rank && <RankBadge>Rank #{ranking.rank}</RankBadge>}
          </LeftDiv>

          <QuestionType>
            {isPassage ? "Passage" : isMCQ ? "MCQ" : "Subjective"}
          </QuestionType>
        </Header>

        {/* Compact summary */}
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
                <PassageBox>{renderPassage(current.passageText)}</PassageBox>
              </PassageSection>

              <QuestionSection>
                <QuestionBox>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
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
                            <span className="option-text">
                              {opt.text || opt}
                            </span>
                            {isCor && (
                              <span
                                style={{
                                  marginLeft: 10,
                                  color: "green",
                                  flex: "0 0 auto",
                                }}
                              >
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
                    <p>{current.answer || <em>Loading answers ...</em>}</p>
                  </div>
                )}
                <ExpectedAnswer html={current.expectedAnswer} />
              </QuestionBox>
            </>
          )}
        </Section>

        <StickyActionBar>
          <LeftButtonsWrap>
            <button className="prev" onClick={goPrev}>
              Previous
            </button>
            <button className="next" onClick={goNext}>
              Next
            </button>
          </LeftButtonsWrap>

          <RightStickyButton onClick={() => navigate("/user")}>
            Back to Dashboard
          </RightStickyButton>
        </StickyActionBar>
      </Content>

      {/* Slide-in Sidebar (Question Map) */}
      <SidebarContainer $open={sidebarOpen}>
        {sidebarOpen && ( // Add this condition
          <CloseSidebarBtn
            aria-label="Close navigator"
            title="Close navigator"
            onClick={() => setSidebarOpen(false)}
          >
            <RxDoubleArrowRight /> {/* Show close arrow */}
          </CloseSidebarBtn>
        )}
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
                className={questions[i].status}
                active={i === currentIndex}
                onClick={() => onPickQuestion(i)}
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
