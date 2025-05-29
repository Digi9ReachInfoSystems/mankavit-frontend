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
//   gap: ${(props) => props.theme.spacing(0.5)};
  align-items: flex-start;
  flex-direction: column;

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

export const Field = styled.p`
//   background-color:rgb(255, 227, 227);
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(1.5)};
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  margin:0;
  font-size: 1rem;
//   width: 100%;
  box-sizing: border-box;
`;

export const FormGroupList = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing(1)};
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  align-items: center;
//   justify-content: center;
`;

export const FieldQusetion = styled.p`
  background-color: #f5f5f5;;
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(1.5)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

export const FieldCorrect = styled.p`
  background-color:rgb(226, 253, 221);
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(1.5)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

export const FieldMarks = styled.p`
    background-color:rgb(255, 255, 255);
    border-radius: 6px;
    padding: ${(props) => props.theme.spacing(1.5)};
    font-family: ${(props) => props.theme.fonts.body};
    margin: 10px 0;
    font-size: 1rem;
    box-sizing: border-box;
    `;

export const FormRowText = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing(3)};
    align-items: flex-start;
    
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        flex-direction: column;
    }
    `;

export const FieldText = styled.p`
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(1.5)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

// export const FormGroupList = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: ${(props) => props.theme.spacing(1)};
//   width: 100%;
//   margin-bottom: ${(props) => props.theme.spacing(1)};
//   align-items: center;
//   justify-content: center;
// `;
