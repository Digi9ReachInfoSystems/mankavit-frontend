import styled from 'styled-components';

export const ContactContainer = styled.div`
  margin: 0px auto;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ContactTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #171821;
  margin-top: 0;
  margin-bottom: 20px;

  @media (max-width: 1360px) {
    font-size: 24px;
  }
  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const TextArea = styled.textarea`
  width: 90%;
  height: 200px;
  padding: 15px;
  font-size: 18px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  ::placeholder {
    color: #c0c0c0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  width: 150px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
