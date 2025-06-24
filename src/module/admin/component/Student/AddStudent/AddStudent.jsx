import React, { useRef, useState } from 'react';
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
} from './AddStudent.styles';
import { createStudent } from '../../../../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from 'antd';
import { MdOutlineFileUpload } from 'react-icons/md';

const AddStudent = () => {
  const navigate = useNavigate();
    const passportPhotoInputRef = useRef(null);
    const idProofInputRef = useRef(null);
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [uploadedIDProof, setUploadedIDProof] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalFile, setModalFile] = useState(null);

  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

    const handlePassportPhotoUploadClick = () => passportPhotoInputRef.current.click();
    const handleIDProofUploadClick = () => idProofInputRef.current.click();
    const handleFileClick = (file) => setModalFile(file);

    const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return alert('Select a valid image');
    setIsLoading(true);
    try {
      // const { url } = await uploadFileToAzureStorage(file, 'users');
      setPassportPhoto({ name: file.name, file, type: file.type });
    } catch {
      alert('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

    const handleIDProofFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    try {
      // const { url } = await uploadFileToAzureStorage(file, 'users');
      setUploadedIDProof({ name: file.name, file, type: file.type });
    } catch {
      alert('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!studentData.name) errors.name = 'Name is required';
    if (!studentData.email) errors.email = 'Email is required';
    if (!studentData.phone) errors.phone = 'Phone is required';
    if (!studentData.password) errors.password = 'Password is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await createStudent(studentData);
      console.log('Response:', response);

      // Reset form
      setStudentData({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
      setFormErrors({});
      toast.success('Student created successfully!');
      setTimeout(()=> navigate('/admin/student-management'),1000);
    } catch (error) {
      console.error('Error creating student:', error);
      toast.error('Failed to create student. Please try again.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Add Student</Title>

       <FlexRow>
      <InputGroup>
        <Label>First Name</Label>
        <InputField
          placeholder="Enter First Name"
          name="name"
          value={studentData.name}
          onChange={handleChange}
        />
        {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
      </InputGroup>

      <InputGroup>
        <Label>Last Name</Label>
        <InputField
          placeholder="Enter Last Name"
          name="username"
          value={studentData.lastname}
          onChange={handleChange}
        />
      </InputGroup>
      </FlexRow>

      <InputGroup>
        <Label>Age</Label>
        <InputField
          placeholder="Enter age"
          name="username"
          value={studentData.age}
          onChange={handleChange}
        />
        </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email</Label>
          <InputField
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={studentData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </InputGroup>
        <InputGroup>
          <Label>Mobile Number</Label>
          <InputField
            type="tel"
            placeholder="Enter Mobile Number"
            name="phone"
            value={studentData.phone}
            onChange={handleChange}
            maxLength={10}
          />
          {formErrors.phone && <p style={{ color: 'red' }}>{formErrors.phone}</p>}
        </InputGroup>
      </FlexRow>

      <InputGroup>
        <Label>Password</Label>
        <PasswordInputWrapper>
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            value={studentData.password}
            onChange={handleChange}
          />
          <PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </PasswordInputWrapper>
        {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
      </InputGroup>

       <FlexRow>
                  <UploadSection>
                    <Label>Passport Photo</Label>
                    <FlexUpload>
                      <UploadButton onClick={handlePassportPhotoUploadClick}>
                        <MdOutlineFileUpload /> Upload
                      </UploadButton>
                      <BrowseButton onClick={handlePassportPhotoUploadClick}>Browse</BrowseButton>
                    </FlexUpload>
                    <input
                      type="file"
                      ref={passportPhotoInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handlePassportPhotoFileChange}
                    />
                    {passportPhoto && (
                      <UploadedFileName onClick={() => handleFileClick(passportPhoto)}>
                        {passportPhoto.name}
                      </UploadedFileName>
                    )}
                  </UploadSection>
      
                  <UploadSection>
                    <Label>ID Proof</Label>
                    <FlexUpload>
                      <UploadButton onClick={handleIDProofUploadClick}>
                        <MdOutlineFileUpload /> Upload
                      </UploadButton>
                      <BrowseButton onClick={handleIDProofUploadClick}>Browse</BrowseButton>
                    </FlexUpload>
                    <input
                      type="file"
                      ref={idProofInputRef}
                      style={{ display: 'none' }}
                      accept="image/*,application/pdf"
                      onChange={handleIDProofFileChange}
                    />
                    {uploadedIDProof && (
                      <UploadedFileName onClick={() => handleFileClick(uploadedIDProof)}>
                        {uploadedIDProof.name}
                      </UploadedFileName>
                    )}
                  </UploadSection>
                </FlexRow>

      <SubmitButton type="submit">Add Student</SubmitButton>

            {/* Toast Container for react-toastify */}
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