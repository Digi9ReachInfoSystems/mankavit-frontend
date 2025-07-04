import React, { useState, useEffect } from "react";
import {
  Container,
  InstructionsContainer,
  Title,
  Instructions,
  SectionTitle,
  List,
  ListItem,
  SubList,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  ReadyBtn,
  StartButton,
  TestCard,
  TestDetails,
  DetailItem,
  IconWrapper,
  TimeIcon,
  QuestionIcon,
  TypeIcon,
  RulesSection,
  ImportantNote,
  NoteIcon,
  TipsSection,
  TipItem,
  DetailGrid,
  DetailContent,
  DetailTitle,
  DetailValue,
  CardHeader,
  CardBody,
  GradientBar
} from "./TestInstructions.styles";
import { useParams, useNavigate } from "react-router-dom";
import { getMocktestById, startMocktest } from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { FaClock, FaListOl, FaQuestionCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";

export default function TestInstructions() {
  const { testId, subjectId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [accepted, setAccepted] = useState(false);
  const [mockTest, setMockTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMocktestById(testId);
        if (res.success) setMockTest(res.data);
      } catch (err) {
        console.error("Error loading test:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId]);

  const handleStart = async () => {
    try {
      const payload = { mockTestId: testId, subject: subjectId, user_id: userId };
      const res = await startMocktest(payload);
      if (!res.success) {
        throw new Error(res.message || "Could not start test");
      }
      const attempt = res.data;
      navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`);
    } catch (err) {
      console.error("startMocktest failed", err);
      alert("Failed to start test: " + err.message);
    }
  };

  if (loading) return <Container><Title>Loading instructions…</Title></Container>;
  if (!mockTest) return <Container><Title>Test not found</Title></Container>;

  const questionTypes = Array.from(
    new Set(mockTest.questions.map(q => q.type === "mcq" ? "MCQs" : "Subjective"))
  );

  // Calculate question type counts
  const mcqCount = mockTest.questions.filter(q => q.type === "mcq").length;
  const subjectiveCount = mockTest.questions.filter(q => q.type === "subjective").length;

  return (
    <Container>
      <Title>Mock Test Instructions</Title>
      
      <TestCard>
        <CardHeader>
          <h3>Test Overview</h3>
          <GradientBar />
        </CardHeader>
        <CardBody>
          <TestDetails>
            <DetailGrid>
              <DetailItem>
                <IconWrapper>
                  <TimeIcon><FaClock /></TimeIcon>
                </IconWrapper>
                <DetailContent>
                  <DetailTitle>Duration</DetailTitle>
                  <DetailValue>{mockTest.duration} minutes</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <IconWrapper>
                  <QuestionIcon><FaListOl /></QuestionIcon>
                </IconWrapper>
                <DetailContent>
                  <DetailTitle>Total Questions</DetailTitle>
                  <DetailValue>{mockTest.questions.length}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <IconWrapper>
                  <TypeIcon><FaQuestionCircle /></TypeIcon>
                </IconWrapper>
                <DetailContent>
                  <DetailTitle>Question Types</DetailTitle>
                  <DetailValue>
                    {mcqCount > 0 && `${mcqCount} MCQs`}
                    {mcqCount > 0 && subjectiveCount > 0 && ", "}
                    {subjectiveCount > 0 && `${subjectiveCount} Subjective`}
                  </DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailGrid>
          </TestDetails>
        </CardBody>
      </TestCard>

      <InstructionsContainer>
        <Instructions>
          <SectionTitle>
            <span>📝</span> Test Guidelines
          </SectionTitle>
          <List>
            <ListItem>
              <strong>Navigation:</strong> Use the navigation buttons to move between questions.
            </ListItem>
            <ListItem>
              <strong>Time Management:</strong> The timer will be visible throughout the test.
            </ListItem>
            <ListItem>
              <strong>Submission:</strong> All answers are auto-saved. Submit when finished.
            </ListItem>
          </List>

          <RulesSection>
            <SectionTitle>
              <span>⚖️</span> Rules & Regulations
            </SectionTitle>
            <List>
              <ListItem>Do not refresh or close the browser during the test.</ListItem>
              <ListItem>All questions are mandatory unless specified otherwise.</ListItem>
              <ListItem>Use of external resources is strictly prohibited.</ListItem>
              <ListItem>You must complete the test in one sitting.</ListItem>
            </List>
          </RulesSection>

          <ImportantNote>
            <NoteIcon><FaExclamationTriangle /></NoteIcon>
            <div>
              <strong>Important:</strong> Once started, you cannot pause the test. 
              The timer will continue running even if you close the browser.
            </div>
          </ImportantNote>

          <TipsSection>
            <SectionTitle>
              <span>💡</span> Helpful Tips
            </SectionTitle>
            <List>
              <TipItem>Read each question carefully before answering.</TipItem>
              <TipItem>Manage your time wisely - don't spend too long on one question.</TipItem>
              <TipItem>For MCQs, eliminate obviously wrong options first.</TipItem>
              <TipItem>Review your answers if time permits.</TipItem>
            </List>
          </TipsSection>
        </Instructions>
      </InstructionsContainer>

      <CheckboxContainer>
        <Checkbox
          id="accept"
          type="checkbox"
          checked={accepted}
          onChange={() => setAccepted(a => !a)}
        />
        <CheckboxLabel htmlFor="accept">
          I have read and understood all the instructions. I agree to abide by the test rules.
        </CheckboxLabel>
      </CheckboxContainer>

      <ReadyBtn>
        <StartButton disabled={!accepted} onClick={handleStart}>
          Start Test Now
        </StartButton>
      </ReadyBtn>
    </Container>
  );
}