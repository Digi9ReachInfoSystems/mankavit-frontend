import React, { useEffect } from "react";
import { MdOutlineCopyright } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter, FaInstagram, } from "react-icons/fa6";
import { PiYoutubeLogo, PiLinkedinLogo } from "react-icons/pi";
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
import { getSocialMediaLinks } from "../../api/youtuubeApi";


const Footer = () => {
    const [socialLinks, setSocialLinks] = React.useState([]);


    useEffect(() => {
        const apiCaller = async () => {
            const response = await getSocialMediaLinks();
            console.log("social respons11e", response.data);
            setSocialLinks(response.data[0]);
        }
        apiCaller();
    }, [])
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
                    
                    <FooterListItem> <a style={{ textDecoration: "none" }} href={socialLinks.facebook}> <abbr title="Facebook" ><CiFacebook /></abbr></a></FooterListItem>
                    <FooterListItem> <a style={{ textDecoration: "none" }} href={socialLinks.twitter}> <abbr title="Twitter"><FaXTwitter /></abbr></a></FooterListItem>
                    <FooterListItem><a style={{ textDecoration: "none" }} href={socialLinks.instagram}><abbr title="Instagram"><FaInstagram /></abbr></a></FooterListItem>
                    <FooterListItem> <a style={{ textDecoration: "none" }} href={socialLinks.youtubeChannel}><abbr title="Youtube"><PiYoutubeLogo /></abbr></a></FooterListItem>
                    <FooterListItem><a style={{ textDecoration: "none" }} href={socialLinks.linkedin}> <abbr title="Linkedin"><PiLinkedinLogo /></abbr></a></FooterListItem>
                </FooterList>
            </FooterContainer>
        </FooterWrapper>
    );
};

export default Footer;