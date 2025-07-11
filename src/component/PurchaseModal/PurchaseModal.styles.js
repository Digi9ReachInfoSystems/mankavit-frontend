import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  padding: 30px;
  position: relative;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h3`
  margin-bottom: 20px;
`;

export const Label = styled.p`
  margin: 10px 0;
`;

export const ApplyBtn = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CouponGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

export const CouponCard = styled.div`
  border: 1px solid ${({ selected }) => (selected ? "#007bff" : "#ccc")};
  border-radius: 8px;
  padding: 10px;
  background: ${({ selected }) => (selected ? "#e9f5ff" : "#fff")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    border-color: #007bff;
  }
`;

export const CouponImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 8px;
`;

export const CourseCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  background: #f9f9f9;
`;

export const CourseImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;

export const CoursePrice = styled.span`
  font-size: 16px;
  color: #007bff;
  margin-top: 6px;
`;
