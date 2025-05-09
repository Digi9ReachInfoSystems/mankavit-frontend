import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;

  @media (max-width: 1360px) {
    max-width: 90%;
  }

  @media (max-width: 1024px) {
    max-width: 95%;
    padding: 20px 5px;
  }

`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.4;

  @media (max-width: 1360px) {
    font-size: 36px;
  }

  @media (max-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 576px) {
    font-size: 22px;
  }
`;

export const Highlight = styled.span`
  color: #0072f5;
`;

export const Description = styled.p`
  margin-top: 20px;
  font-size: 24px;
  line-height: 1.7;
  color: #444;

  @media (max-width: 1360px) {
    font-size: 22px;
  }
    @media (max-width: 1024px) {
    font-size: 20px;    
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;


export const SubTitle = styled.h2`
  margin-top: 40px;
  font-size: 40px;
  font-weight: 600;

  @media (max-width: 1360px) {
    font-size: 36px;
  }

  @media (max-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 26px;
  }
    @media (max-width: 576px) {
    font-size: 22px;
  }
`;

export const OfferList = styled.ul`
  margin-top: 20px;
  padding-left: 20px;
  margin-left: 30px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }

  @media (max-width: 576px) {
    margin-left: 10px;
  } 
`;

export const OfferItem = styled.li`
  font-size: 20px;
  margin-bottom: 10px;
  line-height: 1.5;

  @media (max-width: 1360px) {
    font-size: 18px;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
    @media (max-width: 768px) {
    font-size: 14px;
    }

    @media (max-width: 576px) {
    font-size: 12px;
    }
`;
