import styled from 'styled-components';

export const Container = styled.div`
//   max-width: 800px;
  padding: 2rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  margin-left: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
      }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const Label = styled.label`
  display: block;
  margin: 1.2rem 0 0.4rem;
  font-size: 14px;
  font-weight: 500;
  color: #2A2A2A;

`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  height: 80px;
  resize: none;
  box-sizing: border-box;
`;

export const DropZone = styled.div`
  border: 2px dashed #ccc;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 0.5rem;
    height: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;

    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 70%;
    }

    @media (max-width: 480px) {
    width: 100%;
    box-sizing: border-box;
}

`;

export const ImageIcon = styled.div`
  color: #007bff;
  margin-bottom: 0.5rem;
`;

export const DropZoneText = styled.div`
  font-size: 14px;
  color: #777;
`;

export const AddImageText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #007bff;
  margin-top: 0.5rem;
`;

export const UploadButton = styled.button`
  margin-top: 2rem;
  padding: 15px 20px;
  background-color: #007bff;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  width: 20%;

  @media (max-width: 1024px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }


  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
  font-size: 12px;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  align-items: flex-start;
  width: 100%;
  margin-top: 1rem;

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

/** Wrapper for sets of checkboxes with a title */
export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(1)};
`;

/** Title for each checkbox section (e.g. "Add Notes ( Click Checkbox to Select )") */
export const CheckboxSectionTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  margin: 0 0 ${(props) => props.theme.spacing(1)} 0;
  color: ${(props) => props.theme.colors.test};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  padding: ${(props) => props.theme.spacing(1)};
`;

/** The container that holds multiple checkbox rows */
export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-y: auto;
  max-height: 120px;
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

export const PreviewMedia = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-y: auto;
  max-height: 120px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
`;

export const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.black};
`;