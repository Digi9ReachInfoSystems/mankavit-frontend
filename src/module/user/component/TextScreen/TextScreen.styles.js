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
//   position: relative;
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

// export const ToggleSidebarBtn = styled.button`
//   position: absolute;
//   top: 50%;
//   right: -14px; /* sit on the edge between content & sidebar */
//   transform: translateY(-50%);
//   width: 32px;
//   height: 32px;
//   border-radius: 999px;
//   border: 1px solid #d1d5db;
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
//   @media (max-width: 576px) {
//     right: 6px; /* a bit inside on small screens */
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
//   //   gap: 20px;
// `;

// export const PassageBox = styled.div`
//   flex: 1;
//   background-color: white;
//   padding: 15px;
//   height: 600px;
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
//   height: 600px;
//   overflow-y: auto;

//   .textarea {
//     width: 100%;
//     height: 550px;
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
//   height: 600px;
//   background-color: #ccc;
//   margin: 20px 0;

//   @media (max-width: 990px) {
//     display: none;
//   }
// `;

// export const QuestionText = styled.p`
//   font-size: 20px;
//   font-weight: 500;
//   margin-bottom: 10px;
//   margin: 0;
//   margin-bottom: 20px;

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

// export const OptionLabel = styled.label`
//   font-size: 18px;
//   display: flex;
//   align-items: center;
//   gap: 10px;

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
//   background-color: #0881e4ff;
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

// export const ClearButton = styled.button`
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

// export const Sidebar = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// export const NavTitle = styled.h4`
//   margin-bottom: 5px;
// `;

// export const NavSubtitle = styled.p`
//   font-size: 13px;
//   color: gray;
// `;

// export const NavButtons = styled.div`
//   margin-top: 15px;
//   display: flex;
//   justify-content: space-between;
// `;

// export const NavButton = styled.button`
//   padding: 6px 12px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
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

// export const RightDiv = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 10px;
//   margin-bottom: 20px;
//   padding: 0 30px;
// `;

// export const SidebarContainer = styled.div`
//   // width: 20%;
//   // background-color: #f3f6fd;
//   // padding: 1rem;
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;

//   width: ${(p) => (p.$open ? "20%" : "0")};
//   background-color: #f3f6fd;
//   padding: ${(p) => (p.$open ? "1rem" : "0")};
//   display: ${(p) => (p.$open ? "flex" : "none")};
//   flex-direction: column;
//   align-items: center;

//   //   justify-content: center;
//   font-family: "Segoe UI", sans-serif;

//   @media (max-width: 1360px) {
//     width: 25%;
//   }

//   @media (max-width: 576px) {
//     width: 100%;
//     // padding: 0.5rem;
//     padding: ${(p) => (p.$open ? "0.5rem" : "0")};
//   }
// `;

// export const UserCard = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   padding: 0 1rem;
// `;

// export const UserImage = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;

//   @media (max-width: 1360px) {
//     width: 80px;
//     height: 80px;
//   }

//   @media (max-width: 1024px) {
//     width: 60px;
//     height: 60px;
//   }
// `;

// export const UserInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export const UserName = styled.div`
//   font-weight: bold;
//   font-size: 24px;

//   @media (max-width: 1360px) {
//     font-size: 20px;
//   }

//   @media (max-width: 1024px) {
//     font-size: 18px;
//   }
// `;

// export const UserEmail = styled.div`
//   font-size: 18px;
//   color: gray;

//   @media (max-width: 1360px) {
//     font-size: 16px;
//   }

//   @media (max-width: 1024px) {
//     font-size: 14px;
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
//   cursor: pointer;
//   font-weight: bold;

//   &.answered {
//     background: #7bd37b;
//     clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%);
//   }
//   &.not-answered {
//     background: #f44336;
//     clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%);
//   }
//   &.marked {
//     background: #a855f7;
//     border-radius: 50%;
//   }
//   &.unattempted {
//     background: rgb(253, 253, 255);
//     border-radius: 10px;
//     border: 1px solid #ccc;
//   }
//   &.answered-marked {
//     background: #c084fc;
//     border-radius: 50%;

//     &::after {
//       content: "✓";
//       bottom: 10px;
//       position: relative;
//       color: green;
//       font-size: 16px;
//       font-weight: bold;
//     }
//   }
//   &.not-answered-marked {
//     background: #c084fc;
//     border-radius: 50%;
//   }

//   @media (max-width: 1360px) {
//     width: 20px;
//     height: 20px;
//     font-size: 12px;
//   }
// `;

// export const LegendText = styled.div`
//   font-size: 0.85rem;
//   font-weight: 500;

//   @media (max-width: 1360px) {
//     font-size: 0.65rem;
//   }
// `;

// export const OptionLabelList = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   flex-direction: column;
//   // gap: 10px;
//   align-items: center;
// `;

// export const SectionTitle = styled.div`
//   background-color: #3b82f6;
//   color: white;
//   width: 100%;
//   text-align: center;
//   padding: 0.5rem;
//   font-weight: bold;
//   border-radius: 3px;
//   margin-bottom: 1rem;
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

//   &.answered {
//     background: #7bd37b;
//     clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%);
//     color: white;
//   }
//   &.not-answered {
//     background: #f44336;
//     clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%);
//     color: white;
//   }
//   &.marked {
//     background: #a855f7;
//     border-radius: 50%;
//     color: white;
//   }

//   &.unattempted {
//     background: rgb(253, 253, 255);
//     border-radius: 10px;
//     border: 1px solid #ccc;
//   }

//   &.answered-marked {
//     background: #c084fc;
//     border-radius: 50%;
//     color: white;

//     &::after {
//       content: "✓";
//       bottom: 10px;
//       position: relative;
//       color: green;
//       font-size: 16px;
//       font-weight: bold;
//       // color: white;
//     }
//   }
//   &.not-answered-marked {
//     background: #c084fc;
//     border-radius: 50%;
//     color: white;
//   }
// `;

// export const FooterButtons = styled.div`
//   display: flex;
//   justify-content: space-between;
//   // flex-direction: column;
//   width: 100%;
//   //  margin-top: 550px;
//   margin: auto;
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

// export const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// export const ModalContent = styled.div`
//   background-color: white;
//   padding: 2rem;
//   border-radius: 8px;
//   width: 90%;
//   max-width: 400px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// export const ModalTitle = styled.h3`
//   margin-bottom: 1.5rem;
//   text-align: center;
// `;

// export const ModalButtons = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
// `;

// export const ModalButton = styled.button`
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;
//   background-color: ${(props) => (props.primary ? "#1890ff" : "#f5f5f5")};
//   color: ${(props) => (props.primary ? "white" : "#333")};

//   &:hover {
//     background-color: ${(props) => (props.primary ? "#40a9ff" : "#e6e6e6")};
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
  height: 600px;
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
  height: 600px;
  overflow-y: auto;

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
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 20px 0;

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
  margin-bottom: 20px;
`;

export const OptionLabel = styled.label`
  font-size: 18px;
  display: flex;
  align-items: center;
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
