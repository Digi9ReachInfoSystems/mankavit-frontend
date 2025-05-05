import styled from "styled-components";

export const Container = styled.div`
  padding: 40px 20px;
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

export const Highlight = styled.span`
  color: #007bff;
`;

export const Line = styled.div`
  width: 60px;
  height: 3px;
  background-color: #007bff;
  margin: 10px auto 30px;
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
`;

export const FeatureCard = styled.div`
  max-width: 450px;
  text-align: center;
`;

export const FeatureImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

export const FeatureTitle = styled.h3`
  margin-top: 15px;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const FeatureText = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-top: 10px;
`;

export const Description = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin: 20px 50px;
  max-width: 100%;
  text-align: left;
  margin-bottom: 50px;
`;

export const EnrollButton = styled.button`
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  color: white;
  font-size: 24px;
  font-weight: 500;
  padding: 12px 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #005dc4;
  }
`;
