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
  ErrorMessage,
  TextAreaField
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
    // fathers_name: '',
    // fathers_occupation: '',
    // current_occupation: '',
    // present_address: '',
    // passing_year: '',
    // college_name: '',
    date_of_birth: ''
  });
  console.log('studentData', studentData);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoadingCourses(true);
      try {
        const response = await getAllCourses();
        console.log('Courses API response:', response);
        const coursesData = response?.data || response || [];
        console.log('Processed courses data:', coursesData);
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

    if (name === 'first_name' || name === 'last_name') {
      const first = name === 'first_name' ? value : prev.first_name;
      const last = name === 'last_name' ? value : prev.last_name;
      updated.name = `${first} ${last}`.trim();
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
        photo_url: url,
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

    // Email validation
    if (studentData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email)) {
      errs.email = 'Invalid email format';
    }

    // Phone validation
    if (studentData.phone && !/^\+?\d{10,15}$/.test(studentData.phone)) {
      errs.phone = 'Invalid phone number (10-15 digits, + optional)';
    }

    console.log('Validation errors:', errs);
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    // Upload if needed
    let finalPassportPhoto = studentData.passport_photo;
    let finalIdProof = studentData.id_proof;

    if (passportPhoto && !finalPassportPhoto) {
      finalPassportPhoto = await uploadFile(passportPhoto, 'users');
    }
    if (idProof && !finalIdProof) {
      finalIdProof = await uploadFile(idProof, 'users');
    }

    // ✅ Final payload - MAKE SURE this is EXACT
    const payload = {
      email: studentData.email,
      password: studentData.password,
      phone: studentData.phone,
      name: studentData.name || `${studentData.first_name} ${studentData.last_name}`.trim(),
      photo_url: finalPassportPhoto,
      first_name: studentData.first_name,
      last_name: studentData.last_name,
      age: studentData.age,
      id_proof: finalIdProof,
      passport_photo: finalPassportPhoto,
      courseIds: studentData.courseIds,

      // fathers_name: studentData.fathers_name,
      // fathers_occupation: studentData.fathers_occupation,
      // current_occupation: studentData.current_occupation,
      // present_address: studentData.present_address,
      // passing_year: studentData.passing_year,
      // college_name: studentData.college_name,
      date_of_birth: studentData.date_of_birth,
    };

    console.log('Student Final Payload:', payload,studentData);

    const response = await createStudent(payload);
console.log('Create Student Response:', response);
    if (response.data.success) {
      toast.success('Student created successfully!');
      setTimeout(() => navigate('/admin/student-management'), 1000);
    } else {
      throw new Error(response.message || 'Failed to create student');
    }

  } catch (err) {
    console.error('Create Student Error:', err);
    toast.error(err.response?.data?.message || err.message || 'Failed to create student');
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

      <FlexRow>
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
        <InputGroup>
          <Label>Date of Birth</Label>
          <InputField
            type="date"
            name="date_of_birth"
            value={studentData.date_of_birth}
            onChange={handleChange}
            disabled={isLoading}
          />
        </InputGroup>
      </FlexRow>
{/* 
      <FlexRow>
        <InputGroup>
          <Label>Father's Name</Label>
          <InputField
            name="fathers_name"
            value={studentData.fathers_name}
            onChange={handleChange}
            placeholder="Enter Father's Name"
            disabled={isLoading}
          />
        </InputGroup>
        <InputGroup>
          <Label>Father's Occupation</Label>
          <InputField
            name="fathers_occupation"
            value={studentData.fathers_occupation}
            onChange={handleChange}
            placeholder="Enter Father's Occupation"
            disabled={isLoading}
          />
        </InputGroup>
      </FlexRow> */}

      {/* <InputGroup>
        <Label>Current Occupation</Label>
        <InputField
          name="current_occupation"
          value={studentData.current_occupation}
          onChange={handleChange}
          placeholder="Enter Current Occupation"
          disabled={isLoading}
        />
      </InputGroup>

      <InputGroup>
        <Label>Present Address</Label>
        <TextAreaField
          name="present_address"
          value={studentData.present_address}
          onChange={handleChange}
          placeholder="Enter Present Address"
          disabled={isLoading}
          rows="3"
        />
      </InputGroup> */}

      {/* <FlexRow>
        <InputGroup>
          <Label>College Name</Label>
          <InputField
            name="college_name"
            value={studentData.college_name}
            onChange={handleChange}
            placeholder="Enter College Name"
            disabled={isLoading}
          />
        </InputGroup>
        <InputGroup>
          <Label>Passing Year</Label>
          <InputField
            type="number"
            name="passing_year"
            value={studentData.passing_year}
            onChange={handleChange}
            placeholder="Enter Passing Year"
            min="1900"
            max={new Date().getFullYear() + 5}
            disabled={isLoading}
          />
        </InputGroup> */}
      {/* </FlexRow> */}

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

      <InputGroup style={{ width: '50%' }}>
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
        <Label style={{
          backgroundColor: "lightgrey",
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
};

export default AddStudent;