import React, { useState, useRef } from "react";
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
  TextArea,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
} from "./AddLecturer.styles";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddLecturer() {
  const [lecturerName, setLecturerName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([
    { id: 1, label: "Mathematics", checked: false },
    { id: 2, label: "Physics", checked: false },
  ]);
  const [courseCheckboxes, setCourseCheckboxes] = useState([
    { id: 1, label: "Mock Test 1", checked: false },
    { id: 2, label: "Mock Test 2", checked: false },
  ]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (index, setter) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lecturerName || !duration || !description) {
      toast.error("Please fill all required fields!");
      return;
    }

    // You can handle the form submission logic here (API call, etc.)
    toast.success("Lecturer added successfully!");
    console.log({
      lecturerName,
      duration,
      description,
      selectedSubjects: subjectCheckboxes.filter((item) => item.checked),
      selectedCourses: courseCheckboxes.filter((item) => item.checked),
      thumbnailFile,
    });

    // Optionally, navigate or reset the form
    // navigate("/somewhere");
  };

  return (
    <Container>
      <Toaster />
      <Title>Add Lecturer</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lecturerName">Lecturer Name</Label>
              <Input
                id="lecturerName"
                value={lecturerName}
                onChange={(e) => setLecturerName(e.target.value)}
                placeholder="Enter Lecturer Name"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter Duration"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Course Description</Label>
              <TextArea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3 */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Subject</CheckboxSectionTitle>
              <CheckboxList>
                {subjectCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
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
              <CheckboxSectionTitle>Add Course</CheckboxSectionTitle>
              <CheckboxList>
                {courseCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setCourseCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 4 */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile && previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%" }} />
                  <p>{thumbnailFile.name}</p>
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
              <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
            </UploadArea>
          </Column>
        </FormRow>

        {/* Submit */}
        <FormRow>
          <SubmitButton type="submit">Add Lecturer</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
