import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  Title,
  InputGroup,
  Label,
  UploadSection,
  FlexRow,
  FlexUpload
} from '../AddStudent/AddStudent.styles';
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
        <p>{studentData.fullName || 'N/A'}</p>
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email</Label>
          <p>{studentData.email || 'N/A'}</p>
        </InputGroup>
        <InputGroup>
          <Label>Mobile Number</Label>
          <p>{studentData.phone || 'N/A'}</p>
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <InputGroup>
          <Label>Subjects</Label>
          <p>{studentData.subjects || 'N/A'}</p>
        </InputGroup>
        <InputGroup>
          <Label>KYC Status</Label>
          <p>{studentData.kycStatus || 'N/A'}</p>
        </InputGroup>
        <InputGroup>
          <Label>Status</Label>
          <p>{studentData.status || 'N/A'}</p>
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <UploadSection>
          <Label>Photo <small>(Passport Size)</small></Label>
          {photoPreview ? (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', padding: '10px', gap: "20px", width: '50%', border: '1px solid #ccc', borderRadius: '8px' }}>
              <img src={photoPreview} alt="Photo Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          ) : (
            <p>No Photo Uploaded</p>
          )}
        </UploadSection>

        <UploadSection>
          <Label>ID Proof <small>(Aadhar / Driving License)</small></Label>
          {idProofPreview ? (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', padding: '10px', gap: "20px", width: '50%', border: '1px solid #ccc', borderRadius: '8px' }}>
              {idProofPreview.includes('.pdf') ? (
                <a href={idProofPreview} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>View Document</a>
              ) : (
                <img src={idProofPreview} alt="ID Proof Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              )}
            </div>
          ) : (
            <p>No ID Proof Uploaded</p>
          )}
        </UploadSection>
      </FlexRow>
    </FormContainer>
  );
};

export default ViewStudent;
