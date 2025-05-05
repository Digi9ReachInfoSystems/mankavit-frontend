// AddSubject.jsx
import React, { useState, useRef, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { getAllNotes } from "../../../../api/notesApi";
import { uploadFileToAzureStorage } from "../../../../utils/azureStorageService";
import { createSubject } from "../../../../api/subjectApi";

export default function AddSubject() {
  // State for form fields
  const [subjectTitle, setSubjectTitle] = useState(null);
  const [vimeoId, setVimeoId] = useState(null);
  const [internalTitle, setInternalTitle] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState("1499");
  const [actualPrice, setActualPrice] = useState("2999");
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  // Two sets of checkboxes, e.g. for "Add Notes" and "Add Mock Test"
  const [notesCheckboxes, setNotesCheckboxes] = useState([]);

  const [mockTestCheckboxes, setMockTestCheckboxes] = useState([
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
    { label: "Mankavit Mock Test – CLAT 2025", checked: true },
    { label: "Mankavit Mock Test – CLAT 2025", checked: false },
  ]);

  // File upload state
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
        }))

        setNotesCheckboxes(notesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    apiCaller();

  }, []);
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
    if (!e.target.files[0].type.startsWith("image/")) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      toast.error('Please select an image file.',
        {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        }
      )
      return;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(url);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subjectTitle == "" || subjectTitle == null) {
        toast.error('Please enter subject title',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )

        return;
      }
      if (internalTitle == "" || internalTitle == null) {

        toast.error('Please enter internal subject title.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
        return;
      }
      if (vimeoId == "" || vimeoId == null) {
        toast.error('Please enter vimeo id.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
        return;
      }
      if (thumbnailFile == null) {

        toast.error('Please upload thumbnail file.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )

        return;
      }
      if (!thumbnailFile.type.startsWith("image/")) {
        toast.error('Please select an image file.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
        return;

      }
      const fileData = await uploadFileToAzureStorage(thumbnailFile, "subjects");
      const fileURL = fileData.blobUrl;
      const notes = notesCheckboxes.filter((item) => item.checked).map((item) => item.id);
      const mockTests = mockTestCheckboxes.filter((item) => item.checked).map((item) => item.id);

      const createSubjectRespose = await createSubject(
        {
          subjectName: internalTitle,
          vimeoShowcaseID: vimeoId,
          subjectDisplayName: subjectTitle,
          description: shortDescription,
          notes: notes,
          mockTests: [],
          courses: [],
          image: fileURL,
        }
      );
      if (createSubjectRespose) {
        toast.success('Subject created successfully.',
          {
            duration: 3000,
            position: 'top-right',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
      }
      setSubjectTitle('');
      setInternalTitle('');
      setVimeoId('');
      setShortDescription('');
      setNotesCheckboxes(notesCheckboxes.map((item) => ({ ...item, checked: false })));
      setMockTestCheckboxes(mockTestCheckboxes.map((item) => ({ ...item, checked: false })));
      setThumbnailFile(null);
      setTimeout(() => {
        navigate("/admin/subject-management")
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error('Subject creation failed.',
        {
          duration: 3000,
          position: 'top-right',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        }
      )
    }
  };

  return (
    <Container>
      <Toaster />
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

                  previewUrl ? (
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
                  )
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
