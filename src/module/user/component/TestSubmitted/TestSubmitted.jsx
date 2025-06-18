import React from "react";
import {
  Wrapper,
  SuccessIcon,
  StatusText,
  TestTitle,
  ButtonWrapper,
  GoToCourseButton
} from "./TestSubmitted.styles";
import { FcOk } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// Sample data to map
const testDetails = [
  { id: 1, label: "Law Fundamentals" },
  { id: 2, label: "Mock Test 1" }
];

const TestSubmitted = () => {
  const navigate =useNavigate();
  return (
    <Wrapper>
      <SuccessIcon>
        <FcOk />
      </SuccessIcon>
      <StatusText>Submitted Successfully</StatusText>

      <TestTitle>
        {testDetails.map(({ id, label }) => (
          <div key={id}>{label}</div>
        ))}
      </TestTitle>

      <ButtonWrapper>
        <GoToCourseButton onClick={() => { navigate("/user")}}>Go to Course</GoToCourseButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default TestSubmitted;
