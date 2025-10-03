import React, { useEffect, useState } from 'react';
import {
  Container, Title, FilterBar, FilterButton, SearchWrapper, SearchIcon,
  SearchInput, SliderIcon, CardGrid, CourseCard, ImageWrapper, CourseContent,
  CourseMain, CourseHead, CourseTitle, CourseMinititle, CourseDesc, PriceActions,
  Price, ViewButton, RatingWrapper, EnrolledTag, OldPrice, NewPrice,Underline
} from './AllCoursesDetails.styles';
import { CiSearch } from 'react-icons/ci';
import { BiSliderAlt } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import {
  getAllCourses,
  getAllUserCourseByCategory,
  getAllUserCourses,
  getCourseByCategory
} from '../../../api/courseApi';
import { getCategories } from '../../../api/categoryApi';
import { useNavigate } from 'react-router-dom';
import { getCookiesData } from '../../../utils/cookiesService';

const AllCoursesDetails = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(true);

  // toggle full list
  const [showAll, setShowAll] = useState(false);

  // responsive: treat <=768px as mobile
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 768px)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);

    // modern + Safari fallback
    mq.addEventListener?.('change', onChange);
    mq.addListener?.(onChange);

    return () => {
      mq.removeEventListener?.('change', onChange);
      mq.removeListener?.(onChange);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const titles = data.map((cat) => cat.title);
        const uniqueTitles = Array.from(new Set([...titles]));
        setCategories(uniqueTitles);
      } catch {/* ignore */}
    };
    fetchCategories();
  }, []);

  const formatINR = (n) =>
    typeof n === 'number'
      ? n.toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        })
      : n;

  // reset collapsed view when tab/search changes
  useEffect(() => {
    setShowAll(false);
  }, [activeTab, searchTerm]);

  useEffect(() => {
    const fetchCourses = async () => {
      const cookiesData = getCookiesData();
      // setLoading(true);
      try {
        let data = [];
        if (cookiesData && cookiesData.userId) {
          if (activeTab === 'All') {
            const resp = await getAllUserCourses(cookiesData.userId);
            data = resp.data;
          } else {
            const resp = await getAllUserCourseByCategory(
              cookiesData.userId,
              activeTab
            );
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

        const transformed = data.map((course) => {
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
            shortDescription: course.shortDescription || '',
            desc: course.description || 'No description available',
            duration: course.duration || 'Not specified',
            success: course.successRate || 'N/A',
            rating: course.rating || 0,
            category: course.category || 'All',
            image: course.image,
            isEnrolled: !!course.isEnrolled,
            mrp,
            sale,
            discountPct,
            isFree: sale === 0
          };
        });

        setCourses(transformed);
      } catch {
        // ignore
      } finally {
        // setLoading(false);
      }
    };
    fetchCourses();
  }, [activeTab]);

  const filteredCourses = courses.filter((course) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (course.title && course.title.toLowerCase().includes(term)) ||
      (course.desc && course.desc.toLowerCase().includes(term))
    );
  });

  // initial counts: 15 on mobile, 4 on desktop
  const INITIAL_COUNT = isMobile ? 15 : 4;
  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, INITIAL_COUNT);

  const handleViewDetails = (id, isEnrolled) => {
    navigate(`/coursedetails/${id}`, { state: { isEnrolled } });
  };

  const handleToggleShowAll = (next) => {
    setShowAll(next);
    // if collapsing, scroll to the very top
    if (!next) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  // if (loading) return <div>Loading courses...</div>;

  return (
    <>
      <Container>
        <Title>
          Our <span>Courses</span>
        </Title>
  {/* <Underline /> */}
        <FilterBar>
          <FilterButton
            key={'All'}
            active={activeTab === 'All'}
            onClick={() => setActiveTab('All')}
          >
            All
          </FilterButton>
          {categories.map((cat) => (
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
          <SearchIcon>
            <CiSearch size={24} />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SliderIcon>
            <BiSliderAlt size={24} />
          </SliderIcon>
        </SearchWrapper>

        <CardGrid>
          {(isMobile && !showAll
            ? filteredCourses.slice(
                0,
                Math.min(INITIAL_COUNT, filteredCourses.length)
              )
            : visibleCourses
          ).map((course, idx) => (
            <React.Fragment key={course.id}>
              <CourseCard>
                {course.isEnrolled && <EnrolledTag>Enrolled</EnrolledTag>}

                <ImageWrapper>
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${course.image}`}
                    alt={course.title}
                  />
                </ImageWrapper>

                <CourseContent>
                  <CourseMain>
                    <RatingWrapper>
                      {course.rating} <FaStar style={{ marginLeft: '5px' }} />
                    </RatingWrapper>

                    <CourseHead>
                      <CourseTitle>{course.title}</CourseTitle>
                      <CourseMinititle
                        dangerouslySetInnerHTML={{
                          __html: course.shortDescription
                        }}
                      />
                    </CourseHead>

                    <CourseDesc
                      dangerouslySetInnerHTML={{
                        __html: (course.desc || '').slice(0, 100) + '...'
                      }}
                    />
                  </CourseMain>
                </CourseContent>

                {course.isEnrolled ? (
                  <PriceActions>
                    <Price
                      style={{ width: '200%' }}
                      // onClick={() => navigate(`/continueCourse/${course.id}`)}
                      onClick={() =>navigate('/user')}
                    >
                      Continue Learning
                    </Price>
                  </PriceActions>
                ) : (
                  <PriceActions>
                    <Price
                      onClick={() =>
                        handleViewDetails(course.id, course.isEnrolled)
                      }
                    >
                      {course.isFree ? (
                        <NewPrice>Free</NewPrice>
                      ) : course.discountPct > 0 ? (
                        <>
                          <OldPrice>{formatINR(course.mrp)}</OldPrice>
                          <NewPrice>{formatINR(course.sale)}</NewPrice>
                        </>
                      ) : (
                        <NewPrice>{formatINR(course.mrp)}</NewPrice>
                      )}
                    </Price>

                    <ViewButton
                      onClick={() =>
                        handleViewDetails(course.id, course.isEnrolled)
                      }
                    >
                      View details
                    </ViewButton>
                  </PriceActions>
                )}
              </CourseCard>

              {/* Inline "View all" button right after the 15th card on mobile */}
              {isMobile &&
                !showAll &&
                filteredCourses.length > INITIAL_COUNT &&
                idx === INITIAL_COUNT - 1 && (
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <button
                      onClick={() => handleToggleShowAll(true)}
                      style={{
                        border: '1px solid #007BFF',
                        color: '#007BFF',
                        background: '#fff',
                        borderRadius: 8,
                        padding: '10px 14px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      View all
                    </button>
                  </div>
                )}
            </React.Fragment>
          ))}
        </CardGrid>

        {/* Bottom button for desktop only */}
        {!isMobile && filteredCourses.length > INITIAL_COUNT && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '8px 0 12px'
            }}
          >
            <button
              onClick={() => handleToggleShowAll(!showAll)}
              style={{
                border: '1px solid #007BFF',
                color: '#007BFF',
                background: '#fff',
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                fontWeight: 500,
                margin: 'auto',
                marginTop: '20px'
              }}
            >
              {showAll ? 'Show less' : 'View all'}
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default AllCoursesDetails;
