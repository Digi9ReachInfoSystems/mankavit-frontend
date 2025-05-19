import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Label,
  TextArea,
  DropZone,
  DropZoneText,
  ImageIcon,
  PreviewImage,
} from './ViewMission.styles';
import { getMissionById } from '../../../../../../api/missionApi';
import { useParams } from 'react-router-dom';


const ViewMission = () => {
    const { id } = useParams();
    const [mission, setMission] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchMission = async () => {
        setLoading(true);
        try {
          const data = await getMissionById(id);
          setMission(data);
        } catch (err) {
          console.error('Error fetching mission:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchMission();
    }, [id]);

  return (
    <Container>
      <Title>View Mission</Title>

      <Label>Mission Title</Label>
      <TextArea as="div">{mission.title}</TextArea>

      <Label>Mission Description</Label>
      <TextArea as="div">{mission.description}</TextArea>

      <Label>Mission Image</Label>
      <DropZone hasImage={!!mission.image}>
        {mission.image ? (
          <PreviewImage src={mission.image} alt="Mission" />
        ) : (
          <>
            <ImageIcon>
              <img src={mission.image} alt="Upload" width="50" />
            </ImageIcon>
            <DropZoneText>No image uploaded</DropZoneText>
          </>
        )}
      </DropZone>
    </Container>
  );
};

export default ViewMission;
