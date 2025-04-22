import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
} from "./Sidebar.style";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard"
    },
    {
      path: "/admin/student-management",
      label: "Student Management"
    },
    {
      label: "Mock Test"
    },
    {
      path: "/admin/payment-management",
      label: "Payment"
    },
    {
      path: "/admin/static-pages",
      label: "Static Page"
    },
  ];

  const courseManagementItems = [
    {
       path: "/admin/course-management",
        label: "Courses" 
      },
    { 
      path: "/admin/subject-management", 
      label: "Subjects" 
    },
    { 
      path: "/admin/notes-management", 
      label: "Notes"
     },

  ];

  const webmanagement = [
    {
      path: "/admin/web-management/home",
      label: "Home page"
    },
    { path: "/admin/web-management/why-mankavit", label: "Why Mankavit" },
    { path: "/admin/web-management/aboutus", label: "About us"},

    {
      path: "/admin/web-management/question-paper",
      label: "Question apper"
    },

    {
      path: "/admin/web-management/live-classes",
      label: "Live Classes"
    },

    {
      path: "/admin/web-management/recorded-class",
      label: "Recorded Class"
    },
    { path: "/admin/web-management/testinomial", label: "Testinomial" },
    {path: "/admin/web-management/achievement", label: "Achievement"},
    "Question paper",
    "Live Classes",
    "Recorded Class",
    "Notification",

    {
      path: "/admin/web-management/faq",
      label: "FAQs"
    },
  ];

  const appManagementItems = ["Homepage", "Courses", "Live Classes", "FAQs"];

  const renderMenuItem = ({ path, label }, index) =>
    path ? (
      <StyledNavLink
        to={path}
        key={index}
        onClick={() => setIsOpen(false)}
        end={path === "/admin"}
        $isDropdownChild={false} // main menu item
      >
        {label}
      </StyledNavLink>
    ) : (
      <MenuItem key={index}>{label}</MenuItem>
    );

  const renderSection = (title, items, hasMarginTop = true) => {
    const isExpanded = openSections[title];

    // 👇 Check if current location matches any path in the section
    const isSectionActive = items.some((item) =>
      typeof item === "object" && item.path
        ? location.pathname.startsWith(item.path)
        : false
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
                $isDropdownChild={true} // dropdown child item
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
          {renderSection("Course Management", courseManagementItems)}
          {renderSection("Web management", webmanagement)}
          {renderSection("App Management", appManagementItems)}
        </MenuList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
