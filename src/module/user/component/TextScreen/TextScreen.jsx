import React, { useState, useEffect } from 'react';
import { Container, Header, HeaderLeft, Timer, Section, PassageBox, QuestionBox, QuestionText, OptionsList, OptionLabel , UserCard, UserImage, UserInfo, Legend, LegendItem, QuestionNav, Grid, GridButton, ButtonGroup, ReviewButton, ClearButton, NextButton, LeftIcon, RightIcon, QuestionType, Language, LeftDiv, RightDiv, LegendText, SidebarContainer, SaveButton, UserName, UserEmail, Divider, SectionTitle, FooterButtons, Content, Text, TimeSlot, QuestionNumber, QuestionTitle, Complier, LeftButton, RightButton, OptionLabelList, HorizontalLine  } from './TextScreen.styles';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Profile from "../../../../assets/profile.png"; // Correct image import


const TextScreen = () => {
const [questionType, setQuestionType] = useState("MCQ"); // Can be "MCQ" or "Descriptive"
    const [minutes, setMinutes] = useState(15);
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    if (seconds > 0) {
      setSeconds((prev) => prev - 1);
    } else {
      if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else {
        clearInterval(timer);
        alert("Time's up!");
      }
    }
  }, 1000);

  return () => clearInterval(timer);
}, [minutes, seconds]);

  const getStatusClass = (num) => {
    // Mock logic for coloring based on question number (can be replaced with real state)
    if ([1, 7, 8, 11].includes(num)) return 'marked';
    if ([5, 15].includes(num)) return 'answered';
    if ([6].includes(num)) return 'not-answered';
    return 'default';
  };

  const options = [
  'Right to Equality',
  'Right to Property',
  'Right to Freedom of Speech',
  'Right to Life and Liberty'
];

  const display = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quis a officia dolores et ratione repudiandae odit pariatur aliquam numquam non doloribus magnam atque facilis aliquid reprehenderit minima inventore sint in, vero sapiente neque rem nostrum consectetur. Recusandae, sint, at pariatur qui labore aspernatur accusantium nihil mollitia quas maiores blanditiis asperiores ratione dicta perspiciatis, voluptatem nemo?"

  return (
    <>
    <Container>
        <Content>
      <Header>
        <LeftDiv>
                <LeftIcon>
            <FaAngleLeft />
        </LeftIcon>
        <HeaderLeft>
          <Language>English Language</Language>

        </HeaderLeft>
        </LeftDiv>
      <RightIcon>
        <FaAngleRight />
      </RightIcon>
      </Header>

      <RightDiv>

                <QuestionType>
            Questions Type: CAMP
          </QuestionType>

                <Timer>
  <Text>Time Left:</Text> 
  <TimeSlot>
    {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
  </TimeSlot>
</Timer>

          </RightDiv>
          <Complier>
      
<QuestionNumber>
    <QuestionTitle>Qusetion No: 1</QuestionTitle>
</QuestionNumber>



      <Section>
        <PassageBox>
          <p>
             {display}
          </p>
        </PassageBox>
        <HorizontalLine></HorizontalLine>

        <QuestionBox>
          <QuestionText>
            <strong>
              According To Above passage which of the following is NOT a Fundamental Right guaranteed by the Constitution of India?
            </strong>
          </QuestionText>
              {questionType === "MCQ" ? (
<OptionsList>
  {options.map((option, index) => (
    <OptionLabel key={index}>
      <input type="radio" name="option" value={option} />
      {option}
    </OptionLabel>
  ))}
</OptionsList>
              ) : (
                <textarea placeholder="Type your answer here..." className='textarea' />
              )}
        </QuestionBox>
              </Section>
        </Complier>


                  <ButtonGroup>
                    <LeftButton>
            <ReviewButton>Mark to Review & Next</ReviewButton>
            <ClearButton>Clear Response</ClearButton>
            </LeftButton>
            <RightButton>
            <NextButton>Save & Next</NextButton>
            </RightButton>
          </ButtonGroup>



      </Content>



     <SidebarContainer>
      <UserCard>
        <UserImage src={Profile} alt="user" />
        <UserInfo>
          <UserName>Gaurav N</UserName>
          <UserEmail>user123@gmail.com</UserEmail>
        </UserInfo>
      </UserCard>

      <Divider />

      <Legend>
        <OptionLabelList >
        <LegendItem className="answered">29</LegendItem>
        <LegendText>Answered</LegendText>
        </OptionLabelList >

        <OptionLabelList >

        <LegendItem className="not-answered">29</LegendItem>
        <LegendText>Not Answered</LegendText>
        </OptionLabelList >

        <OptionLabelList >

        <LegendItem className="marked">29</LegendItem>
        <LegendText>Marked</LegendText>
        </OptionLabelList >

        <OptionLabelList >

        <LegendItem className="not-visited">29</LegendItem>
        <LegendText>Not Visited</LegendText>
         </OptionLabelList >

         <OptionLabelList >

        <LegendItem className="marked-answered">29</LegendItem>
        <LegendText>Answered & Mark for Review</LegendText>
         </OptionLabelList >
      </Legend>

      <SectionTitle>Section</SectionTitle>
      <h3>Choose a Question</h3>

      <QuestionNav>
        <Grid>
          {Array.from({ length: 40 }, (_, i) => (
            <GridButton key={i} className={getStatusClass(i + 1)}>
              {i + 1}
            </GridButton>
          ))}
        </Grid>
      </QuestionNav>

      <FooterButtons>
        <SaveButton>Save For Later</SaveButton>
        <NextButton>Next</NextButton>
      </FooterButtons>
    </SidebarContainer>
        </Container>
    </>
  );
};

export default TextScreen;
