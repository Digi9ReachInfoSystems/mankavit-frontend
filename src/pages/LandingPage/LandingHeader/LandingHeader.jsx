// LandingHeader.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  TopBar,
  Brand,
  BrandLogo,
  Headline,
  ToolbarContainer,
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
  Caret,
} from "./LandingHeader.styles";

import { getCookiesData } from "../../../utils/cookiesService";
import { getUserByUserId } from "../../../api/authApi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllTickers } from "../../../api/tickerApi";
import Mankavitlogo from "../../../assets/mankavitlogo.png";
// SVG Icons
import Youtube from "../../../assets/youtube.svg";
import Facebook from "../../../assets/facebook.svg";
import Instagram from "../../../assets/instagram.svg";
import Twitter from "../../../assets/twitter.svg";
import Whatsapp from "../../../assets/whatsapp.svg";
import Linkedin from "../../../assets/linkedIn.svg";
import Telegram from "../../../assets/telegram.svg";
import { getSocialMediaLinks } from "../../../api/youtuubeApi";
import { getAllEntrances } from "../../../api/entranceApi";

const iconMap = {
  youtubechannel: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  whatsapp: Whatsapp,
  linkedin: Linkedin,
  telegram: Telegram,
};

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [tickers, setTickers] = useState([]);
  const [entrances, setEntrances] = useState([]);
  const [entrancesLoading, setEntrancesLoading] = useState(false);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const list = await getAllTickers();
        setTickers(Array.isArray(list) ? list : []);
      } catch (err) {
        setTickers([]);
      }
    };
    fetchTickers();
  }, []);

  useEffect(() => {
    const loadEntrances = async () => {
      try {
        setEntrancesLoading(true);
        const data = await getAllEntrances();
        setEntrances(Array.isArray(data) ? data : []);
      } catch (e) {
        setEntrances([]);
      } finally {
        setEntrancesLoading(false);
      }
    };
    loadEntrances();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const cookieData = getCookiesData();
      if (cookieData?.userId) {
        try {
          const userData = await getUserByUserId(cookieData.userId);
          if (userData?.user) {
            setUserDetails(userData.user);
            setIsLoggedIn(true);
          }
        } catch (e) {
          setIsLoggedIn(false);
        }
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const response = await getSocialMediaLinks();
        const raw = response?.data?.[0];
        if (raw && typeof raw === "object") {
          const links = Object.entries(raw)
            .filter(([, val]) => typeof val === "string" && val.startsWith("http"))
            .map(([platform, url]) => {
              let key = platform.toLowerCase().replace(/\s/g, "");
              if (key === "teligram") key = "telegram";
              return { platform: key, url };
            });
          setSocialLinks(links);
        }
      } catch (err) {
        setSocialLinks([]);
      }
    };

    fetchUser();
    fetchSocialLinks();
  }, []);

  const handleNavClick = (link) => {
    if (link === "Blog") {
      window.open("https://blog.mankavit.com/", "_blank", "noopener,noreferrer");
      return;
    }
    const routeMap = {
      Home: "/",
      Courses: "/ourcoursedetails",
      Blog: "/userblog",
      About: "/aboutus",
      Results: "/results",
      "Prev. Year Ques.": "/prev-years-question",
    };
    if (routeMap[link]) return navigate(routeMap[link]);
    if (link === "Entrances") return setDropdownOpen((o) => !o);

    const path = link.toLowerCase().replace(/\.\s/g, "-").replace(/\s+/g, "-");
    navigate(`/${path}`);
  };

  const handleLoginButton = () => navigate("/login");
  const handleLogout = () => navigate("/user");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setDropdownOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const map = {
      ourcoursedetails: "Courses",
      aboutus: "About",
      userblog: "Blog",
      results: "Results",
      entrance: "Entrances",
      "prev-years-question": "Prev. Year Ques.",
    };
    setActiveLink(map[location.pathname.split("/")[1]] || null);
  }, [location]);

  return (
    <Container>
      {/* TopBar: three columns - Brand | Headline (flex-grow) | SocialIcons */}
      <TopBar>
        <Brand>
          <Link to="/" style={{ textDecoration: "none" }}>
            <BrandLogo src={Mankavitlogo} alt="Mankavit" />
          </Link>
        </Brand>

        {/* Headline is center, takes available space and won't overflow logo */}
        {!isLoggedIn && (
          <Headline aria-hidden>
            <div className="marquee">
              <div className="track">
                {tickers.map((t) => (
                  <span key={`a-${t._id}`} dangerouslySetInnerHTML={{ __html: t.title }} />
                ))}
                {tickers.map((t) => (
                  <span key={`b-${t._id}`} dangerouslySetInnerHTML={{ __html: t.title }} />
                ))}
              </div>
            </div>
          </Headline>
        )}

        <ToolbarContainer>
          <SocialIcons>
            {socialLinks.map(({ platform, url }) => {
              const iconSrc = iconMap[platform];
              if (!iconSrc) return null;
              return (
                <Image
                  key={platform}
                  src={iconSrc}
                  alt={platform}
                  onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                />
              );
            })}
          </SocialIcons>
        </ToolbarContainer>
      </TopBar>

      {/* Navbar below */}
      <NavbarMain>
        <NavBarContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>

          <div className="menu-container" ref={menuRef}>
            <NavLinks className={mobileMenuOpen ? "open" : ""}>
              {[
                "Home",
                "Courses",
                "About",
                "Blog",
                "Results",
                "Entrances",
                "Prev. Year Ques.",
              ].map((item) => {
                const key = typeof item === "string" ? item : "notif";
                if (item === "Entrances") {
                  return (
                    <NavLinkItem
                      key={key}
                      className={activeLink === item ? "active" : ""}
                      ref={dropdownRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen((o) => !o);
                      }}
                      onMouseEnter={() =>
                        window.matchMedia("(hover: hover)").matches && setDropdownOpen(true)
                      }
                      onMouseLeave={() =>
                        window.matchMedia("(hover: hover)").matches && setDropdownOpen(false)
                      }
                    >
                      <span style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {item}
                        <Caret size={16} $open={dropdownOpen} />
                      </span>

                      {dropdownOpen && (
                        <Dropdown onClick={(e) => e.stopPropagation()}>
                          {entrancesLoading && <DropdownItem disabled>Loading…</DropdownItem>}
                          {!entrancesLoading && entrances.length === 0 && <DropdownItem disabled>No entrances</DropdownItem>}
                          {!entrancesLoading &&
                            entrances.map((ent) => (
                              <DropdownItem
                                key={ent._id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDropdownOpen(false);
                                  navigate(`/entrance/${ent._id}`);
                                }}
                              >
                                {ent.title}
                              </DropdownItem>
                            ))}
                        </Dropdown>
                      )}
                    </NavLinkItem>
                  );
                }

                return (
                  <NavLinkItem key={key} className={activeLink === item ? "active" : ""} onClick={() => handleNavClick(item)}>
                    {item}
                  </NavLinkItem>
                );
              })}
            </NavLinks>

            {!isLoggedIn ? (
              <SignInButton onClick={handleLoginButton}>Sign In</SignInButton>
            ) : (
              <div className="dashboard-container">
                <DashboardButton onClick={handleLogout}>
                  Dashboard
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${userDetails?.photo_url}`}
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
