import React from "react";
import {
  CardContainer,
  Title,
  Card,
  ExamImage,
  TestName,
  Subject,
  DetailsList,
  DetailItem,
  StartButton
} from "./StartTest.styles";
import startTest from "../../../../assets/startTest.png";
import { useNavigate } from "react-router-dom";

const tests = [
  {
    id: 1,
    image: startTest,
    name: "Law Fundamentals Mock Test 1",
    subjects: ["Constitutional Law", "Criminal Law", "Contract Law"],
    date: "25th March 2025",
    duration: "2 hours",
    questions: 50,
    type: "Multiple Choice Questions (MCQs) & Case Studies",
  }
]

const StartTest = () => {
  const navigate = useNavigate();


  return (
    <CardContainer>
      <Title>All the best !!</Title>
      {tests.map((test) => (
        <Card key={test.id}>
          <div className="card-inner">
            <ExamImage src={test.image} alt="exam" />
            <TestName>{test.name}</TestName>
            <Subject>
              Subject: {test.subjects.join(", ")}
            </Subject>
            <DetailsList>
              <DetailItem> Date: {test.date}</DetailItem>
              <DetailItem> Duration: {test.duration}</DetailItem>
              <DetailItem> Total Questions: {test.questions}</DetailItem>
              <DetailItem> Type: {test.type}</DetailItem>
            </DetailsList>
          </div>
        </Card>
      ))}
      <StartButton onClick={() => { navigate("/test-instructions") }}>Start Test</StartButton>

    </CardContainer>
  );
};

export default StartTest;
