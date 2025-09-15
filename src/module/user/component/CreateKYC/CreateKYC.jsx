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
  Form,
  TextArea
} from './CreateKYC.styles';
import Header from '../../../../pages/LandingPage/LandingHeader/LandingHeader';
import Footer from '../../../../pages/LandingPage/Footer/Footer';
import { FcOk } from "react-icons/fc";
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateKYC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    date_of_birth: '',
    email: '',
    mobile: '',
    fathers_name: '',
    fathers_occupation: '',
    present_address: '',
    current_occupation: '',
    how_did_you_get_to_know_us: ''
  });
  const [idProof, setIdProof] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  // Get user ID from localStorage or wherever it's stored
  const userref = localStorage.getItem('userId'); // Adjust this based on your auth setup

  const eighteenYearsAgoISO = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getAgeFromISO = (iso) => {
    if (!iso) return null;
    const birthDate = new Date(iso);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        fullName: value
      }));
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      mobile: value
    }));
  };
// 1) DOB: remove age logic, only required check
const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = 'Name is required';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
    newErrors.fullName = 'Name must contain only letters and spaces';
  }

  if (!formData.date_of_birth) {
    newErrors.date_of_birth = 'Date of birth is required';
  }
  // ❌ remove age check

  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  if (!formData.mobile) {
    newErrors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    newErrors.mobile = 'Mobile number must be exactly 10 digits';
  }

  if (!formData.fathers_name) newErrors.fathers_name = "Father's name is required";
  if (!formData.fathers_occupation) newErrors.fathers_occupation = "Father's occupation is required";
  if (!formData.present_address) newErrors.present_address = "Present address is required";
  if (!formData.current_occupation) newErrors.current_occupation = "Current occupation is required";
  if (!formData.how_did_you_get_to_know_us) newErrors.how_did_you_get_to_know_us = "This field is required";
  if (!idProof) newErrors.idProof = "ID proof is required";
  if (!photo) newErrors.photo = "Photo is required";

  return newErrors;
};

// 2) DOB handler: remove age check and just clear error on change
const handleDobChange = (e) => {
  const value = e.target.value;
  setFormData(prev => ({ ...prev, date_of_birth: value }));
  setErrors(prev => {
    const newErrors = { ...prev };
    delete newErrors.date_of_birth;
    return newErrors;
  });
};

// 3) On submit: show first error toast and SHOW SERVER MESSAGE in catch
const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm();

  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    const firstError = Object.values(formErrors)[0];
    if (firstError) toast.error(firstError);   // <— re-enable
    return;
  }

  try {
    const submitData = new FormData();
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
    submitData.append('userref', userref);
    if (idProof) submitData.append('id_proof', idProof);
    if (photo) submitData.append('passport_photo', photo);

    await axios.post('/api/kyc', submitData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    toast.success('KYC submitted successfully!');
    // reset...
  } catch (err) {
    console.error('API error:', err);
    const serverMsg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data?.errors?.[0]?.msg ||
      err?.message ||
      'Something went wrong';
    toast.error(serverMsg);                    // <— re-enable
  }
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
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleNameChange}
            />
            {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Date of Birth <RedDot>*</RedDot></Label>
            <Input
              type="date"
              name="date_of_birth"
              placeholder='Select your date of birth'
              value={formData.date_of_birth}
              onChange={handleDobChange}
              max={eighteenYearsAgoISO()}
            />
            {errors.date_of_birth && <span style={{ color: 'red' }}>{errors.date_of_birth}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Email <RedDot>*</RedDot></Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Mobile Number <RedDot>*</RedDot></Label>
            <Input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleMobileChange}
              maxLength={10}
            />
            {errors.mobile && <span style={{ color: 'red' }}>{errors.mobile}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Father's Name <RedDot>*</RedDot></Label>
            <Input
              type="text"
              name="fathers_name"
              placeholder="Enter your father's name"
              value={formData.fathers_name}
              onChange={handleInputChange}
            />
            {errors.fathers_name && <span style={{ color: 'red' }}>{errors.fathers_name}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Father's Occupation <RedDot>*</RedDot></Label>
            <Input
              type="text"
              name="fathers_occupation"
              placeholder="Enter your father's occupation"
              value={formData.fathers_occupation}
              onChange={handleInputChange}
            />
            {errors.fathers_occupation && <span style={{ color: 'red' }}>{errors.fathers_occupation}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Present Address <RedDot>*</RedDot></Label>
            <TextArea
              name="present_address"
              placeholder="Enter your present address"
              value={formData.present_address}
              onChange={handleInputChange}
              rows="3"
            />
            {errors.present_address && <span style={{ color: 'red' }}>{errors.present_address}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Current Occupation <RedDot>*</RedDot></Label>
            <Input
              type="text"
              name="current_occupation"
              placeholder="Enter your current occupation"
              value={formData.current_occupation}
              onChange={handleInputChange}
            />
            {errors.current_occupation && <span style={{ color: 'red' }}>{errors.current_occupation}</span>}
          </FormGroup>

          <FormGroup>
            <Label>How did you get to know us? <RedDot>*</RedDot></Label>
            <Input
              type="text"
              name="how_did_you_get_to_know_us"
              placeholder="How did you hear about us?"
              value={formData.how_did_you_get_to_know_us}
              onChange={handleInputChange}
            />
            {errors.how_did_you_get_to_know_us && <span style={{ color: 'red' }}>{errors.how_did_you_get_to_know_us}</span>}
          </FormGroup>

          <UploadGroup>
            <UploadLabel>Upload ID Proof (Aadhar card / Driving License / Passport) <RedDot>*</RedDot></UploadLabel>
            <UploadInputWrapper>
              <UploadFileName>{idProof ? idProof.name : 'No file chosen'}</UploadFileName>
              <HiddenFileInput
                type="file"
                id="id-proof"
                accept="image/*,application/pdf"
                onChange={(e) => setIdProof(e.target.files?.[0] || null)}
              />
              <UploadButton type="button" onClick={() => document.getElementById('id-proof')?.click()}>
                Browse
              </UploadButton>
            </UploadInputWrapper>
            {errors.idProof && <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{errors.idProof}</span>}
          </UploadGroup>

          <UploadGroup>
            <UploadLabel>Upload Photo (Passport Size) <RedDot>*</RedDot></UploadLabel>
            <UploadInputWrapper>
              <UploadFileName>{photo ? photo.name : 'No file chosen'}</UploadFileName>
              <HiddenFileInput
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              />
              <UploadButton type="button" onClick={() => document.getElementById('photo')?.click()}>
                Browse
              </UploadButton>
            </UploadInputWrapper>
            {errors.photo && <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{errors.photo}</span>}
          </UploadGroup>

          <ConfirmButton type="submit">Submit KYC</ConfirmButton>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default CreateKYC;