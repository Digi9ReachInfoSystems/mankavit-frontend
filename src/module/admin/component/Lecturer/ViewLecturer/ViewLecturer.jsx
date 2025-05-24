import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  Field,
  VideoPlayer,
  VideoContainer,
  ThumbnailImage,
  ThumbnailContainer,
} from "./ViewLecturer.styles";
import { getLectureById } from "../../../../../api/lecturesApi";

export default function ViewLecturer() {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await getLectureById(id);
        setLecture(response.data);
      } catch (error) {
        console.error("Failed to fetch lecture:", error);
      }
    };

    if (id) fetchLecture();
  }, [id]);

  if (!lecture) {
    return <Container><Title>Loading Lecture...</Title></Container>;
  }

  return (
    <Container>
      <Title>View Lecture</Title>
      <FormWrapper>
        {/* Row 1 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Lecture Name</Label>
              <Field>{lecture.lectureName || 'N/A'}</Field>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Duration (minutes)</Label>
              <Field>{lecture.duration || 'N/A'}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Description</Label>
              <Field>{lecture.description || 'N/A'}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Thumbnail Section */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Thumbnail</Label>
              <ThumbnailContainer>
                {lecture.thumbnail ? (
                  <ThumbnailImage src={lecture.thumbnail} alt="Lecture Thumbnail" />
                ) : (
                  <Field>No thumbnail available</Field>
                )}
              </ThumbnailContainer>
            </FieldWrapper>
          </Column>
          <Column style={{ flex: 1 }}>
            <FieldWrapper>
              <Label>Lecture Video</Label>
              <VideoContainer>
                <VideoPlayer controls>
                  <source src={lecture.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </VideoPlayer>
              </VideoContainer>
            </FieldWrapper>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}