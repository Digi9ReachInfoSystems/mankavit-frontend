// src/modules/admin/components/AddFaq/AddFaq.jsx
import React, { useState } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  SubmitButton
} from '../AddFaq/AddFaq.style';
import { createFaq } from '../../../../../../api/faqApi';
import { useNavigate } from 'react-router-dom';

const AddFaq = ({ onAdd }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // call your API
      const newFaq = await createFaq({ question, answer });

      // clear form
      setQuestion('');
      setAnswer('');

      // notify parent if they passed an onAdd callback
      if (onAdd) onAdd(newFaq);

      navigate(-1);

    } catch (err) {
      console.error(err);
      setError('Failed to add FAQ. Please try again.');
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
            onChange={(e) => setQuestion(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="answer">Answer</Label>
          <TextArea
            id="answer"
            rows={4}
            placeholder="Enter answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </FormGroup>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add New FAQ'}
        </SubmitButton>
      </form>
    </Container>
  );
};

export default AddFaq;
