// src/module/user/components/AddSubject/AddSubject.jsx
import React, { useState, useRef, useEffect } from "react";
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
import toast, { Toaster } from 'react-hot-toast';
import { getAllNotes } from "../../../../../api/notesApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createSubject } from "../../../../../api/subjectApi";
import { getAllLectures } from "../../../../../api/lecturesApi";

export default function AddSubject() {
  const [subjectTitle, setSubjectTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
    if (!subjectTitle || !internalTitle || !vimeoId || !thumbnailFile) {
      toast.error("All fields are required");
      return;
    }

    try {
      // upload thumbnail
      const { blobUrl } = await uploadFileToAzureStorage(thumbnailFile, "subjects");

      // collect checked IDs
      const notes    = notesCheckboxes.filter(i => i.checked).map(i => i.id);
      const lectures = lecturesCheckboxes.filter(i => i.checked).map(i => i.id);

      // create
      await createSubject({
        subjectName:       internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID:    vimeoId,
        description:        shortDescription,
        notes,
        lectures,
        image: blobUrl,
        courses: []
      });

      toast.success("Subject created successfully");
      // reset form
      setSubjectTitle("");
      setInternalTitle("");
      setVimeoId("");
      setShortDescription("");
      setThumbnailFile(null);
      setNotesCheckboxes(ns => ns.map(n => ({ ...n, checked: false })));
      setLecturesCheckboxes(ls => ls.map(l => ({ ...l, checked: false })));
      setTimeout(() => navigate("/admin/subject-management"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Subject creation failed");
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Add Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Titles & Vimeo */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Input
                value={subjectTitle}
                onChange={e => setSubjectTitle(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                placeholder="Enter Subject Title"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Input
                value={internalTitle}
                onChange={e => setInternalTitle(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
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
            <FieldWrapper>
              <Label>Short Description</Label>
              <Input
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                placeholder="Enter Short Description"
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
                {notesCheckboxes.map((n,i) => (
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
              <CheckboxSectionTitle>Add Lectures</CheckboxSectionTitle>
              <CheckboxList>
                {lecturesCheckboxes.map((l,i) => (
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
