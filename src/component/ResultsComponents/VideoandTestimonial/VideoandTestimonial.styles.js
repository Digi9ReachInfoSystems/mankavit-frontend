import styled from 'styled-components';

export const GallerySection = styled.div`
  width: min(1080px, 90%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 18px;

  @media (max-width: 768px) {
    gap: 14px;
  }
`;

export const VideoPlayer = styled.div`
  width: 100%;
  height: 420px;
  background: repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%) 50% / 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  font-size: 24px;
  color: #222;
  margin: 0 auto;
  box-shadow: 0 10px 28px rgba(16,24,40,.08);

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

export const VideoText = styled.div`
  font-weight: bold;
`;

/* -- Controls Row under the video -- */
export const ControlsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 6px auto 0;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

/* Shared pill button look for arrows */
const baseButton = `
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  transition: transform .12s ease, box-shadow .12s ease, background .12s ease, color .12s ease, border-color .12s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
    background: #f8fafc;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.10);
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    background: #f3f4f6;
    color: #6b7280;
    border-color: #e5e7eb;
  }

  svg {
    font-size: 16px;
  }
`;

export const LeftArrowButton = styled.button`
  ${baseButton}
  // background: #6ea9e4ff;
`;

export const RightArrowButton = styled.button`
  ${baseButton}
`;

/* (These remain in case you still use them elsewhere) */
export const ThumbnailSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
`;

export const ThumbnailCard = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  cursor: pointer;
`;

export const MoreOverlay = styled.div`
  position: absolute; inset: 0;
  background: rgba(0,0,0,.5);
  color: #fff;
  display: grid; place-items: center;
  font-size: 16px; font-weight: 700; text-align: center;
  border-radius: 8px;
`;

export const Arrows = styled.div``;
