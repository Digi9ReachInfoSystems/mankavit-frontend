import styled from "styled-components";

export const CardContainer = styled.div`
  // min-width: 500px;
  width: 80%;
  margin: 60px auto;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
   @media (max-width: 1024px) {
      margin: 40px auto;
  }
  // @media (max-width: 480px) {
  //     margin: 20px;
  //     max-width: 900px;
  // }
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 400;
background: linear-gradient(to right, #00c6ff, #0072ff);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  padding: 20px;
  margin-top: 0px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 1360px) {
    font-size: 42px;
  }

  @media(max-width: 480px) {
  font-size: 30px
  }
`;

export const Card = styled.div`
  padding: 20px; /* Thickness of the border */
  border-radius: 12px;
  background: linear-gradient(90deg, #00c6ff, #0072ff); 

  & > .card-inner {
    background-color: #F1F4FF;
    border-radius: 10px; 
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;


export const ExamImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 15px;
  border: none;
  border-radius: 8px;
`;

export const TestName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0px;
    margin-top: 20px;
  color: #000000;
  text-align: left;
  line-height: 28px;
`;

export const Subject = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 1.4;
  text-align: left;
  line-height: 28px;
`;

export const DetailsList = styled.ul`
  list-style-type: disc;
  padding: 0;
  text-align: left;
  margin-bottom: 20px;
  // margin-left: 20px;
  font-weight: 400;
  color: #1C1C1CB2;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: baseline;      /* keeps the first text line aligned */
  gap: 8px; 
  text-align: left;                  /* space between label and content */
  font-size: 18px;
  font-weight: 400;
  color: #000;
  margin-bottom: 8px;
  margin-top:20px;

  /* Make sure injected HTML stays inline and doesn’t force a new line */
  .desc {
    display: inline;          /* keep it inline with the label */
    /* allow wrapping across lines without breaking layout */
    white-space: normal;
  }

  /* If the HTML contains block tags, flatten them so they don’t break the row */
  .desc p,
  .desc div,
  .desc h1, .desc h2, .desc h3, .desc h4, .desc h5, .desc h6 {
    display: inline;
    margin: 0;
    padding: 0;
  }
`;


export const StartButton = styled.button`
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  transition: 0.3s ease;
  width: 20%;
  margin: 20px 0;
  color: #FFFFFF;

  &:hover {
    background: linear-gradient(90deg, #0072ff, #00c6ff);
  }

   @media(max-width: 480px) {
  font-size: 16px;
  padding: 10px 15px;
  width:100%;
  }
`;
