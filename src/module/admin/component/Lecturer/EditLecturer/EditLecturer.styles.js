// AddCourseStyles.js
import styled from "styled-components";

/** Overall container for the form */
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

/** Title at the top of the form */
export const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  margin-top: 0;
  color: ${(props) => props.theme.colors.primary};
`;

/** The overall form element */
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

/** A row that divides into two columns (on desktop) */
export const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  align-items: flex-start;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

/** Each column in a row */
export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};

  .toggle-column{
  display: flex;
  flex-direction: space-between;
  align-items: center;
  justify-content: space-between;
  }

  @media (max-width: 990px) {
  width: 100%;
}
`;

/** Wrapper for a single field */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
    gap: ${(props) => props.theme.spacing(2)};

  @media (max-width: 990px) {
  .toggle-wrapper{
    display: flex;
    flex-direction: row;
  }
  }
`;

/** Labels for inputs */
export const Label = styled.label`
  font-weight: normal;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.black};
  font-size: 0.9rem;

`;

/** Standard text input styling */
export const Input = styled.input`
  padding: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.test};
  font-family: ${(props) => props.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

/** Textarea styling */
export const TextArea = styled.textarea`
  padding: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  resize: vertical;
  font-family: ${(props) => props.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

/** Price input with smaller max-width */
export const PriceInput = styled(Input)`
  max-width: 250px;

  @media(max-width: 990px){
    max-width: 100%;
  }
`;

/** Wrapper for sets of checkboxes with a title */
export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(1)};
  width: 50%;
@media (max-width: 768px){
  width: 100%;}
  @media (max-width: 576px)
  {
  width: 100%;
  }
`;

/** Title for each checkbox section (e.g. "Add Notes" and "Add Mock Test") */
export const CheckboxSectionTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  margin: 0 0 ${(props) => props.theme.spacing(1)} 0;
     color: ${(props) => props.theme.colors.backgrounGrey};
  background-color: ${(props) => props.theme.colors.dimGray};

  padding: ${(props) => props.theme.spacing(1)};
 
  border-radius: 6px;
`;

/** The container that holds multiple checkbox rows */
export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-y: auto;
  // max-height: 80px;
`;

/** A single checkbox + label line */
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
`;

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.black};
`;

/** The upload area for the thumbnail, styled as a drop zone */
export const UploadArea = styled.div`
  border: 2px dashed ${(props) => props.theme.colors.grey};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(8)};
  text-align: center;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  // margin-left: 60px;

  p {
    margin: ${(props) => props.theme.spacing(1)} 0 0 0;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }

  @media (max-width: 1024px) {
    width: 70%;
    margin-left: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
  }

  .preview{
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
`;

/** Hidden file input to trigger on area click */
export const FileInput = styled.input`
  display: none;
`;

/** A placeholder for an upload icon or text inside the drop zone */
export const UploadPlaceholder = styled.div`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  
`;

/** The big action button at the bottom ("Add Course") */
export const SubmitButton = styled.button`
  width: 20%;
  background:linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.body};
  transition: background-color 0.2s ease;
  margin-top: ${(props) => props.theme.spacing(2)}; 

  @media (max-width: 1320px) {
    width: 40%;
  }

  @media (max-width: 990px) {
    width: 85%;
    margin: 0 auto;
  }
`;

// Toggle Switch styled component
export const ToggleSwitch = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 50px;
  height: 25px;
  background-color: ${props => (props.checked ? props.theme.colors.emaraldgreen : '#ccc')};
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
 

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.3s;
    transform: ${props => (props.checked ? "translateX(25px)" : "translateX(0)")};
  }

  &:focus {
    outline: none;
  }

  // &:hover {
  //   background-color: ${props => (props.checked ? "#ccc" : "#ddd")};
  // }

`;



export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

export const VideoPlayer = styled.video`
  max-width: 100%;
  height: 500px;
//   border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

export const ThumbnailContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
//   border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ThumbnailPreview = styled.div`
  width: 100%;
  // height: 500px;
//   border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const VideoControl = styled.video`
  width: 100%;
  height: 500px;
`;



export const SubjectsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SelectedSubjectsContainer = styled.div`
  flex: 1;
  // border: 1px solid #ddd;
  // border-radius: 8px;
  padding: 0.5rem;
  background: #f9f9f9;
`;

export const SelectedSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const SubjectName = styled.span`
  font-size: 0.9rem;
`;

export const MoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.3rem;
  margin-left: 0.5rem;
   border-radius: 4px;
 
   &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.lightwhite};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
