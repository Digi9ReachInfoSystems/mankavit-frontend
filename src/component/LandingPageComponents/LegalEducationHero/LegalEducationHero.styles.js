import styled from 'styled-components';

export const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 4rem 6%;
  background-color:fff;
  // min-height: 90vh;
  font-family: 'Segoe UI', sans-serif;
  margin-top: 60px;
`;

export const Circle = styled.div`
  width: 1200px;
  height: 900px;
  border-radius: 50%;
 background: radial-gradient(circle, rgba(4,148,250,0.5) 25%, rgba(4,148,250,0) 60%, transparent 100% );
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

export  const SecCircle = styled.div`
  width: 600px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #0DCAF04D 20%,
    #0DCAF00A 50%,
    transparent 100%
  );
  position: absolute;
  top: 70%;
  left: 40%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

export const Title = styled.h1`
  font-size: 80px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  font-family: DM Serif Text;
`;

export const SubTitle = styled.p`
  font-size: 25px;
  font-weight: 400; 
  color: #252525;
  margin-bottom: 6rem;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  gap: 2rem;
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
`;

export const LeftContent = styled.div`
  max-width: 50%;
`;

export const RightImage = styled.div`
  max-width: 50%;
  min-height: 40px;
      margin-top: 6rem;
    margin-right: 6rem;

  img {
    width: 100%;
    height: 500px;

  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 8%;
`;

export const StatBox = styled.div`
  background: #E2ECFE;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: left;
  width: 300px;
`;

export const StatTitle = styled.h2`
  font-size: 36px;
  margin-top: 20px;
  color: #007BFF;
  margin: 0;
`;

export const StatsDescription = styled.p`
  font-size: 20px;
  color: #203643;
  margin: 0;
  margin-top: 10px;
`;
