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
  Caret,
  Brand,
  BrandLogo,
} from "./LandingHeader.styles";
// import { IoNotificationsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsChevronCompactDown } from "react-icons/bs";
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
import { getCookiesData } from "../../../utils/cookiesService";
import { getUserByUserId } from "../../../api/authApi";
import { getAllEntrances } from "../../../api/entranceApi";

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
        // getAllTickers() returns an array, not { data: [...] }
        const list = await getAllTickers();
        // console.log("Get all ticker response", list);
        setTickers(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Error fetching tickers:", error);
      }
    };
    fetchTickers();
  }, []); // ← only once on mount

  useEffect(() => {
    const loadEntrances = async () => {
      try {
        setEntrancesLoading(true);
        const data = await getAllEntrances(); // expects an array of entrances
        // If backend returns extra fields, we only need _id + title
        const list = Array.isArray(data) ? data : [];
        setEntrances(list);
      } catch (e) {
        console.error("Failed to load entrances", e);
        setEntrances([]);
      } finally {
        setEntrancesLoading(false);
      }
    };
    loadEntrances();
  }, []);

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
            .filter(
              ([, val]) => typeof val === "string" && val.startsWith("http")
            )
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
    if (link === "Blog") {
      window.open(
        "https://blog.mankavit.com/",
        "_blank",
        "noopener,noreferrer"
      );
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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // close dropdown whenever route changes (safety)
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // optional: close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setDropdownOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Highlight active nav link
  useEffect(() => {
    const map = {
      ourcoursedetails: "Courses",
      aboutus: "About",
      userblog: "Blog",
      results: "Results",
      entrance: "Entrances", // ← detail page /entrance/:id
      "prev-years-question": "Prev. Year Ques.",
    };
    setActiveLink(map[location.pathname.split("/")[1]] || null);
  }, [location]);

  return (
    <Container>
      <TopBar>
        <Brand>
     <Link to="/">
         <BrandLogo src={Mankavitlogo} alt="Mankavit" />
          </Link>
       </Brand>
        <ToolbarContainer>
          <Headline
            style={{
              fontSize: "20px",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div className="marquee" style={{ flex: 1 }}>
              {tickers.map((t) => (
                <span
                  key={t._id}
                  dangerouslySetInnerHTML={{ __html: t.title }}
                />
              ))}
            </div>
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
                  onClick={() =>
                    window.open(url, "_blank", "noopener,noreferrer")
                  }
                />
              );
            })}
          </SocialIcons>
        </ToolbarContainer>
      </TopBar>

      <NavbarMain>
        <NavBarContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo></Logo>
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
                // <Link to="/user/notification" key="notif">
                //   <IoNotificationsOutline className="notification-icon" />
                // </Link>
              ].map((item) => {
                const key = typeof item === "string" ? item : "notif";

                // Special rendering for Entrances (so clicks on items don't bubble)
                if (item === "Entrances") {
                  return (
                    <NavLinkItem
                      key={key}
                      className={activeLink === item ? "active" : ""}
                      ref={dropdownRef}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent body / parent clicks
                        setDropdownOpen((o) => !o);
                      }}
                      onMouseEnter={() =>
                        window.matchMedia("(hover: hover)").matches &&
                        setDropdownOpen(true)
                      }
                      onMouseLeave={() =>
                        window.matchMedia("(hover: hover)").matches &&
                        setDropdownOpen(false)
                      }
                    >
                      {item}
                      <Caret size={16} $open={dropdownOpen} />

                      {dropdownOpen && (
                        <Dropdown onClick={(e) => e.stopPropagation()}>
                          {entrancesLoading && (
                            <DropdownItem disabled>Loading…</DropdownItem>
                          )}

                          {!entrancesLoading && entrances.length === 0 && (
                            <DropdownItem disabled>No entrances</DropdownItem>
                          )}

                          {!entrancesLoading &&
                            entrances.map((ent) => (
                              <DropdownItem
                                key={ent._id}
                                onClick={(e) => {
                                  e.stopPropagation(); // ← avoid toggling parent
                                  setDropdownOpen(false); // ← close immediately
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

                // Default items
                return (
                  <NavLinkItem
                    key={key}
                    className={activeLink === item ? "active" : ""}
                    onClick={() =>
                      typeof item === "string" && handleNavClick(item)
                    }
                  >
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
