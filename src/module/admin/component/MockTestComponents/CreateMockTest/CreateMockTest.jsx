import React, { useState } from 'react';
import { Container, Title, FormWrapper, FormGroup, Label, Input, Button, FormRow, SubTitle, TextInput } from './CreateMockTest.styles';


const CreateMockTest = () => {
      const [errors, setErrors] = useState([]);
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [duration, setDuration] = useState('');
      const [mockAttempts, setMockAttempts] = useState('');
      const [maxMarks, setMaxMarks] = useState('');
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');

      const handleSubmit =  (e) => {
          console("submit");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        </FormRow>
        <FormRow>

        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <TextInput
            type="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="mockAttempts">Mock Test Attempts:</Label>
          <Input
            type="number"
            id="mockAttempts"
            value={mockAttempts}
            onChange={(e) => setMockAttempts(e.target.value)}
          />
        </FormGroup>
        </FormRow>

        <FormRow>
        <FormGroup>
          <Label htmlFor="maxMarks">Max Marks:</Label>
          <Input
            type="number"
            id="maxMarks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
          />
        </FormGroup>
        </FormRow>

        <FormRow>
            <FormGroup>
                <Label htmlFor="startDate">Start Date:</Label>
                <Input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </FormGroup>
        </FormRow>

        <Button type="submit">Create</Button>
      </FormWrapper>
        </Container>
    );
};

export default CreateMockTest;