// src/module/admin/components/AddMission/AddMission.jsx
import React, { useEffect, useState, useRef, useMemo } from 'react';
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
} from './AddMission.styles';
import uploadIcon from '../../../../../../assets/upload.png';
import { useNavigate } from 'react-router-dom';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { createMission } from '../../../../../../api/missionApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';
import JoditEditor from 'jodit-react';

export default function AddMission() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAuth();
      if (!response.isSuperAdmin) {
        setReadOnlyPermissions(response.Permissions.webManagement.readOnly);
        if (response.Permissions.webManagement.readOnly) {
          toast.error('You do not have permission to add mission.', {
            onClose: () => navigate('/admin/')
          });
        }
      }
    })();
  }, [navigate]);

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
    setFormData(prev => ({ ...prev, image: file }));
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
    if (!formData.image) {
      toast.error('Please select an image.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const uploadResp = await uploadFileToAzureStorage(formData.image, 'mission');
      const imageUrl = uploadResp.blobUrl || uploadResp.url || uploadResp.fileUrl;
      await createMission({ ...formData, image: imageUrl });
      toast.success('Mission created successfully!');
      setTimeout(() => navigate('/admin/web-management/mission'), 1000);
    } catch (err) {
      console.error('Error creating mission:', err);
      toast.error(err.response?.data?.message || 'Failed to create mission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <Title>Add Mission</Title>
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
        onChange={() => { /* no-op: we update on blur */ }}
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
              <ImageIcon><img src={uploadIcon} alt="Upload" width={50} /></ImageIcon>
              <DropZoneText>Drag & drop image here, or click to select</DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading || readOnlyPermissions}>
        {loading ? 'Creating...' : 'Create Mission'}
      </UploadButton>
    </Container>
  );
}
