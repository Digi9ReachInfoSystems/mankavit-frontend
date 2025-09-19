import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Title,
  Highlight,
  SliderShell,
  SlidesTrack,
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
  MediaOverlay,
  PlayPauseBtn,
  MobileScrollContainer,
  ViewMoreButton,
} from "./Aspirants.styles";
import { getAlltestimonials } from "../../../api/testimonialApi";
import placeholder from "../../../assets/aspi1.png"; // fallback avatar

const CircleMedia = ({ image, video, name, active }) => {
  const vidRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Pause whenever this slide is not active
  useEffect(() => {
    if (!active && vidRef.current && !vidRef.current.paused) {
      vidRef.current.pause();
      setPlaying(false);
    }
  }, [active]);

  const toggle = () => {
    if (!video) return;
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <MediaBlob>
      {image ? (
        <Avatar
          src={image}
          alt={name || "Aspirant"}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />
      ) : video ? (
        <>
          <Media ref={vidRef} playsInline preload="metadata" controls={false}>
            <source src={video} type="video/mp4" />
            Your browser doesn't support embedded videos.
          </Media>
          <MediaOverlay
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
          >
            <PlayPauseBtn>{playing ? "⏸" : "▶"}</PlayPauseBtn>
          </MediaOverlay>
        </>
      ) : (
        <Avatar src={placeholder} alt="placeholder" />
      )}
    </MediaBlob>
  );
};

const Aspirants = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [expandedQuotes, setExpandedQuotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const raw = await getAlltestimonials();
        const arr = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        const data = arr.map((t, i) => ({
          id: t._id || t.id || String(i),
          name: t.name || "Anonymous",
          role: t.rank || t.role || "",
          quote: t.description || "",
          image: t.testimonial_image || "",
          video: t.testimonial_video || "",
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

  const total = testimonials.length;

  const goPrev = () => setIdx((p) => (p - 1 + total) % total);
  const goNext = () => setIdx((p) => (p + 1) % total);
  const goTo = (i) => setIdx(i);

  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${idx * 100}%)` }),
    [idx]
  );

  const toggleQuoteExpansion = (id) => {
    setExpandedQuotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

const truncateText = (html, maxLength = 100) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  if (text.length <= maxLength) return html;
  return text.substring(0, maxLength) + "...";
};


  // Handle horizontal scroll for mobile
  const handleScroll = (e) => {
    if (!isMobile) return;

    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const slideWidth = track.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);

    if (newIndex !== idx) {
      setIdx(newIndex);
    }
  };

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
      <TitleDiv>
        <Title>
          What Our <Highlight>Aspirants</Highlight> Say
        </Title>
      </TitleDiv>

      <Container>
        {isMobile ? (
          <MobileScrollContainer ref={trackRef} onScroll={handleScroll}>
            {testimonials.map((t, i) => (
              <Slide key={t.id}>
                <Card>
                  <LeftCol>
                    <CircleMedia
                      image={`${
                        import.meta.env.VITE_APP_IMAGE_ACCESS
                      }/api/project/resource?fileKey=${t.image}`}
                      video={`${
                        import.meta.env.VITE_APP_IMAGE_ACCESS
                      }/api/project/resource?fileKey=${t.video}`}
                      name={t.name}
                      active={i === idx}
                    />
                  </LeftCol>

                  <RightCol>
                     <Name>{t.name || "Aspirant"}</Name>
                    {t.role && <Role>{t.role}</Role>}
                    <Quote
                      dangerouslySetInnerHTML={{
                        __html: expandedQuotes[t.id]
                          ? t.quote || "Great learning experience."
                          : truncateText(
                              t.quote || "Great learning experience."
                            ),
                      }}
                    />

                    {(t.quote || "").length > 100 && isMobile && (
                      <ViewMoreButton
                        onClick={() => toggleQuoteExpansion(t.id)}
                      >
                        {expandedQuotes[t.id] ? "View Less" : "View More"}
                      </ViewMoreButton>
                    )}

                   
                  </RightCol>
                </Card>
              </Slide>
            ))}
          </MobileScrollContainer>
        ) : (
          <SliderShell aria-roledescription="carousel">
            <SlidesTrack style={trackStyle}>
              {testimonials.map((t, i) => (
                <Slide
                  key={t.id}
                  role="group"
                  aria-label={`${idx + 1} of ${total}`}
                >
                  <Card>
                    <LeftCol>
                      <CircleMedia
                        image={`${
                          import.meta.env.VITE_APP_IMAGE_ACCESS
                        }/api/project/resource?fileKey=${t.image}`}
                        video={`${
                          import.meta.env.VITE_APP_IMAGE_ACCESS
                        }/api/project/resource?fileKey=${t.video}`}
                        name={t.name}
                        active={i === idx}
                      />
                    </LeftCol>

                    <RightCol>
                      {/* <Quote>{t.quote || "Great learning experience."}</Quote>
                       */}
                       <Quote dangerouslySetInnerHTML={t.quote ? { __html: t.quote } : { __html: "Great learning experience." }} />
                      <Name>{t.name || "Aspirant"}</Name>
                      {t.role && <Role>{t.role}</Role>}
                    </RightCol>
                  </Card>
                </Slide>
              ))}
            </SlidesTrack>
          </SliderShell>
        )}

        {/* Controls - Only show arrows and dots for desktop */}
        {!isMobile && (
          <ControlsBar>
            <ArrowBtn aria-label="Previous" onClick={goPrev}>
              &larr;
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
              &rarr;
            </ArrowBtn>
          </ControlsBar>
        )}
      </Container>
    </>
  );
};

export default Aspirants;
