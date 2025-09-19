// Aspirants.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  VideoWrapper,
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
} from "./VideoAndReviews.styles";
import { getAlltestimonials } from "../../../api/testimonialApi";
import { getAllYoutube } from "../../../api/youtuubeApi";
import placeholder from "../../../assets/aspi1.png"; // fallback avatar

const VideoAndReviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homepageVideo, setHomepageVideo] = useState(null);
  const videoRefs = useRef({});


  // Utility to convert YouTube watch link to embed format
  const convertToEmbedURL = (url) => {
    try {
      const YT_DOMAIN_REGEX = /(^|\.)youtube\.com$|youtu\.be$/i;
      const urlObj = new URL(url);

      if (!YT_DOMAIN_REGEX.test(urlObj.hostname)) return null;

      /* 1)  watch?v=VIDEO_ID  */
      const videoId = urlObj.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;

      /* 2)  short youtu.be/VIDEO_ID  */
      if (urlObj.hostname === "youtu.be") {
        const shortId = urlObj.pathname.slice(1);
        return shortId ? `https://www.youtube.com/embed/${shortId}` : null;
      }

      /* 3)  playlist ?list=PLAYLIST_ID  */
      const listId = urlObj.searchParams.get("list");
      if (listId)
        return `https://www.youtube.com/embed/videoseries?list=${listId}`;

      /* 4)  channel /channel/CHANNEL_ID  → uploads playlist */
      const channelMatch = urlObj.pathname.match(/^\/channel\/([A-Za-z0-9_-]+)/);
      if (channelMatch) {
        const channelId = channelMatch[1];
        // uploads playlist ID = replace 'UC' with 'UU' at the start
        const uploads = channelId.replace(/^UC/, "UU");
        return `https://www.youtube.com/embed/videoseries?list=${uploads}`;
      }

      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawTestimonials = await getAlltestimonials();
        const testimonialsData = (Array.isArray(rawTestimonials) ? rawTestimonials : []).map((t) => ({
          id: t._id?.$oid || t._id || t.id,
          name: t.name,
          role: t.rank,                // ← the API field is “rank”
          quote: t.description,        // ← the API field is “description”
          image: t.testimonial_image,
          video: t.testimonial_video,
        }));
        setTestimonials(testimonialsData);

        const ytResponse = await getAllYoutube();
        const ytLinks = Array.isArray(ytResponse?.data) ? ytResponse.data : [];

        // console.log("All YouTube links:");
        ytLinks.forEach((v, i) => {
          // console.log(`[${i}] homepage: ${v.homepage}, embedURL: ${convertToEmbedURL(v.video_link)}`);
        });

        // Step 1: Try to find homepage video with valid embed URL
        let homeVideo = ytLinks.find((v) => {
          const isHomepage =
            v.homepage === true || v.homepage === "true" || v.homepage === 1 || v.homepage === "1";
          const embedURL = convertToEmbedURL(v.video_link);
          return isHomepage && embedURL;
        });

        // Step 2: Fallback to any valid embed video if no homepage video
        if (!homeVideo) {
          homeVideo = ytLinks.find((v) => convertToEmbedURL(v.video_link));
        }

        if (homeVideo?.video_link) {
          const embedURL = convertToEmbedURL(homeVideo.video_link);
          if (embedURL) {
            setHomepageVideo(embedURL);
          }
        }
      } catch (err) {
        // console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <VideoWrapper>
        {homepageVideo ? (
          <iframe
            width="100%"
            height="100%"
            src={homepageVideo}
            title="Testimonial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No homepage video set or video link is not embeddable.</p>
        )}
      </VideoWrapper>
{/* 
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
                <Media
                  ref={(el) => (videoRefs.current[t.id] = el)}
                  onMouseEnter={() => videoRefs.current[t.id]?.play()}
                  onMouseLeave={() => {
                    const vid = videoRefs.current[t.id];
                    if (vid) {
                      vid.pause();
                      vid.currentTime = 0;
                    }
                  }}
                  muted
                >
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
      </CardWrapper> */}
    </Container>
  );
};

export default VideoAndReviews;
// VideoAndReviews