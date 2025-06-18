import styled from 'styled-components';

// export const MainContainer = styled.div`
//     // padding: 0rem 1rem;
//     // display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     // margin-left: 30px;
//     margin-bottom: 3rem;
//     width: 100%;
  
//     @media (max-width: 768px) {
//       padding: 1rem;
//     }
//   `;

  export const Wrapper = styled.div`
    display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  // padding: 0 2rem;

  @media (max-width: 480px) {
    gap: 0;
  }
  `;

  export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 36px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.jetBlack};

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1rem 0;
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const CertificatesWrapper = styled.div`
  display: flex;
  // gap: 2rem;
  // flex-wrap: nowrap;
  // width: 100%;
  overflow-x: auto;
  // whitespace: nowrap;
`;

export const CertificateDownload = styled.div`
 display: flex;
 font-size: 16px;
 font-weight: 500;
 margin-bottom: 1rem;
 justify-content: space-between;
`;

export const CertificateCard = styled.div`
 padding: 10px;
 width: 100%;
  // min-width: 300px; 
  max-width: 650px; 
 overflow: hidden;
 flex-shrink: 0; 

 @media (max-width: 768px) {
    max-width: 300px;
  }
  @media (max-width: 480px) {
    max-width: 250px;
    padding: 10px 0;
  }
`;

export const CertificateImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 8px;

  @media (max-width: 1024px) {
    height: 250px;
  }
  @media (max-width: 768px) {
    height: 200px;
  }
  @media (max-width: 480px) {
    height: 150px;
  }
`;
