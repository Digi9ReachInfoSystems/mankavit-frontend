import styled from 'styled-components';

export const FormContainer = styled.form`
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

export const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 28px;
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  margin-top: 0;
  color: ${(props) => props.theme.colors.brightblue};

  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 0px;
  margin-top: 30px;
  flex: 1;

  @media (max-width: 1024px) {
    margin-top: 10px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 400;

  small {
    font-size: 14px;
    color: #696969;
    font-weight: 400;
    margin-left: 5px;

    @media (max-width: 1024px) {
      font-size: 10px;
    }

    @media (max-width: 820px) {
      font-size: 10px;
    }
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 820px) {
    font-size: 12px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 16px;
  font-weight: 400;
  border: ${(props) => props.theme.colors.platinumlightgray} 1px solid;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.dimGray};
  box-sizing: border-box;
`;

export const UploadSection = styled.div`
  flex: 1;
  margin-top: 30px;

  @media (max-width: 1024px) {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const UploadButton = styled.button`
  background: ${(props) => props.theme.colors.white};
  border: 1px solid #ccc;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 50%;

  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 14px;
    width: 50%;  
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.platinumlightgray};
  }
`;

export const BrowseButton = styled.button`
  background-color: ${(props) => props.theme.colors.brightblue};
  color: ${(props) => props.theme.colors.white};
  padding: 12px 20px;
  margin-left: 10px;
  border-radius: 8px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  width: 20%;

  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 14px;
    width: 40%;  
  }

  @media (max-width: 768px) {
    width: 30%;
  }
`;

export const SubmitButton = styled.button`
  width: 20%;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
  font-size: 16px;
  font-weight: 400;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.body};
  transition: background-color 0.2s ease;
  margin-top: ${(props) => props.theme.spacing(6)}; 

  @media (max-width: 1320px) {
    width: 40%;
  }

  @media (max-width: 1024px) {
    width: 35%;
  }

  @media (max-width: 990px) {
    width: 40%;
    margin: 20px auto;
  }

  @media (max-width: 768px) {
    width: 85%;
    margin: 15px auto;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FlexUpload = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-wrap: nowrap; 
  }

  @media (max-width: 820px) {
    flex-wrap: nowrap; 
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const UploadedFileName = styled.div`
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

export const UserSelection = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border: ${props => props.$hasError ? '1px solid #ff0000' : 'none'};
  padding: 15px;
  border-radius: 8px;
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: ${props => props.$selected ? '#f0f8ff' : 'transparent'};

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const UserCheckbox = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const UserLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
  flex-grow: 1;
`;

export const TypeSelection = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
`;

export const TypeRadio = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const TypeLabel = styled.label`
  font-size: 16px;
  color: #333;
  cursor: pointer;
  flex-grow: 1;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
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
  max-height: 280px;
`;

/** A single checkbox + label line */
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

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.black};
`;
