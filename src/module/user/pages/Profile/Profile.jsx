import React, { useRef, useState } from 'react';
import {
  FormContainer,
  Form,
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
  CloseButton
} from './Profile.styles';
import { MdOutlineFileUpload } from "react-icons/md";
import profile from "../../../../assets/profile.png";
import camera from "../../../../assets/Camera.png";

const AddStudent = () => {
  const profilePhotoInputRef = useRef(null);   // Profile image (clicking camera icon)
  const passportPhotoInputRef = useRef(null);  // Passport size upload button
  const idProofInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: 'Ryan Kr',
    email: 'ryan142@gmail.com',
    mobile: '9374624931',
  });

  const [profileImage, setProfileImage] = useState(profile);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [uploadedIDProof, setUploadedIDProof] = useState(null);
  const [modalFile, setModalFile] = useState(null);

  // Profile Photo Upload
  const handleProfilePhotoUploadClick = () => {
    profilePhotoInputRef.current.click();
  };

  const handleProfilePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    } else {
      alert('Please select a valid image file for Profile Photo!');
    }
  };

  // Passport Size Photo Upload
  const handlePassportPhotoUploadClick = () => {
    passportPhotoInputRef.current.click();
  };

  const handlePassportPhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(file);
      setPassportPhoto({
        name: file.name,
        url: imageURL,
        type: file.type,
      });
    } else {
      alert('Please select a valid image file for Passport Size Photo!');
    }
  };

  const handleIDProofUploadClick = () => {
    idProofInputRef.current.click();
  };

  const handleIDProofFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUploadedIDProof({
        name: file.name,
        url: fileURL,
        type: file.type,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setProfileData((prev) => ({ ...prev, [name]: digitsOnly }));
      }
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileClick = (file) => {
    setModalFile(file);
  };

  const closeModal = () => {
    setModalFile(null);
  };

  return (
    <FormContainer>
      <Form>

        {/* Profile Photo Section */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ProfileImage src={profileImage} alt="Profile" />
          <CameraImage
            src={camera}
            alt="Camera"
            onClick={handleProfilePhotoUploadClick}
          />
          <input
            type="file"
            ref={profilePhotoInputRef}
            style={{ display: 'none' }}
            onChange={handleProfilePhotoFileChange}
            accept="image/*"
          />
        </div>

        <InputGroup>
          <Label>Full Name</Label>
          <InputField
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="Enter Full Name"
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
              placeholder="Enter Email"
            />
          </InputGroup>

          <InputGroup>
            <Label>Mobile Number</Label>
            <MobileInputContainer>
              <FixedCode>+91 |</FixedCode>
              <MobileNumberInput
                type="text"
                name="mobile"
                value={profileData.mobile}
                onChange={handleInputChange}
                placeholder="Enter 10-digit number"
                maxLength={10}
              />
            </MobileInputContainer>
          </InputGroup>
        </FlexRow>

        <FlexRow>

          {/* Passport Size Upload Section */}
          <UploadSection>
            <Label>Upload Profile Photo <small>(Passport Size)</small></Label>
            <FlexUpload>
              <UploadButton onClick={handlePassportPhotoUploadClick}>
                <MdOutlineFileUpload color='#C5C6C7' fontSize={20} style={{ marginRight: '10px' }} />
                Upload Photo
              </UploadButton>
              <BrowseButton onClick={handlePassportPhotoUploadClick}>Browse</BrowseButton>
            </FlexUpload>
            <input
              type="file"
              ref={passportPhotoInputRef}
              style={{ display: 'none' }}
              onChange={handlePassportPhotoFileChange}
              accept="image/*"
            />
            {passportPhoto && (
              <UploadedFileName onClick={() => handleFileClick(passportPhoto)}>
                {passportPhoto.name}
              </UploadedFileName>
            )}
          </UploadSection>

          {/* ID Proof Upload Section */}
          <UploadSection>
            <Label>Upload ID Proof <small>(Aadhar / Driving License)</small></Label>
            <FlexUpload>
              <UploadButton onClick={handleIDProofUploadClick}>
                <MdOutlineFileUpload color='#C5C6C7' fontSize={20} style={{ marginRight: '10px' }} />
                Upload ID Proof
              </UploadButton>
              <BrowseButton onClick={handleIDProofUploadClick}>Browse</BrowseButton>
            </FlexUpload>
            <input
              type="file"
              ref={idProofInputRef}
              style={{ display: 'none' }}
              onChange={handleIDProofFileChange}
              accept="image/*,.pdf"
            />
            {uploadedIDProof && (
              <UploadedFileName onClick={() => handleFileClick(uploadedIDProof)}>
                {uploadedIDProof.name}
              </UploadedFileName>
            )}
          </UploadSection>

        </FlexRow>

        <SubmitButton>Save Changes</SubmitButton>

        {/* Modal for file view */}
        {modalFile && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeModal}>X</CloseButton>
              {modalFile.type.startsWith('image/') ? (
                <img src={modalFile.url} alt="Uploaded File" style={{ width: '100%', height: 'auto' }} />
              ) : (
                <iframe src={modalFile.url} width="100%" height="500px" title="Document Viewer" />
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </Form>
    </FormContainer>
  );
};

export default AddStudent;
