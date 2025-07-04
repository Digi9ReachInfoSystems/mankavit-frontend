// src/components/GotQuestions/GotQuestions.jsx
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
        const data = await getAllfaqs();
        console.log("API raw response:", data);
        setFaqs(data);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Could not load FAQs.");
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

          {loading && <p>Loading FAQs…</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              {faqs.length > 0 ? (
                faqs.map((faq, idx) => (
                  <QuestionItem key={faq._id}>
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
                    {openIndex === idx && faq.answer && (
                      <Answer>{faq.answer}</Answer>
                    )}
                  </QuestionItem>
                ))
              ) : (
                <p>No FAQs found.</p>
              )}
            </>
          )}

          {/* 
          <ViewAllButton onClick={() => navigate('/faq')}>
            View All Questions
          </ViewAllButton> */}
        </RightSection>
      </Content>
    </Container>
  );
};

export default GotQuestion;
