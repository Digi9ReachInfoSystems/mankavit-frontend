import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  CheckboxSection,
  CheckboxList,
  UploadArea,
  Field,
} from "./ViewSubject.styles";
import { getSubjectById } from "../../../../../api/subjectApi";
import { getAllNotes } from "../../../../../api/notesApi";
import toast from "react-hot-toast";
import { getAllLectures } from "../../../../../api/lecturesApi";

export default function ViewSubject() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, notesRes, lecturesRes] = await Promise.all([
          getSubjectById(id),
          getAllNotes(),
          getAllLectures()
        ]);

        console.log("Response subject by id",subjectRes.data);

        const subjectData = subjectRes.data;
        setSubject(subjectData);

        // Get note details for the subject's notes
        const subjectNotes = subjectData.notes.map(note => 
          note.noteDisplayName || `Note (${note._id})`
        );
        setNotes(subjectNotes);

        // Get lecture details for the subject's lectures
        const subjectLectures = subjectData.lectures.map(lecture => 
          lecture.lectureName || `Lecture (${lecture._id})`
        );
        setLectures(subjectLectures);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load subject data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!subject) {
    return <Container>Subject not found</Container>;
  }

  return (
    <Container>
      <Title>View Subject</Title>
      <FormWrapper>
        {/* Row 1 - Basic Info */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Field>{subject.subjectDisplayName || "N/A"}</Field>
            </FieldWrapper>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Field>{subject.subjectName || "N/A"}</Field>
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Vimeo ID</Label>
              <Field>{subject.vimeoShowcaseID || "N/A"}</Field>
            </FieldWrapper>
            <FieldWrapper>
              <Label>Description</Label>
              <Field>{subject.description || "N/A"}</Field>
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 - Notes and Mock Tests */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <Label>Associated Notes</Label>
              <CheckboxList>
                {notes.length > 0 ? (
                  notes.map((note, index) => (
                    <Field key={index}>{note}</Field>
                  ))
                ) : (
                  <Field>No notes associated with this subject</Field>
                )}
              </CheckboxList>
            </CheckboxSection>
          </Column>
          <Column>
            <CheckboxSection>
              <Label>Mock Tests</Label>
              <CheckboxList>
                {subject.mockTests?.length > 0 ? (
                  subject.mockTests.map((test, index) => (
                    <Field key={index}>
                      {typeof test === 'object' ? test.id || test.$oid : test}
                    </Field>
                  ))
                ) : (
                  <Field>No mock tests associated</Field>
                )}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>
        
        {/* Row 3 - Lectures */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <Label>Associated Lectures</Label>
              <CheckboxList>
                {lectures.length > 0 ? (
                  lectures.map((lecture, index) => (
                    <Field key={index}>{lecture}</Field>
                  ))
                ) : (
                  <Field>No lectures associated with this subject</Field>
                )}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 4 - Thumbnail */}
        <FormRow>
          <Column>
            <Label>Thumbnail</Label>
            <UploadArea style={{ cursor: "default" }}>
              {subject.image ? (
                <img 
                  src={subject.image} 
                  alt="Subject thumbnail" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    maxHeight: '300px'
                  }} 
                />
              ) : (
                <Field>No thumbnail available</Field>
              )}
            </UploadArea>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}