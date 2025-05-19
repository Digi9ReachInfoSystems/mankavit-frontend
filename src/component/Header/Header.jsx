import React from "react";
import styled from "styled-components";
import theme from "../../theme/Theme";
// import { FaChevronDown } from "react-icons/fa";
import {
HeaderContainer,

    Title,
    UserInfoWrapper,
    UserDetails,
    UserName,
    UserEmail
} from "./Header.styles";


const Header = () => {
  return (
    <HeaderContainer>
      <Title>Dashboard</Title>

      {/* <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search candidate, vacancy, etc"
        />
      </SearchWrapper> */
      }
      <UserInfoWrapper>
        <UserDetails>
          <UserName>Admin Mankavit</UserName>
          <UserEmail>Admin@mankavit.com</UserEmail>
        </UserDetails>
        {/* <FaChevronDown style={{ cursor: "pointer" }} /> */}
      </UserInfoWrapper>
    </HeaderContainer>
  );
};

export default Header;
