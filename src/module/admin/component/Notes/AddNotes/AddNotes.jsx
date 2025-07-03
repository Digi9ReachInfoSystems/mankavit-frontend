// AddNote.jsx
import React, { useState, useRef, useEffect } from "react";
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
  // TextArea,
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
import { getSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createNotes } from "../../../../../api/notesApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddNote() {
  // State for form fields
  const [noteTitle, setNoteTitle] = useState(null);
  const [internalTitle, setInternalTitle] = useState(null);
  // const [shortDescription, setShortDescription] = useState("");
  const [isDownloadable, setIsDownloadable] = useState(true);
  const [subjectsCheckboxes, setSubjectsCheckboxes] = useState([]);

  // File upload state
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);

 const navigate= useNavigate();
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const response = await getSubjects();
        const data = response.data.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked: false,
        }))
        setSubjectsCheckboxes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };
    apiCaller();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (noteTitle == "" || noteTitle == null) {
        toast.error('Please enter note title',
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
      if(internalTitle==""||internalTitle==null ) {
        
        toast.error('Please enter internal note title.',
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
      if(pdfFile==null){
        
        toast.error('Please upload pdf file.',
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
      if(pdfFile.type!="application/pdf"){
        toast.error('Please select pdf file.',
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
      console.log("pdfFile", pdfFile);
      const fileData = await uploadFileToAzureStorage(pdfFile, "notes");
      
      console.log("fileData", fileData);
      const fileURL = fileData.blobUrl;
      const subjects = subjectsCheckboxes.filter((item) => item.checked).map((item) => item.id);
      const createNotesResponse = await createNotes(
        {
          noteName: internalTitle,
          noteDisplayName: noteTitle,
          isDownload: isDownloadable,
          fileUrl: fileURL,
          subjects: subjects
        }
      )
      if (createNotesResponse.success == true) {
        toast.success('Notes created successfully.',
          {
            duration: 3000, 
            position: 'top-right', 
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }
        )
        setInternalTitle("");
        setNoteTitle("");
        setIsDownloadable(false);
        setSubjectsCheckboxes(subjectsCheckboxes.map((item) => ({ ...item, checked: false })));

        setTimeout(() => {
          navigate("/admin/notes-management")
        }, 1000);
      } else {
        toast.error('Notes creation failed.',
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
    } catch (error) {
      console.log(error);
      toast.error('Notes creation failed.',
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
      <Title>Add notes</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Note Title & Note Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noteTitle">Note Title</Label>
              <Input
                id="noteTitle"
                value={noteTitle}
                onChange={(e) =>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setNoteTitle(e.target.value);
                }}
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
                // onChange={(e) => setInternalTitle(e.target.value)}
                onChange={(e) => {
                  // const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setInternalTitle(e.target.value);
                }}
                placeholder="Enter Internal Title"
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
                {subjectsCheckboxes &&
                  subjectsCheckboxes.map((item, index) => (
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
          {/* </FormRow>

        <FormRow> */}
          <Column style={{ display: "flex", alignItems: "center", gap: "10px", }}>
            <FieldWrapper style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Label htmlFor="isDownloadable" style={{ marginBottom: 0 }}>Is it downloadable?</Label>
              <ToggleSwitch
                id="isDownloadable"
                type="checkbox"
                checked={isDownloadable}
                onChange={() => setIsDownloadable(!isDownloadable)}
              />
            </FieldWrapper>
          </Column>
        </FormRow>



        {/* Row 5: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add Notes</SubmitButton>
        </FormRow>
      </FormWrapper>

      
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
    </Container>
  );
}
