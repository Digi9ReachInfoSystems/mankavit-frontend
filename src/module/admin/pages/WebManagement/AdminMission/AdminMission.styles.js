import styled from 'styled-components';
import theme from '../../../../../theme/Theme';

export const BtnAchieve = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;

//   @media (max-width: 480px) {
//     margin-top:0;
//   }


`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: ${props => props.theme.colors.blueishblack};
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  border: none;
  color: white;
  padding: 15px 40px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  width:15%;
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

export const Label = styled.p`
font-size: 16px;
font-weight: 400;
color: #2A2A2A;
margin-top: 5px;
margin-bottom: 10px;
`;

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
  min-height: 800px;

    @media (max-width: 990px) {
  // width: 90%;
}

  @media (max-width: 768px) {
    margin: 0 10px;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  color: #AEAEAE;
  outline: none;

  &::placeholder {
  color: #AEAEAE;
  }
`;

export const TableHead = styled.thead`
  background: ${theme.colors.black};
`;


export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  color: #AEAEAE;
  resize: none;
  outline: none;

  &::placeholder {
  color: #AEAEAE;
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

export const Th = styled.th`
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

export const Td = styled.td`
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

export const ViewLink = styled.a`
    margin-left: 6px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
`;

export const PaginationWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  background: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 6px;
  padding: 6px 12px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #007bff;
    color: white;
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

export const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #28c76f;
  }

  input:checked + span:before {
    transform: translateX(18px);
  }
`;

export const ImageModalOverlay = styled.div`
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

export const ImageModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

export const ModalImage = styled.img`
width: 100%;
  height: 100%;
  border-radius: 8px;
  text-decoration: none;
`;

export const CloseButton = styled.button`
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
`;


