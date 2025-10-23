// AdminManagement.styles.js
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 40px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 20px;
  min-height: 600px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.black};
`;

export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const SortLabel = styled.span`
  margin-right: 8px;
`;

export const SortSelect = styled.select`
  padding: 6px;
  font-size: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
`;

export const CreateButton = styled.button`
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 30%;
  margin-bottom: 20px;

  width: 35%;
 min-width: 250px;
 margin-bottom: 20px;
 display: flex;
 align-items: left;

 @media (max-width: 1024px) {
   width: 45%;
 }

 @media (max-width: 768px) {
   width: 60%;
   margin: 10px auto;
 }

 @media(min-width: 800px) and (max-width: 1080px) {
   width: 70%;
   margin: 10px auto;
 }

 @media (max-width: 576px) {
   width: 90%;
   margin: 10px auto;
 }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.black};
`;

export const TableHeader = styled.th`
  padding: 12px;
  color: white;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

export const TableCell = styled.td`
  padding: 12px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: ${props => props.$isPublished ? '#4CAF50' : '#ccc'};
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px; width: 20px;
    left: 4px; bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    transform: ${props => props.$isPublished ? 'translateX(26px)' : 'translateX(0)'};
  }
`;

export const ToggleLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
  color: ${props => props.$isPublished ? '#4CAF50' : '#999'};
  user-select: none;
`;

export const ResetPasswordButton = styled.button`
  background-color: #ffc107;
  color: #000;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0a800;
  }
`;

export const ResetPasswordModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1;
`;

export const ResetPasswordModalContent = styled.div`
  position: relative;
  z-index: 2;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  color: #007bff;
`;

export const ResetPasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 24px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ModalButton = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  background-color: ${(props) =>
    props.$variant === "cancel" ? "#ccc" : "#007bff"};
  color: ${(props) => (props.$variant === "cancel" ? "#333" : "#fff")};

  &:hover {
    background-color: ${(props) =>
      props.$variant === "cancel" ? "#bbb" : "#0056b3"};
  }
`;
