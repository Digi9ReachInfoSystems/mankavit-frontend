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
  // Menu item data structure for better organization and reusability
  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      label: "Courses Management",
    },
    {
      label: "Student Management",
    },
    {
      label: "Mock Test",
    },
    {
      label: "Payment",
    },
    {
      label: "Web Management",
    },
    {
      path: "/homepage",
      label: "Homepage",
    },
  ];

  const whyMankavitItems = [
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

  // Component for rendering a menu item with optional NavLink
  const renderMenuItem = ({ path, label }) => (
    path ? (
      <NavLink
        to={path}
        style={{ textDecoration: "none", color: "inherit" }}
        activeclassname="active"
        key={label}
      >
        <MenuItem>{label}</MenuItem>
      </NavLink>
    ) : (
      <MenuItem key={label}>{label}</MenuItem>
    )
  );

  // Component for rendering a section with title and indented items
  const renderSection = (title, items, hasMarginTop = true) => (
    <>
      <MenuItem style={hasMarginTop ? { marginTop: theme.spacing(3) } : null}>
        {title}
      </MenuItem>
      {items.map((item) => (
        <IndentedItem key={item}>{item}</IndentedItem>
      ))}
    </>
  );

  return (
    <SidebarContainer>
      <SidebarTitle>Mankavit</SidebarTitle>

      <MenuList>
        {menuItems.map(renderMenuItem)}
        {renderSection("Why Mankavit", whyMankavitItems)}
        {renderSection("App Management", appManagementItems)}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;