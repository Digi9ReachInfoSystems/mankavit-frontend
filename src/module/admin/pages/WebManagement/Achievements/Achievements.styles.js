import styled from 'styled-components';

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
  margin-bottom: 20px;
  width:15%;
justify-content: center;


  &:hover {
    background-color: #007ecc;
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
  padding: 1rem 2rem ;
  background: #fff;
  border-radius: 12px;
    color: #333;
    margin-left: 40px;

    h3{
        font-size: 20px;
        margin-bottom: 1rem;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        margin-left: 0;
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
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
//   overflow: hidden;
    // height: 400px;

  th, td {
    text-align: left;
    padding: 16px;
  }

  tr {
    border-bottom: 1px solid #eee;
  }
`;

export const Th = styled.th`
  background: #F3F3F3;
  font-weight: 600;
  height: 25px;
  color: #6D6E75;
`;

export const Td = styled.td`
  color: #0C0D19;
  height: 20px;
  font-size: 14px;
  font-weight: 400;



  &:last-child {
    text-align: center;
    justify-content: center;
    
    display: flex;
    gap: 20px
     }
`;

export const ViewLink = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
  text-decoration: underline;
  }
`;

export const ToggleSwitch = styled.input`
  cursor: pointer;
  accent-color: #28c76f;
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


