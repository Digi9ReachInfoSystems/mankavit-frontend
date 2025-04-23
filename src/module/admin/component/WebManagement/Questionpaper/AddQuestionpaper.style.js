import styled, { css } from "styled-components";
import theme from "../../../../../theme/Theme";

export const Container = styled.div`
margin-left: 40px;
margin-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  min-height: 750px;

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

export const FormItem = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
gap: 20px;
width: 100%;

@media (max-width: 576px) {
  grid-template-columns: 1fr;
  gap: 0
}
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
  width: 100%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
  box-sizing: border-box;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  background: ${theme.colors.secondary};
  resize: none;
    font-size: 0.9rem;
  box-sizing: border-box;

`;

export const UploadBox = styled.div`
  // position: relative;
  border: 2px dashed ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(4)};
width: 40%;
cursor: pointer;
  background: ${theme.colors.secondary};
  transition: background 0.2s;

  @media (max-width:1024px) {
    width: 100%;
    box-sizing: border-box;
  }

  ${(p) =>
    p.dragOver &&
    css`
      background: ${theme.colors.lightwhite};
      border-color: ${theme.colors.primary};
    `}
`;

export const UploadInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
    display: flex;
  justify-content: center;
  align-items: center;

`;

export const UploadContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const UploadIcon = styled.div`
  margin-bottom: ${theme.spacing(2)};
  text-align: center;
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
  text-align: center;
`;

export const UploadButton = styled.div`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.body};
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
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
  width: 20%; 

    @media (max-width: 1320px) {
    width: 40%;
  }

  @media (max-width: 990px) {
    width: 100%;
    margin:0  auto ;
  }

  &:hover {
    background: ${theme.colors.vividblue};
  }
`;
