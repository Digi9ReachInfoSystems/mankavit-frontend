import styled from "styled-components";

export const Container = styled.div`
  padding: 40px 20px;
  text-align: center;


  @media (max-width: 1320px) {
    // max-width: 90%;
  }
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
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
  overflow-x: scroll;
  width: 100%;

   @media (max-width: 1360px) {
    gap: 1rem;
}

@media (max-width: 1024px) {
    gap: 1rem;
}

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: row;
}

@media (max-width: 540px) {
    gap: 0.5rem;
    // flex-direction: column;
}

@media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
}

  // @media (max-width: 576px) {
  //   flex-direction: column;
  // }
`;

export const FeatureCard = styled.div`
  min-width: 300px;
  text-align: center;
`;

export const FeatureImage = styled.img`
  width: 100%;
  height: 300px;
  // object-fit: cover;
  border-radius: 8px;

   @media (max-width: 1360px) {
    height: 200px;
    width: 300px;
}

@media (max-width: 1024px) {
    height: 200px;
    width: 250px;
}
  @media (max-width: 768px) {
    height: 250px;
    width: 300px;
}

@media (max-width: 540px) {
    height: 250px;
    width: 250px;
}

@media (max-width: 480px) {
    height: 200px;
    width: 300px;
}
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
  max-width: 100%;
  text-align: left;
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
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

  @media (max-width: 1024px) {
    font-size: 20px; 
  }
`;
