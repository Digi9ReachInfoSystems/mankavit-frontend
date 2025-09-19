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
  ViewImage
} from './ViewStudent.styles';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../../../api/authApi';
import { getAllCourses } from '../../../../../api/courseApi'; // assumed path
import { getCookiesData } from '../../../../../utils/cookiesService';
const ViewStudent = () => {
  const { id } = useParams(); // expects route to be /view/:id

  const [studentData, setStudentData] = useState({});
  const [photoPreview, setPhotoPreview] = useState('');
  const [idProofPreview, setIDProofPreview] = useState('');
  const [courseNames, setCourseNames] = useState([]);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
     
// // // // // // console.log("id",id);
 const student = await getUserDetails(id);
// // // // // // console.log("Student details:", student);
const user = student.user;
setStudentData(user);
setPhotoPreview(user.passport || '');
setIDProofPreview(user.idProof || '');

// Fetch course names
const courseResponse = await getAllCourses();
const courseMap = {};
courseResponse.data.forEach(c => {
  courseMap[c._id] = c.course_name;
});

const enrolledCourses = (user.subscription || []).map(sub => {
  const cid = sub.course_enrolled?.$oid || sub.course_enrolled;
  return courseMap[cid] || cid;
});

setCourseNames(enrolledCourses);

      } catch (error) {
        // // // // // console.error("Failed to fetch student details:", error);
      }
    };

    if (id) fetchStudentDetails();
  }, [id]);

  return (
    <FormContainer>
      <Title>View Student Details</Title>

      <InputGroup>
        <Label>Full Name</Label>
        <Field>{studentData.displayName || 'N/A'}</Field>
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
          <Label>Courses Enrolled</Label>
          <Field>
            {courseNames.length > 0
              ? `${courseNames.length} - ${courseNames.join(', ')}`
              : 'No Enrollments'}
          </Field>
        </InputGroup>
      </FlexRow>

      <FlexRow>
        <InputGroup>
          <Label>KYC Status</Label>
          <ToggleSwitch type="checkbox" checked={studentData.kyc_status === 'approved'} disabled />
        </InputGroup>
        <InputGroup>
          <Label>Status</Label>
          <ToggleSwitch type="checkbox" checked={studentData.status === 'active'} disabled />
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
