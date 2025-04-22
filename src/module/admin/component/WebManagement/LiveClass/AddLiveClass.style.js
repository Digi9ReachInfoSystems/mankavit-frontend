import styled, { css } from "styled-components";
import theme from "../../../../../theme/Theme";

export const Container = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
margin-left: 40px;
margin-top: 20px;
  padding: ${theme.spacing(4)};
  background: ${theme.colors.secondary};
  border-radius: ${theme.spacing(1)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    margin-bottom: ${theme.spacing(3)};
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.black};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing(3)};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing(1)};
  color: ${theme.colors.darkgray};
  font-family: ${theme.fonts.body};
`;

export const DateTimeInput = styled.input`
  width: 20%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
`;

export const TextInput = styled.input`
  width: 50%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
`;

export const TextArea = styled.textarea`
  width: 50%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
  resize: vertical;
`;

export const UploadBox = styled.div`
  position: relative;
  border: 2px dashed ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(4)};
  text-align: center;
  cursor: pointer;
  background: ${theme.colors.secondary};
  transition: background 0.2s;
  width: 20%;

  ${(p) =>
    p.dragOver &&
    css`
      background: ${theme.colors.lightwhite};
      border-color: ${theme.colors.primary};
    `}
`;

export const UploadInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const UploadContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const UploadIcon = styled.div`
  margin-bottom: ${theme.spacing(2)};
  svg {
    width: 40px;
    height: 40px;
    fill: ${theme.colors.primary};
  }
`;

export const UploadText = styled.div`
  margin-bottom: ${theme.spacing(2)};
  color: ${theme.colors.darkgray};
  font-family: ${theme.fonts.body};
`;

export const UploadButton = styled.div`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.body};
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  margin-top: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  background: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: none;
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  width: 20%;

  &:hover {
    background: ${theme.colors.vividblue};
  }
`;
