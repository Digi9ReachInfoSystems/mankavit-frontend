import styled from "styled-components";

export const PlayerContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 20px auto;
  background: #000;
  font-family: sans-serif;
  overflow: hidden;
`;

export const Video = styled.video`
  position: relative;
  width: 100%;
  display: block;
`;

export const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // flex-wrap: wrap;
  gap: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 10px 10px;
  font-size: 14px;
  box-sizing: border-box;
  transition: opacity 0.4s ease;
  opacity: 0;
  pointer-events: none;

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

  /* ✅ Only show on hover or active interaction */
  ${PlayerContainer}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
 /* Apply this only when NOT in fullscreen mode */
@media (max-width: 1100px) {
  ${PlayerContainer}:not(:fullscreen) & {
    flex-direction: row;
    align-items: stretch;

    input[type="range"] {
      max-width: 40px;
    }
  }
}


  @media (max-width: 600px) {
    flex-direction: row;
    align-items: stretch;
    input[type="range"] {
      width: 100%;
    }
  }
`;


export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  input[type="range"] {
    width: 80px;
    min-width: 20px;
    accent-color: #f33;
    // rotate: 90deg;
  }

  span {
    cursor: pointer;
    user-select: none;
  }
    @media (max-width: 850px) {
    display: none;
  }
`;

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
`;

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

  /* ✅ Show overlay only in fullscreen */
  :fullscreen & {
    opacity: 1;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;