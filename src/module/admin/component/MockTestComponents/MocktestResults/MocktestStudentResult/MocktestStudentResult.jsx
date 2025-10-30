import React, { useEffect, useState } from "react";
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
  SaveButton,
  ButtonContainer,
  QuestionHeader,
  QuestionNumber,
} from "./MocktestStudentResult.style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAttemptById,
  evaluateMocktest,
  evaluateSingleSubjectiveQuestion,
} from "../../../../../../api/mocktestApi";

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
        const response = await getAttemptById(attemptId);
        setUserId(response.data.userId._id);
        setMockTestId(response.data.mockTestId._id);
        setEvaluationStatus(response.data.status);

        if (response.success) {
          setAttemptData(response.data);

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
        toast.error("Error fetching attempt data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [attemptId]);
const formatTime = (timeSpentStr) => {
  if (!timeSpentStr) return "0 minutes and 0 seconds";

  const [minStr, secStr = "0"] = timeSpentStr.split('.');
  const minutes = parseInt(minStr, 10) || 0;
  const seconds = parseInt(secStr, 10) || 0;

  return `${minutes} minute${minutes !== 1 ? "s" : ""} and ${seconds} second${seconds !== 1 ? "s" : ""}`;
};

  const handleMarkChange = (questionId, isCorrect, value) => {
    const updated = evaluations.map((e) =>
      e.questionId === questionId
        ? { ...e, isCorrect, marks: parseInt(value) || 0 }
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
        toast.success("Saved subjective question evaluation");

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
      toast.error("Failed to save evaluation");
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

      const response = await evaluateMocktest(payload);
      if (response.success) {
        toast.success("Evaluation submitted successfully");
        navigate(`/admin/mock-test/user-attempts/${mockTestId}/${userId}`);
      }
    } catch (error) {
      toast.error("Failed to submit evaluation");
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
          <strong>Student Name:</strong>{" "}
          {attemptData?.userId?.displayName || "N/A"}
        </p>
        <p>
          <strong>Mock Test Name:</strong>{" "}
          {attemptData?.mockTestId?.title || "N/A"}
        </p>
        <p>
          <strong>Total Questions:</strong>{" "}
          {attemptData?.mockTestId?.questions?.length || 0}
        </p>
        <p>
          <strong>Attempted Questions:</strong>{" "}
          {attemptData?.answers?.filter((a) => a.status !== "not-answered")
            .length || 0}
        </p>
        <p>
          <strong>Correct Answers:</strong>{" "}
          {attemptData?.answers?.filter((a) => a.isCorrect).length || 0}
        </p>
        <p>
          <strong>Total Marks:</strong> {attemptData?.totalMarks ?? 0}
        </p>
          <p>
  <strong>Time Spent:</strong>{" "}
  {formatTime(attemptData?.timeSpent)}
</p>
      </UserInfo>

      <SubTitle>MCQ Questions</SubTitle>
      {mcqAnswers.map((a, index) => {
        const question = attemptData.mockTestId.questions.find(
          (q) => q._id === a.questionId
        );
        const options = question?.options || [];
        const selected = a.answerIndex;
        const correct = question?.correctAnswer;

        return (
          <QuestionCard key={`mcq-${index}`}>
            <QuestionHeader>
              <QuestionNumber>Question {index + 1}.</QuestionNumber>
              <QuestionText
                dangerouslySetInnerHTML={{ __html: question?.questionText }}
              />
            </QuestionHeader>

            <div style={{ marginTop: "10px" }}>
              {options.map((opt, idx) => {
                let color = "#333";
                if (idx === correct && idx === selected) color = "#34c759";
                else if (idx === selected && idx !== correct) color = "#ff3b30";
                else if (idx === correct && idx !== selected)
                  color = "#0a84ff";

                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color,
                      fontSize: "1rem",
                      marginBottom: "6px",
                    }}
                  >
                    <input type="radio" checked={selected === idx} readOnly />
                    <span
                      dangerouslySetInnerHTML={{ __html: opt.text || opt }}
                    />
                    {idx === correct && (
                      <span style={{ marginLeft: 6, color: color }}>
                        (Correct)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <AnswerText>
              <strong>Your Answer:</strong>{" "}
              {a.answer || <em>Not Answered</em>}
            </AnswerText>
            <AnswerText>
              <strong>Correct Answer:</strong>{" "}
              {options[correct]?.text || options[correct] || "N/A"}
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
        const currentMarks = evalItem?.marks || 0;

        return (
          <QuestionCard key={`subj-${index}`}>
            <QuestionHeader>
              <QuestionNumber>
                Question {mcqAnswers.length + index + 1}.
              </QuestionNumber>
              <QuestionText
                dangerouslySetInnerHTML={{ __html: question?.questionText }}
              />
            </QuestionHeader>

            <AnswerText>
              <strong>Your Answer:</strong>{" "}
              {a.answer || <em>Not Answered</em>}
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
              value="incorrect"
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
              max={maxMarks}
              value={currentMarks}
              disabled={evaluationStatus !== "submitted"}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                if (value > maxMarks) return;
                handleMarkChange(a.questionId, value === maxMarks, value);
              }}
              placeholder={`0-${maxMarks}`}
            />

            {evaluationStatus === "submitted" && (
              <ButtonContainer>
                <SaveButton
                  onClick={() => handleSaveSingleQuestion(a.questionId)}
                >
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
