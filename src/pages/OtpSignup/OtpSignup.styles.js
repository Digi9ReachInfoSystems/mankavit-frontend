import styled from 'styled-components';
import theme from '../../theme/Theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fc;
    @media (max-width: 480px) {
    background-color: #F1F5FF;

}
      @media (min-width: 800px) and (max-width: 1000px){
       
       display: flex;
       flex-direction: column;
     align-items: center;
    
    }
       @media (min-width: 1000px)and (max-width: 1200px)and (min-height: 800px) {
        
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

`;
export const LogoImg = styled.img`
  width: 232px !important;
  margin-bottom: 20px;

    @media (min-width: 768px) {
    width: 335px;
    height: 335px;
  }
   @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    width: 335px;
    height: 335px;
  }
`;

export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.body};
  font-size:35px;
  font-weight: 600;

     @media (min-width: 1000px) and (max-width: 1200px) and (max-height: 800px) {
    font-size: 25px;
  }
`;

export const Form = styled.form`
  background-color: #F1F5FF;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 597px;
  // height: 80%;
  flex:2;
margin: 105px 105px 105px 0px!important;

   @media (min-width: 760px) {
       max-width: 500px;
       margin: 25px !important;
   }
    @media (max-width: 480px) {
        margin:0px!important;
        padding: 0px;
        box-shadow: none;
    }
    @media (min-width: 800px) and (max-width: 1000px) {
     margin:10px 5px 60px 5px !important;
       max-width: 550px;
      //  height: 40%!important; 
       align-items: center;
       flex:2;
   
    }
    @media (min-width: 1000px)and (max-width: 1200px) {
         flex:1;
         margin:60px 65px 60px 20px !important;
    }
    @media (min-width: 1000px)and (max-width: 1200px)and (min-height: 800px) {
        
         margin:60px 65px 60px 60px !important;
    }

    @media (min-width: 481px){
   margin: 25px !important;
   }
`;
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
 margin: 80px 0px 80px 10px !important;
  @media (min-width: 1200px) {
     margin:130px 0px 60px 0px ; 
  }
     @media (max-width: 480px) {
     align-items: center;
        margin :20px 30px 60px 30px!important;
    }
    @media (min-width: 800px) and (max-width: 1000px) {
        margin: 60px 30px 60px 30px !important;
    }
     @media (min-width: 1000px)and (max-width: 1200px) and (max-height: 800px) {
        
         margin:0px 5px 60px 5px !important;
    }
`;
export const LoginTitle = styled.h2`
  color: #333;
    font-size: 1.5rem;
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
  color: #777;
  font-size: 0.875rem;
  margin-bottom: 20px;
  font-family: ${theme.fonts.body};
  // text-align: left;
`;
export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-top: 30px;
  font-family: ${theme.fonts.body};
  color:#8A8A8A;
`;

// export const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border-radius: 5px;
//   border: 1px solid #EDEDED;
//   font-size: 1rem;
//   background-color:  #F1F5FF;
//  box-sizing: border-box;

//   &::placeholder {
//     color: #aaa;
//   }
// `;

export const Button = styled.button`
color: #FFF;
// margin-top: 60px!important;
// margin:0px!important;
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
     @media (min-width: 1000px)and (max-width: 1200px)and (max-height: 800px) {
        
         margin:10px!important;
    }

    @media (max-width: 480px) {
         margin:10px!important;
    }
`;

export const OTPButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: transparent;
color: #494949;

text-align: center;
font-family: ${theme.fonts.body};
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
  color: #FFF;
    background: linear-gradient(90deg, #0DCAF0 0%, #007BFF 100%);
  }
`;

export const SignUpLink = styled.div`
  margin-top: 60px;
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
      @media (min-width: 1000px)and (max-width: 1200px) and (max-height: 800px){
        
         margin:10px;
    }
`;

export const Input = styled.input`
//   width: 100%;
  width: 50px;
height: 46px;
  padding: 10px;
  margin: 20px 0;
 border-radius: 8px;
border: 1px solid  #C5C6C7;
background: #F1F5FF;
 text-align: center;
 font-size: 1.2rem;
  &.otpBox {
    width: 50px;
    text-align: center;
    font-size: 1.2rem;
    margin: 30px 5px;
  }
    @media (max-width: 400px) {
       width: 25px!important;
       height: 30px!important;
    }
       @media (max-width: 480px) {
       width: 40px;
       height: 40px;
    }
`;

export const ResendOtp = styled.p`
text-align: center;
color: #494949;
font-family: ${theme.fonts.body};
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;
cursor: pointer;
text-decoration: none;
margin-top: 20px;
strong{
  color: #007BFF;
  cursor: pointer;
}
  
`;