// src/components/Header/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import {
  HeaderContainer,
  Title,
  UserInfoWrapper,
  UserDetails,
  UserName,
  UserEmail,
  ProfileIcon,
  DropdownMenu,
  DropdownItem,
  MobileUserInfo,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalButtons,
  ModalButton
} from "./Header.styles";
import { getUserDetails, logoutUser, getUserByUserId } from "../../api/authApi";
import { getCookiesData } from "../../utils/cookiesService";

const pathToTitle = pathname => {
  const parts = pathname.replace(/^\/+/, "").split("/");
  if (parts.length < 2 || parts[1] === "") return "Dashboard";
  const seg = parts[1];
  return seg
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const Header = () => {
  const [user, setUser] = useState({ displayName: "", email: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const title = pathToTitle(location.pathname);
  const dropdownRef = useRef(null);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const { userId } = getCookiesData();
      if (!userId) return;
      try {
        const { user: userData } = await getUserDetails(userId);
        setUser({
          displayName: userData.displayName,
          email: userData.email
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Show logout confirmation modal
  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = async () => {
    try {
      const { userId } = getCookiesData();
      const { user } = await getUserByUserId(userId);
      const response = await logoutUser({ email: user.email });
      if (response.success) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>{title}</Title>
        <UserInfoWrapper ref={dropdownRef}>
          <UserDetails onClick={toggleDropdown}>
            <UserName>{user.displayName}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserDetails>
          <ProfileIcon onClick={toggleDropdown}>
            <FaUserCircle />
          </ProfileIcon>

          <DropdownMenu $isOpen={dropdownOpen}>
            <MobileUserInfo>
              <UserName>{user.displayName}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </MobileUserInfo>
            <DropdownItem onClick={handleLogoutClick}>
              <FiLogOut /> Logout
            </DropdownItem>
          </DropdownMenu>
        </UserInfoWrapper>
      </HeaderContainer>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalContent>
              <p>Are you sure you want to logout?</p>
              <ModalButtons>
                <ModalButton $primary onClick={handleConfirmLogout}>
                  Yes
                </ModalButton>
                <ModalButton onClick={handleCancelLogout}>No</ModalButton>
              </ModalButtons>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
