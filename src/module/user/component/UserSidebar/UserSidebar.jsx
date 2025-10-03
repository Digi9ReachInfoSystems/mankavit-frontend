import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  SidebarContainer,
  Logo,
  MenuList,
  MenuItem,
  MenuLink,
  LogoutContainer,
  LogoutButton,
  SidebarWrapper,
  ToggleButton,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalButtons,
  ModalButton,
  UnreadDot,
} from "./UserSidebar.style";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaUser,
  FaFileContract,
  FaBell,
  FaHeadset,
  FaPowerOff,
} from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineMenuOpen } from "react-icons/md";
import { getCookiesData } from "../../../../utils/cookiesService";
import { getUserByUserId, logoutUser } from "../../../../api/authApi";
import {
  getUserNotifications,
  markNotificationasread,
} from "../../../../api/notificationApi";

const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Get user ID from cookies
  useEffect(() => {
    const { userId } = getCookiesData();
    setId(userId);
  }, []);

  // Load notifications
  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const load = async () => {
      try {
        const res = await getUserNotifications(id);
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        const unread = list.filter(
          (n) =>
            n?.read === false || n?.is_read === false || n?.isRead === false
        ).length;

        if (!cancelled) setUnreadCount(unread);
      } catch (e) {
        console.error("Failed to load notifications", e);
        if (!cancelled) setUnreadCount(0);
      }
    };

    load();

    const interval = setInterval(load, 60_000); // Refresh every 60s
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleMenuClick = () => {
    if (window.innerWidth <= 576) setIsSidebarOpen(false);
  };

  const handleConfirmLogout = async () => {
    try {
      const userData = await getUserByUserId(id);
      const response = await logoutUser({ email: userData.user.email });
      if (response.success) navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/");
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);

  // Mark all notifications as read when visiting notification page
  const onOpenNotifications = async () => {
    handleMenuClick();
    setUnreadCount(0); // Hide dot immediately

    try {
      await markNotificationasread(id);
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
      // Optionally: retry or refetch later
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <ToggleButton onClick={toggleSidebar}>
        <MdOutlineMenuOpen size={24} />
      </ToggleButton>

      {/* Sidebar */}
      <SidebarWrapper ref={sidebarRef} isSidebarOpen={isSidebarOpen}>
        <SidebarContainer>
          <MenuList>
            <MenuItem>
              <MenuLink to="/user" end onClick={handleMenuClick}>
                <FaTachometerAlt className="sidebar-icon" /> Dashboard
              </MenuLink>
            </MenuItem>

            <MenuItem>
              <MenuLink to="/user/my-courses" onClick={handleMenuClick}>
                <FaBookOpen className="sidebar-icon" /> My Courses
                <AiOutlineRight className="arrow-icon" />
              </MenuLink>
            </MenuItem>

            <MenuItem>
              <MenuLink to={`/user/profile/${id}`} onClick={handleMenuClick}>
                <FaUser className="sidebar-icon" /> Profile
              </MenuLink>
            </MenuItem>

            <MenuItem>
              <MenuLink to="/user/tandc" onClick={handleMenuClick}>
                <FaFileContract className="sidebar-icon" /> T&amp;C
              </MenuLink>
            </MenuItem>

            <MenuItem>
              <MenuLink
                to="/user/notification"
                onClick={onOpenNotifications}
                aria-label={
                  unreadCount > 0
                    ? `${unreadCount} new notifications`
                    : "Notification"
                }
              >
                <FaBell className="sidebar-icon" /> Notification
                {unreadCount > 0 && <UnreadDot aria-hidden />}
              </MenuLink>
            </MenuItem>

            <MenuItem>
              <MenuLink to="/user/contactsupport" onClick={handleMenuClick}>
                <FaHeadset className="sidebar-icon" /> Contact Support
              </MenuLink>
            </MenuItem>

            <LogoutButton onClick={handleLogoutClick}>
              <FaPowerOff size={28} /> Log out
            </LogoutButton>
          </MenuList>
        </SidebarContainer>
      </SidebarWrapper>

      {/* Logout Modal */}
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

export default UserSidebar;
