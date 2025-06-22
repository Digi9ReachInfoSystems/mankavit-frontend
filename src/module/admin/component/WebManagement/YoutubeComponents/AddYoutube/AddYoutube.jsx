import React, { useState } from "react";
import {
  Container,
  Label,
  Input,
  DropZone,
  DropZoneText,
  ImageIcon,
  PreviewImage,
  UploadButton,
  ErrorText,
} from "./AddYoutube.styles";
import uploadIcon from "../../../../../../assets/upload.png";
import { useNavigate } from "react-router-dom";
import { createYoutube } from "../../../../../../api/youtuubeApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";

const AddYoutube = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ link: "", image: null });
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate YouTube URL
  const isValidYouTubeUrl = (url) =>
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);

  // Handle image selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5 MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setError("");

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!formData.link || !formData.image) {
      setError("Please provide both a YouTube link and an image.");
      return;
    }

    if (!isValidYouTubeUrl(formData.link)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Upload image to Azure Storage
      const uploadResponse = await uploadFileToAzureStorage(
        formData.image,
        "youtube-channels"
      );

      const blobUrl = uploadResponse.blobUrl || uploadResponse.fileUrl || uploadResponse.url;
      if (!blobUrl) {
        throw new Error("Image upload failed");
      }

      // Step 2: Send YouTube link + image URL to backend
      const payload = {
        video_link: formData.link,
        thumbnailImage: blobUrl
      };

      const response = await createYoutube(payload);

      console.log("YouTube link created:", response);

      // Step 3: Navigate back
      navigate("/admin/web-management/youtubelinks");
    } catch (err) {
      let errorMessage = "Something went wrong. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Error submitting YouTube link:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {error && <ErrorText>{error}</ErrorText>}

      <Label htmlFor="youtube-link">YouTube Video Link</Label>
      <Input
        id="youtube-link"
        type="url"
        placeholder="https://www.youtube.com/watch?v=..."
        value={formData.link}
        onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
        required
      />

      <Label>Thumbnail Image</Label>
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
            <PreviewImage src={previewUrl} alt="Thumbnail Preview" />
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="Upload" width="50" />
              </ImageIcon>
              <DropZoneText>
                Drag & drop image here, or click to select
              </DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create YouTube Link"}
      </UploadButton>
    </Container>
  );
};

export default AddYoutube;