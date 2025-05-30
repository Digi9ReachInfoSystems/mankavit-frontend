import React, { useState } from 'react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  Input,
  UploadGroup,
  UploadLabel,
  UploadInputWrapper,
  UploadFileName,
  HiddenFileInput,
  UploadButton,
  ConfirmButton,
  RedDot,
  Form
} from './CreateKYC.styles';
import Header from '../../../../pages/LandingPage/LandingHeader/LandingHeader';
import Footer from '../../../../pages/LandingPage/Footer/Footer';
import { FcOk } from "react-icons/fc";

const CreateKYC = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [idProof, setIdProof] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      newErrors.fullName = 'Name must contain only letters and spaces';
    }

    if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    return newErrors;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFullName(value);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setMobile(value);
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    // Convert from yyyy-mm-dd to dd/mm/yyyy
    const parts = value.split('-');
    if (parts.length === 3) {
      const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
      setDob(formatted);
    } else {
      setDob(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log({
      fullName,
      dob,
      email,
      mobile,
      idProof,
      photo
    });

    alert('KYC submitted successfully!');
  };

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title><FcOk className='tick-icon' /> KYC for CLAT Coaching</Title>

          <FormGroup>
            <Label>Full Name <RedDot>*</RedDot></Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleNameChange}
            />
            {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
          </FormGroup>

<FormGroup>
  <Label>Date of Birth</Label>
  <Input
    type="date"
    onChange={handleDobChange}
    max={new Date().toISOString().split('T')[0]} // Set today's date as the maximum
  />
</FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Mobile Number</Label>
            <Input
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={handleMobileChange}
              maxLength="10"
            />
            {errors.mobile && <span style={{ color: 'red' }}>{errors.mobile}</span>}
          </FormGroup>

          <UploadGroup>
            <UploadLabel>Upload ID Proof (Aadhar card / Driving License / Passport)</UploadLabel>
            <UploadInputWrapper>
              <UploadFileName>{idProof ? idProof.name : 'No file chosen'}</UploadFileName>
              <HiddenFileInput type="file" id="id-proof" onChange={(e) => setIdProof(e.target.files[0])} />
              <UploadButton type="button" onClick={() => document.getElementById('id-proof').click()}>Browse</UploadButton>
            </UploadInputWrapper>
          </UploadGroup>

          <UploadGroup>
            <UploadLabel>Upload Photo (Passport Size)</UploadLabel>
            <UploadInputWrapper>
              <UploadFileName>{photo ? photo.name : 'No file chosen'}</UploadFileName>
              <HiddenFileInput type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
              <UploadButton type="button" onClick={() => document.getElementById('photo').click()}>Browse</UploadButton>
            </UploadInputWrapper>
          </UploadGroup>

          <ConfirmButton type="submit">Submit KYC</ConfirmButton>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default CreateKYC;
