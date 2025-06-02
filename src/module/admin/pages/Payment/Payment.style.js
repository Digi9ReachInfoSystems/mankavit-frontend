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


export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

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

export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};
`;

export const SortLabel = styled.span`
  margin-right: 4px;
`;

export const SortSelect = styled.select`
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  padding: 4px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

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
  background-color: ${(props) => props.theme.colors.backgrounGrey};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(3)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
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

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }
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