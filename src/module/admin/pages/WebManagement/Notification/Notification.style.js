import styled, { css } from "styled-components";
import theme from "../../../../../theme/Theme";

export const Container = styled.div`
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 40px;
border-radius: 8px;
justify-content: center;
// align-items: center;
  width: 95%;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  h2{
  font-size: 1.2rem;}

    @media (max-width: 990px) {
  width: 90%;
}

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing(3)};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing(1)};
  color: ${theme.colors.darkgray};
  font-family: ${theme.fonts.body};
  font-size: 0.9rem;
`;

// read-only display of schedule
export const ReadOnlyInput = styled.input`
  width: 20%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
//   background: ${theme.colors.lightwhite};
  color: ${theme.colors.darkgray};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
`;

// standard text input
export const TextInput = styled.input`
  width: 50%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.secondary};
  font-family: ${theme.fonts.body};
  font-size: 1rem;

  &::placeholder {
    color: ${theme.colors.lightgray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 50%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.secondary};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  resize: vertical;

  &::placeholder {
    color: ${theme.colors.lightgray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  }
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

  ${(p) => p.dragOver && css`
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
  padding: ${theme.spacing(2)} ${theme.spacing(4)};
  background: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: none;
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.vividblue};
  }

  &:disabled {
    background: ${theme.colors.grey};
    cursor: not-allowed;
  }
`;
