import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Title,
  UserInfo,
  QuestionCard,
  Section,
  Label,
  QuestionText,

  AnswerText,
  SubTitle,
  MarkInput,
  SubmitButton,


} from "./ViewUserResults.styles";

import { getAttemptById, evaluateMocktest } from "../../../../../api/mocktestApi";
import { set } from "date-fns";

const ViewUserResults = () => {
  const { attemptId } = useParams();
  const [attemptData, setAttemptData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mockTestId, setMockTestId] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluationStatus, setEvaluationStatus] = useState(null);
  const naviagate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("attemptId", attemptId);
        const response = await getAttemptById(attemptId);
        console.log("response", response);
        setUserId(response.data.userId._id);
        setMockTestId(response.data.mockTestId._id);
        setEvaluationStatus(response.data.status);
        if (response.success) {
          setAttemptData(response.data);
          // Initialize evaluations with existing marks or 0
          const subjEvals = response.data.answers
            .filter(a => {
              const question = response.data.mockTestId.questions.find(q => q._id === a.questionId);
              return question?.type === "subjective";
            })
            .map(a => ({
              questionId: a.questionId,
              isCorrect: false,
              marks: a.marksAwarded || 0
            }));
          setEvaluations(subjEvals);
        } else {
          throw new Error("Failed to fetch attempt data");
        }
      } catch (error) {
        console.error("Error fetching attempt:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [attemptId]);

  const initializeEvaluations = (answers) => {
    const subjEvals = answers
      .filter(a => {
        const question = attemptData?.mockTestId?.questions?.find(q => q._id === a.questionId);
        return question?.type === "subjective";
      })
      .map(a => ({
        questionId: a.questionId,
        marks: a.marksAwarded || 0
      }));
    setEvaluations(subjEvals);
  };

  const handleMarkChange = (questionId, isCorrect, value) => {
    console.log("handleMarkChange", questionId, isCorrect, value);
    const updated = evaluations.map(e =>
      e.questionId === questionId
        ? { ...e, isCorrect: isCorrect, marks: parseInt(value) || 0 }
        : e
    );
    setEvaluations(updated);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        attemptId,
        evaluations: evaluations.map(e => ({
          questionId: e.questionId,
          isCorrect: false,
          marks: e.marks
        }))
      };
      console.log("payload", payload);
      const response = await evaluateMocktest(payload);
      if (response.success) {
        console.log("Evaluation submitted successfully", response);
        naviagate(`/admin/mock-test/user-attempts/${mockTestId}/${userId}`);
      }

    } catch (error) {
      console.error("Failed to submit evaluation", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!attemptData) return <div>Attempt not found</div>;

  const mcqAnswers = attemptData.answers.filter(a => {
    const question = attemptData.mockTestId.questions.find(q => q._id === a.questionId);
    return question?.type === "mcq";
  });

  const subjectiveAnswers = attemptData.answers.filter(a => {
    const question = attemptData.mockTestId.questions.find(q => q._id === a.questionId);
    return question?.type === "subjective";
  });

  return (
    <Container>
      <Title>User Result</Title>
      <UserInfo>
        <p><strong>Username:</strong> {attemptData.userId.displayName}</p>
        <p><strong>Total Marks:</strong> {attemptData.totalMarks}</p>
      </UserInfo>

      <SubTitle>MCQ Questions</SubTitle>
      {mcqAnswers.map((a, index) => {
        const question = attemptData.mockTestId.questions.find(q => q._id === a.questionId);
        return (
          <QuestionCard key={`mcq-${index}`}>
            <QuestionText>{question.questionText}</QuestionText>
            <AnswerText><strong>Your Answer:</strong> {a.answer}</AnswerText>
            <AnswerText><strong>Marks:</strong> {a.marksAwarded}</AnswerText>
          </QuestionCard>
        );
      })}

      <SubTitle>Subjective Questions</SubTitle>
      {subjectiveAnswers.map((a, index) => {
        const question = attemptData.mockTestId.questions.find(q => q._id === a.questionId);
        const evalItem = evaluations.find(e => e.questionId === a.questionId);
        return (
          <QuestionCard key={`subj-${index}`}>
            <QuestionText>{question.questionText}</QuestionText>
            <AnswerText><strong>Your Answer:</strong> {a.answer}</AnswerText>
            <Label>Evaluate to:</Label>
            <input type="radio" name={`subj-${index}`} value="correct" checked={evalItem?.marks === question.marks} /> Correct
            <input type="radio" name={`subj-${index}`} value="Incorrect" checked={evalItem?.marks !== question.marks} /> Incorrect
            <Label>Max Marks:</Label>
            <AnswerText>{question.marks}</AnswerText>
            <Label>Marks:</Label>
            <MarkInput
              type="number"
              min="0"
              disabled={evaluationStatus !== "submitted"}
              max={question.marks}
              value={evalItem?.marks ?? ""}
              onChange={(e) => {
                if (e.target.value > question.marks) return;
                handleMarkChange(a.questionId, e.target.value == question.marks, e.target.value)
              }}
              placeholder={`0-${question.marks}`}
            />
          </QuestionCard>
        );
      })}
      {evaluationStatus === "submitted" &&
        <SubmitButton onClick={handleSubmit}>Submit Evaluation</SubmitButton>}
    </Container>
  );
};

export default ViewUserResults;