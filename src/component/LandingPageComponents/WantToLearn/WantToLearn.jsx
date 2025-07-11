import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import lawBanner from '../../../assets/Study1.png'; // your header banner image


import { getAllCourses } from '../../../api/courseApi';
import { Link } from 'react-router-dom';

const WantToLearn = () => {
  const [courses, setCourses] = React.useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); 
    }
  , []);
  
  return (
    <Section>
      <Title>
        What <Highlight>Do You Want</Highlight> To Learn?
      </Title>

      <CardsWrapper>
        {courses?.map((course, index) => (
          <CourseCard key={index}>
            {/* <CardHeader>
              <Image src={lawBanner} alt="Law Banner" />
            </CardHeader> */}
            <CardHeader>
              <Image src={course.image} alt="Law Banner" />
            </CardHeader>

            <CardBody>
              <span>{course.rating}⭐</span>
              <CourseTitle>
                {course.title} <span style={{ fontSize: '14px' }}>Preparation</span>
              </CourseTitle>
              {/* <Description >{course.description}</Description> */}
              {/* <Description dangerouslySetInnerHTML={{ __html: course.description }} /> */}

              {/* i wnat to limit for 40 characters  */}
              {/* <Description>{course.description.substring(0, 40)}...</Description> */}
              <Description dangerouslySetInnerHTML={{ __html: course.description.substring(0, 40) + '...' }} />
              <InfoList>
                <InfoItem>📆 Duration: {course.duration}</InfoItem>
                <InfoItem>✅ Success Rate: {course.successRate}</InfoItem>
              </InfoList>
            </CardBody>

            <Buttons>
              <PriceButton>₹{course.price}</PriceButton>
         
              <ViewButton 
              onClick={() => navigate(`/coursedetails/${course._id}`)}
              >View Course</ViewButton>
 
            </Buttons>
          </CourseCard>
        ))}
      </CardsWrapper>

      <ViewMoreWrapper>
         {/* <Link to={`/ourcoursedetails`}> */}
 <ViewMoreButton 
 onClick={() => navigate('/ourcoursedetails')}
 >View More</ViewMoreButton>     
     {/* </Link> */}
      </ViewMoreWrapper>
    </Section>
  );
};

export default WantToLearn;
