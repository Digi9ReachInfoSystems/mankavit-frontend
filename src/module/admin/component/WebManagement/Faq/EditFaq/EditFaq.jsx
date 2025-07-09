// src/modules/admin/components/EditFaq/EditFaq.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  TextArea,
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

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        response.Permissions;
        if (response.isSuperAdmin === true) {
          setReadOnlyPermissions(false);
        } else {
          setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
          if (response.Permissions["webManagement"].readOnly) {
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
      }
      apiCaller();
    }, []);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaqById(id);
        setQuestion(data.question);
        setAnswer(data.answer);
      } catch (err) {
        console.error(err);
        setFetchError('Could not load FAQ');
        toast.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, [id]);

  const validate = () => {
    const errs = { question: '', answer: '' };
    if (!question.trim()) errs.question = 'Question is required';
    if (!answer.trim())   errs.answer   = 'Answer is required';
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
        <FormGroup>
          <Label htmlFor="question">Question</Label>
          <TextInput
            id="question"
            placeholder="Edit question"
            value={question}
            onChange={e => {
              const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, '');
              setQuestion(filtered);
              if (errors.question) {
                setErrors(prev => ({ ...prev, question: '' }));
              }
            }}
          />
          {errors.question && <ErrorText>{errors.question}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="answer">Answer</Label>
          <TextArea
            id="answer"
            rows={4}
            placeholder="Edit answer"
            value={answer}
            onChange={e => {
              const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, '');
              setAnswer(filtered);
              if (errors.answer) {
                setErrors(prev => ({ ...prev, answer: '' }));
              }
            }}
          />
          {errors.answer && <ErrorText>{errors.answer}</ErrorText>}
        </FormGroup>

        <SubmitButton type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </SubmitButton>
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
