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
} from '../AddStudent/AddStudent.styles';
import { MdOutlineFileUpload, MdDelete } from "react-icons/md";  // Removed stray backslash here
import { useLocation } from 'react-router-dom';

const EditStudent = () => {
  const location = useLocation();
  const initialData = location.state?.student;

  const [studentData, setStudentData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subjects: '',
    kycStatus: '',
    status: ''
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const photoInputRef = useRef(null);

  const [idProofPreview, setIDProofPreview] = useState('');
  const [idProofFile, setIDProofFile] = useState(null);
  const idProofInputRef = useRef(null);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setStudentData({
        fullName: initialData.name || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        subjects: initialData.subjects ? initialData.subjects.join(', ') : '',
        kycStatus: initialData.kycStatus || '',
        status: initialData.status || '',
      });

      setPhotoPreview(initialData.passport || '');
      setIDProofPreview(initialData.idProof || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleIDProofFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIDProofFile(file);
      setIDProofPreview(URL.createObjectURL(file));
    }
  };

  const handleDeletePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    if (photoInputRef.current) photoInputRef.current.value = null;
  };

  const handleDeleteIDProof = () => {
    setIDProofFile(null);
    setIDProofPreview('');
    if (idProofInputRef.current) idProofInputRef.current.value = null;
  };

  const handlePhotoUploadClick = () => {
    photoInputRef.current?.click();
  };

  const handleIDProofUploadClick = () => {
    idProofInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation (optional)
    const errors = {};
    if (!studentData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!studentData.email.trim()) errors.email = 'Email is required';
    if (!studentData.phone.trim()) errors.phone = 'Phone number is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Prepare form data or API payload
    console.log('Updated Student Data:', studentData);
    console.log('Photo File:', photoFile);
    console.log('ID Proof File:', idProofFile);

    alert('Student updated!');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Edit Student</Title>

      <InputGroup>
        <Label>Full Name</Label>
        <InputField
          placeholder="Enter Full Name"
          name="fullName"
          value={studentData.fullName}
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
            maxLength={10} // Optional: you can remove if you want more flexible input
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
            <div style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              gap: "50px",
              width: '50%',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}>
              <img src={photoPreview} alt="Photo Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
              <p style={{ color: 'green', marginTop: '5px' }}>Photo selected!</p>
              <MdDelete onClick={handleDeletePhoto} color="red" style={{ cursor: 'pointer' }} title="Remove Photo" />
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
            <div style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              gap: "30px",
              width: '50%',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}>
              {(idProofPreview.includes('.pdf') || idProofFile?.type === 'application/pdf') ? (
                <a href={idProofPreview} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                  {idProofFile ? idProofFile.name : 'View Document'}
                </a>
              ) : (
                <>
                  <img src={idProofPreview} alt="ID Proof Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                  <p style={{ color: 'green', margin: 0, marginTop: '5px', marginBottom: "5px" }}>ID Proof selected!</p>
                </>
              )}
              <MdDelete onClick={handleDeleteIDProof} color="red" style={{ cursor: 'pointer' }} title="Remove ID Proof" />
            </div>
          )}
        </UploadSection>
      </FlexRow>

      <SubmitButton type="submit">Update Student</SubmitButton>
    </FormContainer>
  );
};

export default EditStudent;
