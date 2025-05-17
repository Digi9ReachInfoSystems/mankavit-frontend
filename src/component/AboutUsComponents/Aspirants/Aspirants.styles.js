import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  margin-bottom: 60px;
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 400;
  color: ${props => props.theme.colors.darkgray};
  margin-top: 20px;

  @media (max-width: 1360px) {
      font-size: 40px;
  }

  @media (max-width: 768px) {
      font-size: 32px;
  }
`;

export const Highlight = styled.span`
  color: ${props => props.theme.colors.vividblue};
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
//   flex-wrap: wrap;
  gap: 20px;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 540px) {
         display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
          display: grid;
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
//   background-color: white;
  border: ${props => props.theme.colors.darkgray} 1px solid;
  border-radius: 14px;
  width: 500px;
  padding: 3rem 1rem;
//   box-shadow: 0 0 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  @media (max-width: 1360px) {
      width: 300px;
      padding: 2rem 1rem;
  }

  @media (max-width: 1024px) {
      width: 220px;
      padding: 2rem 1rem;
  }

  @media (max-width: 768px) {
      width: 90%;
      padding: 1rem 0.5rem;
  }

  @media (max-width: 540px) {
      width: 80%;
      padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
      width: 90%;
      padding: 2rem 1rem;
  }
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1rem;

  @media (max-width: 1360px) {
      width: 100px;
      height: 100px;
  }

  @media (max-width: 1024px) {
      width: 80px;
      height: 80px;
  }

  @media (max-width: 768px) {
      width: 80px;
      height: 80px;
      margin-bottom: 0.5rem;
  }

  @media (max-width: 540px) {
      width: 100px;
      height: 100px;
  }

  @media (max-width: 480px) {
      width: 100px;
      height: 100px;
  }
`;

export const Quote = styled.p`
  font-size: 18x;
  font-weight: 300;
  color: ${props => props.theme.colors.test};
  margin-bottom: 1rem;
  padding: 6px;
  line-height: 1.5;

  @media (max-width: 1360px) {
      font-size: 16px;
  }

  @media (max-width: 1024px) {
      font-size: 14px;
      padding: 4px;
}

  @media (max-width: 768px) {
      font-size: 14px;
      line-height: 1.2;
  }

  @media (max-width: 480px) {
      font-size: 16px;
      line-height: 1.5;
  }
`;

export const Name = styled.h4`
font-size: 26px;
  font-weight: normal;
  color: ${props => props.theme.colors.darkgray};
  margin-bottom: 5px;

  @media (max-width: 1360px) {
      font-size: 22px;
  }

  @media (max-width: 1024px) {
      font-size: 20px;
  }

  @media (max-width: 768px) {
      font-size: 18px;
  }

  @media (max-width: 480px) {
      font-size: 22px;
  }
`;

export const Role = styled.p`
font-size: 22px;
  font-weight: 600;
  color: ${props => props.theme.colors.darkgray};
  margin: 0;

  @media (max-width: 1360px) {
      font-size: 18px;
  }

  @media (max-width: 1024px) {
      font-size: 16px;
  }

  @media (max-width: 768px) {
      font-size: 14px;
  }

  @media (max-width: 480px) {
      font-size: 18px;
  }
`;
