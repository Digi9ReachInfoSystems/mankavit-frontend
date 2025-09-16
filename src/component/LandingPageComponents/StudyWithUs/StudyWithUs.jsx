import { useEffect, useRef, useState } from "react";
import {
  Container,
  Content,
  Title,
  Highlight,
  CarouselViewport,
  CarouselTrack,
  NavButton,
  Slide,          // styled(Card)
  Visual,
  AvatarWrap,
  Avatar,
  CardBody,
  CardTitle,
  MetaRow,
  Stars,
  Subtitle
} from "./StudyWithUs.styles";
import { getAllWhy } from "../../../api/whyApi";
import { FaStar } from "react-icons/fa";

const pastel = ["#e6f2ff","#ffefe6","#fff9e6","#eaf7ff","#ffeaf2","#eaf7f0"];
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const StudyWithUs = () => {
  const [whys, setWhys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllWhy();
        setWhys(Array.isArray(res) ? res : res?.data ?? []);
      } catch (e) {
        setError(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollSlides = (n) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children?.[0];
    const w = first?.offsetWidth || 300;
    const gap = parseInt(getComputedStyle(el).gap || "0", 10);
    el.scrollBy({ left: n * (w + gap), behavior: "smooth" });
  };

  // drag-to-scroll
  const onDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.down = true;
    el.classList.add("dragging");
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    drag.current.startX = clientX + el.scrollLeft;
    drag.current.scrollLeft = el.scrollLeft;
  };
  const onMove = (e) => {
    if (!drag.current.down) return;
    e.preventDefault();
    const el = trackRef.current;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    el.scrollLeft = drag.current.startX - clientX;
  };
  const onUp = () => {
    drag.current.down = false;
    trackRef.current?.classList.remove("dragging");
  };
  const onWheel = (e) => {
    // make mouse wheel scroll horizontally
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      trackRef.current.scrollLeft += e.deltaY;
    }
  };

  if (loading) return <Container><Content>Loading...</Content></Container>;
  if (error)   return <Container><Content>Error: {error}</Content></Container>;
  if (!whys?.length) return <Container><Content>No data available</Content></Container>;

  return (
    <Container>
      <Content>
        <Title>Why Study <Highlight>With Us</Highlight></Title>

        <CarouselViewport>
          <NavButton $left onClick={() => scrollSlides(-1)} aria-label="Previous">‹</NavButton>
          <CarouselTrack
            ref={trackRef}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseLeave={onUp}
            onMouseUp={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
            onWheel={onWheel}
          >
            {whys.map((item, idx) => (
              <Slide key={item._id || idx}>
                <Visual $bg={pastel[idx % pastel.length]}>
                  <AvatarWrap>
                    <Avatar src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${item.image}`} alt={item.title} loading="lazy" />
                  </AvatarWrap>
                </Visual>
                <CardBody>
                  <CardTitle title={item.title}>{item.title}</CardTitle>
                 
                  <Subtitle title={stripHtml(item.description)}>
                    {stripHtml(item.description)}
                  </Subtitle>
                </CardBody>
              </Slide>
            ))}
          </CarouselTrack>
          <NavButton onClick={() => scrollSlides(1)} aria-label="Next">›</NavButton>
        </CarouselViewport>
      </Content>
    </Container>
  );
};

export default StudyWithUs;
