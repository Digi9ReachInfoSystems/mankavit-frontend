// QuestionPaper.style.js
import styled from "styled-components";
import theme from "../../../../../theme/Theme";

export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
  overflow-x: auto;
    margin-bottom: 80px;

`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  thead th:nth-child(1),
  tbody td:nth-child(1) { width: 25%; }  /* Title */

  thead th:nth-child(2),
  tbody td:nth-child(2) { width: 25%; }  /* Year */

  thead th:nth-child(3),
  tbody td:nth-child(3) { width: 25%; }  /* View PDF */

  thead th:nth-child(4),
  tbody td:nth-child(4) { width: 25%; }  /* Actions */
`;


export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.black};
`;


export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.white};
  white-space: nowrap;


  &:nth-child(2) {
    width: 40%;
    
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  background: ${theme.colors.secondary};
  transition: background 0.2s ease;

  /* on hover, turn light grey */
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

export const PdfLink = styled.a`
    margin-left: 6px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
`;

// Actions cell wrapper
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

// Edit button
export const EditButton = styled.button`
background:none;
  color: ${theme.colors.black};
  border: none;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  cursor: pointer;
 
`;

// Delete button
export const DeleteButton = styled.button`
  background: transparent;
  color: ${theme.colors.black};
border: none;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
//   border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  cursor: pointer;
  }
`;

export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
// justify-content: center;
// align-items: center;
  // width: 95%;
  padding: ${theme.spacing(2)} ${theme.spacing(4)} 0 ${theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  min-height: 720px;

    @media (max-width: 990px) {
  // width: 90%;
}

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
  }
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


export const PaginationContainer = styled.div`
  margin-top: ${theme.spacing(3)};
  display: flex;
  justify-content: center;
  gap: ${theme.spacing(1)};
`;

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


export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

// The title on the left (e.g., "See All Course (14/24)")
export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;