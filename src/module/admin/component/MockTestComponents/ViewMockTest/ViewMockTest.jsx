import React from 'react';
import {
  Container,
  Title,
  FormWrapper,
  FormGroup,
    Label,
  QuestionTitle,
  FormRow,
  Field,
    FormGroupList,
    FieldQusetion,
    FieldCorrect,
    FieldMarks,
    FormRowText,
    FieldText
} from './ViewMockTest.styles';
import { FileUploadItemName } from '@chakra-ui/react';

const ViewMockTest = () => {
  const testDetails = {
    testName: 'Sample Mock Test',
    testTime: '60',
    testDescription: 'This is a sample mock test containing MCQs and Subjective questions.',
    passingMarks: '40',
    questions: [
      {
        questionType: 'mcq',
        questionText: 'What is the capital of France?',
        marks: '5',
        options: {
          A: 'Berlin',
          B: 'Madrid',
          C: 'Paris',
          D: 'Rome'
        },
        correctAnswer: 'Paris'
      },
      {
        questionType: 'mcq',
        questionText: 'Which of the following is a prime number?',
        marks: '5',
        options: {
          A: '4',
          B: '9',
          C: '11',
          D: '21'
        },
        correctAnswer: '11'
      },
      {
        questionType: 'subjective',
        questionText: 'Explain the concept of polymorphism in OOP.',
        marks: '10',
        subjectiveAnswer: 'Polymorphism allows objects to be treated as instances of their parent class rather than their actual class.'
      },
      {
        questionType: 'subjective',
        questionText: 'Describe the lifecycle methods of a React class component.',
        marks: '10',
        subjectiveAnswer: 'The lifecycle includes mounting, updating, and unmounting phases with methods like componentDidMount, componentDidUpdate, and componentWillUnmount.'
      }
    ]
  };

  return (
    <Container>
      <Title>View Mock Test</Title>
      <FormWrapper>
        {/* Test Details */}
        <FormRowText>
          <FormGroup>
            <Label>Test Name</Label>
            <FieldText>{testDetails.testName}</FieldText>
          </FormGroup>

          <FormGroup>
            <Label>Duration (in minutes)</Label>
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

        {testDetails.questions.map((q, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,   width: '100%' }}>
            <Label>Question {index + 1}</Label>
            <FieldMarks> Marks: {q.marks}</FieldMarks>
            </div>

            <FormGroup>
              <FieldQusetion> Q: {q.questionText}</FieldQusetion>
            </FormGroup>

            {q.questionType === 'mcq' && (
              <>
                <FormRow>
                  <FormGroupList>
                    <Field> A: {q.options.A}</Field>
                  </FormGroupList>
                  <FormGroupList>
                    <Field>B: {q.options.B}</Field>
                  </FormGroupList>
                  <FormGroupList>
                    <Field> C: {q.options.C}</Field>
                  </FormGroupList>
                  <FormGroupList>
                    <Field>D: {q.options.D}</Field>
                  </FormGroupList>
                </FormRow>
                <FormGroupList>
                  <FieldCorrect> Correct Answer: {q.correctAnswer}</FieldCorrect>
                </FormGroupList>
              </>
            )}

            {q.questionType === 'subjective' && (
              <FormGroup>
                <FieldCorrect> Subjective Answer: {q.subjectiveAnswer}</FieldCorrect>
              </FormGroup>
            )}


          </div>
        ))}
      </FormWrapper>
    </Container>
  );
};

export default ViewMockTest;
