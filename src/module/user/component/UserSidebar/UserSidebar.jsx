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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        {isSidebarOpen ? <AiOutlineLeft size={24} /> : <AiOutlineRight size={24} />}
      </ToggleButton>

      {/* Sidebar */}
      <SidebarWrapper ref={sidebarRef} isSidebarOpen={isSidebarOpen}>
        <SidebarContainer>
          <MenuList>
            <MenuItem>
              <MenuLink to="/user" end>
                <FaTachometerAlt className='sidebar-icon' /> Dashboard
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/user/my-courses">
                <FaBookOpen className='sidebar-icon' /> My Courses <AiOutlineRight className='arrow-icon' />
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/user/profile">
                <FaUser className='sidebar-icon' /> Profile
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/terms">
                <FaFileContract className='sidebar-icon' /> T&amp;C
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/notification">
                <FaBell className='sidebar-icon' /> Notification
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/support">
                <FaHeadset className='sidebar-icon' /> Contact Support
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
