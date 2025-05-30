import React, { useState, useEffect } from 'react';
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
} from './EditTestimonial.style';
import uploadIcon from "../../../../../../assets/upload.png";
import { getTestimonialById, updateTestimonialById} from '../../../../../../api/testimonialApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCourses } from '../../../../../../api/courseApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTestimonial = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    testimonialDetails: '',
    image: null,
    existingImageUrl: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [CoursesCheckboxes, setCoursesCheckboxes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonial = await getTestimonialById(id);
        setFormData({
          studentName: testimonial.name,
          course: testimonial.rank,
          testimonialDetails: testimonial.description,
          image: null,
          existingImageUrl: testimonial.testimonial_image
        });
        setPreviewUrl(testimonial.testimonial_image);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching testimonial:", error);
        setError('Failed to load testimonial');
        toast.error('Failed to load testimonial');
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

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
    // Validate all fields except image (since we might keep existing image)
    if (!formData.studentName || !formData.course || !formData.testimonialDetails) {
      setError('Please fill all required fields');
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      let imageUrl = formData.existingImageUrl;

      // Only upload new image if one was selected
      if (formData.image) {
        const uploadResult = await uploadFileToAzureStorage(formData.image, "upload");
        if (!uploadResult || !uploadResult.url) {
          throw new Error('Image upload failed');
        }
        imageUrl = uploadResult.url;
      }

      // Prepare testimonial data
      const payload = {
        name: formData.studentName,
        rank: formData.course,
        description: formData.testimonialDetails,
        testimonial_image: imageUrl,
      };

      // Update testimonial
      await updateTestimonialById(id, payload);

      toast.success('Data updated successfully');

      // Success - redirect
      setTimeout(() => {
         navigate("/admin/web-management/testinomial", {
        state: { success: true }
      }), 2000});

    } catch (error) {
      console.error("Error updating testimonial:", error);
      setError(error.message || 'Something went wrong. Please try again.');
      toast.error(error.message || 'Failed to update data. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>Edit Testimonial</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Student Name *</Label>
      <Input
        name="studentName"
        placeholder="Enter student name"
        value={formData.studentName}
        onChange={(e)=>{
          const filteredData = e.target.value.replace(/[^a-zA-Z ]/g, '');
          setFormData({ ...formData, studentName: filteredData });
        }}
      />

      <Label>Testimonial Details *</Label>
      <TextArea
        name="testimonialDetails"
        placeholder="Enter testimonials description"
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
                      {CoursesCheckboxes.map((item, index) => (
                        <CheckboxLabel  key={index}>
                          <CheckboxInput 
                          type="checkbox"
                          checked={item.checked} 
                          onChange={() => handleCheckboxChange(index, setCoursesCheckboxes)}
                           />{item.label}
                        </CheckboxLabel>
                      ))}
                    </CheckboxList>      
              </Column>
            </FormRow>

      <Label>Student Image</Label>
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
            {formData.image ? formData.image.name : "Change Image (Optional)"}
          </AddImageText>
        </label>
      </DropZone>

      <UploadButton 
        onClick={handleSubmit} 
        disabled={isUploading}
      >
        {isUploading ? "Updating..." : "Update Testimonial"}
      </UploadButton>

      
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
    </Container>
  );
};

export default EditTestimonial;