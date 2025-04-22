import React from 'react';
import {
  HeroSection,
  LeftContent,
  RightImage,
  Stats,
  StatBox
} from './LegalEducationHero.styles';
import heroImage from '../../../assets/Study1.png'; // Adjust the path as needed

const LegalEducationHero = () => {
  return (
    <>
      <HeroSection>
        <LeftContent>
          <h1>India's Trusted Legal Education Platform</h1>
          <p>
            Ace exams like CLAT, AILET, and DU LL.M. with expert coaching and comprehensive resources.
          </p>
          <div className="buttons">
            <button className="get-started">Get Started</button>
            <button className="explore">Explore Courses</button>
          </div>
        </LeftContent>

        <RightImage>
          <img src={heroImage} alt="Law Education Illustration" />
        </RightImage>
      </HeroSection>

      <Stats>
        <StatBox>
          <h2>95%</h2>
          <p>Success Rate in Law Entrance Exams</p>
        </StatBox>
        <StatBox>
          <h2>82%</h2>
          <p>Improvement in Student Performance</p>
        </StatBox>
        <StatBox>
          <h2>2x</h2>
          <p>Faster Exam Preparation with Expert Coaching</p>
        </StatBox>
      </Stats>
    </>
  );
};

export default LegalEducationHero;
