import React from "react";
import {
  Container,
  FormRow,
  FormColumn,
  FormGroup,
  Label,
  ValueText, // Add a styled `p` tag if desired
} from "./ViewRecordedClass.styles";
import { getRecordedClassById } from "../../../../../../api/recordedAPi";

const ViewRecordedClass = ({ classData }) => {
  const {
    title = "Sample Class Title",
    description = "This is a sample class description.",
    duration = "45",
    videoUrl = "https://sample-videos.com/video123.mp4",
    videoName = "sample-video.mp4",
    selectedCourses = ["Math", "Science", "English"]
  } = classData || {};

  return (
    <Container>
      <h2>Recorded Class Details</h2>

      <FormGroup>
        <Label>Title</Label>
        <ValueText>{title}</ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <ValueText>{description}</ValueText>
      </FormGroup>

      <FormGroup>
        <Label>Duration (in minutes)</Label>
        <ValueText>{duration}</ValueText>
      </FormGroup>

      
      <FormGroup>
            <Label>Courses</Label>
            <ValueText>{selectedCourses.join(", ")}</ValueText>
        </FormGroup>

      <FormRow>
        <FormColumn>
          <Label>Class Video</Label>
          <video controls width="100%" style={{ marginTop: "10px" }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </FormColumn>

      </FormRow>
    </Container>
  );
};

export default ViewRecordedClass;
