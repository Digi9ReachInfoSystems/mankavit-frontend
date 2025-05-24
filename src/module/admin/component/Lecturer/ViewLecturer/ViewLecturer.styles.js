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
  font-size: 1.7rem;
  margin-bottom: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(3)};
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
  font-size: 1.2rem;

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
`;

/** Title for each checkbox section (e.g. "Add Notes" and "Add Mock Test") */
export const CheckboxSectionTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  margin: 0 0 ${(props) => props.theme.spacing(1)} 0;
  color: ${(props) => props.theme.colors.test};
  padding: ${(props) => props.theme.spacing(1)};
  //done
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  border-radius: 6px;
`;

/** The container that holds multiple checkbox rows */
export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-y: auto;
  max-height: 80px;
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
  width: 30%;
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


export const Field = styled.p`
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(1.5)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  margin: 10px 0;
  font-size: 1rem;
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const VideoPlayer = styled.video`
  max-width: 100%;
  height: auto;
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
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 4px;
`;