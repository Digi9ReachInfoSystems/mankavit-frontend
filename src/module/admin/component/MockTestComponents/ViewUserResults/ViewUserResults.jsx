import React from "react";
import {
  Container,
  Title,
  UserInfo,
  Section,
  QuestionCard,
  QuestionText,
  AnswerText,
  Label,
  SubTitle,
} from "./ViewUserResults.styles";

const sampleResult = {
  username: "Alice Johnson",
  totalMarks: 22,
  questions: [
    {
      question: "What is the capital of Italy?",
      userAnswer: "Rome",
      expectedAnswer: "Rome",
      marksObtained: 5,
      type: "MCQ",
    },
    {
      question: "Which planet is known as the Red Planet?",
      userAnswer: "Mars",
      expectedAnswer: "Mars",
      marksObtained: 5,
      type: "MCQ",
    },
    {
      question: "Define encapsulation in object-oriented programming.",
      userAnswer: "Encapsulation is the process of hiding internal data...",
      type: "Subjective",
    },
    {
      question: "Explain the concept of RESTful APIs.",
      userAnswer: "RESTful APIs follow REST architecture using HTTP...",
      type: "Subjective",
    },
  ],
};


const ViewUserResults = () => {

    const result = sampleResult;
  const mcqQuestions = result.questions.filter((q) => q.type === "MCQ");
  const subjectiveQuestions = result.questions.filter((q) => q.type === "Subjective");

  return (
    <Container>
      <Title>User Result</Title>
      <UserInfo>
        <p><strong>Username:</strong> {result.username}</p>
        <p><strong>Total Marks Obtained:</strong> {result.totalMarks}</p>
      </UserInfo>

      <SubTitle>MCQ Questions</SubTitle>

      {/* Display all MCQ Questions */}
      {mcqQuestions.map((q, index) => (
        <QuestionCard key={`mcq-${index}`}>
          <Section>
            <Label>Question:</Label>
            <QuestionText>{q.question}</QuestionText>
          </Section>

          <Section>
            <Label>User Answer:</Label>
            <AnswerText>{q.userAnswer}</AnswerText>
          </Section>

          <Section>
            <Label>Expected Answer:</Label>
            <AnswerText>{q.expectedAnswer}</AnswerText>
          </Section>

          <Section>
            <Label>Marks Obtained:</Label>
            <AnswerText>{q.marksObtained}</AnswerText>
          </Section>
        </QuestionCard>
      ))}

      <SubTitle>Subjective Questions</SubTitle>

      {/* Display all Subjective Questions */}
      {subjectiveQuestions.map((q, index) => (
        <QuestionCard key={`subj-${index}`}>
          <Section>
            <Label>Question:</Label>
            <QuestionText>{q.question}</QuestionText>
          </Section>

          <Section>
            <Label>User Answer:</Label>
            <AnswerText>{q.userAnswer}</AnswerText>
          </Section>
        </QuestionCard>
      ))}
    </Container>
  );
};

export default ViewUserResults;
