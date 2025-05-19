import React from 'react';
import {
  Container,
  Title,
  Label,
  Field,
  DropZone,
  ImageIcon,
  PreviewImage,
} from './ViewWhyStudyWithUs.styles';
import uploadIcon from '../../../../../../assets/upload.png';

const ViewWhyStudyWithUs = () => {
  // Example static content
  const title = 'Why Choose Our Academy';
  const description = 'Our programs are tailored to student success with expert mentors, practical sessions, and career guidance.';
  const imageUrl = 'https://via.placeholder.com/300x200'; // replace with actual image URL if needed

  return (
    <Container>
      <Title>View Why Study With Us</Title>

      <Label>Why Study With Us Title</Label>
      <Field>{title}</Field>
      <Label>Why Study With Us Description</Label>
      <Field>{description}</Field>

      <Label>Mission Image</Label>
      <DropZone hasImage={!!imageUrl}>
        {imageUrl ? (
          <PreviewImage src={imageUrl} alt="Preview" />
        ) : (
          <>
            <ImageIcon>
              <img src={uploadIcon} alt="Upload" width="50" />
            </ImageIcon>
          </>
        )}
      </DropZone>
    </Container>
  );
};

export default ViewWhyStudyWithUs;
