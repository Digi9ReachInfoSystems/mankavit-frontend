// StudentsTableStyles.js
import styled from "styled-components";

// Outer container for the entire table section
export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
// justify-content: center;
// align-items: center;
  // width: 95%;
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(4)} 0 ${(props) => props.theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 12px;
    min-height: 720px;
    border-radius: 12px;

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
    // width: 90%;
  }
`;

// Header row: left title ("See All Students (14/24)") and right sort-by
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

// Title text on the left
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

// Container for "Sort by: Name"
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};
`;

// "Sort by:" label
export const SortLabel = styled.span`
  margin-right: 4px;
`;

// A <select> for the sort options
export const SortSelect = styled.select`
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  padding: 4px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};
  // cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

// Wrapper that holds the main table (with possible horizontal scroll on small screens)
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  overflow-x: auto;
`;

// Main table styling
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* ensures columns keep spacing even on narrow screens */
`;

// Table head
export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.black};
`;

// Table header cell
export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
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

// Table body
export const TableBody = styled.tbody``;

// Table row
export const TableRow = styled.tr`

  // &:hover {
  //   background-color: ${(props) => props.theme.colors.backgrounGrey};
  // }
`;

// Table cell
export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(1.9)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  
  vertical-align: top;
  white-space: nowrap;

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

// Actions container for icons
export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 1rem;
  cursor: pointer;

  // svg {
  //   cursor: pointer;
  //   color: ${(props) => props.theme.colors.test};
  //   transition: color 0.2s ease;

  //   &:hover {
  //     color: ${(props) => props.theme.colors.primary};
  //   }
  // }
`;

// "Showing X-Y from Z" text
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
`;

// Individual page-number buttons
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
    font-size: 0.9rem;
    width: 40%;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(1)};
    font-size: 0.8rem;
    width: 50%;
  }
`;


// export const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.6);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 450px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;




export const ModalHeader = styled.div`
  padding: 12px 16px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0; /* Prevents it from shrinking */
`;


export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #444;
  margin: 0;
`;

export const StudentList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: 40vh; 
`;

export const StudentItem = styled.li`
  padding: 12px 16px;
  border-bottom: 1px solid #E7E7E8;
  font-size: 18px;
  color: #333;
`;


export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.brightblue};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  width: 70%;
  justify-content: center;
  align-items: center;
  display: flex;

  &:hover {
    background-color: #0069d9;
  }
`;


export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

// export const KycDot = styled.span`
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background-color: ${({ status, theme }) => {
//     switch (status) {
//       case 'Pending':
//         return theme.colors.goldenyellow;
//       case 'Approved':
//         return theme.colors.emaraldgreen;
//       case 'Not Applied':
//         return theme.colors.lavendargray;
//       default:
//         return '#999';
//     }
//   }};
// `;

export const StatusDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'Active':
        return theme.colors.emaraldgreen;
      case 'Not Active':
        return theme.colors.lavendargray;
      default:
        return '#999';
    }
  }};
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
    width: 40%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    width: 40%;
  }
`;

export const KycDot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background-color: ${({ status }) =>
    status?.toLowerCase() === "approved" ? "#28a745" : "#ffc107"};
`;

// Courses Modal styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 0;  /* top and side padding only */
  border-radius: 10px;
  width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const CourseList = styled.ul`
  padding: 1rem;
  margin-top: 0rem;
`;

export const CourseItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  list-style-type: none;
  border-bottom: 1.5px solid #eee;
  padding: 0.5rem 0;
`;

