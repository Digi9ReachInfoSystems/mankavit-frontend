import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 35px;

  @media (max-width: 1360px) {
    margin-left: 25px;
  }

  @media (max-width: 1024px) {
    margin-left: 15px;
  }
`;

export const ContainerHeading = styled.h2`
  font-size: 32px;
  font-weight: 400;
  margin: 20px 0;

  @media (max-width: 480px) {
    margin: 10px 0;
  }
`;

export const TabBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    margin: 1rem 0;
  }
`;

export const TabButton = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  background: ${({ active }) => active
    ? 'linear-gradient(to right, #0DCAF0, #007BFF)'
    : '#E0E0E0'};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 1024px) {
    padding: 0.6rem 1rem;
    font-size: 12px;
  }
`;
