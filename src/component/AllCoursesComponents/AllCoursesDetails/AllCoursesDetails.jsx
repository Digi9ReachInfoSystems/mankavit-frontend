import React, { useEffect, useState } from 'react';
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
  RatingWrapper
} from './AllCoursesDetails.styles';

import { CiSearch } from 'react-icons/ci';
import { BiSliderAlt } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { FaStar } from 'react-icons/fa';
import lawimg from '../../../assets/lawentrance.png';

import { getAllCourses, getAllUserCourseByCategory, getAllUserCourses, getCourseByCategory } from '../../../api/courseApi';
import { getCategories } from '../../../api/categoryApi';
import { useNavigate } from 'react-router-dom';
import { getCookiesData } from '../../../utils/cookiesService';

const AllCoursesDetails = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch category list on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log("data", data);
        // Map to titles
        const titles = data.map(cat => cat.title);
        // Ensure "All" is present at the front
        const uniqueTitles = Array.from(new Set([...titles]));
        setCategories(uniqueTitles);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch courses when activeTab changes
  useEffect(() => {
    const fetchCourses = async () => {
      const cookiesData = getCookiesData();
      console.log("cookiesData", cookiesData, "activeTab", activeTab);
      setLoading(true);
      try {
        let data = [];
        if (cookiesData && cookiesData.userId) {
          // if (activeTab === 'All') {
          //   const resp = await getAllUserCourses(cookiesData.userId);
          //   data = resp.data;
          // } else {
          const resp = await getAllUserCourseByCategory(cookiesData.userId, activeTab);
          console.log("resp", resp);
          data = resp.data;
          // }
        } else {
          // if (activeTab === 'All') {
          //   const resp = await getAllCourses();
          //   data = resp.data;
          // } else {
          const resp = await getCourseByCategory(activeTab);
          data = resp.data;
          // }
        }

        const transformed = data.map(course => ({
          id: course._id,
          title: course.courseDisplayName || 'Untitled Course',
          minititle: course.courseName || '',
          desc: course.description || 'No description available',
          duration: course.duration || 'Not specified',
          success: course.successRate || 'N/A',
          price: course.price ? `₹${course.price}/-` : 'Price not available',
          rating: course.rating || 0,
          category: course.category || 'All',
          image: course.image || lawimg
        }));
        setCourses(transformed);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [activeTab]);

  const filteredCourses = courses.filter(course => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (course.title && course.title.toLowerCase().includes(term)) ||
      (course.desc && course.desc.toLowerCase().includes(term))
    );
  });

  const handleViewDetails = id => navigate(`/coursedetails/${id}`);

  if (loading) return <div>Loading courses...</div>;

  return (
    <Container>
      <Title>
        Our <span>Courses</span>
      </Title>

      <FilterBar>
        {categories.map(cat => (
          <FilterButton
            key={cat}
            active={activeTab === cat}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </FilterButton>
        ))}
      </FilterBar>

      <SearchWrapper>
        <SearchIcon><CiSearch size={24} /></SearchIcon>
        <SearchInput
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SliderIcon><BiSliderAlt size={24} /></SliderIcon>
      </SearchWrapper>

      <CardGrid>
        {filteredCourses.map(course => (
          <CourseCard key={course.id}>
            <ImageWrapper>
              <img src={course.image} alt={course.title} />
            </ImageWrapper>
            <CourseContent>
              <CourseMain>
                <RatingWrapper>
                  {course.rating} <FaStar style={{ marginLeft: '5px' }} />
                </RatingWrapper>
                <CourseHead>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseMinititle>{course.minititle}</CourseMinititle>
                </CourseHead>
                <CourseDesc>{course.desc}</CourseDesc>
              </CourseMain>
              <Details>
                <DetailItem><FcCalendar /> Duration: {course.duration}</DetailItem>
                <DetailItem>🏆 Success Rate: {course.success}</DetailItem>
              </Details>
            </CourseContent>

            <PriceActions>
              <Price>{course.price}</Price>
              <ViewButton onClick={() => handleViewDetails(course.id)}>
                View details
              </ViewButton>
            </PriceActions>
          </CourseCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default AllCoursesDetails;
