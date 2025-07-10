import React, { useState, useEffect } from 'react';
import { TermsContainer, TermsHeading, Termspara, List } from './TermsAndCondition.styles';
import { getAllStatic } from '../../../../api/staticApi';

const TermsAndCondition = () => {
  const [termsContent, setTermsContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getAllStatic();
        // Access the first item in the array and get its terms property
        if (Array.isArray(response) && response.length > 0) {
          setTermsContent(response[0].terms);
        } else {
          setError("No terms content found");
        }
      } catch (err) {
        console.error("Failed to fetch terms:", err);
        setError("Failed to load terms and conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return <TermsContainer>Loading terms and conditions...</TermsContainer>;
  }

  if (error) {
    return <TermsContainer>{error}</TermsContainer>;
  }

  return (
    <TermsContainer>
      <TermsHeading>Terms And Conditions</TermsHeading>
      <Termspara>
        By accessing and using the services provided by Mankavit Law Academy, you agree to the following Terms and Conditions:
      </Termspara>
      <Termspara>{termsContent}</Termspara>
    </TermsContainer>
  );
};

export default TermsAndCondition;