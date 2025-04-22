import styled from "styled-components";

export const GraphWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  // width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1rem;
        margin: 1rem auto;
        width: 89%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  color: #0C0D19;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const DateSelector = styled.div`
  background: #f1f1f1;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  color: #6D6E75;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 400;
  color: #6D6E75;
  gap: 0.4rem;
`;

export const LegendDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color || "#000"};
  border-radius: 3px;
`;
