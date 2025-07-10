import React, { useEffect } from "react";
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
  EnrollButton
} from "./EnrollCourse.styles";
import image1 from "../../../assets/Study1.png";
import image2 from "../../../assets/Study2.png";
import image3 from "../../../assets/Study3.png";


import { getAllWhy } from "../../../api/whyApi";
import { getCookiesData } from "../../../utils/cookiesService";
import { useNavigate } from "react-router-dom";
const EnrollCourse = () => {
  const [ whys, setWhys ] = React.useState([]);
  const naviagate= useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWhy();
        setWhys(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleEnrollNow = async() => {
    const cookieData= await getCookiesData()
    
     
      naviagate("/login");
   
  }
 
  return (
    <Container>
      <Title>
        Why Choose <Highlight>Our Courses?</Highlight>
      </Title>
      <Line />
      <Features>
        {whys.map((item, index) => (
          <FeatureCard key={index}>
            <FeatureImage src={item.image} alt={item.title} />
            <FeatureTitle>{item.title}</FeatureTitle>
            <FeatureText>{item.text}</FeatureText>
          </FeatureCard>
        ))}
      </Features>
      <Description>
        Take the first step towards your legal career. Choose the course that best suits your goals and enroll now. Our team is here to assist you every step of the way!
      </Description>
      <EnrollButton onClick={handleEnrollNow}>Enroll Now</EnrollButton>
    </Container>
  );
};

export default EnrollCourse;
