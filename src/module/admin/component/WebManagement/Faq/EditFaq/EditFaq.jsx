// src/modules/admin/components/EditFaq/EditFaq.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  FormGroup,
  Label,
  SubmitButton,
  ErrorText
} from './EditFaq.style';
import {
  getFaqById,
  updateFaqById
} from '../../../../../../api/faqApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';
import JoditEditor from 'jodit-react';

const stripHtml = (html = '') =>
  html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const questionEditorRef = useRef(null);
  const answerEditorRef = useRef(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState('');
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
          toast.error('You do not have permission to edit FAQs.', {
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
    };
    apiCaller();
  }, [navigate]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaqById(id);
        setQuestion(data.question || '');
        setAnswer(data.answer || '');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setFetchError('Could not load FAQ');
        toast.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, [id]);

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
      answer  : a ? '' : 'Answer is required'
    };
    setErrors(errs);
    return !errs.question && !errs.answer;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await updateFaqById(id, { question, answer });
      toast.success('FAQ updated successfully!');
      setTimeout(() => navigate('/admin/web-management/faq'), 1000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Failed to update data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p style={{ color: 'red' }}>{fetchError}</p>;

  return (
    <Container>
      <h2>Edit FAQ</h2>
      <form onSubmit={handleSubmit}>
        {/* Question */}
        <FormGroup>
          <Label htmlFor="question">Question</Label>
          <JoditEditor
            ref={questionEditorRef}
            value={question}
            config={{ ...editorConfig, placeholder: 'Edit question...' }}
            onBlur={(newContent) => {
              setQuestion(newContent);
              if (errors.question) {
                setErrors(prev => ({ ...prev, question: '' }));
              }
            }}
            onChange={() => { /* no-op: updating on blur prevents typing issues */ }}
          />
          {errors.question && <ErrorText>{errors.question}</ErrorText>}
        </FormGroup>

        {/* Answer */}
        <FormGroup>
          <Label htmlFor="answer">Answer</Label>
          <JoditEditor
            ref={answerEditorRef}
            value={answer}
            config={{ ...editorConfig, placeholder: 'Edit answer...' }}
            onBlur={(newContent) => {
              setAnswer(newContent);
              if (errors.answer) {
                setErrors(prev => ({ ...prev, answer: '' }));
              }
            }}
            onChange={() => { /* no-op: updating on blur prevents typing issues */ }}
          />
          {errors.answer && <ErrorText>{errors.answer}</ErrorText>}
        </FormGroup>

        {!readOnlyPermissions && (
          <SubmitButton type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </SubmitButton>
        )}
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default EditFaq;
