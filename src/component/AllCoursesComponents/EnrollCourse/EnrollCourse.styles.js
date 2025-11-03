import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  padding: 4rem 2rem;
  width: 80%;
  // max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 95%;
    padding: 2rem 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 1.25rem 0;
  white-space: nowrap;      /* 👈 prevent breaking into two lines */
  overflow: hidden;
  text-overflow: ellipsis;  /* 👈 optional: add ellipsis if space too small */

  @media (max-width: 900px) {
    font-size: 36px;
  }
  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 480px) {
    font-size: 28px;        /* 👈 slightly smaller so it fits even on small phones */
  }
`;


export const Highlight = styled.span`
  color: #007bff;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Line = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
`;

export const Features = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  width: 100%;
  scroll-behavior: smooth;
  padding: 1rem 0;
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled.div`
  min-width: 300px;
  text-align: center;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
  }
  
  @media (max-width: 480px) {
    min-width: 280px;
  }
`;

export const FeatureImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  
  @media (max-width: 1024px) {
    height: 180px;
  }
`;

export const FeatureTitle = styled.h3`
  margin-top: 1rem;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;

  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const FeatureText = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-top: 0.75rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 800px;
  text-align: center;
  margin: 2rem auto 3rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 1.5rem auto 2.5rem;
  }
`;

export const EnrollButton = styled.button`
  background: linear-gradient(to right, #007BFF, #0DCAF0);
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
    background: linear-gradient(to right, #0069d9, #0cb9e1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.875rem 2rem;
  }
`;

export const ScrollIndicator = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  button {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1.2rem;
    color: #007bff;
    
    &:hover:not(:disabled) {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;