import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import upload from "../../../../../assets/upload.png";
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
import {
  getSubjectById,
  updateSubjectById,
} from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";

const STATIC_MOCK_TESTS = [
  { label: "Mankavit Mock Test – CLAT 2025", id: "mock1" },
  { label: "Mankavit Mock Test – CLAT 2025", id: "mock2" },
];

export default function EditSubject() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [subjectTitle, setSubjectTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState(
    STATIC_MOCK_TESTS.map((m) => ({ ...m, checked: false }))
  );

  const [thumbnailFile, setThumbnailFile] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null);       

  useEffect(() => {
    const fillForm = async () => {
      try {
        const [subData, notesRes, lecturesRes] = await Promise.all([
          getSubjectById(id),
          getAllNotes(),
          getAllLectures(),
        ]);

        const subject = subData.data;

        const subjectNoteIds = subject.notes.map(note =>
          typeof note === 'object' ? note._id : note
        );

        const subjectLectureIds = subject.lectures.map(lecture =>
          typeof lecture === 'object' ? lecture._id : lecture
        );

        setNotesCheckboxes(
          notesRes.data.map((n) => ({
            label: n.noteDisplayName,
            id: n._id,
            checked: subjectNoteIds.includes(n._id),
          }))
        );

        setLecturesCheckboxes(
          lecturesRes.data.map((l) => ({
            label: l.lectureName,
            id: l._id,
            checked: subjectLectureIds.includes(l._id),
          }))
        );

        setMockTestCheckboxes(prev =>
          prev.map(m => ({
            ...m,
            checked: subject.mockTests?.some(mt =>
              (typeof mt === 'object' && mt.$oid ? mt.$oid : mt) === m.id
            ) ?? false
          }))
        );

        setSubjectTitle(subject.subjectDisplayName || "");
        setInternalTitle(subject.subjectName || "");
        setVimeoId(subject.vimeoShowcaseID || "");
        setShortDescription(subject.description || "");
        if (subject.image) setPreviewUrl(subject.image);
      } catch (err) {
        console.error(err);
        toast.error("Unable to fetch subject details");
        navigate("/admin/subject-management");
      }
    };

    fillForm();

    return () =>
      previewUrl?.startsWith("blob:") && URL.revokeObjectURL(previewUrl);
  }, [id, navigate]);

  const handleCheckboxChange = (index, setFn) =>
    setFn((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );

  const handleUploadAreaClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectTitle?.trim()) return toast.error("Please enter subject title.");
    if (!internalTitle?.trim()) return toast.error("Please enter internal subject title.");
    if (!vimeoId?.trim()) return toast.error("Please enter Vimeo showcase ID.");

    try {
      let imageUrl = previewUrl;
      if (thumbnailFile) {
        try {
          const { blobUrl } = await uploadFileToAzureStorage(
            thumbnailFile,
            "subjects"
          );
          imageUrl = blobUrl;
        } catch (uploadError) {
          console.error("File upload error:", uploadError);
          toast.error("Failed to upload image");
          return;
        }
      }

      const notes = notesCheckboxes
        .filter((n) => n.checked)
        .map((n) => n.id);
      const mockTests = mockTestCheckboxes
        .filter((m) => m.checked)
        .map((m) => m.id);
      const lectures = lecturesCheckboxes
        .filter((l) => l.checked)
        .map((l) => l.id);

const data =      await updateSubjectById(id, {
        subjectName: internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID: vimeoId,
        description: shortDescription,
        notes,
        mockTests,
        image: imageUrl,
        lectures
      });

      console.log("Updated subject response", data);

      // toast.success("Subject updated successfully.");
      setTimeout(() => navigate("/admin/subject-management"), 2000);
    } catch (err) {
      console.error("Update error:", err); 
      if (err.response) {
        toast.error(`Update failed: ${err.response.data.message || err.message}`);
      } else if (err.request) {
        toast.error("No response from server. Check your network connection.");
      } else {
        toast.error("Update failed. Please try again.");
      }
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
              <Label htmlFor="subjectTitle">Subject Title</Label>
              <Input
                id="subjectTitle"
                value={subjectTitle}
                onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setSubjectTitle(filteredData);
                }}
                placeholder="Enter Subject Title"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="internalTitle">Internal Title</Label>
              <Input
                id="internalTitle"
                value={internalTitle}
                onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setInternalTitle(filteredData);
                }}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label htmlFor="vimeoId">Vimeo Showcase ID</Label>
              <Input
                id="vimeoId"
                value={vimeoId}
                onChange={(e) => setVimeoId(e.target.value)}
                placeholder="Enter Vimeo ID"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={shortDescription}
               onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setShortDescription(filteredData);
                }}
                placeholder="Enter short description"
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
                      onChange={() =>
                        handleCheckboxChange(idx, setNotesCheckboxes)
                      }
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Mock Tests</CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((item, idx) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() =>
                        handleCheckboxChange(idx, setMockTestCheckboxes)
                      }
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
            <CheckboxSection>
              <CheckboxSectionTitle>Select Lectures</CheckboxSectionTitle>
              <CheckboxList>
                {lecturesCheckboxes.map((item, idx) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() =>
                        handleCheckboxChange(idx, setLecturesCheckboxes)
                      }
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
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {thumbnailFile && <p>{thumbnailFile.name}</p>}
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag and drop image here</p>
                  <p>
                    or <strong>Add Image</strong>
                  </p>
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
