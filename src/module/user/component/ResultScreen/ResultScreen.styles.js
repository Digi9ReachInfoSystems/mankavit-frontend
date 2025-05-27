import styled from "styled-components";

export const CardContainer = styled.div`
  max-width: 380px;
  margin: 100px auto;
  background-color: #F1F4FF;
  border-radius: 8px;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 480px) {
      margin: 20px;
      max-width: 900px;
  }
`;

export const ResultsContainer = styled.div`
  text-align: center;
  margin-top: 20px;
    padding: 20px 25px;
`;

export const Greeting = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
  margin-top: 0;
`;

export const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 24px;
`;

export const ScoreTable = styled.div`
  text-align: left;
//   margin: 30px;
  margin: 40px 0;

  @media (max-width: 480px) {
    margin: 20px;
  }
`;

export const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const Label = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #000000;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Value = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #000000;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 14px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  background: ${({ primary }) =>
        primary ? "linear-gradient(to right, #00c6ff, #0072ff)" : "linear-gradient(to right, #00c6ff, #0072ff)"};
  transition: background 0.3s ease;

  &:hover {
    background: ${({ primary }) =>
        primary ? "linear-gradient(to right, #0DCAF0, #007BFF)" : "linear-gradient(to right, #00c6ff, #0072ff)"};
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;
