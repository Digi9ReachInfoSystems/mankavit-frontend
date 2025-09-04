import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import {
  Container,
  Content,
  Header,
  LeftDiv,
  LeftIcon,
  HeaderLeft,
  // Language, // not shown to tighten spacing
  QuestionType,
  Timer,
  Text,
  TimeSlot,
  Complier,
  QuestionNumber,
  QuestionTitle,
  Section,
  PassageBox,
  HorizontalLine,
  QuestionBox,
  QuestionText,
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
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalButtons,
  ModalButton,
  ToggleSidebarBtn,
  StickyActionBar,
  LeftButtonsWrap,
  SubmitButton,
  PageTitle,
} from "./TextScreen.styles";
import { FaAngleLeft } from "react-icons/fa6";
import {
  getMocktestById,
  getMocktestAttempts,
  startMocktest,
  saveMocktest,
  submitMocktest,
  getAttemptById,
  saveforLaterMockTestUseAttempt,
  updateMocktestLastsavedTime,
  checkMockTestAttempted,
} from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { RxDoubleArrowRight } from "react-icons/rx";
import { RxDoubleArrowLeft } from "react-icons/rx";

// Status constants
const STATUS = {
  UNATTEMPTED: "unattempted",
  NOT_ANSWERED: "not-answered",
  ANSWERED: "answered",
  NOT_ANSWERED_MARKED: "not-answered-marked-for-review",
  ANSWERED_MARKED: "answered-marked-for-review",
};

const PassageContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const PassageContent = styled.div`
  flex: 1;
  padding: 15px;
  border-right: ${(props) => (props.hasPassage ? "1px solid #ddd" : "none")};
`;

const QuestionContent = styled.div`
  flex: 1;
  padding: 15px;
`;

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{message}</ModalTitle>
        <ModalButtons>
          <ModalButton onClick={onClose}>No</ModalButton>
          <ModalButton primary onClick={onConfirm}>
            Yes
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

// Helper to check if a question is blank
const isBlank = (ans, isMcq) => {
  if (!ans) return true;
  if (isMcq) return ans.answerIndex === null || ans.answerIndex === undefined;
  return !ans.answer || ans.answer.trim() === "";
};

export default function TextScreen() {
  const { testId, subjectId, attemptId: urlAttemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [mockTest, setMockTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ m: 0, s: 0 });
  const [loading, setLoading] = useState(true);
  const [initialTime, setInitialTime] = useState(0);
  const [testStartTime, setTestStartTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSaveForLater, setShowSaveForLater] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (!urlAttemptId || !userId) return;

    // Call immediately once
    updateMocktestLastsavedTime({ attemptId: urlAttemptId, user_id: userId })
      .then(() => {
        // console.log("Auto-saved immediately")
      })
      .catch((err) => {
        // console.error("Auto-save failed:", err)
      });

    // Then every 60 seconds
    const interval = setInterval(() => {
      updateMocktestLastsavedTime({ attemptId: urlAttemptId, user_id: userId })
        .then(() => {
          // console.log("Auto-saved attempt progress")
        })
        .catch((err) => {
          // console.error("Auto-save failed:", err)
        });
    }, 60000);

    // Cleanup when leaving page
    return () => clearInterval(interval);
  }, [urlAttemptId, userId]);

  // unwrap { data } or { body: { data } }
  const unwrap = (r) => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // 1) fetch test
        const resTest = await getMocktestById(testId);
        const test = unwrap(resTest);
        setMockTest(test);
        setQuestions(test.questions);
        // setInitialTime(test.duration);
        // console.log("location", location);
        const checkPauseAttempt = await checkMockTestAttempted(
          userId,
          testId,
          subjectId
        );
        setInitialTime(checkPauseAttempt.remainingTime ?? test.duration);
        if (checkPauseAttempt?.remainingTime) {
          localStorage.removeItem(`testTime_${testId}_${urlAttemptId}`);
        }
        // Initialize test start time
        const startTime = Date.now();
        setTestStartTime(startTime);

        // Check for existing time in localStorage
        const timeKey = `testTime_${testId}_${urlAttemptId}`;
        const storedTime = localStorage.getItem(timeKey);
        // console.log("storedTime", storedTime);

        if (storedTime) {
          const { remainingMinutes, remainingSeconds, timestamp } =
            JSON.parse(storedTime);
          const timeElapsedMs = Date.now() - timestamp;
          const timeElapsedSeconds = Math.floor(timeElapsedMs / 1000);

          let totalRemainingSeconds =
            remainingMinutes * 60 + remainingSeconds - timeElapsedSeconds;

          totalRemainingSeconds = Math.max(0, totalRemainingSeconds);

          const minutes = Math.floor(totalRemainingSeconds / 60);
          const seconds = totalRemainingSeconds % 60;
          setTimeLeft({ m: minutes, s: seconds });
        } else {
          const remaining = checkPauseAttempt.remainingTime; // e.g. 98.07
          let minutes = 0;
          let seconds = 0;
          if (remaining !== undefined && remaining !== null) {
            const [minStr, secStr] = remaining.toString().split(".");

            minutes = parseInt(minStr, 10); // "98" -> 98
            seconds = parseInt(secStr?.padEnd(2, "0"), 10) || 0; // "07" -> 7

            // console.log("Minutes:", minutes, "Seconds:", seconds);
          }
          // setTimeLeft({ m: test.duration, s: 0 });
          setTimeLeft({ m: minutes, s: seconds });

          localStorage.setItem(
            timeKey,
            JSON.stringify({
              remainingMinutes: minutes,
              remainingSeconds: seconds,
              timestamp: startTime,
            })
          );
        }

        // 2) fetch existing attempts
        let attempt = null;
        if (urlAttemptId) {
          const resAttempt = await getAttemptById(urlAttemptId);
          attempt = unwrap(resAttempt);
        } else {
          const resAttempts = await getMocktestAttempts(userId, testId);
          const arr = unwrap(resAttempts) || [];

          if (arr.length >= test.maxAttempts) {
            toast.error(
              `You have reached the maximum of ${test.maxAttempts} attempts.`
            );
            return navigate(-1);
          }

          const resStart = await startMocktest({
            mockTestId: testId,
            subject: subjectId,
            user_id: userId,
          });
          attempt = unwrap(resStart);
        }

        if (!urlAttemptId && attempt._id) {
          navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`, {
            replace: true,
          });
        }

        // 3) build answers state with status from API response
        setAnswers(
          test.questions.map((q, index) => {
            const saved =
              (attempt.answers || []).find((a) => a.questionId === q._id) || {};
            // derive status if API didn't send it
            let status = saved.status || STATUS.UNATTEMPTED;
            if (!saved.status) {
              const mcq = q.type === "mcq";
              if (!isBlank(saved, mcq)) status = STATUS.ANSWERED;
            }
            return {
              attemptId: attempt._id,
              questionId: q._id,
              answer: saved.answer || "",
              answerIndex:
                saved.userAnswerIndex ??
                saved.answerIndex ??
                (typeof saved.answerIndex === "number"
                  ? saved.answerIndex
                  : null),
              status,
              questionNumber: index + 1,
            };
          })
        );
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load test.");
        navigate("/error", { state: { message: err.message } });
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, subjectId, userId, urlAttemptId, navigate]);

  // Mark question 1 as NOT_ANSWERED on first render if it's blank (so it shows red once viewed)
  useEffect(() => {
    if (loading || !answers.length || !questions.length) return;
    setAnswers((prev) => {
      const copy = [...prev];
      const q0 = copy[0];
      if (
        q0 &&
        q0.status === STATUS.UNATTEMPTED &&
        isBlank(q0, questions[0].type === "mcq")
      ) {
        copy[0] = { ...q0, status: STATUS.NOT_ANSWERED };
      }
      return copy;
    });
    // run once after initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, answers.length, questions.length]);

  // countdown
  useEffect(() => {
    if (loading || !initialTime) return;

    const timeKey = `testTime_${testId}_${urlAttemptId}`;

    const handleBeforeUnload = () => {
      localStorage.setItem(
        timeKey,
        JSON.stringify({
          remainingMinutes: timeLeft.m,
          remainingSeconds: timeLeft.s,
          timestamp: Date.now(),
        })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const timer = setInterval(() => {
      setTimeLeft(({ m, s }) => {
        if (s % 30 === 0) {
          localStorage.setItem(
            timeKey,
            JSON.stringify({
              remainingMinutes: m,
              remainingSeconds: s,
              timestamp: Date.now(),
            })
          );
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
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loading, initialTime, testId, urlAttemptId, timeLeft.m, timeLeft.s]);

  if (loading) return <div>Loading…</div>;
  if (!mockTest) return <div>No test data</div>;

  const currentQ = questions[currentIndex];
  const currAns = answers[currentIndex] || {};
  const isMCQ = currentQ.type === "mcq";
  const hasPassage = currentQ.isPassage;

  function updateAnswer(upd) {
    setAnswers((a) => {
      const copy = [...a];
      copy[currentIndex] = { ...copy[currentIndex], ...upd };
      return copy;
    });
  }

  const handleOptionSelect = (idx) => {
    const opt = currentQ.options[idx];
    const text = typeof opt === "object" ? opt.text : opt;

    let newStatus = STATUS.ANSWERED;
    if (
      currAns.status === STATUS.NOT_ANSWERED_MARKED ||
      currAns.status === STATUS.ANSWERED_MARKED
    ) {
      newStatus = STATUS.ANSWERED_MARKED;
    }

    updateAnswer({
      answer: text,
      answerIndex: idx,
      status: newStatus,
    });
  };

  const handleTextChange = (e) => {
    const value = e.target.value;

    let newStatus = STATUS.ANSWERED;
    if (
      currAns.status === STATUS.NOT_ANSWERED_MARKED ||
      currAns.status === STATUS.ANSWERED_MARKED
    ) {
      newStatus = STATUS.ANSWERED_MARKED;
    }

    updateAnswer({
      answer: value,
      answerIndex: null,
      status: newStatus,
    });
  };



// 1) Mark & Next — compute the status and pass it to goToQuestion.
//    We also optimistically update local state so Legend/Grid update instantly.
const handleMarkAndNext = async () => {
  if (isSaving) return;
  setIsSaving(true);

  const ans = answers[currentIndex];
  const isMcq = questions[currentIndex].type === "mcq";
  const blank = isBlank(ans, isMcq);

  const newStatus = blank
    ? STATUS.NOT_ANSWERED_MARKED
    : STATUS.ANSWERED_MARKED;

  // optimistic UI update
  setAnswers(prev =>
    prev.map((a, idx) => (idx === currentIndex ? { ...a, status: newStatus } : a))
  );

  try {
    // if not the last question, let goToQuestion persist the status we just chose
    if (currentIndex < questions.length - 1) {
      await goToQuestion(currentIndex + 1, {
        forcePrevStatus: newStatus,
        prevAnswer: ans.answer || "",
        prevAnswerIndex: isMcq ? ans.answerIndex : null,
      });
    } else {
      // last question → persist here
      await saveMocktest({
        attemptId: ans.attemptId,
        user_id: userId,
        questionId: ans.questionId,
        status: newStatus,
        answer: ans.answer || "",
        userAnswerIndex: isMcq ? ans.answerIndex : null,
      });
    }
  } catch (err) {
    console.error("Failed to mark for review:", err);
    toast.error("Could not save marked status");
  } finally {
    setIsSaving(false);
  }
};


  const saveAndNext = async () => {
    const ans = answers[currentIndex];
    const empty = isBlank(ans, isMCQ);

    const newStatus = empty ? STATUS.NOT_ANSWERED : STATUS.ANSWERED;

    const payload = {
      attemptId: ans.attemptId,
      user_id: userId,
      questionId: ans.questionId,
      status: newStatus,
      answer: empty ? "" : ans.answer,
      userAnswerIndex: isMCQ ? (empty ? null : ans.answerIndex) : null,
    };

    try {
      await saveMocktest(payload);

      setAnswers((prev) => {
        const copy = [...prev];
        copy[currentIndex] = {
          ...copy[currentIndex],
          status: newStatus,
          answer: empty ? "" : ans.answer,
          answerIndex: empty ? null : ans.answerIndex,
        };
        return copy;
      });

      if (currentIndex < questions.length - 1) {
        goToQuestion(currentIndex + 1);
      } else {
        goToQuestion(0);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save answer");
    }
  };

  // const goToQuestion = async (i) => {
  //   const prevAns = answers[currentIndex];
  //   const newAns = answers[i];

  //   // Ensure leaving question is classified properly
  //   if (
  //     prevAns &&
  //     currentIndex !== i &&
  //     prevAns.status === STATUS.UNATTEMPTED &&
  //     isBlank(prevAns, questions[currentIndex].type === "mcq")
  //   ) {
  //     const payload = {
  //       attemptId: prevAns.attemptId,
  //       user_id: userId,
  //       questionId: prevAns.questionId,
  //       status: STATUS.NOT_ANSWERED,
  //       answer: "",
  //       userAnswerIndex:
  //         questions[currentIndex].type === "mcq" ? null : undefined,
  //     };
  //     try {
  //       await saveMocktest(payload);
  //     } catch (err) {
  //       console.error("Failed to auto-mark not-answered on navigation", err);
  //     } finally {
  //       setAnswers((prev) => {
  //         const copy = [...prev];
  //         copy[currentIndex] = {
  //           ...copy[currentIndex],
  //           answer: "",
  //           answerIndex: null,
  //           status: STATUS.NOT_ANSWERED,
  //         };
  //         return copy;
  //       });
  //     }
  //   }

  //   // When visiting a question for the first time and it's blank → NOT_ANSWERED.
  //   if (
  //     newAns &&
  //     newAns.status === STATUS.UNATTEMPTED &&
  //     isBlank(newAns, questions[i].type === "mcq")
  //   ) {
  //     setAnswers((prev) => {
  //       const copy = [...prev];
  //       copy[i] = { ...copy[i], status: STATUS.NOT_ANSWERED };
  //       return copy;
  //     });
  //   }

  //   setCurrentIndex(i);
  // };


  // Replace your goToQuestion with this:
// 2) goToQuestion — accept an override so we DON'T read the stale status.
//    Only auto-classify if nothing was forced and it was truly UNATTEMPTED.
const goToQuestion = async (i, opts = {}) => {
  const { forcePrevStatus, prevAnswer, prevAnswerIndex } = opts;
  const prevAns = answers[currentIndex];
  const nextAns = answers[i];

  if (prevAns && currentIndex !== i) {
    const prevIsMcq = questions[currentIndex].type === "mcq";

    let statusToSave = forcePrevStatus ?? prevAns.status;
    if (!forcePrevStatus && statusToSave === STATUS.UNATTEMPTED) {
      statusToSave = isBlank(prevAns, prevIsMcq)
        ? STATUS.NOT_ANSWERED
        : STATUS.ANSWERED;
    }

    try {
      await saveMocktest({
        attemptId: prevAns.attemptId,
        user_id: userId,
        questionId: prevAns.questionId,
        status: statusToSave,
        answer: prevAnswer ?? prevAns.answer ?? "",
        userAnswerIndex: prevIsMcq
          ? (prevAnswerIndex ?? prevAns.answerIndex ?? null)
          : null,
      });
    } catch (err) {
      console.error("Failed to save on navigation", err);
    } finally {
      // reflect the exact status we persisted
      setAnswers(prev => {
        const copy = [...prev];
        copy[currentIndex] = { ...copy[currentIndex], status: statusToSave };
        return copy;
      });
    }
  }

  // First visit of a blank question → show as NOT_ANSWERED (red)
  if (
    nextAns &&
    nextAns.status === STATUS.UNATTEMPTED &&
    isBlank(nextAns, questions[i].type === "mcq")
  ) {
    setAnswers(prev => {
      const copy = [...prev];
      copy[i] = { ...copy[i], status: STATUS.NOT_ANSWERED };
      return copy;
    });
  }

  setCurrentIndex(i);
};



  const handleClear = async () => {
    const ans = answers[currentIndex];

    const payload = {
      attemptId: ans.attemptId,
      user_id: userId,
      questionId: ans.questionId,
      status: STATUS.NOT_ANSWERED,
      answer: "",
      userAnswerIndex: null,
    };

    try {
      await saveMocktest(payload);

      setAnswers((prev) => {
        const copy = [...prev];
        copy[currentIndex] = {
          ...copy[currentIndex],
          answer: "",
          answerIndex: null,
          status: STATUS.NOT_ANSWERED,
        };
        return copy;
      });

      toast.info("Response cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear answer");
    }
  };

  // const handleSubmit = async () => {
  //   const ans = answers[currentIndex];

  //   try {
  //     // Save current answer before submitting
  //     const payload = {
  //       attemptId: ans.attemptId,
  //       user_id: userId,
  //       questionId: ans.questionId,
  //       status: ans.status,
  //     };
  //     const timeKey = `testTime_${testId}_${urlAttemptId}`;
  //     if (isMCQ) {
  //       payload.userAnswerIndex = ans.answerIndex;
  //       payload.answer = ans.answer;
  //     } else {
  //       payload.answer = ans.answer;
  //     }

  //     // await saveMocktest(payload);

  //     // Then submit the test
  //     const res = await submitMocktest({
  //       attemptId: ans.attemptId,
  //       user_id: userId,
  //     });
  //     const data = unwrap(res);
  //     if (data) {
  //       localStorage.removeItem(timeKey);
  //       toast.success("Test submitted successfully");
  //       navigate(`/test-results/${testId}/${subjectId}/${urlAttemptId}`);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to submit test");
  //   }
  // };

  const handleSubmit = async () => {
  const ans = answers[currentIndex];

  try {

    let finalStatus;
    if (isBlank(ans, isMCQ)) {
      finalStatus = STATUS.NOT_ANSWERED;
    } else {
      finalStatus = STATUS.ANSWERED;
    }

    const payload = {
      attemptId: ans.attemptId,
      user_id: userId,
      questionId: ans.questionId,
      status: finalStatus,
      answer: ans.answer || "",
      userAnswerIndex: isMCQ ? ans.answerIndex : null,
    };
    await saveMocktest(payload);

    const timeKey = `testTime_${testId}_${urlAttemptId}`;
    if (isMCQ) {
        payload.userAnswerIndex = ans.answerIndex;
        payload.answer = ans.answer;
      } else {
        payload.answer = ans.answer;
      }

      // await saveMocktest(payload);

      // Then submit the test
      const res = await submitMocktest({
        attemptId: ans.attemptId,
        user_id: userId,
      });
      const data = unwrap(res);
      if (data) {
        localStorage.removeItem(timeKey);
        toast.success("Test submitted successfully");
        navigate(`/test-results/${testId}/${subjectId}/${urlAttemptId}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit test");
    }
  };


  const handleSaveForLater = async () => {
    try {
      const payload = {
        attemptId: urlAttemptId,
        user_id: userId,
      };
      const res = await saveforLaterMockTestUseAttempt(payload);
      if (res.success) {
        toast.success("Mocktest saved for later successfully");
        navigate(`/user`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save for later");
    }
  };

  const handleSubmitClick = () => setShowConfirmation(true);
  const handleCancelSubmit = () => setShowConfirmation(false);

  const handleSaveForLaterClick = () => setShowSaveForLater(true);
  const handleCancelSaveForLater = () => setShowSaveForLater(false);

  // —— Counts derived ONLY from status (no content checks) ——
  const getStatusCounts = () => {
    const counts = {
      unattempted: 0,
      answered: 0,
      answeredMarked: 0,
      notAnsweredMarked: 0,
      notAnswered: 0,
    };
    for (const a of answers) {
      switch (a?.status) {
        case STATUS.ANSWERED:
          counts.answered++;
          break;
        case STATUS.ANSWERED_MARKED:
          counts.answeredMarked++;
          break;
        case STATUS.NOT_ANSWERED_MARKED:
          counts.notAnsweredMarked++;
          break;
        case STATUS.NOT_ANSWERED:
          counts.notAnswered++;
          break;
        case STATUS.UNATTEMPTED:
        default:
          counts.unattempted++;
          break;
      }
    }
    return counts;
  };

  // —— Grid tile className derived ONLY from status ——
  const getStatus = (n) => {
    const st = answers[n - 1]?.status;
    switch (st) {
      case STATUS.ANSWERED:
        return "answered";
      case STATUS.ANSWERED_MARKED:
        return "answered-marked";
      case STATUS.NOT_ANSWERED_MARKED:
        return "not-answered-marked";
      case STATUS.NOT_ANSWERED:
        return "not-answered";
      case STATUS.UNATTEMPTED:
      default:
        return "unattempted";
    }
  };

  return (
    <Container>
      <Content $sidebarOpen={sidebarOpen}>
        <ToggleSidebarBtn
          onClick={() => setSidebarOpen((s) => !s)}
          aria-label="Toggle question navigator"
          title={sidebarOpen ? "Hide navigator" : "Show navigator"}
        >
          {sidebarOpen ? <RxDoubleArrowRight  /> : <RxDoubleArrowLeft />}
        </ToggleSidebarBtn>

        {/* HEADER — Back + Title tight */}
        <Header>
          <LeftDiv>
            <LeftIcon onClick={() => navigate(-1)} aria-label="Back">
              <FaAngleLeft />
            </LeftIcon>
            <HeaderLeft />
            <PageTitle title={mockTest?.title || "Mock Test"}>
              {mockTest?.title || "Mock Test"}
            </PageTitle>
          </LeftDiv>

          <Timer>
            <QuestionType>{isMCQ ? "MCQ" : "Subjective"}</QuestionType>
            <Text>— Time Left:</Text>
            <TimeSlot>
              {String(timeLeft.m).padStart(2, "0")}:
              {String(timeLeft.s).padStart(2, "0")}
            </TimeSlot>
          </Timer>
        </Header>

        <Complier>
          <QuestionNumber>
            <QuestionTitle>Question {currentIndex + 1}</QuestionTitle>
          </QuestionNumber>

          <Section>
            {hasPassage ? (
              <PassageContainer>
                <PassageContent hasPassage={hasPassage}>
                  <PassageBox
                    dangerouslySetInnerHTML={{ __html: currentQ.passageText }}
                  />
                </PassageContent>
                <QuestionContent>
                  <QuestionBox>
                    <QuestionText
                      dangerouslySetInnerHTML={{
                        __html: currentQ.questionText,
                      }}
                    />
                    {isMCQ ? (
                      <OptionsList>
                        {currentQ.options.map((opt, idx) => {
                          const label =
                            typeof opt === "object" ? opt.text : opt;
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
                </QuestionContent>
              </PassageContainer>
            ) : (
              <>
                <PassageBox
                  dangerouslySetInnerHTML={{ __html: currentQ.questionText }}
                />
                <HorizontalLine />
                <QuestionBox>
                  {isMCQ ? (
                    <OptionsList>
                      {currentQ.options.map((opt, idx) => {
                        const label = typeof opt === "object" ? opt.text : opt;
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
              </>
            )}
          </Section>
        </Complier>

        {/* STICKY ACTION BAR — always visible, one line */}
        <StickyActionBar>
          <LeftButtonsWrap>
          <button className="review" onClick={handleMarkAndNext} disabled={isSaving}>
  {isSaving ? "Marking..." : "Mark & Next"}
</button>
            <button className="clear" onClick={handleClear}>
              Clear Response
            </button>
          </LeftButtonsWrap>

          <LeftButtonsWrap>
            {" "}
            <button className="save" onClick={saveAndNext}>
              Save & Next
            </button>
            <SubmitButton onClick={handleSaveForLaterClick}>
              Save Test
            </SubmitButton>
            <SubmitButton onClick={handleSubmitClick}>Submit Test</SubmitButton>
          </LeftButtonsWrap>
        </StickyActionBar>
      </Content>

      <SidebarContainer $open={sidebarOpen}>
        <Divider />

     <Legend>
  {Object.entries(getStatusCounts()).map(([key, count]) => {
    let className;
    switch (key) {
      case "answered":
        className = "answered";
        break;
      case "notAnswered":
        className = "not-answered";
        break;
      case "notAnsweredMarked":
        className = "not-answered-marked";
        break;
      case "unattempted":
        className = "unattempted";
        break;
      case "answeredMarked":
        className = "answered-marked";
        break;
      default:
        return null;
    }
    return (
      <OptionLabelList key={key}>
        <LegendItem className={className}>{count}</LegendItem>
        <LegendText>
          {key === "answeredMarked"
            ? "Answered & Marked"
            : key === "notAnsweredMarked"
            ? "Marked"
            : key === "notAnswered"
            ? "Not Answered"
            : key === "unattempted"
            ? "Not Visited"
            : key.charAt(0).toUpperCase() + key.slice(1)}
        </LegendText>
      </OptionLabelList>
    );
  })}
</Legend>

        {/* SCROLLABLE QUESTION MAP */}
        <QuestionNav>
          <Grid>
            {questions.map((_, i) => (
              <GridButton
                key={i}
                className={getStatus(i + 1)}
                onClick={() => goToQuestion(i)}
                active={currentIndex === i}
              >
                {i + 1}
              </GridButton>
            ))}
          </Grid>
        </QuestionNav>
      </SidebarContainer>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCancelSubmit}
        message={"Do you want to submit the test?"}
        onConfirm={handleSubmit}
      />
      <ConfirmationModal
        isOpen={showSaveForLater}
        message={"Do you want to save the test for later?"}
        onClose={handleCancelSaveForLater}
        onConfirm={handleSaveForLater}
      />
    </Container>
  );
}

