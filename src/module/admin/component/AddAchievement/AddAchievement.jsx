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
} from './AddAchievement.styles';
import { FiImage } from 'react-icons/fi';

const AddAchievements = () => {
  const [studentName, setStudentName] = useState('');
  const [rank, setRank] = useState('');
  const [examDetails, setExamDetails] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <Container>
      <Title>Achievement</Title>

      <Label>Student Name</Label>
      <Input
        placeholder="Gaurav"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />

      <Label>Write Rank</Label>
      <Input
        placeholder="write here"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />

      <Label>Exam details</Label>
      <TextArea
        placeholder="Write here"
        value={examDetails}
        onChange={(e) => setExamDetails(e.target.value)}
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
          <ImageIcon><FiImage size={32} /></ImageIcon>
          <DropZoneText>Drag and drop image here, or click add image</DropZoneText>
          <AddImageText>Add Image</AddImageText>
        </label>
      </DropZone>

      <UploadButton>Upload Question Paper</UploadButton>
    </Container>
  );
};

export default AddAchievements;
