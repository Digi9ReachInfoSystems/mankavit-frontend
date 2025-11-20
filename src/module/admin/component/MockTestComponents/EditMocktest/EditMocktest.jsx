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
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  ErrorText,
  SelectedSubjectsContainer,
  SelectedSubjectItem,
  SubjectName,
  RemoveButton,
  ToggleWrapper,
  ToggleInput,
  Slider,

} from './EditMocktest.style';
import { useParams, useNavigate } from 'react-router-dom';
import {
  updateMocktestById,
  getMocktestById,
} from '../../../../../api/mocktestApi';
import { getSubjects } from '../../../../../api/subjectApi';
import JoditEditor from 'jodit-react';
import { getAuth } from '../../../../../utils/authService';

/* ---------------------- Time helpers (no +5:30 shift) ---------------------- */
const localInputToUTC = (localValue) => {
  if (!localValue) return '';
  return `${localValue}:00.000Z`;
};

const utcToLocalInput = (s) => {
  if (!s) return '';
  return String(s).slice(0, 16);
};
/* --------------------------------------------------------------------------- */

const EditMockTest = () => {
  const { mockTestId } = useParams();
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  const [errors, setErrors] = useState({});
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    maxAttempts: 1,
    selectedSubjects: [],
    isUnlimitedAttempts: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const editor = useRef(null);

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
          startDate: utcToLocalInput(data.startDate),
          endDate: utcToLocalInput(data.endDate),
          maxAttempts: data.maxAttempts ?? 1,
          isUnlimitedAttempts: data.isUnlimitedAttempts ?? false,
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

  const handleRemoveSubject = id => {
    setTestDetails(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.filter(sid => sid !== id),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErr = {};

    if (!testDetails.title) newErr.title = 'Test title is required';
    if (!testDetails.description) newErr.description = 'Description is required';
    if (!testDetails.duration) newErr.duration = 'Duration is required';
    if (!testDetails.isUnlimitedAttempts && !testDetails.maxAttempts) {
      newErr.maxAttempts = 'Max attempts is required unless unlimited';
    }

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
        isUnlimitedAttempts: testDetails.isUnlimitedAttempts,
      };
      console.log(" payload", payload);

      if (testDetails.startDate) payload.startDate = localInputToUTC(testDetails.startDate);
      if (testDetails.endDate) payload.endDate = localInputToUTC(testDetails.endDate);
      if (testDetails.selectedSubjects?.length) {
        payload.subject = testDetails.selectedSubjects;
      } else {
        payload.subject = [];
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

  if (isLoading) return <Container>Loading mocktest...</Container>;

  return (
    <Container>
      <Title>{!readOnlyPermissions ? "Edit" : "View"} Mock Test</Title>
      {errors.form && <ErrorText>{errors.form}</ErrorText>}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          type="button"
          onClick={() => navigate(`/admin/mock-test/questions-list/${mockTestId}`)}
        >
          {!readOnlyPermissions ? " Edit Questions" : "View questions"}
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
              onBlur={newContent => { handleTestDetailChange('description', newContent); }}
            />
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormGroup>
        </FormRow>

        <SubTitle>Mock Test Settings</SubTitle>

        <FormRow style={{ alignItems: 'flex-start' }}>
          <FormGroup style={{ flex: 1 }}>
            <CheckboxSection>
              <CheckboxSectionTitle>Available Subjects (optional)</CheckboxSectionTitle>
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
          </FormGroup>

          {/* Adjacent selected subjects */}
          <SelectedSubjectsContainer>
            <CheckboxSectionTitle>Selected Subjects ({testDetails.selectedSubjects.length})</CheckboxSectionTitle>
            {testDetails.selectedSubjects.length > 0 ? (
              testDetails.selectedSubjects.map(id => {
                const sub = subjects.find(s => s._id === id);
                return (
                  <SelectedSubjectItem key={id}>
                    <SubjectName>{sub?.subjectDisplayName || sub?.subjectName || id}</SubjectName>
                    <RemoveButton type="button" onClick={() => handleRemoveSubject(id)}>❌</RemoveButton>
                  </SelectedSubjectItem>
                );
              })
            ) : (
              <p>No subjects selected</p>
            )}
          </SelectedSubjectsContainer>
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
            <Label htmlFor="isUnlimitedAttempts">Unlimited Attempts:</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                id="isUnlimitedAttempts"
                checked={testDetails.isUnlimitedAttempts}
                onChange={e =>
                  setTestDetails(prev => ({ ...prev, isUnlimitedAttempts: e.target.checked }))
                }
              />
              <Slider />
            </ToggleWrapper>
          </FormGroup>
        </FormRow>

        {!testDetails.isUnlimitedAttempts && (
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
        )}


        <FormRow>
          <FormGroup>
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={testDetails.startDate}
              onChange={e => handleTestDetailChange('startDate', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={testDetails.endDate}
              onChange={e => handleTestDetailChange('endDate', e.target.value)}
            />
          </FormGroup>
        </FormRow>
        {
          !readOnlyPermissions && (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Mock Test'}
            </Button>
          )
        }

      </FormWrapper>
    </Container>
  );
};

export default EditMockTest;
