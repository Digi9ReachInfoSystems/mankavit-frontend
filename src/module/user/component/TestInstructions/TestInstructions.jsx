import React, { useState } from "react";
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

const instructionsData = [
  {
    title: "Test Duration:",
    points: [
      "The total time allotted for this mock test is [X] minutes. Please manage your time accordingly."
    ]
  },
  {
    title: "Test Sections:",
    points: [
      "The test consists of [X] sections, each containing a specific number of questions. Each section will have different types of questions (e.g., MCQs, coding, or theory questions). Ensure you read the instructions at the beginning of each section."
    ]
  },
  {
    title: "Navigating Through Questions:",
    points: [
      'You can move between questions freely within the section. Use the "Next" button to proceed to the next question.',
      'If you wish to go back to a previous question, simply click on the question number or use the "Previous" button.'
    ]
  },
  {
    title: "Saving Your Progress:",
    points: [
      'Save and Next: Click on "Save and Next" to save your answer and move to the next question. This ensures your response is recorded',
      'Save for Later: If unsure about an answer, click "Save for Later". This will mark the question for review, and you can revisit it any time during the test',
      'Mark for Review: To revisit a question later, click "Mark for Review". This will allow you to revisit the question at the end of the test'
    ]
  }
];

const TestInstructions = () => {
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = () => setAccepted(!accepted);

  return (
    <Container>
      <Title>All the best !!</Title>

      <InstructionsContainer>

        <Instructions>
          <SectionTitle>General Instructions for Mock Test</SectionTitle>
          <List>
            {instructionsData.map((instruction, index) => (
              <ListItem key={index}>
                {instruction.title}
                <SubList>
                  {instruction.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </SubList>
              </ListItem>
            ))}
          </List>
        </Instructions>

      </InstructionsContainer>

      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          id="accept"
          checked={accepted}
          onChange={handleCheckboxChange}
        />
        <CheckboxLabel htmlFor="accept">
          I accept. By entering this exam, I agree to abide by all terms and conditions and ensure academic integrity.
        </CheckboxLabel>
      </CheckboxContainer>

      <ReadyBtn>
        <StartButton disabled={!accepted}>
          I am Ready to Begin
        </StartButton>
      </ReadyBtn>
    </Container>
  );
};

export default TestInstructions;
