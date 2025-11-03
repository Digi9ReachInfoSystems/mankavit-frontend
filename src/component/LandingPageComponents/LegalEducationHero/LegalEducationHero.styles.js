import styled from "styled-components";

export const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 4rem 6%;
  // min-height: 90vh;
  font-family: "Segoe UI", sans-serif;
  margin-top: 60px;

  @media (max-width: 1064px) {
    margin-top: 40px;
    padding: 3rem 4%;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 2rem 2%;
  }

  @media (max-width: 576px) {
    margin-top: 10px;
    padding: 0rem 2%;
    text-align: center;
  }
`;

export const Circle = styled.div`
  width: 1200px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(4, 148, 250, 0.5) 25%,
    rgba(4, 148, 250, 0) 60%,
    transparent 100%
  );
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: -1;

  @media (max-width: 1713px) {
    width: 1100px;
  }

  @media (max-width: 1568px) {
    width: 1000px;
    height: 800px;
  }
  @media (max-width: 1428px) {
    left: 55%;
  }

  @media (max-width: 1246px) {
    width: 850px;
    height: 750px;
    left: 60%;
    top: 40%;
  }

  @media (max-width: 1064px) {
    width: 670px;
    height: 670px;
    left: 60%;
    top: 35%;
  }

  @media (max-width: 837px) {
    width: 500px;
    height: 500px;
    left: 60%;
    top: 25%;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export const SecCircle = styled.div`
  width: 600px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #0dcaf04d 20%,
    #0dcaf00a 50%,
    transparent 100%
  );
  position: absolute;
  top: 70%;
  left: 40%;
  transform: translate(-50%, -50%);
  z-index: -1;

  @media (max-width: 1246px) {
    top: 60%;
    left: 35%;
  }
  @media (max-width: 1064px) {
    top: 50%;
    left: 40%;
  }
  @media (max-width: 837px) {
    top: 40%;
    left: 45%;
    width: 300px;
    height: 300px;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 700;
  color: #1a1a1a;
  // margin-bottom: 1rem;
  font-family: DM Serif Text;

  @media (max-width: 1428px) {
    font-size: 50px;
  }

  @media (max-width: 1246px) {
    font-size: 40px;
  }

  @media (max-width: 837px) {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 576px) {
    font-size: 28px;
  }
`;

export const SubTitle = styled.p`
  font-size: 22px;
  font-weight: 400;
  color: #252525;
  margin-bottom: 6rem;

  @media (max-width: 1246px) {
    font-size: 20px;
    margin-bottom: 5rem;
  }

  @media (max-width: 837px) {
    font-size: 14px;
    margin-bottom: 3rem;
  }
  @media (max-width: 576px) {
    font-size: 14px;
    margin-bottom: 2rem;
    // padding: 0 1.4rem;
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 836px) {
    gap: 1rem;
  }

  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const StartButton = styled.button`
  padding: 1.25rem 2.25rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  border: none;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: #fff;

  @media (max-width: 1246px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 837px) {
    padding: 0.6rem 1.6rem;
  }
    @media (max-width: 576px) {
    padding: 0.5rem 1.2rem;
    font-size: 12px;
  }
`;

export const ExploreButton = styled.button`
  padding: 1.25rem 2.25rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  border: none;
  background: #fff;
  color: #252525;
  border: 1px solid #252525;

  @media (max-width: 1246px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 837px) {
    padding: 0.6rem 1.6rem;
  }
    @media (max-width: 576px) {
    padding: 0.5rem 1.2rem;
    font-size: 12px;
  }
`;

export const LeftContent = styled.div`
  max-width: 50%;

  @media (max-width: 576px) {
    max-width: 100%;
    display: none;
  }
`;

export const LeftContentMobile = styled.div`
  display: none;
  // padding: 1rem;
  @media (max-width: 576px) {
    display: flex;
    allign-items: center;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
  }
`;

export const RightImage = styled.div`
  max-width: 90%;
  min-height: 40px;
  margin-right: 1rem;
  margin-top: -3%;

  img {
    width: 100%;
    height: 650px;

    @media (max-width: 1428px) {
      height: 600px;
    }

    @media (max-width: 1246px) {
      height: 530px;
    }
    @media (max-width: 1064px) {
      height: 430px;
    }

    @media (max-width: 837px) {
      height: 300px;
    }
  }
  @media (max-width: 1428px) {
    max-width: 80%;
  }

  @media (max-width: 837px) {
    max-width: 40%;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 8%;

  @media (max-width: 768px) {
    padding: 2rem 5%;
    gap: 1rem;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const StatBox = styled.div`
  background: #e2ecfe;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  width: 300px;
  @media (max-width: 768px) {
    // width: 200px;
    text-align: left;
    // padding: 1rem;
  }

  @media (max-width: 576px) {
    // width: 70%;
    margin: 0 auto;
    padding: 1rem;
    
  }
`;

export const StatTitle = styled.h2`
  font-size: 36px;
  margin-top: 20px;
  color: #007bff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
    @media (max-width: 576px) {
    font-size: 14px;
  }
`;

export const StatsDescription = styled.p`
  font-size: 18px;
  color: #203643;
  margin: 0;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;
