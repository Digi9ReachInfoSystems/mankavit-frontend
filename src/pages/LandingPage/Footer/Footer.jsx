import React, { useEffect } from "react";
import {
  FooterContainer,
  LeftContainer,
  RightContainer,
  FooterSection,
  SectionTitle,
  ContactInfo,
  Phone,
  LinkList,
  NewsletterInput,
  Maildescription,
  SubscribeButton,
  BottomBar,
  BottomLinks,
  Copyright,
} from "./Footer.styles";
import { MdPhone } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
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
        <div className="maincontainer">
          <LeftContainer>
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
              <SectionTitle>Quick Link</SectionTitle>
              <LinkList>
                <li>
                  <Link 
                    to="/login" 
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/ourcoursedetails" 
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/aboutus" 
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="https://blog.mankavit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    Blog
                  </a>
                </li>
              </LinkList>
            </FooterSection>
          </LeftContainer>

          <RightContainer>
            <FooterSection>
              <SectionTitle>Studying with Us</SectionTitle>
              <LinkList>
                <li>
                  <Link 
                    to="/ourcoursedetails" 
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faqs" 
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    FAQs
                  </Link>
                </li>
              </LinkList>
            </FooterSection>
          </RightContainer>
        </div>

        <BottomBar>
          <Copyright>Copyright © 2024 Mankavit, All rights reserved.</Copyright>
          <BottomLinks>
            <Link 
              to="/termsandcondition" 
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              Terms and Conditions
            </Link>
            <Link 
              to="/privacypolicy" 
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              Privacy policy
            </Link>
            <Link 
              to="/refundpolicy" 
              style={{ textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              Refund policy
            </Link>
          </BottomLinks>
        </BottomBar>
      </FooterContainer>
    </>
  );
}