// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   InstructionsContainer,
//   Title,
//   Instructions,
//   SectionTitle,
//   List,
//   ListItem,
//   SubList,
//   CheckboxContainer,
//   Checkbox,
//   CheckboxLabel,
//   ReadyBtn,
//   StartButton
// } from "./TestInstructions.styles";
// import { useParams, useNavigate } from "react-router-dom";
// import { getMocktestById } from "../../../../api/mocktestApi";

// const TestInstructions = () => {
//   const [accepted, setAccepted] = useState(false);
//   const [mockTest, setMockTest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMockTest = async () => {
//       try {
//         const response = await getMocktestById(id);
//         if (response?.success) {
//           setMockTest(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching mock test:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMockTest();
//   }, [id]);

//   const handleCheckboxChange = () => setAccepted(!accepted);

//   const getQuestionTypes = () => {
//     if (!mockTest?.questions) return [];
    
//     const types = new Set();
//     mockTest.questions.forEach(question => {
//       types.add(question.type === "mcq" ? "Multiple Choice Questions (MCQs)" : "Subjective Questions");
//     });
//     return Array.from(types);
//   };

//   const getDynamicInstructions = () => {
//     const questionTypes = getQuestionTypes();
    
//     return [
//       {
//         title: "Test Duration:",
//         points: [
//           `The total time allotted for this mock test is ${mockTest?.duration || '--'} minutes. Please manage your time accordingly.`
//         ]
//       },
//       {
//         title: "Test Sections:",
//         points: [
//           `The test consists of ${mockTest?.questions?.length || '--'} questions with ${questionTypes.length} types: ${questionTypes.join(", ")}. Ensure you read the instructions carefully before attempting each question.`
//         ]
//       },
//       {
//         title: "Navigating Through Questions:",
//         points: [
//           'You can move between questions freely within the test. Use the "Next" button to proceed to the next question.',
//           'If you wish to go back to a previous question, simply click on the question number or use the "Previous" button.'
//         ]
//       },
//       {
//         title: "Saving Your Progress:",
//         points: [
//           'Save and Next: Click on "Save and Next" to save your answer and move to the next question. This ensures your response is recorded',
//           'Save for Later: If unsure about an answer, click "Save for Later". This will mark the question for review, and you can revisit it any time during the test',
//           'Mark for Review: To revisit a question later, click "Mark for Review". This will allow you to revisit the question at the end of the test'
//         ]
//       }
//     ];
//   };

//   if (loading) {
//     return (
//       <Container>
//         <Title>Loading instructions...</Title>
//       </Container>
//     );
//   }

//   if (!mockTest) {
//     return (
//       <Container>
//         <Title>Test not found</Title>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Title>All the best !!</Title>

//       <InstructionsContainer>
//         <Instructions>
//           <SectionTitle>General Instructions for Mock Test</SectionTitle>
//           <List>
//             {getDynamicInstructions().map((instruction, index) => (
//               <ListItem key={index}>
//                 {instruction.title}
//                 <SubList>
//                   {instruction.points.map((point, idx) => (
//                     <li key={idx}>{point}</li>
//                   ))}
//                 </SubList>
//               </ListItem>
//             ))}
//           </List>
//         </Instructions>
//       </InstructionsContainer>

//       <CheckboxContainer>
//         <Checkbox
//           type="checkbox"
//           id="accept"
//           checked={accepted}
//           onChange={handleCheckboxChange}
//         />
//         <CheckboxLabel htmlFor="accept">
//           I accept. By entering this exam, I agree to abide by all terms and conditions and ensure academic integrity.
//         </CheckboxLabel>
//       </CheckboxContainer>

//       <ReadyBtn>
//         <StartButton 
//           disabled={!accepted} 
//           onClick={() => navigate(`/test-question/${id}`)}
//         >
//           I am Ready to Begin
//         </StartButton>
//       </ReadyBtn>
//     </Container>
//   );
// };

// export default TestInstructions;
// // TestInstructions.js
// import React, { useState, useEffect } from "react";
// import {
//   Container, InstructionsContainer, Title, Instructions,
//   SectionTitle, List, ListItem, SubList,
//   CheckboxContainer, Checkbox, CheckboxLabel,
//   ReadyBtn, StartButton
// } from "./TestInstructions.styles";
// import { useParams, useNavigate } from "react-router-dom";
// import { getMocktestById } from "../../../../api/mocktestApi";

// const TestInstructions = () => {
//   const { testId, subjectId } = useParams();
//   const navigate = useNavigate();
//   const [accepted, setAccepted] = useState(false);
//   const [mockTest, setMockTest] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMockTest = async () => {
//       try {
//         const response = await getMocktestById(testId);
//         if (response?.success) {
//           setMockTest(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching mock test:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMockTest();
//   }, [testId]);

//   const handleCheckboxChange = () => setAccepted(!accepted);

//   const getQuestionTypes = () => {
//     if (!mockTest?.questions) return [];
    
//     const types = new Set();
//     mockTest.questions.forEach(question => {
//       types.add(question.type === "mcq" ? "Multiple Choice Questions (MCQs)" : "Subjective Questions");
//     });
//     return Array.from(types);
//   };

//   const getDynamicInstructions = () => {
//     const questionTypes = getQuestionTypes();
    
//     return [
//       {
//         title: "Test Duration:",
//         points: [
//           `The total time allotted for this mock test is ${mockTest?.duration || '--'} minutes. Please manage your time accordingly.`
//         ]
//       },
//       {
//         title: "Test Sections:",
//         points: [
//           `The test consists of ${mockTest?.questions?.length || '--'} questions with ${questionTypes.length} types: ${questionTypes.join(", ")}. Ensure you read the instructions carefully before attempting each question.`
//         ]
//       },
//       {
//         title: "Navigating Through Questions:",
//         points: [
//           'You can move between questions freely within the test. Use the "Next" button to proceed to the next question.',
//           'If you wish to go back to a previous question, simply click on the question number or use the "Previous" button.'
//         ]
//       }
//     ];
//   };

//   if (loading) {
//     return (
//       <Container>
//         <Title>Loading instructions...</Title>
//       </Container>
//     );
//   }

//   if (!mockTest) {
//     return (
//       <Container>
//         <Title>Test not found</Title>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Title>All the best !!</Title>

//       <InstructionsContainer>
//         <Instructions>
//           <SectionTitle>General Instructions for Mock Test</SectionTitle>
//           <List>
//             {getDynamicInstructions().map((instruction, index) => (
//               <ListItem key={index}>
//                 {instruction.title}
//                 <SubList>
//                   {instruction.points.map((point, idx) => (
//                     <li key={idx}>{point}</li>
//                   ))}
//                 </SubList>
//               </ListItem>
//             ))}
//           </List>
//         </Instructions>
//       </InstructionsContainer>

//       <CheckboxContainer>
//         <Checkbox
//           type="checkbox"
//           id="accept"
//           checked={accepted}
//           onChange={handleCheckboxChange}
//         />
//         <CheckboxLabel htmlFor="accept">
//           I accept. By entering this exam, I agree to abide by all terms and conditions and ensure academic integrity.
//         </CheckboxLabel>
//       </CheckboxContainer>

//       <ReadyBtn>
//         <StartButton 
//           disabled={!accepted} 
//           onClick={() => navigate(`/test-question/${testId}/${subjectId}`)}
//         >
//           I am Ready to Begin
//         </StartButton>
//       </ReadyBtn>
//     </Container>
//   );
// };

// export default TestInstructions;
// src/module/user/component/TestInstructions/TestInstructions.jsx
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
  TipItem
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
        <TestDetails>
          <DetailItem>
            <IconWrapper>
              <TimeIcon><FaClock /></TimeIcon>
            </IconWrapper>
            <div >
              <h4>Duration</h4>
              <h5>{mockTest.duration} minutes</h5>
            </div>
          </DetailItem>
          
          <DetailItem>
            <IconWrapper>
              <QuestionIcon><FaListOl /></QuestionIcon>
            </IconWrapper>
            <div>
              <h4>Total Questions</h4>
              <p>{mockTest.questions.length}</p>
            </div>
          </DetailItem>
          
          <DetailItem>
            <IconWrapper>
              <TypeIcon><FaQuestionCircle /></TypeIcon>
            </IconWrapper>
            <div>
              <h4>Question Types</h4>
              <p>
                {mcqCount > 0 && `${mcqCount} MCQs`}
                {mcqCount > 0 && subjectiveCount > 0 && ", "}
                {subjectiveCount > 0 && `${subjectiveCount} Subjective`}
              </p>
            </div>
          </DetailItem>
        </TestDetails>
      </TestCard>

      <InstructionsContainer>
        <Instructions>
          <SectionTitle>Test Guidelines</SectionTitle>
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
            <SectionTitle>Rules & Regulations</SectionTitle>
            <List>
              <ListItem>Do not refresh or close the browser during the test.</ListItem>
              <ListItem>All questions are mandatory unless specified otherwise.</ListItem>
              <ListItem>Use of external resources is strictly prohibited.</ListItem>
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
            <SectionTitle><FaLightbulb /> Helpful Tips</SectionTitle>
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