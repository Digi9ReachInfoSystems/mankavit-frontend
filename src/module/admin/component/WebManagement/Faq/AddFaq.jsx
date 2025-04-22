import React, { useState } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  SubmitButton
} from '../Faq/AddFaq.style';

const AddFaq = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSubmit({ question, answer });
    setQuestion('');
    setAnswer('');
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

        <SubmitButton type="submit">Add New FAQs</SubmitButton>
      </form>
    </Container>
  );
};

export default AddFaq;