import React, { useState } from 'react';
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
  ViewAllButton
} from './GotQuestions.styles';

import ladyJustice from '../../../assets/Study2.png'; // your image path
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const questionsData = [
  {
    question: 'What courses does Mankavit offer?',
    answer:
      'We offer coaching for CLAT, AILET, DU LLM, and ILICAT exams, with tailored programs for each.',
  },
  {
    question: 'Can I get personalized coaching?',
    answer: '',
  },
  {
    question: 'What makes Mankavit different from other coaching centers?',
    answer: '',
  },
  {
    question: 'How can I enroll in a course?',
    answer: '',
  },
];

const GotQuestion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <Container>
      <Content>
        <LeftImage src={ladyJustice} alt="Justice" />

        <RightSection>
          <Heading>Got Question?</Heading>

          {questionsData.map((item, index) => (
            <QuestionItem key={index}>
              <QuestionHeader onClick={() => toggleQuestion(index)}>
                <QuestionText>{item.question}</QuestionText>
                <ArrowIcon>
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </ArrowIcon>
              </QuestionHeader>

              {openIndex === index && item.answer && (
                <Answer>{item.answer}</Answer>
              )}
            </QuestionItem>
          ))}

          <ViewAllButton>View All Questions</ViewAllButton>
        </RightSection>
      </Content>
    </Container>
  );
};

export default GotQuestion;
