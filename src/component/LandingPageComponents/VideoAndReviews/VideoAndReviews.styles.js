import styled from 'styled-components';

export const Container = styled.div`
   padding: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  margin: 0 auto;
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
  flex-wrap: nowrap;         // ❗ DO NOT wrap
  overflow-x: auto;          // ❗ Enable horizontal scroll
  gap: 20px;
  margin-top: 2rem;
  padding-bottom: 1rem;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;




export const Card = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  border: ${props => props.theme.colors.darkgray} 1px solid;
  border-radius: 14px;
  min-width: 220px;
  max-width: 500px;
  padding: 2rem 1rem;
  transition: all 0.3s ease;
  width: 250px;

  @media (min-width: 768px) {
    width: 300px;
  }

  @media (min-width: 1024px) {
    width: 250px;
  }

  @media (min-width: 1360px) {
    width: 400px;
  }
`;



export const MediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Avatar = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 0;
`;

export const Media = styled.video`
  width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 0;
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

export const VideoWrapper = styled.div`
  width: 80%;
  height: 600px;
  margin: 0 auto 60px;
  background-color: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
    @media (max-width: 768px) {
    height: 250px;
    width: 80%; 
}
`;
