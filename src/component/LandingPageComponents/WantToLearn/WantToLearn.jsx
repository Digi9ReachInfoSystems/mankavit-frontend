import React from 'react';
import {
  Section,
  Title,
  Highlight,
  CardsWrapper,
  CourseCard,
  CardHeader,
  CardBody,
  CourseTitle,
  Description,
  InfoList,
  InfoItem,
  PriceButton,
  ViewButton,
  ViewMoreWrapper,
  ViewMoreButton,
  Buttons,
  Image
} from './WantToLearn.styles';

import lawBanner from '../../../assets/Study1.png'; // your header banner image

const courses = [
  {
    title: 'CLAT ',
    description: 'Comprehensive coaching to crack CLAT and other top law schools.',
    duration: '6-12 Months',
    success: '90+%',
    rating: '4.3',
  },
  {
    title: 'AILET ',
    description: 'Expert training to excel in the AILET for NLU Delhi.',
    duration: '6-12 Months',
    success: '90+%',
    rating: '4.3',
  },
  {
    title: 'DU LLM ',
    description: 'Tailored coaching for DU LLM entrance success.',
    duration: '6-12 Months',
    success: '90+%',
    rating: '4.3',
  },
  {
    title: 'IILCAT ',
    description: 'Focused coaching for the IILCAT exam and admission to the Indian Law Institute.',
    duration: '6-12 Months',
    success: '90+%',
    rating: '4.3',
  },
];

const WantToLearn = () => {
  return (
    <Section>
      <Title>
        What <Highlight>Do You Want</Highlight> To Learn?
      </Title>

      <CardsWrapper>
        {courses.slice(0, 4).map((course, index) => (
          <CourseCard key={index}>
            <CardHeader>
              <Image src={lawBanner} alt="Law Banner" />
            </CardHeader>

            <CardBody>
              <span> {course.rating}⭐</span>
              <CourseTitle>{course.title} <span style={{fontSize: "14px"}}>Preparation</span></CourseTitle>
              <Description>{course.description}</Description>
              <InfoList>
                <InfoItem>📆 Duration: {course.duration}</InfoItem>
                <InfoItem>✅ Success Rate: {course.success}</InfoItem>
              </InfoList>

            </CardBody>
            <Buttons>
              <PriceButton>₹899/-</PriceButton>
              <ViewButton>View Courses</ViewButton>
              </Buttons>
          </CourseCard>
        ))}
      </CardsWrapper>

      <ViewMoreWrapper>
        <ViewMoreButton>View More Courses</ViewMoreButton>
      </ViewMoreWrapper>
    </Section>
  );
};

export default WantToLearn;
