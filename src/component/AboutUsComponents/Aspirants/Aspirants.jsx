// Aspirants.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Highlight,
  Card,
  Avatar,
  Quote,
  Name,
  Role,
  CardWrapper,
  Media,
  MediaContainer
} from "./Aspirants.styles";
import { getAlltestimonials } from "../../../api/testimonialApi";
import placeholder from "../../../assets/aspi1.png";   // fallback avatar

const Aspirants = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const raw = await getAlltestimonials();
        const data = (Array.isArray(raw) ? raw : []).map((t) => ({
          id: t._id || t.id,
          name: t.name,
          role: t.rank,
          quote: t.description,
          image: t.testimonial_image,
          video: t.testimonial_video,
        }));
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <Container>
        <p>Loading testimonials…</p>
      </Container>
    );
  }

  if (testimonials.length === 0) {
    return (
      <Container>
        <Title>
          What Are <Highlight>They Saying</Highlight>
        </Title>
        <p>No testimonials found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        What Are <Highlight>They Saying</Highlight>
      </Title>

      <CardWrapper>
        {testimonials.map((t) => (
          <Card key={t.id}>
            <MediaContainer>
              {t.image ? (
                <Avatar src={t.image} alt={t.name} />
              ) : t.video ? (
                <Media controls>
                  <source src={t.video} type="video/mp4" />
                  Your browser doesn't support embedded videos.
                </Media>
              ) : (
                <Avatar src={placeholder} alt="placeholder" />
              )}
            </MediaContainer>

            <Quote>&quot;{t.quote}&quot;</Quote>
            <Name>{t.name}</Name>
            <Role>{t.role}</Role>
          </Card>
        ))}
      </CardWrapper>
    </Container>
  );
};

export default Aspirants;