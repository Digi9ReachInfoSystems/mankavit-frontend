import styled from 'styled-components';

export const ReviewContainer = styled.div`
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

export const Ratings = styled.div`
  display: flex;
  gap: 20px;
`;

export const RatingTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const StarsRow = styled.div`
  display: flex;
  gap: 10px;
  font-size: 56px;
  margin-bottom: 20px;
`;

export const Star = styled.span`
  cursor: pointer;
  color: #ddd;

  &:hover {
    color: #fbc02d;
  }
`;

export const ReviewInputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ReviewInput = styled.input`
  flex: 1;
  padding: 20px 20px;
  border-radius: 10px;
  border: none;
  background: #F1F4FF;
  font-size: 14px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;

`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 20px;
  color: #000;
  cursor: pointer;
  font-size: 40px;
`;

export const ReviewWrapper = styled.div`
  padding: 24px;
  background: #fff;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 180px);
  grid-template-rows: repeat(2, 180px);
  gap: 10px;
  margin-bottom: 30px;

  @media (max-width: 1500px) {
        grid-template-columns: repeat(2, 140px);
  grid-template-rows: repeat(2, 140px);
  }
`;

export const VideoThumbnail = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 8px;
  background: url(${(props) => props.src}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:nth-child(4)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
  }

  @media (max-width: 1500px) {
    width: 140px;
    height: 140px;
  }
`;


export const OverlayText = styled.div`
  position: absolute;
  z-index: 2; /* Ensures it's above the ::after overlay */
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
`;

export const TestimonialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const StudentCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const StudentProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 20%;

  @media (max-width: 1500px) {
    width: 40%;
  }
`;

export const StudentImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 1500px) {
    width: 50px;
    height: 50px;
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StudentName = styled.span`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

export const StudentTag = styled.span`
  font-size: 14px;
  color: #888;
  text-align: center;
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReviewDes = styled.p`
  font-size: 24px;
  margin: 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 1500px) {
    font-size: 20px;
  }
`;

export const HighlightText = styled.span`
  font-weight: bold;
  display: block;
  font-size: 24px;
`;

export const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 24px;
//   margin-left: 56px;

  svg {
    font-size: 16px;
  }

  @media (max-width: 1500px) {
    font-size: 20px;
  }

  .star{
    size: 30px;

    @media (max-width: 1500px) {
    font-size: 20px;
  }

`;

export const SectionContainer = styled.div`
  display: flex;
  gap: 40px;
`;

export const ReviewsContents = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
`;
