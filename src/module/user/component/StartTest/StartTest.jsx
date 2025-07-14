import React, { useEffect, useState } from "react";
import {
  CardContainer, Title, Card, ExamImage,
  TestName, Subject, DetailsList,
  DetailItem, StartButton
} from "./StartTest.styles";
import startTest from "../../../../assets/startTest.png";
import { useNavigate, useParams } from "react-router-dom";
import { getMocktestById } from "../../../../api/mocktestApi";

const StartTest = () => {
  const navigate = useNavigate();
  const { testId, subjectId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMockTest = async () => {
      try {
        const response = await getMocktestById(testId);
        if (response.success) {
          setTest(response.data);
        } else {
          setError("Failed to load test details");
        }
      } catch (err) {
        console.error("Error fetching mock test:", err);
        setError("Error loading test details");
      } finally {
        setLoading(false);
      }
    };
    fetchMockTest();
  }, [testId]);

  if (loading) return <CardContainer><Title>Loading test details...</Title></CardContainer>;
  if (error)   return <CardContainer><Title>{error}</Title></CardContainer>;
  if (!test)  return <CardContainer><Title>Test not found</Title></CardContainer>;

  return (
    <CardContainer>
      <Title>All the best !!</Title>
      <Card>
        <ExamImage src={startTest} alt="exam" />
        <TestName>{test.title}</TestName>
        <Subject>Subject: {test.subject?.subjectName || "General"}</Subject>
        <DetailsList>
          <DetailItem>Duration: {test.duration} minutes</DetailItem>
          <DetailItem>Total Questions: {test.number_of_questions}</DetailItem>
          {/* {test.description && <DetailItem>Description: {test.description}</DetailItem>} */}
        <DetailItem 
       
        >
  <strong>Description:</strong> 
  <span dangerouslySetInnerHTML={{ __html: test.description }} />
</DetailItem>
        </DetailsList>
      </Card>
      <StartButton
        onClick={() => navigate(`/test-instructions/${testId}/${subjectId}`)}
      >
        Start Test
      </StartButton>
    </CardContainer>
  );
};

export default StartTest;
