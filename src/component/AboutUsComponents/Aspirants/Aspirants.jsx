// // Aspirants.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Title,
//   Highlight,
//   Card,
//   Avatar,
//   Quote,
//   Name,
//   Role,
//   CardWrapper,
//   Media,
//   MediaContainer
// } from "./Aspirants.styles";
// import { getAlltestimonials } from "../../../api/testimonialApi";
// import placeholder from "../../../assets/aspi1.png";   // fallback avatar

// const Aspirants = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const raw = await getAlltestimonials();
//         const data = (Array.isArray(raw) ? raw : []).map((t) => ({
//           id: t._id || t.id,
//           name: t.name,
//           role: t.rank,
//           quote: t.description,
//           image: t.testimonial_image,
//           video: t.testimonial_video,
//         }));
//         setTestimonials(data);
//       } catch (err) {
//         console.error("Error fetching testimonials:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   if (loading) {
//     return (
//       <Container>
//         <p>Loading testimonials…</p>
//       </Container>
//     );
//   }

//   if (testimonials.length === 0) {
//     return (
//       <Container>
//         <Title>
//           What Are <Highlight>They Saying</Highlight>
//         </Title>
//         <p>No testimonials found.</p>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Title>
//         What Are <Highlight>They Saying</Highlight>
//       </Title>

//       <CardWrapper>
//         {testimonials.map((t) => (
//           <Card key={t.id}>
//             <MediaContainer>
//               {t.image ? (
//                 <Avatar src={t.image} alt={t.name} />
//               ) : t.video ? (
//                 <Media controls>
//                   <source src={t.video} type="video/mp4" />
//                   Your browser doesn't support embedded videos.
//                 </Media>
//               ) : (
//                 <Avatar src={placeholder} alt="placeholder" />
//               )}
//             </MediaContainer>

//           <Quote dangerouslySetInnerHTML={{ __html: t.quote.slice(0,60) }} />
//             {/* <Name>{t.name}</Name> */}
//             <Name dangerouslySetInnerHTML={{ __html: t.name }} />
//             <Role>{t.role}</Role>
//           </Card>
//         ))}
//       </CardWrapper>
//     </Container>
//   );
// };

// export default Aspirants;

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
          <Media
            ref={vidRef}
            playsInline
            preload="metadata"
            controls={false}
            // poster can be added if you have a thumbnail: poster="..."
          >
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
                      image={t.image}
                      video={t.video}
                      name={t.name}
                      active={i === idx}
                    />
                  </LeftCol>

                  <RightCol>
                    <Quote
                      dangerouslySetInnerHTML={{
                        __html: t.quote || "“Great learning experience.”",
                      }}
                    />
                    <Name
                      dangerouslySetInnerHTML={{ __html: t.name || "Aspirant" }}
                    />
                    {t.role ? <Role>{t.role}</Role> : null}
                  </RightCol>
                </Card>
              </Slide>
            ))}
          </SlidesTrack>

          {/* Controls */}
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
        </SliderShell>
      </Container>
    </>
  );
};

export default Aspirants;
