// AddCourse.jsx
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
  ToggleSwitch,
} from "../AddCourse/AddCourse.style"; // Adjust the path if needed

export default function AddCourse() {
  // State for form fields
  const [courseTitle, setCourseTitle] = useState("CLAT");
  const [internalTitle, setInternalTitle] = useState("ANUJA");
  const [shortDescription, setShortDescription] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("1499");
  const [actualPrice, setActualPrice] = useState("2999");
  const [isKYCRequired, setIsKYCRequired] = useState(false);

  // Checkbox selections for Add Subject and Add Mock Test
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
  ]);

  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
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
  const handleToggleChange = () => {
    setIsKYCRequired(!isKYCRequired);
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
      <Title>Add Course</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Course Title & Course Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter Course Title"
              />
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label htmlFor="internalTitle">Course Internal Title</Label>
              <Input
                id="internalTitle"
                value={internalTitle}
                onChange={(e) => setInternalTitle(e.target.value)}
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2: Course Short Description */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription">Course Short Description</Label>
              <TextArea
                id="shortDescription"
                rows="3"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter short description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3: Discounted Price & Actual Price */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="discountedPrice">Discounted Price</Label>
              <PriceInput
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                placeholder="₹1499"
              />
            </FieldWrapper>
          </Column>

          <Column>
            <FieldWrapper>
              <Label htmlFor="actualPrice">Actual Price</Label>
              <PriceInput
                id="actualPrice"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
                placeholder="₹2999"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 4: Add Subject + Add Mock Test */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>
                Add Subject 
              </CheckboxSectionTitle>
              <CheckboxList>
                {subjectCheckboxes.map((item, index) => (
                  <CheckboxLabel key={index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setSubjectCheckboxes)}
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

        {/* Row 5: Add Notes */} 
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="shortDescription"> Description</Label>
              <TextArea
                id="shortDescription"
                rows="4"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter short description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 6: Upload Thumbnail and KYC Toggle (Side by Side) */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile ? (
                <p>{thumbnailFile.name}</p>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={uplaod} className="upload-icon" alt="" />
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
          </Column>

          <Column className="toggle-column">
            <FieldWrapper style={{flexDirection: "row", alignItems: "center"}}>
              <Label style={{marginBottom: "0px"}}>Is KYC Required?</Label>
              <ToggleSwitch
                type="checkbox"
                checked={isKYCRequired}
                onChange={handleToggleChange}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 7: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add Course</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
