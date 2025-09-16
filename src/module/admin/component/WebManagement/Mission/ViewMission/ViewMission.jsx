import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import JoditEditor from 'jodit-react';
import uploadIcon from '../../../../../../assets/upload.png';

const ViewMission = () => {
  const { id } = useParams();
  const [mission, setMission] = useState({});
  const [loading, setLoading] = useState(true);
  const editor = useRef(null);
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
  const editorConfig = useMemo(() => ({
    readonly: false,
    // placeholder: 'Enter mission description...'
  }), []);

  return (
    <Container>
      <Title>View Mission</Title>

      <Label>Mission Title</Label>
      <TextArea as="div">{mission.title}</TextArea>

      <Label>Mission Description</Label>
      <JoditEditor
        ref={editor}
        value={mission.description}
        config={editorConfig}
        tabIndex={1}
        // onBlur={newContent => setFormData(prev => ({ ...prev, description: newContent }))}
        onChange={() => { /* no-op: update on blur */ }}
      />
      {/* <TextArea as="div">{mission.description}</TextArea> */}

      <Label>Mission Image</Label>
      <DropZone hasImage={!!mission.image}>
        {mission.image ? (
          <PreviewImage src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${mission.image}`} alt="Mission" />
        ) : (
          <>
            <ImageIcon>
              <img src={uploadIcon} alt="Upload" width="50" />
            </ImageIcon>
            <DropZoneText>No image uploaded</DropZoneText>
          </>
        )}
      </DropZone>
    </Container>
  );
};

export default ViewMission;
