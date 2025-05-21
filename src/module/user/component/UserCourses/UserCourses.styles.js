import styled from 'styled-components';

export const CourseWrapper = styled.div`
display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0rem;
  // padding: 0 2rem;
  width: 100%;
  // max-width: 75vw;
  box-sizing: border-box;
  overflow-x: auto;
  
  @media (max-width: 986px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0;
    margin-bottom: 0;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
    margin-top: 10px;
    margin-bottom: 0;
      color: ${({ theme }) => theme.colors.jetBlack};

  @media (max-width: 768px) {
    font-size: 28px;
    margin: 0;
  }

  @media (max-width: 480px) {
  font-size: 24px;
    margin: 0;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin: 0 0 1rem 0;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin: 0;
  }
`;

export const FilterButton = styled.button`
  background: ${({ active }) =>
    active ? 'linear-gradient(to right, #0DCAF0, #007BFF)' : '#D3D3D3'};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 12px;
  fpnt-size: 14px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  &:hover {
    background: linear-gradient(to right, #0DCAF0, #007BFF);
    opacity: 0.5;
  }
`;



// export const CardGrid = styled.div`
//   display: flex;
//   gap: 2rem;
//   overflow-x: auto; 
//   flex-wrap: nowrap;
//   max-width: 1300px;

//   // &::-webkit-scrollbar {
//   //   height: 8px; /* customize scrollbar height */
//   // }

//   // &::-webkit-scrollbar-thumb {
//   //   background: #ccc;
//   //   border-radius: 10px;
//   // }

//   @media (max-width: 768px) {
//     gap: 1rem;
//   }
// `;

export const CardGrid = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  // flex-wrap: nowrap;
  width: 100%;

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

  @media (max-width: 1024px) {
    max-width: 280px;

    @media (max-width: 768px) {
    max-width: 230px;
    }
  }
`;


export const ImageWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 120px;

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
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
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
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  border-radius: 6px 0 0 6px;
  transition: width 0.4s ease;
`;

export const CourseContent = styled.div`
//   padding: 1rem;
  padding: 15px 40px;

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

    @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const CourseMinititle = styled.p`
display: flex;
align-items: center;
justify-content: center;
  color: #555;
  font-size: 16px;
  margin: 5px 0 0 0;

   @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CourseDesc = styled.p`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.test};
  font-size: 16px;
  font-wieght: 300;
  line-height: 1.5;

   @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Details = styled.div`
  margin: 0.5rem 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.chorcaolgray};

    @media (max-width: 768px) {
    font-size: 14px;
  }
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
