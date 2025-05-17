import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  Title,
  InputGroup,
  Label,
  UploadSection,
  FlexRow,
  Field,
  ToggleSwitch,
  ViewImage,
} from './ViewStudent.styles';
import { useLocation } from 'react-router-dom';

const ViewStudent = () => {
    const location = useLocation();
    const initialData = location.state?.student;

  const [studentData, setStudentData] = useState({});
  const [photoPreview, setPhotoPreview] = useState('');
  const [idProofPreview, setIDProofPreview] = useState('');

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

  return (
    <FormContainer>
      <Title>Student Details</Title>

      <InputGroup>
        <Label>Full Name</Label>
        <Field>{studentData.fullName || 'N/A'}</Field>
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email</Label>
          <Field>{studentData.email || 'N/A'}</Field>
        </InputGroup>
        <InputGroup>
          <Label>Mobile Number</Label>
          <Field>{studentData.phone || 'N/A'}</Field>
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <InputGroup>
          <Label>Subjects</Label>
          <Field>{studentData.subjects || 'N/A'}</Field>
        </InputGroup>
        </FlexRow>

      <FlexRow>
        <InputGroup>
          <Label>KYC Status</Label>
          <ToggleSwitch type="checkbox" checked={studentData.kycStatus} disabled />
        </InputGroup>
        <InputGroup>
          <Label>Status</Label>
          <ToggleSwitch type="checkbox" checked={studentData.status} disabled />
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <UploadSection>
          <Label>Photo <small>(Passport Size)</small></Label>
          {photoPreview ? (
            <ViewImage>
              <img src={photoPreview} alt="Photo Preview" className='image' />
            </ViewImage>
          ) : (
            <Field>No Photo Uploaded</Field>
          )}
        </UploadSection>

        <UploadSection>
          <Label>ID Proof <small>(Aadhar / Driving License)</small></Label>
          {idProofPreview ? (
            <ViewImage>
              {idProofPreview.includes('.pdf') ? (
                <a href={idProofPreview} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>View Document</a>
              ) : (
                <img src={idProofPreview} alt="ID Proof Preview" className='image' />
              )}
            </ViewImage>
          ) : (
            <Field>No ID Proof Uploaded</Field>
          )}
        </UploadSection>
      </FlexRow>
    </FormContainer>
  );
};

export default ViewStudent;
