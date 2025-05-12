import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 0rem 1rem;
//   display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  // margin-left: 30px;
  margin-bottom: 0;
 width: 100%;
 box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0rem;
  }
  `;

export const ListSection = styled.div`
  margin-top: 0rem;

  @media (max-width: 480px) {
    margin-top: 0;
  }
`;

export const ListCard = styled.div`
  background-color: ${({ theme }) => theme.colors.aliceBlue};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
background-image: linear-gradient(white, white), linear-gradient(to right, #0DCAF0, #007BFF);
background-origin: border-box;
background-clip: padding-box, border-box;
 
&:hover {
  border: 2px solid ${({ theme }) => theme.colors.vividRed};
}

@media (max-width: 480px) {
  padding: 5px;
}
`;

export const ListTime = styled.div`
  text-align: center;
  margin-right: 1rem;
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  padding: 15px;
  width: 80px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  @media (max-width: 1024px) {
    width: 70px;
  }

  @media (max-width: 480px) {
    width: 50px;
    padding: 10px;
  }
`;

export const Testdate = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.aliceBlue};
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const Testmonth = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.aliceBlue};
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Testtime = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pastelBlue};
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ListContent = styled.div`
   ${({ theme }) => theme.colors.darkblueGray};
   font-size: 22px;

   @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Testtitle = styled.h5`
  margin: 0;
     font-size: 20px;
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Testsubtitle = styled.h5`
margin: 0;
   font-size: 20px;
  font-weight: 700;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    // font-size: 12px ;
    display: none;
      }
`;

export const Testpara = styled.p`
  margin: 0.2rem 0 0;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ClassCard = styled.div`
  text-align: center;
  margin-right: 1rem;
  background: ${({ theme }) => theme.colors.vividRed};
  padding: 15px;
  width: 80px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  @media (max-width: 1024px) {
    width: 70px;
  }

  @media (max-width: 480px) {
    width: 50px;
    padding: 10px;
  }
`;

export const Classtime = styled.p`
  margin: 0.2rem 0 0;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const LiveBadge = styled.span`
display: flex;
align-items: center;
  color: ${({ theme }) => theme.colors.white};
  // padding: 0.1rem 0.3rem;
  font-size: 20px;
  border-radius: 5px;

  .liveDot{
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  margin-left: 5px;

  @media (max-width: 1024px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
}

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Testattempt = styled.p`
  margin: 12px 0px 5px 0;
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.salmonPink};

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    margin: 5px 0px 5px 0;
  }
`;

export const Testdetails = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  margin: 0 0;
  font-weight: 100;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.graniteGray};

   .testDetails{
    margin: 0;
  }

  .endLine{
    height: 15px;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.graniteGray};
    margin: 0 10px;

    @media (max-width: 1024px) {
      height: 14px;
      margin: 0 8px;
    }

    @media (max-width: 480px) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
 }
`;

export const ViewAllLink = styled.span`
  float: right;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.royalBlue};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 32px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.charcoalGray};

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;