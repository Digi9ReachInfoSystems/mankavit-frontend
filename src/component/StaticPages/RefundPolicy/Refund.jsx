
import React, { useState, useEffect } from 'react';
import { PrivacyContainer,PrivacyHeading, PrivacyPara } from './Refund.style';
import { getAllStatic } from '../../../api/staticApi';
import Header from '../../../pages/LandingPage/LandingHeader/LandingHeader';
import Footer from '../../../pages/LandingPage/Footer/Footer';

const Refund = () => {
  const [refundContent, setrefundContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getAllStatic();
        // Access the first item in the array and get its terms property
        if (Array.isArray(response) && response.length > 0) {
          setrefundContent(response[0].refund);
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
    return <PrivacyContainer>Loading terms and conditions...</PrivacyContainer>;
  }

  if (error) {
    return <PrivacyContainer>{error}</PrivacyContainer>;
  }

  return (
    <>
    <Header/>
    <PrivacyContainer>
      {/* <PrivacyHeading>Privacy Policy</PrivacyHeading> */}
      {/* <Termspara>
        By accessing and using the services provided by Mankavit Law Academy, you agree to the following Terms and Conditions:
      </Termspara> */}
      {/* <PrivacyPara>{refundContent}</PrivacyPara> */}
      <PrivacyPara dangerouslySetInnerHTML={{ __html: refundContent }} />
    </PrivacyContainer>
    <Footer/>
    </>
  );
};

export default Refund;