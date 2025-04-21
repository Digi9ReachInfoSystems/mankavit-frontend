// components/Mission.jsx
import React from "react";
import {
  MissionSection,
  Title,
  Underline,
  CardandDescription,
  CardsContainer,
  Card,
  CardImage,
  CardTitle,
  CardDescription,
  DescriptionText,
  CTAButton,
} from "./Mission.styles";
import empower from "../../../assets/empowerment.png";
import excellence from "../../../assets/excellence.png";
import success from "../../../assets/success.png";

const missionData = [
  {
    title: "Empowerment",
    description: "Equipping students with the tools and confidence to excel.",
    image: empower,
  },
  {
    title: "Excellence",
    description:
      "Delivering high-quality coaching and resources for top results.",
    image: excellence,
  },
  {
    title: "Success",
    description:
      "Helping students achieve their goals and secure admissions to prestigious law schools.",
    image: success,
  },
];

const Mission = () => {
  return (
    <MissionSection>
      <Title>Our Mission</Title>
      <Underline />
      <CardandDescription>
        <CardsContainer>
          {missionData.map((item, index) => (
            <Card key={index}>
              <CardImage src={item.image} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </CardsContainer>
        <DescriptionText>
          At Mankavit, we are more than just an academy - we are a community of
          learners committed to success. Join us and take the first step toward
          your legal career.
        </DescriptionText>
      </CardandDescription>
      <CTAButton>Contact Us</CTAButton>
    </MissionSection>
  );
};

export default Mission;
