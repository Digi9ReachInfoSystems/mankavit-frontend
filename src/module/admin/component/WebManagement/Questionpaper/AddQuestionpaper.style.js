import styled, { css } from "styled-components";
import theme from "../../../../../theme/Theme";

export const Container = styled.div`
margin-left: 40px;
margin-top: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};

  h2{
  font-size: 1.2rem;}

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing(2)};
  }

  @media (max-width: 768px) {
    margin:0;
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
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
  font-family: ${theme.fonts.body};
`;

export const Select = styled.select`
  width: 10%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
`;

export const TextInput = styled.input`
  width: 80%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
`;

export const TextArea = styled.textarea`
  width: 80%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
  resize: vertical;
    font-size: 0.9rem;
`;

export const UploadBox = styled.div`
  position: relative;
  border: 2px dashed ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(4)};
//   text-align: center;
width: 40%;
  cursor: pointer;
  background: ${theme.colors.secondary};
  transition: background 0.2s;

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
  align-self: flex-start;

  &:hover {
    background: ${theme.colors.vividblue};
  }
`;
