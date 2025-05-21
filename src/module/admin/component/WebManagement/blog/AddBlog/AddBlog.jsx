// src/pages/Admin/WebManagement/Blog/AddBlog.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from './AddBlog.styles';

import uploadIcon from '../../../../../../assets/upload.png';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const handleSubmit = async () => {
    const { title, description, image } = formData;

    if (!title || !description || !image) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate form submission
      const formDataToSend = new FormData();
      formDataToSend.append('title', title);
      formDataToSend.append('description', description);
      formDataToSend.append('image', image);

      // Example: Replace with your actual API call
      // await fetch('/api/blogs', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });

      // Simulate success
      setTimeout(() => {
        setLoading(false);
        navigate('/admin/web-management/blog'); // Navigate after creation
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError('Failed to create blog. Try again.');
    }
  };

  return (
    <Container>
      <Title>Blog</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Blog *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter title"
      />

      <Label>Blog Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={5}
        placeholder="Enter description"
      />

      <Label>Upload Image *</Label>
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
        {loading ? 'Creating…' : 'Create'}
      </UploadButton>
    </Container>
  );
};

export default AddBlog;
