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
  flex-wrap: wrap;
  gap: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 10px 20px;
  font-size: 13px;
  box-sizing: border-box;
  transition: opacity 0.3s ease;

  button,
  select,
  input[type="range"] {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  /* ✅ Progress bar expands dynamically */
  input[type="range"] {
    flex: 1;
    min-width: 80px;
    accent-color: #f33;
  }

  span {
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    // flex-direction: column;
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
  // color: rgba(255, 255, 255, 0.3);
  color:red;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 1;
`;
