import styled from "styled-components";
import theme from "../../../../../theme/Theme"; // adjust path as needed

export const Container = styled.div`
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 40px;
border-radius: 8px;
justify-content: center;
// align-items: center;
  width: 95%;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};

    @media (max-width: 990px) {
  width: 90%;
}

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;


export const HeaderRow = styled.div`
  margin-bottom: ${theme.spacing(2)};
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.black};
  font-size: 1.25rem;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-left: 1px solid ${theme.colors.grey};
  border-right: 1px solid ${theme.colors.grey};
`;

export const TableHead = styled.thead`
  background: ${theme.colors.backgrounGrey};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${theme.spacing(2)};
  color: ${theme.colors.test};
  font-weight: 600;
  font-size: 1rem;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  background: ${theme.colors.secondary};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.backgrounGrey};
  }
`;

export const TableCell = styled.td`
  padding: ${theme.spacing(2)};
  border-bottom: 1px solid ${theme.colors.grey};
  color: ${theme.colors.black};
  font-size: 0.9rem;
`;

export const ViewLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;



export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(4)};
 margin-right:10px;

 @media (max-width: 768px) {
margin: 10px 5px;s
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



// Pagination controls container
export const PaginationContainer = styled.div`
  margin-top: ${theme.spacing(3)};
  display: flex;
  justify-content: center;
  gap: ${theme.spacing(1)};
`;

// Individual page button
export const PageButton = styled.button`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  background: ${({ active }) =>
    active ? theme.colors.primary : theme.colors.secondary};
  color: ${({ active }) =>
    active ? theme.colors.secondary : theme.colors.black};
  border-radius: ${theme.spacing(0.5)};
  cursor: pointer;
  transition: background 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${theme.colors.vividblue};
    color: ${theme.colors.secondary};
  }
`;