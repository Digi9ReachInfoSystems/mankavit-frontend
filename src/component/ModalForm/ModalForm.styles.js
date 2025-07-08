import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(20px); /* 🔹 adds blur effect */
  background-color: rgba(0, 0, 0, 0.4); /* dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBox = styled.form`
  background-color: white;
  padding: 40px 30px;
  border-radius: 12px;
  width: 95%;
  max-width: 600px; /* 🔹 increased width */
  min-height: 400px; /* 🔹 increased height */
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`;

export const FieldGroup = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;
