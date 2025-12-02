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
  PdfModal,
  PdfModalContent,
  PdfModalHeader,
  PdfModalTitle,
  CloseButton,
  PdfViewer,
  ModalOverlay,
} from "../AddNotes/AddNotes.style";
import { getSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createNotes } from "../../../../../api/notesApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rearrangeSubjects } from "../../../../../api/subjectApi";
import { CiSearch } from "react-icons/ci";
import { FaEye, FaTimes, FaDownload } from "react-icons/fa";

export default function AddNote() {
  const [noteTitle, setNoteTitle] = useState(null);
  const [internalTitle, setInternalTitle] = useState(null);
  const [isDownloadable, setIsDownloadable] = useState(true);
  const [subjectsCheckboxes, setSubjectsCheckboxes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [searchSubject, setSearchSubject] = useState("");
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const filteredSubjects = subjectsCheckboxes.filter((subject) =>
    subject.label.toLowerCase().includes(searchSubject.toLowerCase())
  );

  // helper: get created time from doc (prefer createdAt, fallback to ObjectId timestamp)
  const getDocCreatedAt = (doc) => {
    if (!doc) return new Date(0);

    if (doc.createdAt) {
      try {
        return new Date(doc.createdAt);
      } catch {
        // ignore and fallback
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
    localStorage.removeItem("selectedSubjects"); // Reset on load
    const apiCaller = async () => {
      try {
        const response = await getSubjects();
        const raw = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];

        // sort newest-first then map
        const data = raw
          .sort((a, b) => getDocCreatedAt(b) - getDocCreatedAt(a))
          .map((item) => ({
            label: item.subjectName || item.title || "",
            id: item._id,
            checked: false, // always fresh
          }));

        setSubjectsCheckboxes(data);
        setSelectedSubjects([]);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    apiCaller();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = subjectsCheckboxes.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setSubjectsCheckboxes(updatedCheckboxes);

    const subject = updatedCheckboxes[index];
    let updatedSelectedSubjects;

    if (subject.checked) {
      updatedSelectedSubjects = [...selectedSubjects, subject];
    } else {
      updatedSelectedSubjects = selectedSubjects.filter(
        (item) => item.id !== subject.id
      );
    }

    setSelectedSubjects(updatedSelectedSubjects);
    localStorage.setItem(
      "selectedSubjects",
      JSON.stringify(updatedSelectedSubjects)
    );
  };

  const moveSubjectUp = async (index) => {
    if (index === 0) return;

    // Create new array with swapped items
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] = [
      newSelectedSubjects[index - 1],
      newSelectedSubjects[index],
    ];

    try {
      // Optimistically update UI first for better UX
      setSelectedSubjects(newSelectedSubjects);

      // Then send to backend
      const subjectIds = newSelectedSubjects.map((subject) => subject.id);
      await rearrangeSubjects(subjectIds);

      toast.success("Subjects rearranged successfully");
    } catch (error) {
      // Revert if API fails
      setSelectedSubjects(selectedSubjects);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to rearrange subjects";
      toast.error(errorMsg);
      // // console.error("Rearrangement error:", error);
    }
  };

  const moveSubjectDown = async (index) => {
    if (index === selectedSubjects.length - 1) return;

    // Create new array with swapped items
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] = [
      newSelectedSubjects[index + 1],
      newSelectedSubjects[index],
    ];

    try {
      // Optimistically update UI first for better UX
      setSelectedSubjects(newSelectedSubjects);

      // Then send to backend
      const subjectIds = newSelectedSubjects.map((subject) => subject.id);
      await rearrangeSubjects(subjectIds);

      toast.success("Subjects rearranged successfully");
    } catch (error) {
      // Revert if API fails
      setSelectedSubjects(selectedSubjects);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to rearrange subjects";
      toast.error(errorMsg);
      // // console.error("Rearrangement error:", error);
    }
  };

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFile(file);

      // Create object URL for preview
      const fileUrl = URL.createObjectURL(file);
      setUploadedPdfUrl(fileUrl);
    }
  };

  const handleViewPdf = () => {
    if (uploadedPdfUrl) {
      setIsPdfModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsPdfModalOpen(false);
  };

  const handleDownloadPdf = () => {
    if (uploadedPdfUrl && pdfFile) {
      const link = document.createElement("a");
      link.href = uploadedPdfUrl;
      link.download = pdfFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setUploadedPdfUrl(null);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Revoke the object URL to free memory
    if (uploadedPdfUrl) {
      URL.revokeObjectURL(uploadedPdfUrl);
    }

    // Close modal if open
    if (isPdfModalOpen) {
      setIsPdfModalOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (noteTitle == "" || noteTitle == null) {
        toast.error("Please enter note title", {
          duration: 3000,
          position: "top-right",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        return;
      }
      if (internalTitle == "" || internalTitle == null) {
        toast.error("Please enter internal note title.", {
          duration: 3000,
          position: "top-right",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        return;
      }
      if (pdfFile == null) {
        toast.error("Please upload pdf file.", {
          duration: 3000,
          position: "top-right",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        return;
      }

      const fileData = await uploadFileToAzureStorage(pdfFile, "notes");
      const fileURL = fileData.blobUrl;
      const subjects = selectedSubjects.map((item) => item.id);

      const createNotesResponse = await createNotes({
        noteName: internalTitle,
        noteDisplayName: noteTitle,
        isDownload: isDownloadable,
        fileUrl: fileURL,
        subjects: subjects,
      });

      if (createNotesResponse.success == true) {
        toast.success("Notes created successfully.", {
          duration: 3000,
          position: "top-right",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        setInternalTitle("");
        setNoteTitle("");
        setIsDownloadable(false);
        setSubjectsCheckboxes(
          subjectsCheckboxes.map((item) => ({ ...item, checked: false }))
        );
        setSelectedSubjects([]);
        setPdfFile(null);
        setUploadedPdfUrl(null);

        // Revoke object URL
        if (uploadedPdfUrl) {
          URL.revokeObjectURL(uploadedPdfUrl);
        }

        // Close modal if open
        setIsPdfModalOpen(false);

        setTimeout(() => {
          navigate("/admin/notes-management");
        }, 1000);
      } else {
        toast.error("Notes creation failed.", {
          duration: 3000,
          position: "top-right",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Notes creation failed.", {
        duration: 3000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isPdfModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPdfModalOpen]);

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

        {/* Row 4: Add Subjects */}
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
                              (subj) => subj.id === item.id
                            )
                          )
                        }
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

          {/* Selected Subjects List with Arrows remains the same */}
          <Column>
            {selectedSubjects.length > 0 && (
              <>
                <SelectedSubjectsTitle>
                  Selected Subjects ({selectedSubjects.length})
                </SelectedSubjectsTitle>
                <SelectedSubjectsList>
                  {selectedSubjects.map((subject, index) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
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
                <FileActionsWrapper>
                  <FileName>{pdfFile.name}</FileName>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <ViewPdfButton
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPdf();
                      }}
                    >
                      <FaEye style={{ marginRight: "5px" }} />
                      View PDF
                    </ViewPdfButton>
                    <ViewPdfButton
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      style={{ background: "#dc3545" }}
                    >
                      <FaTimes style={{ marginRight: "5px" }} />
                      Remove
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
                // accept="application/pdf"
                onChange={handleFileChange}
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
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 5: Submit button */}
        <FormRow>
          <SubmitButton type="submit">Add Notes</SubmitButton>
        </FormRow>
      </FormWrapper>

      {/* PDF Modal */}
      {isPdfModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <PdfModal onClick={(e) => e.stopPropagation()}>
            <PdfModalHeader>
              <PdfModalTitle>{pdfFile?.name || "PDF Preview"}</PdfModalTitle>
              <div style={{ display: "flex", gap: "10px" }}>
                <ViewPdfButton
                  type="button"
                  onClick={handleDownloadPdf}
                  style={{ background: "#28a745" }}
                >
                  <FaDownload style={{ marginRight: "5px" }} />
                  Download
                </ViewPdfButton>
                <CloseButton onClick={handleCloseModal}>
                  <FaTimes />
                </CloseButton>
              </div>
            </PdfModalHeader>
            <PdfModalContent>
              <PdfViewer src={uploadedPdfUrl} title="PDF Preview" />
              {/* Fallback message for browsers that don't support PDF embedding */}
              <div
                style={{
                  display: "none",
                  textAlign: "center",
                  padding: "20px",
                  background: "#f8f9fa",
                }}
                className="pdf-fallback"
              >
                <p>
                  Your browser doesn't support PDF preview.
                  <br />
                  <button
                    onClick={handleDownloadPdf}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      textDecoration: "underline",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Download the PDF instead
                  </button>
                </p>
              </div>
            </PdfModalContent>
          </PdfModal>
        </ModalOverlay>
      )}

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
        theme="colored"
      />
    </Container>
  );
}
