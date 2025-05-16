import styled from 'styled-components';
import theme from '../../../../theme/Theme';
import { NavLink as RouterNavLink } from 'react-router-dom';

export const ToggleButton = styled.button`
  position: absolute;
  top: 5%;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '10px')};
  z-index: 990;
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;

  @media (min-width: 769px) {
    display: none; /* Hide toggle button on big screens */
  }

  @media (max-width: 576px) {
    left: ${({ isSidebarOpen }) => (isSidebarOpen ? '230px' : '10px')};
  }

  @media (max-width: 480px) {
    top: 38px;
  }
`;

export const StyledNavLink = styled(RouterNavLink).attrs({
  activeClassName: 'active'
})`
  display: block;
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
  text-decoration: none;
  color: ${theme.colors.darkgray};
  transition: background 0.2s;

  &.active {
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
  }
  
  &:hover {
    background: ${theme.colors.backgrounGrey};
    color: ${theme.colors.primary};
  }
`;
export const SidebarWrapper = styled.div`
  display: flex;
  padding-top: ${({ isSidebarOpen }) => (isSidebarOpen ? '20px' : theme.spacing(0))};
  padding-bottom: ${({ isSidebarOpen }) => (isSidebarOpen ? '50px' : theme.spacing(0))};
  padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? theme.spacing(3) : theme.spacing(0))};
  padding-right: ${({ isSidebarOpen }) => (isSidebarOpen ? theme.spacing(3) : theme.spacing(0))};
    background: ${theme.colors.white};
  box-shadow: 6px 0 8px rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? '0' : '-320px')};
  width: 300px;
  transition: left 0.3s ease;
  z-index: 998;
  bottom:0;
  padding-top: ${({ isSidebarOpen }) => (isSidebarOpen ? '70px' : '0')};

  @media (min-width: 769px) {
    position: relative;
    left: 0;
    height: auto;
    box-shadow: none;
    padding: ${theme.spacing(3)};
  }

  @media (max-width: 576px) {
    width: 200px;
  }

`;

export const SidebarContainer = styled.div`
  width: 300px;
  background: ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

export const Logo = styled.div`
  padding: ${theme.spacing(6)};
  font-family: ${theme.fonts.heading};
  font-size: 1.25rem;
  color: ${theme.colors.primary};
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  .arrow-icon{
    margin-left: auto;
    font-weight: 900;
    
  }
`;

export const MenuItem = styled.li`
  margin-bottom: ${theme.spacing(2)};
`;

export const MenuLink = styled(RouterNavLink).attrs(() => ({
  activeClassName: 'active'
}))`
  display: flex;
  align-items: center;
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
  font-family: ${theme.fonts.body};
  font-size: 18px;
  color: ${theme.colors.darkgray};
  background: ${theme.colors.lightwhite};
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  svg {
    margin-right: ${theme.spacing(2)};
    font-size: 1.2rem;
  }

  &.active {
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};

    svg {
      color: ${theme.colors.secondary};
    }
  }

  &:hover {
    background: ${theme.colors.lightwhite};
    color: ${theme.colors.primary};
  }

  .sidebar-icon {
    font-size: 28px;

    @media (max-width: 576px) {
      font-size: 20px;
}
    }

  @media (max-width: 576px) {
    font-size: 12px;
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


