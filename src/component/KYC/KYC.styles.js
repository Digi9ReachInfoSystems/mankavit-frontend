import styled from 'styled-components';

export const FormContainer = styled.div`
margin-left: 35px;
// margin-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(3)};
  font-family: ${(props) => props.theme.fonts.body};
//   min-height: 70px;
  // width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing(2)};
  }

  @media (max-width: 1024px) {
    margin-left: 0px;
  }
  @media (max-width: 768px) {
    margin:0;
}
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 400;
  color: ${props => props.theme.colors.darkgray};
  // margin-top: 20px;
  margin: 0px;

  @media (max-width: 1360px) {
      font-size: 36px;
  }

  @media (max-width: 1024px) {
      font-size: 30px;
  }

  @media (max-width: 768px) {
      font-size: 32px;
  }

  @media (max-width: 480px) {
      font-size: 24px;
  }
`;

export const BackLink = styled.div`
// border: 1px solid #ccc;
  padding: 0px;
  border-radius: 5px;

  @media (max-width: 576px) {
    padding: 5px;
  }
`;

export const BackIcon = styled.a`
  font-size: 26px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 5px;

  @media (max-width: 1360px) {
    font-size: 24px;
    margin-right: 0px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const Highlight = styled.span`
  color: ${props => props.theme.colors.vividblue};
`;

export const UpdatedGif = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  .updatedText{
    margin: 0px;
  }
`;

export const Form = styled.div`
  width: 80%;

  @media (max-width: 1024px) {
    width: 100%;
  }

  .updatedGif{
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  `;
export const FormWrapper = styled.div`
  margin-top: 20px;
`;

export const ProfileImage = styled.img`
//   display: block;
  width: 130px;
  height: 130px;
  // object-fit: cover;
  border-radius: 50%;
  margin: 0 ;
  position: relative;

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
`;

export  const CameraImage = styled.img`
position: absolute;
  top: 37%;
  left: 50px;
  width: 20px;
  height: 20px;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
    left: 47%;
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
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 400;

    small {
    font-size: 14px;
    color: #696969; /* Dim Gray */
    font-weight: 400;
    margin-left: 5px;

    @media (max-width: 1024px) {
      font-size: 12px;
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
  font-size: 18px;
  color: ${(props) => props.theme.colors.dimGray};
  box-sizing: border-box;


  @media (max-width: 1024px) {
    font-size: 16px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const MobileInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.colors.platinumlightgray} 1px solid;

  .numberLine{
  width: 2px;
  height: 20px;
  margin-left: 0px;
  background-color: #ccc;
  }
`;

export const FixedCode = styled.div`
  padding: 16px 10px;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;

export const MobileNumberInput = styled.input`
  flex: 1;
  padding: 16px 8px;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${(props) => props.theme.colors.dimGray};
  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
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

  &:hover {
    background-color: ${(props) => props.theme.colors.platinumlightgray};
  }

  @media (max-width: 1360px) {
    width: 60%;
  }
  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 12px;
    width: 50%;  
  }

  @media (max-width: 768px) {
    width: 75%;
  }

  @media (max-width: 480px) {
    width: 70%;
  }
`;

export const UploadedFileName = styled.div`
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

export const BrowseButton = styled.button`
  background-color: ${(props) => props.theme.colors.brightblue};
  color: ${(props) => props.theme.colors.white};
  padding: 12px 20px;
  margin-left: 10px;
  border-radius: 8px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  width: 20%;

  @media (max-width: 1360px) {
    width: 25%;
  }
  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 14px;
    width: 30%;  
  }

  @media (max-width: 768px) {
    width: 20%;
        margin-left: auto;
  }

  @media (max-width: 480px) {
    width: 30%;
  }
`;

export const SubmitButton = styled.button`
  width: 20%;
  background:linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
  font-size: 18px;
  font-weight: 400;
  border: none;
  border-radius: 12px;
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
  width: 35%;
  margin: 25px auto;
  padding: 10px;
  }

  @media (max-width: 480px) {
  display: flex;
  justify-content: center;
    width: 90%;
    margin: 20px auto 0;
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

  @media (max-width: 1360px) {
gap: 10px;
}

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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  border-radius: 10px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px; right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;