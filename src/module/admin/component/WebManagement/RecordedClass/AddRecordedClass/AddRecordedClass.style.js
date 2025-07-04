import styled, { css } from "styled-components";
import theme from "../../../../../../theme/Theme";
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
  box-sizing: border-box;
`;

export const UploadBox = styled.div`
  position: relative;
  border: 2px dashed ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(8)} ${theme.spacing(2)};
  text-align: center;
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

export const CourseCheckbox = styled.input`
  margin-right: ${theme.spacing(1)};
`;

export const CourseItem = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${theme.spacing(4)};
  padding-bottom: ${theme.spacing(2)};
  border-bottom: 1px solid ${theme.colors.grey};

`;

export const CourseLabel = styled.label`
  flex: 1;
  color: ${theme.colors.darkgray};
  font-family: ${theme.fonts.body};
`;

export const CourseList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`;  

export const CoursesContainer = styled.div`

  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(2)};
  background: ${theme.colors.secondary};

  @media (max-width: 768px) {
padding: ${(props) => `${props.theme.spacing(2)} ${props.theme.spacing(0)}`};
  }
`;  

export const CoursesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing(2)};
  width: 100%;
  padding: ${theme.spacing(2)};
  font-size: 16px;
  font-weight: 600;
  font-family: ${theme.fonts.heading};
  color: #6D6E75; 
  background:#F3F3F3;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${theme.spacing(2)};

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: 1320px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;