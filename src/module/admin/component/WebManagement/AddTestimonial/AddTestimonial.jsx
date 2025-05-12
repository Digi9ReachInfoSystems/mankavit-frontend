import React, { useState } from 'react';
import {
  Container,
  Title,
  Label,
  Input,
  TextArea,
  DropZone,
  DropZoneText,
  ImageIcon,
  AddImageText,
  UploadButton,
} from './AddTestimonial.styles';
import { FiImage } from 'react-icons/fi';
import upload from "../../../../../assets/upload.png";

const AddTestimonial = () => {
  const [studentName, setStudentName] = useState('');
  const [TestimonialDetails, setTestimonialDetails] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <Container>
      <Title>Testimonial</Title>

      <Label>Student Name</Label>
      <Input
        placeholder="Gaurav"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />

      <Label>Course</Label>
      <Input
        placeholder="write here"
      />

      <Label>Testimonial details</Label>
      <TextArea
        placeholder="Write here"
        value={TestimonialDetails}
        onChange={(e) => setTestimonialDetails(e.target.value)}
      />

      <Label>Upload Student Image</Label>
      <DropZone>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
          <ImageIcon><img src={upload} alt="upload" width="50px" height="50px" /></ImageIcon>
          <DropZoneText>Drag and drop image here, or click add image</DropZoneText>
          <AddImageText>Add Image</AddImageText>
        </label>
      </DropZone>

      <UploadButton>Upload Testimonial</UploadButton>
    </Container>
  );
};

export default AddTestimonial;
