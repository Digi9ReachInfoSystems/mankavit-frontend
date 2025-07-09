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
import { createQuestionPaper } from "../../../../../../api/questionPaperApi";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";
// import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { getAuth } from "../../../../../../utils/authService";

const years = [2024, 2023, 2022, 2021];

const AddQuestionPaper = ({ onSubmit = () => {} }) => {
  const [year, setYear] = useState(years[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
    useEffect(() => {
      const apiCaller = async () => {
        const response = await getAuth();
        response.Permissions;
        if (response.isSuperAdmin === true) {
          setReadOnlyPermissions(false);
        } else {
          setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
          if(response.Permissions["webManagement"].readOnly) {
            toast.error('You do not have permission to add question papers.', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              onClose: () => {
                navigate('/admin/');
              }
            });
          }
        }
      }
      apiCaller();
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
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const onChangeFile = (e) => {
    handleFile(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!file) {
      setError("Please upload a PDF file first");
      toast.warning("Please upload a PDF file first");
      return;
    }

    if (!title || !description) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. First upload the file
      console.log("Uploading file to Azure...", file);
      const uploadResponse = await uploadFileToAzureStorage(file, "questionpaper");
      console.log("Upload response:", uploadResponse);
      
      // Check if upload was successful - now checking for blobUrl instead of fileUrl
      if (!uploadResponse?.blobUrl) {
        throw new Error(uploadResponse?.message || "File upload failed - no URL returned");
      }

      // 2. Then create the question paper record
      const questionPaperData = {
        year: year.toString(),
        title: title,
        description: description,
        question_url: uploadResponse.blobUrl, // Using blobUrl from response
        fileName: file.name
      };
      
      console.log("Question paper data", questionPaperData);
      const response = await createQuestionPaper(questionPaperData);
      console.log("API response", response);

      // 3. Handle success
      onSubmit(response);

      // Reset form
      setYear(years[0]);
      setTitle("");
      setDescription("");
      setFile(null);
    
toast.success("Data added successfully!");

setTimeout(() => {
  navigate("/admin/web-management/question-paper");
},1000);

      


    } catch (error) {
      console.error("Upload error:", error);
      // Handle the case where the error message is actually a success message
      if (error.message.includes("successfully")) {
        // If upload succeeded but we got here, there might be an issue with the record creation
        setError("File uploaded but there was an issue saving the record. Please try again.");
            toast.error("Failed to upload the data. Please try again.");
      } else {
        setError(error.message || "Failed to upload. Please try again.");
            toast.error("Failed to upload. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
      
      <h2>Question Paper</h2>
      <Form onSubmit={submit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormItem>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>

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

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={8}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Question Paper"}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default AddQuestionPaper;