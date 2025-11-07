import React from "react";
import { Outlet } from "react-router-dom";
import { PageWrapper, ContentWrapper } from "./UserBaseLayout.style";

import Header from "../../../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from "../../../../pages/LandingPage/Footer/Footer";
import UserSidebar from "../UserSidebar/UserSidebar";

const UserBaseLayout = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <UserSidebar />
        <Outlet />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default UserBaseLayout;
