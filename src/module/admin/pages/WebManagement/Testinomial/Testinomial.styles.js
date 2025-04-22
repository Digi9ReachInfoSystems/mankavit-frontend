import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
  color: #333;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 0;
      
  }
`;

export const BtnTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;

  


`;

export const AddTestButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  border: none;
  color: white;
  padding: 15px 40px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #007ecc;
  }

  svg {
    stroke-width: 2px;
  }

  @media (max-width: 768px) {
      margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;


export const Form = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    margin: 0.5rem 0 0.3rem;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: vertical;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;

  @media (max-width: 1000px) {
    margin-bottom: 1rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 800px;

  border-collapse: collapse;
  font-size: 0.95rem;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  background-color: #f2f2f2;
  color: #333;
`;

export const TableCell = styled.td`
  padding: 1rem;
  vertical-align: top;
`;

export const ViewLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  margin: 0 0.3rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;

  
  @media (max-width: 768px) {
  justify-content: flex-end;
  }
`;

export const PaginationButton = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#E5F2FF')};
  color: ${({ active }) => (active ? '#fff' : '#007BFF')};
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  margin: 0 0.2rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
  }
`;
