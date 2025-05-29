import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Title,
  FormWrapper,
  FormGroup,
  Label,
  QuestionTitle,
  FormRow,
  FieldQusetion,
  FieldCorrect,
  FieldMarks,
  FormRowText,
  FieldText,
  FormGroupList
} from './ViewMockTest.styles';
import { getMocktestById } from '../../../../../api/mocktestApi';

const ViewMockTest = () => {
  const { id } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await getMocktestById(id);
        if (!res.success) throw new Error('Failed to load mock test');
        const t = res.data;

        const questions = t.questions.map(q => {
          if (q.type === 'mcq') {
            // map array of options to A-D
            const letters = ['A', 'B', 'C', 'D'];
            const opts = {};
            letters.forEach((l, idx) => {
              opts[l] = q.options[idx]?.text || '';
            });
            return {
              questionType: 'mcq',
              questionText: q.questionText,
              marks: q.marks,
              options: opts,
              correctAnswer: opts[letters[q.correctAnswer]]
            };
          }
          // subjective
          return {
            questionType: 'subjective',
            questionText: q.questionText,
            marks: q.marks,
            subjectiveAnswer: q.expectedAnswer || ''
          };
        });

        setTestDetails({
          testName: t.title,
          testTime: t.duration,
          testDescription: t.description,
          passingMarks: t.passingMarks,
          questions
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  if (loading) return <Container>Loading mock test...</Container>;
  if (error) return <Container style={{ color: 'red' }}>{error}</Container>;
  if (!testDetails) return null;

  return (
    <Container>
      <Title>View Mock Test</Title>
      <FormWrapper>
        <FormRowText>
          <FormGroup>
            <Label>Test Name</Label>
            <FieldText>{testDetails.testName}</FieldText>
          </FormGroup>
          <FormGroup>
            <Label>Duration (minutes)</Label>
            <FieldText>{testDetails.testTime}</FieldText>
          </FormGroup>
        </FormRowText>

        <FormGroup>
          <Label>Test Description</Label>
          <FieldText>{testDetails.testDescription}</FieldText>
        </FormGroup>

        <FormGroup>
          <Label>Passing Marks</Label>
          <FieldText>{testDetails.passingMarks}</FieldText>
        </FormGroup>

        <QuestionTitle>Questions</QuestionTitle>

        {testDetails.questions.map((q, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Label>Question {idx + 1}</Label>
              <FieldMarks>Marks: {q.marks}</FieldMarks>
            </div>

            <FormGroup>
              <FieldQusetion>Q: {q.questionText}</FieldQusetion>
            </FormGroup>

            {q.questionType === 'mcq' ? (
              <>              
                <FormRow>
                  {Object.entries(q.options).map(([letter, text]) => (
                    <FormGroupList key={letter}>
                      <FieldQusetion>{letter}: {text}</FieldQusetion>
                    </FormGroupList>
                  ))}
                </FormRow>
                <FormGroup>
                  <FieldCorrect>Correct Answer: {q.correctAnswer}</FieldCorrect>
                </FormGroup>
              </>
            ) : (
              <FormGroup>
                <FieldCorrect>Subjective Answer: {q.subjectiveAnswer}</FieldCorrect>
              </FormGroup>
            )}
          </div>
        ))}
      </FormWrapper>
    </Container>
  );
};

export default ViewMockTest;
