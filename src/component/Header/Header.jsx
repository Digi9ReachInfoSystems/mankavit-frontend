// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  HeaderContainer,
  Title,
  UserInfoWrapper,
  UserDetails,
  UserName,
  UserEmail
} from "./Header.styles";
import { getUserDetails } from "../../api/authApi";
import { getCookiesData } from "../../utils/cookiesService";

const pathToTitle = pathname => {
  // Strip leading slash and split
  const parts = pathname.replace(/^\/+/, "").split("/");
  // If exactly "admin" or empty, Dashboard
  if (parts.length < 2 || parts[1] === "") return "Dashboard";
  // Otherwise take the second segment
  const seg = parts[1];
  // Convert kebab-case to Title Case
  return seg
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const Header = () => {
  const [user, setUser] = useState({ displayName: "", email: "" });
  const location = useLocation();
  const title = pathToTitle(location.pathname);

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

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <UserInfoWrapper>
        <UserDetails>
          <UserName>{user.displayName}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserDetails>
      </UserInfoWrapper>
    </HeaderContainer>
  );
};

export default Header;
