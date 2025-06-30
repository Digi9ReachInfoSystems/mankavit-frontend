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
  Divider, Legend, OptionLabelList, LegendText, LegendItem,
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
import { getAttemptById } from '../../../../api/mocktestApi';

// Status constants
const STATUS = {
  UNATTEMPTED: 'unattempted',
  NOT_ANSWERED: 'not-answered',
  ANSWERED: 'answered',
  NOT_ANSWERED_MARKED: 'not-answered-marked-for-review',
  ANSWERED_MARKED: 'answered-marked-for-review'
};

export default function TextScreen() {
  const { testId, subjectId, attemptId: urlAttemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();
  const [actionPerformed, setActionPerformed] = useState(false);

  const [mockTest, setMockTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ m: 0, s: 0 });
  const [loading, setLoading] = useState(true);
  const [initialTime, setInitialTime] = useState(0);
  const [testStartTime, setTestStartTime] = useState(null);

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

        // Initialize test start time
        const startTime = Date.now();
        setTestStartTime(startTime);

        // Check for existing time in localStorage
        const timeKey = `testTime_${testId}_${urlAttemptId}`;
        const storedTime = localStorage.getItem(timeKey);

        if (storedTime) {
          const { remainingMinutes, remainingSeconds, timestamp } = JSON.parse(storedTime);
          const timeElapsedMs = Date.now() - timestamp;
          const timeElapsedSeconds = Math.floor(timeElapsedMs / 1000);

          let totalRemainingSeconds = (remainingMinutes * 60) + remainingSeconds - timeElapsedSeconds;

          // Ensure we don't go negative
          totalRemainingSeconds = Math.max(0, totalRemainingSeconds);

          const minutes = Math.floor(totalRemainingSeconds / 60);
          const seconds = totalRemainingSeconds % 60;
          setTimeLeft({ m: minutes, s: seconds });
        } else {
          setTimeLeft({ m: test.duration, s: 0 });
          // Save initial time to localStorage
          localStorage.setItem(timeKey, JSON.stringify({
            remainingMinutes: test.duration,
            remainingSeconds: 0,
            timestamp: startTime
          }));
        }

        // 2) fetch existing attempts
        let attempt = null;
        if (urlAttemptId) {
          // Use the new endpoint to get full attempt details
          const resAttempt = await getAttemptById(urlAttemptId);
          attempt = unwrap(resAttempt);
        } else {
          const resAttempts = await getMocktestAttempts(userId, testId);
          const arr = unwrap(resAttempts) || [];

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

        // 3) build answers state with status from API response
        setAnswers(test.questions.map((q, index) => {
          const saved = (attempt.answers || []).find(a => a.questionId === q._id) || {};
          return {
            attemptId: attempt._id,
            questionId: q._id,
            answer: saved.answer || '',
            answerIndex: saved.answerIndex ?? null,
            status: saved.status || STATUS.UNATTEMPTED,
            questionNumber: index + 1
          };
        }));

      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Failed to load test.');
        navigate('/error', { state: { message: err.message } });
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, subjectId, userId, urlAttemptId, actionPerformed]);

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
        // Save time every 30 seconds to localStorage
        if (s % 30 === 0) {
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

  const handleOptionSelect = idx => {
    const opt = currentQ.options[idx];
    const text = typeof opt === 'object' ? opt.text : opt;

    let newStatus = STATUS.ANSWERED;
    if (currAns.status === STATUS.NOT_ANSWERED_MARKED ||
      currAns.status === STATUS.ANSWERED_MARKED) {
      newStatus = STATUS.ANSWERED_MARKED;
    }

    updateAnswer({
      answer: text,
      answerIndex: idx,
      status: newStatus
    });
  };

  const handleTextChange = e => {
    let newStatus = STATUS.ANSWERED;
    if (currAns.status === STATUS.NOT_ANSWERED_MARKED ||
      currAns.status === STATUS.ANSWERED_MARKED) {
      newStatus = STATUS.ANSWERED_MARKED;
    }

    updateAnswer({
      answer: e.target.value,
      answerIndex: null,
      status: newStatus
    });
  };

  const handleMarkAndNext = async () => {
    const ans = answers[currentIndex];
    let newStatus;

    if (ans.answer || ans.answerIndex !== null) {
      newStatus = STATUS.ANSWERED_MARKED;
    } else {
      newStatus = STATUS.NOT_ANSWERED_MARKED;
    }

    const payload = {
      attemptId: ans.attemptId,
      user_id: userId,
      questionId: ans.questionId,
      status: newStatus
    };

    if (isMCQ) {
      payload.userAnswerIndex = ans.answerIndex;
      payload.answer = ans.answer;
    } else {
      payload.answer = ans.answer;
    }

    try {
      await saveMocktest(payload);
      updateAnswer({ status: newStatus });

      // Move to next question if available
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save answer');
    } finally {
      setActionPerformed(!actionPerformed);
    }
  };

  const saveAndNext = async () => {
    const ans = answers[currentIndex];
    const payload = {
      attemptId: ans.attemptId,
      user_id: userId,
      questionId: ans.questionId,
      status: STATUS.ANSWERED
    };

    if (isMCQ) {
      payload.userAnswerIndex = ans.answerIndex;
      payload.answer = ans.answer;
    } else {
      payload.answer = ans.answer;
    }

    try {
      await saveMocktest(payload);
      updateAnswer({ status: STATUS.ANSWERED });

      // Move to next question if available
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save answer');
    } finally {
      setActionPerformed(!actionPerformed);
    }
  };

  const handleClear = async () => {
    const ans = answers[currentIndex];
    const payload = {
      attemptId: ans.attemptId,
      user_id: userId,
      questionId: ans.questionId,
      status: STATUS.NOT_ANSWERED,
      answer: '',
      answerIndex: null
    };

    try {
      await saveMocktest(payload);
      updateAnswer({
        answer: '',
        answerIndex: null,
        status: STATUS.NOT_ANSWERED
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to clear answer');
    } finally {
      setActionPerformed(!actionPerformed);
    }
  };

  const handleSubmit = async () => {
    const ans = answers[currentIndex];

    try {
      // Save current answer before submitting
      const payload = {
        attemptId: ans.attemptId,
        user_id: userId,
        questionId: ans.questionId,
        status: ans.status
      };
      const timeKey = `testTime_${testId}_${urlAttemptId}`;
      if (isMCQ) {
        payload.userAnswerIndex = ans.answerIndex;
        payload.answer = ans.answer;
      } else {
        payload.answer = ans.answer;
      }

      await saveMocktest(payload);

      // Then submit the test 
      const res = await submitMocktest({
        attemptId: ans.attemptId,
        user_id: userId
      });

      const data = unwrap(res);
      if (data) {
        // localStorage.removeItem(`testTime_${testId}_${urlAttemptId}`);
        localStorage.removeItem(timeKey);
        toast.success('Test submitted successfully');
        navigate(`/test-results/${testId}/${subjectId}/${urlAttemptId}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit test');
    }
  };


  const getStatusCounts = () => {
    const counts = {
      unattempted: 0,
      answered: 0,
      answeredMarked: 0,
      notAnsweredMarked: 0,
      notAnswered: 0
    };

    answers.forEach(answer => {
      switch (answer.status) {
        case STATUS.UNATTEMPTED:
          counts.unattempted++;
          break;
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
        default:
          counts.unattempted++;
      }
    });

    return counts;
  };

  // Keep the original getStatus function for question buttons
  const getStatus = n => {
    const answer = answers[n - 1];
    if (!answer) return 'unattempted';

    // If this is the current question and it's not answered, show as not-answered
    if ((n - 1) === currentIndex &&
      answer.status !== STATUS.ANSWERED &&
      answer.status !== STATUS.ANSWERED_MARKED) {
      return 'not-answered';
    }

    switch (answer.status) {
      case STATUS.ANSWERED:
        return 'answered';
      case STATUS.ANSWERED_MARKED:
        return 'answered-marked';
      case STATUS.NOT_ANSWERED_MARKED:
        return 'not-answered-marked';
      case STATUS.NOT_ANSWERED:
        return 'not-answered';
      default:
        return 'unattempted';
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <LeftDiv>
            <LeftIcon onClick={() => navigate(-1)}><FaAngleLeft /></LeftIcon>
            <HeaderLeft><Language>ENG</Language></HeaderLeft>
          </LeftDiv>
          <RightIcon><FaAngleRight /></RightIcon>
        </Header>

        <QuestionType>{isMCQ ? 'MCQ' : 'Subjective'}</QuestionType>
        <Timer>
          <Text>Time Left:</Text>
          <TimeSlot>
            {String(timeLeft.m).padStart(2, '0')}:
            {String(timeLeft.s).padStart(2, '0')}
          </TimeSlot>
        </Timer>

        <Complier>
          <QuestionNumber>
            <QuestionTitle>Q {currentIndex + 1}</QuestionTitle>
          </QuestionNumber>
          <Section>
            <PassageBox><p>{currentQ.questionText}</p></PassageBox>
            <HorizontalLine />
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
            <NextButton onClick={saveAndNext}>Save & Next</NextButton>
          </RightButton>
        </ButtonGroup>
      </Content>

      <SidebarContainer>
        {/* <UserCard>
          <UserImage src={Profile} alt="user" />
          <UserInfo>
            <UserName>You</UserName>
            <UserEmail>{userId}</UserEmail>
          </UserInfo>
        </UserCard> */}
        <Divider />

        <Legend>
          <OptionLabelList>
            <LegendItem className="unattempted">
              {getStatusCounts().unattempted}
            </LegendItem>
            <LegendText>Unattempted</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="answered">
              {getStatusCounts().answered}
            </LegendItem>
            <LegendText>Answered</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="answered-marked">
              {getStatusCounts().answeredMarked}
            </LegendItem>
            <LegendText>Answered & Marked</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="not-answered-marked">
              {getStatusCounts().notAnsweredMarked}
            </LegendItem>
            <LegendText>Not Answered & Marked</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="not-answered">
              {getStatusCounts().notAnswered}
            </LegendItem>
            <LegendText>Not Answered</LegendText>
          </OptionLabelList>
        </Legend>

        <QuestionNav>
          <Grid>
            {questions.map((_, i) => (
              <GridButton
                key={i}
                className={getStatus(i + 1)}
                onClick={() => setCurrentIndex(i)}
                active={currentIndex === i}
              >
                {i + 1}
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