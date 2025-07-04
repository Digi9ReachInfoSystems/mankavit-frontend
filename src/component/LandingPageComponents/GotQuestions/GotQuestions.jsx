import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  LeftImage,
  RightSection,
  Heading,
  QuestionItem,
  QuestionHeader,
  QuestionText,
  ArrowIcon,
  Answer,
  ViewAllButton,
  LoadingMessage,
  ErrorMessage,
  NoFaqMessage
} from "./GotQuestions.styles";
import { getAllfaqs } from "../../../api/faqApi";
import ladyJustice from "../../../assets/Study2.png";
import { IoIosArrowDropup, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const GotQuestion = () => {
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
        console.log("API Response:", response); // Debug log
        
        // Handle different response formats
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
        console.error("Error fetching FAQs:", err);
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
        <LeftImage src={ladyJustice} alt="Justice" />

        <RightSection>
          <Heading>Got Questions?</Heading>

          {loading && <LoadingMessage>Loading FAQs…</LoadingMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!loading && !error && (
            <>
              {faqs.length > 0 ? (
                faqs?.map((faq, idx) => (
                  <QuestionItem key={faq._id || idx}>
                    <QuestionHeader onClick={() => toggleQuestion(idx)}>
                      <QuestionText>{faq.question}</QuestionText>
                      <ArrowIcon>
                        {openIndex === idx ? (
                          <IoIosArrowDropup />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </ArrowIcon>
                    </QuestionHeader>
                    {openIndex === idx && (
                      <Answer>{faq.answer || "No answer available"}</Answer>
                    )}
                  </QuestionItem>
                ))
              ) : (
                <NoFaqMessage>No FAQs found.</NoFaqMessage>
              )}
            </>
          )}

          {/* Optionally keep this if you have an FAQ page */}
          {/* <ViewAllButton onClick={() => navigate('/faq')}>
            View All Questions
          </ViewAllButton> */}
        </RightSection>
      </Content>
    </Container>
  );
};

export default GotQuestion;