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
// import toast, { Toaster } from 'react-hot-toast';
import { getAllNotes } from "../../../../../api/notesApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createSubject } from "../../../../../api/subjectApi";
import { getAllLectures } from "../../../../../api/lecturesApi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { getAllMocktest } from "../../../../../api/mocktestApi";
import { getAllCourses } from "../../../../../api/courseApi";
import JoditEditor from 'jodit-react';
export default function AddSubject() {
  const [subjectTitle, setSubjectTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([]);
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const editor = useRef(null);

  // fetch notes
  useEffect(() => {
    (async () => {
      try {
        const notesResp = await getAllNotes();
        setNotesCheckboxes(
          notesResp.data.map(n => ({ id: n._id, label: n.noteDisplayName, checked: false }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load notes");
      }
    })();
  }, []);

  // fetch lectures
  useEffect(() => {
    (async () => {
      try {
        const lectResp = await getAllLectures();
        setLecturesCheckboxes(
          lectResp.data.map(l => ({ id: l._id, label: l.lectureName, checked: false }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lectures");
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const lectResp = await getAllMocktest();

        setMockTestCheckboxes(
          lectResp.data.map(l => ({ id: l._id, label: l.title, checked: false }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lectures");
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const lectResp = await getAllCourses();

        setCoursesCheckboxes(
          lectResp.data.map(l => ({ id: l._id, label: l.courseName, checked: false }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lectures");
      }
    })();
  }, []);

  // cleanup preview URL
  useEffect(() => {
    return () => {
      previewUrl && URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleCheckboxChange = (idx, setter) =>
    setter(list => list.map((it, i) => i === idx ? { ...it, checked: !it.checked } : it));

  const handleUploadAreaClick = () => fileInputRef.current?.click();
  const handleFileChange = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setThumbnailFile(f);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // if (!subjectTitle || !internalTitle || !vimeoId || !thumbnailFile) {
    //   toast.error("All fields are required");
    //   return;
    // }
    if (!internalTitle.trim()) {
      toast.error("Subject Name is required");
      return;
    }

    try {
      // upload thumbnail
      const { blobUrl } = await uploadFileToAzureStorage(thumbnailFile, "subjects");

      // collect checked IDs
      const notes = notesCheckboxes.filter(i => i.checked).map(i => i.id);
      const lectures = lecturesCheckboxes.filter(i => i.checked).map(i => i.id);

      // create
      await createSubject({
        subjectName: internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID: vimeoId,
        description: shortDescription,
        notes,
        lectures,
        image: blobUrl,
        courses: coursesCheckboxes.filter(i => i.checked).map(i => i.id),
        mockTests: mockTestCheckboxes.filter(i => i.checked).map(i => i.id)
      });

      toast.success("Data created successfully");
      // reset form
      setSubjectTitle("");
      setInternalTitle("");
      setVimeoId("");
      setShortDescription("");
      setThumbnailFile(null);
      setNotesCheckboxes(ns => ns.map(n => ({ ...n, checked: false })));
      setLecturesCheckboxes(ls => ls.map(l => ({ ...l, checked: false })));
      setTimeout(() => navigate("/admin/subject-management"), 1000);
    } catch (err) {
      console.error(err)
      if (err.status == 400 && err.response.data.message === "Subject with this name already exists") {
        toast.error("Subject with this name already exists")
      } else {
        toast.error("Failed to create subject.Please try again");
      }

    }
  };
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: shortDescription,
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []);

  return (
    <Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />

      <Title>Add Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Titles & Vimeo */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Input
                value={subjectTitle}
                onChange={e => setSubjectTitle(e.target.value)}
                placeholder="Enter Subject Title"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Input
                value={internalTitle}
                onChange={e => setInternalTitle(e.target.value)}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Vimeo Showcase ID</Label>
              <Input
                value={vimeoId}
                onChange={e => setVimeoId(e.target.value)}
                placeholder="Enter Vimeo ID"
              />
            </FieldWrapper>
            {/* <FieldWrapper>
              <Label>Short Description</Label>
              <Input
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                placeholder="Enter Short Description"
              />
            </FieldWrapper> */}
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription">Short Description</Label>
              <JoditEditor
                ref={editor}
                value={shortDescription}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => { console.log("new", newContent); }} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { setShortDescription(newContent); }}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Notes */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Notes</CheckboxSectionTitle>
              <CheckboxList>
                {notesCheckboxes.map((n, i) => (
                  <CheckboxLabel key={n.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={n.checked}
                      onChange={() => handleCheckboxChange(i, setNotesCheckboxes)}
                    />
                    {n.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          {/* Lectures */}
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Video</CheckboxSectionTitle>
              <CheckboxList>
                {lecturesCheckboxes.map((l, i) => (
                  <CheckboxLabel key={l.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={l.checked}
                      onChange={() => handleCheckboxChange(i, setLecturesCheckboxes)}
                    />
                    {l.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>
        {/* Mock Test */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Mock Test</CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((l, i) => (
                  <CheckboxLabel key={l.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={l.checked}
                      onChange={() => handleCheckboxChange(i, setMockTestCheckboxes)}
                    />
                    {l.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Courses</CheckboxSectionTitle>
              <CheckboxList>
                {coursesCheckboxes.map((l, i) => (
                  <CheckboxLabel key={l.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={l.checked}
                      onChange={() => handleCheckboxChange(i, setCoursesCheckboxes)}
                    />
                    {l.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Thumbnail */}
        <FormRow>
          <Column>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile && previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
                  <p>{thumbnailFile.name}</p>
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uploadIcon} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag & drop image here</p>
                  <p>or <strong>Browse</strong></p>
                </>
              )}
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
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
