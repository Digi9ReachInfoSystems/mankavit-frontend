import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 0rem 1rem;
  width: 70%;
//   display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  margin-left: 30px;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;


export const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
`;

export const CoursesWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 3rem;
  // flex-wrap: nowrap;
   max-width: 500px;
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
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin: 0 0 1rem 0;
  }
`;

export const FilterButton = styled.button`
background: ${({ active }) =>
  active
    ? 'linear-gradient(to right, #0DCAF0, #007BFF)'
    : '#D3D3D3'};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
`;

export const CardGrid = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto; 
  flex-wrap: nowrap;

  // &::-webkit-scrollbar {
  //   height: 8px; /* customize scrollbar height */
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: #ccc;
  //   border-radius: 10px;
  // }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;


export const CourseCard = styled.div`
 background: #ABBED140;
  // border: 2px solid ${({ completed }) => (completed ? '#28a745' : '#e0e0e0')};
  // border-radius: 14px;
  overflow: hidden;
  // box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  display: flex;
  flex-direction: column;
  transition: border 0.3s ease;
  overflow: hidden;
  min-width: 300px; 
  max-width: 350px; 
  margin-bottom: 1rem;
`;


export const ImageWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 120px;

    @media (max-width: 768px) {
      height: 100px;
    }
  }
`;

export const ProgressContainer = styled.div`
  margin-bottom: 0;
    padding: 10px 40px;

`;

export const ProgressLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: #ccc;
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #007bff, #66b2ff);
  border-radius: 6px 0 0 6px;
  transition: width 0.4s ease;
`;

export const CourseContent = styled.div`
//   padding: 1rem;
  padding: 15px 40px;
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
`;

export const CourseMinititle = styled.p`
display: flex;
align-items: center;
justify-content: center;
  color: #555;
  font-size: 16px;
  margin: 5px 0 0 0;
`;

export const CourseDesc = styled.p`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.test};
  font-size: 16px;
  font-wieght: 300;
  line-height: 1.5;
`;

export const Details = styled.div`
  margin: 0.5rem 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.chorcaolgray};
`;

export const DetailItem = styled.div`
  margin: 3px 0;
`;

export const DetailItemok = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #28a745;
  font-size: 18px;
  line-height: 1.3;
`;

export const PriceActions = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
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

export const ListSection = styled.div`
  margin-top: 3rem;
`;

export const ListCard = styled.div`
  border: 1px solid ${({ live }) => (live ? "red" : "#2196f3")};
  background-color: ${({ live }) => (live ? "#ffe6e6" : "#f0f8ff")};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

export const ListTime = styled.div`
  text-align: center;
  margin-right: 1rem;
  background: linear-gradient(to right, #007bff, #66b2ff);
  padding: 15px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

export const Testdate = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.aliceBlue};
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;
`;

export const Testmonth = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.aliceBlue};
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;
`;

export const Testtime = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pastelBlue};
  margin-bottom: 5px;
  margin-top: 0;
  text-align: left;
`;

export const ListContent = styled.div`
 
`;

export const Testtitle = styled.h5`
  margin: 0;
  font-size: 1.1rem;
`;

export const Testpara = styled.p`
  margin: 0.2rem 0 0;
  color: gray;
`;

export const LiveBadge = styled.span`
  background-color: red;
  color: white;
  padding: 0.1rem 0.3rem;
  font-size: 0.7rem;
  border-radius: 5px;
`;

export const ViewAllLink = styled.span`
  float: right;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.royalBlue};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.charcoalGray};
`;