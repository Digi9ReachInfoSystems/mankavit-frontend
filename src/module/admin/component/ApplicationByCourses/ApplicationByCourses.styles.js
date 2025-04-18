import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
//   height: 0px;
//   max-width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
font-size: 1.25rem;
    font-weight: 400;
    margin: 0;
    color: #0C0D19;
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
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 16px;
  gap: 40px;

  .horizotal{
  width: 1px;
  height: 230px;
  background: #ccc;
  margin-top:-30px
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
`;

export const Total = styled.div`
  position: absolute;
  top: 14rem;
  left: 60%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 200px;
`;

export const Legend = styled.div`
//   margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
   margin-top:20px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #374151;

  .legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  }

  .legend-label {
  font-size: 12px;
  font-weight: 300;
  color: #6D6E75;
  }

  strong {
    font-size: 12px;
    font-weight: 600;
    color: #111827;
  }
`;

export const ColorDot = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  background: ${({ color }) => color};
`;

export const PieTitle = styled.h3`
  font-size: 20px;
  color: #0C0D19;
  margin-bottom: 10px;
`;

export const PiePara = styled.p`
  font-size: 14px;
  color: #6b7280;
`;
