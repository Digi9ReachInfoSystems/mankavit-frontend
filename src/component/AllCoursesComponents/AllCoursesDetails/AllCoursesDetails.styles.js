import styled from 'styled-components';
 
export const Container = styled.div`
  padding: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
 scroll-margin-top: 80px;
  @media (max-width: 1360px) {
    width: 90%;
  }
 
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
 
export const Title = styled.h1`
  font-size: 50px;
  font-weight: 500;
  span {
    color: #007bff;
  }
 
  @media (max-width: 768px) {
    font-size: 36px;
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

   display: grid;
    gap: 8px;
    margin: 0 0 1rem 0;
    grid-template-columns: repeat(4, 1fr);   /* default: 3 per row on small phones */
  }

  @media (min-width: 480px) and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

 
export const FilterButton = styled.button`
  background: ${({ active }) =>
    active
      ? 'linear-gradient(to right, #0DCAF0, #007BFF)'
      : '#D3D3D3'};
  color: ${({ theme }) => theme.colors.blueishblack};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;

 @media (max-width: 768px) {
   width: 100%;              /* fill its grid cell */
   padding: 8px 10px;        /* tighter */
   font-size: 12px;          /* smaller text */
   border-radius: 999px;     /* pill look */
 }
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
 
export const Ribbon = styled.div`
  width: 120px;
  background: ${({ className }) =>
    className === "enrolled" ? "#28a745" : "#dc3545"};
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: 29px;
  left: -15px;
  transform: rotate(-45deg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;
  padding: 4px 0;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }
    @media (min-width: 1000px)and (max-height: 800px)  { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
`;

export const CourseCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px; /* Fixed height for all cards */
  background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
  border: 1px solid #eef2f7;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 6px rgba(16,24,40,0.06), 0 16px 36px rgba(16,24,40,0.12);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px; /* Fixed image height */
  background: #f3f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0));
    pointer-events: none;
  }
`;

export const CourseContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 18px;
  gap: 12px;
`;

export const CourseMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
`;

export const RatingWrapper = styled.div`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  padding: 6px 10px;
  border-radius: 999px;
  background: #fff7ed;
  border: 1px solid #ffe7c2;
`;

export const CourseHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.darkgray};
  min-height: 76px;
`;

export const CourseTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  height: 46px;
`;

export const CourseMinititle = styled.p`
  margin: 0;
  color: #475569;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const CourseDesc = styled.p`
  margin: 0;
  color: #3a4457;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex-grow: 1;
  min-height: 66px;
`;

export const EnrolledTag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #16a34a;
  color: #fff;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  z-index: 2;
  box-shadow: 0 6px 18px rgba(22, 163, 74, 0.25);
`;

export const PriceActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid #eef2f7;
  background: #ffffff;
  margin-top: auto;
`;

export const Price = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 12px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  background: linear-gradient(90deg, #0DCAF0 0%, #007BFF 100%);
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover { filter: brightness(0.98); }
  &:active { transform: translateY(1px); }

  border-bottom-left-radius: 16px;
`;

export const ViewButton = styled.button`
  border: none;
  background: transparent;
  width: 100%;
  padding: 12px 14px;
  color: #0b63f6;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    background: #f3f6ff;
    color: #0849b8;
  }

  border-bottom-right-radius: 16px;
`;

export const OldPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.7;
  margin-right: 8px;
  font-weight: 600;
  font-size: 13px;
`;

export const NewPrice = styled.span`
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: 14px;
`;
export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
`;

export const DiscountBadge = styled.span`
  background: #e6f6ea;
  color: #157f3b;
  border: 1px solid #ccebd7;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  vertical-align: middle;
`;

export const VerticalTag = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  background: #22c55e;
  color: #fff;
  font-size: 12px;
  padding: 6px 8px;
  font-weight: 700;
  border-radius: 0 6px 6px 0;
  z-index: 1;
`;

export const DetailItem = styled.div`
  margin: 3px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
`;

export const Details = styled.div`
  margin: 0.5rem 0;
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
`;