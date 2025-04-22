import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  SidebarContainer,
  Logo,
  MenuList,
  MenuItem,
  MenuLink,
  LogoutContainer,
  LogoutButton
} from './UserSidebar.style';
import { 
  FaTachometerAlt, 
  FaBookOpen, 
  FaUser, 
  FaFileContract, 
  FaBell, 
  FaHeadset, 
  FaPowerOff 
} from 'react-icons/fa';

const UserSidebar = () => {
  return (
    <SidebarContainer>
      <Logo> {/* optional logo / title */}
        <NavLink to="/dashboard">Mankavit</NavLink>
      </Logo>
      <MenuList>
        <MenuItem>
          <MenuLink to="/dashboard" end>
            <FaTachometerAlt /> Dashboard
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/my-courses">
            <FaBookOpen /> My Courses
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/profile">
            <FaUser /> Profile
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/terms">
            <FaFileContract /> T&amp;C
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/notification">
            <FaBell /> Notification
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/support">
            <FaHeadset /> Contact Support
          </MenuLink>
        </MenuItem>
      </MenuList>

      <LogoutContainer>
        <LogoutButton onClick={() => {/* your logout logic */}}>
          <FaPowerOff /> Log out
        </LogoutButton>
      </LogoutContainer>
    </SidebarContainer>
  );
};

export default UserSidebar;
