import styled from 'styled-components';

export const PrivacyContainer = styled.div`
  max-width: 85%;
  margin: 0px;
  padding: 0px;
  color: ${({ theme }) => theme.colors.pureblack};
  font-size: 18px;
  font-weight: 400;
  word-spacing: 1.5px;
  line-height: 1.8;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
  max-width: 100%;
  padding: 0 20px 0 0;
  }
`;

export const PrivacyHeading = styled.div`
    text-align: left;
    margin-bottom: 5px;
    margin-top: 5px;
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