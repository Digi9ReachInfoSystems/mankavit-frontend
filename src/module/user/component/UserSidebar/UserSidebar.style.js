import styled from 'styled-components';
import theme from '../../../../theme/Theme';
import { NavLink as RouterNavLink } from 'react-router-dom';
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

export const SidebarContainer = styled.div`
  width: 240px;
  background: ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
`;

export const Logo = styled.div`
  padding: ${theme.spacing(4)};
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
`;

export const MenuItem = styled.li`
  margin-bottom: ${theme.spacing(1)};
`;

export const MenuLink = styled(RouterNavLink).attrs(() => ({
  activeClassName: 'active'
}))`
  display: flex;
  align-items: center;
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
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
  color: ${theme.colors.vividblue};
  cursor: pointer;
  transition: background 0.2s;

  svg {
    margin-right: ${theme.spacing(2)};
    font-size: 1.2rem;
  }

  &:hover {
    background: ${theme.colors.backgrounGrey};
  }
`;


