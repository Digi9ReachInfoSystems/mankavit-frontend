import React, { useState } from 'react';
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
} from './AddMission.styles';
import uploadIcon from "../../../../../../assets/upload.png";
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = "missions_data";

const AddMission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

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
      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
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

    const newMission = {
      _id: Date.now().toString(),
      rank: formData.title.replace("AIR ", ""),
      exam_name: formData.description,
      image: previewUrl,
    };

    const savedMissions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const updatedMissions = [...savedMissions, newMission];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMissions));

    setError("");
    navigate("/admin/web-management/mission");
  };

  return (
    <Container>
      <Title>Add Mission</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Mission Title *</Label>
      <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="AIR 1" />

      <Label>Mission Description *</Label>
      <TextArea name="description" value={formData.description} onChange={handleInputChange} rows={5} />

      <Label>Upload Mission Image *</Label>
      <DropZone hasImage={!!previewUrl}>
        <input type="file" accept="image/*" id="upload-image" style={{ display: 'none' }} onChange={handleImageUpload} />
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
        Create Mission
      </UploadButton>
    </Container>
  );
};

export default AddMission;
