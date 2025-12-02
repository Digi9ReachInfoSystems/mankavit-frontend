import styled from "styled-components";

/** Overall container for the form */
export const Container = styled.div`
  margin-left: 40px;
  margin-top: 20px;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 6px;
  padding: ${(p) => p.theme.spacing(3)};
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-family: ${(p) => p.theme.fonts.body};
  min-height: 750px;

  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: ${(p) => p.theme.spacing(2)};
  }

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    min-height: auto;
  }
`;

/** Title at the top of the form */
export const Title = styled.h2`
  font-family: ${(p) => p.theme.fonts.heading};
  font-size: 1.5rem;
  margin: 0 0 ${(p) => p.theme.spacing(2)} 0;
  color: ${(p) => p.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

/** The overall form element */
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(2)};
`;

/** A row that divides into columns (stacks on mobile) */
export const FormRow = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(3)};
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${(p) => p.theme.spacing(2)};
  }
    // @media (max-width:768px)
    // {
    //   padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 60px);
    //   }
`;

/** Each column in a row */
export const Column = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(2)};

  &.toggle-column {
    gap: 16px;
  }

  @media (max-width: 990px) {
    width: 100%;
  }
`;

/** Wrapper for a single field */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;

  /* Make Jodit fit container */
  & .jodit,
  & .jodit-container,
  & .jodit-wysiwyg {
    width: 100% !important;
    box-sizing: border-box;
  }
`;

/** Labels for inputs */
export const Label = styled.label`
  font-weight: normal;
  margin-bottom: ${(p) => p.theme.spacing(1)};
  color: ${(p) => p.theme.colors.black};
  font-size: 1rem;
`;

/** Standard text input styling */
export const Input = styled.input`
  padding: ${(p) => p.theme.spacing(1)};
  font-size: 0.95rem;
  border: 1px solid ${(p) => p.theme.colors.grey};
  border-radius: 6px;
  color: ${(p) => p.theme.colors.test};
  font-family: ${(p) => p.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

/** Textarea styling */
export const TextArea = styled.textarea`
  padding: ${(p) => p.theme.spacing(1)};
  font-size: 0.95rem;
  border: 1px solid ${(p) => p.theme.colors.grey};
  border-radius: 6px;
  resize: vertical;
  font-family: ${(p) => p.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

/** Price input */
export const PriceInput = styled(Input)`
  @media (max-width: 990px) {
    max-width: 100%;
  }
`;

/** Wrapper for sets of checkboxes */
export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(p) => p.theme.spacing(1)};
  flex: 1;
  min-width: 280px;
`;

/** Section title */
export const CheckboxSectionTitle = styled.h4`
  font-family: ${(p) => p.theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 ${(p) => p.theme.spacing(1)} 0;
  padding: ${(p) => p.theme.spacing(1)};
  color: ${(p) => p.theme.colors.backgrounGrey};
  background-color: ${(p) => p.theme.colors.dimGray};
  border-radius: 6px;
`;

/** Checkbox list */
export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(1)};
  overflow-y: auto;
  max-height: 280px;
`;

/** A single checkbox + label line */
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(1)};
  font-size: 0.95rem;
  color: ${(p) => p.theme.colors.black};
  padding: ${(p) => p.theme.spacing(1)};
  border-radius: 4px;

  &:nth-child(odd) {
    background-color: ${(p) => p.theme.colors.white};
  }
  &:nth-child(even) {
    background-color: ${(p) => p.theme.colors.backgrounGrey};
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.primaryLight};
  }
`;

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

/** Upload area: responsive, centers on small screens */
export const UploadArea = styled.div`
  border: 2px dashed ${(p) => p.theme.colors.grey};
  border-radius: 8px;
  padding: ${(p) => p.theme.spacing(4)};
  text-align: center;
  color: ${(p) => p.theme.colors.test};
  cursor: pointer;
  width: 100%;
  max-width: 420px;

  p {
    margin: ${(p) => p.theme.spacing(1)} 0 0 0;
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.backgrounGrey};
  }

  img.upload-icon {
    width: 40px;
    height: 40px;
  }
`;

/** Hidden file input */
export const FileInput = styled.input`
  display: none;
`;

/** Placeholder inside drop zone */
export const UploadPlaceholder = styled.div`
  font-size: 2rem;
  color: ${(p) => p.theme.colors.primary};
`;

/** Submit button */
export const SubmitButton = styled.button`
  width: 280px;
  max-width: 100%;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(p) => p.theme.colors.secondary};
  padding: ${(p) => p.theme.spacing(1.2)} ${(p) => p.theme.spacing(2)};
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${(p) => p.theme.fonts.body};
  transition: filter 0.2s ease;
  margin-top: ${(p) => p.theme.spacing(2)};

  &:hover {
    filter: brightness(0.95);
  }

  @media (max-width: 990px) {
    width: 100%;
  }
`;

/** Toggle Switch */
export const ToggleSwitch = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 50px;
  height: 25px;
  background-color: ${(p) =>
    p.checked ? p.theme.colors.emaraldgreen : "#ccc"};
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
    transform: ${(p) => (p.checked ? "translateX(25px)" : "translateX(0)")};
  }

  &:focus {
    outline: none;
  }
`;

export const SubjectsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-height: 280px;

  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    flex-direction: column;
    max-height: none;
  }
`;

export const SelectedSubjectsContainer = styled.div`
  flex: 1;
  border-radius: 8px;
  padding: 0.5rem;
  background: #f9f9f9;
  min-height: 280px;
  max-height: 280px;
  overflow-y: auto;

  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    max-height: none;
    min-height: 200px;
  }
`;

export const SelectedSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`;

export const SubjectName = styled.span`
  font-size: 0.95rem;
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
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${(p) => p.theme.colors.lightwhite};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

/** Subject search */
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  margin-bottom: 12px;
  background: #fff;
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
