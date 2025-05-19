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

// const features = [
//   {
//     image: image1, // Replace with your actual image path
//     title: "Expert Faculty & Proven Success",
//     text: "Learn from experienced mentors who have helped thousands of students achieve their goals.",
//   },
//   {
//     image: image2,
//     title: "Comprehensive Study Resources",
//     text: "Access up-to-date materials, mock tests, and previous year papers for effective preparation.",
//   },
//   {
//     image: image3,
//     title: "Personalized Support",
//     text: "Receive tailored study plans and one-on-one attention to maximize your potential.",
//   },
// ];
import { getAllWhy } from "../../../api/whyApi";
const EnrollCourse = () => {
  const [ whys, setWhys ] = React.useState([]);
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
      <EnrollButton>Enroll Now</EnrollButton>
    </Container>
  );
};

export default EnrollCourse;
