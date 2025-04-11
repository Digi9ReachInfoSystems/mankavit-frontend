import styled from "styled-components";
import theme from "../../theme/Theme";

export const SidebarContainer = styled.div`
  width: 250px;               /* Fixed width consistent with the screenshot */
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f9fafc;  /* A light background (adjust if you prefer) */
  display: flex;
  flex-direction: column;
  overflow-y: auto;           /* Scroll if menu items exceed screen height */
  border-right: 1px solid #e0e0e0;
  z-index: 999;
  padding: ${theme.spacing(3)};
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
  display: flex;
  font-size: 16px;
  align-items: center;
  margin-bottom: ${theme.spacing(2)};
  cursor: pointer;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 4px;
  color: ${theme.colors.test};
  transition: background-color 0.2s;

  &:hover {
    color: ${theme.colors.secondary};
    background:linear-gradient(to right, #0dcaf0, #007bff);
  }
`;

export const Checkbox = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid ${theme.colors.test};
  margin-right: ${theme.spacing(2)};
  position: relative;

  &::after {
    content: ${props => (props.checked ? "'✓'" : "''")};
    position: absolute;
    top: -3px;
    left: 2px;
    color: ${theme.colors.primary};
    font-size: 14px;
  }
`;

export const IndentedItem = styled(MenuItem)`
  margin-left: ${theme.spacing(4)};
  font-size: 0.9em;
  color: ${theme.colors.test};
`;
