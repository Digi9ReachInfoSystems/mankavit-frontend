import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Highlight,
  Line,
  Features,
  FeatureCard,
  FeatureImage,
  FeatureTitle,
  FeatureText,
  Description,
  EnrollButton,
  ScrollIndicator,
  LoadingSpinner
} from "./EnrollCourse.styles";
import { getAllWhy } from "../../../api/whyApi";
import { getCookiesData } from "../../../utils/cookiesService";
import { useNavigate } from "react-router-dom";

const EnrollCourse = () => {
  const [whys, setWhys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWhy();
        setWhys(response);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEnrollNow = async () => {
    const cookieData = await getCookiesData();
    navigate("/login");
  };

  const handleScroll = (direction) => {
    const featuresContainer = document.getElementById('features-container');
    const scrollAmount = 300;
    
    if (direction === 'left') {
      featuresContainer.scrollLeft -= scrollAmount;
    } else {
      featuresContainer.scrollLeft += scrollAmount;
    }
    
    setScrollPosition(featuresContainer.scrollLeft);
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Why Choose <Highlight>Our Courses?</Highlight>
      </Title>
      <Line />
      
      <Features id="features-container">
        {whys.map((item, index) => (
          <FeatureCard key={index}>
            <FeatureImage src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${item.image}`} alt={item.title} />
            <FeatureTitle>{item.title}</FeatureTitle>
            <FeatureText>{item.text}</FeatureText>
          </FeatureCard>
        ))}
      </Features>
      
      <ScrollIndicator>
        <button 
          onClick={() => handleScroll('left')} 
          disabled={scrollPosition === 0}
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <button 
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </ScrollIndicator>
      
      {/* <Description>
        Take the first step towards your legal career. Choose the course that best suits your goals and enroll now. Our team is here to assist you every step of the way!
      </Description>
      
      <EnrollButton onClick={handleEnrollNow}>
        Enroll Now
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </EnrollButton> */}
    </Container>
  );
};

export default EnrollCourse;