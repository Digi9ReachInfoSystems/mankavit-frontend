import React from 'react';
import {
  PageContainer,
  Title,
  Highlight,
  Description,
  SubTitle,
  OfferList,
  OfferItem,
} from './EntranceCourses.styles';

const courseData = {
  title: "CUET LL.M Preparation At",
  highlight: "Mankavit Law Academy",
  description: `The Common University Entrance Test (CUET) for LL.M is a crucial exam for those aspiring to
  pursue a Master of Laws (LL.M) degree in India’s top universities. At Mankavit Law Academy,
  we offer comprehensive coaching for CUET LL.M that is designed to equip you with the right
  knowledge, strategies, and confidence to excel in this competitive exam.

  Our CUET LL.M preparation program covers every aspect of the exam, from core legal subjects
  to specialized topics, helping you develop a strong understanding of the syllabus. With
  expert faculty, personalized mentoring, and in-depth study materials, we ensure you’re
  well-prepared for success.`,
  offers: [
    "Live Classes: Interactive Online Sessions With Experienced Faculty.",
    "Study Materials: Comprehensive Notes, Mock Tests, And Previous Year Papers.",
    "Mock Tests & Quizzes: Regular Practice To Assess And Improve Your Performance.",
    "Doubt Solving: Dedicated Sessions For Clearing Doubts And Improving Problem Areas.",
    "Personalized Mentoring: One-On-One Coaching For Tailored Guidance And Strategies.",
  ],
};

const EntranceCourses = () => {
  const { title, highlight, description, offers } = courseData;

  return (
    <PageContainer>
      <Title>
        {title} <Highlight>{highlight}</Highlight>
      </Title>
      <Description>
        {description}
      </Description>

      <SubTitle>
        What We <Highlight>Offer</Highlight>:
      </SubTitle>
      <OfferList>
        {offers.map((offer, index) => (
          <OfferItem key={index}>{offer}</OfferItem>
        ))}
      </OfferList>
    </PageContainer>
  );
};

export default EntranceCourses;
