import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  display: flex;

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-right:20px;

  @media (max-width: 1360px) {
    width: 75%;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

export const Timer = styled.div`
  font-size: 16px;
  font-weight: bold;
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
//   gap: 20px;
`;

export const PassageBox = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  height: 700px;
  overflow-y: auto;

  p {
    font-size: 20px;
    line-height: 1.6;
    margin:0;
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
  height: 700px;
  overflow-y: auto;

  .textarea {
    width: 100%;
    height: 400px;
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
    height: 700px;
    background-color: #ccc;
    margin: 20px 0;

    @media (max-width: 990px) {
    display: none;
  }
`;

export const QuestionText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  margin:0;
  margin-bottom: 20px;

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

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ReviewButton = styled.button`
  background-color: #A0A0A0;
  color: #fff;
  padding: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 200px;

  @media (max-width: 1360px) {
    width: 150px;
    padding: 15px;
    font-size: 14px;
  }

    @media (max-width: 1024px) {
    width: 150px;
    padding: 10px;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 120px;
    padding: 10px;
    font-size: 12px;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const ClearButton = styled.button`
  background-color: #A0A0A0;
  color: #fff;
  padding: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 200px;
  
  @media (max-width: 1360px) {
    width: 150px;
    padding: 15px;
    font-size: 14px;
  }

    @media (max-width: 1024px) {
    width: 150px;
    padding: 10px;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 120px;
    padding: 10px;
    font-size: 12px;
  }
      @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;


export const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NavTitle = styled.h4`
  margin-bottom: 5px;
`;

export const NavSubtitle = styled.p`
  font-size: 13px;
  color: gray;
`;

export const NavButtons = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

export const NavButton = styled.button`
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const LeftIcon = styled.div`

display: flex;
align-items: center;
font-size: 20px;
color: #A8A8A8;

`;

export const RightIcon = styled.div`
display: flex;
align-items: center;
font-size: 20px;
color: #A8A8A8;

`;

export const QuestionType = styled.div`
color: #E00000;
font-size: 16px;

`;

export const Language = styled.div`
  background: linear-gradient(to right, #0DCAF0, #007BFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
`;

export const LeftDiv = styled.div`
    display: flex;
    gap: 5px;

`;

export const RightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 30px;
`;


export const SidebarContainer = styled.div`
  width: 20%;
  background-color: #f3f6fd;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
//   justify-content: center;
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 1360px) {
    width: 25%;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
   padding: 0  1rem;
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  @media (max-width: 1360px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 24px;

  @media (max-width: 1360px) {
    font-size: 20px;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;

export const UserEmail = styled.div`
  font-size: 18px;
  color: gray;

  @media (max-width: 1360px) {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #ccc;
`;

export const Legend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 1rem;
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
  cursor: pointer;
  font-weight: bold;

  &.answered { background: #7bd37b; clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%); }
  &.not-answered { background: #f44336; clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%); }
  &.marked { background: #a855f7; border-radius: 50%; }
  &.not-visited { background: #e5e7eb; border-radius: 10px; border: 1px solid #ccc; }
  &.marked-answered { background: #c084fc; border-radius: 50%; }

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

export const OptionLabelList =   styled.div`
    display: grid;
      grid-template-columns: 1fr 2fr;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

export const SectionTitle = styled.div`
  background-color: #3b82f6;
  color: white;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 3px;
  margin-bottom: 1rem;
`;

export const QuestionNav = styled.div`
  width: 100%;
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

  &.answered { background: #7bd37b; clip-path: polygon(0 35%, 33% 0, 70% 0, 100% 35%, 99% 100%, 1% 100%); }
  &.not-answered { background: #f44336; clip-path: polygon(1% 1%, 100% 0%, 100% 75%, 75% 100%, 23% 100%, 0% 79%); }
  &.marked { background: #a855f7; border-radius: 50%; }
  &.not-visited { background: #e5e7eb; border-radius: 10px; border: 1px solid #ccc; }
  &.marked-answered { background: #c084fc; border-radius: 50%; }
`;

export const FooterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5rem;
`;

export const SaveButton = styled.button`
  flex: 1;
  background-color: #d1d5db;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const NextButton = styled.button`
  flex: 1;
  background: linear-gradient(to right, #38bdf8, #3b82f6);
  color: #fff;
  padding: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 200px;

  
  @media (max-width: 1360px) {
    width: 150px;
    padding: 15px;
    font-size: 14px;
  }

  @media (max-width: 1024px) {
    width: 150px;
    padding: 10px;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 120px;
    padding: 10px;
    font-size: 12px;
  }
    
`;

export const Text = styled.p`
    font-size: 20px;
    font-weight:400;
    color: #717171;
    margin: 0;
`;

export const TimeSlot = styled.strong`
    font-size: 20px;
    color: #E00000;
    font-weight:500;
`;

export const QuestionNumber = styled.div`
    width:100%;
    background-color: #4780C3;
    padding: 10px 20px;
    box-sizing:border-box;
    margin-bottom: 10px;
`;

export const QuestionTitle = styled.p`
    font-size: 14px;
    color: #fff;
    margin:0;
`;

export const Complier = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LeftButton = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;

    @media (max-width: 576px) {
        justify-content: space-between;
        width: 100%;
    }
`;

export const RightButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


