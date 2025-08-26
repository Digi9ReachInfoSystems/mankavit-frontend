// import styled from "styled-components";

// export const Container = styled.div`
//   font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//   padding: 20px;
//   display: flex;

//   @media (max-width: 576px) {
//     flex-direction: column-reverse;
//     align-items: center;
//   }
// `;

// export const Content = styled.div`
// position: relative;
//   display: flex;
//   flex-direction: column;
//   width: ${(p) => (p.$sidebarOpen ? "80%" : "100%")};
//   padding-right: 20px;

//   @media (max-width: 1360px) {
//     // width: 75%;
//     width: ${(p) => (p.$sidebarOpen ? "75%" : "100%")};
//   }

//   @media (max-width: 576px) {
//     width: 100%;
//     padding-right: 0;
//   }
// `;


// export const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;
// export const HeaderLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   h3 {
//     margin: 0;
//     font-size: 20px;
//   }
//   span {
//     font-size: 14px;
//     margin-top: 5px;
//   }
// `;

// export const Timer = styled.div`
//   font-size: 16px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   span {
//     color: red;
//   }
// `;

// export const Section = styled.div`
//   display: flex;
//   @media (max-width: 990px) {
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
//     font-size: 20px;
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
//   height: 480px;
//   background-color: #ccc;
//   margin: 20px 0;
//   @media (max-width: 990px) {
//     display: none;
//   }
// `;

// export const QuestionText = styled.p`
//   font-size: 20px;
//   font-weight: 500;
//   margin: 0 0 20px 0;
//   @media (max-width: 1360px) {
//     font-size: 18px;
//   }
//   @media (max-width: 768px) {
//     font-size: 16px;
//   }
// `;

// export const OptionsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// /* Option coloring used inside the question area for clarity */
// export const OptionLabel = styled.label`
//   font-size: 18px;
//   display: flex;
//   align-items: center;
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

// export const ButtonGroup = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 10px;
//   @media (max-width: 576px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// export const ReviewButton = styled.button`
//   background-color: #a0a0a0;
//   color: #fff;
//   padding: 20px;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   width: 200px;
//   @media (max-width: 1360px) {
//     width: 150px;
//     padding: 15px;
//     font-size: 14px;
//   }
//   @media (max-width: 1024px) {
//     width: 150px;
//     padding: 10px;
//     font-size: 12px;
//   }
//   @media (max-width: 768px) {
//     width: 120px;
//     padding: 10px;
//     font-size: 12px;
//   }
//   @media (max-width: 576px) {
//     width: 100%;
//     margin-bottom: 10px;
//   }
// `;

// export const ClearButton = styled(ReviewButton)``;

// export const SidebarContainer = styled.div`
//   // width: 20%;
//   // background-color: #f3f6fd;
//   // padding: 1rem;
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;

//  width: ${(p) => (p.$open ? "20%" : "0")};
//   background-color: #f3f6fd;
//   padding: ${(p) => (p.$open ? "1rem" : "0")};
//   display: ${(p) => (p.$open ? "flex" : "none")};
//   flex-direction: column;
//   align-items: center;

// //   justify-content: center;
//   font-family: 'Segoe UI', sans-serif;

//   @media (max-width: 1360px) {
//     width: 25%;
//   }

//   @media (max-width: 576px) {
//     width: 100%;
//     // padding: 0.5rem;
//     padding: ${(p) => (p.$open ? "0.5rem" : "0")};
//   }
// `;

// export const Divider = styled.hr`
//   width: 100%;
//   margin: 1rem 0;
//   border: none;
//   border-top: 1px solid #ccc;
// `;

// export const Legend = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1.2rem;
//   margin-bottom: 1rem;
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
//   } /* green */
//   &.incorrect {
//     background: #ff3b30;
//     color: #fff;
//   } /* red */
//   &.not-answered {
//     background: #fff;
//     border: 1px solid #333;
//     color: #333;
//   } /* grey */

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

// export const QuestionNav = styled.div`
//   width: 100%;
// `;

// export const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
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

// export const FooterButtons = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   margin: auto;
//   flex-direction: column;
//   gap: 10px;
// `;

// export const SaveButton = styled.button`
//   flex: 1;
//   background-color: #d1d5db;
//   padding: 0.6rem;
//   border: none;
//   border-radius: 6px;
//   font-weight: bold;
//   margin-right: 0.5rem;
// `;

// export const NextButton = styled.button`
//   flex: 1;
//   background: linear-gradient(to right, #38bdf8, #3b82f6);
//   color: #fff;
//   padding: 20px;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   width: 200px;

//   @media (max-width: 1360px) {
//     width: 150px;
//     padding: 15px;
//     font-size: 14px;
//   }
//   @media (max-width: 1024px) {
//     width: 150px;
//     padding: 10px;
//     font-size: 12px;
//   }
//   @media (max-width: 768px) {
//     width: 120px;
//     padding: 10px;
//     font-size: 12px;
//   }
// `;

// export const Text = styled.p`
//   font-size: 20px;
//   font-weight: 400;
//   color: #717171;
//   margin: 0;
// `;
// export const TimeSlot = styled.strong`
//   font-size: 20px;
//   color: #e00000;
//   font-weight: 500;
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
// export const Complier = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export const LeftButton = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
//   @media (max-width: 576px) {
//     justify-content: space-between;
//     width: 100%;
//   }
// `;

// export const RightButton = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
// `;
// export const LeftIcon = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 20px;
//   color: #a8a8a8;
// `;
// export const RightIcon = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 20px;
//   color: #a8a8a8;
// `;
// export const QuestionType = styled.div`
//   color: #e00000;
//   font-size: 16px;
// `;
// export const Language = styled.div`
//   background: linear-gradient(to right, #0dcaf0, #007bff);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: 20px;
// `;
// export const LeftDiv = styled.div`
//   display: flex;
//   gap: 5px;
// `;

// export const SummaryContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 15px;
//   padding: 15px;
//   background: #f8f9fa;
//   border-radius: 8px;
//   margin-bottom: 20px;
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

// // (optional) containers you referenced in your earlier codebase
// export const PassageContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   width: 100%;
// `;
// export const PassageContent = styled.div`
//   flex: 1;
//   padding: 15px;
//   border-right: ${(props) => (props.hasPassage ? "1px solid #ddd" : "none")};
// `;
// export const QuestionContent = styled.div`
//   flex: 1;
//   padding: 15px;
// `;
// export const QuestionContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// export const ToggleSidebarBtn = styled.button`
//   position: absolute;
//   top: 50%;
//  right: -14px;             /* sit on the edge between content & sidebar */
//  transform: translateY(-50%);
//   width: 32px;
//   height: 32px;
//   border-radius: 999px;
//   border: 1px solid #d1d5db;
//   background: #fff;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.08);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-weight: 700;
//   line-height: 1;
//   z-index: 5;

//   &:hover {
//    background: #f7f7f7; 
//    }
//   @media (max-width: 576px) {
//     right: 6px;             /* a bit inside on small screens */
//   }
// `;

import styled from "styled-components";

export const Container = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  display: flex;

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px; /* tighter */
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
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

export const QuestionType = styled.div`
  color: #e00000;
  font-size: 14px;
  font-weight: 600;
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
  gap: 6px; /* tighter gap */
`;

/* Question & passage panes */
export const Section = styled.div`
  display: flex;
  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

export const PassageBox = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  height: 480px;
  overflow-y: auto;

  p {
    font-size: 20px;
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
  height: 480px;
  overflow-y: auto;

  .textarea {
    width: 100%;
    height: 350px;
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
  height: 480px;
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

/* Option coloring used inside the question area */
export const OptionLabel = styled.label`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ status }) => {
    switch (status) {
      case "correct-attempted":
        return "#34c759"; // green
      case "incorrect-attempted":
        return "#ff3b30"; // red
      case "correct-unattempted":
        return "#0a84ff"; // blue hint on the correct option
      default:
        return "#333";
    }
  }};

  @media (max-width: 1360px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

/* ===== Sticky action bar (parity with Test screen) ===== */
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: saturate(120%) blur(6px);
  border-top: 1px solid #e5e7eb;
`;

export const LeftButtonsWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

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
`;

export const RightStickyButton = styled.button`
  background: #111827;
  color: #fff;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;
/* ================================== */

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

  &.correct {
    background: #34c759;
    color: #fff;
  }
  &.incorrect {
    background: #ff3b30;
    color: #fff;
  }
  &.not-answered {
    background: #fff;
    border: 1px solid #333;
    color: #333;
  }

  @media (max-width: 1360px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

export const LegendText = styled.div`
  font-size: 0.85rem;
  @media (max-width: 1360px) {
    font-size: 0.65rem;
  }
`;

export const OptionLabelList = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 10px;
`;

/* Scrollable question map (prevents expansion) */
export const QuestionNav = styled.div`
  width: 100%;
  max-height: calc(100vh - 260px);
  overflow-y: auto;
  padding-right: 4px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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

  &.correct {
    background: #34c759;
    color: #fff;
  }
  &.incorrect {
    background: #ff3b30;
    color: #fff;
  }
  &.not-answered {
    background: #fff;
    color: #333;
  }

  ${({ active }) => (active ? "outline: 2px solid #0ea5e9;" : "")}
`;

export const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
`;
export const SummaryValue = styled.span`
  font-weight: 600;
  color: #333;
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
