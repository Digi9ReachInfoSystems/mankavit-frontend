import styled from 'styled-components';
import theme from '../../../../../theme/Theme';

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
  min-height: 719px;

    @media (max-width: 990px) {
  // width: 90%;
}

  @media (max-width: 768px) {
    margin: 0 10px;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: ${props => props.theme.colors.blueishblack};
`;

export const BtnTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
//  margin-right:10px;

 @media (max-width: 768px) {
//  margin: 10px 5px;
}
`;

export const AddTestButton = styled.button`
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

export const Form = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin: 0.5rem 0 0.3rem;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: ${props => props.theme.colors.platinumlightgray} 1px solid;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: none;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;


export const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem 1.5rem;
  border: ${props => props.theme.colors.platinumlightgray} 1px solid;
  border-radius: 6px;
  font-size: 0.95rem;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
  color: ${props => props.theme.colors.silvergray};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
    width: 90%;
  }
`;

export const Button = styled.button`
    background:linear-gradient(to right, #0dcaf0, #007bff);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  margin-bottom: 0;
  margin-top: 1rem;
  cursor: pointer;
  width: 20%;

  @media (max-width: 1360px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 1024px) {
    width: 25%;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 30%;
  }

  @media (max-width: 540px) {
    width: 40%;
  }

  @media (max-width: 480px) {
  font-size: 14px;
  padding: 8px 16px;
    width: 50%;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
      min-width: 900px;

`;

export const TableRow = styled.tr`
  background: ${theme.colors.secondary};
  transition: background 0.2s ease;

  /* on hover, turn light grey */
 &:hover {
    background: ${theme.colors.backgrounGrey};
  }
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

export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(1.9)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

export const TableCelldiscription = styled.td`
  padding: ${(props) => props.theme.spacing(1.9)};
  width: 45%;
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
   white-space: normal; 
  word-break: break-word; 
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

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  margin: 0 0.3rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const TableHead = styled.thead`
  background: ${theme.colors.black};
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

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;

  
  @media (max-width: 768px) {
  justify-content: flex-end;
  }
`;

export const PaginationButton = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#E5F2FF')};
  color: ${({ active }) => (active ? '#fff' : '#007BFF')};
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  margin: 0 0.2rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
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

