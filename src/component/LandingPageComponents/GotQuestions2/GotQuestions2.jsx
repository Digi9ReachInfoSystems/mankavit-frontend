import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { getAllfaqs } from "../../../api/faqApi";
import ladyJustice from "../../../assets/Study2.png";
import { IoIosArrowDropup, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 500px; opacity: 1; }
`;

const slideUp = keyframes`
  from { max-height: 500px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
`;

// Styled Components
const Container = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
`;

const Content = styled.div`
  width: 80%;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 1024px) {
    // width: 95%;
    gap: 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftImage = styled.img`
  width: 500px;
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 500px;

  @media (max-width: 1024px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: .2px;

  @media (max-width: 1360px) { font-size: 38px; }
 @media (max-width: 900px) {
    font-size: 36px;
  }
 @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 560px) {
    font-size: 28px;
  }
`;

const Highlight = styled.span`
  color: #2d79f3;
`;

const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
  // margin-top: 8px;
`;


const Heading = styled.h2`
  font-size: 50px;
  font-weight: 500;
  margin: 0 0 40px 0;
  background: linear-gradient(135deg, #007BFF 0%, #0DCAF0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
   @media (max-width: 900px) {
    font-size: 36px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    text-align: center;
  }
`;

const QuestionItem = styled.div`
  border-radius: 12px;
  margin-bottom: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 123, 255, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
    @media (max-width: 570px) {
    font-size: 12px;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 20px 24px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 123, 255, 0.03);
  }
`;

const QuestionText = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #252525;
  flex: 1;
  padding-right: 16px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 570px) {
    font-size: 14px;
  }
`;

const ArrowIcon = styled.div`
  color: #007BFF;
  font-size: 28px;
  transition: transform 0.3s ease;
  
  ${props => props.isOpen && css`
    transform: rotate(180deg);
  `}
`;

const Answer = styled.div`
  padding: 0 24px;
  color: #555;
  line-height: 1.6;
  font-size: 16px;
  overflow: hidden;
  
  ${props => props.isOpen ? css`
    animation: ${slideDown} 0.4s ease-out forwards;
    padding-bottom: 24px;
  ` : css`
    animation: ${slideUp} 0.4s ease-out forwards;
  `}

  @media (max-width: 768px) {
    font-size: 14px;
  }
    @media (max-width: 570px) {
    font-size: 12px;
  }
`;

const ViewAllButton = styled.button`
  margin-top: 40px;
  align-self: flex-start;
  background: linear-gradient(135deg, #007BFF 0%, #0DCAF0 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
  }

  @media (max-width: 768px) {
    align-self: center;
    padding: 12px 28px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #ff4757;
  background: rgba(255, 71, 87, 0.1);
  border-radius: 12px;
  border-left: 4px solid #ff4757;
`;

const NoFaqMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const FaqCount = styled.div`
  margin: -30px 0 20px 0;
  color: #777;
  font-size: 16px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

// Main Component
const GotQuestions2 = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllfaqs();
        // console.log("API Response:", response);
        
        if (Array.isArray(response)) {
          setFaqs(response);
        } else if (response.data && Array.isArray(response.data)) {
          setFaqs(response.data);
        } else if (response.faqs && Array.isArray(response.faqs)) {
          setFaqs(response.faqs);
        } else {
          throw new Error("Invalid FAQ data format");
        }
      } catch (err) {
        // console.error("Error fetching FAQs:", err);
        setError(err.message || "Could not load FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleQuestion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Container>
      <Content>
        {/* <LeftImage src={ladyJustice} alt="Lady Justice" /> */}

        <RightSection>
          <Title>Got <Highlight>Questions?</Highlight></Title>
          <Underline />
          
          {/* {!loading && !error && faqs.length > 0 && (
            <FaqCount>{faqs.length} frequently asked questions</FaqCount>
          )} */}

          {loading && <LoadingMessage>Loading FAQs…</LoadingMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!loading && !error && (
            <>
              {faqs.length > 0 ? (
                faqs.slice(0, 5).map((faq, idx) => (
                  <QuestionItem key={faq._id || idx}>
                    <QuestionHeader onClick={() => toggleQuestion(idx)}>
                      <QuestionText dangerouslySetInnerHTML={faq.question?{__html:faq.question}:{__html:'No Question Text'}}>
                        </QuestionText>
                      <ArrowIcon isOpen={openIndex === idx}>
                        {openIndex === idx ? <IoIosArrowDropup /> : <IoIosArrowDown />}
                      </ArrowIcon>
                    </QuestionHeader>
                    <Answer isOpen={openIndex === idx}>
                      {/* {faq.answer || "No answer available"} */}
                      <div
                       dangerouslySetInnerHTML={faq.answer ? { __html: faq.answer } : { __html: "No answer available" }}></div>
                    </Answer>
                  </QuestionItem>
                ))
              ) : (
                <NoFaqMessage>No FAQs found.</NoFaqMessage>
              )}
            </>
          )}

          <ViewAllButton onClick={() => navigate('/faqs')}>
            View All Questions
          </ViewAllButton>
        </RightSection>
      </Content>
    </Container>
  );
};

export default GotQuestions2;