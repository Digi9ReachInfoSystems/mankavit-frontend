import React, { useEffect, useRef, useState } from 'react';
import {
  FormContainer,
  Title,
  InputGroup,
  InputField,
  Label,
  SubmitButton,
  FlexRow,
  PasswordInputWrapper,
  PasswordToggle,
  UploadSection,
  UploadButton,
  UploadedFileName,
  BrowseButton,
  FlexUpload,
  CourseSelection,
  CourseCheckbox,
  CourseLabel,
  CourseList,
  CourseItem,
  ErrorMessage
} from './AddStudent.styles';
import { createStudent } from '../../../../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineFileUpload } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadFileToAzureStorage } from '../../../../../utils/azureStorageService';
import { getAllCourses } from '../../../../../api/courseApi';

const AddStudent = () => {
  const navigate = useNavigate();
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [courses, setCourses] = useState([]);
const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  const [studentData, setStudentData] = useState({
    email: '',
    password: '',
    phone: '',
    name: '',
    photo_url: '',
    first_name: '',
    last_name: '',
    age: '',
    id_proof: '',
    passport_photo: '',
    courseIds: [],
  });

  useEffect(() => {
   const fetchCourses = async () => {
  setIsLoadingCourses(true);
  try {
    const response = await getAllCourses();
    console.log('Courses API response:', response); // Debug log
    const coursesData = response?.data || response || [];
    console.log('Processed courses data:', coursesData); // Debug log
    setCourses(Array.isArray(coursesData) ? coursesData : []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    toast.error('Failed to load courses');
    setCourses([]);
  } finally {
    setIsLoadingCourses(false);
  }
};
fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => {
      const updated = { ...prev, [name]: value };
      // auto-populate `name` for the API
      if (name === 'first_name' || name === 'last_name') {
        updated.name = `${updated.first_name} ${updated.last_name}`.trim();
      }
      return updated;
    });
  };

  const handleCourseSelection = (courseId) => {
    setStudentData(prev => {
      const isSelected = prev.courseIds.includes(courseId);
      return {
        ...prev,
        courseIds: isSelected
          ? prev.courseIds.filter(id => id !== courseId)
          : [...prev.courseIds, courseId]
      };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(v => !v);
  };

  const handlePassportPhotoUploadClick = () => {
    passportPhotoInputRef.current.click();
  };
  const handleIDProofUploadClick = () => {
    idProofInputRef.current.click();
  };

  const uploadFile = async (file, containerName) => {
    try {
      const response = await uploadFileToAzureStorage(file, containerName);
      console.log('Upload response:', response);
      if (!response?.blobUrl) {
        throw new Error('Upload failed - no URL returned');
      }
      return response.blobUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) {
      return toast.error('Please select a valid image for passport photo');
    }
    setIsLoading(true);
    try {
      const url = await uploadFile(file, 'users');
      setStudentData(prev => ({
        ...prev,
        passport_photo: url,
        photo_url: url, // mirror into photo_url as well
      }));
      setPassportPhoto(file);
      toast.success('Passport photo uploaded!');
    } catch (err) {
      console.error(err);
      toast.error('Passport photo upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIDProofFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return toast.error('Please select a valid image (JPEG/PNG) or PDF file');
    }

    setIsLoading(true);
    try {
      const url = await uploadFile(file, 'users');
      setStudentData(prev => ({ ...prev, id_proof: url }));
      setIdProof(file);
      toast.success('ID proof uploaded!');
    } catch (err) {
      console.error(err);
      toast.error('ID proof upload failed');
    } finally {
      setIsLoading(false);
    }
  };

const validateForm = () => {
  const errs = {};
  
  // Required fields
  const requiredFields = [
    'first_name', 'last_name', 'age', 'email', 
    'phone', 'password', 'passport_photo', 'id_proof'
  ];
  
  requiredFields.forEach(field => {
    if (!studentData[field]) {
      errs[field] = `${field.replace('_', ' ')} is required`;
    }
  });

  // Course selection
  // if (studentData.courseIds.length === 0) {
  //   errs.courseIds = 'Please select at least one course';
  // }

  // Email validation
  if (studentData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email)) {
    errs.email = 'Invalid email format';
  }

  // Phone validation
  if (studentData.phone && !/^\+?\d{10,15}$/.test(studentData.phone)) {
    errs.phone = 'Invalid phone number (10-15 digits, + optional)';
  }

  console.log('Validation errors:', errs); // Debug log
  setFormErrors(errs);
  return Object.keys(errs).length === 0;
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('Form submission started'); // Debug log
  
  if (!validateForm()) {
    console.log('Form validation failed', formErrors); // Debug log
    return;
  }

  setIsLoading(true);
  console.log('Form is valid, submitting...'); // Debug log

  try {
    // Final check if files were uploaded
    let finalPassportPhoto = studentData.passport_photo;
    let finalIdProof = studentData.id_proof;

    // If we have file objects but no URLs, upload them now
    if (passportPhoto && !finalPassportPhoto) {
      console.log('Uploading passport photo...'); // Debug log
      finalPassportPhoto = await uploadFile(passportPhoto, 'users');
    }
    if (idProof && !finalIdProof) {
      console.log('Uploading ID proof...'); // Debug log
      finalIdProof = await uploadFile(idProof, 'users');
    }

    const payload = {
      ...studentData,
      passport_photo: finalPassportPhoto,
      id_proof: finalIdProof,
      photo_url: finalPassportPhoto,
    };

    console.log('Final payload:', payload); // Debug log
    
    const response = await createStudent(payload);
    console.log('API response:', response); // Debug log
    
    toast.success('Student created successfully!');
    setTimeout(() => navigate('/admin/student-management'), 1000);
  } catch (err) {
    console.error('Full submission error:', {
      message: err.message,
      response: err.response,
      stack: err.stack
    }); // Enhanced error logging
    toast.error(err.response?.data?.message || 'Failed to create student');
  } finally {
    setIsLoading(false);
  }
};

return (
  <FormContainer onSubmit={handleSubmit}>
    <Title>Add Student</Title>

    <FlexRow>
      <InputGroup>
        <Label>First Name*</Label>
        <InputField
          name="first_name"
          value={studentData.first_name}
          onChange={handleChange}
          placeholder="Enter First Name"
          disabled={isLoading}
        />
        {formErrors.first_name && <ErrorMessage>{formErrors.first_name}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Last Name*</Label>
        <InputField
          name="last_name"
          value={studentData.last_name}
          onChange={handleChange}
          placeholder="Enter Last Name"
          disabled={isLoading}
        />
        {formErrors.last_name && <ErrorMessage>{formErrors.last_name}</ErrorMessage>}
      </InputGroup>
    </FlexRow>

    <InputGroup>
      <Label>Age*</Label>
      <InputField
        type="number"
        name="age"
        value={studentData.age}
        onChange={handleChange}
        placeholder="Enter Age"
        min="10"
        max="100"
        disabled={isLoading}
      />
      {formErrors.age && <ErrorMessage>{formErrors.age}</ErrorMessage>}
    </InputGroup>

    <FlexRow>
      <InputGroup>
        <Label>Email*</Label>
        <InputField
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          disabled={isLoading}
        />
        {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Phone*</Label>
        <InputField
          type="tel"
          name="phone"
          value={studentData.phone}
          onChange={handleChange}
          placeholder="Enter Phone (e.g. +919876543210)"
          maxLength="15"
          disabled={isLoading}
        />
        {formErrors.phone && <ErrorMessage>{formErrors.phone}</ErrorMessage>}
      </InputGroup>
    </FlexRow>

    <InputGroup>
      <Label>Password*</Label>
      <PasswordInputWrapper>
        <InputField
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={studentData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          disabled={isLoading}
        />
        <PasswordToggle onClick={togglePasswordVisibility} disabled={isLoading}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </PasswordToggle>
      </PasswordInputWrapper>
      {formErrors.password && <ErrorMessage>{formErrors.password}</ErrorMessage>}
    </InputGroup>

    <FlexRow>
      <UploadSection $hasError={!!formErrors.passport_photo}>
        <Label>Passport Photo*</Label>
        <FlexUpload>
          <UploadButton 
            type="button" 
            onClick={handlePassportPhotoUploadClick}
            disabled={isLoading}
          >
            <MdOutlineFileUpload /> Upload
          </UploadButton>
          <BrowseButton 
            onClick={handlePassportPhotoUploadClick}
            disabled={isLoading}
          >
            Browse
          </BrowseButton>
        </FlexUpload>
        <input
          type="file"
          ref={passportPhotoInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handlePassportPhotoFileChange}
          disabled={isLoading}
        />
        {passportPhoto && (
          <UploadedFileName>
            {passportPhoto.name}
          </UploadedFileName>
        )}
        {formErrors.passport_photo && (
          <ErrorMessage>{formErrors.passport_photo}</ErrorMessage>
        )}
      </UploadSection>

      <UploadSection $hasError={!!formErrors.id_proof}>
        <Label>ID Proof*</Label>
        <FlexUpload>
          <UploadButton 
            type="button" 
            onClick={handleIDProofUploadClick}
            disabled={isLoading}
          >
            <MdOutlineFileUpload /> Upload
          </UploadButton>
          <BrowseButton 
            onClick={handleIDProofUploadClick}
            disabled={isLoading}
          >
            Browse
          </BrowseButton>
        </FlexUpload>
        <input
          type="file"
          ref={idProofInputRef}
          style={{ display: 'none' }}
          accept="image/*,application/pdf"
          onChange={handleIDProofFileChange}
          disabled={isLoading}
        />
        {idProof && (
          <UploadedFileName>
            {idProof.name}
          </UploadedFileName>
        )}
        {formErrors.id_proof && (
          <ErrorMessage>{formErrors.id_proof}</ErrorMessage>
        )}
      </UploadSection>
    </FlexRow>

    <CourseSelection $hasError={!!formErrors.courseIds}>
      <Label style={{backgroundColor: "lightgrey",
        padding: "5px",
        borderRadius: "5px",
      }}>Select Courses*</Label>
      {isLoadingCourses ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <>
          <CourseList>
            {courses.map(course => (
              <CourseItem key={course._id}>
                <CourseCheckbox
                  type="checkbox"
                  id={`course-${course._id}`}
                  checked={studentData.courseIds.includes(course._id)}
                  onChange={() => handleCourseSelection(course._id)}
                  disabled={isLoading}
                />
                <CourseLabel htmlFor={`course-${course._id}`}>
                  {course.courseDisplayName}
                </CourseLabel>
              </CourseItem>
            ))}
          </CourseList>
          {formErrors.courseIds && <ErrorMessage>{formErrors.courseIds}</ErrorMessage>}
        </>
      )}
    </CourseSelection>

    <SubmitButton type="submit" disabled={isLoading}>
      {isLoading ? 'Creating Student...' : 'Add Student'}
    </SubmitButton>

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
  </FormContainer>
);
}
export default AddStudent;