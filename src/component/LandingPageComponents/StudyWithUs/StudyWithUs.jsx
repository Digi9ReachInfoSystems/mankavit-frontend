i

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
// ];import React, { useEffect, useState } from "react";
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
import { getAllWhy } from "../../../api/whyApi";

const StudyWithUs = () => {
  const [whys, setWhys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllWhy();
        
        // Ensure response is an array before setting state
        if (Array.isArray(response)) {
          setWhys(response);
        } else if (response.data && Array.isArray(response.data)) {
          // Handle case where data is nested in response object
          setWhys(response.data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error fetching why data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Container><Content>Loading...</Content></Container>;
  if (error) return <Container><Content>Error: {error}</Content></Container>;
  if (!whys || whys.length === 0) return <Container><Content>No data available</Content></Container>;

  return (
    <Container>
      <Content>
        <Title>
          Why Study <Highlight>With Us</Highlight>
        </Title>
        <Divider />
        <CardsWrapper>
          {whys?.map((card, index) => (
            <Card key={index}>
              <CardImage src={card.image} alt={card.title} />
              <CardTitle>{card.title}</CardTitle>
              <CardDescription dangerouslySetInnerHTML={{ __html: card.description }} />
            </Card>
          ))}
        </CardsWrapper>
      </Content>
    </Container>
  );
};

export default StudyWithUs;