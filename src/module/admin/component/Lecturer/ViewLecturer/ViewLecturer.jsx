import React from "react";
import upload from "../../../../../assets/upload.png";
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

export default function ViewLecturer() {
  // Mock static data for UI display
  const lecturerName = "Dr. John Doe";
  const duration = "3 Months";
  const description = "This is a sample course description for viewing purposes only.";
  const subjectCheckboxes = [
    "Mathematics",
    "Physics",
  ]
  const courseCheckboxes = [
    "Mock Test 1",
    "Mock Test 2",
  ];
  const thumbnailUrl = "https://via.placeholder.com/300x200?text=Thumbnail+Preview";

  return (
    <Container>
      <Title>View Lecturer</Title>
      <FormWrapper>
        {/* Row 1 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Lecturer Name</Label>
              <Field>{lecturerName}</Field>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Duration</Label>
              <Field>{duration}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Course Description</Label>
              <Field>
                {description}
              </Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3 */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Subjects</CheckboxSectionTitle>
              <CheckboxList>
                <Field>{subjectCheckboxes.join(", ")} </Field>
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Courses</CheckboxSectionTitle>
              <CheckboxList>
                <Field>{courseCheckboxes.join(", ")} </Field>
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 4 */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Thumbnail</Label>
            <UploadArea style={{ cursor: "default" }}>
              <img src={thumbnailUrl} alt="Preview" style={{ width: "100%", height: "100%" }} />
            </UploadArea>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
