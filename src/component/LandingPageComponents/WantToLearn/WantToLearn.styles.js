import styled from 'styled-components';

export const Section = styled.section`
  padding: 60px 20px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;

  @media (max-width: 1360px) { width: 90%; }
  @media (max-width: 1024px) {
    width: 95%;
    padding: 20px 5px;
  }
`;

export const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: .2px;

  @media (max-width: 1360px) { font-size: 38px; }
 @media (max-width: 900px) {
    font-size: 36px;
  }
  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 560px) {
    font-size: 28px;
  }
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

/* Grid on desktop; smooth horizontal scroll on smaller screens */
export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;

  @media (max-width: 1200px) {
    display: flex;
    overflow-x: auto;
    gap: 18px;
    padding-bottom: 6px;
    scroll-snap-type: x mandatory;
    scroll-padding-left: 20px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

export const CourseCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 26px rgba(20,20,43,.08);
  border: 1px solid rgba(45,121,243,.08);
  overflow: hidden;

  display: flex;
  flex-direction: column;   /* ✅ lets buttons stick to bottom */
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(20,20,43,.12);
    border-color: rgba(45,121,243,.16);
  }

  @media (max-width: 1200px) {
    width: 300px;
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
`;

export const CardHeader = styled.div`
  position: relative;
  isolation: isolate; /* for overlay */
  &::after{
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.04) 100%);
    z-index: 1;
  }
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;       /* keeps header tidy */
  object-fit: cover;
  display: block;
`;

export const CardBody = styled.div`
  padding: 18px 18px 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 13px;
    color: #666;
  }
`;

export const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin: 2px 0 0;
  line-height: 1.3;

  /* clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 1246px) {
    font-size: 18px;
  }
    @media (max-width: 900px) {
    font-size: 16px;
  }
  @media (max-width: 576px) {
    font-size: 14px;
  }
    `;

export const Description = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.55;

  /* clamp to ~3 lines for even cards */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 4.5em;

  @media (max-width: 900px) {
    font-size: 13px;
  }
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const InfoList = styled.ul`
  padding-left: 16px;
  font-size: 13px;
  margin: 0;
  color: #555;
`;

export const InfoItem = styled.li`
  margin-bottom: 4px;
`;

/* Buttons row at the bottom, no absolute positioning */
export const Buttons = styled.div`
  margin-top: auto;              /* ✅ push to bottom */
  display: flex;
  gap: 10px;
  padding: 14px 16px 16px;
  border-top: 1px solid rgba(0,0,0,.06);
`;

export const PriceButton = styled.div`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  background: linear-gradient(135deg, #4f8df7 0%, #2d79f3 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 999px;        /* pill */
  letter-spacing: .2px;
`;

export const ViewButton = styled.button`
  flex: 1;
  height: 40px;
  background: #f3f7ff;
  color: #2d79f3;
  border: 1px solid rgba(45,121,243,.35);
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: background .15s ease, transform .12s ease, box-shadow .15s ease;

  &:hover {
    background: #e8f0ff;
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(45,121,243,.18);
  }
`;

export const ViewMoreWrapper = styled.div`
  margin-top: 36px;
`;

export const ViewMoreButton = styled.button`
  background-color: #fff;
  color: #2d79f3;
  border: 2px solid #2d79f3;
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #2d79f3;
    color: #fff;
    box-shadow: 0 10px 24px rgba(45,121,243,.22);
  }
`;

export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
  // margin-top: 8px;
`;