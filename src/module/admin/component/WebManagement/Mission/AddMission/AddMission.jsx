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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.warning('Image size should be less than 5MB.');
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

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and Description are required.');
      return;
    }
    if (!formData.image) {
      toast.error('Please select an image.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const uploadResponse = await uploadFileToAzureStorage(formData.image, 'mission');
      const imageUrl = uploadResponse.blobUrl || uploadResponse.url || uploadResponse.fileUrl;

      const missionPayload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      await createMission(missionPayload);
      toast.success('Data created successfully!');
      setTimeout(() => navigate('/admin/web-management/mission'), 3000);
    } catch (err) {
      console.error('Error creating mission:', err.response || err);
      const serverMsg = err.response?.data?.message || err.message;
      toast.error(serverMsg || 'Failed to create data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Title>Add Mission</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Mission Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z ]/g, '');
          setFormData((prev) => ({ ...prev, title: filteredData }));
        }}
        placeholder="Enter title"
      />

      <Label>Mission Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
          setFormData((prev) => ({ ...prev, description: filteredData }));
        }}
        rows={5}
        placeholder="Enter description"
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
