import styled from 'styled-components';
import theme from '../../../../../theme/Theme';

export const FAQContainer = styled.div`
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;

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
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.white};
  white-space: nowrap;
//   border-bottom: 1px solid ${(props) => props.theme.colors.test};

&:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

&:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
`;

export const Header = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
border-radius: 8px;
  padding: ${theme.spacing(2)} ${theme.spacing(4)} 0 ${theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  min-height: 720px;

    @media (max-width: 990px) {
}

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
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
  min-width: 900px;
`;

export const TableHead = styled.thead`
  background: ${theme.colors.black};
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #fafafa;
  }
`;

export const TableRow = styled.tr`
  &:hover {
    background: ${theme.colors.backgrounGrey};
  }
`;

export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(1.9)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};

   &:nth-child(2) {
    width: 40%;
    white-space: normal; /* allow text to wrap inside description */
    word-break: break-word;
  }
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
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
  overflow-x: auto;
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
//  margin-right:10px;

 @media (max-width: 768px) {
//  margin: 10px 5px;
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
  width: 15%;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #007ecc;
  }

  @media (max-width: 1024px) {
    width: 25%;
  }
      @media (max-width: 768px) {
      margin-right: 20px;
      width: 40%;
  }
 
  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 14px;
    width: 50%;
 
  }
  
 
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 1rem;

  svg {
    cursor: pointer;
    color: ${(props) => props.theme.colors.test};
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;
