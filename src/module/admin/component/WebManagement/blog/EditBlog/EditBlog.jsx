import React, { useEffect, useState } from "react";
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
  ErrorMessage,
} from "./EditBlog.styles";
import { useParams, useNavigate } from "react-router-dom";
import uploadIcon from "../../../../../../assets/upload.png";
import { getBlogById, updateBlogById } from "../../../../../../api/blogApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '',
    image: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        console.log("API Response:", response); // Debug log
        
        if (response && response.success && response.blog) {
          setFormData({
            title: response.blog.title,
            description: response.blog.description
          });
          setPreviewUrl(response.blog.image);
        } else {
          setError(response?.message || 'Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
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
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and Description are required.');
      return;
    }

    setError('');
    setSubmitting(true);

  
      try {
        let imageUrl = previewUrl;
        if (imageFile) {
          const uploadResponse = await uploadFileToAzureStorage(imageFile, 'blog');
          imageUrl = uploadResponse.blobUrl || uploadResponse.url || uploadResponse.fileUrl;
        }
  
      const payload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl
      };

      console.log("Update payload:", payload); // Debug log
      
      const updateResponse = await updateBlogById(id, payload);
      console.log("Update response:", updateResponse); // Debug log
      
      if (updateResponse?.success) {
        navigate('/admin/web-management/blog');
      } else {
        throw new Error(updateResponse?.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating blog:', err);
      setError(err.message || 'Failed to update blog. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>Edit Blog</Title>
        <p>Loading blog details...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Edit Blog</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter title"
      />

      <Label>Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={5}
        placeholder="Enter description"
      />

      <Label>Image</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
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

      <UploadButton onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Updating..." : "Update"}
      </UploadButton>
    </Container>
  );
};

export default EditBlog;