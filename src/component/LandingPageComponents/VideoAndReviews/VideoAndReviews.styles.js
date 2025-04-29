import styled from 'styled-components';

export const Section = styled.section`
  padding: 60px 20px;
  text-align: center;
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

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const ReviewsContainer = styled.div`
  display: flex;
  justify-content: center;
//   flex-wrap: wrap;
margin: 0 auto;
  gap: 20px;
  width: 85%;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
      }
`;

export const ReviewCard = styled.div`
  max-width: 450px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  text-align: center;
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

export const ReviewText = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 3rem;
`;

export const ReviewerName = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: 18px;
`;

export const ReviewerTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  color: #111;
  margin-bottom: 2rem;
`;
