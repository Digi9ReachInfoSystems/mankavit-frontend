// src/module/user/components/AddSubject/AddSubject.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import uploadIcon from "../../../../../assets/upload.png";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  Input,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
} from "../AddSubject/AddSubject.style";
import { useNavigate } from "react-router-dom";
import { getAllNotes } from "../../../../../api/notesApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createSubject } from "../../../../../api/subjectApi";
import { getAllLectures } from "../../../../../api/lecturesApi";
import { getAllMocktest } from "../../../../../api/mocktestApi";
import { getAllCourses } from "../../../../../api/courseApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

export default function AddSubject() {
  const [subjectTitle, setSubjectTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // checkbox items
  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([]);
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);

  // per-section search state
  const [notesSearch, setNotesSearch] = useState("");
  const [lecturesSearch, setLecturesSearch] = useState("");
  const [mockSearch, setMockSearch] = useState("");
  const [coursesSearch, setCoursesSearch] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const editor = useRef(null);

  // fetch and sort notes
  useEffect(() => {
    (async () => {
      try {
        const notesResp = await getAllNotes();
        const sorted = notesResp.data
          .sort((a, b) => a.noteDisplayName.localeCompare(b.noteDisplayName))
          .map(n => ({ id: n._id, label: n.noteDisplayName, checked: false }));
        setNotesCheckboxes(sorted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load notes");
      }
    })();
  }, []);

  // fetch and sort lectures
  useEffect(() => {
    (async () => {
      try {
        const resp = await getAllLectures();
        const sorted = resp.data
          .sort((a, b) => a.lectureName.localeCompare(b.lectureName))
          .map(l => ({ id: l._id, label: l.lectureName, checked: false }));
        setLecturesCheckboxes(sorted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lectures");
      }
    })();
  }, []);

  // fetch and sort mock tests
  useEffect(() => {
    (async () => {
      try {
        const resp = await getAllMocktest();
        const sorted = resp.data
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(m => ({ id: m._id, label: m.title, checked: false }));
        setMockTestCheckboxes(sorted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load mock tests");
      }
    })();
  }, []);

  // fetch and sort courses
  useEffect(() => {
    (async () => {
      try {
        const resp = await getAllCourses();
        const sorted = resp.data
          .sort((a, b) => a.courseName.localeCompare(b.courseName))
          .map(c => ({ id: c._id, label: c.courseName, checked: false }));
        setCoursesCheckboxes(sorted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load courses");
      }
    })();
  }, []);

  // cleanup preview URL
  useEffect(() => () => {
    previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleCheckboxChange = (idx, setter) =>
    setter(list =>
      list.map((it, i) => (i === idx ? { ...it, checked: !it.checked } : it))
    );

  const handleUploadAreaClick = () => fileInputRef.current?.click();
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setThumbnailFile(file);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!internalTitle.trim()) {
      toast.error("Subject Name is required");
      return;
    }
    try {
      const { blobUrl } = await uploadFileToAzureStorage(thumbnailFile, "subjects");
      const notes = notesCheckboxes.filter(i => i.checked).map(i => i.id);
      const lectures = lecturesCheckboxes.filter(i => i.checked).map(i => i.id);
      const mocks = mockTestCheckboxes.filter(i => i.checked).map(i => i.id);
      const courses = coursesCheckboxes.filter(i => i.checked).map(i => i.id);
      await createSubject({
        subjectName: internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID: vimeoId,
        description: shortDescription,
        notes,
        lectures,
        mockTests: mocks,
        courses,
        image: blobUrl,
      });
      toast.success("Subject created successfully");
      // reset
      setSubjectTitle(""); setInternalTitle(""); setVimeoId("");
      setShortDescription(""); setThumbnailFile(null);
      setNotesCheckboxes(ns => ns.map(n => ({ ...n, checked: false })));
      setLecturesCheckboxes(ls => ls.map(l => ({ ...l, checked: false })));
      setMockTestCheckboxes(ms => ms.map(m => ({ ...m, checked: false })));
      setCoursesCheckboxes(cs => cs.map(c => ({ ...c, checked: false })));
      setTimeout(() => navigate("/admin/subject-management"), 1000);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message;
      toast.error(msg || "Failed to create subject. Please try again");
    }
  };

  const editorConfig = useMemo(() => ({ readonly: false, placeholder: shortDescription }), [shortDescription]);

  // filtered arrays
  const filteredNotes = notesCheckboxes.filter(n => n.label.toLowerCase().includes(notesSearch.toLowerCase()));
  const filteredLectures = lecturesCheckboxes.filter(l => l.label.toLowerCase().includes(lecturesSearch.toLowerCase()));
  const filteredMocks = mockTestCheckboxes.filter(m => m.label.toLowerCase().includes(mockSearch.toLowerCase()));
  const filteredCourses = coursesCheckboxes.filter(c => c.label.toLowerCase().includes(coursesSearch.toLowerCase()));

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <Title>Add Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Titles & Vimeo */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Input value={subjectTitle} onChange={e => setSubjectTitle(e.target.value)} placeholder="Enter Subject Title" />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Input value={internalTitle} onChange={e => setInternalTitle(e.target.value)} placeholder="Enter Internal Title" />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Vimeo Showcase ID</Label>
              <Input value={vimeoId} onChange={e => setVimeoId(e.target.value)} placeholder="Enter Vimeo ID" />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Short Description */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Short Description</Label>
              <JoditEditor ref={editor} value={shortDescription} config={editorConfig} tabIndex={1}
                onBlur={newContent => {}} onChange={newContent => setShortDescription(newContent)} />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Notes & Lectures */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Notes</CheckboxSectionTitle>
              <Input placeholder="Search notes..." value={notesSearch} onChange={e => setNotesSearch(e.target.value)} style={{ margin: '8px 0' }} />
              <CheckboxList>
                {filteredNotes.map((n, i) => (
                  <CheckboxLabel key={n.id}>
                    <CheckboxInput type="checkbox" checked={n.checked} onChange={() => handleCheckboxChange(i, setNotesCheckboxes)} />
                    {n.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Video</CheckboxSectionTitle>
              <Input placeholder="Search lectures..." value={lecturesSearch} onChange={e => setLecturesSearch(e.target.value)} style={{ margin: '8px 0' }} />
              <CheckboxList>
                {filteredLectures.map((l, i) => (
                  <CheckboxLabel key={l.id}>
                    <CheckboxInput type="checkbox" checked={l.checked} onChange={() => handleCheckboxChange(i, setLecturesCheckboxes)} />
                    {l.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Mock Test & Courses */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Mock Test</CheckboxSectionTitle>
              <Input placeholder="Search mock tests..." value={mockSearch} onChange={e => setMockSearch(e.target.value)} style={{ margin: '8px 0' }} />
              <CheckboxList>
                {filteredMocks.map((m, i) => (
                  <CheckboxLabel key={m.id}>
                    <CheckboxInput type="checkbox" checked={m.checked} onChange={() => handleCheckboxChange(i, setMockTestCheckboxes)} />
                    {m.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Courses</CheckboxSectionTitle>
              <Input placeholder="Search courses..." value={coursesSearch} onChange={e => setCoursesSearch(e.target.value)} style={{ margin: '8px 0' }} />
              <CheckboxList>
                {filteredCourses.map((c, i) => (
                  <CheckboxLabel key={c.id}>
                    <CheckboxInput type="checkbox" checked={c.checked} onChange={() => handleCheckboxChange(i, setCoursesCheckboxes)} />
                    {c.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Thumbnail Upload */}
        <FormRow>
          <Column>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile && previewUrl ? (
                <><img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} /><p>{thumbnailFile.name}</p></>
              ) : (
                <><UploadPlaceholder><img src={uploadIcon} alt="Upload" /></UploadPlaceholder><p>Drag & drop image here</p><p>or <strong>Browse</strong></p></>
              )}
              <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
            </UploadArea>
          </Column>
        </FormRow>

        {/* Submit */}
        <FormRow>
          <SubmitButton type="submit">Add Subject</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
