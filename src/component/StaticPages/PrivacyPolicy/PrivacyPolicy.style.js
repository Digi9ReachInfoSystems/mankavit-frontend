import styled from 'styled-components';

export const PrivacyContainer = styled.div`
//   max-width: 800px;
width: 80%;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
  max-width: 100%;
  padding: 0 20px 0 0;
  }
`;

export const PrivacyHeading = styled.div`
     text-align: center;
       font-size: 2.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

export const PrivacyPara = styled.p`
    margin-top: 5px;
    margin-bottom: 50px;
    // overflow-y: auto;
    // max-height: 500px;
    scrollbar-width: thin;
    scrollbar-color: #ccc #fff;
    padding: 0 20px 0 0;
`;