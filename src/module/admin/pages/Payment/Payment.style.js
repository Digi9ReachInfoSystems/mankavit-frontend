// PaymentTableStyles.js
import styled from "styled-components";

export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
// justify-content: center;
// align-items: center;
  // width: 95%;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  min-height: 760px;
  border-radius: 12px;

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0px;
    padding: ${(props) => props.theme.spacing(1)};
    // width: 95%;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)};
  }
`;


// export const HeaderRow = styled.div`
//   display: flex;
//   // align-items: left;
//   justify-content: space-between;
//   flex-direction: column;
//   margin-bottom: ${(props) => props.theme.spacing(2)};

//   // @media (min-width: 768px) and (max-width: 1024px) {
//   //   flex-direction: column;
//   //   margin-bottom: ${(props) => props.theme.spacing(1)};
//   // }

//   .filter-items{
//  display: flex;
//  width: 100%;
//  justify-content: start;

//  @media (min-width: 300px) and (max-width: 1024px) {
//  width: 30%;
//   flex-direction: column;
  
//   gap: 20px;
//  }
//   }

  
// `;

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

// PaymentTableStyles.js
// Payment.style.js → HeaderRow
export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  // gap: 12px;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .filter-items {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }
  }
`;

export const SortByContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    min-width: 200px;
  }
`;

export const SortLabel = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};
  white-space: nowrap;

  @media (min-width: 768px) {
    min-width: 120px;
    text-align: right;
  }
`;

export const SortSelect = styled.select`
  width: 100%;
  max-width: 260px;
  padding: 6px 10px;
  font-size: 12px;
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.test};
  font-family: ${(props) => props.theme.fonts.body};

  @media (min-width: 768px) {
    width: auto;
  }
`;


// export const SortByContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 12px;
//   color: ${(props) => props.theme.colors.test};
// `;

// export const SortLabel = styled.span`
//   margin-right: 4px;
//   width: 200px;
// `;

// export const SortSelect = styled.select`
//   border: 1px solid ${(props) => props.theme.colors.grey};
//   background-color: ${(props) => props.theme.colors.backgrounGrey};
//   padding: 4px;
//   font-family: ${(props) => props.theme.fonts.body};
//   font-size: 12px;
//   color: ${(props) => props.theme.colors.test};
//   cursor: pointer;
//   border-radius: 8px;
//   // max-width: 200px;

//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.primary};
//   }
// `;

export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: 4px;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.black};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(3)};
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

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`

  // &:hover {
  //   background-color: ${(props) => props.theme.colors.backgrounGrey};
  // }
`;

export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(2.5)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
      border-bottom: 1px solid ${(props) => props.theme.colors.grey};

`;

export const StatusCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.test};
`;


export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

export const PaymentstatusDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'Pending':
        return theme.colors.goldenyellow;
      case 'Active':
        return theme.colors.emaraldgreen;
      case 'Failed':
        return theme.colors.crimsonRed;
      default:
        return '#999';
    }
  }};
`;

export const BottomRow = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// "Showing X-Y from Z" text
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
`;

// Pagination container
export const Pagination = styled.div`

  display: flex;
  gap: 4px;
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

// PaymentTableStyles.js
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: 12px 0 20px;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 12px;
    color: #888;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Remove standalone SearchIcon if you're using SVG inside

// Payment.jsx (your existing SearchInput)


// export const SearchIcon = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 12px;
//   transform: translateY(-50%);
//   color: #888;
//   pointer-events: none;
// `;


export const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

// export const Title = styled.h3`
//   margin-bottom: 20px;
// `;

export const Detail = styled.p`
  margin: 10px 0;
  font-size: 16px;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 15px; top: 15px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
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