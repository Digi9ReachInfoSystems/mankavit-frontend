// components/Mission.styles.js
import styled from "styled-components";

export const MissionSection = styled.section`
 padding: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 1360px) {          
      padding: 0 1rem;
  }

  @media (max-width: 1024px) {
      padding: 0 1rem;
  }

  @media (max-width: 768px) {
      padding: 0 10px;
  }

  @media (max-width: 480px) {
      padding: 0 5px;
  }
 
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.darkgray};

  @media (max-width: 768px) {
      font-size: 32px;
  }

  @media (max-width: 540px) {
      font-size: 26px;
  }
 
`;

export const Underline = styled.div`
  width: 20%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.vividblue};
  margin: 0.5rem auto 2rem;
  border-radius: 2px;

  @media (max-width: 1024px) {
      width: 35%;
  }

  @media (max-width: 768px) {
      width: 35%;
  }

  @media (max-width: 540px) {
      width: 45%;
      margin: 0rem auto 1.5rem;
  }

  @media (max-width: 480px) {
      width: 55%;
  }
 
`;

export const CardandDescription = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;

`;

export const CardsContainer = styled.div`
  display: flex;
  // justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: nowrap;
    overflow-x: scroll;
  scroll-behavior: smooth;
      max-width: 100%;

  // @media (max-width: 1450px) {
  //   gap: 1.5rem;
  // }

  @media (max-width: 1360px) {
    gap: 1rem;
}

@media (max-width: 1024px) {
    gap: 1rem;
}

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: row;
}

@media (max-width: 540px) {
    gap: 0.5rem;
    // flex-direction: column;
}

@media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
}

`;

export const Card = styled.div`
  min-width: 300px;
  text-align: center;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;

  @media (max-width: 1360px) {
    height: 200px;
    width: 300px;
}

@media (max-width: 1024px) {
    height: 200px;
    width: 200px;
}
  @media (max-width: 768px) {
    height: 250px;
    width: 200px;
}

@media (max-width: 540px) {
    height: 250px;
    width: 250px;
}

@media (max-width: 480px) {
    height: 200px;
    width: 300px;
}

`;

export const CardTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 5px;
  margin-top: 0px;
  color: ${({ theme }) => theme.colors.pureblack};
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 20px;
}

  @media (max-width: 768px) {
    font-size: 20px;
}

@media (max-width: 480px) {
    font-size: 18px;
}
`;

export const CardDescription = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.test};
  font-weight: normal;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin-top: 15px;
  margin-left: 15%;
  margin-right: auto;
  text-align: left;
  color: ${({ theme }) => theme.colors.darkgray};
  line-height: 1.4;
  width: 60%;

  @media (max-width: 1360px) {
  font-size: 20px;
  width: 70%;
  margin-left: 15%;
}

@media (max-width: 1024px) {
  font-size: 18px;
  width: 70%;
  margin-left: 18%;
}

@media (max-width: 820px) {
  font-size: 18px;
  width: 80%;
  text-align: left;
  margin-left: 10%;
}

@media (max-width: 768px) {
  font-size: 18px;
  width: 80%;
  text-align: left;
  margin-left: 10%;
}

@media (max-width: 540px) {
  font-size: 18px;
  width: 80%;
  margin-left: 15%;

@media (max-width: 480px) {
  font-size: 16px;
  width: 80%;
  text-align: left;
  margin-left: 10%;
  margin-right: 0%;
}
`;

export const CTAButton = styled.button`
  margin-top: 5px;
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  color: ${({ theme }) => theme.colors.lightwhite};
  font-size: 20px;
  font-weight: 400;
  padding: 20px 30px;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.accent};
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 20%;
  margin:auto;

  &:hover {
  background: linear-gradient(to right, #0DCAF09d, #007BFF9d);
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 15px 25px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px 25px;
  }
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
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 8px 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to right, #0DCAF09d, #007BFF9d);
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: -10px;
  margin-bottom: 10px;
`;
