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
  PageTitle,
  StickyActionBar,
  LeftButtonsWrap,
  RightStickyButton,
  PassageContainer,
} from "../UserViewAttempResult/UserViewAttempResult.style";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";

import {
  getMocktestById,
  viewUserMocktestAttemptResult,
} from "../../../../api/mocktestApi";

import styled from "styled-components";

// local layout helpers
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

// Helper component for expected answer display
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

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false); // closed by default on mobile
  const [passageExpanded, setPassageExpanded] = useState(false);

  const unwrap = (r) => r?.data?.body?.data ?? r?.data;

  // reset passage clamp on question change
  useEffect(() => {
    setPassageExpanded(false);
  }, [currentIndex]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        // 1) get user attempt result
        const res = await viewUserMocktestAttemptResult(userId, mockTestId);
        // console.log("Result", res);
        if (!res.success) throw new Error(res.message || "Invalid response");
        const { result, ranking } = res;
        setAttempt(result);
        setRanking(ranking);

        // 2) get test metadata
        const resTest = await getMocktestById(mockTestId);
        const testData = unwrap(resTest);
        setTest(testData);

        // 3) build summary
        const totalQuestions = testData?.questions?.length || 0;
        const attempted = (result.answers || []).filter(
          (a) => a.status !== "unattempted" && a.status !== "not-answered"
        ).length;
        const correct = (result.answers || []).filter(
          (a) => a.isCorrect === true
        ).length;

        const hasMCQ =
          testData?.questions?.some((q) => q.type === "mcq") || false;
        const hasSubjective =
          testData?.questions?.some((q) => q.type !== "mcq") || false;

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
            if (a.questionDetails.type === "mcq") {
              normalizedStatus = a.answerIndex==a.questionDetails.correctAnswer ? "correct" : "incorrect";
            } else {
              normalizedStatus = a.isCorrect ? "correct" : "incorrect";
            }
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
            expectedAnswer:
              d.expectedAnswer ||
              d.explanation ||
              d.solution ||
              d.answerExplanation ||
              d.explanationHtml ||
              "",
            isCorrect: a.isCorrect,
            marks: a.marksAwarded || 0,
            maxMarks: d.marks || 0,
            type: d.type || "mcq",
            status: normalizedStatus,
          };
        });
        setQuestions(proc);
      } catch (err) {
        toast.error(err.message || "Could not load results");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [userId, mockTestId, navigate]);

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

  // open question, auto-close sidebar on mobile
  const onPickQuestion = (i) => {
    setCurrentIndex(i);
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  // Mobile clamp (read more/less) — ~6 lines
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
      {/* Fixed mobile toggle button (right middle) */}
      <ToggleSidebarBtn
        onClick={() => setSidebarOpen((s) => !s)}
        aria-label="Toggle question navigator"
        title={sidebarOpen ? "Hide navigator" : "Show navigator"}
      >
        {sidebarOpen ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
      </ToggleSidebarBtn>

      <Content $sidebarOpen={sidebarOpen}>
        {/* Header — Back + Title + Rank */}
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

        <QuestionType>
          {isPass ? "Passage" : isMCQ ? "MCQ" : "Subjective"}
        </QuestionType>

        {/* Summary */}
        <SummaryContainer>
          {summaryData.map((s, i) => (
            <SummaryItem key={i}>
              <SummaryLabel>{s.label}</SummaryLabel>
              <SummaryValue>{s.value}</SummaryValue>
            </SummaryItem>
          ))}
        </SummaryContainer>

        {/* Question wrapper */}
        <Complier>
          <QuestionNumber>
            <QuestionTitle>Question {currentIndex + 1}</QuestionTitle>
          </QuestionNumber>

          <Section>
            {isPass ? (
              <PassageContainer>
                <PassageSection>
                  <PassageBox>{renderPassage(current.passageText)}</PassageBox>
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
                                <span
                                  style={{ marginLeft: 10, color: "green" }}
                                >
                                  (Correct)
                                </span>
                              )}
                            </OptionLabel>
                          );
                        })}
                        <ExpectedAnswer html={current.expectedAnswer} />
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
                <PassageBox
                  dangerouslySetInnerHTML={{ __html: current.text }}
                />
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
                    </div>
                  )}
                  <ExpectedAnswer html={current.expectedAnswer} />
                </QuestionBox>
              </>
            )}
          </Section>
        </Complier>

        {/* Sticky action bar — always visible (sticky on mobile too) */}
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
            {questions.map((q, i) => (
              <GridButton
                key={i}
                className={q.status}
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
