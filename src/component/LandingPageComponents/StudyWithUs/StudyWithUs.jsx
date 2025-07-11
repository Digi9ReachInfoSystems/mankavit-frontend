import {
  Container,
  Title,
  Highlight,
  Divider,
  // CardsWrapper,
  Card,
  CardImage,
  CardTitle,
  CardDescription,
  Content,
  CarouselContainer,
  CarouselTrack,
  CarouselButton,
  ButtonWrapper
} from "./StudyWithUs.styles";
import { getAllWhy } from "../../../api/whyApi";
import { useEffect, useState, useRef } from "react";

const StudyWithUs = () => {
  const [whys, setWhys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllWhy();
        
        if (Array.isArray(response)) {
          setWhys(response);
        } else if (response.data && Array.isArray(response.data)) {
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

  const scrollToCard = (index) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.children[0]?.offsetWidth || 0;
      const gap = parseInt(window.getComputedStyle(trackRef.current).gap) || 0;
      const scrollPosition = index * (cardWidth + gap);
      
      trackRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % whys.length;
    scrollToCard(nextIndex);
  }; 

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + whys.length) % whys.length;
    scrollToCard(prevIndex);
  };

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
        <CarouselContainer>
          <CarouselTrack ref={trackRef}>
            {whys.map((card, index) => (
              <Card key={index}>
                <CardImage src={card.image} alt={card.title} />
                <CardTitle>{card.title}</CardTitle>
                <CardDescription dangerouslySetInnerHTML={{ __html: card.description }} />
              </Card>
            ))}
          </CarouselTrack>
          <ButtonWrapper>
            <CarouselButton onClick={handlePrev} aria-label="Previous card">
              {/* &lt; */}
            </CarouselButton>
            <CarouselButton onClick={handleNext} aria-label="Next card">
              {/* &gt; */}
            </CarouselButton>
          </ButtonWrapper>
        </CarouselContainer>
      </Content>
    </Container>
  );
};

export default StudyWithUs;