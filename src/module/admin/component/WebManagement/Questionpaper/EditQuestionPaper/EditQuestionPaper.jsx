import React, { useState, useEffect, useRef } from "react";
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
} from "./EditQuestionPaper.style";
import upload from "../../../../../../assets/upload.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuestionPaperByTitleAndYear,
  updateQuestionPaperById,
  addExistingTitlePaper,
  removeQuestionpaper
} from "../../../../../../api/questionPaperApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../../utils/authService";

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

const EditQuestionPaper = () => {
  // Expect route like: /admin/web-management/question-paper/edit/:title/:year
  const { title: routeTitle, year: routeYear } = useParams();
  console.log("routeTitle", routeTitle, "routeYear", routeYear);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    year: years[0],
    description: "",
    file: null,
    existingFileUrl: ""
  });

  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const fileInputRef = useRef();

  // Permissions
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response?.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        const ro = response?.Permissions?.["webManagement"]?.readOnly ?? true;
        setReadOnlyPermissions(ro);
        if (ro) {
          toast.error("You do not have permission to edit question papers.", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            onClose: () => navigate("/admin/")
          });
        }
      }
    };
    apiCaller();
  }, [navigate]);

  // Load existing paper
  useEffect(() => {
    (async () => {
      if (!routeTitle || !routeYear) {
        navigate("/admin/web-management/question-paper");
        return;
      }
      try {
        setLoading(true);
        const data = await getQuestionPaperByTitleAndYear(routeTitle, Number(routeYear));
        setFormData({
          title: data.title,
          year: data.year,
          description: data.description || "",
          file: null,
          existingFileUrl: data.question_url || ""
        });
      } catch (e) {
        console.error("Fetch error:", e);
        toast.error(e?.response?.data?.error || e?.message || "Failed to load question paper");
        navigate("/admin/web-management/question-paper");
      } finally {
        setLoading(false);
      }
    })();
  }, [routeTitle, routeYear, navigate]);

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
    setFormData(prev => ({ ...prev, file: f }));
    setError(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onChangeFile = (e) => handleFile(e.target.files[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // prevent editing title (since backend uses it as key)
    if (name === "title") return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (readOnlyPermissions) return;

    if (!formData.description) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    const oldTitle = routeTitle;
    const oldYear = Number(routeYear);
    const newYear = Number(formData.year);

    try {
      // 1) Upload new file if provided
      let fileUrl = formData.existingFileUrl;
      if (formData.file) {
        const uploadResponse = await uploadFileToAzureStorage(formData.file, "questionpaper");
        if (!uploadResponse?.blobUrl) {
          throw new Error(uploadResponse?.message || "File upload failed");
        }
        fileUrl = uploadResponse.blobUrl;
      }

      // 2) If year unchanged -> simple update
      if (newYear === oldYear) {
        await updateQuestionPaperById(oldTitle, oldYear, {
          description: formData.description.trim(),
          question_url: fileUrl
        });
        toast.success("Question paper updated successfully!");
        setTimeout(() => {
          navigate("/admin/web-management/question-paper");
        }, 1000);
        return;
      }

      // 3) If year changed -> add paper with new year, then remove old one.
      //    This keeps backend consistent and respects duplicate-year checks.
      await addExistingTitlePaper(oldTitle, {
        year: newYear,
        description: formData.description.trim(),
        question_url: fileUrl
      });

      // Remove old
      await removeQuestionpaper(oldTitle, oldYear);

      toast.success("Question paper year updated successfully!");
      setTimeout(() => {
        navigate(`/admin/web-management/question-paper`);
      }, 1000);
    } catch (err) {
      console.error("Update error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update. Please try again.";

      // If duplicate year
      if (String(msg).toLowerCase().includes("already has a paper")) {
        setError("This title already has a paper for the selected year.");
        toast.error("Duplicate year for this title.");
      } else {
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />

      <h2>Edit Question Paper</h2>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormItem>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              disabled
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="year">Select Year</Label>
            <Select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
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

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            rows={8}
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

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
            />
            <UploadContent>
              <UploadIcon>
                <img src={upload} alt="upload" />
              </UploadIcon>
              <UploadText>
                {formData.file
                  ? formData.file.name
                  : formData.existingFileUrl
                    ? formData.existingFileUrl.split("/").pop()
                    : "Drag and drop PDF here, or click add PDF"}
              </UploadText>
              {!formData.file && !formData.existingFileUrl && <UploadButton>Add Pdf</UploadButton>}
            </UploadContent>
          </UploadBox>

          {formData.existingFileUrl && !formData.file && (
            <a
              href={formData.existingFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1890ff", marginTop: 8, display: "inline-block" }}
            >
              View Current PDF
            </a>
          )}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting || readOnlyPermissions}>
          {isSubmitting ? "Updating..." : "Update Question Paper"}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default EditQuestionPaper;
