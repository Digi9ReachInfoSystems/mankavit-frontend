import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  ErrorMessage
} from './EditMission.styles';
import uploadIcon from "../../../../../../assets/upload.png";

const LOCAL_STORAGE_KEY = "missions_data";

const EditMission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  // Load missions and set form data
  useEffect(() => {
    const savedMissions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setMissions(savedMissions);

    const mission = savedMissions.find(m => m._id === id);
    if (mission) {
      setFormData({
        title: `AIR ${mission.rank}`,
        description: mission.exam_name,
        image: mission.image,
      });
      setPreviewUrl(mission.image);
    } else {
      setError("Mission not found");
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setError('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    const updatedMissions = missions.map((mission) =>
      mission._id === id
        ? {
            ...mission,
            rank: formData.title.replace("AIR ", ""),
            exam_name: formData.description,
            image: formData.image,
          }
        : mission
    );

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMissions));
    setError("");
    navigate("/admin/web-management/mission");
  };

  return (
    <Container>
      <Title>Edit Mission</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Mission Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="AIR 1"
      />

      <Label>Mission Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={5}
      />

      <Label>Current Mission Image</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
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
              <DropZoneText>Drag and drop image here, or click add image</DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit}>
        Update Mission
      </UploadButton>
    </Container>
  );
};

export default EditMission;
