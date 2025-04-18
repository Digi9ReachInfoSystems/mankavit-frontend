// NotesTableStyles.js
import styled from "styled-components";

/* Outer container for the entire table section */
export const Container = styled.div`
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 40px;
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
/* Header row: top-left title and top-right sort */
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

/* The title text on the top-left (e.g., "See All Notes (14/24)") */
export const Title = styled.h3`
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;

/* Container for "Sort by: Name" on the top-right */
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
`;

/* "Sort by:" label */
export const SortLabel = styled.span`
  margin-right: 4px;
`;

/* A <select> for the sort options (e.g., Name, etc.) */
export const SortSelect = styled.select`
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 4px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

/* Wrapper for the table area (scroll horizontally on small screens) */
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  overflow-x: auto;
`;

/* Main table element */
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 950px; /* Ensures columns keep spacing on small screens */
`;

/* Table head row background */
export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.backgrounGrey};
`;

/* Table header cells */
export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(3)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 0.9rem;
  font-weight:normal;
  color: ${(props) => props.theme.colors.test};
  white-space: nowrap;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

/* Table body */
export const TableBody = styled.tbody``;

/* Individual table row */
export const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }
`;

/* Table cell */
export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(3)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  vertical-align: middle;

  /* For multiline text (note description), add these rules if needed */
  &:nth-child(2) {
    max-width: 250px;
    white-space: normal;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    margin-left: 6px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* Toggle switch container in each row for "Active" column */
export const SwitchContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 42px;
  height: 22px;
  background-color: ${(props) => (props.checked ? "#28a745" : props.theme.colors.grey)};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const SwitchHandle = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.checked ? "22px" : "2px")};
  width: 18px;
  height: 18px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 50%;
  transition: left 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;

/* Container for action icons (edit, delete, etc.) */
export const ActionsContainer = styled.div`
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

/* Bottom row with "Showing 1-10 from 100" and pagination */
export const BottomRow = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* "Showing X-Y from Z" text */
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
`;

/* Pagination container */
export const Pagination = styled.div`
  display: flex;
  gap: 4px;
`;

/* Individual page buttons */
export const PageButton = styled.button`
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.test};
  font-size: 0.9rem;
  padding: 4px 8px;
  cursor: pointer;

  &.active {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.primary};
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