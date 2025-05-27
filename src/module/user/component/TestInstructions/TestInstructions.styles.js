import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;

  @media (max-width: 1360px) {
    margin: 0px auto;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
      width: 90%;
  }
`;

export const InstructionsContainer = styled.div`
  margin-bottom: 40px;
  width: 90%;

  @media (max-width: 768px) {
      width: 100%;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  font-weight: 400;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;

  @media (max-width: 1360px) {
    font-size: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

export const Instructions = styled.div`
  font-size: 16px;
  line-height: 1.6;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;

export const List = styled.ol`
font-size: 20px;
font-weight: 400;
  margin-left: 20px;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-left: 0px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 0px;
`;

export const SubList = styled.ul`
//   margin-top: 6px;
  margin-left: 0px;
  list-style-type: disc;

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
  margin-top: 3px;

  @media (max-width: 480px) {
    margin-top: -5px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  font-weight: 400;
  color: #0D0D0D;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ReadyBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;


export const StartButton = styled.button`
  margin-top: 25px;
  width: 30%;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  color: white;
  padding: 20px 14px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #0072ff, #00c6ff);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 16px;
  }
`;
