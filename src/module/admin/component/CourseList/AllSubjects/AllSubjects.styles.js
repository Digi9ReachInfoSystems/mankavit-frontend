import styled from 'styled-components';

export const TableWrapper = styled.div`
  // padding: 1rem; 
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;


`;

export const TableHead = styled.tr`
  background-color: #F3F3F3;
`;

export const TableHeader = styled.th`
  padding: 12px;
  font-weight: 500;
  color: #555;
  text-align: left;

    &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  color: #0C0D19;
  font-weight: 400;
  font-size: 12px;
  text-align: left;
`;
