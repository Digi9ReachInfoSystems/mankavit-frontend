import styled from 'styled-components';

export const AboutusContainer = styled.div`
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 12px;
  width: calc(100% - 40px);
  height: 85vh;
  margin-left: 40px ;
  margin-top: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    width: calc(100% - 40px);
  }

  @media (max-width: 768px) {
    width: calc(100% - 30px);
    margin-left: 15px;
  }
`;

export const AboutusTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1.2rem;
  color: ${props => props.theme.colors.blueishblack};
`;

export const AboutusButton = styled.button`
  background-color: ${props => props.theme.colors.brightblue};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  width: 20%;

  @media (max-width: 1360px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 1024px) {
    width: 25%;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 30%;
  }

  @media (max-width: 540px) {
    width: 40%;
  }

  @media (max-width: 480px) {
  font-size: 14px;
  padding: 8px 16px;
    width: 50%;
  }
`;

export const AboutusFormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const AboutusLabel = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const AboutusInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: ${props => props.theme.colors.platinumlightgray} 1px solid;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
  color: ${props => props.theme.colors.silvergray};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
    width: 90%;
  }
`;

export const AboutusTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: ${props => props.theme.colors.platinumlightgray} 1px solid;
  border-radius: 6px;
  font-size: 0.95rem;
  resize: none;
  outline: none;
  box-sizing: border-box;


  &::placeholder {
  color: ${props => props.theme.colors.silvergray};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
    w
`;
