import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
  RightIcon, QuestionType, Timer, Text,
  Complier, QuestionNumber, QuestionTitle, Section,
  PassageBox, HorizontalLine, QuestionBox, OptionsList, OptionLabel,
  ButtonGroup, LeftButton, ClearButton, RightButton, NextButton,
  SidebarContainer, Divider, Legend, OptionLabelList, LegendText, LegendItem,
  QuestionNav, Grid, GridButton, FooterButtons,
  SummaryContainer, SummaryItem, SummaryLabel, SummaryValue 
} from './ResultScreen.styles';
import { getMocktestById, getMocktestAttempts } from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';

// --- styled for passage layout ---
const PassageContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;
const PassageSection = styled.div`
  flex: 1;
`;
const QuestionSection = styled.div`
  flex: 1;
`;
const QuestionText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function ResultScreen() {
  const { testId, subjectId, attemptId } = useParams();
  const navigate = useNavigate();
  const { userId } = getCookiesData();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summaryData, setSummaryData] = useState([]);

  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    (async () => {
      try {
        // 1. Load test meta
        const resTest = await getMocktestById(testId);
        const testData = unwrap(resTest);
        setTest(testData);

        // 2. Load attempt
        const resAtts = await getMocktestAttempts(userId, testId);
        const arr = unwrap(resAtts) || [];
        const latestAttempt = arr.find(a => a._id === attemptId) || arr[arr.length - 1];

        // 3. Build questions WITH passage info + normalized status
        const processed = (latestAttempt.answers || []).map(ans => {
          const rawStatus = ans.status || 'unattempted';
          const status = rawStatus.endsWith('-for-review')
            ? rawStatus.replace('-for-review','')
            : rawStatus;

          const details = ans.questionDetails || {};
          return {
            id: ans.questionId,
            text: details.questionText || '',
            options: details.options || [],
            selectedOption: ans.answerIndex,
            correctAnswer: details.correctAnswer,
            isCorrect: ans.isCorrect,
            marks: ans.marksAwarded || 0,
            explanation: details.expectedAnswer || '',
            type: details.type || 'mcq',
            status,
            isPassage: details.isPassage,
            passageText: details.passageText || ''
          };
        });
        setQuestions(processed);

        // 4. Build summary
        setSummaryData([
          { label: 'Total Questions',           value: testData.questions.length },
          { label: 'Attempted Questions',       value: processed.filter(q=>q.selectedOption!=null).length },
          { label: 'Correct Answers',           value: processed.filter(q=>q.isCorrect).length },
          { label: 'MCQ Marks Obtained',        value: latestAttempt.mcqScore || 0 },
          { label: 'Subjective Marks Obtained', value: latestAttempt.subjectiveScore || 0 },
          { label: 'Total Marks Obtained',      value: latestAttempt.totalMarks || 0 }
        ]);

      } catch (err) {
        console.error(err);
        toast.error('Could not load results');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, attemptId, userId, navigate]);

  if (loading) return <div>Loading results…</div>;
  if (!test)   return <div>Unable to load your attempt.</div>;

const current = questions[currentIndex] || {};
const isMCQ   = current.type === 'mcq';
const isPassage = current.isPassage;


  // status counts
  const counts = questions.reduce((acc, q) => {
    acc[q.status] = (acc[q.status]||0) + 1;
    return acc;
  }, {});
  const getCount = st => counts[st] || 0;

  // nav
  const goPrev = () => currentIndex>0 && setCurrentIndex(i=>i-1);
  const goNext = () => currentIndex<questions.length-1 && setCurrentIndex(i=>i+1);

  return (
    <Container>
      <Content>
        {/* Header + summary */}
        <Header>
          <LeftDiv>
            <LeftIcon onClick={()=>navigate(-1)}><FaAngleLeft/></LeftIcon>
            <HeaderLeft><Language>ENG</Language></HeaderLeft>
          </LeftDiv>
          <RightIcon><FaAngleRight/></RightIcon>
        </Header>
        {/* <QuestionType>{isMCQ?'MCQ':'Subjective'}</QuestionType> */}
 <QuestionType>
   {isPassage
     ? 'Passage'
     : isMCQ
       ? 'MCQ'
       : 'Subjective'}
 </QuestionType>

        <Timer><Text>Result Analysis</Text></Timer>

        <SummaryContainer>
          {summaryData.map((s,i)=>(
            <SummaryItem key={i}>
              <SummaryLabel>{s.label}</SummaryLabel>
              <SummaryValue>{s.value}</SummaryValue>
            </SummaryItem>
          ))}
        </SummaryContainer>

        {/* Question + (optional) Passage */}
        <Complier>
          <QuestionNumber>
            <QuestionTitle>Q {currentIndex+1}</QuestionTitle>
          </QuestionNumber>
          <Section>
            {current.isPassage ? (
              <PassageContainer>
                <PassageSection>
                  <PassageBox
                    dangerouslySetInnerHTML={{__html: current.passageText}}
                  />
                </PassageSection>
                <QuestionSection>
                  <QuestionBox>
                    <QuestionText
                      dangerouslySetInnerHTML={{__html: current.text}}
                    />
                    {isMCQ ? (
                      <OptionsList>
                        {current.options.map((opt,idx)=>{
                          const isSel = idx===current.selectedOption;
                          const isCor= idx===current.correctAnswer;
                          let cls='unattempted';
                          if(isSel&&isCor)    cls='correct-attempted';
                          if(isSel&&!isCor)   cls='incorrect-attempted';
                          if(!isSel&&isCor)   cls='correct-unattempted';
                          return (
                            <OptionLabel key={idx} status={cls}>
                              <input type="radio" checked={isSel} readOnly/>
                              {(opt.text||opt)}
                              {isCor && <span style={{marginLeft:10,color:'green'}}>(Correct)</span>}
                            </OptionLabel>
                          );
                        })}
                      </OptionsList>
                    ) : (
                      <div>
                        <p><strong>Your Answer:</strong></p>
                        <p>{current.selectedOption ?? 'No answer provided'}</p>
                      </div>
                    )}
                  </QuestionBox>
                </QuestionSection>
              </PassageContainer>
            ) : (
              <>
                <PassageBox
                  dangerouslySetInnerHTML={{__html: current.text}}
                />
                <HorizontalLine/>
                <QuestionBox>
                  {isMCQ ? (
                    <OptionsList>
                      {current.options.map((opt,idx)=>{
                        const isSel = idx===current.selectedOption;
                        const isCor= idx===current.correctAnswer;
                        let cls='unattempted';
                        if(isSel&&isCor)    cls='correct-attempted';
                        if(isSel&&!isCor)   cls='incorrect-attempted';
                        if(!isSel&&isCor)   cls='correct-unattempted';
                        return (
                          <OptionLabel key={idx} status={cls}>
                            <input type="radio" checked={isSel} readOnly/>
                            {(opt.text||opt)}
                            {isCor && <span style={{marginLeft:10,color:'green'}}>(Correct)</span>}
                          </OptionLabel>
                        );
                      })}
                    </OptionsList>
                  ) : (
                    <div>
                      <p><strong>Your Answer:</strong></p>
                      <p>{current.selectedOption ?? 'No answer provided'}</p>
                    </div>
                  )}
                </QuestionBox>
              </>
            )}
          </Section>

          <ButtonGroup>
            <LeftButton>
              <ClearButton onClick={goPrev}>Previous</ClearButton>
            </LeftButton>
            <RightButton>
              <NextButton onClick={goNext}>Next</NextButton>
            </RightButton>
          </ButtonGroup>
        </Complier>
      </Content>

      {/* Sidebar */}
      <SidebarContainer>
        <Divider/>
        <Legend>
          <OptionLabelList>
            <LegendItem className="unattempted">{getCount('unattempted')}</LegendItem>
            <LegendText>Unattempted</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="answered">{getCount('answered')}</LegendItem>
            <LegendText>Answered</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="answered-marked">{getCount('answered-marked')}</LegendItem>
            <LegendText>Answered & Marked</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="not-answered-marked">{getCount('not-answered-marked')}</LegendItem>
            <LegendText>Not Answered & Marked</LegendText>
          </OptionLabelList>
          <OptionLabelList>
            <LegendItem className="not-answered">{getCount('not-answered')}</LegendItem>
            <LegendText>Not Answered</LegendText>
          </OptionLabelList>
        </Legend>

        <QuestionNav>
          <Grid>
            {questions.map((_,i)=>(
              <GridButton
                key={i}
                className={questions[i].status}
                active={i===currentIndex}
                onClick={()=>setCurrentIndex(i)}
              >
                {i+1}
              </GridButton>
            ))}
          </Grid>
        </QuestionNav>

        <FooterButtons>
          <NextButton onClick={()=>navigate('/user')}>Back to Dashboard</NextButton>
        </FooterButtons>
      </SidebarContainer>
    </Container>
  );
}
