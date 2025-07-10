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
  Copyright
} from "./Footer.styles";
import { MdPhone } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <FooterContainer>
      <div className="maincontainer">
        <LeftContainer>
          <FooterSection>
            <SectionTitle>Contact Us</SectionTitle>
            <ContactInfo>
              mankavit.clatcoaching11@gmail.com <br />
              {/* Address: [Insert Academy Address Here] */}
            </ContactInfo>
            <Phone><a href="tel:+91-7979700796"><MdPhone className="phoneicon" /> +91-7979700796</a></Phone>
            {/* <Phone><a href="tel:+02 5421234560"><MdPhone className="phoneicon"/> +02 5421234560</a></Phone> */}
          </FooterSection>

          <FooterSection>
            <SectionTitle>Quick Link</SectionTitle>
            <LinkList >
              <li><Link to="/login" style={{ textDecoration: "none" }} > Student Portal </Link></li>
              <li><Link to="/ourcoursedetails" style={{ textDecoration: "none" }}> Courses </Link></li>
              <li><Link to="/aboutus" style={{ textDecoration: "none" }}> About </Link></li>
              <li>
                <a
                  href="https://blog.mankavit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }} > Blog </a>
              </li>
            </LinkList>
          </FooterSection>
        </LeftContainer>

        <RightContainer>
          <FooterSection>
            <SectionTitle>Studying with Us</SectionTitle>
            <LinkList>
              <li><Link to="/ourcoursedetails" style={{ textDecoration: "none" }} > All Courses </Link></li>
              <li><Link to="/" style={{ textDecoration: "none" }} > FAQ </Link></li>
            </LinkList>
          </FooterSection>

          {/* <FooterSection>
            <SectionTitle>Newsletter</SectionTitle>
            <Maildescription>Subscribe our newsletter to get updated the latest news</Maildescription>
            <NewsletterInput type="email" placeholder="Enter Mail" /> <br />
            <SubscribeButton>
              SUBSCRIBE <FaArrowRightLong className="rightarrow" />
            </SubscribeButton>
          </FooterSection> */}
        </RightContainer>
      </div>

      <BottomBar>
        <Copyright>
          Copyright © 2024 Mankavit, All rights reserved.
        </Copyright>
        <BottomLinks>
          <span>Terms of service</span>
          <span>Privacy policy</span>
          <span>cookies</span>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
}
