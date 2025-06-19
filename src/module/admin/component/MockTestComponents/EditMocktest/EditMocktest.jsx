import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  Button,
  FormRow,
  SubTitle,
  TextInput,
  Select,
} from './EditMocktest.style';
import { useParams, useNavigate } from 'react-router-dom';
import {
  updateMocktestById,
  getMocktestById,
} from '../../../../../api/mocktestApi';
import { getSubjects } from '../../../../../api/subjectApi';

const EditMockTest = () => {
  const { mockTestId } = useParams(); // Get mockTestId from URL
  const navigate = useNavigate();

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  // Load subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.data || []);
      } catch (error) {
        console.error("Error fetching subjects", error);
      }
    };

    fetchSubjects();
  }, []);

  // Load mock test on mount
  useEffect(() => {
    const fetchMockTest = async () => {
      if (!mockTestId || mockTestId === 'undefined') {
        console.error("No valid mockTestId provided");
        setErrors(["Invalid Mock Test ID"]);
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching mock test with ID:", mockTestId); // 🔍 Debugging
        const response = await getMocktestById(mockTestId);
        const data = response.data;

        setTestDetails({
          title: data.title || '',
          description: data.description || '',
          duration: data.duration || '',
          passingMarks: data.passingMarks || '',
          startDate: formatDateTimeLocal(data.startDate),
          endDate: formatDateTimeLocal(data.endDate),
          maxAttempts: data.maxAttempts || 1,
          subjectId: data.subject || '', // This should match backend structure
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching mock test', error);
        let errorMessage = 'Failed to load mock test';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        setErrors([errorMessage]);
        setIsLoading(false);
      }
    };

    fetchMockTest();
  }, [mockTestId]);

  const handleTestDetailChange = (field, value) => {
    setTestDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      const updatedData = {
        title: testDetails.title,
        description: testDetails.description,
        duration: testDetails.duration,
        passingMarks: testDetails.passingMarks,
        maxAttempts: testDetails.maxAttempts,
        startDate: testDetails.startDate,
        endDate: testDetails.endDate,
        subject: testDetails.subjectId,
      };

      await updateMocktestById(mockTestId, updatedData);
      navigate(`/admin/mock-test/questions-list/${mockTestId}`);
    } catch (error) {
      console.error('Error updating mock test', error);
      let errorMessage = 'Failed to update mock test';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors([errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format ISO date for datetime-local input
  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>Edit Mock Test</Title>

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
              onChange={(e) => handleTestDetailChange('title', e.target.value)}
              placeholder="Enter test title"
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
              onChange={(e) =>
                handleTestDetailChange('description', e.target.value)
              }
              placeholder="Enter test description"
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
              onChange={(e) =>
                handleTestDetailChange('subjectId', e.target.value)
              }
              disabled={isLoading}
              required
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>
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
              onChange={(e) =>
                handleTestDetailChange('duration', e.target.value)
              }
              placeholder="Enter duration"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="passingMarks">Passing Marks (%):</Label>
            <Input
              type="number"
              id="passingMarks"
              min="0"
              max="100"
              value={testDetails.passingMarks}
              onChange={(e) =>
                handleTestDetailChange('passingMarks', e.target.value)
              }
              placeholder="Enter passing percentage"
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
              min="1"
              value={testDetails.maxAttempts}
              onChange={(e) =>
                handleTestDetailChange('maxAttempts', e.target.value)
              }
              placeholder="Enter max attempts"
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
              onChange={(e) =>
                handleTestDetailChange('startDate', e.target.value)
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              type="datetime-local"
              id="endDate"
              value={testDetails.endDate}
              onChange={(e) =>
                handleTestDetailChange('endDate', e.target.value)
              }
              required
            />
          </FormGroup>
        </FormRow>

        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting ? 'Updating...' : 'Update Mock Test'}
        </Button>
      </FormWrapper>
    </Container>
  );
};

export default EditMockTest;