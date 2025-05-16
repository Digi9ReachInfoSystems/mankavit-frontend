import React, { useState, useEffect, useRef } from 'react';
import {
  FormContainer,
  Title,
  InputGroup,
  InputField,
  Label,
  UploadSection,
  UploadButton,
  BrowseButton,
  SubmitButton,
  FlexRow,
  FlexUpload
} from './AddStudent.styles';
import { MdOutlineFileUpload, MdDelete } from "react-icons/md";
import { useLocation } from 'react-router-dom';


const AddStudent = () => {
  const photoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  const location = useLocation();
  const studentData = location.state?.student;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    passport: '',
    idProof: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  const handlePhotoUploadClick = () => {
    photoInputRef.current.click();
  };

  const handleIDProofUploadClick = () => {
    idProofInputRef.current.click();
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPhotoPreview(fileURL);
      setFormData((prev) => ({ ...prev, passport: file }));
      setFormErrors((prev) => ({ ...prev, passport: '' }));
    }
  };

  const handleIDProofFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setIdProofPreview(fileURL);
      setIdProofFile(file);
      setFormData((prev) => ({ ...prev, idProof: file }));
      setFormErrors((prev) => ({ ...prev, idProof: '' }));
    }
  };


  const handleDeletePhoto = () => {
    setPhotoPreview(null);
    setFormData((prev) => ({ ...prev, passport: '' }));
  };
  
  
  const handleDeleteIDProof = () => {
    setIdProofPreview(null);
    setIdProofFile(null);
    setFormData((prev) => ({ ...prev, idProof: '' }));
  };


  useEffect(() => {
    if (studentData) {
      setFormData({
        fullName: studentData.name || '',
        email: studentData.email || '',
        phone: studentData.phone || '',
        passport: '',
        idProof: ''
      });
      setPhotoPreview(studentData.passport || null);
      setIdProofPreview(studentData.idProof || null);
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    if (name === 'fullName') {
      // Allow only letters and spaces, remove numbers and special characters
      newValue = newValue.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'phone') {
      // Allow only digits, remove letters and special characters
      newValue = newValue.replace(/[^0-9]/g, '');
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };
  

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Mobile Number is required.';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Enter a valid 10-digit number.';
    }
    if (!formData.passport) errors.passport = 'Photo is required.';
    if (!formData.idProof) errors.idProof = 'ID Proof is required.';
  
    console.log('Validation Errors:', errors);
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
   
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submit triggered with current data:', formData);
  
    if (validateForm()) {
      console.log('Validation passed. Submitting form...');
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('passport', formData.passport);
        formDataToSubmit.append('idProof', formData.idProof);
  
        // For debugging, log formData entries
        for (let [key, value] of formDataToSubmit.entries()) {
          console.log(`${key}:`, value);
        }
  
        alert('Student added successfully!');
      } catch (error) {
        console.error('Error adding student:', error);
        alert('Failed to add student. Please try again.');
      }
    } else {
      console.log('Validation failed. Check errors above.');
    }
  };
   
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>{studentData ? 'Edit Student' : 'Add Student'}</Title>

      <InputGroup>
        <Label>Full Name</Label>
        <InputField
          placeholder="Enter Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}

        />
        {formErrors.fullName && <p style={{ color: 'red' }}>{formErrors.fullName}</p>}
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email</Label>
          <InputField
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={formData.email}
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
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
          />
          {formErrors.phone && <p style={{ color: 'red' }}>{formErrors.phone}</p>}
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <UploadSection>
          <Label>Upload Photo <small>(Passport Size)</small></Label>
          <FlexUpload>
            <UploadButton type="button" onClick={handlePhotoUploadClick}>
              <MdOutlineFileUpload color='#C5C6C7' fontSize={20} style={{ marginRight: '10px' }} />
              Upload Document
            </UploadButton>
            <BrowseButton type="button" onClick={handlePhotoUploadClick}>Browse</BrowseButton>
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </FlexUpload>
          {formErrors.passport && <p style={{ color: 'red' }}>{formErrors.passport}</p>}
          {photoPreview && (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', padding: '10px', gap: "50px", width: '50%', border: '1px solid #ccc', borderRadius: '8px' }}>
              <img src={photoPreview} alt="Photo Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
              <p style={{ color: 'green', marginTop: '5px' }}>Photo successfully selected!</p>
              <MdDelete onClick={handleDeletePhoto} color="red" style={{ cursor: 'pointer' }} title="Remove ID Proof" />
            </div>
          )}
        </UploadSection>

        <UploadSection>
          <Label>Upload ID Proof <small>(Aadhar / Driving License)</small></Label>
          <FlexUpload>
            <UploadButton type="button" onClick={handleIDProofUploadClick}>
              <MdOutlineFileUpload color='#C5C6C7' fontSize={20} style={{ marginRight: '10px' }} />
              Upload Document
            </UploadButton>
            <BrowseButton type="button" onClick={handleIDProofUploadClick}>Browse</BrowseButton>
            <input
              type="file"
              ref={idProofInputRef}
              onChange={handleIDProofFileChange}
              style={{ display: 'none' }}
              accept="image/*,.pdf"
            />
          </FlexUpload>
          {formErrors.idProof && <p style={{ color: 'red' }}>{formErrors.idProof}</p>}
          {idProofPreview && (
  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', padding: '10px', gap: "30px", width: '50%', border: '1px solid #ccc', borderRadius: '8px'}}>
    {idProofPreview.endsWith('.pdf') || idProofFile?.type === 'application/pdf' ? (
      <a href={idProofPreview} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{idProofFile ? idProofFile.name : 'View ID Proof'}</a>
    ) : (
      <>
        <img src={idProofPreview} alt="ID Proof Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
        <p style={{ color: 'green', margin: 0, marginTop: '5px', marginBottom: "5px" }}>ID Proof successfully selected!</p>
      </>
    )}
    <MdDelete onClick={handleDeleteIDProof} color="red" style={{ cursor: 'pointer' }} title="Remove ID Proof" />
  </div>
)}

        </UploadSection>
      </FlexRow>

      <SubmitButton type="submit">
        {studentData ? 'Update Student' : 'Add Student'}
      </SubmitButton>
    </FormContainer>
  );
};

export default AddStudent;
