import React, { useState } from 'react';
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
  RatingWrapper,
  ContinueButton
} from './AllCoursesDetails.styles';

import { CiSearch } from "react-icons/ci";
import { BiSliderAlt } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import lawimg from "../../../assets/lawentrance.png";

const courses = [
  {
    title: 'AILET',
    minititle: 'Preparation',
    desc: 'Expert training to excel in the AILET for NLU Delhi.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-',
    rating: 4.5,
    category: 'Popular',
  },
  {
    title: 'DU LL.M',
    minititle: 'Coaching',
    desc: 'Tailored coaching for DU LL.M entrance success.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-',
    rating: 4.7,
    category: 'Most Liked',
  },
  {
    title: 'ILICAT',
    minititle: 'Preparation',
    desc: 'Focused coaching for the ILICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹999/-',
    rating: 4.2,
    category: 'Popular',
  },
  {
    title: 'CLAT',
    minititle: 'Preparation',
    desc: 'Comprehensive coaching to crack CLAT and enter top law schools.',
    duration: '6-12 Months',
    success: '90%+',
    price: '₹599/-',
    rating: 4.8,
    category: 'Most Liked',
  },
  {
    title: 'IGICAT',
    minititle: 'Preparation',
    desc: 'Focused coaching for IGICAT exam and admission.',
    duration: '6-12 Months',
    success: '90%',
    price: '₹599/-',
    rating: 4.1,
    category: 'Popular',
    status: 'Continuing',
  },
  {
    title: 'MH CET Law',
    minititle: 'Test Series',
    desc: 'Practice test series for MH CET Law aspirants.',
    duration: '3-6 Months',
    success: '85%',
    price: '₹499/-',
    rating: 4.3,
    category: 'Popular',
  },
  {
    title: 'LSAT India',
    minititle: 'Crash Course',
    desc: 'Intensive crash course for LSAT India preparation.',
    duration: '2 Months',
    success: '88%',
    price: '₹799/-',
    rating: 4.4,
    category: 'Most Liked',
  },
  {
    title: 'Symbiosis Law',
    minititle: 'Mock Tests',
    desc: 'High-quality mock tests for Symbiosis Law entrance.',
    duration: '1-3 Months',
    success: '87%',
    price: '₹299/-',
    rating: 4.0,
    category: 'Popular',
  },
  {
    title: 'AMU Law',
    minititle: 'Coaching',
    desc: 'Coaching designed for AMU Law entrance exam.',
    duration: '6 Months',
    success: '91%',
    price: '₹699/-',
    rating: 4.6,
    category: 'Most Liked',
  },
  {
    title: 'PU LL.B',
    minititle: 'Coaching',
    desc: 'Comprehensive coaching for Punjab University law entrance.',
    duration: '5 Months',
    success: '89%',
    price: '₹649/-',
    rating: 4.5,
    category: 'Popular',
  },
  {
    title: 'Army Institute of Law',
    minititle: 'Preparation',
    desc: 'Dedicated prep for Army Institute of Law exam.',
    duration: '4 Months',
    success: '86%',
    price: '₹549/-',
    rating: 4.2,
    category: 'Popular',
  },
  {
    title: 'KLEE',
    minititle: 'Foundation',
    desc: 'Foundation course for Kerala Law Entrance Exam (KLEE).',
    duration: '6 Months',
    success: '92%',
    price: '₹599/-',
    rating: 4.6,
    category: 'Most Liked',
  },
  {
    title: 'Law Aptitude Bootcamp',
    minititle: 'Skill Building',
    desc: 'Skill building bootcamp to improve legal aptitude.',
    duration: '1 Month',
    success: '83%',
    price: '₹399/-',
    rating: 4.0,
    category: 'Popular',
  }
];


const TABS = ['All', 'Popular', 'Most Liked'];

const AllCoursesDetails = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeTab === 'All' || course.category === activeTab;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container>
      <Title>
        Our <span>Courses</span>
      </Title>

      <FilterBar>
        {TABS.map(tab => (
          <FilterButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </FilterButton>
        ))}
      </FilterBar>

      <SearchWrapper>
        <SearchIcon>
          <CiSearch size={24} />
        </SearchIcon>
        <SearchInput
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SliderIcon>
          <BiSliderAlt size={24} />
        </SliderIcon>
      </SearchWrapper>

      <CardGrid>
        {filteredCourses.map((course, index) => (
          <CourseCard key={index}>
            <ImageWrapper>
              <img src={lawimg} alt="Law Banner" />
            </ImageWrapper>
            <CourseContent>
              <CourseMain>
                <RatingWrapper>
                  {course.rating} <FaStar color="#f5b301" style={{ marginLeft: "5px" }} />
                </RatingWrapper>
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
                <>
                  <Price>{course.price}</Price>
                  <ViewButton>View Details</ViewButton>
                </>
            </PriceActions>
          </CourseCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default AllCoursesDetails;
