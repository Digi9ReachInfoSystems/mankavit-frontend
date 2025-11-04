import styled from "styled-components";

export const Container = styled.div`
margin-left: 40px;
margin-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(2)};
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2a2a72;
  text-align: left;
  margin-bottom: 20px;
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 40px;
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;  /* stack on mobile */
    width: 100%;
  }
`;


export const QuestionCard = styled.div`
  background: #fafafa;
  border-left: 5px solid #2a2a72;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 12px;
 
`;

export const Section = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.div`
  font-weight: 600;
  color: #2a2a72;
  margin-bottom: 4px;
`;

// export const QuestionText = styled.div`
//   font-size: 1.2rem;
//   color: #050505ff;
// `;

export const AnswerText = styled.div`
  font-size: 1rem;
  color: #555;
  white-space: pre-wrap;
`;
export const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: #2a2a72;
  text-align: left;
  margin-bottom: 20px;
`;

export const MarkInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

export const SaveButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
export const QuestionHeader = styled.div`
  display: flex;
  // align-items: center;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const QuestionNumber = styled.h3`
  font-size: 1.2rem;
  color: #2a2a72;
  margin: 0;
  white-space: nowrap;
`;

export const QuestionText = styled.div`
  font-size: 1.2rem;
  color: #050505ff;
  flex: 1;
  margin-top: -3px;
`;
