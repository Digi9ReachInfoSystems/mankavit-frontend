// src/module/user/components/ResultScreen/ResultScreen.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ResultsContainer,
  CardContainer,
  Greeting,
  Message,
  ScoreTable,
  ScoreRow,
  Label,
  Value,
  ButtonGroup,
  ActionButton
} from './ResultScreen.styles';
import {
  getMocktestById,
  getMocktestAttempts,
  evaluateMocktest,
  submitMocktest
} from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';
import { toast } from 'react-toastify';

export default function ResultScreen() {
  const { testId, subjectId, attemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [test,    setTest]    = useState(null);
  const [attempt, setAttempt]= useState(null);
  const [loading, setLoading]= useState(true);

  // unwrap either { data } or { body:{ data } }
  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // 1) load test definition
        const resTest  = await getMocktestById(testId);
        const testData = unwrap(resTest);
        setTest(testData);

        // 2) load all attempts for this user+test
        const resAtts = await getMocktestAttempts(userId, testId);
        const arr      = unwrap(resAtts) || [];
        let att        = arr.find(a => a._id === attemptId);
        if (!att) {
          throw new Error('Attempt not found');
        }

        // 3) if still in-progress, first submit it so backend moves status→“submitted”
        if (att.status === 'in-progress') {
          await submitMocktest({ attemptId, user_id: userId });
          // update local status so we can eval below
          att = { ...att, status: 'submitted' };
        }

        // 4) now if it's “submitted” call evaluateMocktest
        if (att.status === 'submitted') {
          const evaluations = testData.questions.map(q => {
            const saved = (att.answers || []).find(a => a.questionId === q._id) || {};
            if (q.type === 'mcq') {
              const isCorrect = saved.answerIndex === q.correctAnswer;
              const marks     = q.options?.[saved.answerIndex]?.marks ?? 0;
              return { questionId: q._id, isCorrect, marks };
            } else {
              // subjective
              return {
                questionId: q._id,
                isCorrect:  saved.isCorrect      || false,
                marks:      saved.marksAwarded   || 0
              };
            }
          });

          const resEval = await evaluateMocktest({
            attemptId,
            userId,
            evaluations
          });
          att = unwrap(resEval);
        }

        // 5) store final attempt (now status should be “evaluated”)
        setAttempt(att);
      } catch (err) {
        console.error('Failed to load/evaluate:', err);
        toast.error(err.message || 'Could not load results');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, attemptId, userId, navigate]);

  if (loading)      return <div>Loading results…</div>;
  if (!attempt)     return <div>Unable to load your attempt.</div>;

  const canRetake = test.maxAttempts > attempt.attemptNumber;

  return (
    <CardContainer>
      <ResultsContainer>
        <Greeting>
          Dear {attempt.userName || 'Student'},
        </Greeting>
        <Message>
          Thank you for taking this test{test?.title ? `: "${test.title}"` : ''}!
        </Message>
        <ScoreTable>
          {[
            { label: 'MCQ Score',        value: attempt.mcqScore        || 0 },
            { label: 'Subjective Score', value: attempt.subjectiveScore || 0 },
            { label: 'Total Marks',      value: attempt.totalMarks      || 0 },
            { label: 'Status',           value: attempt.status          || 'unknown' }
          ].map((row,i) => (
            <ScoreRow key={i}>
              <Label>{row.label}</Label>
              <Value>{row.value}</Value>
            </ScoreRow>
          ))}
        </ScoreTable>
      </ResultsContainer>

      <ButtonGroup>
        {canRetake && (
          <ActionButton
            onClick={() => navigate(`/test-instructions/${testId}/${subjectId}`)}
          >
            Retake Test
          </ActionButton>
        )}
        <ActionButton primary onClick={() => navigate('/user')}>
          Go to Courses
        </ActionButton>
      </ButtonGroup>
    </CardContainer>
  );
}
