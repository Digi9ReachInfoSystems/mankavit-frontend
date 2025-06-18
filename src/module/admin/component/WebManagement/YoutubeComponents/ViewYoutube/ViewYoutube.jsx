import React, { useEffect } from "react";
import {
  Container, 
  Title,
  Label, 
  Input, 
  DropZone, 
  DropZoneText,
  PreviewImage, 
  UploadButton
} from "./ViewYoutube.styles";
import { useLocation, useNavigate } from "react-router-dom";

const ViewYoutube = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      setTimeout(() => {
        navigate("/admin/web-management/youtubelinks", { replace: true });
      }, 0);
    }
  }, [state, navigate]);

  if (!state) return null;

  return (
    <Container>
        <Title>View YouTube Link</Title>
        
      <Label>YouTube Link</Label>
      <Input value={state.link} readOnly />

      <Label>Thumbnail Image</Label>
      <DropZone hasImage={!!state.thumbnail}>
        {state.thumbnail ? (
          <PreviewImage src={state.thumbnail} alt="YouTube Thumbnail" />
        ) : (
          <DropZoneText>No thumbnail available</DropZoneText>
        )}
      </DropZone>

    </Container>
  );
};

export default ViewYoutube;
