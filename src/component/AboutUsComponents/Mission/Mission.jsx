import React, { useEffect, useRef, useState } from "react";
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
  ScrollButtons,
  ScrollButton,
  LoadingSpinner
} from "./Mission.styles";
import { getMissions } from "../../../api/missionApi";

const Mission = () => {
  const [missionData, setMissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await getMissions();
        setMissionData(data || []);
      } catch (err) {
        console.error("Error fetching missions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  // keep buttons enabled/disabled correctly
  const checkScrollEdges = () => {
    const el = containerRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 0;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setAtStart(start);
    setAtEnd(end);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScrollEdges();
    el.addEventListener("scroll", checkScrollEdges, { passive: true });
    return () => el.removeEventListener("scroll", checkScrollEdges);
  }, [containerRef.current]);

  const handleScroll = (direction) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <MissionSection>
        <LoadingSpinner />
      </MissionSection>
    );
  }

  return (
    <MissionSection>
      <Title>Our Mission</Title>
      <Underline />

      <CardandDescription>
        <CardsContainer id="mission-cards-container" ref={containerRef}>
          {missionData.map((item, index) => (
            <Card key={index}>
              <CardImage src={item.image} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription dangerouslySetInnerHTML={{ __html: item.description }} />
            </Card>
          ))}
        </CardsContainer>

        <ScrollButtons>
          <ScrollButton
            onClick={() => handleScroll("left")}
            disabled={atStart}
            aria-label="Scroll left"
          >
            &#8249;
          </ScrollButton>
          <ScrollButton
            onClick={() => handleScroll("right")}
            disabled={atEnd}
            aria-label="Scroll right"
          >
            &#8250;
          </ScrollButton>
        </ScrollButtons>

        {/* <DescriptionText>
          At Mankavit, we are more than just an academy – we are a community of
          learners committed to success. Join us and take the first step toward
          your legal career.
        </DescriptionText> */}
      </CardandDescription>
    </MissionSection>
  );
};

export default Mission;
