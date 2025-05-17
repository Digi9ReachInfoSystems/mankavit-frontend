import styled from 'styled-components';

export const AchieversSection = styled.section`
  padding: 60px 20px;
  text-align: center;

  @media (max-width: 768px) {
      padding: 20px 10px;
  }
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 400;
  margin: 0 0 10px 40px;
  text-align: left;

  @media (max-width: 768px) {
      font-size: 32px;
      margin: 0 0 10px 20px;
  }

  @media (max-width: 480px) {
      font-size: 24px;
      margin: 0 0 10px 0px;
  }
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const Description = styled.p`
//   max-width: 800px;
  margin: 40px;
  font-size: 24px;
  font-weight: 400;
  color: #303030;
  text-align: left;

  @media (max-width: 768px) {
      font-size: 16px;
      margin: 20px;
  }

  @media (max-width: 480px) {
      font-size: 14px;
      margin: 0px;
  }
`;

export const Filterbar = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px 40px;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin: 20px;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin: 20px 0px;
  }
`;

export const FilterButton = styled.button`
background: ${({ active }) =>
  active
    ? 'linear-gradient(to right, #0DCAF0, #007BFF)'
    : '#D3D3D3'};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;

  @media (max-width: 768px) {
      font-size: 14px;
      padding: 0.3rem 0.8rem;
      border-radius: 8px;
  }
`;

// NEW: Horizontal slider container
export const CardSlider = styled.div`
  max-width: 100%;
  // margin: 0 auto;
  margin-left: 40px;
  overflow-x: auto;
  display: flex;
  gap: 20px;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    margin-left: 0px;
  }

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
  width: 350px;
  height: 250px;

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

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const ProgressBar = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: #2d79f3;
  border-radius: 4px;
  transition: width 0.3s ease; /* smooth width change */
`;

