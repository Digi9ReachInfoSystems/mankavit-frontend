// AddSubjectStyles.js
import styled from "styled-components";

/** Overall container for the form */
export const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
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
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.primary};
`;

/** The overall form element */
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
  
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

  @media (max-width: 990px) {
    width: 100%;
  }

  
`;

/** Wrapper for a single field */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  max-width: 200px;
`;

/** Wrapper for sets of checkboxes with a title */
export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(1)};
  width: 50%;
`;

/** Title for each checkbox section (e.g. "Add Notes ( Click Checkbox to Select )") */
export const CheckboxSectionTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.2rem;
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
  gap: 0;
  max-height: calc(6 * 36px); /* Adjust height as needed */
  overflow-y: auto;
  padding-right: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.colors.backgrounGrey};

  /* Custom scrollbar styling - Darker version */
  &::-webkit-scrollbar {
    width: 8px; /* Slightly wider scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.lightGrey}; /* Lighter track */
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.darkGrey}; /* Darker thumb */
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.grey}; /* Optional border */
  }

  /* Firefox support (optional) */
  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme.colors.darkGrey} ${(props) => props.theme.colors.lightGrey};
`;

/** A single checkbox + label line */
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

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

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.black};
`;

export const UploadArea = styled.div`
width: 45%;
  border: 2px dashed ${(props) => props.theme.colors.grey};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;

  p {
    margin: ${(props) => props.theme.spacing(1)} 0 0 0;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }

  @media (max-width: 1320px) {
    // width: 40%;
  }

  @media (max-width: 990px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(6)} ${(props) => props.theme.spacing(2)};
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

/** The big action button at the bottom ("Add Subject") */
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
    margin:0  auto ;
  }


`;

export const SubjectsContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const SelectedSubjectsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
  // background-color: ${(props) => props.theme.colors.backgrounGrey};
`;

export const SelectedSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  color: ${(props) => props.theme.colors.darkblueGray};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SubjectName = styled.span`
  flex: 1;
  font-size: 0.9rem;
`;

export const MoveButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  margin-left: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
 &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.lightwhite};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;