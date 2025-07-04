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
  ProgressBar,
  LoadingMessage,
  ErrorMessage
} from './Achievers.styles';
import { getAllAchievers } from '../../../api/achieverApi';

const Achievers = () => {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        setLoading(true);
        const response = await getAllAchievers();
        
        // Handle different response formats
        if (Array.isArray(response)) {
          setAchievers(response);
        } else if (response.data && Array.isArray(response.data)) {
          setAchievers(response.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error('Error fetching achievers:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievers();
  }, []);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const maxScrollLeft = scrollWidth - clientWidth;
    const scrolled = (scrollLeft / maxScrollLeft) * 100;
    setScrollProgress(scrolled || 0);
  };

  if (loading) return <LoadingMessage>Loading achievers...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!achievers || achievers.length === 0) return <LoadingMessage>No achievers data available</LoadingMessage>;

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
        {achievers?.map((achiever, index) => (
          <Card key={index}>
            <Avatar src={achiever.image || 'default-avatar.png'} alt={achiever.name} />
            <Name>{achiever.name}</Name>
            <Achievement>
              {achiever.exam_name}, AIR {achiever.rank}
            </Achievement>
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