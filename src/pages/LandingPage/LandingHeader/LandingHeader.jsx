import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  TopBar,
  ToolbarContainer,
  Headline,
  SocialIcons,
  Image,
  NavbarMain,
  NavBarContainer,
  Logo,
  NavLinks,
  NavLinkItem,
  Dropdown,
  DropdownItem,
  SignInButton,
  Hamburger,
  DashboardButton,
} from "./LandingHeader.styles";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsChevronCompactDown } from "react-icons/bs";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Youtube from '../../../assets/youtube.svg';
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Twitter from '../../../assets/twitter.svg';
import Whatsapp from '../../../assets/whatsapp.svg';
import Linkedin from '../../../assets/linkedIn.svg';
import Telegram from '../../../assets/telegram.svg';
import { getCookiesData } from "../../../utils/cookiesService";
import { getUserByUserId } from "../../../api/authApi";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userDetails,setUserDetails]=useState(null);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("Header useEffect running");
    const apiCaller = async () => {
      const cookieData = getCookiesData();
      console.log("cookieData", cookieData);
      if (cookieData) {
        const userData = await getUserByUserId(cookieData.userId);
        if (userData) {
          console.log("userData", userData);
          setUserDetails(userData.user)
          setIsLoggedIn(true);
        }


      }
      //  const response=
    }
    apiCaller();
  }, [])
 

  const handleNavClick = (link) => {
    // Special routes
    if (link === "Courses") {
      setActiveLink(link);
      navigate("/ourcoursedetails");
      return;
    }
    if (link === "About") {
      setActiveLink(link);
      navigate("/aboutus");
      return;
    }
    if (link === "Prev. Year Ques.") {
      setActiveLink(link);
      navigate("/prev-years-question");
      return;
    }
    if (link === "Entrance") {
      setDropdownOpen((open) => !open);
      return;
    }
    // Default routes
    setDropdownOpen(false);
    setActiveLink(link);
    const path = link.toLowerCase().replace(/\.\s/g, "-").replace(/\s+/g, "-");
    navigate(`/${path}`);
  };

  const handleLoginButton = () => { navigate("/login") };
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Set active link based on URL
    const segment = location.pathname.split("/")[1] || "";
    if (segment === "ourcoursedetails") setActiveLink("Courses");
    else if (segment === "aboutus") setActiveLink("About");
    else if (segment === "blog") setActiveLink("Blog");
    else if (segment === "results") setActiveLink("Results");
    else if (segment === "prev-years-question") setActiveLink("Prev. Year Ques.");
    else setActiveLink(null);
  }, [location]);

  return (
    <Container>
      <TopBar>
        <ToolbarContainer>
          <Headline>
            Headline Of Our Courses/<span>Live Classes</span>
          </Headline>

          <SocialIcons>
            <Image
              src={Youtube}
              alt="YouTube"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://www.youtube.com/', '_blank')}
            />
            <Image
              src={Facebook}
              alt="Facebook"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://www.facebook.com/', '_blank')}
            />
            <Image
              src={Instagram}
              alt="Instagram"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                window.open('https://www.instagram.com/thevasudev_/', '_blank')
              }
            />
            <Image
              src={Twitter}
              alt="Twitter"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://twitter.com/', '_blank')}
            />
            <Image
              src={Whatsapp}
              alt="Whatsapp"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://wa.me/', '_blank')}
            />
            <Image
              src={Linkedin}
              alt="LinkedIn"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://www.linkedin.com/', '_blank')}
            />
            <Image
              src={Telegram}
              alt="Telegram"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open('https://t.me/', '_blank')}
            />
          </SocialIcons>

        </ToolbarContainer>
      </TopBar>

      <NavbarMain>
        <NavBarContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>Mankavit</Logo>
          </Link>

          <div className="menu-container" ref={menuRef}>
            <NavLinks className={mobileMenuOpen ? "open" : ""}>
              {[
                "Courses",
                "About",
                "Blog",
                "Results",
                "Prev. Year Ques.",
              ].map((item) => (
                <NavLinkItem
                  key={item}
                  className={activeLink === item ? "active" : ""}
                  onClick={() => handleNavClick(item)}
                  ref={item === "Entrance" ? dropdownRef : null}
                >
                  {item}
                  {item === "Entrance" && (
                    <BsChevronCompactDown size={15} style={{ fontWeight: "800" }} />
                  )}
                  {item === "Entrance" && dropdownOpen && (
                    <Dropdown>
                      <DropdownItem onClick={() => navigate("/entrance/neet")}>NEET</DropdownItem>
                      <DropdownItem onClick={() => navigate("/entrance/jee")}>JEE</DropdownItem>
                      <DropdownItem onClick={() => navigate("/entrance/cuet")}>CUET</DropdownItem>
                    </Dropdown>
                  )}
                </NavLinkItem>
              ))}
            </NavLinks>

            {!isLoggedIn ? (
              <SignInButton onClick={handleLoginButton}>Sign In</SignInButton>
            ) : (
              <div className="dashboard-container">
                <IoNotificationsOutline className="notification-icon" />
                <DashboardButton onClick={handleLogout}>
                  Dashboard
                  <img
                    src={userDetails?.photo_url}
                    alt="Profile"
                    className="profile-icon"
                  />
                </DashboardButton>
              </div>
            )}

            <Hamburger onClick={() => setMobileMenuOpen((prev) => !prev)}>
              <RxHamburgerMenu />
            </Hamburger>
          </div>
        </NavBarContainer>
      </NavbarMain>
    </Container>
  );
};

export default Header;
