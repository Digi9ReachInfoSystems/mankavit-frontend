// src/pages/Admin/WebManagement/WhyStudyWithUs/Profile.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormContainer,
  UpdatedGif,
  Form,
  FormWrapper,
  ProfileImage,
  CameraImage,
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
} from './Profile.styles';

import { MdOutlineFileUpload } from 'react-icons/md';
import profilePlaceholder from '../../../../assets/profile.png';
import cameraIcon from '../../../../assets/Camera.png';
import profileUpdatedGif from '../../../../assets/profileUpdated.gif';

import { getUserByUserId, updateUserById } from '../../../../api/authApi';
import { uploadFileToAzureStorage } from '../../../../utils/azureStorageService';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profilePhotoInputRef = useRef(null);
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      navigate('/error');
      return;
    }
    (async () => {
      setIsLoading(true);
      try {
        const resp = await getUserByUserId(id);
        console.log('resp', resp);  
        if (!resp.success || !resp.user) {
          throw new Error('User not found');
        }
        const u = resp.user;
        setProfileData({
          name: u.displayName || '',
          email: u.email || '',
          mobile: u.phone || ''
        });
        setProfileImage(u.photo_url  || profilePlaceholder);

        if (u.passportPhotoUrl) {
          setPassportPhoto({
            name: 'Passport Photo',
            url: u.passportPhotoUrl,
            type: 'image/*'
          });
        }
        if (u.idProofUrl) {
          setUploadedIDProof({
            name: 'ID Proof',
            url: u.idProofUrl,
            type: u.idProofUrl.endsWith('.pdf') ? 'application/pdf' : 'image/*'
          });
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleProfilePhotoUploadClick = () => profilePhotoInputRef.current.click();
  const handlePassportPhotoUploadClick = () => passportPhotoInputRef.current.click();
  const handleIDProofUploadClick = () => idProofInputRef.current.click();

  // const handleProfilePhotoFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file?.type.startsWith('image/')) {
  //     return alert('Select a valid image');
  //   }
  //   setIsLoading(true);
  //   try {
  //     // Upload to 'profile' container in Azure Storage
  //     const { blobUrl, url } = await uploadFileToAzureStorage(file, 'profile');
  //     setProfileImage(blobUrl || url);
  //   } catch {
  //     alert('Upload failed');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return alert('Select a valid image');
    setIsLoading(true);
    try {
      const { blobUrl, url } = await uploadFileToAzureStorage(file, 'users');
      setPassportPhoto({ name: file.name, url: blobUrl || url, type: file.type });
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
      const { blobUrl, url } = await uploadFileToAzureStorage(file, 'users');
      setUploadedIDProof({ name: file.name, url: blobUrl || url, type: file.type });
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
      setProfileData((p) => ({ ...p, mobile: digits }));
    } else if (name === 'name') {
      const letters = value.replace(/[^a-zA-Z\s]/g, '');
      setProfileData((p) => ({ ...p, name: letters }));
    } else {
      setProfileData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleFileClick = (file) => setModalFile(file);
  const closeModal = () => setModalFile(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {  
  //     const updateData = {
  //       displayName: profileData.name,
  //       phone: profileData.mobile ? `+91${profileData.mobile}` : '',
  //       photo_url: profileImage !== profilePlaceholder ? profileImage : '',
  //       email: profileData.email
  //     };

  //     const response = await updateUserById(id, updateData);
      
  //     if (!response.success) {
  //       throw new Error(response.message || 'Failed to update user');
  //     }

  //     setShowSuccessGif(true);
  //     setTimeout(() => setShowSuccessGif(false), 3000);
  //   } catch (error) {
  //     console.error('Update error:', error);
  //     setError(error.message || 'Failed to update user');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // Update the handleProfilePhotoFileChange function
const handleProfilePhotoFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file?.type.startsWith('image/')) {
    return alert('Please select a valid image file (JPEG, PNG)');
  }
  setIsLoading(true);
  try {
    const data= await uploadFileToAzureStorage(file, 'profile');
    setProfileImage(data.blobUrl);
    return data.blobUrl; // Return the URL so we can use it in handleSubmit
  } catch (error) {
    console.error('Upload error:', error);
    alert('Profile photo upload failed. Please try again.');
    return null;
  } finally {
    setIsLoading(false);
  }
};

// Update the handleSubmit function
const handleSubmit = async (e) => {
  console.log('Profile Image:', profileImage);
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    // Prepare the update data
    const updateData = {
      displayName: profileData.name.trim(),
      phone: profileData.mobile ? `${profileData.mobile}` : '',
      email: profileData.email.trim(),
      photo_url: profileImage !== profilePlaceholder ? profileImage : ''
    };

    // Validate required fields
    if (!updateData.displayName) {
      throw new Error('Full name is required');
    }
    if (!updateData.email) {
      throw new Error('Email is required');
    }

    console.log('Submitting update:', updateData); // Debug log

    const response = await updateUserById(id, updateData);
    console.log('Update response:', response);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update user profile');
    }

    setShowSuccessGif(true);
    setTimeout(() => setShowSuccessGif(false), 3000);
  } catch (error) {
    console.error('Update error:', error);
    setError(error.message || 'Failed to update profile. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <FormContainer>
      {showSuccessGif ? (
        <UpdatedGif>
          <img src={profileUpdatedGif} alt="Updated" />
          <p>Profile Updated</p>
        </UpdatedGif>
      ) : (
        <Form onSubmit={handleSubmit}>
          {/* Profile Photo */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <ProfileImage src={profileImage} alt="Profile" />
            <CameraImage
              src={cameraIcon}
              alt="Change"
              onClick={handleProfilePhotoUploadClick}
            />
            <input
              type="file"
              ref={profilePhotoInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleProfilePhotoFileChange}
            />
          </div>

          <FormWrapper>
            <InputGroup>
              <Label>Full Name</Label>
              <InputField
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </InputGroup>

            <FlexRow>
              <InputGroup>
                <Label>Email</Label>
                <InputField
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Mobile</Label>
                <MobileInputContainer>
                  <FixedCode>+91</FixedCode>
                  <MobileNumberInput
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleInputChange}
                  />
                </MobileInputContainer>
              </InputGroup>
            </FlexRow>

            {/* <FlexRow>
              <UploadSection>
                <Label>Passport Photo</Label>
                <FlexUpload>
                  <UploadButton onClick={handlePassportPhotoUploadClick}>
                    <MdOutlineFileUpload /> Upload
                  </UploadButton>
                  <BrowseButton onClick={handlePassportPhotoUploadClick}>
                    Browse
                  </BrowseButton>
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
                  <BrowseButton onClick={handleIDProofUploadClick}>
                    Browse
                  </BrowseButton>
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
            </FlexRow> */}

            <SubmitButton type="submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </SubmitButton>
          </FormWrapper>

          {modalFile && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>×</CloseButton>
                {modalFile.type.startsWith('image/') ? (
                  <img
                    src={modalFile.url}
                    alt="Preview"
                    style={{ width: '100%' }}
                  />
                ) : (
                  <iframe
                    src={modalFile.url}
                    title="Document"
                    width="100%"
                    height="500"
                  />
                )}
              </ModalContent>
            </ModalOverlay>
          )}
        </Form>
      )}
    </FormContainer>
  );
};

export default Profile;