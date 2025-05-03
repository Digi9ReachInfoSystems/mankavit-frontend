import styled from 'styled-components';

export const Container = styled.section`
  padding: 60px 20px;
`;

export const Content = styled.div`
  display: flex;
  gap: 40px;
    width: 80%;
    margin: 0 auto;

    @media (max-width: 1200px) {
      width: 90%;
    }
      @media (max-width: 1024px) {
        width: 100%;
      }

    @media (max-width: 768px) {
      flex-direction: column;
    }
`;


export const LeftImage = styled.img`
  width: 550px;
  max-width: 100%;
  border-radius: 16px;

  @media (max-width: 1320px) {
    width: 450px;
  }

  @media (max-width: 1200px) {
    width: 400px;
  }

  @media (max-width: 1024px) {
    width: 350px;
  }
`;

export const RightSection = styled.div`
  flex: 1;
`;

export const Heading = styled.h2`
  font-size: 48px;
  font-weight: 400;
  margin: 0; 
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 42px;
  }


  @media (max-width: 768px) {
    font-size: 36px;
  }
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
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: #252525;

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ArrowIcon = styled.div`

  .arrow-up {
    color: #25252570;
    font-size: 28px;
        margin-right: -3px;

        @media (max-width: 1024px) {
          font-size: 22px;
        }
          @media (max-width: 768px) {
            font-size: 20px;
          }
  }

  .arrow-down {
    background: linear-gradient(to right, #0DCAF0, #007BFF);
    color: white;
    border-radius: 50%;
    font-size: 22px;

    @media (max-width: 1024px) {
      font-size: 18px;
    }
      @media (max-width: 768px) {
        font-size: 16px;
      }

  }
`;

export const Answer = styled.p`
  margin-top: 8px;
  color: #25252570;
  font-size: 16px;
  padding-left: 2px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
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
