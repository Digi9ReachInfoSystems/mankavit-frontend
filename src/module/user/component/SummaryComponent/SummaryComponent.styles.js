import styled from "styled-components";

export const Container = styled.div`
  max-width: 90%;
  margin: 80px auto;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    margin: 10px;
    max-width: 900px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #000000;
`;

export const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
`;

export const TableWrapper = styled.div`
  width: 100%;

  @media (max-width: 568px) {
    overflow-x: auto;
  }
`;


export const TableHead = styled.thead`
  background-color: #f2f4fc;
`;

export const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ccc;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const TableBody = styled.tbody`
  background-color: #ffffff;
`;


export const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
`;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const OkayButton = styled.button`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: #ffffff;
  font-size: 16px;
  padding: 12px 38px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0072ff, #00c6ff);
  }
`;
