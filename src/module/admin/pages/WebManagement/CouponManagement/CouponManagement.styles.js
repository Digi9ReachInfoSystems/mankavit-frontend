import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 20px;
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(4)} 0 ${(props) => props.theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  min-height: 720px;

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
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};

  span {
    font-weight: normal;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.test};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;

export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.test};
  font-size: 12px;
`;

export const SortLabel = styled.span`
  margin-right: 4px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px;
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

export const TableRow = styled.tr``;

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
  background: linear-gradient(to right, #0dcaf0, #007bff);
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
    font-size: 12px;
    width: 40%;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
    font-size: 10px;
    width: 50%;
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

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;