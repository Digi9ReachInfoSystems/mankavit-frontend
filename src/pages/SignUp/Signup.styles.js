// Signup.styles.js
import styled, { createGlobalStyle } from 'styled-components';
import theme from '../../theme/Theme';


export const GlobalEdgeStyles = createGlobalStyle`
  input[type=password]::-ms-reveal,
  input[type=password]::-ms-clear {
    display: none;
  }
`;


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;

  @media (max-width: 480px) {
    background-color: #F1F5FF;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1000px) and (max-width: 1200px) and (min-height: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Logo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    margin-top: 40px;
    flex: 1;
  }

  @media (min-height: 1000px) and (max-width: 1200px) and (min-height: 800px) {
    display: none !important;
  }
`;

export const LogoImg = styled.img`
  width: 435px;
  height: 435px;
  flex-shrink: 0;
  margin-left: 50px;
  border-radius: 635px;

  @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    width: 335px;
    height: 335px;
  }
`;

export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.body};
  text-align: center;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 5px;

  @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 25px;
  }
`;

export const SubTitle = styled.p`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.body};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 5px;
  margin-bottom: 105px;

  @media (min-width: 100px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 12px;
  }
`;


export const Form = styled.form`
  background-color: #F1F5FF;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 597px;
  height: 80%;
  flex: 2;
  margin: 105px 105px 105px 0px !important;

  @media (min-width: 760px) {
    max-width: 500px;
    margin: 105px 105px 105px 105px !important;
  }

  @media (max-width: 480px) {
    margin: 0px !important;
    padding: 0px;
    box-shadow: none;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    margin: 100px 5px 60px 5px !important;
    max-width: 550px;
    height: 40% !important;
    align-items: center;
    flex: 2;
  }

  @media (min-width: 1000px) and (max-width: 1200px) {
    flex: 1;
    margin: 60px 65px 60px 20px !important;
  }

  @media (min-width: 1000px) and (max-width: 1200px) and (min-height: 800px) {
    height: 60% !important;
    margin: 60px 65px 60px 60px !important;
  }

  @media (min-width: 1200px) {
    padding: 50px 30px 50px 30px;
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 80px 100px 80px 100px;

  @media (min-width: 1200px) {
    margin: 0px 80px 60px 80px;
  }

  @media (max-width: 400px) and (max-height: 700px) {
    margin: 60px 20px 60px 20px !important;
  }

  @media (max-width: 480px) {
    margin: 60px 30px 60px 30px;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    margin: 100px 130px 60px 130px;
  }

  @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    margin: 0px 25px 60px 25px !important;
  }

  @media (min-width: 1000px) and (max-width: 1200px) and (min-height: 800px) {
    margin: 200px 35px 60px 35px !important;
  }
`;


export const LoginTitle = styled.h2`
  color: ${theme.colors.primary}!important;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  font-family: ${theme.fonts.body};

  @media (min-width: 1200px) {
    margin-top: 10px !important;
  }

  @media (min-width: 100px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 25px;
  }
`;


export const LoginSubTitle = styled.p`
  color: ${theme.colors.black};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-family: ${theme.fonts.body};
  margin-bottom: 30px;

  @media (min-width: 100px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-top: 10px;
  font-family: ${theme.fonts.body};
  color: #8A8A8A;

  @media (min-width: 100px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 12px;
    display: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #EDEDED;
  font-size: 1rem;
  background-color: #F1F5FF;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  @media (min-width: 100px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 12px;
  }
`;


export const Button = styled.button`
  color: #FFF;
  margin-top: 15px !important;
  text-align: center;
  font-family: ${theme.fonts.body};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: linear-gradient(90deg, #0DCAF0 0%, #007BFF 100%);
  box-shadow: 0px 4px 8px 0px rgba(171, 190, 209, 0.40);

  &:hover {
    background-color: #154f6d;
  }

  @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    margin: 0px;
  }
`;

export const SignUpLink = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #494949;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  a {
    color: #007BFF;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: none;
    }
  }

  @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    margin: 20px;
  }
`;
