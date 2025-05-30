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
} from './AddWhyStudyWithUs.styles';

import uploadIcon from '../../../../../../assets/upload.png';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { createWhy } from '../../../../../../api/whyApi';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddWhyStudyWithUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
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
      toast.warn('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      toast.warn('Image size should be less than 5MB.');
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
      const msg = 'Title and Description are required.';
      setError(msg);
      toast.warn(msg);
      return;
    }
    if (!formData.image) {
      const msg = 'Please select an image.';
      setError(msg);
      toast.warn(msg);
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1) Upload to Azure
      const uploadResult = await uploadFileToAzureStorage(
        formData.image,
        'why'
      );

      console.log('Azure upload result:', uploadResult);

      // 2) Pick out the URL from whatever shape the backend returned
      const imageUrl =
        uploadResult?.url ??
        uploadResult?.fileUrl ??
        uploadResult?.filePath ??
        uploadResult?.blobUrl ??
        (typeof uploadResult === 'string' ? uploadResult : null);

      if (!imageUrl) {
        throw new Error(
          `Unexpected upload response format: ${JSON.stringify(
            uploadResult
          )}`
        );
      }

      // 3) Create the "Why" record
      await createWhy({
        title: formData.title,
        description: formData.description,
        image: imageUrl
      });

      toast.success('Data created successfully!');
      // 4) Navigate back on success after a short delay for toast visibility
      setTimeout(() => {
        navigate('/admin/web-management/why-study-with-us');
      }, 1500);
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to create data, please try again.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Add Why Study With Us</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Why Study With Us Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setFormData((prev) => ({ ...prev, title: filteredData }));
        }}
        placeholder="Enter title"
      />

      <Label>Why Study With Us Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
          setFormData((prev) => ({ ...prev, description: filteredData }));
        }}
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
    </Container>
  );
};

export default AddWhyStudyWithUs;
