import styled from "styled-components";
import theme from "../../theme/Theme";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f5ff;
`;

export const Form = styled.form`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.heading};
  margin-bottom: 20px;
  text-align: center;
`;

export const Label = styled.label`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  font-size: 1rem;
`;

export const Button = styled.button`
  margin-top: 30px;
  padding: 12px;
  background: linear-gradient(90deg, #0DCAF0 0%, #007BFF 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
  margin-bottom: -10px;
  font-size: 14px;
  text-align: center;
`;
