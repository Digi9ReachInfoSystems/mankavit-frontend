import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Author,
  Description,
  ImageContainer,
  AuthorDetails,
  AuthorImage,
  ProfileImage,
  AuthorInfo,
  AuthorName,
  AuthorBio,
  SocialIcons,
  Image,
} from "./ReadPost.styles";

import achievers from "../../../assets/achievers.jpg";
import Youtube from "../../../assets/youtube.svg";
import Facebook from "../../../assets/facebook.svg";
import Instagram from "../../../assets/instagram.svg";
import Twitter from "../../../assets/twitter.svg";
import Whatsapp from "../../../assets/whatsapp.svg";
import Linkedin from "../../../assets/linkedIn.svg";
import Telegram from "../../../assets/telegram.svg";

import Header from "../../../pages/LandingPage/LandingHeader/LandingHeader";
import Footer from "../../../pages/LandingPage/Footer/Footer";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../../api/blogApi";
import { getSocialMediaLinks } from "../../../api/youtuubeApi";

/** Map backend keys (lower‑cased) ➜ SVG icons */
const iconMap = {
  youtubechannel: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  whatsapp: Whatsapp,
  linkedin: Linkedin,
  telegram: Telegram,
};

const ReadPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState([]);

  // ────────────────────────────────────────────────────────────
  // Fetch blog post
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBlogById(id);
        if (response.success && response.blog) {
          setPost(response.blog);
        } else {
          console.error("Blog not found or invalid response");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // ────────────────────────────────────────────────────────────
  // Fetch social‑media links once
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await getSocialMediaLinks();
        const raw = res?.data?.[0];
        if (raw && typeof raw === "object") {
          const links = Object.entries(raw)
            .filter(([, val]) => typeof val === "string" && val.startsWith("http"))
            .map(([platform, url]) => {
              let key = platform.toLowerCase();
              if (key === "teligram") key = "telegram"; // backend typo
              return { platform: key, url };
            });
          setSocialLinks(links);
        }
      } catch (err) {
        console.error("Social link fetch failed", err);
      }
    };
    fetchLinks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Blog post not found</p>;

  return (
    <>
      <Header />
      <Container>
        <div>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "12px" }}
            />
          )}
          <Title>{post.title}</Title>
          <Author>{new Date(post.createdAt).toLocaleDateString()}</Author>
          <Description>{post.description}</Description>
        </div>

        <ImageContainer>
          <AuthorDetails>
            <AuthorImage>
              <ProfileImage src={achievers} alt="Author" />
            </AuthorImage>
            <AuthorInfo>
              <AuthorName>Mankavit Team</AuthorName>
              <AuthorBio>
                Explore legal excellence with us. Bringing the best insights and prep strategies for law aspirants.
              </AuthorBio>
            </AuthorInfo>
          </AuthorDetails>

          <div className="space"></div>

          <SocialIcons>
            {socialLinks.map(({ platform, url }) => {
              const iconSrc = iconMap[platform];
              if (!iconSrc) return null;
              return (
                <Image
                  key={platform}
                  src={iconSrc}
                  alt={platform}
                  onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                />
              );
            })}
          </SocialIcons>
        </ImageContainer>
      </Container>
      <Footer />
    </>
  );
};

export default ReadPost;