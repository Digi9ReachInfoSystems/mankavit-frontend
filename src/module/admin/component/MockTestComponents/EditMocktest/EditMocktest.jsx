// src/components/.../EditMockTest.jsx
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
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  ErrorText,           // ← import this from your styles
} from './EditMocktest.style';
import { useParams, useNavigate } from 'react-router-dom';
import {
  updateMocktestById,
  getMocktestById,
} from '../../../../../api/mocktestApi';
import { getSubjects } from '../../../../../api/subjectApi';

const EditMockTest = () => {
  const { mockTestId } = useParams();
  const navigate = useNavigate();

  // errors keyed by field name or 'form'
  const [errors, setErrors] = useState({});
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '',
    passingMarks: '',
    startDate: '',
    endDate: '',
    maxAttempts: 1,
    selectedSubjects: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  // fetch subjects
  useEffect(() => {
    (async () => {
      try {
        const resp = await getSubjects();
        setSubjects(resp.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // fetch existing mock test
  useEffect(() => {
    (async () => {
      if (!mockTestId) {
        setErrors({ form: 'Invalid Mock Test ID' });
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await getMocktestById(mockTestId);
        setTestDetails({
          title: data.title || '',
          description: data.description || '',
          duration: data.duration || '',
          passingMarks: data.passingMarks || '',
          startDate: formatDateTimeLocal(data.startDate),
          endDate: formatDateTimeLocal(data.endDate),
          maxAttempts: data.maxAttempts || 1,
          selectedSubjects: Array.isArray(data.subject)
            ? data.subject.map(s => (typeof s === 'object' ? s._id : s))
            : typeof data.subject === 'object' && data.subject !== null
            ? [data.subject._id]
            : [data.subject],
        });
      } catch (e) {
        console.error(e);
        setErrors({ form: e.response?.data?.message || 'Failed to load mock test' });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [mockTestId]);

  const handleTestDetailChange = (field, value) => {
    setTestDetails(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubjectCheckboxChange = id => {
    setTestDetails(prev => {
      const sel = new Set(prev.selectedSubjects);
      sel.has(id) ? sel.delete(id) : sel.add(id);
      return { ...prev, selectedSubjects: Array.from(sel) };
    });
    setErrors(prev => ({ ...prev, selectedSubjects: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErr = {};

    if (!testDetails.title) newErr.title = 'Test title is required';
    if (!testDetails.description) newErr.description = 'Description is required';
    if (!testDetails.duration) newErr.duration = 'Duration is required';
    if (!testDetails.passingMarks) newErr.passingMarks = 'Passing marks are required';
    if (!testDetails.maxAttempts) newErr.maxAttempts = 'Max attempts is required';
    if (!testDetails.startDate) newErr.startDate = 'Start date is required';
    if (!testDetails.endDate) newErr.endDate = 'End date is required';
    if (!testDetails.selectedSubjects.length) newErr.selectedSubjects = 'Select at least one subject';

    if (Object.keys(newErr).length) {
      setErrors(newErr);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await updateMocktestById(mockTestId, {
        title: testDetails.title,
        description: testDetails.description,
        duration: testDetails.duration,
        passingMarks: testDetails.passingMarks,
        maxAttempts: testDetails.maxAttempts,
        startDate: testDetails.startDate,
        endDate: testDetails.endDate,
        subject: testDetails.selectedSubjects,
      });
      navigate(`/admin/mock-test/questions-list/${mockTestId}`);
    } catch (e) {
      console.error(e);
      setErrors({ form: e.response?.data?.message || 'Failed to update mock test' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTimeLocal = s => {
    if (!s) return '';
    const d = new Date(s);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  if (isLoading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>Edit Mock Test</Title>
      {errors.form && <ErrorText>{errors.form}</ErrorText>}

      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input
              id="title"
              value={testDetails.title}
              onChange={e => handleTestDetailChange('title', e.target.value)}
              placeholder="Enter test title"
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <TextInput
              as="textarea"
              id="description"
              value={testDetails.description}
              onChange={e => handleTestDetailChange('description', e.target.value)}
              placeholder="Enter test description"
            />
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormGroup>
        </FormRow>

        <SubTitle>Mock Test Settings</SubTitle>
        <FormRow>
          <FormGroup>
            <CheckboxSection>
              <CheckboxSectionTitle>Subjects</CheckboxSectionTitle>
              <CheckboxList>
                {subjects.map(sub => (
                  <CheckboxLabel key={sub._id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={testDetails.selectedSubjects.includes(sub._id)}
                      onChange={() => handleSubjectCheckboxChange(sub._id)}
                    />
                    {sub.subjectDisplayName || sub.subjectName}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
            {errors.selectedSubjects && <ErrorText>{errors.selectedSubjects}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="duration">Duration (minutes):</Label>
            <Input
              id="duration"
              type="number"
              value={testDetails.duration}
              onChange={e => handleTestDetailChange('duration', e.target.value)}
              placeholder="Enter duration"
            />
            {errors.duration && <ErrorText>{errors.duration}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="passingMarks">Passing Marks (%):</Label>
            <Input
              id="passingMarks"
              type="number"
              min="0" max="100"
              value={testDetails.passingMarks}
              onChange={e => handleTestDetailChange('passingMarks', e.target.value)}
              placeholder="Enter passing percentage"
            />
            {errors.passingMarks && <ErrorText>{errors.passingMarks}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="maxAttempts">Max Attempts:</Label>
            <Input
              id="maxAttempts"
              type="number"
              min="1"
              value={testDetails.maxAttempts}
              onChange={e => handleTestDetailChange('maxAttempts', e.target.value)}
              placeholder="Enter max attempts"
            />
            {errors.maxAttempts && <ErrorText>{errors.maxAttempts}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={testDetails.startDate}
              onChange={e => handleTestDetailChange('startDate', e.target.value)}
            />
            {errors.startDate && <ErrorText>{errors.startDate}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={testDetails.endDate}
              onChange={e => handleTestDetailChange('endDate', e.target.value)}
            />
            {errors.endDate && <ErrorText>{errors.endDate}</ErrorText>}
          </FormGroup>
        </FormRow>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Mock Test'}
        </Button>
      </FormWrapper>
    </Container>
  );
};

export default EditMockTest;
