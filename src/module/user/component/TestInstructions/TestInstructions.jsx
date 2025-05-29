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
  StartButton
} from "./TestInstructions.styles";
import { useParams, useNavigate } from "react-router-dom";
import { getMocktestById, startMocktest } from "../../../../api/mocktestApi";
import { getCookiesData } from "../../../../utils/cookiesService";

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
      // here res.data is your attempt object
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

  return (
    <Container>
      <Title>All the best!!</Title>
      <InstructionsContainer>
        <Instructions>
          <SectionTitle>General Instructions</SectionTitle>
          <List>
            <ListItem>
              Test Duration:
              <SubList><li>{mockTest.duration} minutes</li></SubList>
            </ListItem>
            <ListItem>
              Sections & Types:
              <SubList>
                <li>Total questions: {mockTest.questions.length}</li>
                <li>Types: {questionTypes.join(", ")}</li>
              </SubList>
            </ListItem>
          </List>
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
          I accept the terms and conditions.
        </CheckboxLabel>
      </CheckboxContainer>
      <ReadyBtn>
        <StartButton disabled={!accepted} onClick={handleStart}>
          I am Ready to Begin
        </StartButton>
      </ReadyBtn>
    </Container>
  );
}
