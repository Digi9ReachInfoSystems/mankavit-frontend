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

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 1024px) {
    /* Stack title above controls on medium screens */
    flex-direction: column;
    align-items: flex-start;
  }

  & > div {
    /* Target the controls container */
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: flex-start;
      gap: 12px;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: stretch;
      
      /* Make select containers full width on mobile */
      & > * {
        width: 100%;
      }

      /* Style the download button on mobile */
      button {
        width: 100%;
        padding: 8px;
      }
    }
  }
`;


export const Title = styled.h3`
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 100%;
  }
`;

export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};

  @media (max-width: 480px) {
    width: 100%;
    
    /* Make the Select component stretch on mobile */
    .ant-select {
      flex: 1;
    }
  }
`;

export const SortLabel = styled.span`
 white-space: nowrap;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;


export const SortSelect = styled.select`
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  padding: 4px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
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
  border: none;
  overflow-x: auto;
`;

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
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight:normal;
  color: ${(props) => props.theme.colors.test};
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

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }
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


export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
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

export const SearchInput = styled.input`
  width: 20%;
  padding: 10px 5px 10px 40px; 
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.silverGray};
  background: ${({ theme }) => theme.colors.backgrounGrey};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const FilterByContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    width: 100%;
    
    /* Make the Select component stretch on mobile */
    .ant-select {
      flex: 1;
    }
  }
`;