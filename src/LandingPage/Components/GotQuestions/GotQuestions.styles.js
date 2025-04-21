import styled from 'styled-components';

export const Container = styled.section`
  padding: 60px 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const LeftImage = styled.img`
  width: 350px;
  max-width: 100%;
  border-radius: 16px;
`;

export const RightSection = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
`;

export const Heading = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 25px;
`;

export const QuestionItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const QuestionText = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export const ArrowIcon = styled.div`
  font-size: 14px;
  color: #007bff;
`;

export const Answer = styled.p`
  margin-top: 8px;
  color: #666;
  font-size: 14px;
  padding-left: 2px;
`;

export const ViewAllButton = styled.button`
  margin-top: 30px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056cc;
  }
`;
