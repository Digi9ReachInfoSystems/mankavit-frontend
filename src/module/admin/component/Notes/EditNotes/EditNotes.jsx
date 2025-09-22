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
  SelectedSubjectsList,
  SelectedSubjectItem,
  SubjectName,
  ArrowButton,
  SelectedSubjectsTitle, 
  SearchWrapper, 
  SearchIcon, 
  SearchInput
} from "../AddNotes/AddNotes.style";
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { getNotesById, updatenotesById } from "../../../../../api/notesApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";
import { CiSearch } from "react-icons/ci";

export default function EditNotes() {
  const { id } = useParams();
  const [noteTitle, setNoteTitle] = useState("");
  const [internalTitle, setInternalTitle] = useState("");
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [subjectsCheckboxes, setSubjectsCheckboxes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState("");
  const [searchSubject, setSearchSubject] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

const filteredSubjects = subjectsCheckboxes.filter(subject =>
  subject.label.toLowerCase().includes(searchSubject.toLowerCase())
);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsResponse, noteResponse] = await Promise.all([
          getSubjects(),
          getNotesById(id)
        ]);

        const noteData = noteResponse.data;
        
        setNoteTitle(noteData.noteDisplayName);
        setInternalTitle(noteData.noteName);
        setIsDownloadable(noteData.isDownload);
        setExistingFileUrl(noteData.fileUrl);
        
        // Prepare subjects data with checked status
        const subjectsData = subjectsResponse.data.map((subject) => ({
          label: subject.subjectName,
          id: subject._id,
          checked: noteData.subjects.some(noteSubjectId => 
            noteSubjectId === subject._id || 
            noteSubjectId._id === subject._id
          )
        }));
        
        setSubjectsCheckboxes(subjectsData);
        
        // Initialize selected subjects with the note's current subjects
        const initialSelected = subjectsData.filter(subject => subject.checked);
        setSelectedSubjects(initialSelected);
        
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
    
    // Update selected subjects list
    const subject = updatedCheckboxes[index];
    if (subject.checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(item => item.id !== subject.id));
    }
  };

  const moveSubjectUp = async (index) => {
    if (index === 0) return;
    
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] = 
      [newSelectedSubjects[index - 1], newSelectedSubjects[index]];
    
    try {
      // Optimistically update UI
      setSelectedSubjects(newSelectedSubjects);
      
      // Update backend
      const subjectIds = newSelectedSubjects.map(subject => subject.id);
      await rearrangeSubjects(subjectIds);
      
      toast.success("Subjects rearranged successfully");
    } catch (error) {
      // Revert on error
      setSelectedSubjects(selectedSubjects);
      toast.error(error.response?.data?.message || "Failed to rearrange subjects");
      console.error("Rearrangement error:", error);
    }
  };

  const moveSubjectDown = async (index) => {
    if (index === selectedSubjects.length - 1) return;
    
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] = 
      [newSelectedSubjects[index + 1], newSelectedSubjects[index]];
    
    try {
      // Optimistically update UI
      setSelectedSubjects(newSelectedSubjects);
      
      // Update backend
      const subjectIds = newSelectedSubjects.map(subject => subject.id);
      await rearrangeSubjects(subjectIds);
      
      toast.success("Subjects rearranged successfully");
    } catch (error) {
      // Revert on error
      setSelectedSubjects(selectedSubjects);
      toast.error(error.response?.data?.message || "Failed to rearrange subjects");
      console.error("Rearrangement error:", error);
    }
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
      
      const subjects = selectedSubjects.map(item => item.id);
      
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
        // setTimeout(() => {
        //   navigate("/admin/notes-management");
        // }, 1000);
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
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
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
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
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
              <CheckboxSectionTitle>Add Subjects ({subjectsCheckboxes.length})</CheckboxSectionTitle>
      
           <SearchWrapper style={{ marginBottom: '15px' }}>
        <SearchIcon>
          <CiSearch size={18} />
        </SearchIcon>
        <SearchInput
          placeholder="Search subjects..."
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
        />
      </SearchWrapper>
      
                <CheckboxList>
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((item, index) => (
            <CheckboxLabel key={index}>
              <CheckboxInput
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(
                  subjectsCheckboxes.findIndex(subj => subj.id === item.id)
                )}
                disabled={readOnlyPermissions}
              />
              {item.label}
            </CheckboxLabel>
          ))
        ) : (
          <p style={{ padding: '10px', color: '#666' }}>No subjects found matching your search</p>
        )}
      </CheckboxList>
    </CheckboxSection>
  </Column>
  
  {/* Selected Subjects List with Arrows remains the same */}
  <Column>
    {selectedSubjects.length > 0 && (
      <>
        <SelectedSubjectsTitle>Selected Subjects ({selectedSubjects.length})</SelectedSubjectsTitle>
        <SelectedSubjectsList>
          {selectedSubjects.map((subject, index) => (
            <SelectedSubjectItem key={subject.id}>
              <SubjectName>{subject.label}</SubjectName>
              {/* <div>
                <ArrowButton 
                  style={{backgroundColor: "green"}}
                  type="button" 
                  onClick={() => moveSubjectUp(index)}
                  disabled={index === 0 || readOnlyPermissions}
                >
                  ↑
                </ArrowButton>
                <ArrowButton 
                  style={{backgroundColor: "red"}}
                  type="button" 
                  onClick={() => moveSubjectDown(index)}
                  disabled={index === selectedSubjects.length - 1 || readOnlyPermissions}
                >
                  ↓
                </ArrowButton>
              </div> */}
            </SelectedSubjectItem>
          ))}
        </SelectedSubjectsList>
      </>
    )}
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
                disabled={readOnlyPermissions}
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
                disabled={readOnlyPermissions}
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Submit button */}
        {!readOnlyPermissions && (
          <FormRow>
            <SubmitButton type="submit">Update Note</SubmitButton>
          </FormRow>
        )}
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