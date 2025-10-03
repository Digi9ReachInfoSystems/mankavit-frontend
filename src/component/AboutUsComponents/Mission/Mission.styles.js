import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const MissionSection = styled.section`
  padding: 4rem 2rem;
  width: 80%;
  // max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    width: 95%;
    padding: 2rem 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Highlight = styled.span` color: #2d79f3; `;
export const FilterLabel = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
`;

export const CardandDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 1rem 0;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const Card = styled.div`
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

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  
  @media (max-width: 1024px) {
    height: 180px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 0.75rem;
  color: #2d3748;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  font-size: 18px;
  color: #5e646dff;
  line-height: 1.5;
  
  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  color: #4a5568;
  line-height: 1.6;
  max-width: 800px;
  margin: 2rem auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 1.5rem auto;
  }
`;

export const CTAButton = styled.button`
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
  margin-top: 1rem;
  
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
// ⬇️ replace your existing ScrollButtons & ScrollButton in Mission.styles with this

export const ScrollButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  /* center on small screens, keep them together nicely */
  justify-content: center;

  @media (min-width: 768px) {
    gap: 1.25rem;
  }
`;

export const ScrollButton = styled.button`
  --ring: 0 0 0 3px rgba(0, 123, 255, 0.15);
  --shadow: 0 8px 20px rgba(0, 123, 255, 0.18);

  display: grid;
  place-items: center;

  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 0;

  font-size: 28px;           /* ⬆️ bigger arrow */
  line-height: 1;
  font-weight: 700;          /* ⬆️ bolder symbol */
  color: #ffffff;

  background: linear-gradient(135deg, #0dcaf0, #007bff);
  box-shadow: var(--shadow);

  cursor: pointer;
  transition: transform 140ms ease, box-shadow 180ms ease, opacity 160ms ease, filter 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.04);
    box-shadow: 0 10px 26px rgba(0, 123, 255, 0.28);
    filter: saturate(1.05);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow), var(--ring);
  }

  &:disabled {
    background: #e9eef7;
    color: #9aa7bd;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.7;
  }

  /* Responsive tweak for smaller devices */
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 22px;
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

// Modal styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  h2 {
    margin-bottom: 1.5rem;
    color: #2d3748;
    text-align: center;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  margin: 0.5rem 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem;
  margin: 0.5rem 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #007BFF, #0DCAF0);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  }
`;

export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #718096;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background-color: #4a5568;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(113, 128, 150, 0.3);
  }
`;

export const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;