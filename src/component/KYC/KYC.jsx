// src/pages/Admin/WebManagement/WhyStudyWithUs/Profile.jsx

import React, { useRef, useState } from 'react';
import {
  FormContainer,
  Header,
  Title,
  BackLink,
  BackIcon,
  Highlight,
  Form,
  FormWrapper,
  InputGroup,
  InputField,
  MobileInputContainer,
  FixedCode,
  MobileNumberInput,
  Label,
  UploadSection,
  UploadButton,
  BrowseButton,
  SubmitButton,
  FlexRow,
  FlexUpload,
  UploadedFileName,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ErrorMessage
} from './KYC.styles';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload } from 'react-icons/md';
import profilePlaceholder from '../../assets/profile.png';
import { uploadFileToAzureStorage } from '../../utils/azureStorageService';

const KYC = () => {
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [uploadedIDProof, setUploadedIDProof] = useState(null);
  const [modalFile, setModalFile] = useState(null);
  const [showSuccessGif, setShowSuccessGif] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePassportPhotoUploadClick = () => passportPhotoInputRef.current.click();
  const handleIDProofUploadClick = () => idProofInputRef.current.click();



  const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return alert('Select a valid image');
    setIsLoading(true);
    try {
      const { url } = await uploadFileToAzureStorage(file, 'users');
      setPassportPhoto({ name: file.name, url, type: file.type });
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
      const { url } = await uploadFileToAzureStorage(file, 'users');
      setUploadedIDProof({ name: file.name, url, type: file.type });
    } catch {
      alert('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setProfileData((prev) => ({ ...prev, mobile: digits }));
    } else if (name === 'name') {
      const letters = value.replace(/[^a-zA-Z\s]/g, '');
      setProfileData((prev) => ({ ...prev, name: letters }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileClick = (file) => setModalFile(file);
  const closeModal = () => setModalFile(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const updateData = {
        displayName: profileData.name.trim(),
        phone: profileData.mobile ? `+91${profileData.mobile}` : '',
        email: profileData.email.trim(),
        photo_url: profileImage !== profilePlaceholder ? profileImage : ''
      };

      if (!updateData.displayName) throw new Error('Full name is required');
      if (!updateData.email) throw new Error('Email is required');

      console.log('Submitting update:', updateData);

      setShowSuccessGif(true);
      setTimeout(() => setShowSuccessGif(false), 3000);
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>

      <Header>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon><FaArrowLeft /></BackIcon>
        </BackLink>
        <Title>
        KYC for CLAT <Highlight>Coaching</Highlight>
      </Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormWrapper>
          <InputGroup>
            <Label>Full Name</Label>
            <InputField name="name" value={profileData.name} placeholder="Ryan" onChange={handleInputChange} />
          </InputGroup>

          <FlexRow>
            <InputGroup>
              <Label>Email</Label>
              <InputField
                type="email"
                name="email"
                placeholder='ryan@gmail.com'
                value={profileData.email}
                onChange={handleInputChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>Mobile</Label>
              <MobileInputContainer>
                <FixedCode>+91</FixedCode>
                <div className='numberLine'></div>
                <MobileNumberInput
                  name="mobile"
                  placeholder='9901321704'
                  value={profileData.mobile}
                  onChange={handleInputChange}
                />
              </MobileInputContainer>
            </InputGroup>
          </FlexRow>

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

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormWrapper>

        {modalFile && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeModal}>×</CloseButton>
              {modalFile.type?.startsWith('image/') ? (
                <img src={modalFile.url} alt="Preview" style={{ maxWidth: '100%' }} />
              ) : (
                <iframe
                  title="PDF Preview"
                  src={modalFile.url}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                />
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </Form>
    </FormContainer>
  );
};

export default KYC;
