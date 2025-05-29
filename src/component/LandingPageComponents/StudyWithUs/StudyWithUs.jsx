import React, { useEffect } from "react";
import {
  Container,
  Title,
  Highlight,
  Divider,
  CardsWrapper,
  Card,
  CardImage,
  CardTitle,
  CardDescription,
  Content
} from "./StudyWithUs.styles";
import Study1 from "../../../assets/Study1.png";
import Study2 from "../../../assets/Study2.png";
import Study3 from "../../../assets/Study3.png";


// const cardData = [
//   {
//     title: "Expert Faculty & Proven Success",
//     description:
//       "Learn from experienced mentors who have helped thousands of students achieve their goals.",
//     image: Study1 , // Update path as per your assets folder
//   },
//   {
//     title: "Comprehensive Study Resources",
//     description:
//       "Access up-to-date materials, mock tests, and previous year papers for effective preparation.",
//     image: Study2 ,
//   },
//   {
//     title: "Personalized Support",
//     description:
//       "Receive tailored study plans and one-on-one attention to maximize your potential.",
//     image: Study3,
//   },
// ];
import { getAllWhy } from "../../../api/whyApi";
const StudyWithUs = () => {
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
  const cardData = whys;
  return (
    <Container>
        <Content>
      <Title>
        Why Study <Highlight>With Us</Highlight>
      </Title>
      <Divider />
      <CardsWrapper>
        {whys.slice(0,3).map((card, index) => (
          <Card key={index}>
            <CardImage src={card.image} alt={card.title} />
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </CardsWrapper>
      </Content>
    </Container>
  );
};

export default StudyWithUs;
