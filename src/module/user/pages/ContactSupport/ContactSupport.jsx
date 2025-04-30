import React, { useState } from 'react';
import {
  ContactContainer,
  ContactTitle,
  TextArea,
  SubmitButton,
} from './ContactSupport.styles';

const ContactSupport = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    alert(`Message submitted: ${message}`);
    setMessage('');
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact Support</ContactTitle>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Write Text here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </ContactContainer>
  );
};

export default ContactSupport;
