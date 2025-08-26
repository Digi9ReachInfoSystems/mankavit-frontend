import React from "react";
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
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
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
            {/* <Phone><a href="tel:+02 5421234560"><MdPhone className="phoneicon"/> +02 5421234560</a></Phone> */}
          </FooterSection>

          <FooterSection>
            <SectionTitle>Quick Link</SectionTitle>
            <LinkList>
              <li>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  Student Portal{" "}
                </Link>
              </li>
              <li>
                <Link to="/ourcoursedetails" style={{ textDecoration: "none" }}>
                  {" "}
                  Courses{" "}
                </Link>
              </li>
              <li>
                <Link to="/aboutus" style={{ textDecoration: "none" }}>
                  {" "}
                  About{" "}
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.mankavit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  Blog{" "}
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
                <Link to="/ourcoursedetails" style={{ textDecoration: "none" }}>
                  {" "}
                  All Courses{" "}
                </Link>
              </li>
              <li>
                <Link to="/faqs" style={{ textDecoration: "none" }}>
                  {" "}
                  FAQ{" "}
                </Link>
              </li>
            </LinkList>
          </FooterSection>
        </RightContainer>
      </div>

      <BottomBar>
        <Copyright>Copyright © 2024 Mankavit, All rights reserved.</Copyright>
        <BottomLinks>
          <Link to="/termsandcondition" style={{ textDecoration: "none" }}>
            {" "}
            Terms and Conditions{" "}
          </Link>
          <Link to="/privacypolicy" style={{ textDecoration: "none" }}>
            {" "}
            Privacy policy{" "}
          </Link>
          <Link to="/refundpolicy" style={{ textDecoration: "none" }}>
            {" "}
            Refund policy{" "}
          </Link>
          {/* <span>cookies</span> */}
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
}
