import styled from 'styled-components';
import { FaPlayCircle, FaRegStickyNote } from 'react-icons/fa';

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
// border: 1px solid #ccc;
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
  font-size: 30px;
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
     margin-left: 10px;
     font-size: 28px;
  }

  @media (max-width: 576px) {
    font-size: 24px;
  }
`;

export const CourseImage = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const VideoSection = styled.div`
  margin-top: 20px;

  .success {
  display:flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  padding: 20px 0;

  }
`;

export const SectionTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 20px;
  background: ${({ active }) => (active ? 'linear-gradient(to right, #85FE83, #04B700)' : '#D3D3D3')};
  color: ${({ active }) => (active ? '#fff' : '#fff')};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;    
`;

export const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CourseItem = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .courseDetails {
    display: flex; 
    align-items: center;
    gap: 50px;
  }

  .noteIcon {
      font-size: 32px;
    color: #08B904;
    padding:4px;
  }
`;

export const VideoIcon = styled.div`
border: 1px solid #08B904;
padding: 5px;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;

  .videoIcon {
    font-size: 20px;
    color: #08B904;
    padding:4px;
  }
`;

export const CourseTitle = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: 20px;
`;

export const CourseDuration = styled.p`
  font-size: 16px;
  margin: 0;
  margin-top: 10px
  color: #666;
`;

export const CompletedButton = styled.button`
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  background:  linear-gradient(to right, #85FE83, #04B700);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: default;
  width: 30%;
`;

export const SuccessText = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #00cc66;
    display: flex;
  align-items: center;
  gap: 10px;
`;

export const CertificateLink = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #000;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const PlayIcon = styled(FaPlayCircle)`
  font-size: 24px;
  color: #00cc66;
`;

export const NoteIcon = styled(FaRegStickyNote)`
  font-size: 24px;
  color: #00cc66;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  background: #fff;
`;

export const Rating = styled.div`
  font-size: 14px;
  color: #222;
  margin-bottom: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const Star = styled.span`
  color: ${({ faded }) => (faded ? '#ccc' : '#fbc02d')};
  margin-left: 2px;
`;

export const CourseDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export const PlayButton = styled.div`
  background: linear-gradient(135deg, #85FE83, #04B700);
  width: 84px;
  height: 84px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  span {
    margin-left: 5px;
  }
`;

export const CourseSubject = styled.h2`
  font-size: 35px;
  color: #313131;
  width: 200px;
  margin: 0;
  margin-bottom: 10px;
  margin-left:30px;
`;

export const CourseStats = styled.div`
  font-size: 18px;
  color: #1a73e8;
  margin-top: 4px;
  margin-left:30px;
`;

export const StatLink = styled.span`
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
  margin-left: 10px;

  &:nth-child(1) {
    margin-left: 0;
  }
`;

export const LiveClass = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #000;
  font-weight: 500;
  margin-top: 20px;
`;

export const TVIcon = styled.span`
  font-size: 24px;
  margin-left: 6px;
`;

export const StarContainer = styled.span`
  margin-left: 8px;
  display: inline-flex;
  gap: 2px;
  vertical-align: middle;
`;

export const Image = styled.img`
  width: 400px;
  height: 100px;
  border-radius: 20px;

`;

export const SubjectItem = styled.div`
display: flex;
align-items: center;
`;

export const SubjectName = styled.p`
font-weight: bold;
margin-left: 10px;
width: 20%;
font-size: 24px;
`;

export const Session = styled.p`
font-size: 16px;
color: #666;
width: 80%;
text-align: center;
`;

