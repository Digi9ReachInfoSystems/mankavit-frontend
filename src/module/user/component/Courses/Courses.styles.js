import styled from 'styled-components';

export const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  // padding: 0 2rem;
  width: 100%;
  // max-width: 75vw;
  box-sizing: border-box;
  overflow-x: auto;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
    margin-top: 0;
    margin-bottom: 0;
      color: ${({ theme }) => theme.colors.jetBlack};

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1rem 0;
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const CardGrid = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  // flex-wrap: nowrap;
  // width: 100%;

  // Important: Prevent shrinking
  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const CourseCard = styled.div`
 background: #ABBED140;
  // border: 2px solid ${({ completed }) => (completed ? '#28a745' : '#e0e0e0')};
  // border-radius: 14px;
  // overflow: hidden;
  // box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  display: flex;
  flex-direction: column;
  transition: border 0.3s ease;
  // overflow: hidden;
  // min-width: 300px; 
  max-width: 300px; 
  margin-bottom: 1rem;
  position: relative;
  height: 500px;

  @media (max-width: 1024px) {
    max-width: 280px;

    @media (max-width: 768px) {
    max-width: 230px;
    }
  
    @media (max-width: 480px) {
    // margin-left: 10px;
      max-width: 270px;
    }
  }
`;


export const ImageWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 150px;

    @media (max-width: 1360px) {
      height: 110px;
    }
    @media (max-width: 768px) {
      height: 90px;
    }
  }
`;

export const ProgressContainer = styled.div`
  margin-bottom: 0;
    padding: 10px 40px;
    height: 60px;

    @media (max-width: 768px) {
      padding: 10px 20px;
    }
`;

export const ProgressBarContainer = styled.div`
   margin-bottom: 5px;
    padding: 10px 40px;

    .stars {
      display: flex;
      font-size: 18px;
    }

    @media (max-width: 1024px) {
      margin-bottom: 6px;
    }
    @media (max-width: 768px) {
      padding: 10px 20px;
      margin-bottom: 5px;
    }   
`;  

export const ProgressLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
  // margin-bottom: 8px;
  margin-top: 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: #ccc;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 5px;

 @media (max-width: 768px) {
    height: 8px;
  }
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #007bff, #66b2ff);
  border-radius: 6px 0 0 6px;
  transition: width 0.4s ease;
`;

export const CourseContent = styled.div`
//   padding: 1rem;
  padding: 10px 40px;

  @media (max-width: 768px) {
    padding: 0px 20px;
  }
`;

export const CourseMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const CourseHead = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkgray};
  font-weight: 400;
`;

export const CourseTitle = styled.h3`
  font-size: 28px;
  margin: 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 68px;


  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const CourseMinititle = styled.p`
  font-size: 16px; 
  margin: 5px 0 ;
    word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
    height: 45px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CourseDesc = styled.p`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.test};
  font-size: 16px;
  font-wieght: 600;
  line-height: 1.5;
    word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
    height: 50px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Details = styled.div`
  margin: 0.5rem 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.chorcaolgray};
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DetailItem = styled.div`
  margin: 1px 0;
`;

export const DetailItemok = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #28a745;
  font-size: 18px;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PriceActions = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;

  @media (max-width: 1024px) {
    margin-top: 0rem;
  }
`;

export const ViewButton = styled.button`
  background-color: ${(props) => (props.completed ? '#02B029' : '#007bff')};
  color: #fff;
  padding: 1rem 1.2rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`;


export const NoCourseFoundButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  border-radius:10px;
  margin-left: 10px;
  // width: 100%;
  // border-bottom-left-radius: 14px;
  // border-bottom-right-radius: 14px;
`;
