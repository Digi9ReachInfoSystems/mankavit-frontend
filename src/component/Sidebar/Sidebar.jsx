import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  ModalButton
} from "./Sidebar.style";
import { getUserByUserId, logoutUser } from "../../api/authApi";
import { getCookiesData } from "../../utils/cookiesService";
import {
  FaPowerOff
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const handleConfirmLogout = async () => {
    const cookieData = await getCookiesData();
    const id = cookieData.userId;
    const userData = await getUserByUserId(id);
    const response = await logoutUser({ email: userData.user.email });
    if (response.success) {
      navigate("/");
    }
  };
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/student-management", label: "Student Management" },
    // { path: "/admin/mock-test", label: "Mock Test" },
    { path: "/admin/payment-management", label: "Payment" },
    { path: "/admin/static-page", label: "Static Page" },
  ];

  const mocktextItems = [
    { path: "/admin/mock-test", label: "View Mock Test" },
    { path: "/admin/mock-test/create-mock-test", label: "Create Mock Test" },
    { path: "/admin/test-management", label: "Results" },
  ]

  const courseManagementItems = [
    { path: "/admin/course-management", label: "Courses" },
    { path: "/admin/subject-management", label: "Subjects" },
    { path: "/admin/notes-management", label: "Notes" },
    { path: "/admin/category-management", label: "Category" },
    { path: "/admin/lecturer-management", label: "Lectures" },
  ];

  const webmanagement = [
    // { path: "/admin/web-management/home", label: "Home page" },
    // { path: "/admin/web-management/why-mankavit", label: "Why Mankavit" },
    { path: "/admin/web-management/aboutus", label: "About us" },
    { path: "/admin/web-management/question-paper", label: "Question paper" },
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
    { path: "/admin/web-management/youtubelinks", label: "Youtube Links" },
  ];

  const appManagementItems = [
    { label: "Homepage" },
    { label: "Courses" },
    { label: "Live Classes" },
    { label: "FAQs" },
  ];

  useEffect(() => {
    const newOpenSections = {};
    const sections = {
      "Mock Test": mocktextItems,
      "Course Management": courseManagementItems,
      "Web management": webmanagement,
      "App Management": appManagementItems,
    };

    for (const [section, items] of Object.entries(sections)) {
      if (
        items.some(
          (item) =>
            typeof item === "object" &&
            item.path &&
            location.pathname.startsWith(item.path)
        )
      ) {
        newOpenSections[section] = true;
      }
    }

    setOpenSections(newOpenSections);
  }, [location.pathname]);

  const renderMenuItem = ({ path, label }, index) =>
    path ? (
      <StyledNavLink
        to={path}
        key={index}
        onClick={() => setIsOpen(false)}
        end={path === "/admin"}
        $isDropdownChild={false}
      >
        {label}
      </StyledNavLink>
    ) : (
      <MenuItem key={index}>{label}</MenuItem>
    );

  const renderSection = (title, items, hasMarginTop = true) => {
    const isExpanded = openSections[title];

    const isSectionActive = items.some(
      (item) =>
        typeof item === "object" &&
        item.path &&
        location.pathname.startsWith(item.path)
    );


    return (
      <React.Fragment key={title}>
        <MenuItem
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            ...(hasMarginTop ? { marginTop: theme.spacing(3) } : {}),
          }}
          className={isSectionActive ? "active" : ""}
          onClick={() => toggleSection(title)}
        >
          {title}
          <DropdownIcon>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </DropdownIcon>
        </MenuItem>

        {isExpanded &&
          items.map((item, index) =>
            typeof item === "object" && item.path ? (
              <StyledNavLink
                to={item.path}
                key={`${title}-${index}`}
                onClick={() => setIsOpen(false)}
                $indented
                $isDropdownChild={true}
              >
                {item.label}
              </StyledNavLink>
            ) : (
              <IndentedItem key={`${title}-${index}`}>
                {typeof item === "object" ? item.label : item}
              </IndentedItem>
            )
          )}
      </React.Fragment>
    );
  };


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
          {renderSection("Web management", webmanagement)}
          {/* {renderSection("App Management", appManagementItems)} */}
        </MenuList>
        <LogoutContainer>
          <LogoutButton onClick={() => {
             handleLogoutClick()
          }}>
            <FaPowerOff size={28} /> Log out  
          </LogoutButton>
        </LogoutContainer>
      </SidebarContainer>
      {showLogoutModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalContent>
              <p>Are you sure you want to logout?</p>
              <ModalButtons>
                <ModalButton $primary onClick={handleConfirmLogout}>Yes</ModalButton>
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
