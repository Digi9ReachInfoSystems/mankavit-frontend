import React from "react";
import { MdOutlineCopyright } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter , FaInstagram, } from "react-icons/fa6";
import { PiYoutubeLogo,PiLinkedinLogo  } from "react-icons/pi";
import {
    FooterWrapper,
    FooterContent,
    FooterTitle,
    FooterLinks,
    FooterLink,
    FooterContainer,
    FooterList,
    FooterListItem
} from "./Footer.styles";


const Footer = () => {
    return (
        <FooterWrapper>
            <FooterContent>
                <FooterTitle>CopyRight <MdOutlineCopyright /> 2024 Mankavit </FooterTitle>
                <FooterLinks>
                    <FooterLink>Privacy Policy</FooterLink>
                    <FooterLink>Terms and Conditions</FooterLink>
                    <FooterLink>Cookie Policy</FooterLink>
                </FooterLinks>
            </FooterContent>
            <FooterContainer>
                <FooterList>
                    <FooterListItem><abbr title="Facebook"><CiFacebook /></abbr></FooterListItem>
                    <FooterListItem><abbr title="Twitter"><FaXTwitter /></abbr></FooterListItem>
                    <FooterListItem><abbr title="Instagram"><FaInstagram /></abbr></FooterListItem>
                    <FooterListItem><abbr title="Youtube"><PiYoutubeLogo /></abbr></FooterListItem>
                    <FooterListItem><abbr title="Linkedin"><PiLinkedinLogo /></abbr></FooterListItem>
                </FooterList>
            </FooterContainer>
        </FooterWrapper>
    );
};

export default Footer;