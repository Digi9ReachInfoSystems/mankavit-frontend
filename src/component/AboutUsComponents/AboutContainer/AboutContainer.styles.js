import styled, { keyframes } from "styled-components";

/* --- Helpers & tokens --- */
const clamp = (min, val, max) => `clamp(${min}, ${val}, ${max})`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const AboutmainContainer = styled.section`
  --card-radius: 16px;
  --card-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  --border: 1px solid rgba(0, 0, 0, 0.06);

//   width: min(960px, 90%);
width: 80%;
  margin: 40px auto;
  padding: 0 8px 40px;
  background: #fff;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 6px 30px;
  }
    @media (max-width: 576px) {
    padding: 0 4px 20px;
    width: 90%;
  }
`;

export const AboutTitleWrap = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0 18px;
`;

export const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 1.25rem 0;

  @media (max-width: 900px) {
    font-size: 36px;
  }
  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 560px) {
    font-size: 28px;
    margin: 0;
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
    margin-bottom: 0.5rem;
  }
`;

export const Highlight = styled.span` color: #2d79f3; `;

export const TitleAccent = styled.span`
  width: 56px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme?.colors?.primary || "#3b82f6"},
    ${({ theme }) => theme?.colors?.secondary || "#22c55e"}
  );
  display: inline-block;
`;

export const AboutContent = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 12px;
`;

/* Card with alternating accent & subtle divider */
export const ContentCard = styled.article`
  position: relative;
  border: var(--border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: clamp(16px, 2.6vw, 28px);
  background: #fff;
  animation: ${fadeUp} 260ms ease both;

  /* Left accent bar */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 4px;
    border-radius: 999px;
    background: ${({ theme, $alt }) =>
      $alt
        ? theme?.colors?.secondary || "#22c55e"
        : theme?.colors?.primary || "#3b82f6"};
    opacity: 0.9;
  }

  /* Typography scale for inlined HTML */
  h1, h2, h3, h4, h5 {
    color: ${({ theme }) => theme?.colors?.blueishblack || "#0d1321"};
    margin: 0 0 8px;
    line-height: 1.2;
  }

  h3 { font-size: ${clamp("18px", "2.6vw", "22px")}; font-weight: 700; }
  p  { margin: 8px 0; color: rgba(0,0,0,0.78); font-weight: 300; line-height: 1.65; font-size: ${clamp("18px", "1.8vw", "24px")}; }

  ul, ol {
    margin: 10px 0 10px 20px;
    padding: 0;
    line-height: 1.6;
  }
  li { margin: 6px 0; }

  a {
    color: ${({ theme }) => theme?.colors?.primary || "#3b82f6"};
    text-underline-offset: 2px;
  }

  blockquote {
    margin: 12px 0;
    padding: 12px 16px;
    border-left: 4px solid
      ${({ theme }) => theme?.colors?.secondary || "#22c55e"};
    background: rgba(0,0,0,0.02);
    border-radius: 6px;
  }
`;

/* Beautiful loading skeletons */
export const SkeletonCard = styled.div`
  border-radius: var(--card-radius);
  border: var(--border);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  padding: clamp(16px, 2.6vw, 28px);

  .row {
    height: 14px;
    margin: 10px 0;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(0,0,0,0.06) 25%,
      rgba(0,0,0,0.12) 37%,
      rgba(0,0,0,0.06) 63%
    );
    background-size: 400% 100%;
    animation: ${shimmer} 1.2s ease-in-out infinite;
  }

  /* Demo rows */
  &::before,
  &::after {
    content: "";
    display: block;
    height: 20px;
    margin: 6px 0;
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      rgba(0,0,0,0.06) 25%,
      rgba(0,0,0,0.12) 37%,
      rgba(0,0,0,0.06) 63%
    );
    background-size: 400% 100%;
    animation: ${shimmer} 1.2s ease-in-out infinite;
  }
`;

export const ErrorBanner = styled.div`
  margin: 12px 0 16px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(220, 38, 38, 0.2);
  background: rgba(220, 38, 38, 0.06);
  color: #7f1d1d;
  font-weight: 500;
`;

export const DescriptionCard = styled.div`
  // margin-top: 8px;
  // color: rgba(0,0,0,0.78);
  // font-weight: 300;
  // line-height: 1.65;
  font-size: 24px;

  @media (max-width: 900px) {
    font-size: 18px;
  }
`;