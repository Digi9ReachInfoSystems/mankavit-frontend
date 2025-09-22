  import React from "react";
  import { Outlet } from "react-router-dom";
  import { PageWrapper, ContentWrapper } from "../BaseLayout/BaseLayout.styles";
  import Sidebar from "../Sidebar/Sidebar";
  import Header from "../Header/Header";
  import Footer from "../Footer/Footer";

  const BaseLayout = () => {
    return (
      <PageWrapper>

        <Sidebar />
        <ContentWrapper>
        <Header />
          <Outlet />
          {/* <Footer /> */}
        </ContentWrapper>
      </PageWrapper>
    );
  };

  export default BaseLayout;