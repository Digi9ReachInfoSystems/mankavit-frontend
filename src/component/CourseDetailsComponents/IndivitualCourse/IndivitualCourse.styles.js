import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  width:80%;
  margin: 0 auto;

  @media (max-width: 1360px) {
    width:90%;
  }

  @media (max-width: 1024px) {
    width:95%;
    padding: 20px 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const BackLink = styled.div`
border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 576px) {
    padding: 5px;
  }
`;

export const BackIcon = styled.a`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 5px;

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const MainTitle = styled.h2`
  font-size: 32px;
  font-weight: 400;
  margin: 0px;

  span{
    color: #007bff;
  }

  @media (max-width: 576px) {
    font-size: 24px;
  }
`;

export const CourseIncludes = styled.h3`
  font-size: 20px;
  font-weight: 400;
  margin: 20px 0 10px;
  color: #313131;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

export const CourseImage = styled.img`
  width: 100%;
  height: 600px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const TitleRatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 22px;
  }
`;

export const ListBull = styled.li`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 400;
  color: #313131;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

export const Rating = styled.div`
  font-size: 24px;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 20px;
  font-weight: 600;
  margin-right: 10px;

  @media (max-width: 576px) {
    font-size: 22px;
  }
`;

export const BulletList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin: 10px 0 10px 20px;
`;

export const Highlight = styled.span`
  color: #313131;
  font-weight: 600;
`;

export const Description = styled.div`
  list-style: disc;
  padding-left: 20px;
  margin: 10px 0 10px 20px;
`;

export const EnrollButton = styled.button`
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: white;
  font-size: 24px;
  // padding: 30px 22px;
  padding:15px 30px;
  border: none;
  border-bottom-left-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
  width: 100%;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 1024px) {
    font-size: 20px; 
    padding: 25px 28px;
  }

  @media (max-width: 768px) {
    border-bottom-left-radius: 0px;
    padding: 16px 24px;
  }
`;

export const CourseButton = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
  margin-top:20px; 

  @media (max-width: 768px) {
  flex-direction: column-reverse;
  }
  
`;

export const FeaturesRow = styled.div`
  display: flex;
  gap: 25px;
  font-size: 20px;
  color: #007bff;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  @media (max-width: 1360px) {
  gap: 10px;
  font-size: 16px;
  }

  @media (max-width: 1024px) {
    gap:5px;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    gap: 20px;
    font-size: 16px;
  }

  @media (max-width: 576px) {
    gap: 10px;
    font-size: 12px;
  }
`;



export const Feature = styled.div`
// width: 50px;
// height: 50px;
position: relative;
// background: linear-gradient(to right, #0dcaf0, #007bff);
border-radius: 50px;

.lock-icon{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

  @media (max-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;
export const Statdesc = styled.span`
font-size: 20px;
font-weight: 400;
color: #313131;
  margin-left: 0px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
 

export const CourseStats = styled.div`
  font-size: 20px;
  color: #1a73e8;
  margin-top: 4px;
  margin-left:30px;

  @media (max-width: 1024px) {
    font-size: 16px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
 
export const StatLink = styled.span`
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
  margin-left: 10px;
 
  &:nth-child(1) {
    margin-left: 0;
  }

  @media (max-width: 480px) {
    margin-right: 2px;
    margin-left: 2px;
  }
`;
export const StarContainer = styled.span`
  margin-left: 8px;
  display: inline-flex;
  gap: 2px;
  vertical-align: middle;
`;


 
export const PlayButton = styled.div`
      background: linear-gradient(to right, #0DCAF0, #007BFF);
  width: 84px;
  height: 84px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
 
  span {
    margin-left: 5px;

    @media (max-width: 480px) {
      margin-left: 0;
    }
  }
`;



export const CourseInfo = styled.div`
//   h2 {
//     font-size: 1.8rem;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 0.95rem;
//     margin-bottom: 15px;
//   }
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  background: #fff;
`;

export const CourseDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-direction: column;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const CourseSubject = styled.h2`
  font-size: 35px;
  color: #313131;
  width: 100px;
  margin: 0;
  margin-bottom: 10px;
  margin-left:30px;
  width: 100%;

  @media (max-width: 1024px) {
    font-size: 28px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const liveClass = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #000;
  font-weight: 500;
  margin-bottom: 20px;
  margin-left: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 0px;
    margin-top: 10px;
  }
`;

export const FeaturesContainer = styled.div`
  display: flex;
  // justify-content: space-between;
  width: 100%;
  margin: auto;
  // padding: 0 1rem;
  font-family: Arial, sans-serif;
  width: 100%;

  @media (max-width: 1024px) {
    width: 95%;
    margin: 10px 0;
  }
`;

export const FeatureColumn = styled.ul`
  flex: 1;
  margin: 0 1rem;
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  list-style-type: disc;
  padding-left: 1.5rem;

  @media (max-width: 480px) {
  margin: 0;
  }
`;

export const FeatureItem = styled.div`
 margin-bottom: 8px;
  font-size: 20px;
  font-weight: 400;
  color: #313131;
  width: 100%;
  .link {
    text-decoration: none;
    color: #007bff;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
export const Bullet = styled.span`
  color: #313131;
  font-size: 24px;
  padding-right: 10px;
`;
export const IconText = styled.span``;

export const SubjectList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

export const SubjectListItem = styled.li`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 400;
  color: #313131;
`;