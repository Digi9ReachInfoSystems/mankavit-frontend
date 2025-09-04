import React, { useEffect, useState } from "react";
import {
  CardContainer,
  Title,
  Card,
  ExamImage,
  TestName,
  Subject,
  DetailsList,
  DetailItem,
  StartButton,
} from "./StartTest.styles";
import startTest from "../../../../assets/startTest.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkMockTestAttempted,
  getMocktestById,
  submitMocktest,
} from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";

const StartTest = () => {
  const navigate = useNavigate();
  const { testId, subjectId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [attemptId, setAttemptId] = useState(null);

  useEffect(() => {
    const fetchMockTest = async () => {
      try {
        const cookiesData = await getCookiesData();

        const response = await getMocktestById(testId);
        const checkResponse = await checkMockTestAttempted(
          cookiesData.userId,
          testId,
          subjectId
        );

        if (checkResponse.success) {
          setAlreadyAttempted(true);
          setAttemptId(checkResponse.data._id);
        } else {
          setAlreadyAttempted(false);
        }
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

  if (loading)
    return (
      <CardContainer>
        <Title>Loading test details...</Title>
      </CardContainer>
    );
  if (error)
    return (
      <CardContainer>
        <Title>{error}</Title>
      </CardContainer>
    );
  if (!test)
    return (
      <CardContainer>
        <Title>Test not found</Title>
      </CardContainer>
    );

  if (alreadyAttempted) {
    return (
      <CardContainer>
        <Title>You have already attempted this test</Title>
        <Card>
          <ExamImage src={startTest} alt="exam" />
          <TestName>{test.title}</TestName>
          <Subject>Subject: {test.subject?.subjectName || "General"}</Subject>
          <p style={{ fontSize: "18px", margin: "20px 0", color: "#333" }}>
            Do you want to resume your previous attempt or submit it and start a
            new one?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <StartButton
              style={{ width: "200px" }}
              onClick={() => {
                navigate(`/test-instructions/${testId}/${subjectId}`);
              }}
            >
              Resume Test
            </StartButton>
            {/* <StartButton
              style={{
                width: "250px",
                background: "linear-gradient(90deg, #ff4e50, #f9d423)",
              }}
              onClick={async () => {
                try {
                  console.log("attemptId", attemptId);
                  const cookiesData = await getCookiesData();

                  const response = await submitMocktest({
                    user_id: cookiesData.userId,
                    attemptId: attemptId,
                  });
                  console.log("response", response);
                  if (response.success) {
                    navigate(`/test-instructions/${testId}/${subjectId}`);
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Submit & Start New Attempt
            </StartButton> */}
          </div>
        </Card>
      </CardContainer>
    );
  }

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
          <DetailItem>
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
