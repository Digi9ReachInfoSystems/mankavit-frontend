// src/module/admin/components/EditSubject/EditSubject.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getAllNotes } from "../../../../../api/notesApi";
import { getAllLectures } from "../../../../../api/lecturesApi";
import { getSubjectById, updateSubjectById } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { getAllMocktest } from "../../../../../api/mocktestApi";
import { getAllCourses } from "../../../../../api/courseApi";
import JoditEditor from 'jodit-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getAuth } from "../../../../../utils/authService";

export default function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const editor = useRef(null);

  // form fields
  const [subjectTitle, setSubjectTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  // checkbox items
  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([]);
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);
const [thumbnailFile, setThumbnailFile] = useState(null);
  // per-section search state
  const [notesSearch, setNotesSearch] = useState("");
  const [lecturesSearch, setLecturesSearch] = useState("");
  const [mockSearch, setMockSearch] = useState("");
  const [coursesSearch, setCoursesSearch] = useState("");

  // permissions
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAuth();
      if (response.isSuperAdmin) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions.courseManagement.readOnly);
      }
    })();
  }, []);

  // fetch existing subject and checkbox data
  useEffect(() => {
    async function fetchData() {
      try {
        const [subRes, notesRes, lectRes, mockRes, courseRes] = await Promise.all([
          getSubjectById(id),
          getAllNotes(),
          getAllLectures(),
          getAllMocktest(),
          getAllCourses(),
        ]);
        const subject = subRes.data;

        // set form fields
        setSubjectTitle(subject.subjectDisplayName || "");
        setInternalTitle(subject.subjectName || "");
        setVimeoId(subject.vimeoShowcaseID || "");
        setShortDescription(subject.description || "");
        if (subject.image) setPreviewUrl(subject.image);

        // existing IDs
        const noteIds = subject.notes.map(n => n._id || n);
        const lectureIds = subject.lectures.map(l => l._id || l);
        const mockIds = subject.mockTests.map(m => m._id || m);
        const courseIds = subject.courses.map(c => c._id || c);

        // sort & build notes
        const sortedNotes = notesRes.data
          .sort((a, b) => (a.noteDisplayName || a.title).localeCompare(b.noteDisplayName || b.title))
          .map(n => ({ id: n._id, label: n.noteDisplayName || n.title, checked: noteIds.includes(n._id) }));
        setNotesCheckboxes(sortedNotes);

        // sort & build lectures
        const sortedLectures = lectRes.data
          .sort((a, b) => (a.lectureName || a.title).localeCompare(b.lectureName || b.title))
          .map(l => ({ id: l._id, label: l.lectureName || l.title, checked: lectureIds.includes(l._id) }));
        setLecturesCheckboxes(sortedLectures);

        // sort & build mock tests
        const sortedMocks = mockRes.data
          .sort((a, b) => (a.title || a.mockTestName).localeCompare(b.title || b.mockTestName))
          .map(m => ({ id: m._id, label: m.title || m.mockTestName, checked: mockIds.includes(m._id) }));
        setMockTestCheckboxes(sortedMocks);

        // sort & build courses
        const sortedCourses = courseRes.data
          .sort((a, b) => (a.courseName || a.title).localeCompare(b.courseName || b.title))
          .map(c => ({ id: c._id, label: c.courseName || c.title, checked: courseIds.includes(c._id) }));
        setCoursesCheckboxes(sortedCourses);

      } catch (err) {
        console.error(err);
        toast.error("Unable to fetch subject details");
        navigate("/admin/subject-management");
      }
    }
    fetchData();
  }, [id, navigate]);

  // cleanup preview URL
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  const handleCheckboxChange = (idx, setter) =>
    setter(list => list.map((it, i) => i === idx ? { ...it, checked: !it.checked } : it));

  const handleUploadAreaClick = () => fileInputRef.current?.click();
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file.");
    setThumbnailFile(file);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!subjectTitle.trim() || !internalTitle.trim() || !vimeoId.trim()) {
      return toast.error("Please fill in all required fields.");
    }
    let imageUrl = previewUrl;
    if (thumbnailFile) {
      try {
        const { blobUrl } = await uploadFileToAzureStorage(thumbnailFile, "subjects");
        imageUrl = blobUrl;
      } catch {
        return toast.error("Failed to upload image");
      }
    }
    const notes     = notesCheckboxes.filter(n => n.checked).map(n => n.id);
    const lectures  = lecturesCheckboxes.filter(l => l.checked).map(l => l.id);
    const mocks     = mockTestCheckboxes.filter(m => m.checked).map(m => m.id);
    const courses   = coursesCheckboxes.filter(c => c.checked).map(c => c.id);

    try {
      await updateSubjectById(id, {
        subjectName: internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID: vimeoId,
        description: shortDescription,
        notes,
        lectures,
        mockTests: mocks,
        courses,
        image: imageUrl,
      });
      toast.success("Subject updated successfully");
      setTimeout(() => navigate("/admin/subject-management"), 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg || "Update failed");
    }
  };

  const editorConfig = useMemo(() => ({ readonly: false, placeholder: shortDescription }), [shortDescription]);

  // filtered lists
  const filteredNotes    = notesCheckboxes.filter(n => n.label.toLowerCase().includes(notesSearch.toLowerCase()));
  const filteredLectures = lecturesCheckboxes.filter(l => l.label.toLowerCase().includes(lecturesSearch.toLowerCase()));
  const filteredMocks    = mockTestCheckboxes.filter(m => m.label.toLowerCase().includes(mockSearch.toLowerCase()));
  const filteredCourses  = coursesCheckboxes.filter(c => c.label.toLowerCase().includes(coursesSearch.toLowerCase()));

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <Title>Edit Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
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

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Short Description</Label>
              <JoditEditor ref={editor} value={shortDescription} config={editorConfig} tabIndex={1} onBlur={() => {}} onChange={setShortDescription} />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Notes</CheckboxSectionTitle>
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
              <CheckboxSectionTitle>Select Lectures</CheckboxSectionTitle>
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

        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select MockTests</CheckboxSectionTitle>
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
              <CheckboxSectionTitle>Select Courses</CheckboxSectionTitle>
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

        <FormRow>
          <Column>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {previewUrl ? (
                <> <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} /> {thumbnailFile && <p>{thumbnailFile.name}</p>} </>
              ) : (
                <> <UploadPlaceholder><img src={uploadIcon} alt="Upload" /></UploadPlaceholder><p>Drag & drop image here</p><p>or <strong>Add Image</strong></p> </>
              )}
              <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
            </UploadArea>
          </Column>
        </FormRow>

        {!readOnlyPermissions && (
          <FormRow>
            <SubmitButton type="submit">Update Subject</SubmitButton>
          </FormRow>
        )}
      </FormWrapper>
    </Container>
  );
}
