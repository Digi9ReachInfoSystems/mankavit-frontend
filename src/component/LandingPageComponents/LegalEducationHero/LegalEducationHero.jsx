import React from 'react';
import {
  HeroSection,
  LeftContent,
  RightImage,
  Stats,
  StatBox,
  Circle,
  SecCircle,
  Title,
  SubTitle,
  ButtonsGroup,
  StartButton,
  ExploreButton,
  StatTitle,
  StatsDescription


  
} from './LegalEducationHero.styles';
import heroImage from '../../../assets/LandingBannerImag.png'; // Adjust the path as needed

const LegalEducationHero = () => {
  return (
    <>
      <HeroSection>
        <LeftContent>
          <Title>India's Trusted Legal Education Platform</Title>
          <SubTitle>
            Ace exams like CLAT, AILET, and DU LL.M. with expert coaching and comprehensive resources.
          </SubTitle>
          <ButtonsGroup>
            <StartButton>Get Started</StartButton>
            <ExploreButton>Explore Courses</ExploreButton>
          </ButtonsGroup>
        </LeftContent>
        <Circle> </Circle>
        <SecCircle> </SecCircle>
        <RightImage>
          <img src={heroImage} alt="Law Education Illustration" />
        </RightImage>
      </HeroSection>

      <Stats>
        <StatBox>
          <StatTitle>95%</StatTitle>
          <StatsDescription>Success Rate in Law Entrance Exams</StatsDescription>
        </StatBox>
        <StatBox>
          <StatTitle>82%</StatTitle>
          <StatsDescription>Improvement in Student Performance</StatsDescription>
        </StatBox>
        <StatBox>
          <StatTitle>2x</StatTitle>
          <StatsDescription>Faster Exam Preparation with Expert Coaching</StatsDescription>
        </StatBox>
      </Stats>
    </>
  );
};

export default LegalEducationHero;
