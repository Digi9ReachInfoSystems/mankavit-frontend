import React from 'react';
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
  return (
    <AchieversSection>
      <Title>
        Meet Our <Highlight>Achievers</Highlight>
      </Title>
      <Description>
        At Mankavit Law Academy, our students' success stories are a testament to their hard work and dedication. 
        Join us and start your journey toward achieving your law career goals today!
      </Description>

      <CardSlider>
        {achievers.map((achiever, index) => (
          <Card key={index}>
            <Avatar src={achiever.image} alt={achiever.name} />
            <Name>{achiever.name}</Name>
            <Achievement>{achiever.achievement}</Achievement>
          </Card>
        ))}
      </CardSlider>

      <ProgressBarWrapper>
        <ProgressBar />
      </ProgressBarWrapper>
    </AchieversSection>
  );
};

export default Achievers;
