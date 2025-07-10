import styled, {  keyframes } from 'styled-components';
 
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(60px);
  }
`;
 export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  gap: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
`;

export const TabContentWrapper = styled.div`
  flex: 1;
  min-width: 50%;
  max-height: calc(100vh - 40px); // Adjust based on your padding
  overflow-y: auto;
  padding-right: 10px; // For scrollbar space
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
`;

export const StyledVideo = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
`;

export const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  position: relative;
  z-index: 0;
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
`;

export const OverlayText = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
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
  background-color: rgba(0,0,0,0.6);
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
`;


export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
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

      &:hover {
        color: #0056b3;
      }
    }
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

  h3 {
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 12px;
    color: #555;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
  }
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
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  transition: top 1s ease, left 1s ease;
`;

export const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;

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
  bottom: 20px;
  right: 20px;
  z-index: 20;
  padding: 8px 12px;
  border: none;
  background: rgba(0,0,0,0.6);
  color: white;
  border-radius: 6px;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.8);
  }
`;
