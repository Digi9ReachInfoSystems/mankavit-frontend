import React, { useState,useEffect } from 'react';
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
import { createAchiever } from '../../../../../../api/achieverApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { getAuth } from '../../../../../../utils/authService';

const AddAchievements = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rank: '',
    examDetails: '',
    image: null,
    sequence: ''
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
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
          toast.error('You do not have permission to  add achievements.', {
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

    if (!studentName || !rank || !examDetails || !image) {
      toast.error("Please fill all fields and upload an image.");
      notification.warning({
        message: "Validation Error",
        description: "Please fill all fields and upload an image.",
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Upload image to Azure
      // // console.log("Uploading file:", image);
      const uploadResponse = await uploadFileToAzureStorage(image, "achievers");

      // // console.log("Upload response:", uploadResponse);

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
         sequence: parseFloat(sequence)
      };

      // // console.log("Submitting achiever data:", achieverData);
      const creationResponse = await createAchiever(achieverData);
      // // console.log("Creation response: gfgfhf", creationResponse);
      if (!creationResponse) {
        throw new Error(creationResponse?.message || "Achiever creation failed");
      }

      toast.success("Data added successfully!");

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
      }, 1000)


    } catch (error) {
      // // console.error("Detailed error:", error);
      toast.error("Failed to add. Please try again")
      notification.error({
        message: "Error",
        description: error.response?.data?.message ||
          error.message ||
          "Failed to create achiever. Please check // console for details.",
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

      <Title>Add Achievement</Title>

      <Label>Student Name</Label>
      <Input
        name="studentName"
        placeholder="Enter student name "
        value={formData.studentName}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
          setFormData(prev => ({ ...prev, studentName: filteredData }));
        }}
      />

      <Label>Rank</Label>
      <Input
        name="rank"
        placeholder="Enter rank"
        value={formData.rank}
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

      <Label>Tag</Label>
      <TextArea
        name="examDetails"
        placeholder="Enter tag"
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