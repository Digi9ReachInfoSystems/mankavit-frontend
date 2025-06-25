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
} from "../AddNotes/AddNotes.style";
import { getSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { getNotesById, updatenotesById } from "../../../../../api/notesApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditNotes() {
  const { id } = useParams();
  const [noteTitle, setNoteTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [subjectsCheckboxes, setSubjectsCheckboxes] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch subjects and note data in parallel
      const [subjectsResponse, noteResponse] = await Promise.all([
        getSubjects(),
        getNotesById(id)
      ]);

      const noteData = noteResponse.data;
      
      // Set form fields with existing data
      setNoteTitle(noteData.noteDisplayName);
      setInternalTitle(noteData.noteName);
      setIsDownloadable(noteData.isDownload);
      setExistingFileUrl(noteData.fileUrl);
      
      // Prepare subjects data with checked status
      const subjectsData = subjectsResponse.data.map((subject) => ({
        label: subject.subjectName,
        id: subject._id,
        // Check if this subject is in the note's subjects array
        checked: noteData.subjects.some(noteSubjectId => 
          noteSubjectId === subject._id || 
          noteSubjectId._id === subject._id // Handle both string and object IDs
        )
      }));
      
      setSubjectsCheckboxes(subjectsData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Failed to load note data', {
        duration: 3000,
      });
      navigate("/admin/notes-management");
    }
  };
  
  fetchData();
}, [id, navigate]);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = subjectsCheckboxes.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setSubjectsCheckboxes(updatedCheckboxes);
  };

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation
      if (!noteTitle.trim()) {
        toast.error('Please enter note title', {
          duration: 3000,
          position: 'top-right',
        });
        return;
      }
      
      if (!internalTitle.trim()) {
        toast.error('Please enter internal note title.', {
          duration: 3000,
          position: 'top-right',
        });
        return;
      }
      
      let fileURL = existingFileUrl;
      
      // Only upload new file if one was selected
      if (pdfFile) {
        if (pdfFile.type !== "application/pdf") {
          toast.error('Please select pdf file.', {
            duration: 3000,
            position: 'top-right',
          });
          return;
        }
        
        const fileData = await uploadFileToAzureStorage(pdfFile, "notes");
        fileURL = fileData.blobUrl;
      }
      
      const subjects = subjectsCheckboxes
        .filter((item) => item.checked)
        .map((item) => item.id);
      
      const updateData = {
        noteName: internalTitle,
        noteDisplayName: noteTitle,
        isDownload: isDownloadable,
        fileUrl: fileURL,
        subjects: subjects
      };
      
      const updateResponse = await updatenotesById(id, updateData);
      
      if (updateResponse.success) {
        toast.success(`Note "${noteTitle}" updated successfully.`, {
          duration: 3000,
          position: 'top-right',
        });
        setTimeout(() => {
          navigate("/admin/notes-management");
        }, 1000);
      } else {
        toast.error('Note update failed.', {
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Note update failed.', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  return (
    <Container>
      <Title>Edit Note</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Row 1: Note Title & Note Internal Title */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noteTitle">Note Title</Label>
              <Input
                id="noteTitle"
                value={noteTitle}
             onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setNoteTitle(filteredData);
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
               onChange={(e)=>{
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setInternalTitle(filteredData);
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

        {/* Row 2: Upload PDF */}
        <FormRow>
          <Column>
            <Label>Upload Files PDF</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {pdfFile ? (
                <p>{pdfFile.name}</p>
              ) : existingFileUrl ? (
                <p>Current file: {existingFileUrl.split('/').pop()}</p>
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
          
          <Column style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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

        {/* Submit button */}
        <FormRow>
          <SubmitButton type="submit">Update Note</SubmitButton>
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