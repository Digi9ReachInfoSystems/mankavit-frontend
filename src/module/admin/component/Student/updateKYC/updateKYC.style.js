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

export const FormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px 15px;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 0 10px;
  margin-bottom: 15px;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  gap: 30px;
  align-items: center;

`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

export const KYCTitle = styled.p`
font-weight: 500;
color: #555;
font-size: 18px;
margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  font-weight: 400;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.dimGray};
  box-sizing: border-box;
  cursor: default;

  &:hover {
    outline: none;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const KycDot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => 
    status === "approved" ? "#28a745" :
    status === "rejected" ? "#dc3545" : 
    status === "pending" ? "#ffc107" : "#6c757d"};
`;

export const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const RejectButton = styled(SubmitButton)`
  background-color: #dc3545;
  margin-right: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

export const DocumentLink = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  // margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const DocumentImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 20px;
`;

export const NoKycContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const NoKycMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a6268;
  }
`;

export const StatusInfo = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin-top: 10px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  .modal-image {
  width: 500px;
  height: 500px;
  }

  .modal-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;