



import React, { useState } from "react";
import {
  HeroSection,
  LeftContent,
  RightImage,
  Stats,
  StatBox,
  Circle,
  SecCircle,
  Title,
  SubTitle,
  ButtonsGroup,
  StartButton,
  ExploreButton,
  StatTitle,
  StatsDescription,
  LeftContentMobile,
} from "./LegalEducationHero.styles";
// import heroImage from "../../../assets/LandingBannerImag.png";
import heroImage from "../../../assets/heroImageAnuja.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { createSupport } from "../../../api/supportApi";

const LegalEducationHero = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required.";
    if (!formData.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      next.email = "Email is invalid.";
    if (!formData.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await createSupport({
        email: formData.email,
        description: formData.message,
        name: formData.name,
      });
      toast.success("Message sent successfully", {
        autoClose: 2000,
        onClose: () => {
          setShowModal(false);
          setFormData({ name: "", email: "", message: "" });
        },
      });
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      <HeroSection>
        <LeftContent>
          <Title>India's Trusted Legal Education Platform</Title>
          <SubTitle>
            Ace exams like CLAT, AILET, and CUET LL.M etc with expert coaching
            and comprehensive resources.
          </SubTitle>
          <ButtonsGroup>
            <Link to="/login">
              <StartButton>Start Now</StartButton>
            </Link>
            <Link to="/ourcoursedetails">
              <ExploreButton>Explore Courses</ExploreButton>
            </Link>
          </ButtonsGroup>
        </LeftContent>
        <LeftContentMobile>
          {/* Left side — text */}
          <div style={{ flex: 1 }}>
            <Title>India's Trusted Legal Education Platform</Title>
            <SubTitle>
              Ace exams like CLAT, AILET, and CUET LL.M etc with expert coaching
              and comprehensive resources.
            </SubTitle>
          </div>

          {/* Right side — image */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              marginLeft: "1rem",
            }}
          >
            <img
              src={heroImage}
              alt="Law Education Illustration"
              style={{
                // width: window.innerWidth < 576 ? "80%" : "100%",
                maxWidth: "400px",
                height: "auto",
                marginRight: "-4rem",
              }}
            />
          </div>

          {/* Buttons below text+image (only visible for <576px) */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <Link to="/login">
              <StartButton>Start Now</StartButton>
            </Link>
            <Link to="/ourcoursedetails">
              <ExploreButton>Explore Courses</ExploreButton>
            </Link>
          </div>

       </LeftContentMobile>

        <Circle />
        <SecCircle />
        <RightImage>
          <img src={heroImage} alt="Law Education Illustration" />
        </RightImage>
      </HeroSection>

      <Stats>
        <StatBox>
          <StatTitle>500+</StatTitle>
          <StatsDescription>Selections in Law Entrance Exams</StatsDescription>
        </StatBox>
        <StatBox>
          <StatTitle>82%</StatTitle>
          <StatsDescription>
            Improvement in Student Performance
          </StatsDescription>
        </StatBox>
        <StatBox>
          <StatTitle>2x</StatTitle>
          <StatsDescription>
            Faster Exam Preparation with Expert Coaching
          </StatsDescription>
        </StatBox>
      </Stats>

      <Contactmodale>
        <ContactInner>
          <DescriptionText>
            At Mankavit Law Academy, we are more than just an academy – we are a community of
            learners committed to success. Join us and take the first step toward
            your legal career.
          </DescriptionText>

          <ContactCTA>
            <CTAButton inverted onClick={() => setShowModal(true)}>
              Contact Us
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 4H20V16H5.17L4 17.17V4ZM4 2C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2H4ZM6 12H18V14H6V12ZM6 9H18V11H6V9ZM6 6H18V8H6V6Z"
                  fill="currentColor"
                />
              </svg>
            </CTAButton>
          </ContactCTA>
        </ContactInner>
      </Contactmodale>

      {showModal && (
        <ModalOverlay
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <ModalContent
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            <h2 id="contact-title">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your full name"
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}

              <label>Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Your email address"
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}

              <label>Message</label>
              <TextArea
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="How can we help you?"
              />
              {errors.message && <ErrorText>{errors.message}</ErrorText>}

              <ButtonRow>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">Submit</SubmitButton>
              </ButtonRow>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default LegalEducationHero;

/* ---- Local styled components for Contact Us ---- */
const ContactCTA = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0 8px;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 40px;
  background-color: transparent;
  border: 1px solid #635bff;
  color: #635bff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease, color .3s ease, box-shadow .3s ease;

  &:hover {
    background-color: #635bff;
    color: #fff;
    box-shadow: 0 10px 30px rgba(99,91,255,.35);
  }

  /* Pops on dark backgrounds */
  ${({ inverted }) =>
    inverted &&
    `
    border-color: #ffffff;
    color: #ffffff;
    &:hover {
      background-color: #ffffff;
      color: #0f172a;
      box-shadow: 0 10px 30px rgba(255,255,255,.25);
    }
  `}
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: min(520px, 92vw);
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 20px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  h2 {
    margin: 0 0 12px;
  }

  form {
    display: grid;
    gap: 10px;
  }

  label {
    font-size: 14px;
    font-weight: 600;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  resize: vertical;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  background: #635bff;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.92;
  }
`;

const CancelButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #d9d9d9;
  color: #111;
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }
`;

const ErrorText = styled.div`
  color: #e11d48;
  font-size: 12px;
  margin-top: -6px;
`;

const DescriptionText = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  color: #f8fafc;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto 1.25rem;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

/* ---------- FULL-BLEED, BEAUTIFUL, ANIMATED SECTION ---------- */
const Contactmodale = styled.section`
  /* Full-bleed even if parent has padding or centered layout */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;

  margin-top: 2rem;
  padding: 64px 0;
  overflow: hidden;

  color: #ffffff;

  /* Animated multi-stop gradient */
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,0.06), transparent 60%),
    radial-gradient(1000px 500px at 110% 10%, rgba(255,255,255,0.05), transparent 60%),
    linear-gradient(120deg, #0ea5e9, #6366f1, #a855f7, #ec4899, #06b6d4);
  background-size: 300% 300%;
  animation: gradientShift 20s ease infinite;

  /* Soft grid overlay for texture */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 22px 22px;
    opacity: 0.25;
    mix-blend-mode: overlay;
  }

  /* Glowing blobs */
  &::before {
    content: "";
    position: absolute;
    width: 70vmin;
    height: 70vmin;
    left: -10vmin;
    top: -20vmin;
    background: radial-gradient(circle at 30% 30%, rgba(236,72,153,0.55), transparent 60%);
    filter: blur(40px);
    animation: floatBlob1 18s ease-in-out infinite;
  }

  /* Second blob */
  .blob-2 {
    position: absolute;
    width: 60vmin;
    height: 60vmin;
    right: -15vmin;
    bottom: -25vmin;
    background: radial-gradient(circle at 70% 70%, rgba(99,102,241,0.55), transparent 60%);
    filter: blur(40px);
    animation: floatBlob2 22s ease-in-out infinite;
    pointer-events: none;
  }

  /* Respect users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    &::before, .blob-2 { animation: none; }
  }

  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes floatBlob1 {
    0%,100% { transform: translate3d(0,0,0) scale(1); opacity: .8; }
    50%     { transform: translate3d(4vmin,6vmin,0) scale(1.05); opacity: 1; }
  }
  @keyframes floatBlob2 {
    0%,100% { transform: translate3d(0,0,0) scale(1); opacity: .8; }
    50%     { transform: translate3d(-6vmin,-4vmin,0) scale(1.07); opacity: 1; }
  }
`;

const ContactInner = styled.div`
  position: relative;
  z-index: 1; /* above blobs/pattern */
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

/* Add the second blob element */
const Blob2 = () => <div className="blob-2" aria-hidden="true" />;

/* Inject the blob element into Contactmodale */
Contactmodale.defaultProps = {
  children: null,
};

const _OrigRender = Contactmodale.render;
