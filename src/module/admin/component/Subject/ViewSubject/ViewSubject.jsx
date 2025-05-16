// ViewSubject.jsx
import React from "react";
import uplaod from "../../../../../assets/upload.png";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  UploadArea,
} from "../AddSubject/AddSubject.style";

export default function ViewSubject() {
  // Dummy data for display
  const subjectTitle = "Sample Subject Title";
  const internalTitle = "Sample Internal Title";
  const vimeoId = "123456789";
  const shortDescription = "This is a short description of the subject.";
  const notesCheckboxes = [
    { label: "Note 1", checked: true },
    { label: "Note 2", checked: false },
  ];
  const mockTestCheckboxes = [
    { label: "Mock Test 1", checked: true },
    { label: "Mock Test 2", checked: false },
  ];
  const thumbnailFileUrl = "https://via.placeholder.com/300x200.png?text=Thumbnail+Preview";

  return (
    <Container>
      <Title>View Subject</Title>
      <FormWrapper>
        {/* Row 1 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <p>{subjectTitle}</p>
            </FieldWrapper>

            <FieldWrapper>
              <Label>Subject Internal Title</Label>
              <p>{internalTitle}</p>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Vimeo Showcase ID</Label>
              <p>{vimeoId}</p>
            </FieldWrapper>

            <FieldWrapper>
              <Label>Subject Short Description</Label>
              <p>{shortDescription}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Added Notes</CheckboxSectionTitle>
              <CheckboxList>
                {notesCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
                    <input type="checkbox" checked={item.checked} disabled />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Added Mock Tests</CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
                    <input type="checkbox" checked={item.checked} disabled />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 3 */}
        <FormRow>
          <Column>
            <Label>Thumbnail</Label>
            <UploadArea style={{ cursor: "default" }}>
              <img src={thumbnailFileUrl} alt="Thumbnail Preview" style={{ width: '100%', height: '100%' }} />
            </UploadArea>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
