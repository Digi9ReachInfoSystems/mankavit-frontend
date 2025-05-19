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
} from './EditWhyStudyWithUs.styles';
import uploadIcon from '../../../../../../assets/upload.png';
import { useNavigate } from 'react-router-dom';

const EditWhyStudyWithUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setError('');
    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and Description are required.');
      return;
    }
    if (!formData.image) {
      setError('Please select an image.');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate submission delay (static)
    setTimeout(() => {
      console.log("Submitted form data:", {
        title: formData.title,
        description: formData.description,
        image: formData.image.name,
      });
      setLoading(false);
      alert("Mission submitted (static)!");
      navigate('/admin/web-management/why-study-with-us');
    }, 1000);
  };

  return (
    <Container>
      <Title>Add Why Study With Us</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Why Study With Us Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter mission title"
      />

      <Label>Why Study With Us Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={5}
        placeholder="Enter mission description"
      />

      <Label>Upload Mission Image *</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="Preview" />
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="Upload" width="50" />
              </ImageIcon>
              <DropZoneText>Drag & drop image here, or click to select</DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </UploadButton>
    </Container>
  );
};

export default EditWhyStudyWithUs;
