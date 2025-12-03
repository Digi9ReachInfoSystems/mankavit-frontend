// AdminVideoPlayerCustom.style.js
import styled from "styled-components";

/* Player wrapper */
export const PlayerContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 20px auto;
  background: #000;
  overflow: hidden;

  /* --- Normal mode: constrain to 16:9 --- */
  @media (min-width: 768px) {
    aspect-ratio: 16 / 9;
    min-height: 320px;
  }

  /* --- FULLSCREEN MODE --- */
  :fullscreen & {
    width: 100vw !important;
    height: 100vh !important;
    max-width: none !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 0 !important;
    background: black !important;
    z-index: 999999 !important;
    aspect-ratio: auto !important;
    min-height: auto !important;
  }

  &:-webkit-full-screen {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    aspect-ratio: auto !important;
    min-height: auto !important;
    margin: 0 !important;
    background: black !important;
    z-index: 999999 !important;
  }
`;

/* Video element: absolute-fill the container and scale nicely */
export const Video = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;

  ${PlayerContainer}:fullscreen &,
  ${PlayerContainer}:-webkit-full-screen & {
    width: 100vw !important;
    height: 100vh !important;
    object-fit: cover !important; /* Use 'cover' for fullscreen to fill the screen */
  }
`;

/* Controls overlay */
export const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.75) 100%);
  color: #fff;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
  transition: opacity 0.25s ease;
  opacity: 0; /* hidden by default */
  pointer-events: none;
  z-index: 20;

  button,
  select,
  input[type="range"] {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  select {
    &:focus {
      color: black;
      background: white;
    }
    option:checked {
      color: black;
      background: white;
    }
  }

  input[type="range"] {
    flex: 1;
    min-width: 20px;
    accent-color: #f33;
  }

  span {
    white-space: nowrap;
  }

  /* Show controls when hovering the player in normal mode */
  ${PlayerContainer}:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  /* Always show controls in fullscreen */
  ${PlayerContainer}:fullscreen &,
  ${PlayerContainer}:-webkit-full-screen & {
    opacity: 1;
    pointer-events: auto;
    bottom: 18px;
    padding: 14px 20px;
  }

  /* Responsive tweaks when NOT fullscreen */
  @media (max-width: 1100px) {
    ${PlayerContainer}:not(:fullscreen) & {
      flex-direction: row;
      align-items: center;
      input[type="range"] {
        max-width: 40px;
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    input[type="range"] {
      width: 100%;
    }
  }
`;

/* Volume area */
export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  input[type="range"] {
    width: 80px;
    min-width: 20px;
    accent-color: #f33;
  }

  span {
    cursor: pointer;
    user-select: none;
  }

  /* Hide volume on small screens to save space */
  @media (max-width: 850px) {
    display: none;
  }

  /* In fullscreen show volume even on small screens */
  ${PlayerContainer}:fullscreen &,
  ${PlayerContainer}:-webkit-full-screen & {
    display: flex;
  }
`;

/* Skip buttons (large left/right) */
export const SkipButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: none;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s, background 0.3s;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  &.left {
    left: 20px;
  }
  &.right {
    right: 20px;
  }

  ${PlayerContainer}:hover & {
    opacity: 1;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  /* In fullscreen make skip buttons visible too */
  ${PlayerContainer}:fullscreen &,
  ${PlayerContainer}:-webkit-full-screen & {
    opacity: 1;
  }
`;

/* Floating overlay text */
export const FloatingOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: red;
  font-size: 18px;
  font-weight: bold;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.4s ease;

  /* Show overlay only in fullscreen */
  ${PlayerContainer}:fullscreen &,
  ${PlayerContainer}:-webkit-full-screen & {
    opacity: 1;
    left: 2vw;
    top: 2vh;
    font-size: 1.25rem;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;