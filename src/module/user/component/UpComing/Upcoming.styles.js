import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.charcoalGray};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
    @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const ListSection = styled.div`
  margin-top: 1.5rem;
`;

export const ListCard = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

export const ListTime = styled.div`
  text-align: center;
  padding: 1rem;
  min-width: 80px;
  background: linear-gradient(135deg, #0dcaf0, #007bff);
  color: white;
`;

export const Testdate = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

export const Testmonth = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  opacity: 0.9;
`;

export const Testtime = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`;

export const ListContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

export const Testtitle = styled.h5`
  margin: 0 0 0.5rem 0;
  font-size: 18px;
  font-weight: 600;
`;

export const Testsubtitle = styled.h6`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.graniteGray};
`;

export const Testdetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.graniteGray};

  .endLine {
    width: 1px;
    background-color: ${({ theme }) => theme.colors.graniteGray};
    margin: 0 5px;
    @media (max-width: 820px) {
      display: none;
    }
  }
`;

export const ClassCard = styled(ListTime)`
  background: ${({ theme }) => theme.colors.vividRed};
`;

export const Classtime = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  .liveDot {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    margin-left: 6px;
  }
`;

export const ViewAllLink = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.royalBlue};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


export const ScrollableList = styled.div`
  max-height: 300px; /* adjust as needed */
  overflow-y: auto;
  padding-right: 8px;
  padding-top: 5px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.royalBlue};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.aliceBlue};
  }
`;

export const EmptyState = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.graniteGray};
  margin: 1rem 0;
  text-align: center;
`;
export const Testpara = styled.div`
`;


export const Testattempt = styled.div`
`;