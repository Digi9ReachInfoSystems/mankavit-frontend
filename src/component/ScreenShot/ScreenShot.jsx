// src/components/AntiScreenshotGuard.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// A simple full‐screen overlay
const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  z-index: 9999;
`;

export default function AntiScreenshotGuard() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      // PrintScreen key code is "PrintScreen" in modern browsers
      if (e.key === 'PrintScreen') {
        setBlocked(true);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        setBlocked(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', () => setBlocked(true));

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', () => setBlocked(true));
    };
  }, []);

  // If blocked, render the overlay
  if (!blocked) return null;
  return (
    <Overlay onClick={() => setBlocked(false)}>
      <div>
        🔒 Screen capture is disabled.<br/>
        Click anywhere to continue.
      </div>
    </Overlay>
  );
}


