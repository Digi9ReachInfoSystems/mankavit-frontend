import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ResultsContainer,
  CardContainer,
  Header,
  Title,
  SummaryContainer,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  QuestionsContainer,
  QuestionItem,
  QuestionText,
  OptionsContainer,
  OptionItem,
  OptionBullet,
  OptionText,
  AnswerStatus,
  FooterButtons,
  RetakeButton,
  BackButton,
  QuestionNavButtons,
  NavButton,
  ContentWrapper,
  RankBadge,
  AttemptInfo
} from '../UserViewAttempResult/UserViewAttempResult.style';
import { getMocktestById } from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';
import { toast } from 'react-toastify';
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

        // const { result, ranking } = resAttempts.body;
        setAttempt(result);
        setRanking(ranking);
        
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
        //   { label: 'Total Marks', value: result.mockTestId?.totalMarks || 0 },
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
          type: answer.questionDetails?.type || 'mcq'
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <div className="loading-spinner">Loading results...</div>;
  if (!attempt) return <div className="error-message">Unable to load your attempt. Please try again later.</div>;

  const canRetake = test?.maxAttempts > attempt.attemptNumber;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <CardContainer>
      <ResultsContainer>
        <Header>
          <Title>Mock Test Result Analysis</Title>
          {ranking?.rank && (
            <RankBadge>
              Rank: #{ranking.rank}
            </RankBadge>
          )}
          <AttemptInfo>
            Attempt: {attempt.attemptNumber} | Submitted: {new Date(attempt.submittedAt).toLocaleString()}
          </AttemptInfo>
        </Header>

        <ContentWrapper>
          <SummaryContainer>
            {summaryData.map((item, index) => (
              <SummaryItem key={index}>
                <SummaryLabel>{item.label}</SummaryLabel>
                <SummaryValue>{item.value}</SummaryValue>
              </SummaryItem>
            ))}
          </SummaryContainer>

          <QuestionsContainer>
            {currentQuestion && (
              <QuestionItem>
                <QuestionText>
                  <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
                </QuestionText>

                {currentQuestion.type === 'mcq' ? (
                  <OptionsContainer>
                    {currentQuestion.options.map((option, optIndex) => {
                      const isSelected = currentQuestion.selectedOption === optIndex;
                      const isCorrect = currentQuestion.correctAnswer === optIndex;
                      let status = 'unattempted';

                      if (isSelected && isCorrect) status = 'correct-attempted';
                      else if (isSelected && !isCorrect) status = 'incorrect-attempted';
                      else if (!isSelected && isCorrect) status = 'correct-unattempted';
                      else if (!isSelected && !isCorrect) status = 'incorrect-unattempted';

                      return (
                        <OptionItem key={optIndex} status={status}>
                          <OptionBullet status={status}>
                            {isSelected ? '●' : '○'}
                          </OptionBullet>
                          <OptionText status={status}>{option.text}</OptionText>
                          {isCorrect && <AnswerStatus>Correct Answer</AnswerStatus>}
                        </OptionItem>
                      );
                    })}
                  </OptionsContainer>
                ) : (
                  <div>
                    <div style={{ margin: '10px 0' }}>
                      <strong>Your Answer: </strong>
                      <div style={{ marginTop: 5 }}>{currentQuestion.selectedAnswer || 'No answer provided'}</div>
                    </div>
                    {currentQuestion.expectedAnswer && (
                      <div style={{ 
                        margin: '10px 0',
                        padding: '10px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px'
                      }}>
                        <strong>Expected Answer: </strong>
                        <div style={{ marginTop: 5 }}>{currentQuestion.expectedAnswer}</div>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: '10px' }}>
                  <strong>Marks: </strong>{currentQuestion.marks} / {currentQuestion.maxMarks}
                </div>

                {currentQuestion.explanation && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px'
                  }}>
                    <strong>Explanation: </strong>{currentQuestion.explanation}
                  </div>
                )}

                <QuestionNavButtons>
                  <NavButton
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <span>‹‹</span> Previous
                  </NavButton>
                  <NavButton
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next <span>››</span>
                  </NavButton>
                </QuestionNavButtons>
              </QuestionItem>
            )}
          </QuestionsContainer>
        </ContentWrapper>

        <FooterButtons>
          {/* {canRetake && (
            // <RetakeButton onClick={() => navigate(`/start-test/${mockTestId}/${test.subject}`)}>
            //   Retake Test
            // </RetakeButton>
          )} */}
          <BackButton onClick={() => navigate('/user')}>
            Back to Dashboard
          </BackButton>
        </FooterButtons>
      </ResultsContainer>
    </CardContainer>
  );
}