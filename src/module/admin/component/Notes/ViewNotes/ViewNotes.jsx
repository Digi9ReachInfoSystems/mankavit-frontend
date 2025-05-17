// ViewNotes.jsx
import React, { useEffect, useState } from "react";
import upload from "../../../../../assets/upload.png";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  UploadArea,
  UploadPlaceholder,
  CheckboxSection,
  CheckboxList,
  Field,
  ToggleSwitch,
} from "./ViewNotes.styles"; // Adjust path if needed

export default function ViewNotes() {
  const [noteData, setNoteData] = useState({
    noteTitle: "Sample Note Title",
    internalTitle: "Sample Internal Title",
    isDownloadable: true,
    fileUrl: "https://example.com/sample.pdf",
    subjects: ["Math", "Physics"],
  });

  return (
    <Container>
      <Title>View Note</Title>
      <FormWrapper>
        {/* Row 1: Note Title & Note Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Note Title</Label>
              <Field>{noteData.noteTitle}</Field>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Note Internal Title</Label>
              <Field>{noteData.internalTitle}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 4: Subjects */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <Label>Subjects</Label>
             <CheckboxList>
              <Field>{noteData.subjects.join(", ")}</Field>
           </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 2: Uploaded PDF */}
        <FormRow>
          <Column>
            <Label>Uploaded PDF</Label>
            <UploadArea style={{ cursor: "default" }}>
              <UploadPlaceholder>
                <img src={noteData.fileUrl} alt="Uploaded" />
              </UploadPlaceholder>
            </UploadArea>
          </Column>

          <Column style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FieldWrapper style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Is it downloadable?</Label>
              <ToggleSwitch type="checkbox" checked={noteData.isDownloadable} disabled />
            </FieldWrapper>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
