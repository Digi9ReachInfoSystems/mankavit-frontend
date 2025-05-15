import React, { useEffect, useRef, useState } from 'react';
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



import { getAllAchievers } from '../../../api/achieverApi';

const Achievers = () => {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [achievers, setAchievers] = useState([]);

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const achieversData = await getAllAchievers();
        setAchievers(achieversData);
      } catch (error) {
        console.error('Error fetching achievers:', error);
      }
    };

    fetchAchievers();
  }, []);

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
            <Achievement>{achiever.exam_name}, AIR {achiever.rank}</Achievement>
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
