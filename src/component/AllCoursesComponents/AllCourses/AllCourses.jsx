import React from 'react';
import {
  Container,
  Title,
  FilterBar,
  FilterButton,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  SliderIcon,
  CardGrid,
  CourseCard,
  ImageWrapper,
  CourseContent,
  CourseMain,
  CourseHead,
  CourseTitle,
  CourseMinititle,
  CourseDesc,
  Details,
  DetailItem,
  PriceActions,
  Price,
  ViewButton,
} from './AllCourses.styles';
import { CiSearch } from "react-icons/ci";
import { BiSliderAlt } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";
import lawimg from "../../../assets/lawentrance.png";
import { Slider } from 'antd';

const courses = [
  {
    title: 'AILET',
    minititle: 'Preparation',
    desc: 'Expert training to excel in the AILET for NLU Delhi.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'DU LL.M ',
    minititle: 'Coaching',
    desc: 'Tailored coaching for DU LL.M entrance success.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'ILICAT ',
    minititle: 'Preparation',
    desc: 'Focused coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹999/-'
  },
  {
    title: 'CLAT ',
    minititle: 'Preparation',
    desc: 'Comprehensive coaching to crack CLAT and enter top law schools.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'ILICAT ',
    minititle: 'Preparation',
    desc: 'Focused coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'CLAT ',
    minititle: 'Preparation',
    desc: 'Intoused coaching for the ILICAT exam admission.',
    duration: '6-12 Months',
    success: '90%',
    price: '₹599/-'
  },
  {
    title: 'CLAT ',
    minititle: 'Preparation',
    desc: 'Tailored coaching for DU LL.M entrance success.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-'
  },
  {
    title: 'ILICAT ',
    minititle: 'Preparation',
    desc: 'Tailored coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%',
    price: '₹599/-'
  },
  {
    title: 'IGICAT ',
    minititle: 'Preparation',
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
      </FilterBar>

      <SearchWrapper>
        <SearchIcon>
          <CiSearch size={24} />
        </SearchIcon>
        <SearchInput placeholder="Search" />
        <SliderIcon>
          <BiSliderAlt size={24} />
        </SliderIcon>
      </SearchWrapper>

      <CardGrid>
        {courses.map((course, index) => (
          <CourseCard key={index}>
            <ImageWrapper>
              <img src={lawimg} alt="Law Banner" />
            </ImageWrapper>
            <CourseContent>
              <CourseMain>
                <CourseHead>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseMinititle>{course.minititle}</CourseMinititle>
                </CourseHead>
                <CourseDesc>{course.desc}</CourseDesc>
              </CourseMain>
              <Details>
                <DetailItem><FcCalendar /> Duration: {course.duration}</DetailItem>
                <DetailItem>🏆Success Rate: {course.success}</DetailItem>
              </Details>
            </CourseContent>
            
            <PriceActions>
              <Price>{course.price}</Price>
              <ViewButton>View Details</ViewButton>
            </PriceActions>
          </CourseCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default AllCourses;
