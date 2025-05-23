import styled, { css } from "styled-components";
import theme from "../../../../../../theme/Theme";
export const Container = styled.div`
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
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${theme.spacing(2)};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: 1320px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ValueText = styled.p`
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(1.5)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;