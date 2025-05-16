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
  CheckboxLabel,
  CheckboxInput,
  CheckboxSectionTitle,
  ToggleSwitch,
} from "./ViewNotes.styles"; // Adjust path if needed
import { getSubjects } from "../../../../../api/subjectApi";

export default function ViewNotes() {
  const [noteData, setNoteData] = useState({
    noteTitle: "Sample Note Title",
    internalTitle: "Sample Internal Title",
    isDownloadable: true,
    fileUrl: "https://example.com/sample.pdf",
    subjects: ["Math", "Physics"],
  });

//   const [subjectsCheckboxes, setSubjectsCheckboxes] = useState([]);

//   useEffect(() => {
//     const apiCaller = async () => {
//       try {
//         const response = await getSubjects();
//         const data = response.data.map((item) => ({
//           label: item.subjectName,
//           id: item._id,
//           checked: noteData.subjects.includes(item.subjectName),
//         }));
//         setSubjectsCheckboxes(data);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };
//     apiCaller();
//   }, [noteData.subjects]);

  return (
    <Container>
      <Title>View Note</Title>
      <FormWrapper>
        {/* Row 1: Note Title & Note Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Note Title</Label>
              <p>{noteData.noteTitle}</p>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Note Internal Title</Label>
              <p>{noteData.internalTitle}</p>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 4: Subjects */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Subjects</CheckboxSectionTitle>
             <CheckboxList>
             {noteData.subjects.map((subject, index) => (
  <p key={index} style={{margin: "5px 0"}}>{subject},</p>
))}
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
                <img src={upload} alt="Uploaded" />
              </UploadPlaceholder>
              <p>
                <a href={noteData.fileUrl} target="_blank" rel="noreferrer">
                  View PDF
                </a>
              </p>
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
