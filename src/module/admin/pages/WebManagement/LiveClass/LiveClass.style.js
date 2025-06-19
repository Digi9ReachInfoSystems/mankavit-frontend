import styled from "styled-components";
import theme from "../../../../../theme/Theme"; // adjust path as needed

export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 20px;
border-radius: 8px;
  padding: ${theme.spacing(2)} ${theme.spacing(4)} 0 ${theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) => props.theme.colors.secondary};
  min-height: 720px;

    @media (max-width: 990px) {
}

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;


export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
  overflow-x: auto;
  `;

  export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* ensures columns maintain spacing even on smaller screens */
`;

export const TableHead = styled.thead`
  background: ${theme.colors.black};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.white};
  white-space: nowrap;
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

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`

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
`;

export const ViewLink = styled.a`
    margin-left: 6px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
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

export const ModalOverlay = styled.div`
   position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const CloseIcon = styled.span`
 position: absolute;
  top: 5px;
  right: 5px;
  background: #fff;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;

  &:hover {
    color: #555;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

export const ModalImage = styled.img`
  width: 500px;
  height: 400px;
  border-radius: 8px;
`;