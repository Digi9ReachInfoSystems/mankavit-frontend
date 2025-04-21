import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  width: 70%;
  display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 500;
  span {
    color: #007bff;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#f2f2f2')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  max-width: 300px;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export const CourseCard = styled.div`
  background-color: white;
  border-radius: 12px;
//   overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 140px;
  }
`;

export const CourseContent = styled.div`
  padding: 1rem;
`;

export const CourseTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

export const CourseDesc = styled.p`
  margin: 0.5rem 0;
  color: #555;
  font-size: 0.9rem;
`;

export const Details = styled.div`
  margin: 0.5rem 0;
  font-size: 0.85rem;
  color: #444;
`;

export const DetailItem = styled.div`
  margin: 2px 0;
`;

export const PriceActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const Price = styled.div`
  color: #007bff;
  font-weight: bold;
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
`;
