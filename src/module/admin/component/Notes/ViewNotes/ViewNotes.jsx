import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  FileLink,
  BackButton
} from "./ViewNotes.styles";
import { getNotesById } from "../../../../../api/notesApi";
import toast, { Toaster } from 'react-hot-toast';
import { getSubjects } from "../../../../../api/subjectApi";

export default function ViewNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState({
    noteDisplayName: "",
    noteName: "",
    isDownload: false,
    fileUrl: "",
    subjects: []
  });
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        setLoading(true);
        
        // Fetch note data and subjects in parallel
        const [noteResponse, subjectsResponse] = await Promise.all([
          getNotesById(id),
          getSubjects()
        ]);

        const note = noteResponse.data;
        const allSubjects = subjectsResponse.data;

        // Map subject IDs to subject names
        const subjectNames = note.subjects.map(subjectId => {
          const subject = allSubjects.find(s => s._id === subjectId._id);
          return subject ? subject.subjectName : "Unknown Subject";
        });
        setNoteData({
          noteDisplayName: note.noteDisplayName,
          noteName: note.noteName,
          isDownload: note.isDownload,
          fileUrl: note.fileUrl,
          subjects: subjectNames
        });

        setSubjects(allSubjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching note data:", error);
        toast.error('Failed to load note data', {
          duration: 3000,
          position: 'top-right',
        });
        navigate("/admin/notes-management");
      }
    };

    fetchNoteData();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container>
        <Title>Loading Note...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Toaster />
      <Title>View Note</Title>
      {/* <BackButton onClick={() => navigate("/admin/notes-management")}> */}
      {/* Back to Notes */}
      {/* </BackButton> */}
      
      <FormWrapper>
        {/* Row 1: Note Title & Note Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Note Title</Label>
              <Field>{noteData.noteDisplayName}</Field>
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label>Note Internal Title</Label>
              <Field>{noteData.noteName}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2: Subjects */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <Label>Subjects</Label>
              <CheckboxList>
                {noteData.subjects.length > 0 ? (
                  noteData.subjects.map((subject, index) => (
                    <Field key={index}>{subject}</Field>
                  ))
                ) : (
                  <Field>No subjects assigned</Field>
                )}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 3: Uploaded PDF and Downloadable Status */}
        <FormRow>
          <Column>
            <Label>Uploaded PDF</Label>
            <UploadArea style={{ cursor: "default" }}>
              {noteData.fileUrl ? (
                <>
                  <UploadPlaceholder>
                    <img src={upload} alt="PDF Icon" />
                  </UploadPlaceholder>
                  <FileLink href={noteData.fileUrl} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </FileLink>
                </>
              ) : (
                <Field>No file uploaded</Field>
              )}
            </UploadArea>
          </Column>

          <Column style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FieldWrapper style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Label style={{ marginBottom: 0 }}>Is it downloadable?</Label>
              <ToggleSwitch type="checkbox" checked={noteData.isDownload} disabled />
            </FieldWrapper>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}