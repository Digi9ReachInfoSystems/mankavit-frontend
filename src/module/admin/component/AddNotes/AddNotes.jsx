// AddNote.jsx
import React, { useState, useRef } from "react";
import upload from "../../../../assets/upload.png";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  Input,
  TextArea,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  CheckboxSection,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  SubmitButton,
  CheckboxSectionTitle,
  ToggleSwitch,
} from "../AddNotes/AddNotes.style"; // Adjust the path if needed

// Default checkbox subjects
const defaultSubjects = [
  { label: "Mankavit Mock Test – CLAT 2025", checked: true },
  { label: "Mankavit Mock Test – CLAT 2025", checked: false },
  { label: "Mankavit Mock Test – CLAT 2025", checked: false },
  { label: "Mankavit Mock Test – CLAT 2025", checked: false },
];

export default function AddNote() {
  // State for form fields
  const [noteTitle, setNoteTitle] = useState("CLAT");
  const [internalTitle, setInternalTitle] = useState("ANUJA");
  const [shortDescription, setShortDescription] = useState("");
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [subjectsCheckboxes, setSubjectsCheckboxes] = useState(defaultSubjects);

  // File upload state
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handler for checkboxes
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = subjectsCheckboxes.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setSubjectsCheckboxes(updatedCheckboxes);
  };

  // For triggering the hidden file input
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // For reading selected file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your logic (e.g., API call)
    console.log("Form submitted!");
  };

  return (
    <Container>
      <Title>Add Note</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Note Title & Note Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noteTitle">Note Title</Label>
              <Input
                id="noteTitle"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Enter Note Title"
              />
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label htmlFor="internalTitle">Note Internal Title</Label>
              <Input
                id="internalTitle"
                value={internalTitle}
                onChange={(e) => setInternalTitle(e.target.value)}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2: Upload PDF */}
        <FormRow>
          <Column>
            <Label>Upload Files PDF</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {pdfFile ? (
                <p>{pdfFile.name}</p>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag and drop PDF here</p>
                  <p>or <strong>Add PDF</strong></p>
                </>
              )}
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </UploadArea>
          </Column>
        </FormRow>

        {/* Row 3: Is Downloadable Toggle */}
        <FormRow>
          <Column style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FieldWrapper style={{ marginBottom: 0 }}>
              <Label htmlFor="isDownloadable">Is it downloadable?</Label>
              <ToggleSwitch
                id="isDownloadable"
                type="checkbox"
                checked={isDownloadable}
                onChange={() => setIsDownloadable(!isDownloadable)}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 4: Add Subjects */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Subjects (Click Checkbox to Select)</CheckboxSectionTitle>
              <CheckboxList>
                {subjectsCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 5: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add User</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
