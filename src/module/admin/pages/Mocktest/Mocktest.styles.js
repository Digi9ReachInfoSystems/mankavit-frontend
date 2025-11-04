// NotesTableStyles.js
import styled from "styled-components";

/* Outer container for the entire table section */
export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(4)} 0 ${(props) => props.theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  min-height: 800px;
border-radius: 12px;

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)};
  }
`;
/* Header row: top-left title and top-right sort */
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing(1)};
  }
`;

/* The title text on the top-left (e.g., "See All Notes (14/24)") */
export const Title = styled.h3`
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.25rem;
  // font-weight: 700;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;

/* Container for "Sort by: Name" on the top-right */
export const SortByContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-width: 180px; /* prevents collapse on small screens */

  @media (max-width: 768px) {
    flex: 1 1 100%;
    justify-content: space-between;
    // min-width: auto;
  }
`;

/* "Sort by:" label */
export const SortLabel = styled.span`
 white-space: nowrap;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

/* A <select> for the sort options (e.g., Name, etc.) */
import { Select } from "antd";

export const ResponsiveAntSelect = styled(Select)`
  min-width: 160px;

  @media (max-width: 768px) {
    width: 100% !important;      /* full width on mobile */
  }

  .ant-select-selector {
    border-radius: 4px;
  }
`;

export const SortSelect = styled.select`
  flex: 1;
  min-width: 140px;
  border: 1px solid ${(p) => p.theme.colors.grey};
  background-color: ${(p) => p.theme.colors.backgrounGrey};
  padding: 6px 8px;
  font-size: 0.9rem;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;


/* Wrapper for the table area (scroll horizontally on small screens) */
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
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
  background-color: ${(props) => props.theme.colors.black};
`;

/* Table header cells */
export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight:normal;
  color: ${(props) => props.theme.colors.white};
  white-space: nowrap;

    &:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
 
&:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
`;

/* Table body */
export const TableBody = styled.tbody``;

/* Individual table row */
export const TableRow = styled.tr`

  // &:hover {
  //   background-color: ${(props) => props.theme.colors.backgrounGrey};
  // }
`;

/* Table cell */
export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(1.7)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  vertical-align: middle;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey};

  /* For multiline text (note description), add these rules if needed */
  &:nth-child(2) {
    max-width: 200px;
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

.internaldescription {
  display: inline-block;  /* or block */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;  /* or set a specific width like 150px */
}

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

/* "Showing X-Y from Z" text */
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
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
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(0)};
  margin-top: ${(props) => props.theme.spacing(2)};
  gap: 10px;

 @media (max-width: 768px) {
    margin: 10px 5px;
  }

  @media (max-width: 480px) {
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
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    // padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(1)};
    font-size: 0.9rem;
    width: 40%;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
    font-size: 0.8rem;
    width: 50%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    width: 50%;
  }
    @media (max-width: 480px) {
    margin-bottom: 20px;
      width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 520px;                   /* Desktop cap */
  padding: 10px 12px 10px 40px; 
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.silverGray};
  background: ${({ theme }) => theme.colors.backgrounGrey};

  @media (max-width: 768px) {
    max-width: 100%;                  /* Full width on mobile */
  }
`;


export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;

`;


export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: ${p => p.$isPublished ? "#4CAF50" : "#ccc"};
  transition: .4s;
  border-radius: 24px;
  &::before {
    position: absolute;
    content: "";
    height: 18px; width: 18px;
    left: ${p => p.$isPublished ? "26px" : "4px"};
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

export const ToggleLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
  vertical-align: middle;
  color: ${p => p.$isPublished ? "#4CAF50" : "#666"};
`;
export const input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #4CAF50;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(30px);
  }
`;

export const ControlsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 768px) {
    // grid-template-columns: 1fr;   /* stack Filter and Sort full-width */
    width: 100%;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;   /* stack Filter and Sort full-width */
    width: 100%;
  }
`;
