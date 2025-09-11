import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const KYCContainer = styled.div`
//   background-color: #fff3f3;
//   border: 1px solid #f5c2c7;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  animation: ${fadeIn} 0.4s ease-in-out;
  max-width: 500px;
  margin: 40px auto;
`;

export const KYCMessage = styled.h2`
  color: #d32f2f;
  margin: 0 0 10px;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const KYCSubtext = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`;

export const UpdateButton = styled.button`
  background: linear-gradient(90deg, #ff4d4f, #d32f2f);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;

  &:hover {
    background: linear-gradient(90deg, #d32f2f, #b71c1c);
  }
`;
