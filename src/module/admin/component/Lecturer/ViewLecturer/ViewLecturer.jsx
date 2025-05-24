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
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  UploadArea,
} from "./ViewLecturer.styles";
import { getLectureById } from "../../../../../api/lecturesApi";

export default function ViewLecturer() {
  const { id } = useParams();
  console.log("id", id);
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await getLectureById(id);
        setLecture(response.lecture || response); // depending on your API shape
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
      <Title>View Lecturer</Title>
      <FormWrapper>
        {/* Row 1 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Lecturer Name</Label>
              <Field>{lecture.lecturerName || 'N/A'}</Field>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Duration</Label>
              <Field>{lecture.duration || 'N/A'}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Course Description</Label>
              <Field>{lecture.description || 'N/A'}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3 */}
       

        {/* Row 4 */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Thumbnail</Label>
            <UploadArea style={{ cursor: "default" }}>
              <img
                src={lecture.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                alt="Thumbnail"
                style={{ width: "100%", height: "100%" }}
              />
            </UploadArea>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
