import styled from 'styled-components';

export const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 8%;
  background: linear-gradient(to right, #f9fafe, #e6f2ff);
  min-height: 90vh;
  font-family: 'Segoe UI', sans-serif;
`;

export const LeftContent = styled.div`
  max-width: 50%;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    color: #555;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    border: none;
  }

  .get-started {
    background: #008cff;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 140, 255, 0.3);
  }

  .explore {
    background: #fff;
    color: #333;
    border: 1px solid #ccc;
  }
`;

export const RightImage = styled.div`
  max-width: 45%;

  img {
    width: 100%;
    height: auto;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 8%;
  background-color: #f0f6ff;
`;

export const StatBox = styled.div`
  background: #e5f0ff;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  width: 200px;

  h2 {
    color: #007aff;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #333;
    font-size: 0.95rem;
  }
`;
