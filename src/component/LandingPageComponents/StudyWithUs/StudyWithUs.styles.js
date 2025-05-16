import styled from "styled-components";

export const Container = styled.div`
  padding:  2rem;
  text-align: center;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

export const Content = styled.div`
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 55px;
  font-weight: 400;
  margin: 1rem;

  @media (max-width: 1636px) {
    font-size: 50px;
  }

  @media (max-width: 1468px) {
    font-size: 45px;
  }
    @media (max-width: 1024px) {
      font-size: 40px;
    }
      @media (max-width: 863px) {
        font-size: 30px;
        
      }
`;

export const Highlight = styled.span`
  color: #007bff;
`;

export const Divider = styled.div`
  width: 22%;
  height: 6px;
  background-color: #007bff;
  margin: 3.5rem auto 2.5rem;
  border-radius: 2px;

  @media (max-width: 1024px) {
    width: 50%;
    height: 4px;
    margin: 3rem auto 2rem;
  }

  @media (max-width: 868px) {
    width: 40%;
    height: 3px;
    margin: 2.5rem auto 2rem;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 868px) {
        justify-content: space-evenly;
  }
`;

export const Card = styled.div`
  background: #fff;
  width: 500px;
  text-align: center;
  position: relative;
  height: 510px;

  @media (max-width: 1802px) {
  width: 450px;
  }

  @media (max-width: 1636px) {
    width: 400px;
    height: 470px;
  }

  @media (max-width: 1468px) {
    width: 350px;
    height: 450px;
  }

  @media (max-width: 1320px) {
    width: 310px;
    height: 430px;
  }

  @media (max-width: 1179px) {
    width: 250px;
    height: 380px;
  }

  @media (max-width: 1024px) {
    width: 200px;
    height: 350px;
  }

  @media (max-width: 863px) {
    width: 180px;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 250px;
  }

  @media (max-width: 576px) {
    width: 90%;
    height: 350px
  }

  @media (max-width: 380px) {
    width: 90%;
    height: 400px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

  @media (max-width: 1636px) {
    height: 250px;
  }

  @media (max-width: 1179px) {
    height: 180px;
  }

  @media (max-width: 1024px) {
    height: 150px;
  }

  @media (max-width: 768px) {
    height: 150px;
  }

  @media (max-width: 576px) {
    height: 250px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 36px;
  font-weight: 400;
  color: #252525;
  margin-bottom: 0.5rem;

  @media (max-width: 1468px) {
    font-size: 30px;
  }

  @media (max-width: 1024px) {
    font-size: 25px;
  }


    @media (max-width: 853px) {
    font-size: 13px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
  }

`;

export const CardDescription = styled.p`
  font-size: 22px;
  font-weight: 300;
  color: #252525;
  position: absolute;
  bottom: 0;

  @media (max-width: 1802px) {
    font-size: 18px;
  }

  @media (max-width: 1468px) {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 868px) {
    font-size: 8px;
  }

  @media (max-width: 576px) {
    font-size: 14px;  
  }
`;
