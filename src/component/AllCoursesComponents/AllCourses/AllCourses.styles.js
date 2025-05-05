import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 500;
  span {
    color: #007bff;
  }

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

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;

  @media (max-width: 768px) {
    
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 5px 10px 40px; 
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 1rem;
  box-sizing: border-box;
  background: #F1F4FF;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SliderIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
  padding: 5px;
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  border-radius: 8px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export const CourseCard = styled.div`
  background-color: #ABBED110;
//   overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  // &:hover {
  //   transform: translateY(-4px);
  // }
  
`;

export const ImageWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 140px;

    @media (max-width: 768px) {
      height: 100px;
    }
  }
`;

export const CourseContent = styled.div`
  padding: 1rem;
  padding: 20px 30px;
`;

export const CourseMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
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
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.chorcaolgray};
`;

export const DetailItem = styled.div`
  margin: 3px 0;
`;

export const PriceActions = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  width: 100%;

`;

export const Price = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  width: 50%;
  padding: 10px 12px;
  border-bottom-left-radius: 12px;
  font-size: 15px;
  font-wight: 700;
  text-align: center;
`;

export const ViewButton = styled.button`
  color: ${({ theme }) => theme.colors.vividblue};
  background: transparent;
  border: none;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  width: 50%;
`;
