// Aspirants.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Title,
  Highlight,
  Slide,
  Card,
  TitleDiv,
  LeftCol,
  RightCol,
  MediaBlob,
  Avatar,
  Media,
  Quote,
  Name,
  Role,
  ControlsBar,
  ArrowBtn,
  DotBar,
  Dot,
  ScrollContainer,      // 👈 NEW unified scroller (desktop + mobile)
  ViewMoreButton,
  VideoOverlay,
  VideoModal,
  CloseBtn,
  VideoPlayer,
  Underline,
  Content
} from "./Aspirants.styles";
import { getAlltestimonials } from "../../../api/testimonialApi";
import placeholder from "../../../assets/aspi1.png";

// --- CircleMedia: click-to-open modal for video ---
const CircleMedia = ({ image, video, name, onOpenVideo }) => {
  if (image) {
    return (
      <MediaBlob>
        <Avatar
          src={image}
          alt={name || "Aspirant"}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />
      </MediaBlob>
    );
  }

  if (video) {
    return (
      <MediaBlob onClick={() => onOpenVideo?.(video)} role="button" aria-label={`Play ${name || "video"}`}>
        {/* Light preview so users know it’s a video */}
        <Media as="video" muted playsInline preload="metadata" controls={false}>
          <source src={video} type="video/mp4" />
        </Media>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(transparent, rgba(0,0,0,0.35))",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 26, background: "rgba(0,0,0,0.6)", color: "#fff", padding: "8px 12px", borderRadius: 999 }}>
            ▶
          </span>
        </div>
      </MediaBlob>
    );
  }

  return (
    <MediaBlob>
      <Avatar src={placeholder} alt="placeholder" />
    </MediaBlob>
  );
};

const Aspirants = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [expandedQuotes, setExpandedQuotes] = useState({});
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const scrollRef = useRef(null);

  // Fetch + normalize + sort newest first
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const raw = await getAlltestimonials();
        const arr = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
        const data = arr
          .map((t, i) => ({
            id: t._id || t.id || String(i),
            name: t.name || "Anonymous",
            role: t.rank || t.role || "",
            quote: t.description || "",
            createdAt: t.createdAt ? new Date(t.createdAt) : new Date(0),
            image: t.testimonial_image
              ? `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${t.testimonial_image}`
              : "",
            video: t.testimonial_video
              ? `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${t.testimonial_video}`
              : "",
          }))
          .sort((a, b) => (b.createdAt - a.createdAt));   // 👈 NEWEST FIRST
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const total = testimonials.length;

  // dots/idx sync by scroll position
  const syncIndexFromScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const slideW = el.clientWidth;                 // each slide is full viewport width
    const newIdx = Math.round(el.scrollLeft / slideW);
    if (newIdx !== idx) setIdx(newIdx);
  };

  const onScroll = () => syncIndexFromScroll();

  // Arrow handlers: scroll by one viewport width each click
  const scrollBySlides = (dir = 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slideW = el.clientWidth;
    el.scrollBy({ left: dir * slideW, behavior: "smooth" });
  };
  const goPrev = () => scrollBySlides(-1);
  const goNext = () => scrollBySlides(1);

  const goTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    const slideW = el.clientWidth;
    el.scrollTo({ left: i * slideW, behavior: "smooth" });
  };

  const toggleQuoteExpansion = (id) => {
    setExpandedQuotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (html, maxLength = 100) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    if (text.length <= maxLength) return html;
    return text.substring(0, maxLength) + "...";
  };

  // Video modal
  const openVideo = (src) => { setVideoSrc(src); setVideoOpen(true); };
  const closeVideo = () => { setVideoOpen(false); setVideoSrc(""); };

  if (loading) {
    return (
      <Container>
        <Title>
          What Are <Highlight>They Saying</Highlight>
        </Title>
        <p style={{ marginTop: 8 }}>Loading testimonials…</p>
      </Container>
    );
  }

  if (!total) {
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
    <>
      <Container>
  <Content>
    <Title>
      What Our <Highlight>Aspirants</Highlight> Say
    </Title>
    <Underline />
  </Content>
</Container>

      <Container>
        {/* One scroll container for BOTH desktop & mobile */}
        <ScrollContainer ref={scrollRef} onScroll={onScroll}>
          {testimonials.map((t) => (
            <Slide key={t.id}>
              <Card>
                <LeftCol>
                  <CircleMedia
                    image={t.image}
                    video={t.video}
                    name={t.name}
                    onOpenVideo={openVideo}
                  />
                </LeftCol>

                <RightCol>
                    <Name>{t.name || "Aspirant"}</Name>
                  {t.role && <Role>{t.role}</Role>}
                  {/* Desktop: show full quote; Mobile: collapsed with View More */}
                  <Quote
                    dangerouslySetInnerHTML={{
                      __html:
                        (window.innerWidth <= 768 && !expandedQuotes[t.id])
                          ? truncateText(t.quote || "Great learning experience.")
                          : (t.quote || "Great learning experience."),
                    }}
                  />
                  {window.innerWidth <= 768 && (t.quote || "").length > 100 && (
                    <ViewMoreButton onClick={() => toggleQuoteExpansion(t.id)}>
                      {expandedQuotes[t.id] ? "View Less" : "View More"}
                    </ViewMoreButton>
                  )}
                
                </RightCol>
              </Card>
            </Slide>
          ))}
        </ScrollContainer>

        {/* Controls (Desktop-visible; also work on mobile if you keep them) */}
        <ControlsBar>
          <ArrowBtn aria-label="Previous" onClick={goPrev}>
            ←
          </ArrowBtn>

          <DotBar>
            {testimonials.map((_, i) => (
              <Dot
                key={i}
                $active={i === idx}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </DotBar>

          <ArrowBtn aria-label="Next" onClick={goNext}>
            →
          </ArrowBtn>
        </ControlsBar>
       
      </Container>

      {/* Video Modal */}
      {videoOpen && (
        <VideoOverlay onClick={closeVideo}>
          <VideoModal onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={closeVideo} aria-label="Close video">
              &times;
            </CloseBtn>
            <VideoPlayer controls autoPlay playsInline>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoPlayer>
          </VideoModal>
        </VideoOverlay>
      )}
    </>
  );
};

export default Aspirants;
