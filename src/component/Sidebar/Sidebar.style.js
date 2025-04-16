import styled from "styled-components";
import theme from "../../theme/Theme";

export const SidebarContainer = styled.div`
  width: 250px;
  height: 95vh;
  background-color: #f9fafc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
  border-right: 1px solid #e0e0e0;
  padding: ${theme.spacing(3)};
  z-index: 999;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
  }

  @media (max-width: 990px) {
    width: 200px;
  }

  @media (min-width: 769px) {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

export const SidebarTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.primary};
  margin: 0;
  padding-bottom: ${theme.spacing(2)};
  border-bottom: 1px solid ${theme.colors.grey};
  margin-bottom: ${theme.spacing(3)};
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  font-size: 16px;
  margin-bottom: ${theme.spacing(2)};
  cursor: pointer;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 4px;
  color: ${theme.colors.test};
  transition: background-color 0.2s;

  &:hover {
    color: ${theme.colors.secondary};
    background: linear-gradient(to right, #0dcaf0, #007bff);
  }
`;

export const IndentedItem = styled(MenuItem)`
  margin-left: ${theme.spacing(4)};
  font-size: 0.9em;
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 26px;
    left: 16px;
    z-index: 998;
    // background-color: white;
    padding: 8px;
    border-radius: 4px;
    // box-shadow: 0 0 5px rgba(0,0,0,0.1);
    cursor: pointer;
  }
`;

export const Backdrop = styled.div`
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 998;
  }
`;

export const DropdownIcon = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
  }
`;
