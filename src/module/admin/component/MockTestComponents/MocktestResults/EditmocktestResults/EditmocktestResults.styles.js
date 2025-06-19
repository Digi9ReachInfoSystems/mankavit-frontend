import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  margin-left: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const Label = styled.label`
  display: block;
  margin: 1.2rem 0 0.4rem;
  font-size: 14px;
  font-weight: 500;
  color: #2A2A2A;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fafafa;
  margin-bottom: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fafafa;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
