import React, { useRef, useState } from 'react';
import {
  AchieversSection,
  Title,
  Highlight,
  Description,
  CardSlider,
  Card,
  Avatar,
  Name,
  Achievement,
  ProgressBarWrapper,
  ProgressBar
} from './Achievers.styles';
import achieverImage from '../../../assets/Study1.png'; // Replace with your actual image path

const achievers = Array(19).fill({ 
  name: 'Aditi Sharma',
  achievement: 'CLAT PG 2024 AIR 4',
  image: achieverImage,
});

const Achievers = () => {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const maxScrollLeft = scrollWidth - clientWidth;
    const scrolled = (scrollLeft / maxScrollLeft) * 100;
    setScrollProgress(scrolled || 0); // fallback to 0 if NaN
  };

  return (
    <AchieversSection>
      <Title>
        Meet Our <Highlight>Achievers</Highlight>
      </Title>
      <Description>
        At Mankavit Law Academy, our students' success stories are a testament to their hard work and dedication. 
        Join us and start your journey toward achieving your law career goals today!
      </Description>

      <CardSlider ref={sliderRef} onScroll={handleScroll}>
        {achievers.map((achiever, index) => (
          <Card key={index}>
            <Avatar src={achiever.image} alt={achiever.name} />
            <Name>{achiever.name}</Name>
            <Achievement>{achiever.achievement}</Achievement>
          </Card>
        ))}
      </CardSlider>

      <ProgressBarWrapper>
        <ProgressBar width={scrollProgress} />
      </ProgressBarWrapper>
    </AchieversSection>
  );
};

export default Achievers;
