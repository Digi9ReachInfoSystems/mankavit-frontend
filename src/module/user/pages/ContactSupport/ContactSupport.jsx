

import React, { useState } from 'react';
import {
  ContactContainer,
  ContactTitle,
  TextArea,
  SubmitButton,
} from './ContactSupport.styles';
import toast, { Toaster } from "react-hot-toast";
import { createSupport } from '../../../../api/supportApi';
import { message } from 'antd';
import { getCookiesData } from '../../../../utils/cookiesService';
import { getUserByUserId } from '../../../../api/authApi';

const ContactSupport = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Removed the redundant supports state since we're using message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      // Add validation for empty message
      message.error('Please enter a message');
      return;
    }
    
    try {
      setLoading(true);
      const cookiesData= await getCookiesData();
      const userData= await getUserByUserId(cookiesData.userId);
      const response = await createSupport({name: userData.user.displayName, email: userData.user.email, description }); // Pass the message as an object
      // console.log(response);
  toast.success('Message sent successfully');
      setDescription(''); // Clear the message after successful submission
      setLoading(false);
    } catch (error) {
      // console.error(error);
      toast.error('Failed to send message');
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Toaster position='top-center'/>
      <ContactTitle>Contact Support</ContactTitle>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Write Text here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading} // Disable during loading
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </SubmitButton>
      </form>
    </ContactContainer>
  );
};

export default ContactSupport;