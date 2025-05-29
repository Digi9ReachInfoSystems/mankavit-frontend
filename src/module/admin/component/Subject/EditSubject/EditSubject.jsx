// src/module/admin/components/EditSubject/EditSubject.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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

export default function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // form fields
  const [subjectTitle, setSubjectTitle]       = useState("");
  const [internalTitle, setInternalTitle]     = useState("");
  const [vimeoId, setVimeoId]                 = useState("");
  const [shortDescription, setShortDescription] = useState("");

  // checkboxes
  const [notesCheckboxes, setNotesCheckboxes]       = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);

  // image upload
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl]       = useState(null);

  // fetch existing subject, notes & lectures
  useEffect(() => {
    async function fetchData() {
      try {
        const [subRes, notesRes, lecturesRes] = await Promise.all([
          getSubjectById(id),
          getAllNotes(),
          getAllLectures(),
        ]);
        const subject = subRes.data;

        // set text fields
        setSubjectTitle(subject.subjectDisplayName || "");
        setInternalTitle(subject.subjectName || "");
        setVimeoId(subject.vimeoShowcaseID || "");
        setShortDescription(subject.description || "");
        if (subject.image) {
          setPreviewUrl(subject.image);
        }

        // IDs already assigned
        const noteIds    = subject.notes.map(n => n._id || n);
        const lectureIds = subject.lectures.map(l => l._id || l);

        // build notes checkboxes
        setNotesCheckboxes(
          notesRes.data.map(n => ({
            label: n.noteDisplayName || n.title,
            id: n._id,
            checked: noteIds.includes(n._id),
          }))
        );
        // build lectures checkboxes
        setLecturesCheckboxes(
          lecturesRes.data.map(l => ({
            label: l.lectureName || l.title,
            id: l._id,
            checked: lectureIds.includes(l._id),
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Unable to fetch subject details");
        navigate("/admin/subject-management");
      }
    }
    fetchData();

    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [id, navigate, previewUrl]);

  const handleCheckboxChange = (index, setter) =>
    setter(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );

  const handleUploadAreaClick = () => fileInputRef.current?.click();
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setThumbnailFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!subjectTitle.trim())       return toast.error("Enter subject title.");
    if (!internalTitle.trim())      return toast.error("Enter internal title.");
    if (!vimeoId.trim())            return toast.error("Enter Vimeo ID.");

    let imageUrl = previewUrl;
    if (thumbnailFile) {
      try {
        const { blobUrl } = await uploadFileToAzureStorage(thumbnailFile, "subjects");
        imageUrl = blobUrl;
      } catch (uploadErr) {
        console.error("Upload error:", uploadErr);
        return toast.error("Failed to upload image");
      }
    }

    const selectedNotes    = notesCheckboxes.filter(n => n.checked).map(n => n.id);
    const selectedLectures = lecturesCheckboxes.filter(l => l.checked).map(l => l.id);

    try {
      await updateSubjectById(id, {
        subjectName:        internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID:    vimeoId,
        description:        shortDescription,
        notes:              selectedNotes,
        lectures:           selectedLectures,
        image:              imageUrl,
      });
      toast.success("Subject updated successfully");
      setTimeout(() => navigate("/admin/subject-management"), 1500);
    } catch (err) {
      console.error("Update failed:", err);
      const msg = err.response?.data?.message || err.message || "Update failed";
      toast.error(msg);
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Edit Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Subject Title</Label>
              <Input
                value={subjectTitle}
                onChange={e => setSubjectTitle(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                placeholder="Enter Subject Title"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Internal Title</Label>
              <Input
                value={internalTitle}
                onChange={e => setInternalTitle(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
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
                onChange={e => setShortDescription(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                placeholder="Enter Short Description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Notes</CheckboxSectionTitle>
              <CheckboxList>
                {notesCheckboxes.map((item, idx) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(idx, setNotesCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Lectures</CheckboxSectionTitle>
              <CheckboxList>
                {lecturesCheckboxes.map((item, idx) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(idx, setLecturesCheckboxes)}
                    />
                    {item.label}
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
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%" }} />
                  {thumbnailFile && <p>{thumbnailFile.name}</p>}
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uploadIcon} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag & drop image here</p>
                  <p>or <strong>Add Image</strong></p>
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

        <FormRow>
          <SubmitButton type="submit">Update Subject</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
