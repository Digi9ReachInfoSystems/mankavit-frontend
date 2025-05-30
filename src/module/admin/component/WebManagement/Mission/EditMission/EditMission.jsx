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
import uploadIcon from '../../../../../../assets/upload.png';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { getMissionById, updateMissionById } from '../../../../../../api/missionApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditMission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMission = async () => {
      setLoading(true);
      try {
        const data = await getMissionById(id);
        setFormData({ title: data.title, description: data.description });
        setPreviewUrl(data.image);
      } catch (err) {
        console.error('Error fetching mission:', err);
        setError('Failed to load mission. Please try again.');
          toast.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMission();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and Description are required.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      let imageUrl = previewUrl;
      if (imageFile) {
        const uploadResponse = await uploadFileToAzureStorage(imageFile, 'mission');
        imageUrl = uploadResponse.blobUrl || uploadResponse.url || uploadResponse.fileUrl;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };
      await updateMissionById(id, payload);
      toast.success('Data updated successfully!');
      setTimeout(() => navigate('/admin/web-management/mission'), 5000);

    } catch (err) {
      console.error('Error updating mission:', err.response || err);
      const serverMsg = err.response?.data?.message || err.message;
      setError(serverMsg || 'Failed to update mission. Please try again.');
      toast.error('Failed to update data. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <p>Loading mission...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Edit Mission</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Mission Title *</Label>
      <Input
        name="title"
        value={formData.title}
       onChange={(e)=>{
        const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setFormData(prev => ({ ...prev, title: filteredData }));
       }}
        placeholder="Enter  title"
      />

      <Label>Mission Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={(e)=>{
          const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setFormData(prev => ({ ...prev, description: filteredData }));
        }}
        rows={5}
        placeholder="Enter mission description"
      />

      <Label>Mission Image</Label>
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

      <UploadButton onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Updating...' : 'Update Mission'}
      </UploadButton>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Container>
  );
};

export default EditMission;
