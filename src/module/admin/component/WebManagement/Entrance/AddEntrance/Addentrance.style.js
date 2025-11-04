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

    @media (max-width: 768px) {
      font-size: 20px;
    }
      @media (max-width: 576px) {
      font-size: 18px;
    }
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
`;

export const TextInput = styled.input`
  width: 50%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.secondary};
  font-family: ${theme.fonts.body};

  @media (max-width: 540px) {
    width: 100%;
  }
`;

export const TextArea = styled.textarea`
  width: 50%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.secondary};
  font-family: ${theme.fonts.body};
  resize: vertical;

  @media (max-width: 540px) {
    width: 100%;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${theme.spacing(3)};
  margin-bottom: ${theme.spacing(3)};
  flex-wrap: wrap;
`;

export const FormColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const UploadBox = styled.div`
  position: relative;
  border: 2px dashed ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(4)};
  text-align: center;
  cursor: pointer;
  background: ${theme.colors.secondary};

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
  svg { width: 40px; height: 40px; fill: ${theme.colors.primary}; }
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

export const CoursesContainer = styled.div`
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.secondary};
`;

export const CoursesHeader = styled.div`
  padding: ${theme.spacing(2)};
  background: ${theme.colors.backgrounGrey};
  color: ${theme.colors.test};
  font-family: ${theme.fonts.body};
  font-weight: 600;
`;

export const CourseList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
`;

export const CourseItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(2)};
  border-bottom: 1px solid ${theme.colors.grey};
`;

export const CourseLabel = styled.span`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.body};
`;

export const CourseCheckbox = styled.input`
  transform: scale(1.2);
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: ${theme.spacing(2)} ${theme.spacing(4)};
  background: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: none;
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  margin-top: ${theme.spacing(2)};

  &:hover {
    background: ${theme.colors.vividblue};
  }
`;

export const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: ${theme.spacing(1)};
`;


export const EditorWrapper = styled.div`
  .jodit-container {
    border-radius: 4px;
    border: 1px solid #ccc;
    
    &:focus-within {
      border-color: #2684ff;
      box-shadow: 0 0 0 1px #2684ff;
    }
  }
  
  .jodit-toolbar__box {
    border-radius: 4px 4px 0 0;
  }
  
  .jodit-workplace {
    min-height: 200px;
  }
`;