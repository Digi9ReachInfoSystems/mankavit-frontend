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

import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService'; // Adjust import as needed
import { createBlog } from '../../../../../../api/blogApi'; // Adjust import as needed

// Import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  // Remove or keep error state if you want inline errors too
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      // setError('Please upload a valid image file.');
      toast.warn('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // setError('Image size should be less than 5MB.');
      toast.warn('Image size should be less than 5MB.');
      return;
    }

    // setError('');
    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      // setError('Title and Description are required.');
      toast.error('Title and Description are required.');
      return;
    }
    if (!formData.image) {
      // setError('Please select an image.');
      toast.error('Please select an image.');
      return;
    }

    // setError('');
    setLoading(true);

    try {
      // 1. Upload image to Azure and get URL
      const uploadResponse = await uploadFileToAzureStorage(formData.image, 'blog');
      const imageUrl = uploadResponse.blobUrl || uploadResponse.url || uploadResponse.fileUrl;

      const blogPayload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      await createBlog(blogPayload);
      toast.success('Data created successfully!');
      setTimeout(() => {
        navigate('/admin/web-management/blog');
      }, 1000); // wait for toast to show before navigating
    } catch (err) {
      console.error('Error creating blog:', err.response || err);
      const serverMsg = err.response?.data?.message || err.message;
      // setError(serverMsg || 'Failed to create blog. Please try again.');
      toast.error(serverMsg || 'Failed to create data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Add Blog</Title>
      {/* If you want inline error message keep this else remove */}
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}

      <Label>Blog *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z ]/g, '');
          setFormData((prev) => ({ ...prev, title: filteredData }));
        }}
        placeholder="Enter title"
      />

      <Label>Blog Description *</Label>
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
              <DropZoneText>Drag & drop image here, or click to select</DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating…' : 'Create'}
      </UploadButton>

      {/* Toast container */}
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

export default AddBlog;
