import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from "../../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from '../../../pages/LandingPage/Footer/Footer';
import { getAllStatic } from '../../../api/staticApi';
const TermsAndConditions = () => {
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
    <>
    <Header />
    <TermsContainer>
       
      {/* <Header1>
        <Title>Terms and Conditions</Title>
     
      </Header1> */}
      
      <ContentContainer>
        <Section>
          {/* <SectionTitle>            By accessing and using our services, you accept and agree to be bound by these Terms and Conditions. 
            If you do not agree with any part of these terms, you must not use our services.
         </SectionTitle> */}
      <SectionContent dangerouslySetInnerHTML={{ __html: termsContent }} />
        </Section>


        
      </ContentContainer>
    </TermsContainer>
    <Footer />
    </>
  );
};

// Styled Components
const TermsContainer = styled.div`
//   max-width: 800px;
width: 80%;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header1 = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
`;

const LastUpdated = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ContentContainer = styled.div`
  line-height: 1.6;
  color: #34495e;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color:rgb(38, 160, 241);
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  text-align: justify;

  ul {
    padding-left: 1.5rem;
    margin: 0.8rem 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const AcceptanceBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  transform: scale(1.2);
`;

const Label = styled.label`
  font-weight: 500;
  cursor: pointer;
`;

export default TermsAndConditions;