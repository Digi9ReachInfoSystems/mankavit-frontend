// src/pages/Admin/WebManagement/WhyStudyWithUs/ViewWhyStudyWithUs.jsx

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
} from "./ViewWhyStudyWithUs.styles";

import uploadIcon from "../../../../../../assets/upload.png";
import { getWhyById } from "../../../../../../api/whyApi";

const ViewWhyStudyWithUs = () => {
  const { id } = useParams();
  const [why, setWhy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Guard: don't call API until we actually have an ID
    if (!id) {
      setError("No item ID specified in URL.");
      setLoading(false);
      return;
    }

    const fetchWhy = async () => {
      try {
        console.log("id", id);
        const response = await getWhyById(id);
        // depending on your API, you might need response.data vs response
        const doc = response.data ?? response;
        setWhy(doc);
      } catch (err) {
        console.error("Failed to load item:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Server error while fetching item."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWhy();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Title>View Why Study With Us</Title>
        <p>Loading…</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>View Why Study With Us</Title>
        <p style={{ color: "red" }}>Error: {error}</p>
      </Container>
    );
  }

  // At this point `why` is guaranteed non-null
  const { title, description, image } = why;

  return (
    <Container>
      <Title>View Why Study With Us</Title>

      <Label>Title</Label>
      <Field>{title}</Field>

      <Label>Description</Label>
      <Field>{description}</Field>

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

export default ViewWhyStudyWithUs;
