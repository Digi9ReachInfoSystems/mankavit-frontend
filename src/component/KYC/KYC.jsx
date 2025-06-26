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
import { lastDayOfDecade } from 'date-fns';
import { getCookiesData } from '../../utils/cookiesService';
import { createKycApi } from '../../api/kycApi';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
const KYC = () => {
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: '',
    last: '',
    email: '',
    mobile: '',
    age: ''
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setProfileData((prev) => ({ ...prev, mobile: digits }));
    } else if (name === 'name' || name === 'last') {
      const letters = value.replace(/[^a-zA-Z\s]/g, '');
      setProfileData((prev) => ({ ...prev, [name]: letters }));
    } else if (name === 'email') {
      const letters = value.replace(/[^a-zA-Z0-9@.]/g, '');
      setProfileData((prev) => ({ ...prev, [name]: letters }));
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

      if (!profileData.name) throw new Error('First name is required');
      if (!profileData.last) throw new Error('Last name is required');
      if (!profileData.age) throw new Error('Age is required');
      if (!profileData.mobile || profileData.mobile.length < 10) throw new Error('Valid mobile number is required');
     
      if (!profileData.email) throw new Error('Email is required');

      const cookieData = await getCookiesData();
      const uploadedIDProofUrl = await uploadFileToAzureStorage(uploadedIDProof.file, 'id-proof');
      const passportPhotoUrl = await uploadFileToAzureStorage(passportPhoto.file, 'photo-url');
       if (!passportPhotoUrl) throw new Error('Passport photo is required');
      if (!uploadedIDProofUrl) throw new Error('ID proof is required');
      const submissionData = {
        first_name: profileData.name.trim(),
        last_name: profileData.last.trim(),
        age: profileData.age.trim(),
        email: profileData.email.trim(),
        mobile_number: `+91${profileData.mobile}`,
        id_proof: uploadedIDProofUrl.blobUrl, // Base64-encoded image
        passport_photo: passportPhotoUrl.blobUrl, // Base64-encoded photo
        userref: cookieData.userId,
      }
      // console.log('Submission Data:', submissionData);
      await createKycApi(submissionData);
       toast.success("KYC Form submitted successfully.");
      navigate('/user');
      setShowSuccessGif(true);
      setTimeout(() => setShowSuccessGif(false), 1000);
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
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
      <Header>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon><FaArrowLeft /></BackIcon>
        </BackLink>
        <Title>
          KYC for CLAT <Highlight>Coaching</Highlight>
        </Title>
      </Header>

      <Form>
        <FormWrapper>
          <InputGroup>
            <Label>First Name</Label>
            <InputField name="name" value={profileData.name} placeholder="First Name" onChange={handleInputChange} />
          </InputGroup>
          <InputGroup>
            <Label>last Name</Label>
            <InputField name="last" value={profileData.last} placeholder="Last Name" onChange={handleInputChange} />
          </InputGroup>
          <InputGroup>
            <Label>Age</Label>
            <InputField name="age" value={profileData.age} placeholder="eg. 28" onChange={handleInputChange} />
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

          <SubmitButton type="submit" disabled={isLoading} onClick={handleSubmit}>
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
