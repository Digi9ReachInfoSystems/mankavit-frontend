// src/components/Sidebar/.../AddYoutube.jsx
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
  HalfColumn,
  ThumbnailImg
} from "./AddYoutube.styles";
import uploadIcon from "../../../../../../assets/upload.png";
import { useNavigate } from "react-router-dom";
import { createYoutube } from "../../../../../../api/youtuubeApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";

const AddYoutube = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    link: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidYouTubeUrl = url =>
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return setError("Please upload a valid image.");
    }
    if (file.size > 5 * 1024 * 1024) {
      return setError("Image must be < 5 MB.");
    }

    setFormData(p => ({ ...p, image: file }));
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setError("");
    if (!formData.link || !formData.image) {
      return setError("Link and image required.");
    }
    if (!isValidYouTubeUrl(formData.link)) {
      return setError("Invalid YouTube URL.");
    }

    try {
      setLoading(true);
      const up = await uploadFileToAzureStorage(
        formData.image,
        "youtube-channels"
      );
      const url = up.blobUrl || up.fileUrl || up.url;
      if (!url) throw new Error("Image upload failed");

      await createYoutube({
        video_link: formData.link,
        thumbnailImage: url,
      });

      navigate("/admin/web-management/youtubelinks");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong.";
      setError(msg);
      console.error(err);
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
        onChange={e =>
          setFormData(p => ({ ...p, link: e.target.value }))
        }
      />

      <HalfColumn>
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
              <ThumbnailImg src={previewUrl} alt="preview" />
            ) : (
              <>
                <ImageIcon>
                  <img src={uploadIcon} alt="upload" width="50" />
                </ImageIcon>
                <DropZoneText>Drag &amp; drop or click to upload</DropZoneText>
              </>
            )}
          </label>
        </DropZone>
      </HalfColumn>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating…" : "Create YouTube Link"}
      </UploadButton>
    </Container>
  );
};

export default AddYoutube;
