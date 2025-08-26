import React, { useEffect, useState } from "react";

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
  SaveButton,
  ButtonContainer,
  // NEW:
  QuestionLine,
  QIndex,
  OptionsList,
  OptionItem,
  OptionNumber,
} from "./MocktestStudentResult.style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAttemptById,
  evaluateMocktest,
  evaluateSingleSubjectiveQuestion,
} from "../../../../../../api/mocktestApi";
import { useNavigate, useParams } from "react-router-dom";
// MocktestStudentResult
const MocktestStudentResult = () => {
  const { attemptId } = useParams();
  const [attemptData, setAttemptData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mockTestId, setMockTestId] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluationStatus, setEvaluationStatus] = useState(null);
  const navigate = useNavigate();

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
            .filter((a) => {
              const question = response.data.mockTestId.questions.find(
                (q) => q._id === a.questionId
              );
              return question?.type === "subjective";
            })
            .map((a) => ({
              questionId: a.questionId,
              isCorrect:
                a.marksAwarded ===
                (response.data.mockTestId.questions.find(
                  (q) => q._id === a.questionId
                )?.marks || 0),
              marks: a.marksAwarded || 0,
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

  const handleMarkChange = (questionId, isCorrect, value) => {
    const updated = evaluations.map((e) =>
      e.questionId === questionId
        ? { ...e, isCorrect: isCorrect, marks: parseInt(value) || 0 }
        : e
    );
    setEvaluations(updated);
  };

  const handleSaveSingleQuestion = async (questionId) => {
    try {
      const evaluation = evaluations.find((e) => e.questionId === questionId);
      if (!evaluation) return;

      const question = attemptData.mockTestId.questions.find(
        (q) => q._id === questionId
      );
      const isCorrect = evaluation.marks === question.marks;

      const payload = {
        attemptId,
        questionId,
        marks: evaluation.marks,
        isCorrect,
      };

      const response = await evaluateSingleSubjectiveQuestion(payload);
      if (response.success) {
        toast.success(
          "Single subjective question evaluation saved successfully"
        );
        // console.log("Single question evaluation saved successfully", response);
        // Update the local state with the saved data
        const updatedAttemptData = { ...attemptData };
        const answerIndex = updatedAttemptData.answers.findIndex(
          (a) => a.questionId === questionId
        );
        if (answerIndex !== -1) {
          updatedAttemptData.answers[answerIndex].marksAwarded =
            evaluation.marks;
          setAttemptData(updatedAttemptData);
        }
      }
    } catch (error) {
      toast.error("Failed to save single question evaluation");
      console.error("Failed to save single question evaluation", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        attemptId,
        evaluations: evaluations.map((e) => ({
          questionId: e.questionId,
          isCorrect: e.isCorrect,
          marks: e.marks,
        })),
      };
      console.log("payload", payload);
      const response = await evaluateMocktest(payload);
      if (response.success) {
        console.log("Evaluation submitted successfully", response);
        navigate(`/admin/mock-test/user-attempts/${mockTestId}/${userId}`);
      }
    } catch (error) {
      console.error("Failed to submit evaluation", error);
    }
  };

  if (loading) return <div style={{ marginLeft: "60px" }}>Loading...</div>;
  if (!attemptData) return <div>Attempt not found</div>;

  const mcqAnswers = attemptData.answers.filter((a) => {
    const question = attemptData.mockTestId.questions.find(
      (q) => q._id === a.questionId
    );
    return question?.type === "mcq";
  });

  const subjectiveAnswers = attemptData.answers.filter((a) => {
    const question = attemptData.mockTestId.questions.find(
      (q) => q._id === a.questionId
    );
    return question?.type === "subjective";
  });

  return (
    <Container>
      <Title>User Result</Title>
      <UserInfo>
        <p>
          <strong>Username:</strong> {attemptData.userId.displayName}
        </p>
        <p>
          <strong>Total Marks:</strong> {attemptData.totalMarks}
        </p>
      </UserInfo>

     <SubTitle>MCQ Questions</SubTitle>
{mcqAnswers.map((a, index) => {
  // Find the full question object (prefer from attemptData.mockTestId, fallback to a.questionDetails)
  const question =
    attemptData.mockTestId.questions.find((q) => q._id === a.questionId) ||
    a.questionDetails;

  // Determine indexes
  const correctIndex =
    question?.questionDetails?.correctAnswer ?? question?.correctAnswer;
  const userIndex = a.answerIndex;

  // Compute global question number (based on original answers order)
  const questionNumber =
    attemptData.answers.findIndex((ans) => ans.questionId === a.questionId) + 1;

  const options =
    question?.questionDetails?.options || question?.options || [];

  return (
    <QuestionCard key={`mcq-${index}`}>
      {/* Question number and question text on the SAME line */}
      <QuestionLine>
        <QIndex>Question {questionNumber}.</QIndex>
        <span
          dangerouslySetInnerHTML={{ __html: question?.questionText || "" }}
        />
      </QuestionLine>

      <AnswerText>
        <strong>Options:</strong>
        {/* Numbered options without bullets; custom numbers 1 2 3 ... */}
        <OptionsList>
          {options.map((option, optIndex) => {
            const isCorrectOption = optIndex === correctIndex;
            const isUserChoice = userIndex === optIndex;
            const userChoseWrong = isUserChoice && !a.isCorrect;

            return (
              <OptionItem
                key={`opt-${index}-${optIndex}`}
                $bold={isCorrectOption || isUserChoice}
                $correct={isCorrectOption}
                $wrong={userChoseWrong}
              >
                <OptionNumber>{optIndex + 1}</OptionNumber>
                <span>
                  {option.text}
                  {isCorrectOption ? " (Correct)" : ""}
                  {isUserChoice ? " (Your choice)" : ""}
                </span>
              </OptionItem>
            );
          })}
        </OptionsList>
      </AnswerText>

      <AnswerText>
        <strong>Your Answer:</strong>{" "}
        {userIndex === null || userIndex === undefined
          ? "No answer selected"
          : options[userIndex]?.text}
      </AnswerText>

      <AnswerText>
        <strong>Marks:</strong> {a.marksAwarded}
      </AnswerText>
    </QuestionCard>
  );
})}

<SubTitle>Subjective Questions</SubTitle>
{subjectiveAnswers.map((a, index) => {
  const question = attemptData.mockTestId.questions.find(
    (q) => q._id === a.questionId
  );
  const evalItem = evaluations.find((e) => e.questionId === a.questionId);
  const maxMarks = question.marks;
  const currentMarks = evalItem?.marks ?? a.marksAwarded ?? 0;

  // Number based on original order
  const questionNumber =
    attemptData.answers.findIndex((ans) => ans.questionId === a.questionId) + 1;

  return (
    <QuestionCard key={`subj-${index}`}>
      {/* Question number and question text on the SAME line */}
      <QuestionLine>
        <QIndex>Question {questionNumber}.</QIndex>
        <span
          dangerouslySetInnerHTML={{ __html: question?.questionText || "" }}
        />
      </QuestionLine>

      <AnswerText>
        <strong>Your Answer:</strong>{" "}
        {a.answer ? (
          a.answer
        ) : (
          <span style={{ color: "red" }}>No answer provided</span>
        )}
      </AnswerText>

      <Label>Evaluate to:</Label>
      <input
        type="radio"
        name={`subj-${index}`}
        value="correct"
        checked={currentMarks === maxMarks}
        onChange={() => handleMarkChange(a.questionId, true, maxMarks)}
        disabled={evaluationStatus !== "submitted"}
      />{" "}
      Correct
      <input
        type="radio"
        name={`subj-${index}`}
        value="Incorrect"
        checked={currentMarks !== maxMarks}
        onChange={() => handleMarkChange(a.questionId, false, 0)}
        disabled={evaluationStatus !== "submitted"}
      />{" "}
      Incorrect

      <Label>Max Marks:</Label>
      <AnswerText>{maxMarks}</AnswerText>

      <Label>Marks:</Label>
      <MarkInput
        type="number"
        min="0"
        disabled={evaluationStatus !== "submitted"}
        max={maxMarks}
        value={currentMarks}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          if (value > maxMarks) return;
          handleMarkChange(a.questionId, value === maxMarks, value);
        }}
        placeholder={`0-${maxMarks}`}
      />
      {evaluationStatus === "submitted" && (
        <ButtonContainer>
          <SaveButton onClick={() => handleSaveSingleQuestion(a.questionId)}>
            Save Subjective Marks
          </SaveButton>
        </ButtonContainer>
      )}
    </QuestionCard>
  );
})}


      {evaluationStatus === "submitted" && (
        <SubmitButton onClick={handleSubmit}>
          Submit Final Evaluation
        </SubmitButton>
      )}
      <ToastContainer />
    </Container>
  );
};

export default MocktestStudentResult;
