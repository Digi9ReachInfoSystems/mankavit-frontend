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
  SubmitButton
} from './AddAchievement.styles';
import upload from '../../../../../../assets/upload.png';
import { createAchiever, updateAchieverById} from '../../../../../../api/achieverApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddAchievements = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rank: '',
    examDetails: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const { studentName, rank, examDetails, image } = formData;
    
    if (!studentName || !rank || !examDetails || !image) {
        notification.warning({
            message: "Validation Error",
            description: "Please fill all fields and upload an image.",
        });
        return;
    }

    setLoading(true);

    try {
        // 1. Upload image to Azure
        console.log("Uploading file:", image);
        const uploadResponse = await uploadFileToAzureStorage(image, "achievers");
        
        console.log("Upload response:", uploadResponse);
        
        // Fix: Check for blobUrl instead of url
        if (!uploadResponse?.blobUrl) {
            throw new Error("Image upload failed - no URL returned");
        }

        // 2. Create achiever record
        const achieverData = {
            name: studentName,
            rank: rank,
            exam_name: examDetails,
            image: uploadResponse.blobUrl, // Use blobUrl here
        };
        
        console.log("Submitting achiever data:", achieverData);
        const creationResponse = await createAchiever(achieverData);
        console.log("Creation response: gfgfhf", creationResponse);
        if (!creationResponse) {
            throw new Error(creationResponse?.message || "Achiever creation failed");
        }

        notification.success({
            message: "Success",
            description: "Achiever created successfully!",
        });

        // Reset form
        setFormData({
            studentName: '',
            rank: '',
            examDetails: '',
            image: null
        });
        setPreviewImage(null);
        setTimeout(() => {
          navigate("/admin/web-management/achievement");
        })
        

    } catch (error) {
        console.error("Detailed error:", error);
        notification.error({
            message: "Error",
            description: error.response?.data?.message || 
                       error.message || 
                       "Failed to create achiever. Please check console for details.",
        });
    } finally {
        setLoading(false);
    }
};

  return (
    <Container>
      <Title>Add Achievement</Title>

      <Label>Student Name</Label>
      <Input
        name="studentName"
        placeholder="Enter name "
        value={formData.studentName}
        onChange={handleChange}
      />

      <Label>Write Rank</Label>
      <Input
        name="rank"
        placeholder="Enter rank"
        value={formData.rank}
        onChange={handleChange}
      />

      <Label>Exam details</Label>
      <TextArea
        name="examDetails"
        placeholder="Enter exam details"
        value={formData.examDetails}
        onChange={handleChange}
      />

      <Label>Upload Student Image</Label>
      <DropZone>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
          {previewImage ? (
            <img 
              src={previewImage} 
              alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: '200px' }} 
            />
          ) : (
            <>
              <ImageIcon>
                <img src={upload} alt="upload" width="50px" height="50px" />
              </ImageIcon>
              <DropZoneText>Drag and drop image here, or click add image</DropZoneText>
              <AddImageText>Add Image</AddImageText>
            </>
          )}
        </label>
      </DropZone>

      {formData.image && (
        <div style={{ marginTop: '10px' }}>
          Selected file: {formData.image.name}
        </div>
      )}

      <SubmitButton 
        type="primary" 
        onClick={handleSubmit} 
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit achievement'}
      </SubmitButton>
    </Container>
  );
};

export default AddAchievements;