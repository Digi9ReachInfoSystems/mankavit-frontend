import styled from "styled-components";

export const EntranceMainContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px 20px 40px;
  background-color: #fff;
  color: #252525;

  @media (max-width: 768px) {
    width: 90%;
    padding: 16px;
  }
`;

export const EntranceBanner = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 14px;
  margin: 14px 0 18px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const EntranceTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 6px 0 8px;
  color: #252525;

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

export const EntranceLead = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 12px;
font-weight: normal;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  align-items: center;
  margin: 12px 0 6px;
`;

export const Chip = styled.span`
  display: inline-block;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1;
  border-radius: 999px;
  color: #1f3b72;
  background: rgba(0, 114, 255, 0.12);
  border: 1px solid rgba(0, 114, 255, 0.18);
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 16px 0 20px;
`;
