import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Title,
  Highlight,
  Line,
  Features,
  FeatureCard,
  FeatureImage,
  FeatureTitle,
  FeatureText,
  Description,
  EnrollButton,
  ScrollIndicator,
  LoadingSpinner
} from "./EnrollCourse.styles";
import { getAllWhy } from "../../../api/whyApi";
import { getCookiesData } from "../../../utils/cookiesService";
import { useNavigate } from "react-router-dom";
import { getAllWhyOurCourse } from "../../../api/whyOurCourseApi";

const EnrollCourse = () => {
  const [whys, setWhys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ref to the horizontally scrolling features container
  const featuresRef = useRef(null);

  // control whether each arrow is enabled
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWhyOurCourse();
        setWhys(response.data || []);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEnrollNow = async () => {
    const cookieData = await getCookiesData();
    navigate("/login");
  };

  // calculate whether the container can scroll left/right
  const updateScrollButtons = () => {
    const el = featuresRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;
    // small epsilon to avoid float precision errors
    const epsilon = 2;

    setCanScrollLeft(scrollLeft > epsilon);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - epsilon);
  };

  useEffect(() => {
    // run after the items are rendered
    updateScrollButtons();

    const el = featuresRef.current;
    if (!el) return;

    // update on scroll
    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll, { passive: true });

    // update on resize (window or element size changes)
    const onResize = () => updateScrollButtons();
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // we purposely do NOT include updateScrollButtons in deps (stable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whys]); // re-run when content changes

  const handleScroll = (direction) => {
    const el = featuresRef.current;
    if (!el) return;

    const scrollAmount = Math.max(el.clientWidth * 0.8, 300); // prefer ~80% of viewport, fallback to 300px
    const left = direction === "left" ? -scrollAmount : scrollAmount;

    // smooth scroll; scroll event listener will update button states
    el.scrollBy({ left, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Why Choose <Highlight>Our Courses?</Highlight>
      </Title>
      <Line />

      {/* attach ref to the Features container */}
      <Features id="features-container" ref={featuresRef}>
        {whys.map((item, index) => (
          <FeatureCard key={index}>
            <FeatureImage
              src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${item.image}`}
              alt={item.title}
            />
            <FeatureTitle>{item.title}</FeatureTitle>
            <FeatureText>{item.text}</FeatureText>
          </FeatureCard>
        ))}
      </Features>

      <ScrollIndicator>
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          aria-disabled={!canScrollLeft}
          title={canScrollLeft ? "Scroll left" : "No more items to the left"}
        >
          &#8249;
        </button>
        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          aria-disabled={!canScrollRight}
          title={canScrollRight ? "Scroll right" : "No more items to the right"}
        >
          &#8250;
        </button>
      </ScrollIndicator>

      {/* Uncomment if you want the description / CTA */}
      {/* <Description>
        Take the first step towards your legal career. Choose the course that best suits your goals and enroll now. Our team is here to assist you every step of the way!
      </Description>

      <EnrollButton onClick={handleEnrollNow}>
        Enroll Now
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </EnrollButton> */}
    </Container>
  );
};

export default EnrollCourse;
