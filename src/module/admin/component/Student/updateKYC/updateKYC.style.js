import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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
  margin-top: 5px;

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