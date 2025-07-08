// src/components/AntiScreenshotGuard.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 9999;
  pointer-events: none;
`;

export default function AntiScreenshotGuard() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const block = () => setBlocked(true);

    // 1) Capture PrintScreen
    const onKeyDown = (e) => {
      if (e.key === 'PrintScreen') block();
      if(e.key === 'Win' && e.key === 'Shift') block();
      if(e.key === 'Win') block();
      if(e.key === 'Cmd') block();
      if(e.key == "Meta") block();

      // 2) Capture Win + Shift + S (Snip & Sketch)
      if (
        (e.key === 'S' && e.shiftKey && e.metaKey) ||  // macOS: Cmd+Shift+S
        // (e.key === 'S' && 
            (e.shiftKey && e.code.startsWith('Key') && navigator.platform.includes('Win'))
      ) {
        block();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    // 3) If they Alt-Tab or click away
    window.addEventListener('blur', block);
    // 4) If the tab becomes hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) block();
    });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('blur', block);
      document.removeEventListener('visibilitychange', block);
    };
  }, []);

  // Once blocked, never clear it
  if (!blocked) return null;
  return (
    <Overlay>
      ⚠️ Screen capture is disabled.<br/>
      Please reload the page to continue.
    </Overlay>
  );
}
