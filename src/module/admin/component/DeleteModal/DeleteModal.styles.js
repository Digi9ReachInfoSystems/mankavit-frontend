import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  padding: 24px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseIcon = styled.div`
position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f2f2f2;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 8px;
  padding: 12px 24px;
`;

export const ModalText = styled.p`
  font-size: 18px;
  color: #333;
  margin: 0;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 16px;

  &:hover {
    background: #e0e0e0;
  }
`;

export const DeleteButton = styled.button`
  padding: 10px 20px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 16px;

  &:hover {
    background: #c62828;
  }
`;
