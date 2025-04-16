import styled from "styled-components";

export const GraphWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
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
`;

export const LegendContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #333;
  gap: 0.4rem;
`;

export const LegendDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color || "#000"};
  border-radius: 50%;
`;
