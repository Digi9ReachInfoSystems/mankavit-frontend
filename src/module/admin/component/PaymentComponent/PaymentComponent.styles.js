import styled from "styled-components";




export const EnrollButton = styled.button`
   background: linear-gradient(to right, #0dcaf0, #007bff);
  color: white;
  font-size: 18px;
  padding: 20px 22px;
  border: none;
  border-bottom-left-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
  width: 100%;

  &:hover {
     background-color: #0056b3;
  }

  /* Media Queries */

  @media (max-width: 990px) {
    // width: 25%;
  }

  @media (max-width: 768px) {
    // width: 38%;
    border-bottom-left-radius: 0px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 5px 10px;
    font-weight: 600;
    // width: 35%;
  }
`;
