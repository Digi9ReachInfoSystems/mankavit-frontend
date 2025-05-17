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
  UploadArea,
  Field,
  List,
} from "./ViewSubject.styles";

export default function ViewSubject() {
  // Dummy data for display
  const subjectTitle = "Sample Subject Title";
  const internalTitle = "Sample Internal Title";
  const vimeoId = "123456789";
  const shortDescription = "This is a short description of the subject.";
  const addedNotes = ["Note 1", "Note 2", "Note 3"];
  const addedMockTests = ["Mock Test 1", "Mock Test 2", "Mock Test 3"];
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
              <Field>{subjectTitle}</Field>
            </FieldWrapper>

            <FieldWrapper>
              <Label>Subject Internal Title</Label>
              <Field>{internalTitle}</Field>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Vimeo Showcase ID</Label>
              <Field>{vimeoId}</Field>
            </FieldWrapper>

            <FieldWrapper>
              <Label>Subject Short Description</Label>
              <Field>{shortDescription}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <Label>Added Notes</Label>
              <CheckboxList>
                <Field>{addedNotes.join(", ")}</Field>
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <Label>Added Mock Tests</Label>
              <CheckboxList>
                <Field>{addedMockTests.join(", ")}</Field>
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
