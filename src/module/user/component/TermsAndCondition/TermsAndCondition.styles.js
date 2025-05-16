import styled from 'styled-components';

export const TermsContainer = styled.div`
  max-width: 85%;
  margin: 0px;
  padding: 0px;
  color: ${({ theme }) => theme.colors.pureblack};
  font-size: 18px;
  font-weight: 400;
  word-spacing: 1.5px;
  line-height: 1.8;

  @media (max-width: 1360px) {
  max-width: 90%;
    font-size: 16px;
  }

  @media (max-width: 768px) {
  max-width: 100%;
  padding: 0 20px 0 0;
  }
`;

export const TermsHeading = styled.div`
  text-align: left;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const Termspara = styled.p`
  margin-bottom: 5px;
  margin-top: 5px;
  line-height: 1.6;

  @media (max-width: 480px) {
    line-height: 1.4;
  }
`;

export const List = styled.ol`
     margin-top: 5px;
    margin-bottom: 50px;
    // overflow-y: auto;
    // max-height: 500px;
    scrollbar-width: thin;
    scrollbar-color: #ccc #fff;
    padding: 0 20px 0 20px;

  li {
    margin-bottom: 0px;
    line-height: 1.6;

    strong {
      display: block;
      color: #222;
      margin-bottom: 4px;
    }
  }
`;
