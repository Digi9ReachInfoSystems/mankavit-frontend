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
import { getAllMocktest } from "../../../../../api/mocktestApi";
import toast from "react-hot-toast";
import { getAllLectures } from "../../../../../api/lecturesApi";

export default function ViewSubject() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  const [mockTestNames, setMockTestNames ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, notesRes, lecsRes, mockRes] = await Promise.all([
          getSubjectById(id),
          getAllNotes(),
          getAllLectures(),
          getAllMocktest(),
        ]);

        const subjectData = subRes.data;
        setSubject(subjectData);

        // 1) Build lookup maps
        const noteMap = {};
        if (notesRes.success && Array.isArray(notesRes.data)) {
          notesRes.data.forEach(n => {
            noteMap[n._id] = n.noteDisplayName || n.title || n.name;
          });
        }

        const lectureMap = {};
        if (lecsRes.success && Array.isArray(lecsRes.data)) {
          lecsRes.data.forEach(l => {
            lectureMap[l._id] = l.lectureName || l.title;
          });
        }

        const mockMap = {};
        if (mockRes.success && Array.isArray(mockRes.data)) {
          mockRes.data.forEach(m => {
            mockMap[m._id] = m.title;
          });
        }

        // 2) Turn subjectData.<collection> (array of IDs) into display-name arrays
        const resolveId = item =>
          typeof item === "object"
            ? item._id || item.$oid
            : item;

        setNotes(
          (subjectData.notes || []).map(item => {
            const key = resolveId(item);
            return noteMap[key] || `Note (${key})`;
          })
        );

        setLectures(
          (subjectData.lectures || []).map(item => {
            const key = resolveId(item);
            return lectureMap[key] || `Lecture (${key})`;
          })
        );

        setMockTestNames(
          (subjectData.mockTests || []).map(item => {
            const key = resolveId(item);
            return mockMap[key] || `Mock Test (${key})`;
          })
        );

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load subject data");
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
          {/* <Column>
              <CheckboxSection>
              <Label>Mock Tests</Label>
              <CheckboxList>
                {mockTestNames.length > 0 ? (
                  mockTestNames.map((t, i) => <Field key={i}>{t}</Field>)
                ) : (
                  <Field>No mock tests associated</Field>
                )}
              </CheckboxList>
            </CheckboxSection>
          </Column> */}
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