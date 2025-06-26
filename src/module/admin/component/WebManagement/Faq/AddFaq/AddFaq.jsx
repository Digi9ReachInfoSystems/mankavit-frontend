// src/modules/admin/components/AddFaq/AddFaq.jsx
import React, { useState } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  SubmitButton,
  ErrorText
} from '../AddFaq/AddFaq.style';
import { createFaq } from '../../../../../../api/faqApi';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddFaq = ({ onAdd }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        <FormGroup>
          <Label htmlFor="question">Question</Label>
          <TextInput
            id="question"
            placeholder="Enter question"
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
            placeholder="Enter answer"
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

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add New FAQ'}
        </SubmitButton>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </Container>
  );
};

export default AddFaq;
