import styled from "styled-components";

/* Canvas */
export const Container = styled.section`
  position: relative;
  padding: 20px 20px 72px;
  overflow: hidden;

  width: min(1200px, 92%);
  margin: 0 auto;
`;

/* Heading */
/* Heading */
export const Title = styled.h2`
  margin: 0;
  font-size: 50px;
  font-weight: 500;
  color: #0f172a;
  letter-spacing: -0.02em;
  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

/* Title wrapper with responsive left offset */
export const TitleDiv = styled.div`
  // margin-left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  margin-top: 50px;
  // margin-bottom: 18px;
  width: fit-content; /* keep the block tight to the title */

  @media (max-width: 1360px) { margin-left: 160px; }
  @media (max-width: 1200px) { margin-left: 120px; }
  @media (max-width: 1024px) { margin-left: 80px; }
  @media (max-width: 900px)  { margin-left: 60px; }
  @media (max-width: 768px)  { margin-left: 32px; }
  @media (max-width: 576px)  { margin-left: 16px; }
  @media (max-width: 420px)  { margin-left: 0; }   /* no offset on very small screens */
`;

export const Highlight = styled.span`
  color: ${props => props.theme.colors.vividblue};
`;

/* Carousel shell */
export const SliderShell = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

export const SlidesTrack = styled.div`
  display: flex;
  transition: transform 380ms cubic-bezier(.2,.7,.3,1);
  will-change: transform;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  padding: clamp(8px, 1.2vw, 14px);
`;


/* Testimonial Card */
export const Card = styled.div`
  width: 100%;
  min-height: 280px;
    background:
    radial-gradient(900px 420px at -6% -10%, #9afff2ff 0%, transparent 60%),
    radial-gradient(800px 380px at 106% -8%, #b8f4ffff 0%, transparent 55%),
    linear-gradient(180deg, #a1f2fdff 0%, #b2ddf7ff 50%, #ccfcffff 100%);
 
  border-radius: 22px;
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.08),
    0 2px 6px rgba(15, 23, 42, 0.06);
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: clamp(16px, 2.2vw, 28px);
  align-items: center;
  padding: clamp(14px, 2.2vw, 22px) clamp(16px, 2.2vw, 24px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 18px;
  }
`;


export const LeftCol = styled.div`
  display: grid;
  place-items: center;
`;

export const RightCol = styled.div`
  padding: clamp(4px, 0.6vw, 8px) 4px;
`;

/* Perfect round media container */
export const MediaBlob = styled.div`
  width: min(320px, 80%);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;

  /* Optional subtle ring */
  box-shadow: inset 0 0 0 6px rgba(255, 138, 61, 0.15),
              0 12px 28px rgba(0,0,0,0.06);

  @media (max-width: 900px) {
    width: min(360px, 88%);
  }
`;

/* Image */
export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

/* Video */
export const Media = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  background: #000;
`;

/* Overlay for custom play/pause */
export const MediaOverlay = styled.button`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(closest-side, rgba(0,0,0,0.18), transparent 70%);
  border: 0;
  cursor: pointer;
  padding: 0;
`;

/* Center button */
export const PlayPauseBtn = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: grid;
  place-items: center;
  font-size: 24px;
  color: #111827;
  box-shadow: 0 6px 18px rgba(0,0,0,0.18);
  user-select: none;
`;

/* Text */
export const Quote = styled.blockquote`
  position: relative;
  margin: 0 0 16px;
  color: #0f172a;
  font-size: clamp(16px, 1.7vw, 20px);
  line-height: 1.6;
  background-color:transparent !important;
  font-weight: 500;
`;

export const Name = styled.h4`
  margin: 8px 0 2px;
  font-size: clamp(20px, 1.8vw, 22px);
  font-weight: 700;
  color: #0f172a;
`;

export const Role = styled.p`
  margin: 0;
  font-size: clamp(16px, 1.4vw, 14px);
  color: #475569;
  font-weight: 500;
`;

/* Controls */
export const ControlsBar = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr 64px;  /* wider for bigger arrows */
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

export const ArrowBtn = styled.button`
  height: 64px;
  border-radius: 14px;
  border: 0;
  cursor: pointer;
  font-size: 28px;                 /* bigger icon */
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  box-shadow: 0 10px 22px rgba(0, 114, 255, 0.35);
  transition: transform 80ms ease, box-shadow 160ms ease, filter 160ms ease;

  &:hover { 
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(0, 114, 255, 0.45);
    filter: saturate(1.1);
  }
  &:active { transform: translateY(0); }

  @media (max-width: 768px) {
    height: 56px;
    font-size: 24px;
  }
     @media (max-width: 1024px) {
    display: none;
  }
`;

export const DotBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 8px 4px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Dot = styled.button`
  width: 12px; height: 12px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#0494FA" : "#e2e8f0")};
  box-shadow: ${({ $active }) => ($active ? "0 0 0 8px rgba(4, 148, 250, 0.18)" : "none")};
  transition: background 160ms ease, box-shadow 160ms ease, transform 80ms ease;

  &:hover { transform: scale(1.08); }
`;
export const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  gap: 16px;
  padding: 8px 0;
  scrollbar-width: none;          /* Firefox */
  -ms-overflow-style: none;       /* IE/Edge */
  overscroll-behavior-x: contain; /* nicer touchpad behavior */

  &::-webkit-scrollbar { display: none; } /* Chrome/Safari */

  ${Slide} {
    flex: 0 0 100%;               /* each slide is viewport width */
    scroll-snap-align: start;
    margin: 0;                    /* zero side margins so arrows scroll exactly one page */
  }

  ${Card} {
    min-height: 320px;
  }

  @media (max-width: 900px) {
    ${Card} {
      grid-template-columns: 1fr;
      text-align: center;
    }
    ${LeftCol} {
      margin-bottom: 16px;
    }
    ${MediaBlob} {
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
  }
`;


export const ViewMoreButton = styled.button`
  background: none;
  border: none;
  color: #0494FA;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: #0378d4;
  }
`;

// Aspirants.styles.js (append near the bottom)

export const VideoOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 16px;
`;

export const VideoModal = styled.div`
  position: relative;
  width: min(900px, 92vw);
  max-height: 90vh;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 2;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 0;
  width: 36px;
  height: 36px;
  font-size: 24px;
  line-height: 1;
  border-radius: 8px;
  cursor: pointer;

  &:hover { background: rgba(0,0,0,0.75); }
`;

export const VideoPlayer = styled.video`
  display: block;
  width: 100%;
  height: auto;
  max-height: 90vh;
  outline: none;
  background: #000;
`;

export const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0dcaf0);
  margin: 0 auto 3rem;
  border-radius: 2px;
`;