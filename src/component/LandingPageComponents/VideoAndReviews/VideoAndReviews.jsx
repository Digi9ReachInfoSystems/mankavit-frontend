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
} from "./VideoAndReviews.styles";
import { getAlltestimonials } from "../../../api/testimonialApi";
import placeholder from "../../../assets/aspi1.png";   // fallback avatar

const VideoAndReviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const raw = await getAlltestimonials();   
        const data = (Array.isArray(raw) ? raw : []).map((t) => ({
          id: t._id?.$oid || t._id || t.id,
          name: t.name,
          role: t.rank,                // ← the API field is “rank”
          quote: t.description,        // ← the API field is “description”
          image: t.testimonial_image,
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

  /* ───────────────── render cards ───────────────── */
  return (
    <Container>
      <Title>
        What Are <Highlight>They Saying</Highlight>
      </Title>

      <CardWrapper>
        {testimonials.map((t) => (
          <Card key={t.id}>
            <Avatar src={t.image || placeholder} alt={t.name} />
            <Quote>&quot;{t.quote}&quot;</Quote>
            <Name>{t.name}</Name>
            <Role>{t.role}</Role>
          </Card>
        ))}
      </CardWrapper>
    </Container>
  );
};

export default VideoAndReviews;
// VideoAndReviews