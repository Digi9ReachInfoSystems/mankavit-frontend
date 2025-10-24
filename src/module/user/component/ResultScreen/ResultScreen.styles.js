
// import styled from "styled-components";


// export const Container = styled.div`
//   font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//   padding: 20px;
//   display: flex;
//   height: 100vh;


//   @media (max-width: 768px) {
//     flex-direction: column;      /* Header/Q&A first, then map */
//     align-items: stretch;        /* full width children */
//     gap: 12px;
//     padding: 12px;
//   }
// `;
// export const PassageContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   width: 100%;

//   @media (max-width: 990px) {
//     flex-direction: column;
//   }
// `;

// export const Content = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   width: ${(p) => (p.$sidebarOpen ? "80%" : "100%")};
//   padding-right: 20px;

//   @media (max-width: 1360px) {
//     width: ${(p) => (p.$sidebarOpen ? "75%" : "100%")};
//   }
//   @media (max-width: 768px) {
//     width: 100%;
//     padding-right: 0;
//     height: auto;        /* let whole page scroll */
//   }
// `;

// export const ToggleSidebarBtn = styled.button`
//   position: absolute;
//   top: 50%;
//   right: -14px;
//   transform: translateY(-50%);
//  width: 42px;
//   height: 42px;
//   border-radius: 999px;
//    border: 2px solid #135ac4ff;
//   background: #fff;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-weight: 700;
//   line-height: 1;
//   z-index: 5;

//   &:hover {
//     background: #f7f7f7;
//   }
//   @media (max-width: 768px) {
//     display:none;
//   }
// `;

// export const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 12px; /* tighter */
// `;

// export const HeaderLeft = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export const PageTitle = styled.h4`
//   margin: 0 0 0 10px; /* small gap from Back */
//   font-size: 18px;
//   font-weight: 600;
//   color: #111827;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   // max-width: clamp(180px, 40vw, 520px);

//   @media (max-width: 576px) {
//     // max-width: 48vw;
//   font-size: 16px;
//     }
// `;

// export const QuestionType = styled.div`
//   color: #e00000;
//   font-size: 14px;
//   font-weight: 600;
// `;

// export const LeftIcon = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 20px;
//   color: #6b7280;
//   cursor: pointer;
// `;

// export const LeftDiv = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 6px; /* tighter gap */
// `;

// /* Question & passage panes */
// export const Section = styled.div`
//   display: flex;
//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// export const PassageBox = styled.div`
//   flex: 1;
//   background-color: white;
//   padding: 15px;
//   height: 480px;
//   overflow-y: auto;

//   p {
//     font-size: 18px;
//     line-height: 1.6;
//     margin: 0;
//   }

//   @media (max-width: 990px) {
//     height: unset;
//     overflow-y: unset;
//   }
// `;

// export const QuestionBox = styled.div`
//   flex: 1;
//   background-color: white;
//   padding: 15px;
//   height: 480px;
//   overflow-y: auto;

//   .textarea {
//     width: 100%;
//     height: 350px;
//     padding: 10px;
//     font-size: 16px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     resize: none;
//     box-sizing: border-box;
//   }

//   @media (max-width: 990px) {
//     height: unset;
//     overflow-y: unset;
//   }
// `;

// export const HorizontalLine = styled.div`
//   width: 1px;
//   height: 550px;
//   background-color: #ccc;
//   margin: 20px 0;

//   @media (max-width: 990px) {
//     display: none;
//   }
// `;

// export const OptionsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// /* Option coloring used inside the question area */
// export const OptionLabel = styled.label`
//   font-size: 18px;
//   display: flex;
//   // align-items: center;
//     align-items: baseline;
//   gap: 10px;
//   color: ${({ status }) => {
//     switch (status) {
//       case "correct-attempted":
//         return "#34c759"; // green
//       case "incorrect-attempted":
//         return "#ff3b30"; // red
//       case "correct-unattempted":
//         return "#0a84ff"; // blue hint on the correct option
//       default:
//         return "#333";
//     }
//   }};

//   @media (max-width: 1360px) {
//     font-size: 16px;
//   }
//   @media (max-width: 768px) {
//     font-size: 14px;
//   }
// `;

// /* ===== Sticky action bar (parity with Test screen) ===== */
// export const StickyActionBar = styled.div`
//   position: sticky;
//   bottom: 0;
//   // margin-top:auto;
//   z-index: 10;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 12px;
//   padding: 12px 14px;
//   margin-top: 12px;
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: saturate(120%) blur(6px);
//   border-top: 1px solid #e5e7eb;
// `;

// export const LeftButtonsWrap = styled.div`
//   display: flex;
//   gap: 10px;
//   // flex-wrap: wrap;

//   .prev {
//     background-color: #a0a0a0;
//     color: #fff;
//     padding: 12px 16px;
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//     font-weight: 600;
//   }
//   .next {
//     background: linear-gradient(to right, #38bdf8, #3b82f6);
//     color: #fff;
//     padding: 12px 16px;
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//     font-weight: 600;
//   }
//     @media (max-width:768px)
//     {
//     display:flex;
//     gap: 10px;
//     font-size:12px;
//     }
// `;

// export const RightStickyButton = styled.button`
//   background: #111827;
//   color: #fff;
//   padding: 12px 18px;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   font-weight: 700;
// @media (max-width:768px)
//     {
//     display:flex;
//     gap: 10px;
//     font-size:12px;
// }
// `;
// /* ================================== */

// export const SidebarContainer = styled.div`
//   width: ${(p) => (p.$open ? "20%" : "0")};
//   background-color: #f3f6fd;
//   padding: ${(p) => (p.$open ? "1rem" : "0")};
//   display: ${(p) => (p.$open ? "flex" : "none")};
//   flex-direction: column;
//   align-items: center;
//   font-family: "Segoe UI", sans-serif;
// // height: 95vh;
//   @media (max-width: 1360px) {
//     width: 25%;
//   }
//   @media (max-width: 768px) {
//     order: 3;                       /* ensure it appears after Content */
//     width: 100%;
//     padding: ${(p) => (p.$open ? "0.5rem" : "0")};
//     display: ${(p) => (p.$open ? "flex" : "none")};
//   }
// `;

// export const Divider = styled.hr`
//   width: 100%;
//   margin: 0.5rem 0 0.75rem;
//   border: none;
//   border-top: 1px solid #ccc;
// `;

// export const Legend = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 0.9rem;
//   margin-bottom: 0.75rem;
//   align-items: center;
// `;

// export const LegendItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;

//   width: 30px;
//   height: 30px;
//   padding: 0.4rem;
//   border-radius: 6px;
//   border: none;
//   cursor: default;

//   &.correct {
//     background: #34c759;
//     color: #fff;
//   }
//   &.incorrect {
//     background: #ff3b30;
//     color: #fff;
//   }
//   &.not-answered {
//     background: #fff;
//     border: 1px solid #333;
//     color: #333;
//   }

//   @media (max-width: 1360px) {
//     width: 20px;
//     height: 20px;
//     font-size: 12px;
//   }
// `;

// export const LegendText = styled.div`
//   font-size: 0.85rem;
//   @media (max-width: 1360px) {
//     font-size: 0.65rem;
//   }
// `;

// export const OptionLabelList = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   align-items: center;
//   gap: 10px;
// `;

// /* Scrollable question map (prevents expansion) */
// export const QuestionNav = styled.div`
//   width: 100%;
//   // max-height: calc(100vh - 260px);
//     height:95vh;
//   overflow-y: auto;
//   padding-right: 4px;
//     @media (max-width: 768px) {
//    max-height: none;
//     overflow-y: visible;
//   }
// `;

// export const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 0.5rem;

//   @media (max-width: 1360px) {
//     grid-template-columns: repeat(5, 1fr);
//   }
//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
//   @media (max-width: 576px) {
//     grid-template-columns: repeat(6, 1fr);
//   }
// `;

// export const GridButton = styled.button`
//   width: 40px;
//   height: 40px;
//   padding: 0.4rem;
//   border-radius: 6px;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;

//   &.correct {
//     background: #34c759;
//     color: #fff;
//   }
//   &.incorrect {
//     background: #ff3b30;
//     color: #fff;
//   }
//   &.not-answered {
//     background: #fff;
//     color: #333;
//   }

//   ${({ active }) => (active ? "outline: 2px solid #0ea5e9;" : "")}
// `;

// export const SummaryContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 15px;
//   padding: 15px;
//   background: #f8f9fa;
//   border-radius: 8px;
//   margin-bottom: 12px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// export const SummaryItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
// export const SummaryLabel = styled.span`
//   font-weight: 500;
//   color: #555;
// `;
// export const SummaryValue = styled.span`
//   font-weight: 600;
//   color: #333;
// `;

// export const QuestionNumber = styled.div`
//   width: 100%;
//   background-color: #4780c3;
//   padding: 10px 20px;
//   box-sizing: border-box;
//   margin-bottom: 10px;
// `;

// export const QuestionTitle = styled.p`
//   font-size: 14px;
//   color: #fff;
//   margin: 0;
// `;

// export const RankBadge = styled.div`
//   background-color: #e00000;
//   color: #fff;
//   padding: 6px 10px;
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 12px;
// `;

import styled from "styled-components";

/* Layout */
export const Container = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  display: flex;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px;
    height: auto;
    min-height: 100svh;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${(p) => (p.$sidebarOpen ? "80%" : "100%")};
  padding-right: 20px;

  @media (max-width: 1360px) {
    width: ${(p) => (p.$sidebarOpen ? "75%" : "100%")};
  }
  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    height: auto;
  }
`;

/* Fixed toggle on mobile (right middle), absolute between panes on desktop */
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
    z-index: 200;      /* above the slide-in panel */
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled.h4`
  margin: 0 0 0 10px;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const QuestionType = styled.div`
  color: #e00000;
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
`;

export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* Summary (compact on mobile) */
export const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 8px;
    border-radius: 6px;
  }
`;
export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SummaryLabel = styled.span`
  font-weight: 500;
  color: #555;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const SummaryValue = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

/* Question & passage panes */
export const Section = styled.div`
  display: flex;
  @media (max-width: 768px) { flex-direction: column; }
`;

export const PassageContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  @media (max-width: 990px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const PassageBox = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  height: 480px;
  overflow-y: auto;

  /* Mobile read-more/less */
  .passage-clamped {
    display: -webkit-box;
    -webkit-line-clamp: 6;   /* ~5-7 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .passage-full { overflow: visible; }
  .read-toggle {
    margin-top: 8px;
    border: none;
    background: transparent;
    color: #135ac4;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 990px) {
    height: unset;
    overflow-y: unset;
    p { font-size: 16px; }
  }
`;

export const QuestionBox = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  height: 480px;
  overflow-y: auto;

  @media (max-width: 990px) {
    height: unset;
    overflow-y: unset;
  }
`;

export const HorizontalLine = styled.div`
  width: 1px;
  height: 550px;
  background-color: #ccc;
  margin: 20px 0;

  @media (max-width: 990px) {
    display: none;
  }
`;

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const OptionLabel = styled.label`
  font-size: 18px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: ${({ status }) => {
    switch (status) {
      case "correct-attempted": return "#34c759";
      case "incorrect-attempted": return "#ff3b30";
      case "correct-unattempted": return "#0a84ff";
      default: return "#333";
    }
  }};

  @media (max-width: 1360px) { font-size: 16px; }
  @media (max-width: 768px) { font-size: 14px; }
`;

/* Sticky action bar */
export const StickyActionBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  margin-top: 12px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: saturate(120%) blur(6px);
  border-top: 1px solid #e5e7eb;
`;

export const LeftButtonsWrap = styled.div`
  display: flex;
  gap: 10px;

  .prev {
    background-color: #a0a0a0;
    color: #fff;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }
  .next {
    background: linear-gradient(to right, #38bdf8, #3b82f6);
    color: #fff;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .prev, .next { padding: 10px 12px; font-size: 12px; }
  }
`;

export const RightStickyButton = styled.button`
  background: #111827;
  color: #fff;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 12px;
  }
`;

/* Slide-in Sidebar (Question Map) */
export const SidebarContainer = styled.div`
  /* desktop */
  width: ${(p) => (p.$open ? "20%" : "0")};
  background-color: #f3f6fd;
  padding: ${(p) => (p.$open ? "1rem" : "0")};
  display: ${(p) => (p.$open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", sans-serif;
  height: 100%;
  overflow: hidden;

  @media (max-width: 1360px) {
    width: ${(p) => (p.$open ? "25%" : "0")};
  }

  /* mobile: fixed slide-in */
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100svh;
    width: 80vw;
    max-width: 360px;
    padding: 0.75rem;
    display: flex;
    box-shadow: -6px 0 18px rgba(0,0,0,.12);
    transform: translateX(${(p) => (p.$open ? "0%" : "100%")});
    transition: transform 0.25s ease-in-out;
    z-index: 140;
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

  &.correct { background: #34c759; color: #fff; }
  &.incorrect { background: #ff3b30; color: #fff; }
  &.not-answered { background: #fff; border: 1px solid #333; color: #333; }

  @media (max-width: 1360px) {
    width: 24px; height: 24px; font-size: 12px;
  }
`;

export const LegendText = styled.div`
  font-size: 0.85rem;
  @media (max-width: 1360px) { font-size: 0.75rem; }
`;

export const OptionLabelList = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 10px;
`;

/* Scrollable question map */
export const QuestionNav = styled.div`
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;                 /* allow scroll inside flex column */
  overflow-y: auto;
  padding-right: 4px;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  @media (max-width: 1360px) { grid-template-columns: repeat(5, 1fr); }
  @media (max-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 768px)   { grid-template-columns: repeat(6, 1fr); }
  @media (max-width: 420px)   { grid-template-columns: repeat(7, 1fr); }
`;

export const GridButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0.4rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 700;

  &.correct { background: #34c759; color: #fff; }
  &.incorrect { background: #ff3b30; color: #fff; }
  &.not-answered { background: #fff; color: #333; border: 1px solid #e5e7eb; }

  ${({ active }) => (active ? "outline: 2px solid #0ea5e9;" : "")}

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    font-size: 12px;
    border-radius: 6px;
  }
`;

/* Question header bar */
export const QuestionNumber = styled.div`
  width: 100%;
  background-color: #4780c3;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 8px 12px;
    margin-bottom: 8px;
  }
`;

export const QuestionTitle = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
export const RankBadge = styled.div`
  background-color: #e00000;
  color: #fff;
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
`;