import React, { useState, useRef } from "react";
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
  SubmitButton
} from "../Questionpaper/AddQuestionpaper.style";
import upload from "../../../../../assets/upload.png";
const years = [2024, 2023, 2022, 2021];

const AddQuestionPaper = ({ onSubmit }) => {
  const [year, setYear] = useState(years[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
    } else {
      alert("Please upload a PDF file");
    }
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

  const submit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Upload a PDF first");
      return;
    }
    onSubmit({ year, title, description, file });
  };

  return (
    <Container>
      <h2>Question Paper</h2>
      <Form onSubmit={submit}>
        <FormGroup>
          <Label htmlFor="year">Select Year</Label>
          <Select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={4}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                {file
                  ? file.name
                  : "Drag and drop PDF here, or click add PDF"}
              </UploadText>
              {!file && <UploadButton>Add Pdf</UploadButton>}
            </UploadContent>
          </UploadBox>
        </FormGroup>

        <SubmitButton type="submit">Upload Question Paper</SubmitButton>
      </Form>
    </Container>
  );
};

export default AddQuestionPaper;
