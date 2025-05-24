import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  DateTimeInput,
  TextArea,
  UploadBox,
  UploadInput,
  UploadContent,
  UploadIcon,
  UploadText,
  UploadButton,
  SubmitButton,
  FormItem
} from "./EditLiveclass.styles";
import { useLocation } from "react-router-dom";
import upload from "../../../../../../assets/upload.png";

const EditLiveclass = ({ onSubmit }) => {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const location = useLocation();
  const editingData = location.state?.row;

  const [schedule, setschedule] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");

  // Initialize form fields with editingData
useEffect(() => {
  if (editingData) {
    console.log("editingData loaded:", editingData);
    // convert to local datetime-local format
    const localDateTime = convertToLocalDatetime(editingData.schedule);
    setschedule(localDateTime || "");
    setTitle(editingData.title || "");
    setDescription(editingData.description || "");
    setFileName(editingData.bannerUrl || "");
  }
}, [editingData]);


const convertToLocalDatetime = (utcString) => {
  if (!utcString) return "";
  const date = new Date(utcString);
  // returns format 'YYYY-MM-DDTHH:mm'
  return date.toISOString().slice(0, 16);
};


  const handleFile = (f) => {
    if (f && f.type.startsWith("image/")) {
      setFile(f);
    } else {
      alert("Please upload an image file");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Submit values:", { schedule, title, description, file, fileName });

    if (!schedule || !title || !description || (!file && !fileName)) {
      alert("Please fill out all fields and upload a banner");
      return;
    }

   onSubmit({
  schedule,
  title,
  description,
  file: file ? file : fileName, // still sends existing banner if not changed
});

  };

  return (
    <Container>
      <h2>Edit Live Class</h2>
      <Form onSubmit={submit}>
        <FormItem>
          <FormGroup>
  <Label htmlFor="schedule">Select Time</Label>
  <DateTimeInput
    id="schedule"
    type="datetime-local"
    value={schedule}
    onChange={(e) => setschedule(e.target.value)}
  />
</FormGroup>


          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <DateTimeInput
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </FormItem>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={8}
            placeholder="Write here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Upload Banner</Label>
          <UploadBox onClick={() => fileInputRef.current.click()}>
            <UploadInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
            />
        <UploadContent>
  <UploadIcon>
    {file ? (
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "cover" }}
      />
    ) : fileName ? (
      <img
        src={fileName} // assuming fileName is a valid URL or relative path
        alt="Existing banner"
        style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "cover" }}
      />
    ) : (
      <img src={upload} alt="Upload Icon" />
    )}
  </UploadIcon>
  <UploadText>
    {file?.name }
  </UploadText>
  {!file && <UploadButton>Add Image</UploadButton>}
</UploadContent>

          </UploadBox>
        </FormGroup>

        <SubmitButton type="submit">Update Live Class</SubmitButton>
      </Form>
    </Container>
  );
};

export default EditLiveclass;
