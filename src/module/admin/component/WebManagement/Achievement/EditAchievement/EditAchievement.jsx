import React, { useState, useEffect } from 'react';
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
  AddImageText,
  SubmitButton
} from './EditAchievement.style';
import upload from '../../../../../../assets/upload.png';
import { getAchieverById, updateAchieverById } from '../../../../../../api/achieverApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { notification } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { getAuth } from '../../../../../../utils/authService';

const EditAchievement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    rank: '',
    examDetails: '',
    image: null,
    sequence: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  
    useEffect(() => {
      const apiCaller = async () => {
        const response = await getAuth();
        response.Permissions;
        if (response.isSuperAdmin === true) {
          setReadOnlyPermissions(false);
        } else {
          setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
          if (response.Permissions["webManagement"].readOnly) {
            toast.error('You do not have permission to edit Achievements.', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              onClose: () => {
                navigate('/admin/');
              }
            });
          }
        }
      }
      apiCaller();
    }, []);

  useEffect(() => {
    const fetchAchiever = async () => {
      try {
        setLoading(true);
        const response = await getAchieverById(id);
        if (response) {
          setFormData({
            studentName: response.name || '',
            rank: response.rank || '',
            examDetails: response.exam_name || '', // Make sure this matches your API response
            image: null,
            sequence: response.sequence
          });
          setExistingImageUrl(response.image || '');
        }
      } catch (error) {
        console.error("Error fetching achiever:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch achiever details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAchiever();
  }, [id]);

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
    const { studentName, rank, examDetails, image, sequence } = formData;
    
    if (!studentName || !rank || !examDetails) {
          toast.error("Please fill all required fields.");
      notification.warning({
        message: "Validation Error",
        description: "Please fill all required fields.",
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl = existingImageUrl;
      
      // Upload new image if provided
      if (image) {
        console.log("Uploading new image:", image);
        const uploadResponse = await uploadFileToAzureStorage(image, "achievers");
        
        if (!uploadResponse?.blobUrl) {
          throw new Error("Image upload failed - no URL returned");
        }
        imageUrl = uploadResponse.blobUrl;
      }

      // Update achiever record - ensure field names match your API expectations
      const achieverData = {
        name: studentName,
        rank: rank,
        exam_name: examDetails, // Make sure this matches your backend field name
        image: imageUrl,
        sequence: sequence
      };
      
      console.log("Updating achiever data:", achieverData);
      const updateResponse = await updateAchieverById(id, achieverData);
      console.log("Update response:", updateResponse);
      if (!updateResponse) {
        throw new Error(updateResponse?.message || "Achiever update failed");
      }

      // notification.success({
      //   message: "Success",
      //   description: "Achiever updated successfully!",
      // });

       toast.success("Data updated successfully!");
    setTimeout(() => {
      navigate("/admin/web-management/achievement");
    }, 1000);

    } catch (error) {
      console.error("Detailed error:", error);
      toast.error("Failed to update. Please try again.");
      notification.error({
        message: "Error",
        description: error.response?.data?.message || 
                   error.message || 
                   "Failed to update achiever. Please check console for details.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>

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

      <Title>Edit Achievement</Title>

      <Label>Student Name</Label>
      <Input
        name="studentName"
        placeholder="Enter student name"
        value={formData.studentName}
    onChange={(e)=>{
      const filteredData = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Remove non-alphabetic characters
      setFormData({ ...formData, studentName: filteredData });
    }}
      />

      <Label>Write Rank</Label>
      <Input
        name="rank"
        placeholder="write here"
        value={formData.rank}
        onChange={handleChange}
      />

      <Label>Exam details</Label>
      <TextArea
        name="examDetails" // Make sure this matches your state property
        placeholder="Write here"
        value={formData.examDetails}
        onChange={handleChange}
      />
       <Label>Sequence</Label>
      <Input
        name="sequence"
        placeholder="Enter sequence (e.g. 1, 1.1, 2, 2.1)"
        value={formData.sequence}
        onChange={(e) => {
          // allow only numbers and dot
          const filteredValue = e.target.value.replace(/[^0-9.]/g, '');
          setFormData(prev => ({ ...prev, sequence: filteredValue }));
        }}
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
          ) : existingImageUrl ? (
            <img 
              src={existingImageUrl} 
              alt="Existing" 
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
        {loading ? 'Updating...' : 'Update achievement'}
      </SubmitButton>
    </Container>
  );
};

export default EditAchievement;