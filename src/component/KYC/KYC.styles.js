import styled from 'styled-components';

// export const FormContainer = styled.div`
// margin-left: 35px;
// // margin-top: 20px;
//   background-color: ${(props) => props.theme.colors.white};
//   border-radius: 6px;
//   padding: ${(props) => props.theme.spacing(3)};
//   font-family: ${(props) => props.theme.fonts.body};
// //   min-height: 70px;
//   // width: 100%;

//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     padding: ${(props) => props.theme.spacing(2)};
//   }

//   @media (max-width: 1024px) {
//     margin-left: 0px;
//   }
//   @media (max-width: 768px) {
//     margin:0;
// }
// `;

// export const Header = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// export const Title = styled.h2`
//   font-size: 40px;
//   font-weight: 400;
//   color: ${props => props.theme.colors.darkgray};
//   // margin-top: 20px;
//   margin: 0px;

//   @media (max-width: 1360px) {
//       font-size: 36px;
//   }

//   @media (max-width: 1024px) {
//       font-size: 30px;
//   }

//   @media (max-width: 768px) {
//       font-size: 32px;
//   }

//   @media (max-width: 480px) {
//       font-size: 24px;
//   }
// `;

export const BackLink = styled.div`
// border: 1px solid #ccc;
  padding: 0px;
  border-radius: 5px;

  @media (max-width: 576px) {
    padding: 5px;
  }
`;



export const Highlight = styled.span`
  color: ${props => props.theme.colors.vividblue};
`;

// export const UpdatedGif = styled.div`
//   width: 400px;
//   height: 400px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin: auto;

//   .updatedText{
//     margin: 0px;
//   }
// `;

export const Form = styled.div`
  width: 100%;

  @media (max-width: 1024px) {
    width: 100%;
  }

  .updatedGif{
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  `;
export const FormWrapper = styled.div`
  margin-top: 20px;
`;

// // export const ProfileImage = styled.img`
// // //   display: block;
// //   width: 130px;
// //   height: 130px;
// //   // object-fit: cover;
// //   border-radius: 50%;
// //   margin: 0 ;
// //   position: relative;

// //   @media (max-width: 480px) {
// //     width: 100px;
// //     height: 100px;
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //     margin: auto;
// //   }
// // `;

// export  const CameraImage = styled.img`
// position: absolute;
//   top: 37%;
//   left: 50px;
//   width: 20px;
//   height: 20px;
//   padding: 5px;
//   background-color: ${(props) => props.theme.colors.white};
//   border-radius: 50%;
//   cursor: pointer;

//   @media (max-width: 480px) {
//     width: 15px;
//     height: 15px;
//     left: 47%;
//   }
// `;

// export const InputGroup = styled.div`
//   margin-bottom: 0px;
//   margin-top: 30px;
//   flex: 1;

//   @media (max-width: 1024px) {
//     margin-top: 10px;
//   }
// `;

// export const Label = styled.label`
//   display: block;
//   font-size: 18px;
//   margin-bottom: 8px;
//   font-weight: 400;

//     small {
//     font-size: 14px;
//     color: #696969; /* Dim Gray */
//     font-weight: 400;
//     margin-left: 5px;

//     @media (max-width: 1024px) {
//       font-size: 12px;
//     }

//     @media (max-width: 820px) {
//       font-size: 10px;
//     }
//   }

//   @media (max-width: 1024px) {
//     font-size: 14px;
//   }

//   @media (max-width: 820px) {
//     font-size: 12px;
//   }

// `;

// export const InputField = styled.input`
//   width: 100%;
//   padding: 16px;
//   font-weight: 400;
//   border: ${(props) => props.theme.colors.platinumlightgray} 1px solid;
//   border-radius: 8px;
//   font-size: 18px;
//   color: ${(props) => props.theme.colors.dimGray};
//   box-sizing: border-box;


//   @media (max-width: 1024px) {
//     font-size: 16px;
//     padding: 12px;
//   }

//   @media (max-width: 480px) {
//     font-size: 14px;
//     padding: 10px;
//   }
// `;

export const MobileInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.colors.platinumlightgray} 1px solid;

  .numberLine{
  width: 2px;
  height: 20px;
  margin-left: 0px;
  background-color: #ccc;
  }
`;

export const FixedCode = styled.div`
  padding: 16px 10px;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;

export const MobileNumberInput = styled.input`
  flex: 1;
  padding: 16px 8px;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${(props) => props.theme.colors.dimGray};
  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const UploadSection = styled.div`
  flex: 1;
  margin-top: 30px;

  @media (max-width: 1024px) {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

// export const UploadButton = styled.button`
//   background: ${(props) => props.theme.colors.white};
//   border: 1px solid #ccc;
//   padding: 12px 16px;
//   border-radius: 8px;
//   font-size: 16px;
//   font-weight: 400;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   width: 50%;

//   &:hover {
//     background-color: ${(props) => props.theme.colors.platinumlightgray};
//   }

//   @media (max-width: 1360px) {
//     width: 60%;
//   }
//   @media (max-width: 1024px) {
//     padding: 8px 12px;
//     font-size: 12px;
//     width: 50%;  
//   }

//   @media (max-width: 768px) {
//     width: 75%;
//   }

//   @media (max-width: 480px) {
//     width: 70%;
//   }
// `;

// export const UploadedFileName = styled.div`
//   margin-top: 10px;
//   color: #007bff;
//   cursor: pointer;
//   text-decoration: underline;
//   font-size: 14px;
// `;

// export const BrowseButton = styled.button`
//   background-color: ${(props) => props.theme.colors.brightblue};
//   color: ${(props) => props.theme.colors.white};
//   padding: 12px 20px;
//   margin-left: 10px;
//   border-radius: 8px;
//   border: none;
//   border-radius: 8px;
//   font-size: 18px;
//   font-weight: 400;
//   cursor: pointer;
//   width: 20%;

//   @media (max-width: 1360px) {
//     width: 25%;
//   }
//   @media (max-width: 1024px) {
//     padding: 8px 12px;
//     font-size: 14px;
//     width: 30%;  
//   }

//   @media (max-width: 768px) {
//     width: 20%;
//         margin-left: auto;
//   }

//   @media (max-width: 480px) {
//     width: 30%;
//   }
// `;

// export const SubmitButton = styled.button`
//   width: 20%;
//   background:linear-gradient(to right, #0dcaf0, #007bff);
//   color: ${(props) => props.theme.colors.secondary};
//   padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
//   font-size: 18px;
//   font-weight: 400;
//   border: none;
//   border-radius: 12px;
//   cursor: pointer;
//   font-family: ${(props) => props.theme.fonts.body};
//   transition: background-color 0.2s ease;
//   margin-top: ${(props) => props.theme.spacing(6)}; 
  
//   &:hover {
//     background-color: #0056b3;
//   }

//   &:disabled {
//     background-color: #ccc;   /* grey out */
//     cursor: not-allowed;      /* show disabled cursor on hover */
//     opacity: 0.7;             /* slightly faded */
//   }

  
//   @media (max-width: 1320px) {
//     width: 40%;
//   }

//   @media (max-width: 1024px) {
//     width: 35%;
//   }

//   @media (max-width: 990px) {
//     width: 40%;
//     margin: 20px auto;
//   }

//   @media (max-width: 768px) {
//   width: 35%;
//   margin: 25px auto;
//   padding: 10px;
//   }

//   @media (max-width: 480px) {
//   display: flex;
//   justify-content: center;
//     width: 90%;
//     margin: 20px auto 0;
//   }
// `;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }

`;

export const FlexUpload = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 1360px) {
gap: 10px;
}

  @media (max-width: 1024px) {
flex-wrap: nowrap; 
}

  @media (max-width: 820px) {
flex-wrap: nowrap; 
}

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

// export const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0; left: 0; right: 0; bottom: 0;
//   background: rgba(0,0,0,0.6);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 999;
// `;

// export const ModalContent = styled.div`
//   background: #fff;
//   padding: 20px;
//   width: 80%;
//   max-width: 600px;
//   border-radius: 10px;
//   position: relative;
// `;

// export const CloseButton = styled.button`
//   position: absolute;
//   top: 10px; right: 10px;
//   background: transparent;
//   border: none;
//   font-size: 20px;
//   cursor: pointer;
// `;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

// export const LoadingContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

export const FormContainer = styled.div`
  // margin-left: 35px;
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing(4)};
  font-family: ${(props) => props.theme.fonts.body};
  box-shadow:
    0 10px 20px rgba(0,0,0,0.04),
    0 2px 6px rgba(0,0,0,0.03);
  border: 1px solid ${(p) => p.theme.colors.platinumlightgray};
  // max-width: 1100px;
  // margin-top: 16px;
  width:80%;
  margin: 0 auto;

  @media (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: ${(p) => p.theme.spacing(3)};
  }
  @media (max-width: 1024px) { margin-left: 0; }
  @media (max-width: 768px) { margin: 0; border-radius: 12px; }
`;

export const Header = styled.div`
  display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-size: 34px; font-weight: 600; color: ${(p) => p.theme.colors.darkgray};
  margin: 0; letter-spacing: 0.2px;
  @media (max-width: 1360px){ font-size: 30px; }
  @media (max-width: 1024px){ font-size: 28px; }
  @media (max-width: 768px){ font-size: 26px; }
  @media (max-width: 480px){ font-size: 24px; }
`;

export const InputGroup = styled.div`
  margin-top: 20px; flex: 1;
  @media (max-width: 1024px){ margin-top: 12px; }
`;

export const Label = styled.label`
  display: block;
   font-size: 18px; 
  margin-bottom: 8px; 
  font-weight: 500;
  color: ${(p) => p.theme.colors.blueishblack};
  small { font-size: 12px; color: #818181; margin-left: 6px; }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${(p) => p.theme.colors.platinumlightgray};
  border-radius: 10px;
  font-size: 16px;
  color: ${(p) => p.theme.colors.darkgray};
  background: #fff;
  transition: box-shadow .15s ease, border-color .15s ease, background .2s ease;

  &:focus {
    outline: none;
    border-color: #4c82ff33;
    box-shadow: 0 0 0 4px #4c82ff1a;
    background: #fff;
  }

  &::placeholder { color: #a8a8a8; }

  &[as="textarea"], textarea& {
    min-height: 110px;
    resize: vertical;
    line-height: 1.45;
  }

  @media (max-width: 1024px) { font-size: 15px; padding: 12px; }
  @media (max-width: 480px) { font-size: 14px; padding: 10px; }
`;


export const UploadButton = styled.button`
  background: #fff;
  border: 1px dashed #cfd5e2;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 15px;
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; width: 50%;
  transition: background .2s ease, border-color .2s ease;

  &:hover { background: #f7f9ff; border-color: #b9c4dc; }

  @media (max-width: 1360px){ width: 60%; }
  @media (max-width: 1024px){ padding: 10px 12px; font-size: 14px; width: 50%; }
  @media (max-width: 768px){ width: 75%; }
  @media (max-width: 480px){ width: 70%; }
`;

export const BrowseButton = styled.button`
  background: linear-gradient(180deg, ${(p)=>p.theme.colors.brightblue} 0%, #3578ff 100%);
  color: #fff;
  padding: 12px 20px;
  margin-left: 10px;
  border: none; border-radius: 10px;
  font-size: 15px; font-weight: 500;
  cursor: pointer; width: 20%;
  box-shadow: 0 6px 14px rgba(53,120,255,0.22);
  transition: transform .05s ease, box-shadow .2s ease, filter .2s ease;

  &:hover { filter: brightness(0.97); box-shadow: 0 8px 18px rgba(53,120,255,0.28); }
  &:active { transform: translateY(1px); }

  @media (max-width: 1360px){ width: 25%; }
  @media (max-width: 1024px){ padding: 10px 12px; font-size: 14px; width: 30%; }
  @media (max-width: 768px){ width: 40%; margin-left: auto; }
  @media (max-width: 480px){ width: 45%; }
`;

export const UploadedFileName = styled.div`
  margin-top: 10px;
  display: inline-flex; align-items: center; gap: 8px;
  background: #f1f5ff;
  color: #2c5cff;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  border: 1px solid #e2e8ff;
  transition: background .2s ease, transform .05s ease;

  &:hover { background: #e9efff; }
  &:active { transform: translateY(1px); }
`;

export const SubmitButton = styled.button`
  width: 24%;
  background: linear-gradient(135deg, #0dcaf0 0%, #007bff 50%, #5b8cff 100%);
  color: #fff;
  padding: ${(p) => p.theme.spacing(2)} ${(p) => p.theme.spacing(2)};
  font-size: 16px; font-weight: 600;
  border: none; border-radius: 12px;
  cursor: pointer;
  font-family: ${(p) => p.theme.fonts.body};
  margin-top: ${(p) => p.theme.spacing(5)};
  box-shadow: 0 12px 24px rgba(0, 123, 255, 0.22);
  transition: transform .06s ease, box-shadow .2s ease, filter .2s ease;

  &:hover { filter: brightness(0.98); box-shadow: 0 14px 26px rgba(0,123,255,0.28); }
  &:active { transform: translateY(1px); }

  &:disabled {
    background: linear-gradient(135deg, #c7c7c7 0%, #bcbcbc 100%);
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.85;
  }

  @media (max-width: 1320px){ width: 40%; }
  @media (max-width: 1024px){ width: 38%; }
  @media (max-width: 990px){
    width: 50%;
    margin: 18px auto 0;
  }
  @media (max-width: 768px){
    width: 60%;
    margin: 22px auto 0;
    padding: 12px;
  }
  @media (max-width: 480px){
    display: flex; justify-content: center;
    width: 92%; margin: 18px auto 0;
  }
`;


export const ModalOverlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex; justify-content: center; align-items: center;
  z-index: 999;
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  background: #ffffff;
  padding: 18px;
  width: min(92vw, 820px);
  border-radius: 16px;
  position: relative;
  box-shadow:
    0 20px 40px rgba(2, 6, 23, 0.2),
    0 2px 10px rgba(2, 6, 23, 0.08);
`;

export const CloseButton = styled.button`
  position: absolute; top: 10px; right: 10px;
  background: #f3f6ff; border: 1px solid #dee6ff;
  color: #3a55ff; font-weight: 700;
  width: 32px; height: 32px; border-radius: 8px;
  font-size: 16px; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background .2s ease, transform .05s ease;
  &:hover { background: #e9efff; }
  &:active { transform: translateY(1px); }
`;

export const BackIcon = styled.a`
  font-size: 26px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 5px;

  @media (max-width: 1360px) {
    font-size: 24px;
    margin-right: 0px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;