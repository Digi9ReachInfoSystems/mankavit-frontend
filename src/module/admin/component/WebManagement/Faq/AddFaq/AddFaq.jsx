// // src/modules/admin/components/AddFaq/AddFaq.jsx
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   Container,
//   FormGroup,
//   Label,
//   SubmitButton,
//   ErrorText
// } from '../AddFaq/AddFaq.style';
// import { createFaq } from '../../../../../../api/faqApi';
// import { useNavigate } from 'react-router-dom';
// import JoditEditor from 'jodit-react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getAuth } from '../../../../../../utils/authService';

// const stripHtml = (html = '') =>
//   html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

// const AddFaq = ({ onAdd }) => {
//   const questionEditorRef = useRef(null);
//   const answerEditorRef = useRef(null);

//   // Keep both fields as strings
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   const [errors, setErrors] = useState({ question: '', answer: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

//   useEffect(() => {
//     const apiCaller = async () => {
//       const response = await getAuth();
//       if (response.isSuperAdmin === true) {
//         setReadOnlyPermissions(false);
//       } else {
//         const ro = response.Permissions["webManagement"].readOnly;
//         setReadOnlyPermissions(ro);
//         if (ro) {
//           toast.error('You do not have permission to add FAQs.', {
//             position: "top-right",
//             autoClose: 2000,
//             theme: "colored",
//             onClose: () => navigate('/admin/')
//           });
//         }
//       }
//     };
//     apiCaller();
//   }, [navigate]);

//   const editorConfig = useMemo(() => ({
//     readonly: false,
//     minHeight: 180,
//     placeholder: 'Start typing...',
//     toolbarAdaptive: false
//   }), []);

//   const validate = () => {
//     const q = stripHtml(question);
//     const a = stripHtml(answer);
//     const errs = {
//       question: q ? '' : 'Question is required',
//       answer: a ? '' : 'Answer is required'
//     };
//     setErrors(errs);
//     return !errs.question && !errs.answer;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const newFaq = await createFaq({ question, answer });
//       setQuestion('');
//       setAnswer('');
//       setErrors({ question: '', answer: '' });

//       if (onAdd) onAdd(newFaq);
//       toast.success('FAQ added successfully!');
//       setTimeout(() => navigate('/admin/web-management/faq'), 1000);
//     } catch (err) {
//       // eslint-disable-next-line no-console
//       console.error(err);
//       toast.error('Failed to add FAQ. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <h2>Add New FAQ</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Question (Jodit) */}
//         <FormGroup>
//           <Label htmlFor="question">Question</Label>
//           <JoditEditor
//             ref={questionEditorRef}
//             value={question}
//             config={{ ...editorConfig, placeholder: 'Enter question...' }}
//             // Update content as user types; you can switch to onBlur if you prefer
//             onChange={(newContent) => {
//               setQuestion(newContent);
//               if (errors.question) {
//                 setErrors(prev => ({ ...prev, question: '' }));
//               }
//             }}
//           />
//           {errors.question && <ErrorText>{errors.question}</ErrorText>}
//         </FormGroup>

//         {/* Answer (Jodit) */}
//         <FormGroup>
//           <Label htmlFor="answer">Answer</Label>
//           <JoditEditor
//             ref={answerEditorRef}
//             value={answer}
//             config={{ ...editorConfig, placeholder: 'Enter answer...' }}
//             onChange={(newContent) => {
//               setAnswer(newContent);
//               if (errors.answer) {
//                 setErrors(prev => ({ ...prev, answer: '' }));
//               }
//             }}
//           />
//           {errors.answer && <ErrorText>{errors.answer}</ErrorText>}
//         </FormGroup>

//         {!readOnlyPermissions && (
//           <SubmitButton type="submit" disabled={loading}>
//             {loading ? 'Adding…' : 'Add New FAQ'}
//           </SubmitButton>
//         )}
//       </form>

//       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//     </Container>
//   );
// };

// export default AddFaq;


// src/modules/admin/components/AddFaq/AddFaq.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  FormGroup,
  Label,
  SubmitButton,
  ErrorText
} from '../AddFaq/AddFaq.style';
import { createFaq } from '../../../../../../api/faqApi';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';

const stripHtml = (html = '') =>
  html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

const AddFaq = ({ onAdd }) => {
  const questionEditorRef = useRef(null);
  const answerEditorRef = useRef(null);

  // Keep both fields as strings
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [errors, setErrors] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        const ro = response.Permissions["webManagement"].readOnly;
        setReadOnlyPermissions(ro);
        if (ro) {
          toast.error('You do not have permission to add FAQs.', {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            onClose: () => navigate('/admin/')
          });
        }
      }
    };
    apiCaller();
  }, [navigate]);

  // Stable config like in your Mission example
  const editorConfig = useMemo(() => ({
    readonly: false,
    minHeight: 180,
    placeholder: 'Start typing...',
    toolbarAdaptive: false
  }), []);

  const validate = () => {
    const q = stripHtml(question);
    const a = stripHtml(answer);
    const errs = {
      question: q ? '' : 'Question is required',
      answer: a ? '' : 'Answer is required'
    };
    setErrors(errs);
    return !errs.question && !errs.answer;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const newFaq = await createFaq({ question, answer });
      setQuestion('');
      setAnswer('');
      setErrors({ question: '', answer: '' });

      if (onAdd) onAdd(newFaq);
      toast.success('FAQ added successfully!');
      setTimeout(() => navigate('/admin/web-management/faq'), 1000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Failed to add FAQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Add New FAQ</h2>
      <form onSubmit={handleSubmit}>
        {/* Question (Jodit) */}
        <FormGroup>
          <Label htmlFor="question">Question</Label>
          <JoditEditor
            ref={questionEditorRef}
            value={question}
            config={{ ...editorConfig, placeholder: 'Enter question...' }}
            // Update on blur to prevent cursor/keystroke glitches
            onBlur={(newContent) => {
              setQuestion(newContent);
              if (errors.question) {
                setErrors(prev => ({ ...prev, question: '' }));
              }
            }}
            onChange={() => { /* no-op: we update on blur */ }}
          />
          {errors.question && <ErrorText>{errors.question}</ErrorText>}
        </FormGroup>

        {/* Answer (Jodit) */}
        <FormGroup>
          <Label htmlFor="answer">Answer</Label>
          <JoditEditor
            ref={answerEditorRef}
            value={answer}
            config={{ ...editorConfig, placeholder: 'Enter answer...' }}
            onBlur={(newContent) => {
              setAnswer(newContent);
              if (errors.answer) {
                setErrors(prev => ({ ...prev, answer: '' }));
              }
            }}
            onChange={() => { /* no-op: we update on blur */ }}
          />
          {errors.answer && <ErrorText>{errors.answer}</ErrorText>}
        </FormGroup>

        {!readOnlyPermissions && (
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Adding…' : 'Add New FAQ'}
          </SubmitButton>
        )}
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default AddFaq;
