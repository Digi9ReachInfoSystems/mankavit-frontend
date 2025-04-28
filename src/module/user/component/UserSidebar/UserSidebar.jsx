import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  SidebarContainer,
  Logo,
  MenuList,
  MenuItem,
  MenuLink,
  LogoutContainer,
  LogoutButton,
  SidebarWrapper,
  ToggleButton
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
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Toggle Button */}
      <ToggleButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen}>
        {isSidebarOpen ? <AiOutlineLeft size={28} /> : <AiOutlineRight size={28} />}
      </ToggleButton>

      {/* Sidebar */}
      <SidebarWrapper ref={sidebarRef} isSidebarOpen={isSidebarOpen}>
        <SidebarContainer>
          <MenuList>
            <MenuItem>
              <MenuLink to="/dashboard" end>
                <FaTachometerAlt size={28} /> Dashboard
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/my-courses">
                <FaBookOpen size={28} /> My Courses <AiOutlineRight className='arrow-icon' />
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/user/profile">
                <FaUser size={24} /> Profile
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/terms">
                <FaFileContract size={28} /> T&amp;C
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/notification">
                <FaBell size={28} /> Notification
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/support">
                <FaHeadset size={28} /> Contact Support
              </MenuLink>
            </MenuItem>
          </MenuList>

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
              <FaPowerOff size={28} /> Log out
            </LogoutButton>
          </LogoutContainer>
        </SidebarContainer>
      </SidebarWrapper>
    </>
  );
};

export default UserSidebar;
