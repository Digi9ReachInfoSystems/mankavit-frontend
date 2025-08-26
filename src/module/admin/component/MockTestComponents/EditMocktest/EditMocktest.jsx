// src/components/.../EditMockTest.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ErrorText,           // ← from your styles
} from './EditMocktest.style';
import { useParams, useNavigate } from 'react-router-dom';
import {
  updateMocktestById,
  getMocktestById,
} from '../../../../../api/mocktestApi';
import { getSubjects } from '../../../../../api/subjectApi';
import JoditEditor from 'jodit-react';

/* ---------------------- Time helpers (no +5:30 shift) ---------------------- */
/* 
  We treat the wall-clock picked in <input type="datetime-local"> as canonical.
  - When SAVING: "YYYY-MM-DDTHH:mm"  -> "YYYY-MM-DDTHH:mm:00.000Z"
  - When LOADING from API: take the first 16 chars for the input value.
  This keeps the digits the same for users and avoids timezone jumps.
*/
const localInputToUTC = (localValue) => {
  if (!localValue) return '';
  // localValue like "2025-08-19T05:00"
  return `${localValue}:00.000Z`;
};

const utcToLocalInput = (s) => {
  if (!s) return '';
  // s like "2025-08-19T05:00:00.000Z" -> "2025-08-19T05:00"
  return String(s).slice(0, 16);
};
/* --------------------------------------------------------------------------- */

const EditMockTest = () => {
  const { mockTestId } = useParams();
  const navigate = useNavigate();

  // errors keyed by field name or 'form'
  const [errors, setErrors] = useState({});
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    maxAttempts: 1,
    selectedSubjects: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const editor = useRef(null);

  // fetch subjects (optional; user may leave empty)
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
        console.log('Mocktest by ids', data);
        setTestDetails({
          title: data.title || '',
          description: data.description || '',
          duration: data.duration || '',
          startDate: utcToLocalInput(data.startDate), // fixed: keep wall-clock
          endDate: utcToLocalInput(data.endDate),     // fixed: keep wall-clock
          maxAttempts: data.maxAttempts ?? 1,
          selectedSubjects: Array.isArray(data.subject)
            ? data.subject.map(s => (typeof s === 'object' ? s._id : s))
            : (typeof data.subject === 'object' && data.subject !== null)
              ? [data.subject._id]
              : [data.subject].filter(Boolean),
        });
      } catch (e) {
        console.error(e);
        setErrors({ form: e.response?.data?.message || 'Failed to load mock test' });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [mockTestId]);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: testDetails.description || 'Start typing...',
  }), [testDetails]);

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

    // Required fields (dates & subjects are OPTIONAL per your request)
    if (!testDetails.title) newErr.title = 'Test title is required';
    if (!testDetails.description) newErr.description = 'Description is required';
    if (!testDetails.duration) newErr.duration = 'Duration is required';
    if (!testDetails.maxAttempts) newErr.maxAttempts = 'Max attempts is required';

    if (Object.keys(newErr).length) {
      setErrors(newErr);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const payload = {
        title: testDetails.title,
        description: testDetails.description,
        duration: testDetails.duration,
        maxAttempts: testDetails.maxAttempts,
      };

      // Include dates only if provided (no timezone shift)
      if (testDetails.startDate) payload.startDate = localInputToUTC(testDetails.startDate);
      if (testDetails.endDate)   payload.endDate   = localInputToUTC(testDetails.endDate);

      // Include subjects only if provided (optional)
      if (testDetails.selectedSubjects?.length) {
        payload.subject = testDetails.selectedSubjects;
      }

      await updateMocktestById(mockTestId, payload);
      navigate(`/admin/mock-test`);
    } catch (e) {
      console.error(e);
      setErrors({ form: e.response?.data?.message || 'Failed to update mock test' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>Edit Mock Test</Title>
      {errors.form && <ErrorText>{errors.form}</ErrorText>}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          type="button"
          onClick={() => navigate(`/admin/mock-test/questions-list/${mockTestId}`)}
        >
          Edit Questions
        </Button>
      </div>

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
            <JoditEditor
              ref={editor}
              value={testDetails.description}
              config={config}
              tabIndex={1}
              onChange={newContent => { handleTestDetailChange('description', newContent); }}
            />
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormGroup>
        </FormRow>

        <SubTitle>Mock Test Settings</SubTitle>

        <FormRow>
          <FormGroup>
            <CheckboxSection>
              <CheckboxSectionTitle>Subjects (optional)</CheckboxSectionTitle>
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
            {/* subjects optional -> no error */}
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
            {/* optional -> no error */}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={testDetails.endDate}
              onChange={e => handleTestDetailChange('endDate', e.target.value)}
            />
            {/* optional -> no error */}
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
