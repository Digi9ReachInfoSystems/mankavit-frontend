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
    margin:0;
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
    color: #696969; /* Dim Gray */
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
  background:linear-gradient(to right, #0dcaf0, #007bff);
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
