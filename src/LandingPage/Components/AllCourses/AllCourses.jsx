import React from 'react';
import {
  Container,
  Title,
  FilterBar,
  FilterButton,
  SearchInput,
  CardGrid,
  CourseCard,
  ImageWrapper,
  CourseContent,
  CourseTitle,
  CourseDesc,
  Details,
  DetailItem,
  PriceActions,
  Price,
  Button,
} from './AllCourses.styles';
import lawimg from "../../../assets/lawentrance.png";

const courses = [
  {
    title: 'AILET Preparation',
    desc: 'Expert training to excel in the AILET for NLU Delhi.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'DU LL.M Coaching',
    desc: 'Tailored coaching for DU LL.M entrance success.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'ILICAT Preparation',
    desc: 'Focused coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹999/-'
  },
  {
    title: 'CLAT Preparation',
    desc: 'Comprehensive coaching to crack CLAT and enter top law schools.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'ILICAT Preparation',
    desc: 'Focused coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'CLAT Preparation',
    desc: 'Intoused coaching for the ILICAT exam admission.',
    duration: '6-12 Months',
    success: '90%',
    price: '₹599/-'
  },
  {
    title: 'CLAT Preparation',
    desc: 'Tailored coaching for DU LL.M entrance success.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'ILICAT Propraation',
    desc: 'Tailored coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%',
    price: '₹599/-'
  },
  {
    title: 'IGICAT Preparation',
    desc: 'Focused coaching for IKICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%',
    price: '₹599/-'
  }
];

const AllCourses = () => {
  return (
    <Container>
      <Title>
        Our <span>Courses</span>
      </Title>

      <FilterBar>
        <FilterButton active>All</FilterButton>
        <FilterButton>Popular</FilterButton>
        <FilterButton>Most Liked</FilterButton>
        <SearchInput placeholder="🔍 Search" />
      </FilterBar>

      <CardGrid>
        {courses.map((course, index) => (
          <CourseCard key={index}>
            <ImageWrapper>
              <img src={lawimg}alt="Law Banner" />
            </ImageWrapper>
            <CourseContent>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDesc>{course.desc}</CourseDesc>
              <Details>
                <DetailItem>📅 Duration: {course.duration}</DetailItem>
                <DetailItem>📊 Success Rate: {course.success}</DetailItem>
              </Details>
              <PriceActions>
                <Price>{course.price}</Price>
                <Button>View Details</Button>
              </PriceActions>
            </CourseContent>
          </CourseCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default AllCourses;
