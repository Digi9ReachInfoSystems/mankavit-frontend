import React, { useEffect, useState } from 'react';
import {
  Section, Title, Highlight, CardsWrapper, CourseCard, CardHeader, CardBody,
  CourseTitle, Description, PriceButton, ViewButton, ViewMoreWrapper,
  ViewMoreButton, Buttons, Image, Underline
} from './WantToLearn.styles';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../../api/courseApi';

const WantToLearn = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setCourses(list);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Turn HTML to plain text safely, then truncate
  const toPlainText = (html = '', max = 80) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    const text = (el.textContent || el.innerText || '').trim();
    return text.length > max ? text.slice(0, max) + '…' : text;
  };

  return (
    <Section>
      <Title>
        Our <Highlight>Ongoing</Highlight> Courses

      </Title>
      <Underline />
      <CardsWrapper>
        {(courses || []).slice(0, 8).map((course) => {
          const title =
            course.courseDisplayName ||

            'Course';

          const rating = course.rating ?? course.course_rating ?? 0;
          const description = course.shortDescription || '';
          const descText = toPlainText(
            course.shortDescription || ''
          );

          const price = Number(course.price) || 0;
          const showDiscount = !!course.discountActive && course.discountPrice != null;
          const finalPrice = showDiscount ? course.discountPrice : price;

          return (
            <CourseCard key={course._id || course.id}>
              <CardHeader>
                <Image
                  src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${course.image}`}
                  alt={title}
                />
              </CardHeader>

              <CardBody>
                <span>{rating}⭐</span>
                <CourseTitle>{title}</CourseTitle>
                <Description
                  dangerouslySetInnerHTML={{ __html: descText }}
                />
                {/* <Description
               dangerouslySetInnerHTML={{ __html: (course.description || '').slice(0, 100) + '...' }}
               
                /> */}
              </CardBody>

              <Buttons>
                <PriceButton title={showDiscount ? `Original ₹${price}` : undefined}>
                  ₹{finalPrice}
                  {showDiscount && (
                    <span style={{
                      marginLeft: 8,
                      textDecoration: 'line-through',
                      opacity: 0.7,
                      fontSize: 12
                    }}>
                      ₹{price}
                    </span>
                  )}
                </PriceButton>

                <ViewButton onClick={() => navigate(`/coursedetails/${course._id}`)}>
                  View Course
                </ViewButton>
              </Buttons>
            </CourseCard>
          );
        })}
      </CardsWrapper>

      {(courses?.length || 0) > 8 && (
        <ViewMoreWrapper>
          <ViewMoreButton onClick={() => {
            navigate('/ourcoursedetails');
            window.scrollTo(0, 0);
          }}>
            View More
          </ViewMoreButton>
        </ViewMoreWrapper>
      )}
    </Section>
  );
};

export default WantToLearn;
