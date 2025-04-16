import React from "react";
import { NavLink } from "react-router-dom";
import theme from "../../theme/Theme";
import {
  SidebarContainer,
  SidebarTitle,
  MenuList,
  MenuItem,
  IndentedItem,
} from "./Sidebar.style";

const Sidebar = () => {
  // Menu item data structure
  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/student-management", label: "Student Management" },
    { label: "Mock Test" }, // No path, will render as plain text
    { path: "/admin/payment-management", label: "Payment" },
  ];
  const courseManagementItems = [
    { path: "/admin/course-management", label: "Courses" },
    { path: "/admin/subject-management", label: "Subjects" }, // Changed to object with path
    { path: "/admin/notes-management", label: "Notes" }       // Changed to object with path
  ];
  const webmanagement = [
    { path: "/admin/web-management/home", label: "Home page" },
    "Why Mankavit",
    "About us",
    "Testimonial",
    "Achievement",
    "Question paper",
    "Live Classes",
    "Recorded Class",
    "Notification",
    "Static Page",
    "FAQs",
  ];



  const appManagementItems = [
    "Homepage",
    "Courses",
    "Live Classes",
    "FAQs",
  ];

  // Render menu item with NavLink if path exists
  const renderMenuItem = ({ path, label }, index) => (
    path ? (
      <NavLink
        to={path}
        style={{ textDecoration: "none", color: "inherit" }}
        activeClassName="active"
        key={index}
      >
        <MenuItem>{label}</MenuItem>
      </NavLink>
    ) : (
      <MenuItem key={index}>{label}</MenuItem>
    )
  );

  // Render a section with title and items
  const renderSection = (title, items, hasMarginTop = true) => (
    <React.Fragment key={title}>
      <MenuItem style={hasMarginTop ? { marginTop: theme.spacing(3) } : null}>
        {title}
      </MenuItem>
      {items.map((item, index) => (
        typeof item === "object" && item.path ? (
          <NavLink
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
            activeClassName="active"
            key={`${title}-${index}`}
          >
            <IndentedItem>{item.label}</IndentedItem>
          </NavLink>
        ) : (
          <IndentedItem key={`${title}-${index}`}>
            {typeof item === "object" ? item.label : item}
          </IndentedItem>
        )
      ))}
    </React.Fragment>
  );

  return (
    <SidebarContainer>
      <SidebarTitle>Mankavit</SidebarTitle>
      <MenuList>
        {menuItems.map((item, index) => renderMenuItem(item, index))}
        
        {renderSection("Course Management", courseManagementItems)}
        {renderSection("Web management", webmanagement)}
        {renderSection("App Management", appManagementItems)}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;