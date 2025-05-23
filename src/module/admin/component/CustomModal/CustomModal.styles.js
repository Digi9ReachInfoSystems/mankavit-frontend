
import styled from "styled-components";

export const Overlay = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;                               
  width: 450px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
   padding: 12px 16px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
`;

export const ModalBody = styled.div`

  overflow-y: auto;
  max-height: 30vh; 
  font-size: 18px;
  color: #333;
`;

export const MocktestList = styled.ul`
  padding-left: 20px;
  margin-top: 10px;

`;

export const MocktestItem = styled.li`
  list-style: none;
 padding: 12px 16px;
  font-size: 14px;
  margin-bottom: 6px;
  color: #444;
  font-size: 16px;
    border-bottom: 1px solid #E7E7E8;

    .subject-link {
    color: #242526;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.brightblue};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  width: 70%;

  &:hover {
    background-color: #0069d9;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #2a9d8f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;