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
import uploadIcon from '../../../../../../assets/upload.png';
import { useNavigate } from 'react-router-dom';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { createMission } from '../../../../../../api/missionApi';

const AddMission = () => {
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

  const handleSubmit = async (e) => {
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

    try {
      // 1. Upload image to Azure and get URL
      const uploadResponse = await uploadFileToAzureStorage(formData.image, 'mission');
      // Use blobUrl returned from Azure
      const imageUrl = uploadResponse.blobUrl || uploadResponse.url || uploadResponse.fileUrl;

      // 2. Create mission record with string URL
      const missionPayload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      await createMission(missionPayload);
      navigate('/admin/web-management/mission');
    } catch (err) {
      console.error('Error creating mission:', err.response || err);
      const serverMsg = err.response?.data?.message || err.message;
      setError(serverMsg || 'Failed to create mission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Add Mission</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Mission Title *</Label>
      <Input
        name="title"
        value={formData.title}
      onChange={(e)=>
      {
        const filteredData = e.target.value.replace(/[^a-zA-Z]/g, '');
        setFormData((prev) => ({ ...prev, title: filteredData }));
      }
      }
        placeholder="Enter  title"
      />

      <Label>Mission Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
      onChange={(e)=>
      {
        const filteredData = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setFormData((prev) => ({ ...prev, description: filteredData }));
      }
      }
        rows={5}
        placeholder="Enter  description"
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
        {loading ? 'Creating...' : 'Create Mission'}
      </UploadButton>
    </Container>
  );
};

export default AddMission;
