

import styled, { keyframes } from "styled-components";

export const Container = styled.section`
  padding: 72px 20px;
  background: linear-gradient(180deg, #f9fbff 0%, #ffffff 100%);

  @media (max-width: 900px) {
    padding: 48px 20px;
  }
    @media (max-width: 576px) {
    padding: 32px 20px;
    }
`;

export const Content = styled.div`
  display: grid;
  // grid-template-columns: 520px 1fr;
  gap: 48px;
  width: min(1180px, 92%);
  margin: 0 auto;

  // @media (max-width: 1100px) {
  //   grid-template-columns: 420px 1fr;
  // }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const LeftImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Heading = styled.h2`
  font-size: 50px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0 0 18px;
  color: #0f172a;
  letter-spacing: -0.02em;
  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

export const SubHeading = styled.p`
  margin: 0 0 22px;
  color: #475569;
  font-size: 16px;
`;

export const ToolsRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: stretch;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

export const SearchWrap = styled.div`
  position: relative;
  flex: 1 1 320px;
  min-width: 240px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 0 60px 0 40px;  /* space for icons */
  font-size: 14px;
  outline: none;
  transition: box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
  background: #fff;

  &:hover { border-color: #dbe2ea; background: #fcfdff; }
  &:focus {
    border-color: #93c5fd;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #94a3b8;
`;

export const CountPill = styled.span`
  align-self: center;
  background: #eef2ff;
  color: #4f46e5;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
export const ControlButton = styled.button`
  height: 44px;
  padding: 0 14px;
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 80ms ease, box-shadow 160ms ease;

  &:hover { background: #f8fafc; border-color: #dbe2ea; box-shadow: 0 4px 10px rgba(15,23,42,0.05); }
  &:active { transform: translateY(1px); }
`;

export const FaqList = styled.div`
  background: #fff;
  border: 1px solid #eef0f4;
  border-radius: 16px;
  box-shadow: 0 18px 34px rgba(2, 6, 23, 0.06);
  overflow: hidden;
`;
export const QuestionItem = styled.div`
  border-bottom: 1px solid #f1f5f9;
  &:last-child { border-bottom: none; }
  &:hover { background: #fcfdff; }
`;
export const QuestionHeader = styled.button`
  appearance: none;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 18px 18px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  text-align: left;

  &:hover { background: #f9fafb; }
  &:focus-visible { outline: 2px solid #93c5fd; outline-offset: -2px; }
`;
export const QuestionText = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #111827;
  line-height: 1.35;
`;

export const ArrowIcon = styled.div`
  display: grid; place-items: center;
  width: 28px; height: 28px; border-radius: 8px;
  background: #eff6ff; color: #2563eb;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "none")};
  transition: transform 180ms ease, background 180ms ease, color 180ms ease, box-shadow 180ms ease;

  ${QuestionHeader}:hover & { background: #e0efff; box-shadow: inset 0 0 0 1px #dbeafe; }
`;

// Accordion animation
export const AnswerWrap = styled.div`
  overflow: hidden;
  transition: grid-template-rows 260ms ease, padding 260ms ease, background 260ms ease;
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  padding: ${({ $open }) => ($open ? "0 18px 16px" : "0 18px 0")};
  background: ${({ $open }) => ($open ? "#ffffff" : "transparent")};
`;

export const AnswerInner = styled.div`
  min-height: 0;
`;

export const Answer = styled.p`
  margin: 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.6;

  & strong { color: #0f172a; }
  & mark {
    background: #fff3a3;
    color: #111827;
    padding: 0 3px;
    border-radius: 4px;
  }
`;

export const ViewAllButton = styled.button`
width: 20%;
margin:auto;
  margin-top: 22px;
  background: linear-gradient(90deg, #0dcaf0, #007bff);
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 123, 255, 0.25);
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  font-size: 1.05rem;
  color: #64748b;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.25rem 1rem;
  font-size: 0.98rem;
  color: #ef4444;
  background: #fff1f2;
  border: 1px solid #ffe4e6;
  border-radius: 12px;
`;

export const NoFaqMessage = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  font-size: 1rem;
  color: #64748b;
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const Skeleton = styled.div`
  height: ${({ $h }) => $h || 16}px;
  border-radius: 8px;
  background: #f1f5f9;
  background-image: linear-gradient(
    to right,
    #f1f5f9 0%,
    #e9eef5 20%,
    #f1f5f9 40%,
    #f1f5f9 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s linear infinite;
`;

export const SkeletonRow = styled.div`
  padding: 16px 18px;
  border-bottom: 1px solid #f1f5f9;
  &:last-child { border-bottom: none; }
  display: grid;
  gap: 10px;
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
  @media (max-width: 480px)  { text-align: center; }
`;

export const Highlight = styled.span`
  color: #2d79f3;
`;

export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
  margin-top: 8px;
`;