import React from 'react';
import { Container, Title, Highlight, Card, Avatar, Quote, Name, Role, CardWrapper } from './Aspirants.styles';
// import './Testimonials.css';
import aspi1 from '../../../assets/aspi1.png';
import aspi2 from '../../../assets/aspi2.png';
import aspi3 from '../../../assets/aspi3.png';

const testimonials = [
  {
    name: "Aditi Sharma",
    role: "CLAT 2024 Aspirant",
    quote: "The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning sessions were a game-changer!",
    image: aspi1,
  },
  {
    name: "Aditi Sharma",
    role: "CLAT 2024 Aspirant",
    quote: "The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning sessions were a game-changer!",
    image: aspi2,
  },
  {
    name: "Aditi Sharma",
    role: "CLAT 2024 Aspirant",
    quote: "The structured video lessons and mock tests helped me improve my scores drastically. The legal reasoning sessions were a game-changer!",
    image: aspi3,
  }
];

const Aspirants = () => {
  return (
    <Container>
      <Title>
        What Are <Highlight>They Saying</Highlight>
      </Title>
      <CardWrapper>
        {testimonials.map((item, index) => (
          <Card key={index}>
            <Avatar src={item.image} alt={item.name} />
            <Quote>"{item.quote}"</Quote>
            <Name>{item.name}</Name>
            <Role>{item.role}</Role>
          </Card>
        ))}
      </CardWrapper>
    </Container>
  );
};

export default Aspirants;
