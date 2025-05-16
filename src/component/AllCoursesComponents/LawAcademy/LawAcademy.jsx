import React from 'react';
import {
  Wrapper,
  Heading,
  Subheading,
  HighlightTitle,
  Paragraph,
  List,
  ListItem,
  Highlight
} from './LawAcademy.stylles';

const descriptionText = `Mankavit Law Academy offers comprehensive coaching for various LLM entrance exams,
including CLAT PG, AILET PG, DU LLM, and ILI CAT. The course covers essential subjects
such as Jurisprudence, Administrative Law, Law of Contract, Torts, Family Law, Criminal
Laws, Property Law, Company Law, Public International Law, Tax Law, Environmental Law,
Labour & Industrial Law, Constitutional Law, Consumer Protection Act, IPR, Cyber Law,
Sale of Goods Act, Law of Limitation, Specific Relief Act, and Partnership Act. The
curriculum is designed to provide in-depth understanding, focusing on both
fundamental concepts and exam-specific topics.`;

const highlightsList = [
  {
    title: 'Expert Faculty:',
    content: `Learn from educators who have recently excelled in LLM entrance exams, including
    securing All India Rank 16 in AILET PG and Rank 21 in CLAT PG.`,
  },
  {
    title: 'Comprehensive Study Materials:',
    content: `Receive meticulously prepared notes and materials, updated according to the latest
    exam patterns and based on thorough analysis of previous years’ papers.`,
  },
  {
    title: 'Practice Mocks:',
    content: `Engage in regular mock tests, including full-length exams and subject-wise assessments,
    with feedback sessions to monitor progress and identify areas for improvement.`,
  },
  {
    title: 'Personalized Mentoring:',
    content: `Benefit from one-on-one mentoring sessions, offering personalized guidance and support
    throughout your preparation journey.`,
  },
  {
    title: 'Proven Success:',
    content: `Join a community with a track record of top ranks and successful admissions, reflecting
    the effectiveness of our coaching methodology.`,
  },
];

const LawAcademy = () => {
  return (
    <Wrapper>
      <Heading>
        Course Structure At <Highlight>Mankavit Law Academy</Highlight>
      </Heading>

      <Paragraph>{descriptionText}</Paragraph>

      <HighlightTitle>
        Course <Highlight>Highlights:</Highlight>
      </HighlightTitle>

      <List>
        {highlightsList.map((item, idx) => (
          <ListItem key={idx}>
            <strong>{item.title}</strong> {item.content}
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

export default LawAcademy;
