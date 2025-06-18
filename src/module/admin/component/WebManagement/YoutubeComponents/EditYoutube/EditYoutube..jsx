import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  DropZone,
  DropZoneText,
  ImageIcon,
  PreviewImage,
  UploadButton,
} from "./EditYoutube..styles";
import uploadIcon from "../../../../../../assets/upload.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock API fallback
const mockFetchVideo = (id) =>
  Promise.resolve({
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  });

const EditYoutube = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation(); // <-- data from list page

  const [formData, setFormData] = useState({ link: "", image: null });
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidYouTubeUrl = (url) =>
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);

  // Load initial data (from state if present; otherwise fetch)
  useEffect(() => {
    const load = async () => {
      const data = state ?? (await mockFetchVideo(id));
      setFormData({ link: data.link, image: null });
      setPreviewUrl(data.thumbnail);
    };
    load();
  }, [id, state]);

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.warning("Image size should be less than 5 MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

const handleUpdate = async () => {
  if (!formData.link) {
    toast.error("Please provide a YouTube link.");
    return;
  }
  if (!isValidYouTubeUrl(formData.link)) {
    toast.error("Please enter a valid YouTube URL.");
    return;
  }

  try {
    setLoading(true);

    const storedItems = JSON.parse(localStorage.getItem("youtubeLinks") || "[]");

    const updatedItems = storedItems.map((item) =>
      item._id === id
        ? {
            ...item,
            link: formData.link,
            thumbnail: previewUrl || item.thumbnail,
          }
        : item
    );

    localStorage.setItem("youtubeLinks", JSON.stringify(updatedItems));

    toast.success("Link updated successfully!");
    setTimeout(() => {
      navigate("/admin/web-management/youtubelinks");
    }, 1000);
  } catch {
    toast.error("Failed to update link.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Container>
      <Title>Edit YouTube Link</Title>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Label>YouTube Link *</Label>
      <Input
        placeholder="https://www.youtube.com/"
        value={formData.link}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, link: e.target.value }))
        }
      />

      <Label>Thumbnail Image *</Label>
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
            <PreviewImage src={previewUrl} alt="Thumbnail" />
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

      <UploadButton onClick={handleUpdate}>
        {loading ? "Updating..." : "Update Changes"}
      </UploadButton>
    </Container>
  );
};

export default EditYoutube;
