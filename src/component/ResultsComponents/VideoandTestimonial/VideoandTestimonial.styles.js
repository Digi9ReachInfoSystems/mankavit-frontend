import styled from 'styled-components';

export const GallerySection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const VideoPlayer = styled.div`
    width: 80%;
    height: 400px;
    background: repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%) 50% / 40px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 24px;
    color: #222;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: 90%;
        height: 300px;
    }

    @media (max-width: 480px) {
        height: 200px;
    }
`;

export const VideoText = styled.div`
    font-weight: bold;
`;

export const ThumbnailSlider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    // overflow-x: auto;
    position: relative;

    // @media (max-width: 480px) {
    //     gap: 0px;
    // }
`;

export const ThumbnailCard = styled.div`
    position: relative;
    // flex: 0 0 auto;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;

    @media (max-width: 768px) {
        // flex: 0 0 auto;
    }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  cursor: pointer;
`;


export const MoreOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    width: 90%;
    height: 100px;
    border-radius: 8px;
`;

// export const ArrowButton = styled.button`
//     background: white;
//     border: 1px solid #ddd;
//     border-radius: 50%;
//     width: 30px;
//     height: 30px;
//     cursor: pointer;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 18px;
// `;

export const Arrows = styled.div`

`;

export const LeftArrowButton = styled.div`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const RightArrowButton = styled.div`
 background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
