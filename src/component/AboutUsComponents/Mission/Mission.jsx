// components/Mission.jsx
import React, { useEffect } from "react";
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


import { getMissions } from "../../../api/missionApi";

const Mission = () => {
  const [missionData, setMissionData] = React.useState([]);

  useEffect(() =>{
    const fetchMissions = async () => {
      try {
        const data = await getMissions();
        setMissionData(data);
      } catch (err) {
        console.error("Error fetching missions:", err);
      }
    }
    fetchMissions();
  })
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
              {/* <CardDescription>{item.description}</CardDescription> */}
              <CardDescription dangerouslySetInnerHTML={{ __html: item.description }} />
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
