import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  SidebarContainer,
  Logo,
  MenuList,
  MenuItem,
  MenuLink,
  LogoutContainer,
  LogoutButton,
  SidebarWrapper
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
import { AiOutlineRight  } from "react-icons/ai";

const UserSidebar = () => {
  return (
    <SidebarWrapper>
    <SidebarContainer>
      <MenuList>
        <MenuItem>
          <MenuLink to="/user" end>
            <FaTachometerAlt /> Dashboard
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/user/my-courses">
            <FaBookOpen /> My Courses  <AiOutlineRight className='arrow-icon' />
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/user/profile">
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
    </SidebarWrapper>
  );
};

export default UserSidebar;
