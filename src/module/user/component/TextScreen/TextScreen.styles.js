import styled from "styled-components";

export const Container = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  display: flex;
  
// height: 100vh;
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;        /* make this the scroll area */
  overflow-y: auto;     /* enable scrolling here */
  width: ${(p) => (p.$sidebarOpen ? "80%" : "100%")};
  padding-right: 20px;

  @media (max-width: 1360px) {
    width: ${(p) => (p.$sidebarOpen ? "75%" : "100%")};
  }
  @media (max-width: 576px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const ToggleSidebarBtn = styled.button`
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 2px solid #135ac4ff;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  z-index: 5;

  &:hover {
    background: #f7f7f7;
  }
  @media (max-width: 576px) {
    right: 6px;
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;                /* stay above content */
  background: #ffffff;        /* avoid transparent bleed-through */
  border-bottom: 1px solid #e5e7eb;
  /* optional: subtle frosted look like your footer */
  backdrop-filter: saturate(120%) blur(6px);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;            /* give the sticky area some height */
  margin-bottom: 12px;
`;


export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 20px;
  }

  span {
    font-size: 14px;
    margin-top: 5px;
  }
`;

export const PageTitle = styled.h4`
  margin: 0 0 0 10px; /* small gap from Back */
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: clamp(180px, 40vw, 520px);

  @media (max-width: 576px) {
    max-width: 48vw;
  }
`;

export const Timer = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: red;
  }
`;

export const SectionQuestion = styled.div`
  display: flex;
  
  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

export const PassageBox = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  height: 600px;
  overflow-y: auto;
  font-size: 16px;
  user-select: none;
  p {
    font-size: 18px;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 990px) {
    height: unset;
    overflow-y: unset;
  }
`;

export const QuestionBox = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  height: 600px;
  font-size: 16px;
  overflow-y: auto;
  user-select: none;
  .textarea {
    width: 100%;
    height: 550px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    box-sizing: border-box;
  }

  @media (max-width: 990px) {
    height: unset;
    overflow-y: unset;
  }
`;

export const HorizontalLine = styled.div`
  width: 1px;
  height: 600px;
  background-color: #ccc;
  margin: 20px 0;

  @media (max-width: 990px) {
    display: none;
  }
`;

export const QuestionText = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 20px 0;]
  font-size: 16px;

  @media (max-width: 1360px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const OptionLabel = styled.label`
  font-size: 16px;
  display: flex;
  // align-items: center;
  align-items: baseline;

  gap: 10px;

  @media (max-width: 1360px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

/* ===== NEW: Sticky action bar ===== */
export const StickyActionBar = styled.div`
  position: sticky;
  bottom: 0;
  // margin-top:auto;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  margin-top: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: saturate(120%) blur(6px);
  border-top: 1px solid #e5e7eb;
`;

export const LeftButtonsWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .review {
    background-color: #0881e4;
    color: #fff;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }
  .clear {
    background-color: #a0a0a0;
    color: #fff;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }
  .save {
    background: linear-gradient(to right, #38bdf8, #3b82f6);
    color: #fff;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }
`;

export const SubmitButton = styled.button`
  background: #111827;
  color: #fff;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;

/* ================================== */

export const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
`;

export const QuestionType = styled.div`
  color: #e00000;
  font-size: 14px;
`;

export const Language = styled.div`
  background: linear-gradient(to right, #0dcaf0, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  margin-left: 6px; /* tighter */
`;

export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; /* tighter gap between back & title */
`;

export const SidebarContainer = styled.div`
  width: ${(p) => (p.$open ? "20%" : "0")};
  background-color: #f3f6fd;
  padding: ${(p) => (p.$open ? "1rem" : "0")};
  display: ${(p) => (p.$open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", sans-serif;

  @media (max-width: 1360px) {
    width: 25%;
  }
  @media (max-width: 576px) {
    width: 100%;
    padding: ${(p) => (p.$open ? "0.5rem" : "0")};
  }
`;

export const Divider = styled.hr`
  width: 100%;
  margin: 0.5rem 0 0.75rem;
  border: none;
  border-top: 1px solid #ccc;
`;

export const Legend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
  margin-bottom: 0.75rem;
  align-items: center;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  width: 30px;
  height: 30px;
  padding: 0.4rem;
  border-radius: 6px;
  border: none;
  cursor: default;

  &.answered {
    background: #7bd37b;
    clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%);
  }
  &.not-answered {
    background: #f44336;
    clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%);
  }
  &.unattempted {
    background: #fdfdff;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  &.answered-marked {
    background: #c084fc;
    border-radius: 50%;
    &::after {
      content: "✓";
      position: relative;
      bottom: 10px;
      color: green;
      font-size: 16px;
      font-weight: bold;
    }
  }
  &.not-answered-marked {
    background: #c084fc;
    border-radius: 50%;
  }

  @media (max-width: 1360px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

export const LegendText = styled.div`
  font-size: 0.85rem;
  font-weight: 500;

  @media (max-width: 1360px) {
    font-size: 0.65rem;
  }
`;

export const OptionLabelList = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`;

export const QuestionNav = styled.div`
  width: 100%;
  /* Scrollable map */
  max-height: calc(100vh - 260px); /* leaves room for legend/header */
  overflow-y: auto;
  padding-right: 4px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 1360px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const GridButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0.4rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &.answered {
    background: #7bd37b;
    clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%);
    color: white;
  }
  &.not-answered {
    background: #f44336;
    clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%);
    color: white;
  }
  &.unattempted {
    background: #fdfdff;
    border-radius: 10px;
    border: 1px solid #ccc;
    color: #111827;
  }
  &.answered-marked {
    background: #c084fc;
    border-radius: 50%;
    color: white;
    &::after {
      content: "✓";
      position: relative;
      bottom: 10px;
      color: green;
      font-size: 16px;
      font-weight: bold;
    }
  }
  &.not-answered-marked {
    background: #c084fc;
    border-radius: 50%;
    color: white;
  }
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #717171;
  margin: 0;
`;

export const TimeSlot = styled.strong`
  font-size: 16px;
  color: #e00000;
  font-weight: 700;
`;

export const QuestionNumber = styled.div`
  width: 100%;
  background-color: #4780c3;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export const QuestionTitle = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 0;
`;

export const Complier = styled.div`
  display: flex;
  flex-direction: column;
   flex-grow: 1;  
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h3`
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#1890ff" : "#f5f5f5")};
  color: ${(props) => (props.primary ? "white" : "#333")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#40a9ff" : "#e6e6e6")};
  }
`;
