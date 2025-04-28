import React, { useState, useRef, useEffect } from "react";
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
import { IoCallOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsChevronCompactDown } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import Youtube from '../../../assets/youtube.svg';
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Twitter from '../../../assets/twitter.svg';
import Whatsapp from '../../../assets/whatsapp.svg';
import Linkedin from '../../../assets/linkedin.svg';
import Telegram from '../../../assets/telegram.svg';

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (link) => {
    if (link === "Entrance") {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false);
      setActiveLink(link);
      navigate(`/${link.toLowerCase().replace(/\s/g, "-")}`);
    }
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  // Detect outside clicks
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

  // Highlight link based on location
  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    const formatted = currentPath.replace("-", " ").toLowerCase();
    const matched = [
      "courses",
      "about",
      "blog",
      "results",
      "prev. year ques.",
    ].find((link) => link.toLowerCase() === formatted);
    if (matched) setActiveLink(matched);
  }, [location]);

  return (
    <Container>
      <TopBar>
        <ToolbarContainer>
          <Headline>
            Headline Of Our Courses/<span>Live Classes</span>
          </Headline>
          <SocialIcons>
            <Image src={Youtube} alt="Youtube" />
            <Image src={Facebook} alt="Facebook" />
            <Image src={Instagram} alt="Instagram" />
            <Image src={Twitter} alt="Twitter" />
            <Image src={Whatsapp} alt="Whatsapp" />
            <Image src={Linkedin} alt="Linkedin" />
            <Image src={Telegram} alt="Telegram" />
          </SocialIcons>
        </ToolbarContainer>
      </TopBar>

      <NavbarMain>
        <NavBarContainer>
          <Logo>Mankavit</Logo>

          <div className="menu-container" ref={menuRef}>
            <NavLinks className={mobileMenuOpen ? "open" : ""}>
              {["Courses", "About", "Blog", "Results", "Prev. Year Ques."].map(
                (item) => (
                  <NavLinkItem
                    key={item}
                    className={activeLink === item ? "active" : ""}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </NavLinkItem>
                )
              )}
              <NavLinkItem
                ref={dropdownRef}
                className={activeLink === "Entrance" ? "active" : ""}
                onClick={() => handleNavClick("Entrance")}
              >
                Entrance <BsChevronCompactDown size={15} style={{fontWeight: "800"}} />
                {dropdownOpen && (
                  <Dropdown>
                    <DropdownItem onClick={() => navigate("/entrance/neet")}>
                      NEET
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate("/entrance/jee")}>
                      JEE
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate("/entrance/cuet")}>
                      CUET
                    </DropdownItem>
                  </Dropdown>
                )}
              </NavLinkItem>
            </NavLinks>

            {!isLoggedIn ? (
              <SignInButton onClick={handleLoginButton}>Sign In</SignInButton>
            ) : (
              <div className="dashboard-container">
                <IoNotificationsOutline className="notification-icon" />
                <DashboardButton onClick={handleLogout}>
                  Dashboard
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
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
