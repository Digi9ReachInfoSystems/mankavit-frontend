import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import {
  Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
  RightIcon, QuestionType, Timer, Text, TimeSlot,
  Complier, QuestionNumber, QuestionTitle, Section, PassageBox, HorizontalLine,
  QuestionBox, QuestionText, OptionsList, OptionLabel, ButtonGroup,
  LeftButton, ReviewButton, ClearButton, RightButton, NextButton,
  SidebarContainer, UserCard, UserImage, UserInfo, UserName, UserEmail,
  Divider, Legend, OptionLabelList, LegendText, LegendItem,
  QuestionNav, Grid, GridButton, FooterButtons, SaveButton,
  SummaryContainer, SummaryItem, SummaryLabel, SummaryValue
} from './ResultScreen.styles';
import {
  getMocktestById,
  getMocktestAttempts
} from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';

export default function ResultScreen() {
  const { testId, subjectId, attemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [test, setTest] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summaryData, setSummaryData] = useState([]);

  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // Load test data
        const resTest = await getMocktestById(testId);
        const testData = unwrap(resTest);
        setTest(testData);

        // Load attempt data
        const resAtts = await getMocktestAttempts(userId, testId);
        const latestAttempt = resAtts.data[resAtts.data.length - 1];
        setAttempt(latestAttempt);

        // Process questions for detailed view
        const processedQuestions = latestAttempt.answers.map(answer => ({
          id: answer.questionId,
          text: answer.questionDetails?.questionText || 'Question',
          options: answer.questionDetails?.options || [],
          selectedOption: answer.answerIndex,
          correctAnswer: answer.questionDetails?.correctAnswer,
          isCorrect: answer.isCorrect,
          marks: answer.marksAwarded || 0,
          explanation: answer.questionDetails?.expectedAnswer || '',
          type: answer.questionDetails?.type || 'mcq',
          status: answer.status || 'unattempted'
        }));
        
        setQuestions(processedQuestions);

        // Set summary data
        setSummaryData([
          { label: 'Total Questions', value: testData.questions.length || 0 },
          {
            label: 'Attempted Questions',
            value: latestAttempt.answers.filter(a => a.answerIndex !== null).length || 0
          },
          {
            label: 'Correct Answers',
            value: latestAttempt.answers.filter(a => a.isCorrect).length || 0
          },
          { label: 'MCQ Marks Obtained', value: latestAttempt.mcqScore || 0 },
          { label: 'Subjective Marks Obtained', value: latestAttempt.subjectiveScore || 0 },
          { label: 'Total Marks Obtained', value: latestAttempt.totalMarks || 0 }
        ]);

      } catch (err) {
        console.error('Failed to load results:', err);
        toast.error(err.message || 'Could not load results');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, attemptId, userId, navigate]);

  if (loading) return <div>Loading results…</div>;
  if (!attempt) return <div>Unable to load your attempt.</div>;

  const currentQuestion = questions[currentIndex];
  const isMCQ = currentQuestion?.type === 'mcq';
  const canRetake = test.maxAttempts > attempt.attemptNumber;

  const getStatusCounts = () => {
    const counts = {
      unattempted: 0,
      answered: 0,
      answeredMarked: 0,
      notAnsweredMarked: 0,
      notAnswered: 0
    };

    questions.forEach(question => {
      switch (question.status) {
        case 'unattempted':
          counts.unattempted++;
          break;
        case 'answered':
          counts.answered++;
          break;
        case 'answered-marked':
          counts.answeredMarked++;
          break;
        case 'not-answered-marked':
          counts.notAnsweredMarked++;
          break;
        case 'not-answered':
          counts.notAnswered++;
          break;
        default:
          counts.unattempted++;
      }
    });

    return counts;
  };

  const getStatus = n => {
    const question = questions[n - 1];
    if (!question) return 'unattempted';

    if ((n - 1) === currentIndex &&
      question.status !== 'answered' &&
      question.status !== 'answered-marked') {
      return 'not-answered';
    }

    switch (question.status) {
      case 'answered':
        return 'answered';
      case 'answered-marked':
        return 'answered-marked';
      case 'not-answered-marked':
        return 'not-answered-marked';
      case 'not-answered':
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
          <Text>Result Analysis</Text>
        </Timer>

        {/* Summary Section */}
        <SummaryContainer>
          {summaryData.map((item, index) => (
            <SummaryItem key={index}>
              <SummaryLabel>{item.label}</SummaryLabel>
              <SummaryValue>{item.value}</SummaryValue>
            </SummaryItem>
          ))}
        </SummaryContainer>

        <Complier>
          <QuestionNumber>
            <QuestionTitle>Q {currentIndex + 1}</QuestionTitle>
          </QuestionNumber>
          <Section>
            <PassageBox dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
            <HorizontalLine />
            <QuestionBox>
              {isMCQ ? (
                <OptionsList>
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = currentQuestion.selectedOption === idx;
                    const isCorrect = currentQuestion.correctAnswer === idx;
                    let status = 'unattempted';

                    if (isSelected && isCorrect) status = 'correct-attempted';
                    else if (isSelected && !isCorrect) status = 'incorrect-attempted';
                    else if (!isSelected && isCorrect) status = 'correct-unattempted';
                    else if (!isSelected && !isCorrect) status = 'incorrect-unattempted';

                    return (
                      <OptionLabel key={idx} status={status}>
                        <input
                          type="radio"
                          checked={isSelected}
                          readOnly
                        />
                        {option.text}
                        {isCorrect && <span style={{color: 'green', marginLeft: '10px'}}>(Correct Answer)</span>}
                      </OptionLabel>
                    );
                  })}
                </OptionsList>
              ) : (
                <div>
                  <p><strong>Your Answer:</strong></p>
                  <p>{currentQuestion.selectedOption || 'No answer provided'}</p>
                </div>
              )}
              
              <div style={{ marginTop: '20px' }}>
                <p><strong>Marks Obtained:</strong> {currentQuestion.marks}</p>
                {currentQuestion.explanation && (
                  <div style={{ marginTop: '10px' }}>
                    <p><strong>Explanation:</strong></p>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>
            </QuestionBox>
          </Section>
        </Complier>

        <ButtonGroup>
          <LeftButton>
            <ClearButton onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}>
              Previous
            </ClearButton>
          </LeftButton>
          <RightButton>
            <NextButton onClick={() => currentIndex < questions.length - 1 && setCurrentIndex(currentIndex + 1)}>
              Next
            </NextButton>
          </RightButton>
        </ButtonGroup>
      </Content>

      <SidebarContainer>
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
          {/* {canRetake && (
            <NextButton onClick={() => navigate(`/test-instructions/${testId}/${subjectId}`)}>
              Retake Test
            </NextButton>
          )} */}
          <NextButton onClick={() => navigate('/user')}>
            Back to Dashboard
          </NextButton>
        </FooterButtons>
      </SidebarContainer>
    </Container>
  );
}