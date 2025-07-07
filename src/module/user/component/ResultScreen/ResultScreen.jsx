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
  ContentWrapper
} from './ResultScreen.styles';
import {
  getMocktestById,
  getMocktestAttempts,
  submitMocktest
} from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';
import { toast } from 'react-toastify';

export default function ResultScreen() {
  const { testId, subjectId, attemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [test, setTest] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // Load test data
        const resTest = await getMocktestById(testId);
        console.log('resTest', resTest);
        const testData = unwrap(resTest);
        setTest(testData);

        // Load attempt data
        const resAtts = await getMocktestAttempts(userId, testId);
        console.log('resAtts', resAtts);
        const latestAttempt = resAtts.data[resAtts.data.length - 1];

        // Set summary data
        setSummaryData([
          // { label: 'Total Marks', value: testData.totalMarks || 0 },
          { label: 'Total Questions', value: testData.questions.length || 0 },
          {
            label: 'Attempted MCQ Questions',
            value: latestAttempt.answers.filter(a =>
              a.questionDetails?.type === 'mcq' && a.answerIndex !== null
            ).length || 0
          },
          {
            label: 'Correct Answers',
            value: latestAttempt.answers.filter(a =>
              a.questionDetails?.type === 'mcq' && a.isCorrect
            ).length || 0
          },
          { label: 'MCQ Marks Obtained', value: latestAttempt.mcqScore || 0 },
          { label: 'Subjective Marks Obtained', value: latestAttempt.subjectiveScore || 0 },
          { label: 'Total Marks Obtained', value: latestAttempt.totalMarks || 0 }
        ]);

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
          type: answer.questionDetails?.type || 'mcq'
        }));
        setQuestions(processedQuestions);

        setAttempt(latestAttempt);
      } catch (err) {
        console.error('Failed to load results:', err);
        toast.error(err.message || 'Could not load results');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, attemptId, userId, navigate]);

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

  if (loading) return <div>Loading results…</div>;
  if (!attempt) return <div>Unable to load your attempt.</div>;

  const canRetake = test.maxAttempts > attempt.attemptNumber;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <CardContainer>
      <ResultsContainer>
        <Header>
          <Title>Mock Test Result Analysis</Title>
        </Header>

        <ContentWrapper>
          <SummaryContainer>
            {summaryData.map((item, index) => (
              <SummaryItem key={index}>
                <SummaryLabel>{item.label} </SummaryLabel>
                <SummaryValue>{item.value}</SummaryValue>
              </SummaryItem>
            ))}
          </SummaryContainer>

          <QuestionsContainer>
            {currentQuestion && (
              <QuestionItem>
                <QuestionText>
                  {/* {currentQuestionIndex + 1}. {currentQuestion.text} */}
                  {/* i want to put dangerously html tagh */}
                  <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />

                </QuestionText>

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

                <div style={{ marginTop: '10px' }}>
                  <strong>Marks: </strong>{currentQuestion.marks}
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
          {canRetake && (
            <RetakeButton onClick={() => navigate(`/test-instructions/${testId}/${subjectId}`)}>
              Retake Test
            </RetakeButton>
          )}
          <BackButton onClick={() => navigate('/user')}>
            Back to Dashboard
          </BackButton>
        </FooterButtons>
      </ResultsContainer>
    </CardContainer>
  );
}