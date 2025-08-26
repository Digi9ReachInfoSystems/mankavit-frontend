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
  RatingWrapper,
  EnrolledTag,
  Ribbon,
  VerticalTag,
  OldPrice,
  NewPrice,
  DiscountBadge
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
import LawAcademy from '../LawAcademy/LawAcademy';
import EnrollCourse from '../EnrollCourse/EnrollCourse';
import Aspirants from '../../AboutUsComponents/Aspirants/Aspirants';
import Footer from '../../../pages/LandingPage/Footer/Footer';

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

  
const formatINR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
    : n;

  

  // Fetch courses when activeTab changes
  useEffect(() => {
    const fetchCourses = async () => {
      const cookiesData = getCookiesData();
      console.log("cookiesData", cookiesData, "activeTab", activeTab);
      setLoading(true);
      try {
        console.log("Fetching courses for user:", cookiesData?.userId || 'Guest', "Category:", activeTab);
        // Fetch courses based on user and active tab
        let data = [];
        if (cookiesData && cookiesData.userId) {
          if (activeTab === 'All') {
            const resp = await getAllUserCourses(cookiesData.userId);
            // console.log("resp", resp);
            data = resp.data;
          } else {
            const resp = await getAllUserCourseByCategory(cookiesData.userId, activeTab);
            console.log("resp", resp);
            data = resp.data;
          }
        } else {
          if (activeTab === 'All') {
            const resp = await getAllCourses();
            data = resp.data;
          } else {
            const resp = await getCourseByCategory(activeTab);
            data = resp.data;
          }
        }
        console.log("data", data);
const transformed = data.map(course => {
  const mrp = Number(course.price ?? 0);
  const sale =
    course.discountPrice != null
      ? Number(course.discountPrice)
      : course.offerPrice != null
        ? Number(course.offerPrice)
        : mrp;

  const discountPct =
    mrp > 0 && sale >= 0 && sale < mrp
      ? Math.round(((mrp - sale) / mrp) * 100)
      : 0;

  return {
    id: course._id,
    title: course.courseDisplayName || 'Untitled Course',
    minititle: course.courseName || '',
    desc: course.description || 'No description available',
    duration: course.duration || 'Not specified',
    success: course.successRate || 'N/A',
    rating: course.rating || 0,
    category: course.category || 'All',
    image: course.image || lawimg,
    isEnrolled: course.isEnrolled || false,

    // pricing fields used below
    mrp,
    sale,
    discountPct,
    isFree: sale === 0
  };
});

        console.log("transformed", transformed);
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

  const handleViewDetails = (id, isEnrolled) => {
    console.log("id", id, "isEnrolled", isEnrolled);
    navigate(`/coursedetails/${id}`, { state: { isEnrolled } })
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <>
    <Container>
      <Title>
        Our <span>Courses</span>
      </Title>

      <FilterBar>
        <FilterButton
          key={"All"}
          active={activeTab === 'All'}
          onClick={() => setActiveTab("All")}
        >
          All
        </FilterButton>
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
        {filteredCourses.map(course =>{
          console.log("course skjdb", course);
         return(
          <CourseCard key={course.id}>
            {course.isEnrolled && <EnrolledTag>Enrolled</EnrolledTag>}
            {/* {course.isEnrolled &&   <Ribbon className="enrolled">✓ Enrolled</Ribbon>} */}
            {/* {course.isEnrolled && <VerticalTag>✓ Enrolled</VerticalTag>} */}
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
                <CourseDesc dangerouslySetInnerHTML={{ __html: course.desc.slice(0, 100) + "..."  }} />
              </CourseMain>
              {/* <Details>
                <DetailItem><FcCalendar /> Duration: {course.duration}</DetailItem>
                <DetailItem>🏆 Success Rate: {course.success}</DetailItem>
              </Details> */}
            </CourseContent>
       {course.isEnrolled ? (
  <PriceActions>
    <Price style={{ width: "200%" }} onClick={() => { navigate("/user"); }}>
      Continue Learning
    </Price>
  </PriceActions>
) : (
  <PriceActions>
    <Price onClick={() => handleViewDetails(course.id, course.isEnrolled)}>
      {course.isFree ? (
        <NewPrice>Free</NewPrice>
      ) : course.discountPct > 0 ? (
        <>
          <OldPrice>{formatINR(course.mrp)}</OldPrice>
          <NewPrice>{formatINR(course.sale)}</NewPrice>
          {/* <DiscountBadge>{course.discountPct}% OFF</DiscountBadge> */}
        </>
      ) : (
        <NewPrice>{formatINR(course.mrp)}</NewPrice>
      )}
    </Price>

    <ViewButton onClick={() => handleViewDetails(course.id, course.isEnrolled)}>
      View details
    </ViewButton>
  </PriceActions>
)}



          </CourseCard>
        )
        })}
      </CardGrid>
    </Container>
     
    </>
  );
};

export default AllCoursesDetails;
