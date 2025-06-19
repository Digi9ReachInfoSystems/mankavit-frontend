import React, { useState } from 'react';
import { Container, Title, FormWrapper, FormGroup, Label, Input, Button, FormRow, SubTitle, TextInput } from './CreateMockTest.styles';
import { createMocktest } from '../../../../../api/mocktestApi';
import { useNavigate } from 'react-router-dom';


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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


      const navigate = useNavigate();

        const handleTestDetailChange = (field, value) => {
    setTestDetails({
      ...testDetails,
      [field]: value
    });
  };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!title) newErrors.push("Test title is required");
        if (!description) newErrors.push("Test description is required");
        if (!duration) newErrors.push("Duration is required");
        if (!mockAttempts) newErrors.push("Mock attempts are required");
        if (!maxMarks) newErrors.push("Max marks are required");
        if (!startDate) newErrors.push("Start date is required");
        if (!endDate) newErrors.push("End date is required");

        if (newErrors.length > 0) {
          setErrors(newErrors);
          return;
        }
        setErrors([]);
        setIsSubmitting(true);

        try {
            const mockTestData ={
                title: testDetails.title,
                description: testDetails.description,
                duration: testDetails.duration,
                mockAttempts: testDetails.mockAttempts,
                maxMarks: testDetails.maxMarks,
                startDate: testDetails.startDate,
                endDate: testDetails.endDate,
            }
            console.log("Mock test data", mockTestData);
            const response = await createMocktest(mockTestData);
            console.log("Mock test created successfully", response.data);
            navigate('/admin/mock-test-question-list');
        } catch (error) {
            console.error("Error creating mock test", error);
            let errorMessage = 'Failed to create mock test';
            if(error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            setErrors([errorMessage]);
            
        } finally {
            setIsSubmitting(false);
        }
      }

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
            onChange={(e) => handleTestDetailChange("title",e.target.value)}
            placeholder='Enter test title'
          />
        </FormGroup>
        </FormRow>
        <FormRow>

        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <TextInput
            type="textarea"
            id="description"
            value={testDetails.description}
            onChange={(e) => handleTestDetailChange("description",e.target.value)}
            placeholder='Enter test description'
            required
          />
        </FormGroup>
        </FormRow>
        <SubTitle>Mock Test Settings</SubTitle>

        <FormRow>
        <FormGroup>
          <Label htmlFor="duration">Mock Test Duration:</Label>
          <Input
            type="number"
            id="duration"
            value={testDetails.duration}
            onChange={(e) => handleTestDetailChange("duration",e.target.value)}
            placeholder='Enter duration'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="mockAttempts">Mock Test Attempts:</Label>
          <Input
            type="number"
            id="mockAttempts"
            value={testDetails.mockAttempts}
            onChange={(e) => handleTestDetailChange("mockAttempts",e.target.value)}
            placeholder='Enter mock attempts'
            required
          />
        </FormGroup>
        </FormRow>

        <FormRow>
        <FormGroup>
          <Label htmlFor="maxMarks">Max Marks:</Label>
          <Input
            type="number"
            id="maxMarks"
            value={testDetails.maxMarks}
            onChange={(e) => handleTestDetailChange("maxMarks",e.target.value)}
            placeholder='Enter max marks'
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
                    onChange={(e) => handleTestDetailChange("startDate",e.target.value)}
                    required
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                    type="datetime-local"
                    id="endDate"
                    value={testDetails.endDate}
                    onChange={(e) => handleTestDetailChange("endDate",e.target.value)}
                    required
                />
            </FormGroup>
        </FormRow>

        <Button type="submit">Create Mock Test</Button>
      </FormWrapper>
        </Container>
    );
};

export default CreateMockTest;