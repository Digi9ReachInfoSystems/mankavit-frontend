import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Label,
  ReadOnlyText,
  ImageWrapper
} from './ViewAchievement.styles';
import { getAchieverById } from '../../../../../../api/achieverApi';

const ViewAchievement = () => {
  const { id } = useParams();
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    const fetchAchiever = async () => {
      try {
        const response = await getAchieverById(id);
        if (response) {
          setAchievement(response);
        }
      } catch (error) {
        console.error("Error fetching achiever:", error);
      }
    };

    fetchAchiever();
  }, [id]);

  return (
    <Container>
      <Title>View Achievement</Title>

      <Label>Student Name</Label>
      <ReadOnlyText>{achievement?.name}</ReadOnlyText>

      <Label>Rank</Label>
      <ReadOnlyText>{achievement?.rank}</ReadOnlyText>

      <Label>Exam Details</Label>
      <ReadOnlyText>{achievement?.exam_name}</ReadOnlyText>

      <Label>Student Image</Label>
      {achievement?.image ? (
        <ImageWrapper>
          <img
            src={achievement.image}
            alt="Student"
            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
          />
        </ImageWrapper>
      ) : (
        <ReadOnlyText>No image uploaded</ReadOnlyText>
      )}
    </Container>
  );
};

export default ViewAchievement;
