import styled from 'styled-components';
import theme from '../../../../../theme/Theme';

export const FAQContainer = styled.div`
  padding: 20px;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
  margin-left: 30px;

  @media (max-width: 768px) {
    margin-left: 10px;
    padding: 15px;
  }

  @media (max-width: 576px) {
    margin-left: 0;
  } 
`;
export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(3)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  color: ${(props) => props.theme.colors.test};
  white-space: nowrap;
//   border-bottom: 1px solid ${(props) => props.theme.colors.test};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 12px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-left: 40px;

    @media (max-width: 768px) {
      margin-left: 0;
      text-align: center;
    }
  }
`;

export const ButtonTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;


`;

export const AddButton = styled.button`
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

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  min-width: 800px;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TableHead = styled.thead`
  background: #f8f8f8;
  color:${theme.colors.test};
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #fafafa;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eaeaea;
`;

export const TableCell = styled.td`
  padding: 12px;
  font-size: 1rem;
  font-weight:normal;
  color:${theme.colors.black};
  vertical-align: top;
`;

export const ToggleSwitch = styled.input`
  appearance: none;
  width: 36px;
  height: 20px;
  background: #ccc;
  border-radius: 20px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:checked {
    background: #06c755;
  }

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    transform: translateX(16px);
  }
`;

export const PaginationContainer = styled.div`
  margin: 20px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    margin-right: 0;
  }
`;

export const PageButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#007acc' : '#e0e0e0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    background-color: #007acc;
    color: #fff;
  }
`;

export const TableWrapper = styled.div`
  width: 95%;
  margin: 0 auto; 
  overflow-x: auto;

  @media (max-width: 768px) {
    border-radius: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(4)};
 margin-right:10px;

 @media (max-width: 768px) {
margin: 10px 5px;
  }
  `;

export const CreateButton = styled.button`
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};

    background:linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: 4px;
  font-family: ${(props) => props.theme.fonts.body};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  
 
`;
