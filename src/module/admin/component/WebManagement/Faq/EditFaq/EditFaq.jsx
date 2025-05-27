// src/modules/admin/components/EditFaq/EditFaq.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  SubmitButton
} from './EditFaq.style';
import {
    getFaqById,
  updateFaqById
} from '../../../../../../api/faqApi';

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaqById(id);
        setQuestion(data.question);
        setAnswer(data.answer);
      } catch {
        setError('Could not load FAQ');
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setSaving(true);
    setError(null);
    try {
      await updateFaqById(id, { question, answer });
      navigate(-1); // go back to the list
    } catch {
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

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
           onChange={(e)=>{
            const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setQuestion(filteredData);
           }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="answer">Answer</Label>
          <TextArea
            id="answer"
            rows={4}
            placeholder="Edit answer"
            value={answer}
         onChange={(e)=>{
            const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setAnswer(filteredData);
         }}
          />
        </FormGroup>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SubmitButton type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </SubmitButton>
      </form>
    </Container>
  );
};

export default EditFaq;
