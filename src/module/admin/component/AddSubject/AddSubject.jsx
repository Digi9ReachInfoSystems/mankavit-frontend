// AddSubject.jsx
import React, { useState, useRef } from "react";
import uplaod from "../../../../assets/upload.png";
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
  PriceInput,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
} from "../AddSubject/AddSubject.style"; // Adjust the path if needed

export default function AddSubject() {
  // State for form fields
  const [subjectTitle, setSubjectTitle] = useState("CLAT");
  const [vimeoId, setVimeoId] = useState("ANUJA");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("1499");
  const [actualPrice, setActualPrice] = useState("2999");

  // Two sets of checkboxes, e.g. for "Add Notes" and "Add Mock Test"
  const [notesCheckboxes, setNotesCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
  ]);

  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
  ]);

  // File upload state
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handler for checkboxes
  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
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
      setThumbnailFile(e.target.files[0]);
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
      <Title>Add Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Left & Right Column */}
        <FormRow>
          {/* LEFT COLUMN */}
          <Column>
            <FieldWrapper>
              <Label htmlFor="subjectTitle">Subject Title</Label>
              <Input
                id="subjectTitle"
                value={subjectTitle}
                onChange={(e) => setSubjectTitle(e.target.value)}
                placeholder="Enter Subject Title"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="internalTitle">Subject Internal Title</Label>
              <Input
                id="internalTitle"
                value={internalTitle}
                onChange={(e) => setInternalTitle(e.target.value)}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>

        
          </Column>

          {/* RIGHT COLUMN */}
          <Column>
            <FieldWrapper>
              <Label htmlFor="vimeoId">Add Vimeo Showcase ID</Label>
              <Input
                id="vimeoId"
                value={vimeoId}
                onChange={(e) => setVimeoId(e.target.value)}
                placeholder="Enter Vimeo ID"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="shortDescription">Subject Short Description</Label>
              <Input
                id="shortDescription"
                rows="2"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter short description"
              />
            </FieldWrapper>

      
          </Column>
        </FormRow>

        {/* Row 2: Add Notes + Add Mock Test */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>
                Add Notes ( Click Checkbox to Select )
              </CheckboxSectionTitle>
              <CheckboxList>
                {notesCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setNotesCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>
                Add Mock Test ( Click Checkbox to Select )
              </CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setMockTestCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 3: Upload Thumbnail */}
        <FormRow>
          <Column>
            
          <Label>Upload Thumbnail</Label>
           <div className="upload-area">
          
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile ? (
                <p>{thumbnailFile.name}</p>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uplaod} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag and drop image here</p>
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
            </div>
          </Column>
        </FormRow>

        {/* Row 4: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add Subject</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
