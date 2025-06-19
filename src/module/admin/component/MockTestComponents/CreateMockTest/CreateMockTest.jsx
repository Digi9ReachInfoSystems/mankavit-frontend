import React, { useState, useEffect } from 'react';
import { Container, Title, FormWrapper, FormGroup, Label, Input, Button, FormRow, SubTitle, TextInput, Select } from './CreateMockTest.styles';
import { createMocktest } from '../../../../../api/mocktestApi';
import { useNavigate } from 'react-router-dom';
import { getSubjects } from '../../../../../api/subjectApi';

const CreateMockTest = () => {
  const [errors, setErrors] = useState([]);
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '',
    passingMarks: '',
    startDate: '',
    endDate: '',
    maxAttempts: 1,
    subjectId: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        // Assuming the API returns an array of subjects with _id and name
        console.log("Subjects:", response.data);
        setSubjects(response.data);
        setIsLoadingSubjects(false);
      } catch (error) {
        console.error("Error fetching subjects", error);
        setIsLoadingSubjects(false);
        setErrors(prev => [...prev, 'Failed to load subjects']);
      }
    };

    fetchSubjects();
  }, []);

  const handleTestDetailChange = (field, value) => {
    setTestDetails({
      ...testDetails,
      [field]: value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = [];

  if (!testDetails.title) newErrors.push("Test title is required");
  if (!testDetails.description) newErrors.push("Test description is required");
  if (!testDetails.duration) newErrors.push("Duration is required");
  if (!testDetails.passingMarks) newErrors.push("Passing marks are required");
  if (!testDetails.maxAttempts) newErrors.push("Max attempts are required");
  if (!testDetails.startDate) newErrors.push("Start date is required");
  if (!testDetails.endDate) newErrors.push("End date is required");
  if (!testDetails.subjectId) newErrors.push("Subject is required");

  if (newErrors.length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors([]);
  setIsSubmitting(true);

  try {
    const mockTestData = {
      title: testDetails.title,
      description: testDetails.description,
      duration: testDetails.duration,
      passingMarks: testDetails.passingMarks,
      maxAttempts: testDetails.maxAttempts,
      startDate: testDetails.startDate,
      endDate: testDetails.endDate,
      subject: testDetails.subjectId, // This matches your DB structure
    };

    console.log("Mock test data", mockTestData);
    const response = await createMocktest(mockTestData);

    console.log("API Response:", response.data); // 🔍 Debugging log

    // ✅ Safely extract _id from different possible response structures
    const mockTestId =
      response?.data?.mockTest?._id ||
      response?.data?._id ||
      response?.mockTest?._id ||
      response?._id;

    if (!mockTestId) {
      throw new Error("Server did not return a valid mock test ID");
    }

    navigate(`/admin/mock-test/questions-list/${mockTestId}`);
  } catch (error) {
    console.error("Error creating mock test", error);
    let errorMessage = 'Failed to create mock test';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    setErrors([errorMessage]);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Container>
      <Title>Create Mock Test</Title>

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
        <FormRow>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              value={testDetails.title}
              onChange={(e) => handleTestDetailChange("title", e.target.value)}
              placeholder='Enter test title'
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <TextInput
              as="textarea"
              id="description"
              value={testDetails.description}
              onChange={(e) => handleTestDetailChange("description", e.target.value)}
              placeholder='Enter test description'
              required
            />
          </FormGroup>
        </FormRow>

        <SubTitle>Mock Test Settings</SubTitle>

        <FormRow>
          <FormGroup>
            <Label htmlFor="subjectId">Subject:</Label>
         <Select
  id="subjectId"
  value={testDetails.subjectId}
  onChange={(e) => handleTestDetailChange("subjectId", e.target.value)}
  disabled={isLoadingSubjects}
  required
>
  <option value="">Select a subject</option>
  {subjects.map(subject => (
    <option key={subject._id} value={subject._id}>
      {/* Use subjectDisplayName or subjectName */}
      {subject.subjectDisplayName || subject.subjectName}
    </option>
  ))}
</Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="duration">Duration (minutes):</Label>
            <Input
              type="number"
              id="duration"
              value={testDetails.duration}
              onChange={(e) => handleTestDetailChange("duration", e.target.value)}
              placeholder='Enter duration'
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="passingMarks">Passing Marks (%):</Label>
            <Input
              type="number"
              id="passingMarks"
              value={testDetails.passingMarks}
              onChange={(e) => handleTestDetailChange("passingMarks", e.target.value)}
              placeholder='Enter passing percentage'
              min="0"
              max="100"
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="maxAttempts">Max Attempts:</Label>
            <Input
              type="number"
              id="maxAttempts"
              value={testDetails.maxAttempts}
              onChange={(e) => handleTestDetailChange("maxAttempts", e.target.value)}
              placeholder='Enter max attempts'
              min="1"
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              type="datetime-local"
              id="startDate"
              value={testDetails.startDate}
              onChange={(e) => handleTestDetailChange("startDate", e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              type="datetime-local"
              id="endDate"
              value={testDetails.endDate}
              onChange={(e) => handleTestDetailChange("endDate", e.target.value)}
              required
            />
          </FormGroup>
        </FormRow>

        <Button type="submit" disabled={isSubmitting || isLoadingSubjects}>
          {isSubmitting ? 'Creating...' : 'Create Mock Test'}
        </Button>
      </FormWrapper>
    </Container>
  );
};

export default CreateMockTest;