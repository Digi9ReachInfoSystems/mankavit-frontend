// src/pages/Admin/WebManagement/Blog/ViewBlog.jsx

import React from "react";
import { useLocation } from "react-router-dom";

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

const ViewBlog = () => {
  const location = useLocation();
  const blogData = location.state;

  if (!blogData) {
    return (
      <Container>
        <Title>View Blog</Title>
        <p style={{ color: "red" }}>No blog data found.</p>
      </Container>
    );
  }

  const { title, description, image } = blogData;

  return (
    <Container>
      <Title>View Blog</Title>

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

export default ViewBlog;
