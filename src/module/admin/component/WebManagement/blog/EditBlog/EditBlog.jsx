import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  TextArea,
  DropZone,
  DropZoneText,
  ImageIcon,
  PreviewImage,
  UploadButton,
  ErrorMessage,
} from "./EditBlog.styles";

import { useLocation, useNavigate } from "react-router-dom";
import uploadIcon from "../../../../../../assets/upload.png";

const EditBlog = () => {
  const location = useLocation();
  const blogData = location.state;

  const [formData, setFormData] = useState({
    title: blogData?.title || "",
    description: blogData?.description || "",
    image: blogData?.image || "",
  });
  const [previewUrl, setPreviewUrl] = useState(blogData?.image || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.image) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    // Simulated update delay
    setTimeout(() => {
      setLoading(false);
      alert("Blog updated (simulated)");
    }, 1000);
  };

  return (
    <Container>
      <Title>Edit Blog</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter title"
      />

      <Label>Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={5}
        placeholder="Enter description"
      />

      <Label>Image *</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="Preview" />
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="Upload" width={50} />
              </ImageIcon>
              <DropZoneText>
                Drag & drop image here, or click to select
              </DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating…" : "Update"}
      </UploadButton>
    </Container>
  );
};

export default EditBlog;
