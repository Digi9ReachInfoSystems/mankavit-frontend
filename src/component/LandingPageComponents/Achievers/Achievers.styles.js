import styled from 'styled-components';

export const AchieversSection = styled.section`
  padding: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 55px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const Description = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 24px;
`;

/* ✅ NEW: Horizontal filter bar */
export const TopBar = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 4px;
  margin-top: 16px;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;

  /* hide scrollbar (WebKit) */
  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb { background: transparent; }

  /* improve focus ring visibility on keyboard nav */
  &:focus-within {
    // outline: 2px dashed #2d79f3;
    outline-offset: 6px;
  }
`;

export const Chip = styled.button`
  flex: 0 0 auto;
  scroll-snap-align: start;
  border: 1px solid ${({ $active }) => ($active ? '#2d79f3' : '#dcdcdc')};
  background: ${({ $active }) => ($active ? 'rgba(45,121,243,0.1)' : '#fff')};
  color: ${({ $active }) => ($active ? '#2d79f3' : '#333')};
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .2px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;

  &:hover { border-color: #2d79f3; }
  &:focus-visible {
    outline: 2px solid #2d79f3;
    outline-offset: 2px;
  }
`;

export const ChipCount = styled.span`
  display: inline-block;
  min-width: 20px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#2d79f3' : '#f0f0f0')};
  background: #f0f0f0;
  color: #111;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px;
  align-items: start;
  margin-top: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px 16px 20px;
  text-align: center;
`;

export const AvatarWrap = styled.div`
  width: 170px;
  height: 170px;
  margin: 0 auto 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;

  /* ring */
  padding: 6px;
  background: radial-gradient(circle at center, #fff 60%, transparent 61%),
              conic-gradient(#0494FA 0 100%);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
  @media (max-width: 480px) {
    width: 130px;
    height: 130px;
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f3f3;
`;

export const Name = styled.h3`
  margin: 10px 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  letter-spacing: .3px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Achievement = styled.p`
  font-weight: 600;
  color: #444;
  margin-bottom: 4px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ProgressBarWrapper = styled.div`
  margin-top: 24px;
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
  // background-color: #2d79f3;
  border-radius: 4px;
  transition: width 0.3s ease;
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

/* VIEW ALL button */
export const ViewAllButton = styled.button`
  margin: 22px auto 0;
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  background: #5b6ef5;
  color: #fff;
  font-weight: 700;
  letter-spacing: .5px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(91,110,245,.3);
  transition: transform .12s ease, box-shadow .12s ease;

  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); box-shadow: 0 6px 14px rgba(91,110,245,.25); }
`;
