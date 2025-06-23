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

// SVG Icons
import Youtube from "../../../assets/youtube.svg";
import Facebook from "../../../assets/facebook.svg";
import Instagram from "../../../assets/instagram.svg";
import Twitter from "../../../assets/twitter.svg";
import Whatsapp from "../../../assets/whatsapp.svg";
import Linkedin from "../../../assets/linkedIn.svg";
import Telegram from "../../../assets/telegram.svg";
import { getSocialMediaLinks } from "../../../api/youtuubeApi";
import { getCookiesData } from "../../../utils/cookiesService";
import { getUserByUserId } from "../../../api/authApi";

const iconMap = {
  youtubechannel: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  whatsapp: Whatsapp,
  linkedin: Linkedin,
  telegram: Telegram, // note: we normalise "teligram" ➜ "telegram" below
};

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    /** Fetch user details if cookies exist */
    const fetchUser = async () => {
      const cookieData = getCookiesData();
      if (cookieData?.userId) {
        const userData = await getUserByUserId(cookieData.userId);
        if (userData?.user) {
          setUserDetails(userData.user);
          setIsLoggedIn(true);
        }
      }
    };

    /** Fetch social-media links */
    const fetchSocialLinks = async () => {
      try {
        const response = await getSocialMediaLinks();
        const raw = response?.data?.[0];
        if (raw && typeof raw === "object") {
          const links = Object.entries(raw)
            .filter(([, val]) => typeof val === "string" && val.startsWith("http"))
            .map(([platform, url]) => {
              let key = platform.toLowerCase().replace(/\s/g, "");
              if (key === "teligram") key = "telegram"; // backend typo
              return { platform: key, url };
            });
          setSocialLinks(links);
        }
      } catch (err) {
        console.error("Social link fetch failed", err);
      }
    };

    fetchUser();
    fetchSocialLinks();
  }, []);

 
  const handleNavClick = (link) => {
    const routeMap = {
      Courses: "/ourcoursedetails",
      Blog: "/userblog",
      About: "/aboutus",
      "Prev. Year Ques.": "/prev-years-question",
    };
    if (routeMap[link]) return navigate(routeMap[link]);
    if (link === "Entrance") return setDropdownOpen((o) => !o);

    const path = link.toLowerCase().replace(/\.\s/g, "-").replace(/\s+/g, "-");
    navigate(`/${path}`);
  };

  const handleLoginButton = () => navigate("/login");
  const handleLogout = () => navigate("/user");

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Highlight active nav link
  useEffect(() => {
    const map = {
      ourcoursedetails: "Courses",
      aboutus: "About",
      userblog: "Blog",
      results: "Results",
      "prev-years-question": "Prev. Year Ques.",
    };
    setActiveLink(map[location.pathname.split("/")[1]] || null);
  }, [location]);

  // ────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────
  return (
    <Container>
      <TopBar>
        <ToolbarContainer>
          <Headline>
            Headline Of Our Courses/<span>Live Classes</span>
          </Headline>

          <SocialIcons>
            {socialLinks.map(({ platform, url }) => {
              const iconSrc = iconMap[platform];
              if (!iconSrc) return null;
              return (
                <Image
                  key={platform}
                  src={iconSrc}
                  alt={platform}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                />
              );
            })}
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
              {["Courses", "About", "Blog", "Results", "Prev. Year Ques.", <IoNotificationsOutline className="notification-icon" />].map((item) => (
                <NavLinkItem
                  key={item}
                  className={activeLink === item ? "active" : ""}
                  onClick={() => handleNavClick(item)}
                  ref={item === "Entrance" ? dropdownRef : null}
                >
                  {item}
                  {item === "Entrance" && <BsChevronCompactDown size={15} style={{ fontWeight: 800 }} />}
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
                <DashboardButton onClick={handleLogout}>
                  Dashboard
                  <img src={userDetails?.photo_url} alt="Profile" className="profile-icon" />
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
