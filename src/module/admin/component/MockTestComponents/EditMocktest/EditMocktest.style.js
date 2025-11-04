import styled from "styled-components";

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

export const SubTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  margin-top: 0;
  color: ${(props) => props.theme.colors.primary};
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  align-items: flex-start;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
    
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

  @media (max-width: 480px) {
    width: 100%;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;
export const Select = styled.select`
  /* Add your styles here matching your Input component */
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(1)};
`;

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

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: ${(props) => props.theme.spacing(0.5)};
    width: 100%;
  }
`;

export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-y: auto;
  max-height: 280px;
`;

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


export const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 4px;
`;



export const SelectedSubjectsContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  background: ${(props) => props.theme.colors.backgrounGrey};
  border-radius: 6px;
  padding: 12px;
  max-height: 280px;
  overflow-y: auto;
`;

export const SelectedSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 8px;
`;

export const SubjectName = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: red;
`;


export const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #007bff;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 26px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
