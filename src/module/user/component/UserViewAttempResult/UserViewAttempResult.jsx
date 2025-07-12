import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import {
  Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
   QuestionType, Timer, Text, 
  Complier, QuestionNumber, QuestionTitle, Section, PassageBox, HorizontalLine,
  QuestionBox,  OptionsList, OptionLabel, ButtonGroup,
  LeftButton, ClearButton, RightButton, NextButton,
  SidebarContainer,     
  Divider, Legend, OptionLabelList, LegendText, LegendItem,
  QuestionNav, Grid, GridButton, FooterButtons, 
  SummaryContainer, SummaryItem, SummaryLabel, SummaryValue,
  RankBadge, AttemptInfo
} from '../UserViewAttempResult/UserViewAttempResult.style';
import { getMocktestById } from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';
import { viewUserMocktestAttemptResult } from '../../../../api/mocktestApi';

export default function UserViewAttempResult() {
  const { userId, mockTestId } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        console.log('Fetching results for:', { userId, mockTestId });

        // Fetch user attempts with proper error handling
        const resAttempts = await viewUserMocktestAttemptResult(userId, mockTestId)
          .catch(err => {
            console.error('API Error:', err.response?.data || err.message);
            throw err;
          });

        console.log('API Response:', resAttempts);

        if (!resAttempts?.success) {
          throw new Error(resAttempts?.message || 'Invalid response from server');
        }

        const { result, ranking, remainigAttempts } = resAttempts;
        setAttempt(result);
        setRanking(ranking);
        setRemainingAttempts(remainigAttempts);
        
        // Fetch test details with error handling
        const resTest = await getMocktestById(mockTestId)
          .catch(err => {
            console.error('Failed to fetch test details:', err);
            toast.error('Failed to load test details');
            return { data: null };
          });

        setTest(resTest.data);
        
        // Set summary data
        setSummaryData([
          { label: 'Total Questions', value: result.mockTestId?.questions?.length || 0 },
          { label: 'MCQ Marks Obtained', value: result.mcqScore || 0 },
          { label: 'Subjective Marks Obtained', value: result.subjectiveScore || 0 },
          { label: 'Total Marks Obtained', value: result.totalMarks || 0 },
          { label: 'Rank', value: ranking?.rank ? `#${ranking.rank}` : 'N/A' },
          { label: 'Attempt Number', value: result.attemptNumber || 1 },
          { label: 'Remaining Attempts', value: remainigAttempts || 0 }
        ]);

        // Process questions for detailed view with null checks
        const processedQuestions = result.answers?.map(answer => ({
          id: answer.questionId,
          text: answer.questionDetails?.questionText || 'Question',
          options: answer.questionDetails?.options || [],
          selectedOption: answer.answerIndex,
          selectedAnswer: answer.answer,
          correctAnswer: answer.questionDetails?.correctAnswer,
          expectedAnswer: answer.questionDetails?.expectedAnswer,
          isCorrect: answer.isCorrect,
          marks: answer.marksAwarded || 0,
          maxMarks: answer.questionDetails?.marks || 0,
          explanation: answer.questionDetails?.explanation || '',
          type: answer.questionDetails?.type || 'mcq',
          status: answer.status || 'unattempted'
        })) || [];

        setQuestions(processedQuestions);

      } catch (err) {
        console.error('Failed to load results:', {
          message: err.message,
          response: err.response?.data,
          stack: err.stack
        });
        toast.error(err.response?.data?.message || err.message || 'Could not load results');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId, mockTestId, navigate]);

  if (loading) return <div className="loading-spinner">Loading results...</div>;
  if (!attempt) return <div className="error-message">Unable to load your attempt. Please try again later.</div>;

  const currentQuestion = questions[currentIndex];
  const isMCQ = currentQuestion?.type === 'mcq';
  const canRetake = remainingAttempts > 0;

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
            <HeaderLeft>
              <Language>ENG</Language>
              <AttemptInfo>
                Attempt: {attempt.attemptNumber} | Submitted: {new Date(attempt.submittedAt).toLocaleString()}
              </AttemptInfo>
            </HeaderLeft>
          </LeftDiv>
          {ranking?.rank && (
            <RankBadge>
              Rank: #{ranking.rank}
            </RankBadge>
          )}
        </Header>

        <QuestionType>Result Analysis</QuestionType>
        <Timer>
          <Text>Performance Summary</Text>
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
                  <p>{currentQuestion.selectedAnswer || 'No answer provided'}</p>
                  {currentQuestion.expectedAnswer && (
                    <div style={{ marginTop: '10px' }}>
                      <p><strong>Expected Answer:</strong></p>
                      <p>{currentQuestion.expectedAnswer}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div style={{ marginTop: '20px' }}>
                <p><strong>Marks Obtained:</strong> {currentQuestion.marks} / {currentQuestion.maxMarks}</p>
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
            <NextButton onClick={() => navigate(`/test-instructions/${mockTestId}/${test.subject}`)}>
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