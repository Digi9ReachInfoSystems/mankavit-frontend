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

  const [mockTest, setMockTest]   = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers]     = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft]   = useState({ m: 0, s: 0 });
  const [marked, setMarked]       = useState(new Set());
  const [answered, setAnswered]   = useState(new Set());
  const [loading, setLoading]     = useState(true);

  // unwrap { data } or { body: { data } }
  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // 1) fetch test
        const resTest = await getMocktestById(testId);
        const test    = unwrap(resTest);
        setMockTest(test);
        setQuestions(test.questions);
        setTimeLeft({ m: test.duration, s: 0 });

        // 2) fetch existing attempts
        const resAttempts = await getMocktestAttempts(userId, testId);
        const arr         = unwrap(resAttempts) || [];

        let attempt = null;
        // if URL already has an attemptId, load that one:
        if (urlAttemptId) {
          attempt = arr.find(a => a._id === urlAttemptId);
        }
        // otherwise, if fewer than maxAttempts, start fresh:
        if (!attempt) {
          if (arr.length >= test.maxAttempts) {
            toast.error(`You have reached the maximum of ${test.maxAttempts} attempts.`);
            return navigate(-1);
          }
          const resStart = await startMocktest({
            mockTestId: testId,
            subject:    subjectId,
            user_id:    userId
          });
          attempt = unwrap(resStart);
        }

        // if we just created it, push its ID into the URL
        if (!urlAttemptId && attempt._id) {
          navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`, { replace: true });
        }

        // 3) build answers state
        setAnswers(test.questions.map(q => {
          const saved = (attempt.answers || []).find(a => a.questionId === q._id) || {};
          return {
            attemptId:    attempt._id,
            questionId:   q._id,
            answer:       saved.answer || '',
            answerIndex:  saved.answerIndex ?? null
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
  }, [testId, subjectId, userId]);

  // countdown
  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setTimeLeft(({ m, s }) => {
        if (m === 0 && s === 0) {
          clearInterval(timer);
          handleSubmit();
          return { m: 0, s: 0 };
        }
        if (s > 0) return { m, s: s - 1 };
        return { m: m - 1, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading]);

  if (loading)    return <div>Loading…</div>;
  if (!mockTest)  return <div>No test data</div>;

  const currentQ = questions[currentIndex];
  const currAns  = answers[currentIndex] || {};
  const isMCQ    = currentQ.type === 'mcq';

  function updateAnswer(upd) {
    setAnswers(a => {
      const copy = [...a];
      copy[currentIndex] = { ...copy[currentIndex], ...upd };
      return copy;
    });
  }

  const handleOptionSelect = idx => {
    const opt  = currentQ.options[idx];
    const text = typeof opt === 'object' ? opt.text : opt;
    updateAnswer({ answer: text, answerIndex: idx });
  };
  const handleTextChange = e => {
    updateAnswer({ answer: e.target.value, answerIndex: null });
  };

  const handleMarkAndNext = () => {
    setMarked(m => new Set(m).add(currentIndex + 1));
    if (currentIndex + 1 < questions.length) setCurrentIndex(i => i + 1);
  };

  const saveAndNext = async () => {
    const ans     = answers[currentIndex];
    const payload = {
      attemptId:    ans.attemptId,
      user_id:      userId,
      questionId:   ans.questionId
    };
    if (isMCQ)      payload.userAnswerIndex = ans.answerIndex;
    else            payload.answer          = ans.answer;

    try {
      await saveMocktest(payload);
      toast.success('Answer saved');
      setAnswered(s => new Set(s).add(currentIndex + 1));
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(i => i + 1);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save answer');
    }
  };

  const handleClear = () => updateAnswer({ answer: '', answerIndex: null });

  const handleSubmit = async () => {
    const ans     = answers[currentIndex];
    const payload = {
      attemptId:  ans.attemptId,
      user_id:    userId,
      questionId: ans.questionId
    };
    if (currentQ.type === 'mcq')      payload.userAnswerIndex = ans.answerIndex;
    else                              payload.answer          = ans.answer;

    try {
      await saveMocktest(payload);
      const res = await submitMocktest({
        attemptId: ans.attemptId,
        user_id:   userId
      });
      const data = unwrap(res);
      if (data) {
        toast.success('Test submitted');
        navigate(`/test-results/${testId}/${subjectId}/${ans.attemptId}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit test');
    }
  };

  const getStatus = n => {
    if (marked.has(n))   return 'marked';
    if (answered.has(n)) return 'answered';
    if (n - 1 === currentIndex) return 'current';
    return 'default';
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
            <ClearButton  onClick={handleClear}>Clear Response</ClearButton>
          </LeftButton>
          <RightButton>
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
          {questions.map((_, i) => (
            <OptionLabelList key={i}>
              <LegendItem className={getStatus(i+1)}>{i+1}</LegendItem>
              <LegendText>{getStatus(i+1)}</LegendText>
            </OptionLabelList>
          ))}
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
          <SaveButton onClick={saveAndNext}>Save For Later</SaveButton>
          <NextButton onClick={handleSubmit}>Submit Test</NextButton>
        </FooterButtons>
      </SidebarContainer>
    </Container>
  );
}
