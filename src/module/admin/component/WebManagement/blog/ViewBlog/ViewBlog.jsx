import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Title,
  Label,
  Field,
  DropZone,
  ImageIcon,
  PreviewImage,
} from "./ViewBlog.styles";

import uploadIcon from "../../../../../../assets/upload.png";
import { getBlogById } from "../../../../../../api/blogApi";

const ViewBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await getBlogById(id);
        if (response?.success && response?.blog) {
          setBlogData(response.blog);
        } else {
          setError("No blog data found.");
        }
      } catch (err) {
        setError("Error fetching blog data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Title>View Blog</Title>
        <p>Loading...</p>
      </Container>
    );
  }

  if (error || !blogData) {
    return (
      <Container>
        <Title>View Blog</Title>
        <p style={{ color: "red" }}>{error || "No blog data found."}</p>
      </Container>
    );
  }

  const { title, description, image } = blogData;

  return (
    <Container>
      <Title>View Blog</Title>

      <Label>Title</Label>
      <Field>{title || "-"}</Field>

      <Label>Description</Label>
      <Field>{description || "-"}</Field>

      <Label>Image</Label>
      <DropZone hasImage={!!image}>
        {image ? (
          <PreviewImage src={image} alt="Preview" />
        ) : (
          <ImageIcon>
            <img src={uploadIcon} alt="No image" width={50} />
          </ImageIcon>
        )}
      </DropZone>
    </Container>
  );
};

export default ViewBlog;
