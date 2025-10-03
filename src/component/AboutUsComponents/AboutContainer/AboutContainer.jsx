import React, { useState, useEffect } from "react";
import {
  AboutmainContainer,
  AboutTitleWrap,
  // AboutTitle,
  // TitleAccent,
  AboutContent,
  ContentCard,
  SkeletonCard,
  ErrorBanner,
  DescriptionCard,
  Underline,
  Title,
  Highlight
} from "./AboutContainer.styles";
import { getAllAboutUs } from "../../../api/aboutUsApi";

const AboutContainer = () => {
  const [aboutItems, setAboutItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllAboutUs();
        setAboutItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load About Us content.");
        setAboutItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <AboutmainContainer aria-busy={loading}>
      <AboutTitleWrap>
      <Title>
                About <Highlight>Us</Highlight>
               </Title>
           <Underline />
        {/* <TitleAccent aria-hidden /> */}
      </AboutTitleWrap>

      {error && <ErrorBanner role="alert">{error}</ErrorBanner>}

      <AboutContent>
        {loading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading &&
          !error &&
          aboutItems.map((item, idx) => (
            <ContentCard
              key={item._id || idx}
              $alt={idx % 2 === 1}
              aria-label={item?.title || `About section ${idx + 1}`}
            >
              {item?.title && <h3>{item.title}</h3>}
              {/* We preserve your HTML rendering */}
              <DescriptionCard
             
                dangerouslySetInnerHTML={{ __html: item?.description || "" }}
              ></DescriptionCard>
            </ContentCard>
          ))}
      </AboutContent>
    </AboutmainContainer>
  );
};

export default AboutContainer;
