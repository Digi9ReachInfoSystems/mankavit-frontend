import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  width: 80%;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 0px;
  }
`;

export const Card = styled.div`
//   background-color: #f0f4fd;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #1f3a93;
  margin: 0 0 10px 0;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const AuthorDate = styled.p`
  font-size: 0.9rem;
  color: #007bff;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  text-align: justify;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const ReadPostLink = styled.a`
  margin-top: 12px;
  display: flex;
  color: #007bff;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const ArrowIcon = styled.span`
display: flex;
align-items: center;
  margin-left: 6px;
  font-size: 16px;
`;
