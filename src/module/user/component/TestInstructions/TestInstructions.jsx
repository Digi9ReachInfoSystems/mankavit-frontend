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
  GradientBar, 
  IndicatorsSection,
  LegendContainer,
  LegendItem,
  LegendLabel,
  LegendRow
} from "./TestInstructions.styles";
import { useParams, useNavigate } from "react-router-dom";
import { getMocktestById, startMocktest } from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { FaClock, FaListOl, FaQuestionCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";
// import { FaClock as ClockIcon } from "react-icons/fa";
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
      navigate(`/test-question/${testId}/${subjectId}/${attempt._id}`,{
        state: { remainingTime: res.remainingTime } ,replace: true
      });
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

    {/* General Instructions */}
    <SectionTitle as="h4" style={{ marginTop: "1rem" }}>
      General Instructions
    </SectionTitle>
    <List>
      <ListItem>
        The clock is set on the server. A countdown timer at the top-left shows
        your remaining time. The exam auto-submits when time runs out — you do
        not need to submit manually.
      </ListItem>
    </List>

    {/* Navigating to a Question */}
    <SectionTitle as="h4" style={{ marginTop: "1.25rem" }}>
      Navigating to a Question
    </SectionTitle>
    <List>
      <ListItem>
        For multiple-choice questions:
        <SubList>
          <li>
            Click a question number in the right-side palette to jump directly
            to it. <strong>Note:</strong> using the palette <strong>does not</strong> save the
            current answer.
          </li>
          <li>
            Click <strong>Save &amp; Next</strong> to save your current answer and move to
            the next question in sequence.
          </li>
          <li>
            Choose an option and click <strong>Mark for Review &amp; Next</strong> to save
            your answer, flag the question for review, and go to the next one.
          </li>
        </SubList>
      </ListItem>
    </List>

    {/* Answering Questions */}
    <SectionTitle as="h4" style={{ marginTop: "1.25rem" }}>
      Answering Questions
    </SectionTitle>
    <List>
      <ListItem>
        For multiple-choice questions:
        <SubList>
          <li>Select an answer by clicking one of the option buttons.</li>
          <li>To change your answer, click another option.</li>
          <li>
            To <strong>save</strong> your answer, you <strong>MUST</strong> click{" "}
            <strong>Save &amp; Next</strong>.
          </li>
          <li>Click <strong>Clear Response</strong> to deselect your choice.</li>
          <li>
            Click <strong>Mark for Review &amp; Next</strong> to flag a question.
            If an answer is selected on a marked question, it <em>will</em> be
            counted in the final evaluation.
          </li>
        </SubList>
      </ListItem>

      <ListItem>
        To change an answer later: open that question, select the new option,
        then click <strong>Save &amp; Next</strong>.
      </ListItem>

      <ListItem>
        Only questions that are <strong>saved</strong> or <strong>marked for review after
        answering</strong> will be considered for evaluation.
      </ListItem>
    </List>

    {/* Keep your other sections unchanged */}
    {/* <RulesSection>
      <SectionTitle>
        <span>⚖️</span> Rules & Regulations
      </SectionTitle>
      <List>
        <ListItem>Do not refresh or close the browser during the test.</ListItem>
        <ListItem>All questions are mandatory unless specified otherwise.</ListItem>
        <ListItem>Use of external resources is strictly prohibited.</ListItem>
        <ListItem>You must complete the test in one sitting.</ListItem>
      </List>
    </RulesSection> */}

    <ImportantNote>
      <NoteIcon />
      <div>
        <strong>Important:</strong> Once started, you cannot pause the test. The
        timer continues even if you close the browser.
      </div>
    </ImportantNote>

    <TipsSection>
      <SectionTitle>
        <span>💡</span> Helpful Tips
      </SectionTitle>
      <List>
        <TipItem>Read each question carefully before answering.</TipItem>
        <TipItem>Manage your time; don’t spend too long on one question.</TipItem>
        <TipItem>For MCQs, eliminate obviously wrong options first.</TipItem>
        <TipItem>Review your answers if time permits.</TipItem>
      </List>
    </TipsSection>


          <IndicatorsSection>
        <SectionTitle>
          <span>🔵</span> Question Indicators
        </SectionTitle>
        <TipItem>Indicators indicate the status of your answers:</TipItem>
        <LegendContainer>
          <LegendRow>
            <LegendItem className="answered" />
            <LegendLabel>Answered</LegendLabel>
          </LegendRow>
          <LegendRow>
            <LegendItem className="not-answered" />
            <LegendLabel>Not Answered</LegendLabel>
          </LegendRow>
          <LegendRow>
            <LegendItem className="marked" />
            <LegendLabel>Marked</LegendLabel>
          </LegendRow>
          <LegendRow>
            <LegendItem className="answered-marked" />
            <LegendLabel>Answered & Marked For Review</LegendLabel>
          </LegendRow>
          {/* <LegendRow>
            <LegendItem className="not-answered-marked" />
            <LegendLabel>Not Answered & Marked</LegendLabel>
          </LegendRow> */}
          <LegendRow>
            <LegendItem className="unattempted" />
            <LegendLabel>Not Visited</LegendLabel>
          </LegendRow>
        </LegendContainer>
      </IndicatorsSection>
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