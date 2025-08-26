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
  ErrorText
} from './CreateMockTest.styles';
import { createMocktest } from '../../../../../api/mocktestApi';
import { useNavigate } from 'react-router-dom';
import { getSubjects } from '../../../../../api/subjectApi';
import { getAuth } from '../../../../../utils/authService';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const CreateMockTest = () => {
  // errors keyed by field name
  const [errors, setErrors] = useState({});
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    duration: '',
    // passingMarks: '',
    startDate: '',
    endDate: '',
    maxAttempts: 1,
    selectedSubjects: [],
  });

  const [subjects, setSubjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const editor = useRef(null);
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: testDetails.description || 'Start typings...',
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []
  );
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["mockTestManagement"].readOnly);
        if (response.Permissions["mockTestManagement"].readOnly) {
          toast.error('You do not have permission to create mock tests.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              navigate('/admin/');
            }
          });

        }
      }
    }
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects', error);
      } finally {
        setIsLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleTestDetailChange = (field, value) => {
    setTestDetails(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // clear field error on change
  };

  const handleSubjectToggle = subjectId => {
    setTestDetails(prev => {
      const set = new Set(prev.selectedSubjects);
      set.has(subjectId) ? set.delete(subjectId) : set.add(subjectId);
      return { ...prev, selectedSubjects: Array.from(set) };
    });
    setErrors(prev => ({ ...prev, selectedSubjects: '' }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  const newErrors = {};

  if (!testDetails.title) newErrors.title = 'Test title is required';
  if (!testDetails.description) newErrors.description = 'Description is required';
  if (!testDetails.duration) newErrors.duration = 'Duration is required';
  if (!testDetails.maxAttempts) newErrors.maxAttempts = 'Max attempts is required';
  // if (!testDetails.selectedSubjects.length) newErrors.selectedSubjects = 'Select at least one subject';

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  try {
    const payload = {
      title: testDetails.title,
      description: testDetails.description,
      duration: testDetails.duration,
      maxAttempts: testDetails.maxAttempts,
      subject: testDetails.selectedSubjects,
    };
    
    // Only include dates if they are provided
    if (testDetails.startDate) {
      payload.startDate = testDetails.startDate;
    }
    if (testDetails.endDate) {
      payload.endDate = testDetails.endDate;
    }

    const response = await createMocktest(payload);
    const mockTestId = response?.data?.mockTest?._id || response?.data?._id;
    if (!mockTestId) throw new Error('No test ID returned');
    navigate(`/admin/mock-test/questions-list/${mockTestId}`);
  } catch (error) {
    console.error(error);
    setErrors({ form: error.response?.data?.message || 'Failed to create mock test' });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Container>
      <Title>Create Mock Test</Title>

      {errors.form && <ErrorText>{errors.form}</ErrorText>}

      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
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
            <Label htmlFor="description">Description</Label>
            <JoditEditor
              ref={editor}
              value={testDetails.description}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => { console.log("new", newContent); }} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => { handleTestDetailChange('description',newContent) }}
            />
            {/* <TextInput
              as="textarea"
              id="description"
              value={testDetails.description}
              onChange={e => handleTestDetailChange('description', e.target.value)}
              placeholder="Enter test description"
            /> */}
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormGroup>
        </FormRow>

        <SubTitle>Settings</SubTitle>

        <FormRow>
          <FormGroup>
            <CheckboxSection>
              <CheckboxSectionTitle>Subjects </CheckboxSectionTitle>
              <CheckboxList>
                {subjects.map(sub => (
                  <CheckboxLabel key={sub._id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={testDetails.selectedSubjects.includes(sub._id)}
                      onChange={() => handleSubjectToggle(sub._id)}
                      disabled={isLoadingSubjects}
                    />
                    {sub.subjectDisplayName || sub.subjectName}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
              {errors.selectedSubjects && <ErrorText>{errors.selectedSubjects}</ErrorText>}
            </CheckboxSection>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={testDetails.duration}
              onChange={e => handleTestDetailChange('duration', e.target.value)}
              placeholder="Enter duration"
            />
            {errors.duration && <ErrorText>{errors.duration}</ErrorText>}
          </FormGroup>

          {/* <FormGroup>
            <Label htmlFor="passingMarks">Passing Marks (%)</Label>
            <Input
              id="passingMarks"
              type="number"
              value={testDetails.passingMarks}
              onChange={e => handleTestDetailChange('passingMarks', e.target.value)}
              placeholder="Enter passing percentage"
              min="0"
              max="100"
            />
            {errors.passingMarks && <ErrorText>{errors.passingMarks}</ErrorText>}
          </FormGroup> */}
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="maxAttempts">Max Attempts</Label>
            <Input
              id="maxAttempts"
              type="number"
              value={testDetails.maxAttempts}
              onChange={e => handleTestDetailChange('maxAttempts', e.target.value)}
              placeholder="Enter max attempts"
              min="1"
            />
            {errors.maxAttempts && <ErrorText>{errors.maxAttempts}</ErrorText>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={testDetails.startDate}
              onChange={e => handleTestDetailChange('startDate', e.target.value)}
            />
            {errors.startDate && <ErrorText>{errors.startDate}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={testDetails.endDate}
              onChange={e => handleTestDetailChange('endDate', e.target.value)}
            />
            {errors.endDate && <ErrorText>{errors.endDate}</ErrorText>}
          </FormGroup>
        </FormRow>
        {
          !readOnlyPermissions && (
            <Button type="submit" disabled={isSubmitting || isLoadingSubjects}>
              {isSubmitting ? 'Creating...' : 'Create Mock Test'}
            </Button>
          )
        }

      </FormWrapper>
    </Container>
  );
};

export default CreateMockTest;





// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import {
//   Container,
//   Title,
//   FormWrapper,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   FormRow,
//   SubTitle,
//   TextInput,
//   CheckboxSection,
//   CheckboxSectionTitle,
//   CheckboxList,
//   CheckboxLabel,
//   CheckboxInput,
//   ErrorText
// } from './CreateMockTest.styles';
// import { createMocktest } from '../../../../../api/mocktestApi';
// import { useNavigate } from 'react-router-dom';
// import { getSubjects } from '../../../../../api/subjectApi';
// import { getAuth } from '../../../../../utils/authService';
// import { toast } from 'react-toastify';
// import JoditEditor from 'jodit-react';

// const CreateMockTest = () => {
//   const [errors, setErrors] = useState({});
//   const [testDetails, setTestDetails] = useState({
//     title: '',
//     description: '',
//     duration: '',
//     startDate: '',
//     endDate: '',
//     maxAttempts: 1,
//     selectedSubjects: [],
//   });
//   const [createdMockTestId, setCreatedMockTestId] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
//   const navigate = useNavigate();
//   const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
//   const editor = useRef(null);
  
//   const config = useMemo(() => ({
//     readonly: false,
//     placeholder: testDetails.description || 'Start typings...',
//   }), []);

//   useEffect(() => {
//     const apiCaller = async () => {
//       const response = await getAuth();
//       response.Permissions;
//       if (response.isSuperAdmin === true) {
//         setReadOnlyPermissions(false);
//       } else {
//         setReadOnlyPermissions(response.Permissions["mockTestManagement"].readOnly);
//         if (response.Permissions["mockTestManagement"].readOnly) {
//           toast.error('You do not have permission to create mock tests.', {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//             onClose: () => {
//               navigate('/admin/');
//             }
//           });
//         }
//       }
//     }
//     apiCaller();
//   }, []);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await getSubjects();
//         setSubjects(response.data);
//       } catch (error) {
//         console.error('Error fetching subjects', error);
//       } finally {
//         setIsLoadingSubjects(false);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   const handleTestDetailChange = (field, value) => {
//     setTestDetails(prev => ({ ...prev, [field]: value }));
//     setErrors(prev => ({ ...prev, [field]: '' }));
//   };

//   const handleSubjectToggle = subjectId => {
//     setTestDetails(prev => {
//       const set = new Set(prev.selectedSubjects);
//       set.has(subjectId) ? set.delete(subjectId) : set.add(subjectId);
//       return { ...prev, selectedSubjects: Array.from(set) };
//     });
//     setErrors(prev => ({ ...prev, selectedSubjects: '' }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!testDetails.title) newErrors.title = 'Test title is required';
//     if (!testDetails.description) newErrors.description = 'Description is required';
//     if (!testDetails.duration) newErrors.duration = 'Duration is required';
//     if (!testDetails.maxAttempts) newErrors.maxAttempts = 'Max attempts is required';
//     if (!testDetails.startDate) newErrors.startDate = 'Start date is required';
//     if (!testDetails.endDate) newErrors.endDate = 'End date is required';
//     if (!testDetails.selectedSubjects.length) newErrors.selectedSubjects = 'Select at least one subject';

//     if (Object.keys(newErrors).length) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         title: testDetails.title,
//         description: testDetails.description,
//         duration: testDetails.duration,
//         maxAttempts: testDetails.maxAttempts,
//         startDate: testDetails.startDate,
//         endDate: testDetails.endDate,
//         subject: testDetails.selectedSubjects,
//       };
//       const response = await createMocktest(payload);
//       const mockTestId = response?.data?.mockTest?._id || response?.data?._id;
//       if (!mockTestId) throw new Error('No test ID returned');
      
//       setCreatedMockTestId(mockTestId);
//       toast.success('Mock test created successfully!', {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } catch (error) {
//       console.error(error);
//       setErrors({ form: error.response?.data?.message || 'Failed to create mock test' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleAddQuestions = () => {
//     if (createdMockTestId) {
//       navigate(`/admin/mock-test/questions-list/${createdMockTestId}`);
//     } else {
//       toast.error('Please create the mock test first before adding questions', {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <Container>
//       <Title>Create Mock Test</Title>

//       {errors.form && <ErrorText>{errors.form}</ErrorText>}
      
//       {createdMockTestId && (
//         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
//           <Button
//             type="button"
//             onClick={handleAddQuestions}
//             disabled={isSubmitting}
//           >
//             Add Questions
//           </Button>
//         </div>
//       )}

//       <FormWrapper onSubmit={handleSubmit}>
//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               value={testDetails.title}
//               onChange={e => handleTestDetailChange('title', e.target.value)}
//               placeholder="Enter test title"
//             />
//             {errors.title && <ErrorText>{errors.title}</ErrorText>}
//           </FormGroup>
//         </FormRow>

//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="description">Description</Label>
//             <JoditEditor
//               ref={editor}
//               value={testDetails.description}
//               config={config}
//               tabIndex={1}
//               onBlur={newContent => { console.log("new", newContent); }}
//               onChange={newContent => { handleTestDetailChange('description', newContent) }}
//             />
//             {errors.description && <ErrorText>{errors.description}</ErrorText>}
//           </FormGroup>
//         </FormRow>

//         <SubTitle>Settings</SubTitle>

//         <FormRow>
//           <FormGroup>
//             <CheckboxSection>
//               <CheckboxSectionTitle>Subjects </CheckboxSectionTitle>
//               <CheckboxList>
//                 {subjects.map(sub => (
//                   <CheckboxLabel key={sub._id}>
//                     <CheckboxInput
//                       type="checkbox"
//                       checked={testDetails.selectedSubjects.includes(sub._id)}
//                       onChange={() => handleSubjectToggle(sub._id)}
//                       disabled={isLoadingSubjects}
//                     />
//                     {sub.subjectDisplayName || sub.subjectName}
//                   </CheckboxLabel>
//                 ))}
//               </CheckboxList>
//               {errors.selectedSubjects && <ErrorText>{errors.selectedSubjects}</ErrorText>}
//             </CheckboxSection>
//           </FormGroup>
//         </FormRow>

//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="duration">Duration (minutes)</Label>
//             <Input
//               id="duration"
//               type="number"
//               value={testDetails.duration}
//               onChange={e => handleTestDetailChange('duration', e.target.value)}
//               placeholder="Enter duration"
//             />
//             {errors.duration && <ErrorText>{errors.duration}</ErrorText>}
//           </FormGroup>
//         </FormRow>

//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="maxAttempts">Max Attempts</Label>
//             <Input
//               id="maxAttempts"
//               type="number"
//               value={testDetails.maxAttempts}
//               onChange={e => handleTestDetailChange('maxAttempts', e.target.value)}
//               placeholder="Enter max attempts"
//               min="1"
//             />
//             {errors.maxAttempts && <ErrorText>{errors.maxAttempts}</ErrorText>}
//           </FormGroup>
//         </FormRow>

//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="startDate">Start Date</Label>
//             <Input
//               id="startDate"
//               type="datetime-local"
//               value={testDetails.startDate}
//               onChange={e => handleTestDetailChange('startDate', e.target.value)}
//             />
//             {errors.startDate && <ErrorText>{errors.startDate}</ErrorText>}
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="endDate">End Date</Label>
//             <Input
//               id="endDate"
//               type="datetime-local"
//               value={testDetails.endDate}
//               onChange={e => handleTestDetailChange('endDate', e.target.value)}
//             />
//             {errors.endDate && <ErrorText>{errors.endDate}</ErrorText>}
//           </FormGroup>
//         </FormRow>
        
//         {!readOnlyPermissions && (
//           <Button type="submit" disabled={isSubmitting || isLoadingSubjects}>
//             {isSubmitting ? 'Creating...' : 'Create Mock Test'}
//           </Button>
//         )}
//       </FormWrapper>
//     </Container>
//   );
// };

// export default CreateMockTest;