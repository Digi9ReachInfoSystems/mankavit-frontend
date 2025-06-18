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
} from "./AddYoutube.styles";
import uploadIcon from "../../../../../../assets/upload.png";
import { useNavigate } from "react-router-dom";

const AddYoutube = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ link: "", image: null });
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidYouTubeUrl = (url) =>
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

 const handleSubmit = () => {
  if (!formData.link || !formData.image) {
    alert("Please provide both a YouTube link and an image.");
    return;
  }
  if (!isValidYouTubeUrl(formData.link)) {
    alert("Please enter a valid YouTube URL.");
    return;
  }

  setLoading(true);

  const newEntry = {
    _id: Date.now().toString(),
    link: formData.link,
    thumbnail: previewUrl,
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem("youtubeLinks") || "[]");
  localStorage.setItem("youtubeLinks", JSON.stringify([newEntry, ...existing]));

  navigate("/admin/web-management/youtubelinks");
};


  return (
    <Container>

        
      <Label>YouTube Link</Label>
      <Input
        placeholder="https://www.youtube.com/"
        value={formData.link}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, link: e.target.value })) 
        }
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
            <PreviewImage src={previewUrl} alt="Preview" />
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="Upload" width="50" />
              </ImageIcon>
              <DropZoneText>
                Drag &amp; drop image here, or click to select
              </DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Link"}
      </UploadButton>
    </Container>
  );
};

export default AddYoutube;
