import styled from 'styled-components';
import theme from '../../../../theme/Theme';
import { NavLink as RouterNavLink } from 'react-router-dom';

// TOGGLE BUTTON
export const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? '310px' : '20px')};
  z-index: 999;
  background: ${theme.colors.primary};
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: left 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};

  @media (min-width: 991px) {
    display: none;
  }
`;

// SIDEBAR WRAPPER
export const SidebarWrapper = styled.div`
  display: flex;
  padding: ${theme.spacing(3)};
  background: ${theme.colors.white};
  padding-top: 20px;
  padding-bottom: 50px;
  height: 80vh;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  position: fixed;
  top: 0;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? '0' : '-320px')};
  width: 300px;
  transition: left 0.3s ease;
  z-index: 998;

  @media (min-width: 991px) {
    position: relative;
    left: 0;
    height: auto;
    box-shadow: none;
  }
`;

export const SidebarContainer = styled.div`
  width: 100%;
  background: ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
// export const SidebarWrapper = styled.div`
//   display: flex;
//   padding: ${theme.spacing(3)};
//   background: ${theme.colors.white };
//   padding-top: 20px;
//   padding-bottom: 50px;
//   height: 80vh;
//     box-shadow: 2px 0 8px rgba(0,0,0,0.05);
// `;

// export const SidebarContainer = styled.div`
//   width: 300px;
//   background: ${theme.colors.secondary};
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;

// `;

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


