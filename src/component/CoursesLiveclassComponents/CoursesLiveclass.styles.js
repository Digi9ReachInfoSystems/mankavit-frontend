import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(60px); }
`;

const bp = {
  sm: '600px',
  md: '768px',
  lg: '1024px',
};

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  gap: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;

  /* 👉 Stack on mobile */
  @media (max-width: ${bp.md}) {
    flex-direction: column;
    padding: 12px;
    gap: 12px;
  }
`;

export const TabContentWrapper = styled.div`
  flex: 1;
  min-width: 50%;
  max-height: calc(100vh - 40px); /* Adjust based on your padding */
  overflow-y: auto;
  padding-right: 10px; /* For scrollbar space */

  /* 👉 Full width + normal flow on mobile */
  @media (max-width: ${bp.md}) {
    min-width: 100%;
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }
`;

export const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;

  /* 👉 Edge-to-edge on mobile */
  @media (max-width: ${bp.md}) {
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
`;

export const StyledVideo = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #000; /* avoids white bars around video */
`;

export const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  position: relative;
  z-index: 0;
`;

export const ControlsRow = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between; /* left + right */
  padding: 0 16px;
  z-index: 5;
`;

export const ControlsLeft = styled.div`
  display: flex;
  gap: 10px;
`;

export const ControlsRight = styled.div`
  display: flex;
`;

export const ForwardButton = styled.button`
  background: rgba(34, 34, 34, 0.7);
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: rgba(68, 68, 68, 0.9);
  }
`;

export const BackwardButton = styled(ForwardButton)``;

// export const FullscreenButton = styled(ForwardButton)`
//   font-size: 18px;
// `;

export const ExitFullscreenButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(34, 34, 34, 0.7);
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
  &:hover {
    background: rgba(68, 68, 68, 0.9);
  }
`;



export const TopBar = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  z-index: 2;
  color: white;

  @media (max-width: ${bp.sm}) {
    top: 10px;
    left: 10px;
    right: 10px;
  }
`;

export const OverlayText = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;

    @media (max-width: ${bp.sm}) {
      font-size: 14px;
    }
  }
`;

export const Tag = styled.span`
  margin-top: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  display: inline-block;
`;

export const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

export const BottomTitle = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-weight: 500;
  font-size: 16px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6);

  @media (max-width: ${bp.sm}) {
    bottom: 16px;
    font-size: 13px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;

  /* 👉 Keep tabs visible & usable on mobile */
  @media (max-width: ${bp.md}) {
    position: sticky;
    top: 0;
    z-index: 5;
    background: #fff;
    padding: 8px 0;
    margin: 12px 0;
    border-bottom: 1px solid #eee;
    overflow-x: auto;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  text-decoration: none;
  background-color: ${({ active }) => (active ? '#007bff' : '#e0e0e0')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s;
  border: none;
  white-space: nowrap;

  @media (max-width: ${bp.sm}) {
    padding: 8px 14px;
    font-size: 14px;
  }
`;

export const ContentText = styled.div`
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;

  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .pdf-title {
      display: flex;
      align-items: center;
      font-weight: 500;
    }
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  .download-link {
    color: #007BFF;
    text-decoration: none;
  }

  .download-link:hover {
    color: #0056b3;
  }

  p {
    margin-top: 8px;
    font-size: 14px;
  }
`;

export const NoteItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #fff;

  h3 { margin-bottom: 8px; }
  p { margin-bottom: 12px; color: #555; }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover { background: #0056b3; }
`;

export const CompletedBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: green;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

export const MovingOverlay = styled.div`
  position: absolute;
  z-index: 10;
  color: #c90b0bff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 18px;
  pointer-events: none;
  transition: top 1s ease, left 1s ease;

  @media (max-width: ${bp.sm}) {
    font-size: 12px;
  }
`;

export const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9; /* keeps good height on mobile */

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &:fullscreen,
  &:-webkit-full-screen,
  &:-moz-full-screen,
  &:-ms-fullscreen {
    width: 100vw;
    height: 100vh;

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
export const FullscreenButton = styled.button`
  position: absolute;
  /* move from top-right to bottom-right */
  top: auto;            /* <-- reset top */
  bottom: 20px;         /* <-- anchor to bottom */
  right: 25px;

  z-index: 50;
  padding: 8px 12px;
  border-radius: 8px;
  // background: rgba(0,0,0,0.55);
  color: #fff;
  // border: 1px solid rgba(255,255,255,0.35);
  // backdrop-filter: blur(2px);
  cursor: pointer;
  font-weight: 600;
  line-height: 1;

  @media (max-width: 600px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

export const FullscreenInlineButton = styled(FullscreenButton)`
  position: static;   /* behaves like a normal button for the centered row */
  bottom: auto;
  right: auto;
`;