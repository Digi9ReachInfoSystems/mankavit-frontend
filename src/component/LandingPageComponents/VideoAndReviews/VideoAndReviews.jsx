import React from 'react';
import {
  Section,
  VideoWrapper,
  Title,
  Highlight,
  ReviewsContainer,
  ReviewCard,
  Avatar,
  ReviewText,
  ReviewerName,
  ReviewerTitle
} from './VideoAndReviews.styles';

import avatar1 from '../../../assets/Study1.png';
import avatar2 from '../../../assets/Study2.png';
import avatar3 from '../../../assets/Study3.png';

const reviews = [
  {
    name: 'Aditi Sharma',
    title: 'CLAT 2024 Aspirant',
    review: '“The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning section was a game-changer!”',
    image: avatar1,
  },
  {
    name: 'Aditi Sharma',
    title: 'CLAT 2024 Aspirant',
    review: '“The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning section was a game-changer!”',
    image: avatar2,
  },
  {
    name: 'Aditi Sharma',
    title: 'CLAT 2024 Aspirant',
    review: '“The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning section was a game-changer!”',
    image: avatar3,
  },
];

const VideoAndReviews = () => {
  return (
    <Section>
      <VideoWrapper>
        {/* Replace with your embedded YouTube iframe or custom video player */}
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Testimonial Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoWrapper>

      <Title>
        What Are <Highlight>They Saying</Highlight>
      </Title>

      <ReviewsContainer>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <Avatar src={review.image} alt={review.name} />
            <ReviewText>{review.review}</ReviewText>
            <ReviewerName>{review.name}</ReviewerName>
            <ReviewerTitle>{review.title}</ReviewerTitle>
          </ReviewCard>
        ))}
      </ReviewsContainer>
    </Section>
  );
};

export default VideoAndReviews;
