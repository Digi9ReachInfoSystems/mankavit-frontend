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
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
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
  min-height: 719px;

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

  //    &:nth-child(2) {
  //   width: 80%;
  //   white-space: normal; /* allow text to wrap inside description */
  //   word-break: break-word;
  // }
 
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
  p {
    margin-bottom: 10px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ApproveButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  
  &.approved {
    background-color: #e6f7ee;
    color: #28a745;
  }
  
  &.pending {
    background-color: #fff8e6;
    color: #ffc107;
  }
`;