import React, { useEffect, useState } from 'react';
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
  TrashIcon,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxInput,
  CheckboxLabel
} from './AddMockTest.styles';
import { Select as AntSelect } from 'antd';
const { Option } = AntSelect;
import { FiTrash } from 'react-icons/fi';
import { createMocktest } from '../../../../../api/mocktestApi';
import { getSubjects } from '../../../../../api/subjectApi';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddMockTest = () => {
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '',
    passingMarks: '',
    startDate: '',
    endDate: '',
    maxAttempts: 1,
    subject: [],
  });
  const navigate = useNavigate();
   const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(()=>{
    const apiCaller = async () => {
       try {
          const responseSubjects = await getSubjects();
          const subjectsData = responseSubjects.data.map((item) => ({
            label: item.subjectName,
            id: item._id,
            checked: false,
          }));
          setSubjectCheckboxes(subjectsData);
      }catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };
    apiCaller();
  },[]);

  const handleTestDetailChange = (field, value) => {
    setTestDetails({
      ...testDetails,
      [field]: value
    });
  };
   const subjects = subjectCheckboxes.filter((i) => i.checked).map((i) => i.id);
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

   const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const deleteQuestion = (indexToDelete) => {
    if (questions.length === 1) {
      alert("At least one question is required.");
      toast.error("At least one question is required.");
      return;
    }
    setQuestions(questions.filter((_, index) => index !== indexToDelete));
  };

  const formatQuestionsForApi = () => {
    return questions.map(q => {
      if (q.questionType === 'mcq') {
        return {
          type: 'mcq',
          questionText: q.questionText,
          options: [
            { text: q.options.A, marks: q.correctAnswer === 'A' ? parseInt(q.marks) : 0 },
            { text: q.options.B, marks: q.correctAnswer === 'B' ? parseInt(q.marks) : 0 },
            { text: q.options.C, marks: q.correctAnswer === 'C' ? parseInt(q.marks) : 0 },
            { text: q.options.D, marks: q.correctAnswer === 'D' ? parseInt(q.marks) : 0 }
          ],
          correctAnswer: ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer),
          marks: parseInt(q.marks)
        };
      } else {
        return {
          type: 'subjective',
          questionText: q.questionText,
          expectedAnswer: q.subjectiveAnswer,
          marks: parseInt(q.marks),
          options: []
        };
      }
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = [];

  // Validate test details
  if (!testDetails.title) newErrors.push("Test title is required");
  if (!testDetails.description) newErrors.push("Test description is required");
  if (!testDetails.duration) newErrors.push("Duration is required");
  if (!testDetails.passingMarks) newErrors.push("Passing marks are required");
  if (!testDetails.startDate) newErrors.push("Start date is required");
  if (!testDetails.endDate) newErrors.push("End date is required");
  
  // Add validation for subjects
  const selectedSubjects = subjectCheckboxes.filter(subject => subject.checked).map(subject => subject.id);
  if (selectedSubjects.length === 0) {
    newErrors.push("At least one subject must be selected");
  }

  // Validate questions
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
  setIsSubmitting(true);

  try {
    const formattedQuestions = formatQuestionsForApi();
    const totalMarks = questions.reduce((sum, q) => sum + parseInt(q.marks), 0);
    
    const mockTestData = {
      title: testDetails.title,
      description: testDetails.description,
      duration: parseInt(testDetails.duration),
      passingMarks: parseInt(testDetails.passingMarks),
      startDate: new Date(testDetails.startDate).toISOString(),
      endDate: new Date(testDetails.endDate).toISOString(),
      maxAttempts: parseInt(testDetails.maxAttempts),
      totalMarks: totalMarks,
      subject: selectedSubjects[0],  // Use the filtered and mapped subjects
      questions: formattedQuestions
    };

    const response = await createMocktest(mockTestData);
    console.log('Mock test created successfully:', response);
    toast.success('Mock test created successfully');

   navigate('/admin/mock-test');
  } catch (error) {
    console.error('Error creating mock test:', error);
    let errorMessage = 'Failed to create mock test';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    setErrors([errorMessage]);
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
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
        {/* Test Details */}
        <FormGroup>
          <Label htmlFor="title">Test Title</Label>
          <Input 
            type="text" 
            id="title" 
            value={testDetails.title}
            onChange={(e) => handleTestDetailChange('title', e.target.value)}
            placeholder="Enter test title" 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Test Description</Label>
          <TextInput 
            id="description" 
            value={testDetails.description}
            onChange={(e) => handleTestDetailChange('description', e.target.value)}
            placeholder="Enter test description" 
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input 
              type="number" 
              id="duration" 
              value={testDetails.duration}
              onChange={(e) => handleTestDetailChange('duration', e.target.value)}
              placeholder="Enter duration" 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="passingMarks">Passing Marks</Label>
            <Input 
              type="number" 
              id="passingMarks" 
              value={testDetails.passingMarks}
              onChange={(e) => handleTestDetailChange('passingMarks', e.target.value)}
              placeholder="Enter passing marks" 
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="startDate">Start Date</Label>
            <Input 
              type="datetime-local" 
              id="startDate" 
              value={testDetails.startDate}
              onChange={(e) => handleTestDetailChange('startDate', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date</Label>
            <Input 
              type="datetime-local" 
              id="endDate" 
              value={testDetails.endDate}
              onChange={(e) => handleTestDetailChange('endDate', e.target.value)}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="maxAttempts">Max Attempts</Label>
          <Input 
            type="number" 
            id="maxAttempts" 
            value={testDetails.maxAttempts}
            onChange={(e) => handleTestDetailChange('maxAttempts', e.target.value)}
            placeholder="Enter max attempts" 
            min="1"
          />
        </FormGroup>

       <CheckboxSection>
  <CheckboxSectionTitle>Add Subject</CheckboxSectionTitle>
  <CheckboxList>
    {subjectCheckboxes.map((item, index) => (
      <CheckboxLabel key={item.id || index}>
        <CheckboxInput
          type="checkbox"
          checked={item.checked}
          onChange={() => handleCheckboxChange(index, setSubjectCheckboxes)}
        />
        {item.label}
      </CheckboxLabel>
    ))}
  </CheckboxList>
</CheckboxSection>

        <QuestionTitle>Add Questions</QuestionTitle>

        {questions.map((q, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', position: 'relative' }}>
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
                placeholder="Enter question text"
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
                      placeholder="Enter option A"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Option B</Label>
                    <Input
                      type="text"
                      value={q.options.B}
                      onChange={(e) => handleQuestionChange(index, 'B', e.target.value)}
                      placeholder="Enter option B"
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
                      placeholder="Enter option C"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Option D</Label>
                    <Input
                      type="text"
                      value={q.options.D}
                      onChange={(e) => handleQuestionChange(index, 'D', e.target.value)}
                      placeholder="Enter option D"
                    />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <Label>Correct Answer</Label>
                  <AntSelect
                    value={q.correctAnswer}
                    onChange={(value) => handleQuestionChange(index, 'correctAnswer', value)}
                    style={{ width: '100%' }}
                    placeholder="Select correct answer"
                  >
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </AntSelect>
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
                  placeholder="Enter expected answer"
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label>Marks</Label>
              <Input
                type="number"
                value={q.marks}
                onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
                placeholder="Enter marks"
                min="1"
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Mock Test'}
        </Button>
      </FormWrapper>
            {/* Toast Container for react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default AddMockTest;