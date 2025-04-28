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
  gap: 20px;
  margin-bottom: 40px;
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const CardsWrapper = styled.div`
  display: flex;
//   flex-wrap: wrap;
  gap: 20px;
  justify-content: center;  
`;

export const CourseCard = styled.div`
  width: 400px;
  background-color: #f9f9ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
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


  span {
    margin-top: 20px;
    font-size: 14px;
    color: #333;
  }
`;

export const CourseTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 5px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

export const InfoList = styled.ul`
  padding-left: 15px;
  font-size: 13px;
  margin-bottom: 15px;
`;

export const InfoItem = styled.li`
  margin-bottom: 4px;
`;

export const PriceButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: default;
  margin-right: 10px;
`;

export const ViewButton = styled.button`
  background-color: #fff;
  color: #2d79f3;
  border: 1px solid #2d79f3;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #2d79f3;
    color: #fff;
  }
`;

export const ViewMoreWrapper = styled.div`
  margin-top: 40px;
`;

export const ViewMoreButton = styled.button`
  background-color: #fff;
  color: #2d79f3;
  border: 2px solid #2d79f3;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #2d79f3;
    color: #fff;
  }
`;
