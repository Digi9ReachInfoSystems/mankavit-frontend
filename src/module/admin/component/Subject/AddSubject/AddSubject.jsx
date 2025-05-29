import React, { useState, useRef, useEffect } from "react";
import uplaod from "../../../../../assets/upload.png";
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
} from "../AddSubject/AddSubject.style";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { getAllNotes } from "../../../../../api/notesApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createSubject } from "../../../../../api/subjectApi";
import { getAllLectures } from "../../../../../api/lecturesApi";
import { getAllMocktest } from "../../../../../api/mocktestApi";
import { set } from "date-fns";

export default function AddSubject() {
  const [subjectTitle, setSubjectTitle] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const [notesCheckboxes, setNotesCheckboxes] = useState([]);
  const [lecturesCheckboxes, setLecturesCheckboxes] = useState([]);
  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([]);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const notesResponse = await getAllNotes();
        const notesData = notesResponse.data.map((item) => ({
          label: item.noteDisplayName,
          id: item._id,
          checked: false,
        }));
        setNotesCheckboxes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    apiCaller();
  }, []);


  useEffect(() => {
  const apiCaller = async () => {
    try {
      const mockTestsResponse = await getAllMocktest();

      if (!mockTestsResponse || !mockTestsResponse.success || !mockTestsResponse.data) {
        toast.error("Failed to load mock tests");
        return;
      }

      // Normalize data
      const mockTestsArray = Array.isArray(mockTestsResponse.data.docs)
        ? mockTestsResponse.data.docs
        : Array.isArray(mockTestsResponse.data)
          ? mockTestsResponse.data
          : [];

      const mockTestsData = mockTestsArray.map((item) => ({
        label: item.title,
        id: item._id,
        checked: false,
      }));

      setMockTestCheckboxes(mockTestsData);
    } catch (error) {
      console.error("Error fetching mock tests:", error);
      toast.error("Error loading mock tests");
    }
  };
  apiCaller();
}, []);

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const lecturesResponse = await getAllLectures();
        const lecturesData = lecturesResponse.data.map((item) => ({
          label: item.lectureName,
          id: item._id,
          checked: false,
        }));
        setLecturesCheckboxes(lecturesData);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setThumbnailFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!subjectTitle || !internalTitle || !vimeoId || !thumbnailFile) {
        toast.error("All fields are required.");
        return;
      }

      const fileData = await uploadFileToAzureStorage(thumbnailFile, "subjects");
      const fileURL = fileData.blobUrl;

      const notes = notesCheckboxes.filter((item) => item.checked).map((item) => item.id);
      const mockTests = mockTestCheckboxes.filter((item) => item.checked).map((item) => item.id);
      const lectures = lecturesCheckboxes.filter((item) => item.checked).map((item) => item.id);

      const createSubjectResponse = await createSubject({
        subjectName: internalTitle,
        subjectDisplayName: subjectTitle,
        vimeoShowcaseID: vimeoId,
        description: shortDescription,
        notes,
        mockTests,
        courses: [],
        image: fileURL,
        lectures

      });
      console.log("Created subject response", createSubjectResponse);

      if (createSubjectResponse) {
        toast.success("Subject created successfully.");
        setSubjectTitle("");
        setInternalTitle("");
        setVimeoId("");
        setShortDescription("");
        setThumbnailFile(null);
        setNotesCheckboxes(notesCheckboxes.map((i) => ({ ...i, checked: false })));
        setLecturesCheckboxes(lecturesCheckboxes.map((i) => ({ ...i, checked: false })));
        setMockTestCheckboxes(mockTestCheckboxes.map((i) => ({ ...i, checked: false })));
        setTimeout(() => navigate("/admin/subject-management"), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Subject creation failed.");
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Add Subject</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="subjectTitle">Subject Title</Label>
              <Input
                id="subjectTitle"
                value={subjectTitle}
                onChange={(e) => {
                  // Only allow alphabetic characters and spaces
                  const filteredValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setSubjectTitle(filteredValue);
                }}
                placeholder="Enter Subject Title"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlFor="internalTitle">Internal Title</Label>
              <Input
                id="internalTitle"
                value={internalTitle}
                // onChange={(e) => setInternalTitle(e.target.value)}
                // placeholder="Enter Internal Title"
                onChange={(e) => {
                  // Only allow alphabetic characters and spaces
                  const filteredValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setInternalTitle(filteredValue);
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
                // onChange={(e) => setShortDescription(e.target.value)}
                onChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setShortDescription(filteredValue);
                }}
                placeholder="Enter Short Description"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Notes</CheckboxSectionTitle>
              <CheckboxList>
                {notesCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
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
              <CheckboxSectionTitle>Add Mock Tests</CheckboxSectionTitle>
              <CheckboxList>
                {mockTestCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id || index}>
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
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Lectures</CheckboxSectionTitle>
              <CheckboxList>
                {lecturesCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setLecturesCheckboxes)}
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
              {thumbnailFile && previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
                  <p>{thumbnailFile.name}</p>
                </>
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
          </Column>
        </FormRow>

        <FormRow>
          <SubmitButton type="submit">Add Subject</SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
