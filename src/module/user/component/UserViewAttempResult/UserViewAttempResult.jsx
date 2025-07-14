import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  Container, Content, Header, LeftDiv, LeftIcon, HeaderLeft, Language,
  QuestionType, Timer, Text,
  Complier, QuestionNumber, QuestionTitle, Section,
  PassageBox, HorizontalLine, QuestionBox, OptionsList, OptionLabel,
  ButtonGroup, LeftButton, ClearButton, RightButton, NextButton,
  SidebarContainer, Divider, Legend, OptionLabelList, LegendText, LegendItem,
  QuestionNav, Grid, GridButton, FooterButtons,
  SummaryContainer, SummaryItem, SummaryLabel, SummaryValue,
  RankBadge, AttemptInfo
} from '../UserViewAttempResult/UserViewAttempResult.style';
import { getMocktestById, viewUserMocktestAttemptResult } from '../../../../api/mocktestApi';
import { getCookiesData } from '../../../../utils/cookiesService';

// --- styled components for passage layout ---
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

export default function UserViewAttempResult() {
  const { userId, mockTestId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [summaryData, setSummaryData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const unwrap = r => r?.data?.body?.data ?? r?.data;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        // 1) get user attempt result
        const res = await viewUserMocktestAttemptResult(userId, mockTestId);
        if (!res.success) throw new Error(res.message || 'Invalid response');
        const { result, ranking, remainigAttempts } = res;
        setAttempt(result);
        setRanking(ranking);
        setRemainingAttempts(remainigAttempts);

        // 2) get test metadata
        const resTest = await getMocktestById(mockTestId);
        const testData = unwrap(resTest);
        setTest(testData);

        // 3) build summary
        setSummaryData([
          { label: 'Total Questions',           value: testData.questions.length },
          { label: 'MCQ Marks Obtained',        value: result.mcqScore || 0 },
          { label: 'Subjective Marks Obtained', value: result.subjectiveScore || 0 },
          { label: 'Total Marks Obtained',      value: result.totalMarks || 0 },
          { label: 'Rank',                      value: ranking?.rank ? `#${ranking.rank}` : 'N/A' },
          { label: 'Attempt Number',            value: result.attemptNumber || 1 },
          { label: 'Remaining Attempts',        value: remainigAttempts },
        ]);

        // 4) process questions, including passage and normalize status
        const proc = (result.answers || []).map(a => {
          const raw = a.status || 'unattempted';
          const status = raw.endsWith('-for-review')
            ? raw.replace('-for-review','')
            : raw;
          const d = a.questionDetails || {};
          return {
            id:             a.questionId,
            text:           d.questionText || '',
            passageText:    d.passageText || '',
            isPassage:      !!d.isPassage,
            options:        d.options || [],
            selectedOption: a.answerIndex,
            selectedAnswer: a.answer,
            correctAnswer:  d.correctAnswer,
            expectedAnswer: d.expectedAnswer,
            explanation:    d.explanation,
            isCorrect:      a.isCorrect,
            marks:          a.marksAwarded || 0,
            maxMarks:       d.marks || 0,
            type:           d.type || 'mcq',
            status
          };
        });
        setQuestions(proc);

      } catch (err) {
        console.error('Load error:', err);
        toast.error(err.message || 'Could not load results');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [userId, mockTestId, navigate]);

  if (loading) return <div>Loading results...</div>;
  if (!attempt || !test) return <div>Unable to load your attempt.</div>;

  const current = questions[currentIndex] || {};
  const isMCQ   = current.type === 'mcq';
  const isPass  = current.isPassage;

  // count statuses
  const counts = questions.reduce((c, q) => {
    c[q.status] = (c[q.status]||0) + 1;
    return c;
  }, {});
  const getCount = st => counts[st] || 0;

  const goPrev = () => currentIndex>0 && setCurrentIndex(i=>i-1);
  const goNext = () => currentIndex<questions.length-1 && setCurrentIndex(i=>i+1);

  return (
    <Container>
      <Content>
        <Header>
          <LeftDiv>
            <LeftIcon onClick={() => navigate(-1)}><FaAngleLeft/></LeftIcon>
            <HeaderLeft>
              <Language>ENG</Language>
              <AttemptInfo>
                Attempt {attempt.attemptNumber} — Submitted {new Date(attempt.submittedAt).toLocaleString()}
              </AttemptInfo>
            </HeaderLeft>
          </LeftDiv>
          {ranking?.rank && <RankBadge>Rank #{ranking.rank}</RankBadge>}
        </Header>

        <QuestionType>
          {isPass
            ? 'Passage'
            : isMCQ
              ? 'MCQ'
              : 'Subjective'}
        </QuestionType>
        <Timer><Text>Performance Summary</Text></Timer>

        <SummaryContainer>
          {summaryData.map((s,i)=>(
            <SummaryItem key={i}>
              <SummaryLabel>{s.label}</SummaryLabel>
              <SummaryValue>{s.value}</SummaryValue>
            </SummaryItem>
          ))}
        </SummaryContainer>

        <Complier>
          <QuestionNumber>
            <QuestionTitle>Q {currentIndex+1}</QuestionTitle>
          </QuestionNumber>
          <Section>
            {isPass ? (
              <PassageContainer>
                <PassageSection>
                  <PassageBox dangerouslySetInnerHTML={{__html: current.passageText}}/>
                </PassageSection>
                <QuestionSection>
                  <QuestionBox>
                    <QuestionTitle dangerouslySetInnerHTML={{__html: current.text}}/>
                    {isMCQ ? (
                      <OptionsList>
                        {current.options.map((opt,idx)=>{
                          const sel = idx===current.selectedOption;
                          const cor = idx===current.correctAnswer;
                          let cls='unattempted';
                          if (sel&&cor)    cls='correct-attempted';
                          if (sel&&!cor)   cls='incorrect-attempted';
                          if (!sel&&cor)   cls='correct-unattempted';
                          return (
                            <OptionLabel key={idx} status={cls}>
                              <input type="radio" checked={sel} readOnly/>
                              {(opt.text||opt)}
                              {cor && <span style={{marginLeft:10,color:'green'}}>(Correct)</span>}
                            </OptionLabel>
                          );
                        })}
                      </OptionsList>
                    ) : (
                      <div>
                        <p><strong>Your Answer:</strong> {current.selectedAnswer || '—'}</p>
                        {current.expectedAnswer && (
                          <p><strong>Expected:</strong> {current.expectedAnswer}</p>
                        )}
                      </div>
                    )}
                  </QuestionBox>
                </QuestionSection>
              </PassageContainer>
            ) : (
              <>
                <PassageBox dangerouslySetInnerHTML={{__html: current.text}}/>
                <HorizontalLine/>
                <QuestionBox>
                  {isMCQ ? (
                    <OptionsList>
                      {current.options.map((opt,idx)=>{
                        const sel = idx===current.selectedOption;
                        const cor = idx===current.correctAnswer;
                        let cls='unattempted';
                        if (sel&&cor)    cls='correct-attempted';
                        if (sel&&!cor)   cls='incorrect-attempted';
                        if (!sel&&cor)   cls='correct-unattempted';
                        return (
                          <OptionLabel key={idx} status={cls}>
                            <input type="radio" checked={sel} readOnly/>
                            {(opt.text||opt)}
                            {cor && <span style={{marginLeft:10,color:'green'}}>(Correct)</span>}
                          </OptionLabel>
                        );
                      })}
                    </OptionsList>
                  ) : (
                    <div>
                      <p><strong>Your Answer:</strong> {current.selectedAnswer || '—'}</p>
                      {current.expectedAnswer && (
                        <p><strong>Expected:</strong> {current.expectedAnswer}</p>
                      )}
                    </div>
                  )}
                </QuestionBox>
              </>
            )}
          </Section>

          <ButtonGroup>
            <LeftButton><ClearButton onClick={goPrev}>Previous</ClearButton></LeftButton>
            <RightButton><NextButton onClick={goNext}>Next</NextButton></RightButton>
          </ButtonGroup>
        </Complier>
      </Content>

      <SidebarContainer>
        <Divider/>
        <Legend>
          <OptionLabelList><LegendItem className="unattempted">{getCount('unattempted')}</LegendItem><LegendText>Unattempted</LegendText></OptionLabelList>
          <OptionLabelList><LegendItem className="answered">{getCount('answered')}</LegendItem><LegendText>Answered</LegendText></OptionLabelList>
          <OptionLabelList><LegendItem className="answered-marked">{getCount('answered-marked')}</LegendItem><LegendText>Answered & Marked</LegendText></OptionLabelList>
          <OptionLabelList><LegendItem className="not-answered-marked">{getCount('not-answered-marked')}</LegendItem><LegendText>Not Answered & Marked</LegendText></OptionLabelList>
          <OptionLabelList><LegendItem className="not-answered">{getCount('not-answered')}</LegendItem><LegendText>Not Answered</LegendText></OptionLabelList>
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
          {/* {remainingAttempts>0 && (
            <NextButton onClick={()=>navigate(`/test-instructions/${mockTestId}`)}>
              Retake
            </NextButton>
          )} */}
          <NextButton onClick={()=>navigate('/user')}>
            Back to Dashboard
          </NextButton>
        </FooterButtons>
      </SidebarContainer>
    </Container>
  );
}
