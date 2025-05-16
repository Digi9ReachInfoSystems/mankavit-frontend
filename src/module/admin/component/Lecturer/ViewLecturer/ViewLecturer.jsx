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
  TextArea,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  UploadArea,
  UploadPlaceholder,
} from "../AddLecturer/AddLecturer.styles";

export default function ViewLecturer() {
  // Mock static data for UI display
  const lecturerName = "Dr. John Doe";
  const duration = "3 Months";
  const description = "This is a sample course description for viewing purposes only.";
  const subjectCheckboxes = [
    { id: 1, label: "Mathematics", checked: true },
    { id: 2, label: "Physics", checked: false },
  ];
  const courseCheckboxes = [
    { id: 1, label: "Mock Test 1", checked: true },
    { id: 2, label: "Mock Test 2", checked: true },
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
              <p>{lecturerName}</p>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Duration</Label>
              <p>{duration}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Course Description</Label>
              <TextArea as="div" style={{ minHeight: "100px" }}>
                {description}
              </TextArea>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3 */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Subjects</CheckboxSectionTitle>
              <CheckboxList>
                {subjectCheckboxes.map((item) => (
                  <p key={item.id}>
                    {item.label} {item.checked ? "(Selected)" : ""}
                  </p>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Courses</CheckboxSectionTitle>
              <CheckboxList>
                {courseCheckboxes.map((item) => (
                  <p key={item.id}>
                    {item.label} {item.checked ? "(Selected)" : ""}
                  </p>
                ))}
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
