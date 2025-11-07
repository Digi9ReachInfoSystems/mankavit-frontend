import styled from "styled-components";
import theme from "../../theme/Theme";
export const HeaderContainer = styled.header`
  position: relative;
//   top: 0;
  // left: 250px; 
  width: calc(100% - 40px);
  height: 90px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.secondary};
  padding: 10px 20px;
  border-radius: 10px;
  margin-left: 40px;
  border-bottom: 1px solid #e0e0e0;
  z-index: 990; /* Just behind the sidebar's 999 if it overlaps */

  @media (max-width: 768px) {
        margin-left: 0;
        width: 100%;
        box-sizing: border-box;
        height: 90px;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #333;
  margin-top: 8px;

  @media (max-width: 768px) {
    margin-left: 40px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    margin-left: 40px;
    font-size: 20px;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  border-radius: 10px;

`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border:none;
  border-radius: 8px;
  font-size: 14px;
background-color: ${theme.colors.backgrounGrey};

`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  margin-left: 12px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserName = styled.div`
  color: ${theme.colors.black};
  font-weight: 550;
  font-size: 16px;
  white-space: nowrap;
`;

export const UserEmail = styled.div`
  font-size: 14px;
  color: ${theme.colors.test};
  margin-top: 4px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  min-width: 200px;
  z-index: 1000;
  color: ${theme.colors.vividRed};

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-10px)")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: all 0.25s ease;

  @media (max-width: 768px) {
    right: 0;
  }
`;


export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e00000; /* logout text in red */
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.backgrounGrey};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top: 1px solid ${theme.colors.grey};
  }
`;

export const MobileUserInfo = styled.div`
  display: none;
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.grey};

  @media (max-width: 768px) {
    display: block;
  }
`;



// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  p {
    font-size: 1.1rem;
    color: #333;
    text-align: center;
    margin: 0;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 80px;

  ${({ $primary }) =>
    $primary
      ? `
        background-color: #ff4d4f;
        color: white;
        &:hover { background-color: #ff7875; }
      `
      : `
        background-color: #f0f0f0;
        color: #333;
        &:hover { background-color: #d9d9d9; }
      `}
`;
