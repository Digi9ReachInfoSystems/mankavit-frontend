import styled from "styled-components";

/* layout */
export const Container = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
  @media (max-width: 560px) {
    padding: 1rem 0;
  }
`;
export const Content = styled.div`
  width: 90%;
  margin: 0 auto;
`;
export const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 1.25rem 0;
  // text-align: center;
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

/* carousel */
export const CarouselViewport = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
`;
export const CarouselTrack = styled.div`
  display: flex;
  gap: 22px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 8px 6px 16px;
  align-items: flex-start

  scrollbar-width: none;      /* Firefox */
  -ms-overflow-style: none;   /* IE/Edge */
  &::-webkit-scrollbar { height: 8px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); border-radius: 10px; }
  &.dragging { cursor: grabbing; }
`;
export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$left ? "left: -6px;" : "right: -6px;")}
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  }
  @media (max-width: 560px) {
    display: none;
  } /* hide on small screens */
`;

/* small avatar card (each slide) */
export const Card = styled.article`
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 28px rgba(20, 20, 43, 0.08);
  border: 1px solid rgba(45, 121, 243, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(20, 20, 43, 0.12);
    border-color: rgba(45, 121, 243, 0.18);
  }
`;
export const Slide = styled(Card)`
  flex: 0 0 auto;
  width: 280px; /* slide width */
  scroll-snap-align: start;

  @media (min-width: 1400px) {
    width: 320px;
  }
  @media (max-width: 768px) {
    width: 240px;
  }
`;

export const Visual = styled.div`
  background: ${({ $bg }) => $bg || "#eef2ff"};
  height: 140px;
  display: grid;
  place-items: center;
`;
export const AvatarWrap = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: #fff;
  padding: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;
export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 14px 14px 16px;
`;
export const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1b1b1b;
  margin: 0 0 6px;
  line-height: 1.25;
  text-align: center;

  /* allow wrapping */
  white-space: normal;
  overflow: visible;
  text-overflow: unset;

  /* handle very long words/URLs */
  word-break: break-word;
  overflow-wrap: anywhere;

  @media (max-width: 900px) {
    font-size: 20px;
    line-height: 1.3;
  }
  @media (max-width: 560px) {
    font-size: 16px;
    line-height: 1.35;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;
export const Stars = styled.div`
  display: inline-flex;
  gap: 3px;
  color: #ffb400;
  text-align: center;
`;
export const Subtitle = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.45;
  margin: 0;
  text-align: center;
  // display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;

  @media (max-width: 900px) {
    font-size: 14px;
  }
    @media (max-width: 560px) {
    font-size: 12px;
  }
`;

export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
    @media (max-width: 576px) {
    // width: 60px;
    margin-bottom: 1rem;
  }
`;
