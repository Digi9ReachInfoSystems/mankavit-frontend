import styled from 'styled-components';

export const Container = styled.div`
//   max-width: 800px;
  padding: 2rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  margin-left: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
      }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const Label = styled.label`
  display: block;
  margin: 1.2rem 0 0.4rem;
  font-size: 14px;
  font-weight: 500;
  color: #2A2A2A;

`;

export const ReadOnlyText = styled.p`
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fafafa;
  margin-bottom: 1rem;
`;

export const ImageWrapper = styled.div`
 margin-top: 1rem;
  border: 2px dashed #ccc;
  padding: 1rem;
  width: 20%;
`;

export const CourseList = styled.ul`
  padding-left: 1.5rem;
  list-style-type: disc;
`;
