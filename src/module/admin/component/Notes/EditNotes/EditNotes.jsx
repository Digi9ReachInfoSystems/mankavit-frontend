// src/pages/Admin/WebManagement/Notes/EditNotes.jsx
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
  SearchInput,
  ViewPdfButton,
  FileActionsWrapper,
  FileName,
  ModalOverlay,
  PdfModal,
  PdfModalHeader,
  PdfModalTitle,
  CloseButton,
  PdfModalContent,
  PdfViewer,
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

  // PDF modal states
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");

  const filteredSubjects = subjectsCheckboxes.filter((subject) =>
    subject.label.toLowerCase().includes(searchSubject.toLowerCase())
  );

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(
          response.Permissions["courseManagement"].readOnly
        );
      }
    };
    apiCaller();
  }, []);

// helper: get created time from doc (prefer createdAt, fallback to ObjectId timestamp)
const getDocCreatedAt = (doc) => {
  if (!doc) return new Date(0);

  if (doc.createdAt) {
    try {
      return new Date(doc.createdAt);
    } catch {
      // fallthrough
    }
  }

  const idCandidate =
    typeof doc._id === "string"
      ? doc._id
      : doc._id && doc._id.$oid
      ? doc._id.$oid
      : null;

  if (typeof idCandidate === "string" && idCandidate.length >= 8) {
    const seconds = parseInt(idCandidate.substring(0, 8), 16);
    return new Date(seconds * 1000);
  }

  return new Date(0);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const [subjectsResponse, noteResponse] = await Promise.all([
        getSubjects(),
        getNotesById(id),
      ]);

      const noteData = noteResponse.data;

      setNoteTitle(noteData.noteDisplayName);
      setInternalTitle(noteData.noteName);
      setIsDownloadable(noteData.isDownload);
      setExistingFileUrl(noteData.fileUrl);

      // Normalize raw subjects array safely
      const rawSubjects = Array.isArray(subjectsResponse?.data)
        ? subjectsResponse.data
        : Array.isArray(subjectsResponse)
        ? subjectsResponse
        : [];

      // sort newest-first using createdAt or ObjectId timestamp, then map
      const subjectsData = rawSubjects
        .sort((a, b) => getDocCreatedAt(b) - getDocCreatedAt(a))
        .map((subject) => ({
          label: subject.subjectName,
          id: subject._id,
          checked: noteData.subjects.some(
            (noteSubjectId) =>
              noteSubjectId === subject._id ||
              (noteSubjectId && noteSubjectId._id === subject._id)
          ),
        }));

      setSubjectsCheckboxes(subjectsData);
      const initialSelected = subjectsData.filter((s) => s.checked);
      setSelectedSubjects(initialSelected);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load note data");
      navigate("/admin/notes-management");
    }
  };

  fetchData();
}, [id, navigate]);

  const handleRemovePdf = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPdfFile(null);
    setExistingFileUrl("");
    toast.info("PDF removed successfully");
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = subjectsCheckboxes.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setSubjectsCheckboxes(updatedCheckboxes);

    const subject = updatedCheckboxes[index];
    if (subject.checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(
        selectedSubjects.filter((item) => item.id !== subject.id)
      );
    }
  };

  const moveSubjectUp = async (index) => {
    if (index === 0) return;
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] = [
      newSelectedSubjects[index - 1],
      newSelectedSubjects[index],
    ];
    try {
      setSelectedSubjects(newSelectedSubjects);
      const subjectIds = newSelectedSubjects.map((s) => s.id);
      await rearrangeSubjects(subjectIds);
      toast.success("Subjects rearranged successfully");
    } catch (error) {
      setSelectedSubjects(selectedSubjects);
      toast.error("Failed to rearrange subjects");
    }
  };

  const moveSubjectDown = async (index) => {
    if (index === selectedSubjects.length - 1) return;
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] = [
      newSelectedSubjects[index + 1],
      newSelectedSubjects[index],
    ];
    try {
      setSelectedSubjects(newSelectedSubjects);
      const subjectIds = newSelectedSubjects.map((s) => s.id);
      await rearrangeSubjects(subjectIds);
      toast.success("Subjects rearranged successfully");
    } catch (error) {
      setSelectedSubjects(selectedSubjects);
      toast.error("Failed to rearrange subjects");
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!noteTitle.trim()) return toast.error("Please enter note title");
      if (!internalTitle.trim())
        return toast.error("Please enter internal note title.");

      let fileURL = existingFileUrl;
      if (pdfFile) {
        if (pdfFile.type !== "application/pdf") {
          toast.error("Please select a valid PDF file.");
          return;
        }
        const fileData = await uploadFileToAzureStorage(pdfFile, "notes");
        fileURL = fileData.blobUrl;
      }

      const subjects = selectedSubjects.map((item) => item.id);
      const updateData = {
        noteName: internalTitle,
        noteDisplayName: noteTitle,
        isDownload: isDownloadable,
        fileUrl: fileURL,
        subjects,
      };

      const updateResponse = await updatenotesById(id, updateData);
      if (updateResponse.success) {
        toast.success(`Note "${noteTitle}" updated successfully.`);
      } else {
        toast.error("Note update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Note update failed.");
    }
  };

  // PDF view logic
  const handleViewPdf = () => {
    if (pdfFile) {
      const fileUrl = URL.createObjectURL(pdfFile);
      setUploadedPdfUrl(fileUrl);
      setIsPdfModalOpen(true);
    } else if (existingFileUrl) {
      const directUrl = `${
        import.meta.env.VITE_APP_IMAGE_ACCESS
      }/api/project/resource?fileKey=${existingFileUrl}`;
      setUploadedPdfUrl(directUrl);
      setIsPdfModalOpen(true);
    } else {
      toast.error("No PDF available to view.");
    }
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setUploadedPdfUrl("");
  };

  return (
    <Container>
      <Title>Edit Note</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="noteTitle">Note Title</Label>
              <Input
                id="noteTitle"
                value={noteTitle}
                onChange={(e) =>
                  setNoteTitle(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))
                }
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
                onChange={(e) =>
                  setInternalTitle(
                    e.target.value.replace(/[^a-zA-Z0-9\s]/g, "")
                  )
                }
                placeholder="Enter Internal Title"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>
                Add Subjects ({subjectsCheckboxes.length})
              </CheckboxSectionTitle>

              <SearchWrapper style={{ marginBottom: "15px" }}>
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
                        onChange={() =>
                          handleCheckboxChange(
                            subjectsCheckboxes.findIndex(
                              (s) => s.id === item.id
                            )
                          )
                        }
                        disabled={readOnlyPermissions}
                      />
                      {item.label}
                    </CheckboxLabel>
                  ))
                ) : (
                  <p style={{ padding: "10px", color: "#666" }}>
                    No subjects found matching your search
                  </p>
                )}
              </CheckboxList>
            </CheckboxSection>
          </Column>

          <Column>
            {selectedSubjects.length > 0 && (
              <>
                <SelectedSubjectsTitle>
                  Selected Subjects ({selectedSubjects.length})
                </SelectedSubjectsTitle>
                <SelectedSubjectsList>
                  {selectedSubjects.map((subject) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
                    </SelectedSubjectItem>
                  ))}
                </SelectedSubjectsList>
              </>
            )}
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <Label>Upload Files PDF</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {pdfFile ? (
                <FileActionsWrapper>
                  <FileName>{pdfFile.name}</FileName>
                  <ViewPdfButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleViewPdf();
                    }}
                  >
                    View PDF
                  </ViewPdfButton>
                  {/* <ViewPdfButton
                    type="button"
                    style={{ background: "#f44336" }}
                    onClick={handleRemovePdf}
                  >
                    Remove PDF
                  </ViewPdfButton> */}
                </FileActionsWrapper>
              ) : existingFileUrl ? (
                <FileActionsWrapper>
                  <FileName>
                    Current file: {existingFileUrl.split("/").pop()}
                  </FileName>
                 <div style={{ display: "flex", gap: "10px" }}>
                   <ViewPdfButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleViewPdf();
                    }}
                  >
                    View PDF
                  </ViewPdfButton>
                  <ViewPdfButton
                    type="button"
                    style={{ background: "#f44336" }}
                    onClick={handleRemovePdf}
                  >
                    Remove PDF
                  </ViewPdfButton>
                 </div>
                </FileActionsWrapper>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag and drop PDF here</p>
                  <p>
                    or <strong>Add PDF</strong>
                  </p>
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

          <Column
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FieldWrapper
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Label htmlFor="isDownloadable" style={{ marginBottom: 0 }}>
                Is it downloadable?
              </Label>
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

        {!readOnlyPermissions && (
          <FormRow>
            <SubmitButton type="submit">Update Note</SubmitButton>
          </FormRow>
        )}
      </FormWrapper>

      {isPdfModalOpen && (
        <ModalOverlay onClick={closePdfModal}>
          <PdfModal onClick={(e) => e.stopPropagation()}>
            <PdfModalHeader>
              <PdfModalTitle>
                {pdfFile ? pdfFile.name : existingFileUrl.split("/").pop()}
              </PdfModalTitle>
              <CloseButton onClick={closePdfModal}>×</CloseButton>
            </PdfModalHeader>
          <PdfModalContent>
  {uploadedPdfUrl.startsWith("blob:") ? (
    <PdfViewer src={uploadedPdfUrl} title="PDF Preview" />
  ) : (
    <PdfViewer
      src={`https://docs.google.com/gview?url=${encodeURIComponent(uploadedPdfUrl)}&embedded=true`}
      title="PDF Preview"
    />
  )}
</PdfModalContent>

          </PdfModal>
        </ModalOverlay>
      )}

      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </Container>
  );
}
