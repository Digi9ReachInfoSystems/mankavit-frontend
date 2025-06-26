import React, { useEffect, useState } from 'react';
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
  ErrorMessage,
  FormRow,
  Column,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxInput,
  CheckboxLabel
} from './AddTestimonial.styles';
import uploadIcon from "../../../../../../assets/upload.png";
import { createTestimonials } from '../../../../../../api/testimonialApi';
import { getAllCourses } from '../../../../../../api/courseApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    course: '', // This will store the selected course ID
    testimonialDetails: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const response = await getAllCourses();
        console.log("response", response);
        const checkboxes = response.data.map((item) => ({
          label: item?.courseName,
          id: item?._id,
          checked: false,
        }));

        console.log("checkboxes", checkboxes);
        setCoursesCheckboxes(checkboxes);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
      }
    };
    apiCaller();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = coursesCheckboxes.map((item, i) => ({
      ...item,
      checked: i === index ? !item.checked : false // Only allow one selection
    }));

    setCoursesCheckboxes(updatedCheckboxes);
    
    // Update the formData with the selected course ID
    const selectedCourse = updatedCheckboxes.find(item => item.checked);
    setFormData(prev => ({
      ...prev,
      course: selectedCourse ? selectedCourse.id : ''
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      if (!file.type.match('image.*')) {
        setError('Please upload an image file');
        toast.error('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        toast.warn('Image size should be less than 5MB');
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
      toast.error('Please fill all fields and upload an image');
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
        testimonial_image: uploadResult.blobUrl,
      };
      console.log("payload", payload);
  
      const testimonialResponse = await createTestimonials(payload);
      console.log("Testimonial created:", testimonialResponse);
      toast.success('Data added successfully');
      setTimeout(() => {
        navigate("/admin/web-management/testinomial", {
          state: { success: true }
        });
      }, 1000);
  
    } catch (error) {
      console.error("Error uploading testimonial:", error);
      setError(error.message || 'Something went wrong. Please try again.');
      toast.error(error.message || 'Failed to add data. Please try again.');
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
        placeholder="Enter student name"
        value={formData.studentName}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setFormData((prev) => ({ ...prev, studentName: filteredData }));
        }}
      />

      <Label htmlFor='testimonialDetails'>Testimonial description *</Label>
      <TextArea
        name="testimonialDetails"
        placeholder="Enter testimonial description"
        value={formData.testimonialDetails}
        onChange={handleInputChange}
        rows={5}
      />

      <FormRow>
        <Column>
          <CheckboxSectionTitle>
            Add Course (Click checkbox to Select)
          </CheckboxSectionTitle>
          <CheckboxList>
            {coursesCheckboxes.map((item, index) => (
              <CheckboxLabel key={item.id}>
                <CheckboxInput 
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
                {item.label}
              </CheckboxLabel>
            ))}
          </CheckboxList>      
        </Column>
      </FormRow>

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

export default AddTestimonial;