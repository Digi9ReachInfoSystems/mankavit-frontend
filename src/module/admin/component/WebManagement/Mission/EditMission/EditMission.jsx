// src/module/admin/components/EditMission/EditMission.jsx
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  ErrorMessage
} from './EditMission.styles';
import uploadIcon from '../../../../../../assets/upload.png';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { getMissionById, updateMissionById } from '../../../../../../api/missionApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';
import JoditEditor from 'jodit-react';

const EditMission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [formData, setFormData] = useState({ title: '', description: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAuth();
      if (!response.isSuperAdmin) {
        const readOnly = response.Permissions.webManagement.readOnly;
        setReadOnlyPermissions(readOnly);
        if (readOnly) {
          toast.error('You do not have permission to edit missions.', {
            onClose: () => navigate('/admin/')
          });
        }
      }
    })();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getMissionById(id);
        setFormData({ title: data.title, description: data.description });
        setPreviewUrl(data.image);
      } catch (err) {
        console.error('Error fetching mission:', err);
        toast.error('Failed to load mission. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
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
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Enter mission description...'
  }), []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and Description are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      let imageUrl = previewUrl;
      if (imageFile) {
        const uploadResp = await uploadFileToAzureStorage(imageFile, 'mission');
        imageUrl = uploadResp.blobUrl || uploadResp.url || uploadResp.fileUrl;
      }

      await updateMissionById(id, { ...formData, image: imageUrl });
      toast.success('Data updated successfully!');
      setTimeout(() => navigate('/admin/web-management/mission'), 1000);
    } catch (err) {
      console.error('Error updating mission:', err);
      toast.error(err.response?.data?.message || 'Failed to update mission.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Container>Loading mission...</Container>;

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <Title>Edit Mission</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Mission Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter title"
      />

      <Label>Mission Description *</Label>
      <JoditEditor
        ref={editor}
        value={formData.description}
        config={editorConfig}
        tabIndex={1}
        onBlur={newContent => setFormData(prev => ({ ...prev, description: newContent }))}
        onChange={() => { /* no-op: update on blur */ }}
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
              <ImageIcon><img src={uploadIcon} alt="Upload" width={50} /></ImageIcon>
              <DropZoneText>Drag & drop image here, or click to select</DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={submitting || readOnlyPermissions}>
        {submitting ? 'Updating...' : 'Update Mission'}
      </UploadButton>
    </Container>
  );
};

export default EditMission;
