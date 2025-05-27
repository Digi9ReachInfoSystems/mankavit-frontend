import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  // width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  font-size: 100px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatusText = styled.p`
  font-size: 24px;
  font-weight: 400;
  color: #0F0F0F;
  margin: 0;
  line-height: 2.4;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const TestTitle = styled.h2`
  font-size: 32px;
  font-weight: 400;
  color: #000000;
  margin: 8px 0 24px;
  line-height: 1.4;

  div {
    margin: 2px 0;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const GoToCourseButton = styled.button`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  font-size: 20px;
  font-weight: 600;
  color: #FFFFFF;
  padding: 12px 80px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(to right, #0072ff, #00c6ff);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 60px;
  }
`;
