// LandingHeader.styles.js
import styled, { keyframes, css } from "styled-components";
import { BsChevronCompactDown } from "react-icons/bs";

/* ============ Shared ============ */

export const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  --primary: #0072ff;
  --primary-50: rgba(0, 114, 255, 0.08);
  --gradient: linear-gradient(135deg, #00c6ff, #0072ff);
  --text: #252525;
  --muted: #333;
  --bg-soft: #ddd;
  --shadow-sm: 0 4px 10px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.12);
  color: var(--text);
`;

/* ============ Top Bar ============ */

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: var(--bg-soft);
  padding: 20px 40px;
  color: var(--muted);

  @media (max-width: 768px) {
    padding: 12px 20px;
    justify-content: flex-end;
    gap: 12px;
  }
`;

/* left: brand */
export const Brand = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

/* brand image */
export const BrandLogo = styled.img`
  display: block;
  height: clamp(72px, 5vw, 120px);
  width: auto;
  object-fit: contain;

  @media (max-width: 576px) {
    height: clamp(48px, 4vw, 64px);
  }
`;

/* ============ Headline / Marquee ============ */

/* marquee keyframes: move -50% (requires duplicated content in JSX) */
const marqueeKeyframes = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export const Headline = styled.div`
  /* center column: grow & shrink, but allow children to truncate */
  flex: 1 1 auto;
  min-width: 0;
  color: rgb(22, 78, 233);
  height: 2.5em;
  font-weight: 700;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: none; /* default hidden; will show on larger screens */

  .marquee {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* the track must be a single flex row and contain duplicated items in JSX */
  .track {
    display: flex;
    gap: 1rem;
    white-space: nowrap;
    will-change: transform;
    align-items: center;
    animation: ${marqueeKeyframes} 18s linear infinite;
  }

  .track:hover {
    animation-play-state: paused;
  }

  span {
    display: inline-block;
    padding: 0 0.5rem;
    white-space: nowrap;
  }

  /* show only on laptop and above (matches your previous behavior) */
  @media (min-width: 1024px) {
    display: block;
  }

  @media (max-width: 1023px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .track { animation: none; transform: translateX(0); }
  }
`;

/* ============ Social Icons ============ */

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 12px;
  flex: 0 0 auto;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 1320px) {
    gap: 12px;
  }

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const Image = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.25s ease, filter 0.25s ease;
  cursor: pointer;
  filter: saturate(0.9);

  &:hover {
    transform: translateY(-2px) scale(1.06);
    filter: saturate(1.15);
  }

  @media (max-width: 1636px) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 1320px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 1024px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 576px) {
    width: 16px;
    height: 16px;
  }
`;

/* ============ Navbar ============ */

export const NavbarMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: transparent;
  width: 90%;
  margin: 0 auto;

  .menu-container {
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 1024px) {
      gap: 15px;
    }
  }

  @media (max-width: 1320px) {
    padding: 10px 30px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px 30px;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export const Logo = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.5px;
  transition: transform 0.25s ease;
  will-change: transform;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 1636px) {
    font-size: 25px;
  }

  @media (max-width: 1320px) {
    font-size: 20px;
  }

  @media (max-width: 576px) {
    margin-left: 20px;
  }
`;

/* ============ Nav Links ============ */

export const NavLinks = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    gap: 20px;
    background-color: #ffffff;
    padding: 20px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    box-shadow: var(--shadow-md);
    width: 40%;
    height: 100%;
    align-items: flex-start;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    overflow-y: auto;

    &.open {
      display: flex;
      animation: slidePanel 0.25s ease forwards;
    }
  }
`;

const underline = css`
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 3px;
    width: 0%;
    background: var(--gradient);
    border-radius: 2px;
    transition: width 0.28s ease;
  }
`;

export const NavLinkItem = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 20px;
  color: var(--text);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-right: 12px;
  line-height: 1.3;
  text-transform: uppercase;
  transition: color 0.25s ease, transform 0.2s ease;

  ${underline}

  &:hover { color: var(--primary); transform: translateY(-2px); }
  &:hover::after { width: 100%; }
  &:active { color: var(--primary); transform: translateY(0); }
  &.active { color: var(--primary); font-weight: 600; &::after { width: 100%; } }
  &:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; border-radius: 6px; }

  @media (max-width: 1636px) { font-size: 16px; }
  @media (max-width: 1320px) { font-size: 14px; }

  @media (max-width: 768px) {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 8px;
    padding: 10px 0;
  }
`;

const dropdownIn = keyframes`
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 28px;
  left: 0;
  background-color: #fff;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(0, 114, 255, 0.12);
  backdrop-filter: saturate(1.2) blur(2px);
  border-radius: 10px;
  overflow: hidden;
  animation: ${dropdownIn} 0.22s ease forwards;
  transform-origin: top left;
  min-width: 200px;
  padding: 6px 0;

  @media (min-width: 769px) {
    z-index: 1100;
  }

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    min-width: 0;
    margin-top: 4px;
    box-shadow: none;
    border-radius: 8px;
    max-height: 55vh;
    overflow-y: auto;
  }
`;

export const DropdownItem = styled.div`
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--text);
  cursor: pointer;

  &:hover {
    color: var(--primary);
    background-color: var(--primary-50);
    padding-left: 22px;
  }

  &:active {
    color: #fff;
    background-image: var(--gradient);
  }
`;

/* ============ Buttons ============ */

export const SignInButton = styled.button`
  background: var(--gradient);
  color: #f5f5f5;
  border: none;
  padding: 20px 32px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.25s ease, opacity 0.2s ease;
  box-shadow: 0 6px 16px rgba(0, 114, 255, 0.25);

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(0, 114, 255, 0.32);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1636px) {
    font-size: 16px;
    padding: 16px 24px;
  }

  @media (max-width: 1320px) {
    font-size: 14px;
    padding: 12px 18px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 10px 15px;
  }
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 50px;
  align-items: center;
  padding: 18px 0px 18px 40px;
  background: transparent;
  width: 80%;

  @media (max-width: 1636px) {
    gap: 30px;
    width: 90%;
  }

  @media (max-width: 1320px) {
    padding: 10px 0px 10px 20px;
  }

  .dashboard-container {
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 1024px) {
      gap: 20px;
    }
  }

  .notification-icon {
    font-size: 24px;
    color: var(--text);
    cursor: pointer;
    border: none;
    transition: transform 0.2s ease, color 0.2s ease;

    &:hover {
      transform: translateY(-2px) scale(1.05);
      color: var(--primary);
    }

    @media (max-width: 1636px) {
      font-size: 20px;
    }

    @media (max-width: 1320px) {
      font-size: 16px;
    }
  }
`;

export const DashboardButton = styled.button`
  background: #ffffff;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 20px 32px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.2s ease, color 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 114, 255, 0.15);

  &:hover {
    background: var(--primary);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(0, 114, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1636px) {
    font-size: 16px;
    padding: 16px 24px;
  }

  @media (max-width: 1320px) {
    font-size: 14px;
    padding: 10px 18px;
  }

  .profile-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 2px #ffffff;
    transition: transform 0.2s ease;

    @media (max-width: 1636px) {
      width: 20px;
      height: 20px;
    }
  }

  &:hover .profile-icon {
    transform: scale(1.04);
  }
`;

export const Caret = styled(BsChevronCompactDown)`
  margin-left: 4px;
  transition: transform 160ms ease, opacity 160ms ease;
  transform: rotate(${(p) => (p.$open ? "180deg" : "0deg")});
  opacity: ${(p) => (p.$open ? 1 : 0.85)};
  flex-shrink: 0;
`;

export const Hamburger = styled.div`
  display: none;
  font-size: 28px;
  margin-left: 15px;
  color: var(--text);
  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover {
    transform: rotate(5deg) scale(1.04);
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 576px) {
    font-size: 24px;
    margin-left: 0;
  }
`;
