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
import { getQuestionPaperById, updateQuestionPaperById } from "../../../../../../api/questionPaperApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";
import { message } from "antd";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const years = [2024, 2023, 2022, 2021];

const EditQuestionPaper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    year: years[0],
    title: "",
    description: "",
    file: null,
    existingFileUrl: ""
  });
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        setLoading(true);
        const response = await getQuestionPaperById(id);
        if (!response) {
          throw new Error("Question paper not found");
        }
        setFormData({
          year: response.year || years[0],
          title: response.title || "",
          description: response.description || "",
          file: null,
          existingFileUrl: response.question_url || ""
        });
      } catch (error) {
        console.error("Error fetching question paper:", error);
        message.error(error.message || "Failed to load question paper");
        navigate("/admin/web-management/question-paper");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestionPaper();
    } else {
      navigate("/admin/web-management/question-paper");
    }
  }, [id, navigate]);

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
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const onChangeFile = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.title || !formData.description) {
      setError("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = formData.existingFileUrl;
      let fileName = formData.existingFileUrl.split('/').pop();
      
      if (formData.file) {
        message.loading({ content: 'Uploading new file...', key: 'upload', duration: 0 });
        const uploadResponse = await uploadFileToAzureStorage(formData.file, "questionpaper");
        
        if (!uploadResponse?.blobUrl) {
          throw new Error(uploadResponse?.message || "File upload failed");
        }
        fileUrl = uploadResponse.blobUrl;
        fileName = formData.file.name;
      }

      const questionPaperData = {
        year: formData.year.toString(),
        title: formData.title,
        description: formData.description,
        question_url: fileUrl,
        fileName: fileName
      };
      
      await updateQuestionPaperById(id, questionPaperData);

      toast.success("Data updated successfully!");
setTimeout(() => {
  navigate("/admin/web-management/question-paper");
}, 1000);

    } catch (error) {
      console.error("Update error:", error);
     toast.error("Failed to update. Please try again.");
setError(error.message || "Failed to update. Please try again.");

    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>

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

      <h2>Edit Question Paper</h2>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormItem>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleInputChange}
              required
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
                    ? formData.existingFileUrl.split('/').pop() 
                    : "Drag and drop PDF here, or click add PDF"}
              </UploadText>
              {!formData.file && !formData.existingFileUrl && <UploadButton>Add Pdf</UploadButton>}
            </UploadContent>
          </UploadBox>
          {formData.existingFileUrl && !formData.file && (
            <a href={formData.existingFileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', marginTop: '8px', display: 'inline-block' }}>
              View Current PDF
            </a>
          )}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Question Paper"}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default EditQuestionPaper;