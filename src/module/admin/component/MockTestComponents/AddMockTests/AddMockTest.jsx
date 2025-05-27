import React, { useState } from 'react';
import {
  Container,
  Title,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  TextInput,
  QuestionTitle,
  Button,
  FormRow,
  DeleteButton,
  AddButton,
  MoreButton,
  TrashIcon
} from './AddMockTest.styles';
import { Select as AntSelect } from 'antd';
const { Option } = AntSelect;
import { FiTrash } from 'react-icons/fi';

const AddMockTest = () => {
  const [questions, setQuestions] = useState([
    {
      questionType: 'mcq',
      questionText: '',
      marks: '',
      options: { A: '', B: '', C: '', D: '' },
      correctAnswer: '',
      subjectiveAnswer: ''
    }
  ]);
  const [errors, setErrors] = useState([]);


  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (['A', 'B', 'C', 'D'].includes(field)) {
      updated[index].options[field] = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionType: 'mcq',
        questionText: '',
        marks: '',
        options: { A: '', B: '', C: '', D: '' },
        correctAnswer: '',
        subjectiveAnswer: ''
      }
    ]);
  };

  const deleteQuestion = (indexToDelete) => {
  if (questions.length === 1) {
    alert("At least one question is required.");
    return;
  }
  setQuestions(questions.filter((_, index) => index !== indexToDelete));
};


const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = [];

  questions.forEach((q, index) => {
    if (!q.questionText || !q.marks) {
      newErrors.push(`Question ${index + 1}: Question text and marks are required.`);
    }

    if (q.questionType === 'mcq') {
      const { A, B, C, D } = q.options;
      if (!A || !B || !C || !D || !q.correctAnswer) {
        newErrors.push(`Question ${index + 1}: All MCQ options and correct answer are required.`);
      }
    }
  });

  if (newErrors.length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors([]);
  console.log('Final Submission:', questions);
  // Proceed to send to backend
};





  return (
    <Container>
      <Title>Add Mock Test</Title>

      {errors.length > 0 && (
  <div style={{ color: 'red', marginBottom: '1rem' }}>
    <ul>
      {errors.map((err, idx) => (
        <li key={idx}>{err}</li>
      ))}
    </ul>
  </div>
)}
      <FormWrapper onSubmit={handleSubmit}>
        {/* Static Test Details */}
        <FormRow>
          <FormGroup>
            <Label htmlFor="testName">Test Name</Label>
            <Input type="text" id="testName" placeholder="Enter test name" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="testTime">Duration (in minutes)</Label>
            <Input type="number" id="testTime" placeholder="Enter duration" />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="testDescription">Test Description</Label>
          <TextInput id="testDescription" placeholder="Enter test description" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="passingMarks">Passing Marks</Label>
          <Input type="number" id="passingMarks" placeholder="Enter passing marks" />
        </FormGroup>

        <QuestionTitle>Add Questions</QuestionTitle>

        {questions.map((q, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
<FormGroup>
  <Label>Question Type</Label>
  <AntSelect
    value={q.questionType}
    onChange={(value) => handleQuestionChange(index, 'questionType', value)}
    style={{ width: '100%' }}
  >
    <Option value="mcq">MCQ</Option>
    <Option value="subjective">Subjective</Option>
  </AntSelect>
</FormGroup>

            <FormGroup>
              <Label>Question Text</Label>
              <Input
                type="text"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              />
            </FormGroup>

            {q.questionType === 'mcq' && (
              <>
                <FormRow>
                  <FormGroup>
                    <Label>Option A</Label>
                    <Input
                      type="text"
                      value={q.options.A}
                      onChange={(e) => handleQuestionChange(index, 'A', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Option B</Label>
                    <Input
                      type="text"
                      value={q.options.B}
                      onChange={(e) => handleQuestionChange(index, 'B', e.target.value)}
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <Label>Option C</Label>
                    <Input
                      type="text"
                      value={q.options.C}
                      onChange={(e) => handleQuestionChange(index, 'C', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Option D</Label>
                    <Input
                      type="text"
                      value={q.options.D}
                      onChange={(e) => handleQuestionChange(index, 'D', e.target.value)}
                    />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <Label>Correct Answer</Label>
                  <Input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                  />
                </FormGroup>
              </>
            )}

            {q.questionType === 'subjective' && (
              <FormGroup>
                <Label>Expected Answer (optional)</Label>
                <TextInput
                  as="textarea"
                  value={q.subjectiveAnswer}
                  onChange={(e) => handleQuestionChange(index, 'subjectiveAnswer', e.target.value)}
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label>Marks</Label>
              <Input
                type="number"
                value={q.marks}
                onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
              />
            </FormGroup>

{questions.length > 1 && (
  <DeleteButton>
    <TrashIcon onClick={() => deleteQuestion(index)} title="Delete Question">
      <FiTrash />
    </TrashIcon>
  </DeleteButton>
)}
          </div>
        ))}
        <MoreButton>
        <AddButton type="button" onClick={addQuestion}>Add Another Question</AddButton>
        </MoreButton>

        <Button type="submit">Submit Question Set</Button>
      </FormWrapper>
    </Container>
  );
};

export default AddMockTest;
