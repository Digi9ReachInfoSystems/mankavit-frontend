// CoursesTableStyles.js
import styled from "styled-components";
// import theme from "../../../../theme/Theme";

// Outer container for the entire section
export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
border-radius: 12px;
// justify-content: center;
// align-items: center;
  // width: 95%;
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(4)} 0 ${(props) => props.theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  min-height: 720px;


//     @media (max-width: 990px) {
//   width: 90%;
// }

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
    // width: 95%;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

// Top header row with left title and right sort selector
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

// Sort section on the right (e.g., "Sort by: Name")
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.test};
  font-size: 12px;
`;

// The label "Sort by:"
export const SortLabel = styled.span`
  margin-right: 4px;
`;

// The <select> or clickable text for actual sorting
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

// Wrapper that holds the table with possible horizontal overflow
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  overflow-x: auto;
`;

// Actual table styling
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* ensures columns maintain spacing even on smaller screens */
`;

// Table Head
export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.black};
`;

// Table Header Cell
export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.white};
  white-space: nowrap;
  // border-radius: 4px;
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

// Table Body
export const TableBody = styled.tbody``;

// Table Row
export const TableRow = styled.tr`

  // &:hover {
  //   background-color: ${(props) => props.theme.colors.backgrounGrey};
  // }
`;

// Table Cell
export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(1.9)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};


  a {
    margin-left: 6px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Actions container for edit/delete/view icons
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

// Text on the bottom left (e.g., "Showing 1-10 from 100")
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
`;

// Individual page buttons
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
//  margin-right:10px;
  //  width: 100%;


 @media (max-width: 768px) {
margin: 10px 5px;
  }

  @media (max-width: 480px) {
margin: 10px 5px;
  `;

export const CreateButton = styled.button`
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
  background:linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 4px;
  font-family: ${(props) => props.theme.fonts.body};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
    width: 15%; 
    display: flex;
  justify-content: center;
  align-items: center;



  @media (max-width: 768px) {
    // padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(1)};
    font-size: 12px;
    width: 40%;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
    font-size: 10px;
    width: 50%;
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

