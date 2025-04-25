import React, { useRef } from 'react';
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
import { MdOutlineFileUpload } from "react-icons/md";

const AddStudent = () => {
  const photoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  const handlePhotoUploadClick = () => {
    photoInputRef.current.click();
  };

  const handleIDProofUploadClick = () => {
    idProofInputRef.current.click();
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected photo:', file.name);
      // You can set this in state if needed
    }
  };

  const handleIDProofFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected ID Proof:', file.name);
    }
  };

  return (
    <FormContainer>
      <Title>Add Student</Title>

      <InputGroup>
        <Label>Full Name</Label>
        <InputField placeholder="Ryan Kr" />
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email</Label>
          <InputField type="email" placeholder="ryan142@gmail.com" />
        </InputGroup>
        <InputGroup>
          <Label>Mobile Number</Label>
          <InputField type="tel" placeholder="+91 | 9374624931" />
        </InputGroup>
      </FlexRow>

      <FlexRow>
        {/* Upload Photo */}
        <UploadSection>
          <Label>Upload Photo <small>(Passport Size)</small></Label>
          <FlexUpload>
            <UploadButton onClick={handlePhotoUploadClick}>
              <MdOutlineFileUpload color='#C5C6C7' fontSize={20} style={{ marginRight: '10px' }} />
              Upload Document
            </UploadButton>
            <BrowseButton onClick={handlePhotoUploadClick}>Browse</BrowseButton>
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </FlexUpload>
        </UploadSection>

        {/* Upload ID Proof */}
        <UploadSection>
          <Label>Upload ID Proof <small>(Aadhar / Driving License)</small></Label>
          <FlexUpload>
            <UploadButton onClick={handleIDProofUploadClick}>
              <MdOutlineFileUpload color='#C5C6C7' fontSize={20} style={{ marginRight: '10px' }} />
              Upload Document
            </UploadButton>
            <BrowseButton onClick={handleIDProofUploadClick}>Browse</BrowseButton>
            <input
              type="file"
              ref={idProofInputRef}
              onChange={handleIDProofFileChange}
              style={{ display: 'none' }}
              accept="image/*,.pdf"
            />
          </FlexUpload>
        </UploadSection>
      </FlexRow>

      <SubmitButton>Add Student</SubmitButton>
    </FormContainer>
  );
};

export default AddStudent;
