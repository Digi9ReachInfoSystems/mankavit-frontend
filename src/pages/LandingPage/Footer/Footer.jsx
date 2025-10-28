import React, { useEffect } from "react";
import {
  FooterContainer,
  MainContainer,
  TopRow,
  MiddleRow,
  BottomRow,
  FooterSection,
  SectionTitle,
  ContactInfo,
  Phone,
  LinkList,
  BottomBar,
  BottomLinks,
  Copyright,
  AppDownloadSection,
} from "./Footer.styles";
import { MdPhone } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MdEmail } from "react-icons/md";

// ScrollToTop component to handle scroll restoration on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function Footer() {
  // Function to handle scroll to top on link click
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ScrollToTop />
      <FooterContainer>
        <MainContainer>
          {/* Top Row: Contact Us & Studying with Us */}
          <TopRow>
            <FooterSection>
              <SectionTitle>Contact Us</SectionTitle>
              <ContactInfo>
                <MdEmail className="icon" />
                <a href="mailto:mankavit.clatcoaching11@gmail.com">
                  mankavit.clatcoaching11@gmail.com
                </a>
              </ContactInfo>
              <Phone>
                <a href="tel:+91-7979700796">
                  <MdPhone className="phoneicon" /> +91-7979700796
                </a>
              </Phone>
            </FooterSection>

            <FooterSection>
              <SectionTitle>Studying with Us</SectionTitle>
              <LinkList>
                <li>
                  <Link to="/ourcoursedetails" onClick={handleLinkClick}>
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" onClick={handleLinkClick}>
                    FAQs
                  </Link>
                </li>
              </LinkList>
            </FooterSection>
          </TopRow>

          {/* Middle Row: Quick Links & App Download */}
          <MiddleRow>
            <FooterSection>
              <SectionTitle>Quick Link</SectionTitle>
              <LinkList>
                <li>
                  <Link to="/login" onClick={handleLinkClick}>
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link to="/ourcoursedetails" onClick={handleLinkClick}>
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus" onClick={handleLinkClick}>
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="https://blog.mankavit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                  >
                    Blog
                  </a>
                </li>
              </LinkList>
            </FooterSection>

            <AppDownloadSection>
              <SectionTitle>Download Our App</SectionTitle>
              <div className="store-buttons">
                <a
                  href="https://play.google.com/store/apps/details?id=com.digi9.mankavitlawacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/300/300218.png"
                    alt="Get it on Google Play"
                    className="store-badge"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/apple-store/id375380948"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                    alt="Download on the App Store"
                    className="store-badge"
                  />
                </a>
              </div>
            </AppDownloadSection>
          </MiddleRow>
        </MainContainer>

        {/* Bottom Row: Copyright & Links */}
        <BottomRow>
          <BottomBar>
            <Copyright>Copyright © 2024 Mankavit, All rights reserved.</Copyright>
            <BottomLinks>
              <span className="termsandcondition">
                <Link to="/termsandcondition" onClick={handleLinkClick}>
                  Terms and Conditions
                </Link>
              </span>
              <span className="privacypolicy">
                <Link to="/privacypolicy" onClick={handleLinkClick}>
                  Privacy policy
                </Link>
              </span>
              <span className="refundpolicy">
                <Link to="/refundpolicy" onClick={handleLinkClick}>
                  Refund policy
                </Link>
              </span>
            </BottomLinks>
          </BottomBar>
        </BottomRow>
      </FooterContainer>
    </>
  );
}