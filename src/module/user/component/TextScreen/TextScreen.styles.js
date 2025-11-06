import styled from "styled-components";
export const Container = styled.div`
  --sbw: 320px;                /* sidebar width (desktop) */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100svh;
  position: relative;          /* ← so the toggle can be absolutely placed */

  @media (max-width: 1360px) { --sbw: 280px; }  /* narrower sidebar on md+ */
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    padding: 12px;
    gap: 12px;
  }
`;

/* Content: flexible main area (no hard width) */
export const Content = styled.main`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  height: 95vh;
  width: 100%;

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    overflow: visible;
  }
`;

/* Sidebar: fixed width on right (desktop) + slide-in on mobile */
export const SidebarContainer = styled.aside`
  display: ${p => (p.$open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  background-color: #f3f6fd;

  flex: 0 0 var(--sbw);
  width: var(--sbw);
  align-self: stretch;
  padding: 1rem;
  order: 2;

  /* Mobile: slide-in panel */
  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100svh;
    width: 84vw;
    max-width: 360px;
    padding: 0.75rem;
    display: flex;
    box-shadow: -6px 0 18px rgba(0,0,0,.12);
    background: #f3f6fd;
    z-index: 200;
    transform: translateX(${p => (p.$open ? "0%" : "100%")});
    transition: transform 0.25s ease-in-out;
  }
`;

/* Toggle between panes on desktop; fixed floating on mobile */
export const ToggleSidebarBtn = styled.button`
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 2px solid #135ac4;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  z-index: 50;

  &:hover { background: #f7f7f7; }

  @media (max-width: 768px) {
    position: fixed;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 200; /* above slide-in panel */
  }
`;

/* Show the close “pill” only on mobile (keep desktop clean) */
export const CloseSidebarBtn = styled.button`
  display: none;

  @media (max-width: 900px) {
    position: absolute;
    display: flex;
    top: 50%;
    left: -1px;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 2px solid #135ac4ff;
    background: #fff;
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 700;
    line-height: 1;
    z-index: 210;

    &:hover { background: #f7f7f7; }
  }
`;


export const MobileBottomSpacer = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
    /* Reserve safe space for the fixed action bar */
    height: calc(140px + env(safe-area-inset-bottom, 0px)); 
    width: 100%;
    flex: 0 0 auto;
  }
`;


export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  backdrop-filter: saturate(120%) blur(6px);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
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
  // max-width: clamp(180px, 40vw, 520px);

  @media (max-width: 576px) {
    // max-width: 48vw;
    font-size: 16px;
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
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
  margin: 0 0 20px 0;
  font-size: 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;

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
  margin-bottom: 40px;
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

export const SubmitButton = styled.button`
  background: #111827;
  color: #fff;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;

export const StickyActionBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: saturate(120%) blur(6px);




  @media (max-width: 900px) {
 position: fixed;                /* fixed at bottom on mobile */
  left: 0;
   right: 0;
   bottom: 0;
   z-index: 150;                   /* above the slide-in sidebar (z 120) */
   padding: 8px 12px env(safe-area-inset-bottom, 0px);
  border-top: 1px solid #e5e7eb;
   box-shadow: 0 -6px 18px rgba(0,0,0,0.06);
   flex-direction: column;         /* keep your two rows layout */
   align-items: stretch;
   gap: 6px;
  }
`;

export const LeftButtonsWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  

/* utility visibility classes */
.mobileOnly { display: none; text-align: center !important; }
.desktopOnly { display: inline-flex; }

@media (max-width: 900px) {
  .mobileOnly { display: inline-flex; 
    text-align: center !important;
    }   /* show on mobile */
  .desktopOnly { display: none; }         /* hide on mobile */
}
  @media (max-width: 900px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 900px) {
    .clear { display: none; } /* HIDE Clear Response on mobile */
    .review,
    .save,
    button,
    ${SubmitButton} {
    text-align: center !important;
      flex: 1 1 0;
      font-size: 12px;
      padding: 10px 12px;
    }
  }

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
    text-align: center !important;
    font-weight: 600;
  }
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
  max-height: calc(100vh - 260px);
  overflow-y: auto;          /* this is the only scroller */
  padding-right: 4px;
  @media (max-width: 900px) {
   padding-bottom: calc(140px + env(safe-area-inset-bottom, 0px));
   max-height: calc(100svh - 200px);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 1360px) { grid-template-columns: repeat(5, 1fr); }
  @media (max-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 576px) { grid-template-columns: repeat(6, 1fr); }
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

  @media (max-width: 576px) {
    width: 34px;
    height: 34px;
    font-size: 12px;
    padding: 0.25rem;
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


