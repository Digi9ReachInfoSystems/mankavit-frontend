import theme from "../../../../theme/Theme";
import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${theme.colors.backgrounGrey};
  color: ${theme.colors.primary};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const DashboardContent = styled.div`
  display: flex;  
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 10px 0;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const Application = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding-bottom: 10px;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 0px;
  }
`;

export const Courses = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding-bottom: 10px;
  gap: 20px;

  @media (max-width: 768px) {
    width: 95%;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    gap: 0px;
    width: 89%;
  }
`;

export const MasterOtpSection = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    margin-bottom: 15px;
    color: ${theme.colors.primary};
    font-size: 18px;
    text-align: left;
  }
  
  div {
    display: flex;
    gap: 10px;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    text-align: left;
  }
`;

export const OtpInput = styled.input`
  flex: 1;
  // padding: 10px 15px;
  border: 1px solid ${props => props.isValid ? '#ccc' : 'red'};
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const UpdateButton = styled.button`
  padding: 10px 20px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;