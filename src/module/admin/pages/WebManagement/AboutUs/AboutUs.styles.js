import styled from 'styled-components';
import theme from "../../../../../theme/Theme"

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
  min-height: 780px;

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

export const Button = styled.button`
 background:linear-gradient(to right, #0dcaf0, #007bff);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  margin-bottom: 1rem;
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

export const FormGroup = styled.div`
    margin-bottom: 1rem;

  label {
    display: block;
    margin: 0.5rem 0 0.3rem;
    font-weight: bold;
  }
`;

export const Label = styled.label`
    display: block;
    margin: 0.5rem 0 0.3rem;
    font-weight: bold;
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
  font-size: 1rem;
  // resize: none;
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
  transition: background 0.2s ease;


  /* on hover, turn light grey */
 &:hover {
    background: ${theme.colors.backgrounGrey};
  }
`;

export const TableHead = styled.thead`
  background: ${theme.colors.backgrounGrey};
`;


export const TableHeader = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(2)};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.test};
  white-space: nowrap;

  &:nth-child(2) {
    width: 80%;
  }

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

  &:nth-child(2) {
    width: 40%;
    white-space: normal; /* allow text to wrap inside description */
    word-break: break-word;
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
