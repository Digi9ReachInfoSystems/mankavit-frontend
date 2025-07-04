import styled from 'styled-components';

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

export const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  margin-top: 0;
  color: ${(props) => props.theme.colors.primary};
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(1)};
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
export const TextInput = styled.textarea`
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

export const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const QuestionTitle = styled.h3`
  font-size: 22px;
  margin-top: 24px;
  color: #333;
`;

export const Button = styled.button`
  padding: 12px;
  margin-top: 12px;
//   font-size: 16px;/
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  width: 300px;

  &:hover {
    background-color: #0056b3;
  }
`;
export const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  align-items: flex-start;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const DeleteButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: Flex-end;

`;

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 8px;
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
  padding: 12px;
    width: 300px;
    margin-right: 20px;


    &:hover {
        background-color: ${(props) => props.theme.colors.primaryDark};
    }
`;

export const DeleteButtonIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #ff4d4f;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #d9363e;
  }
`;

export const MoreButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const TrashIcon = styled.div`
  font-size: 20px;
  color: #ff4d4f;
  cursor: pointer;
  background: rgb(255, 227, 227);
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  &:hover {
    color: #d9363e;
    transform: scale(1.05);
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
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
  
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
