import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Select,
  TextInput,
  TextArea,
  UploadBox,
  UploadInput,
  UploadContent,
  UploadIcon,
  UploadText,
  UploadButton,
  SubmitButton,
  FormItem,
  ErrorMessage
} from "./AddQuestionpaper.style";
import upload from "../../../../../../assets/upload.png";
import {
  createQuestionPaper,
  addExistingTitlePaper,
  getAllQuestionPapers
} from "../../../../../../api/questionPaperApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../../utils/authService";

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

const AddQuestionPaper = ({ onSubmit = () => {} }) => {
  const [mode, setMode] = useState("new"); // "new" | "existing"
  const [year, setYear] = useState(years[0]);
  const [title, setTitle] = useState("");
  const [existingTitle, setExistingTitle] = useState("");
  const [existingTitles, setExistingTitles] = useState([]);

  // const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  // Permissions
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        const ro = response.Permissions?.["webManagement"]?.readOnly ?? true;
        setReadOnlyPermissions(ro);
        if (ro) {
          toast.error("You do not have permission to add question papers.", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            onClose: () => navigate("/admin/"),
          });
        }
      }
    };
    apiCaller();
  }, [navigate]);

  // Fetch existing titles for "existing" mode
  useEffect(() => {
    (async () => {
      try {
        const all = await getAllQuestionPapers();
        setExistingTitles(all?.map(q => q.title) ?? []);
      } catch (e) {
        // non-blocking
      }
    })();
  }, []);

  const handleFile = (f) => {
    if (!f) return;

    if (f.type !== "application/pdf") {
      setError("Please upload a valid PDF file");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(f);
    setError(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onChangeFile = (e) => handleFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (readOnlyPermissions) return;

    if (!file) {
      setError("Please upload a PDF file first");
      toast.warning("Please upload a PDF file first");
      return;
    }
    const finalTitle = mode === "new" ? title?.trim() : existingTitle?.trim();
    if (!finalTitle  || !year) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1) upload to Azure
      const uploadResponse = await uploadFileToAzureStorage(file, "questionpaper");
      if (!uploadResponse?.blobUrl) throw new Error(uploadResponse?.message || "File upload failed - no URL returned");

      // 2) call API depending on mode
      const payload = {
        title: finalTitle,
        year: Number(year),
        // description: description.trim(),
        question_url: uploadResponse.blobUrl,
      };

      let response;
      if (mode === "new") {
        response = await createQuestionPaper(payload);
      } else {
        const { title: _omit, ...rest } = payload;
        response = await addExistingTitlePaper(finalTitle, rest);
      }

      onSubmit(response);

      // 3) reset
      setYear(years[0]);
      setTitle("");
      setExistingTitle("");
      // setDescription("");
      setFile(null);

      toast.success("Data added successfully!");
      setTimeout(() => navigate("/admin/web-management/question-paper"), 1000);
    } catch (err) {
      console.error("Upload or save error:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to upload. Please try again.";
      if (String(msg).toLowerCase().includes("already has a paper")) {
        toast.error("Duplicate year for this title.");
        setError("This title already has a paper for that year.");
      } else {
        toast.error(msg);
        setError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />

      <h2>Question Paper</h2>
      <Form onSubmit={submit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* Toggle: New vs Existing */}
        <FormGroup>
          <Label htmlFor="mode" style={{ fontSize: "1.2rem", marginTop: "1rem" }}>Select Mode</Label>
          <Select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="new">Add new exam</option>
            <option value="existing">Add to existing exam</option>
          </Select>
        </FormGroup>

        {mode === "new" ? (
          <FormGroup>
            <Label htmlFor="title">New exam</Label>
            <TextInput
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
        ) : (
          <FormGroup>
            <Label htmlFor="existingTitle">Select exam</Label>
            <Select
              id="existingTitle"
              value={existingTitle}
              onChange={(e) => setExistingTitle(e.target.value)}
              required
            >
              <option value="" disabled>Select an exam</option>
              {existingTitles.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </FormGroup>
        )}

        <FormItem>
          <FormGroup>
            <Label htmlFor="year">Select Year</Label>
            <Select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormItem>

        {/* <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={8}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup> */}

        <FormGroup>
          <Label>Upload Pdf</Label>
          <UploadBox
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            dragOver={dragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadInput
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={onChangeFile}
              required
            />
            <UploadContent>
              <UploadIcon>
                <img src={upload} alt="upload" />
              </UploadIcon>
              <UploadText>
                {file ? file.name : "Drag and drop PDF here, or click add PDF"}
              </UploadText>
              {!file && <UploadButton>Add Pdf</UploadButton>}
            </UploadContent>
          </UploadBox>
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting || readOnlyPermissions}>
          {isSubmitting ? "Uploading..." : (mode === "new" ? "Create Title & Upload" : "Add to Existing Title")}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default AddQuestionPaper;

