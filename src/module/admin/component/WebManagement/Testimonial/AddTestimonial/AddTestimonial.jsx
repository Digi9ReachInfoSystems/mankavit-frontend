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
  AddImageText,
  UploadButton,
  PreviewImage,
  ErrorMessage
} from './AddTestimonial.styles';
import uploadIcon from "../../../../../../assets/upload.png";
import { createTestimonials } from '../../../../../../api/testimonialApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { useNavigate } from 'react-router-dom';

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    testimonialDetails: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      if (!file.type.match('image.*')) {
        setError('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }

      setError('');
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    if (!formData.studentName || !formData.course || !formData.testimonialDetails || !formData.image) {
      setError('Please fill all fields and upload an image');
      return;
    }
  
    try {
      setIsUploading(true);
      setError('');
  
      const uploadResult = await uploadFileToAzureStorage(formData.image, "upload");
      console.log("uploadResult", uploadResult);
  
      if (!uploadResult || !uploadResult.blobUrl) {
        throw new Error(uploadResult?.message || 'Image upload failed');
      }
  
      const payload = {
        name: formData.studentName,
        rank: formData.course,
        description: formData.testimonialDetails,
        testimonial_image: uploadResult.blobUrl, // Fixed key here
      };
      console.log("payload", payload);
  
      const testimonialResponse = await createTestimonials(payload);
      console.log("Testimonial created:", testimonialResponse);
  
      navigate("/admin/web-management/testinomial", {
        state: { success: true }
      });
  
    } catch (error) {
      console.error("Error uploading testimonial:", error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <Container>
      <Title>Add Testimonial</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Student Name *</Label>
      <Input
        name="studentName"
        placeholder="Gaurav"
        value={formData.studentName}
        onChange={handleInputChange}
      />

      <Label htmlFor="course">Enter aspiring details</Label>
      <Input
        name="course"
        placeholder="Enter aspiring details"
        value={formData.course}
        onChange={handleInputChange}
        id='course' required
      />

      <Label htmlFor='testimonialDetails'>Testimonial description *</Label>
      <TextArea
        name="testimonialDetails"
        placeholder="Write here"
        value={formData.testimonialDetails}
        onChange={handleInputChange}
        rows={5}
        id='testimonialDetails' required
      />

      <Label>Upload Student Image *</Label>
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
                <img src={uploadIcon} alt="upload" width="50" height="50" />
              </ImageIcon>
              <DropZoneText>Drag and drop image here, or click add image</DropZoneText>
            </>
          )}
          <AddImageText>
            {formData.image ? formData.image.name : "Add Image"}
          </AddImageText>
        </label>
      </DropZone>

      <UploadButton 
        onClick={handleSubmit} 
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Testimonial"}
      </UploadButton>
    </Container>
  );
};

export default AddTestimonial;