import styled from 'styled-components';

export const Section = styled.section`
  padding: 60px 20px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: left;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px; 
  width: 100%;
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  justify-content: center;  

  @media (max-width: 1200px) {
    overflow-x: auto;
    gap: 20px;
    padding-bottom: 10px;

    /* Optional: hide scrollbar visually but keep functionality */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  /* Each child should have a min-width to scroll properly */
  & > * {
    @media (max-width: 1200px) {
      min-width: 300px;
      flex: 0 0 auto;
    }
  }
`;

export const CourseCard = styled.div`
  background-color: #F1F4FF;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
    // height: 20vw;
`;

export const CardHeader = styled.div`

`;

export const Image = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 0px;
`;

export const CardBody = styled.div`
  padding: 15px;
  text-align: left;
  width: 70%;
  margin: 0 auto;

  span {
    margin-top: 20px;
    font-size: 14px;
    color: #333;
  }
`;

export const CourseTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0 5px;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
  height: 70px;
`;

export const InfoList = styled.ul`
  padding-left: 15px;
  font-size: 13px;
  margin-bottom: 4rem;
`;

export const InfoItem = styled.li`
  margin-bottom: 4px;
  font-size: 14px;
`;

export const PriceButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 10px;
  font-size: 14px;
  cursor: default;
  width: 50%;
`;

export const ViewButton = styled.button`
background-color: transparent;
  color: #2d79f3;
  padding: 12px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold; 
  width: 50%;

  &:hover {
text-decoration: underline;
  }
`;

export const ViewMoreWrapper = styled.div`
  margin-top: 40px;
`;

export const ViewMoreButton = styled.button`
  background-color: #fff;
  color: #2d79f3;
  border: 2px solid #2d79f3;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #2d79f3;
    color: #fff;
  }
`;
