import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'; // For fullscreen detection
import styled from 'styled-components';

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

const OverlayText = styled.div`
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 4px 10px;
  border-radius: 4px;
  pointer-events: none;
  transition: top 0.5s, left 0.5s;
  z-index: 10;
`;

const CoursesLiveclassWithReactPlayer = (url) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ top: 20, left: 20 });

  // Randomly move overlay
  useEffect(() => {
    const interval = setInterval(() => {
      if (isFullscreen) {
        const top = Math.floor(Math.random() * 80); // up to 80% of container height
        const left = Math.floor(Math.random() * 80); // up to 80% of container width
        setPosition({ top, left });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isFullscreen]);

  // Fullscreen detection
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', onFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', onFullscreenChange);
      }
    };
  }, []);

  return (
    <PlayerWrapper ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing
        controls
        width="100%"
        height="100%"
        onEnded={() => {// console.log("Video ended")
        }}
        onError={() => {// console.log("Video error")
        }}
      />

      {isFullscreen && (
        <OverlayText style={{
          top: `${position.top}%`,
          left: `${position.left}%`
        }}>
          User123 knkednfdk
        </OverlayText>
      )}
    </PlayerWrapper>
  );
};

export default CoursesLiveclassWithReactPlayer;
