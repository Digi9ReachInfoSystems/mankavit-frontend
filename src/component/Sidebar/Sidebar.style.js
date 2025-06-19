import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../theme/Theme";

export const SidebarContainer = styled.div`
  width: 250px;
  height: 95vh;
  background-color: #f9fafc;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  padding: ${theme.spacing(3)};
  z-index: 999;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
    height: 100vh;
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
    overflow-y: auto;
  scrollbar-width: none;
  height: 90vh;
`;

export const MenuItem = styled.li`
  font-size: 16px;
  margin-bottom: ${theme.spacing(2)};
  cursor: pointer;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 4px;
  color: ${theme.colors.test};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: ${theme.colors.secondary};
    background: linear-gradient(to right, #0dcaf0, #007bff);
  }

    &.active {
    color: ${theme.colors.secondary};
    background: linear-gradient(to right, #0dcaf0, #007bff);
    border-radius: 6px;
    
  }
`;

export const IndentedItem = styled(MenuItem)`
  margin-left: ${theme.spacing(4)};
  font-size: 0.9em;
`;

// ✅ Styled NavLink for menu items (with active styling)
export const StyledNavLink = styled(NavLink).attrs(() => ({
  activeClassName: "active",
}))`
  text-decoration: none;
  color: inherit;

  & > li {
    list-style: none;
  }

  display: block;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: ${theme.spacing(2)};
  color: ${theme.colors.test};
  transition: background-color 0.2s, color 0.2s;

  ${({ $indented }) =>
    $indented &&
    css`
      margin-left: ${theme.spacing(4)};
      font-size: 0.9em;
    `}

  ${({ $isDropdownChild }) =>
    $isDropdownChild
      ? css`
          &.active {
            color: #007bff;
            background: transparent;
          }
        `
      : css`
          &.active {
            color: ${theme.colors.secondary};
            background: linear-gradient(to right, #0dcaf0, #007bff);
            border-radius: 6px;
          }
        `}

  &:hover {
    color: ${theme.colors.secondary};
    background: #007bff;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 26px;
    left: 16px;
    z-index: 998;
    padding: 8px;
    border-radius: 4px;
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
export const LogoutContainer = styled.div`
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${theme.spacing(2)} 0;
  background: ${theme.colors.lightwhite};
  border: none;
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.logoutButtonColor};
  cursor: pointer;
  transition: background 0.2s;
  justify-content: center;

  svg {
    margin-right: ${theme.spacing(2)};
    font-size: 1.2rem;
  }

  &:hover {
    background: ${theme.colors.backgrounGrey};
  }
`;
