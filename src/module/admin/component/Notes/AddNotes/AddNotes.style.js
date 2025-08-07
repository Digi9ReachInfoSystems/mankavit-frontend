// AddNote.style.js
import styled from "styled-components";

// Container for the form
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
    margin: 0;
  }
`;

// Title of the form
export const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(3)};
 color: ${(props) => props.theme.colors.primary};
`;

// The form itself
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

// Rows for layout
export const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  align-items: flex-start;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

// Columns inside the row
export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};

  @media (max-width: 990px) {
    width: 100%;
  }
`;

// Label for inputs
export const Label = styled.label`
  font-weight: normal;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.black};
  font-size: 1.3rem;
`;

// Input fields
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

// Textarea fields
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

// File upload area
export const UploadArea = styled.div`
  border: 2px dashed ${(props) => props.theme.colors.grey};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;
  width: 80%;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 768px) {
    width: 80%;
    box-sizing: border-box;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Hidden file input
export const FileInput = styled.input`
  display: none;
`;

// Placeholder text for file upload area
export const UploadPlaceholder = styled.div`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
`;

// Section for checkboxes
export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(1)};
  //  width: 50%;
`;

export const CheckboxSectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: ${(props) => props.theme.spacing(1)};
     color: ${(props) => props.theme.colors.backgrounGrey};
  background-color: ${(props) => props.theme.colors.dimGray};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: 4px;
`;

// Checkbox list for subjects
export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  max-height: 280px;
  overflow-y: auto;
  
  
`;

// Each checkbox label
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
 
  padding: ${(props) => props.theme.spacing(1)};
  /* Alternate row colors */
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.white};
  }
  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }

  /* Hover effect */
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
`;

// Checkbox input
export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.black};
`;

// Toggle switch styled component
export const ToggleSwitch = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 50px;
  height: 25px;
  background-color: ${(props) => (props.checked ? props.theme.colors.emaraldgreen : "#ccc")};
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
    transform: ${(props) => (props.checked ? "translateX(25px)" : "translateX(0)")};
  }

  &:focus {
    outline: none;
  }
`;

// Submit Button
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

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
  }

   @media (max-width: 1320px) {
    width: 40%;
  }

  @media (max-width: 990px) {
    width: 85%;
    margin: 0 auto;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  width: 100%;
`;


// Add the following styles to your existing AddNotes.style.js

export const SelectedSubjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(2)};
  max-height: 280px;
  overflow-y: auto;
  width: 100%;
`;

export const SelectedSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1.5)} ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
`;

export const SubjectName = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
`;

export const ArrowButton = styled.button`
  // background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  margin-left: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.lightwhite};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SelectedSubjectsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  color: ${(props) => props.theme.colors.backgrounGrey};
  margin-top: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.colors.dimGray};
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: 4px;
`;




export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 15px;
`;

export const SearchIcon = styled.span`
  margin-right: 8px;
  color: #666;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  background: transparent;
`;