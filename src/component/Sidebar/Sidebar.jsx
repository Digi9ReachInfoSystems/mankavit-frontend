// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp, FaPowerOff } from "react-icons/fa";
import theme from "../../theme/Theme";
import {
  SidebarContainer,
  SidebarTitle,
  MenuList,
  MenuItem,
  IndentedItem,
  HamburgerIcon,
  Backdrop,
  DropdownIcon,
  StyledNavLink,
  LogoutContainer,
  LogoutButton,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalButtons,
  ModalButton,
} from "./Sidebar.style";
import { getUserByUserId, logoutUser } from "../../api/authApi";
import { getCookiesData } from "../../utils/cookiesService";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/student-management", label: "Student Management" },
    { path: "/admin/payment-management", label: "Payment" },
    { path: "/admin/static-page", label: "Static Page" },
  ];

  const mockTestItems = [
    { path: "/admin/mock-test", label: "View Mock Test" },
    { path: "/admin/mock-test/create-mock-test", label: "Create Mock Test" },
    { path: "/admin/results", label: "Results" },
  ];

  const courseManagementItems = [
    { path: "/admin/course-management", label: "Courses" },
    { path: "/admin/subject-management", label: "Subjects" },
    { path: "/admin/notes-management", label: "Notes" },
    { path: "/admin/category-management", label: "Category" },
    { path: "/admin/lecturer-management", label: "Lectures" },
  ];
  const meetingsItems = [
    { path: "/admin/meeting-management", label: "Meeting" },
  ];

  const webManagementItems = [
    { path: "/admin/web-management/aboutus", label: "About us" },
    { path: "/admin/web-management/question-paper", label: "Question Paper" },
    { path: "/admin/web-management/live-classes", label: "Live Classes" },
    { path: "/admin/web-management/recorded-class", label: "Recorded Class" },
    { path: "/admin/web-management/testinomial", label: "Testimonial" },
    { path: "/admin/web-management/achievement", label: "Achievement" },
    { path: "/admin/web-management/notification", label: "Notification" },
    { path: "/admin/web-management/faq", label: "FAQs" },
    { path: "/admin/web-management/social-media", label: "Social Media" },
    { path: "/admin/web-management/mission", label: "Mission" },
    { path: "/admin/web-management/why-study-with-us", label: "Why Study With Us" },
    { path: "/admin/web-management/blog", label: "Blog" },
    { path: "/admin/web-management/contact-support", label: "Contact Support" },
    { path: "/admin/web-management/user-feedback", label: "User Feedback" },
    { path: "/admin/web-management/youtubelinks", label: "YouTube Links" },
  ];

  const sections = {
    "Mock Test": mockTestItems,
    "Course Management": courseManagementItems,
    "Web Management": webManagementItems,
  };

  useEffect(() => {
    // Auto‐expand the current section
    const newState = {};
    Object.entries(sections).forEach(([sec, items]) => {
      if (items.some(item => location.pathname.startsWith(item.path))) {
        newState[sec] = true;
      }
    });
    setOpenSections(newState);
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(open => !open);
  const toggleSection = sec =>
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  const handleConfirmLogout = async () => {
    try {
      const { userId } = await getCookiesData();
      const { user } = await getUserByUserId(userId);
      const response = await logoutUser({ email: user.email });
      if (response.success) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // 💡 Always pass `end` so NavLink is exact-match only
  const renderLink = ({ path, label }, key, indented = false) => (
    <StyledNavLink
      to={path}
      key={key}
      end
      onClick={() => setIsOpen(false)}
      $indented={indented}
      $isDropdownChild={indented}
    >
      {label}
    </StyledNavLink>
  );

  return (
    <>
      <HamburgerIcon onClick={toggleSidebar}>
        <FaBars size={24} />
      </HamburgerIcon>
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarTitle>Mankavit</SidebarTitle>
        <MenuList>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
          {renderSection("Mock Test", mocktextItems)}
          {renderSection("Course Management", courseManagementItems)}
          {renderSection("Meetings Management", meetingsItems
          )}
          {renderSection("Web management", webmanagement)}
          {/* {renderSection("App Management", appManagementItems)} */}
          {menuItems.map((item, i) => renderLink(item, i))}
          {Object.entries(sections).map(([title, items]) => (
            <React.Fragment key={title}>
              <MenuItem
                onClick={() => toggleSection(title)}
                style={{
                  marginTop: theme.spacing(3),
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className={openSections[title] ? "active" : ""}
              >
                {title}
                <DropdownIcon>
                  {openSections[title] ? <FaChevronUp /> : <FaChevronDown />}
                </DropdownIcon>
              </MenuItem>
              {openSections[title] &&
                items.map((itm, j) => renderLink(itm, `${title}-${j}`, true))}
            </React.Fragment>
          ))}
        </MenuList>
        <LogoutContainer>
          <LogoutButton onClick={handleLogoutClick}>
            <FaPowerOff size={20} /> Log out
          </LogoutButton>
        </LogoutContainer>
      </SidebarContainer>

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

export default Sidebar;
