import styled from 'styled-components';
 
export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;
 
export const Title = styled.h2`
font-size: 1.25rem;
    font-weight: 400;
    margin: 0;
    color: #0C0D19;

  .number{
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: #74787A;
  }
`;
 
export const Sort = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #B1B2B5;
`;

export const Name = styled.div`
  background: #F3F3F3;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  color: #6D6E75;
`;

 
export const DivRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap:10px;
`;
 
export const Seen = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #6D6E75;
  cursor: pointer;
`;
 
export const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  width: 40%;
//   padding-right:20px
`;
 
export const Tab = styled.button`
  padding: 4px 16px;
  border: none;
  outline: none;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  font-family: Button Small - SemiBold 12px - Lato;
  background-color: ${({ active }) => (active ? '#007bff' : 'white')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  height: 35px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  border-bottom: 2px solid ${({ active }) => (active ? '#E7E7E8' : 'white')};
 
  &:hover {
    background-color: ${({ active }) => (active ? '#0069d9' : '#e0e0e0')};
  }
`;
 
export const TableWrapper = styled.div`
  overflow-x: auto;
`;
 
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;
 
export const TableHeader = styled.thead`
  background-color: #f8f8f8;
`;
 
export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;
 
export const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: bold;
  color: #444;
`;
 
export const TableCell = styled.td`
  padding: 12px 15px;
  color: #555;
`;
 
 