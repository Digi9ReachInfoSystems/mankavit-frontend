import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAttemptById, evaluateMocktest } from "../../../../../api/mocktestApi";

const ViewUserResults = () => {
  const { attemptId } = useParams();
  const [attemptData, setAttemptData] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAttemptById(attemptId);
        
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

  const handleMarkChange = (questionId, value) => {
    const updated = evaluations.map(e =>
      e.questionId === questionId
        ? { ...e, marks: parseInt(value) || 0 }
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

      const response = await evaluateMocktest(payload);
      console.log("Evaluation submitted successfully", response);
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
            <Label>Marks:</Label>
            <MarkInput
              type="number"
              min="0"
              max={question.marks}
              value={evalItem?.marks ?? ""}
              onChange={(e) => handleMarkChange(a.questionId, e.target.value)}
              placeholder={`0-${question.marks}`}
            />
          </QuestionCard>
        );
      })}

      <SubmitButton onClick={handleSubmit}>Submit Evaluation</SubmitButton>
    </Container>
  );
};

export default ViewUserResults;