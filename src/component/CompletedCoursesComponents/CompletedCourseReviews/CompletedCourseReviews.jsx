import React from 'react';
import {
  ReviewContainer,
  RatingTitle,
  StarsRow,
  Star,
  ReviewInputSection,
  ProfileImage,
  ReviewInput,
  ActionIcons,
  ReviewWrapper,
  SectionTitle,
  VideoGrid,
  VideoThumbnail,
  OverlayText,
  TestimonialContainer,
  StudentCard,
  StudentProfile,
  StudentImage,
  StudentInfo,
  StudentName,
  StudentTag,
  ReviewContent,
  HighlightText,
  StarRow,
  Ratings,
  SectionContainer,
  ReviewsContents,
  ReviewDes
} from './CompletedCourseReviews.styles';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiCamera, FiUpload } from 'react-icons/fi';
import { GoStarFill } from "react-icons/go";
import profile from '../../../assets/profile.png';
import achievers from '../../../assets/achievers.jpg';

// Dummy dynamic data
const reviews = [
    {
      id: 1,
      name: 'Aditi Sharma',
      tag: 'CLAT 2024 Aspirant',
      profileImg: profile,
      rating: null,
      title: 'Best CLAT prep ever!',
      text: 'The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning sessions were a game-changer!',
    },
    {
      id: 2,
      name: 'Aditi Sharma',
      tag: 'CLAT 2024 Aspirant',
      profileImg: profile,
      rating: 4.3,
      title: 'Best CLAT prep ever!',
      text: 'The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning sessions were a game-changer!',
    },
  ];

  const videoThumbnails = [
    achievers,
    achievers,
    achievers,
    achievers,
  ];

  const extraVideoCount = 12;

const CompletedCourseReviews = () => {

  const renderStaticStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <FaStar key={`f-${i}`} color="#fbc02d" className='star' />
        ))}
        {half && <FaStar key="half" color="#fbc02d" style={{ opacity: 0.5 }} />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`e-${i}`} color="#ccc"  className='star' />
        ))}
      </>
    );
  };
  

  return (
    <ReviewContainer>
        <Ratings>
      <RatingTitle>Rate this Course</RatingTitle>
      <StarsRow>
        {[...Array(5)].map((_, i) => (
          <Star key={i}>
            <GoStarFill />
          </Star>
        ))}
      </StarsRow>
      </Ratings>

      <ReviewInputSection>
        <ProfileImage src={profile} alt="User" />
        <ReviewInput placeholder="Write a review" />
        <ActionIcons>
          <FiCamera />
          <FiUpload />
        </ActionIcons>
      </ReviewInputSection>

      <ReviewWrapper>
      <SectionTitle>What Students Says</SectionTitle>

      <SectionContainer>

      <VideoGrid>
        {videoThumbnails.map((src, index) => (
          <VideoThumbnail key={index} src={src}>
            {index === videoThumbnails.length - 1 && (
              <OverlayText>+{extraVideoCount} Videos</OverlayText>
            )}
          </VideoThumbnail>
        ))}
      </VideoGrid>

      <TestimonialContainer>
        {reviews.map((review) => (
          <StudentCard key={review.id}>
            <StudentProfile>
              <StudentImage src={review.profileImg} />
              <StudentInfo>
                <StudentName>{review.name}</StudentName>
                <StudentTag>{review.tag}</StudentTag>
              </StudentInfo>
            </StudentProfile>

            <ReviewsContents>

            <ReviewContent>
              <HighlightText> {review.title} </HighlightText>
              <ReviewDes>{review.text} </ReviewDes>
            </ReviewContent>

            {review.rating && (
              <StarRow>
                {review.rating} {renderStaticStars(review.rating)}
              </StarRow>
            )}
            </ReviewsContents>
          </StudentCard>
        ))}
      </TestimonialContainer>
      </SectionContainer>
    </ReviewWrapper>
    </ReviewContainer>
  );
};

export default CompletedCourseReviews;
