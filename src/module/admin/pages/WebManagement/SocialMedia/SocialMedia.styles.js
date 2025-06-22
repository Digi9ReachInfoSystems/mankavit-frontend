// style.js
import styled from 'styled-components';
import theme from '../../../../../theme/Theme'; // adjust the import path as needed

export const Container = styled.div`
position: relative;
margin-left: 40px;
margin-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  min-height: 750px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing(2)};
  }

  @media (max-width: 768px) {
    margin:0;
  }

  h2 {
    margin-bottom: ${theme.spacing(3)};
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.black};
  }
`;
export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing(3)};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing(1)};
  color: ${theme.colors.darkgray};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
`;

export const TextInput = styled.input`
  width: 60%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.secondary};
  font-family: ${theme.fonts.body};
  font-size: 1rem;

  &::placeholder {
    color: ${theme.colors.lightgray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const SubmitButton = styled.button`
  margin-top: ${theme.spacing(2)};
  padding: ${theme.spacing(2)} ${theme.spacing(4)};
  background: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: none;
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.vividblue};
  }

  &:disabled {
    background: ${theme.colors.grey};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  margin-top: ${theme.spacing(1)};
  color: ${theme.colors.red};
  font-family: ${theme.fonts.body};
  font-size: 0.875rem;
`;

export const SuccessText = styled.p`
  margin-top: ${theme.spacing(1)};
  color: ${theme.colors.green};
  font-family: ${theme.fonts.body};
  font-size: 0.875rem;
`;  