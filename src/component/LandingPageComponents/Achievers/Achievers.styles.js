import styled from 'styled-components';

export const AchieversSection = styled.section`
  padding: 60px 20px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const Description = styled.p`
  max-width: 800px;
  margin: 0 auto 40px;
  font-size: 18px;
  color: #555;
`;

// NEW: Horizontal slider container
export const CardSlider = styled.div`
  max-width: 98%;
  // margin: 0 auto;
  margin-left: auto;
  overflow-x: auto;
  display: flex;
  gap: 20px;
  padding-bottom: 10px;

  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  scroll-behavior: smooth;
  scrollbar-width: none;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  min-width: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  width: 400px;
  height: 300px;

  @media (max-width: 1024px) {
    width: 350px;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 150px;
  }

`;

export const Name = styled.h3`
  margin: 10px 0 5px;
  font-size: 18px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Achievement = styled.p`
  font-weight: bold;
  color: #111;
  margin-bottom: 15px;
`;

export const ProgressBarWrapper = styled.div`
  margin-top: 30px;
  height: 4px;
  width: 200px;
  background-color: #e0e0e0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
`;

export const ProgressBar = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: #2d79f3;
  border-radius: 4px;
  transition: width 0.3s ease; /* smooth width change */
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #ff0000;
`;