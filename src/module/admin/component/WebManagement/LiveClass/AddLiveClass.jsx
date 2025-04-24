import React, { useState, useRef } from "react";
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
} from "../LiveClass/AddLiveClass.style";

import upload from "../../../../../assets/upload.png";
const AddLiveClass = ({ onSubmit }) => {
  const [dateTime, setDateTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleFile = (f) => {
    if (f && f.type.startsWith("image/")) {
      setFile(f);
    } else {
      alert("Please upload an image file");
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!dateTime || !title || !description || !file) {
      alert("Please fill out all fields and upload a banner");
      return;
    }
    onSubmit({ dateTime, title, description, file });
  };

  return (
    <Container>
      <h2>Schedule Live Class</h2>
      <Form onSubmit={submit}>
        <FormItem>
        <FormGroup>
          <Label htmlFor="dateTime">Select Time</Label>
          <DateTimeInput
            id="dateTime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <DateTimeInput
            id="title"
            placeholder="write here"
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
          <UploadBox
            dragOver={dragOver}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <UploadContent>
              <UploadIcon>
      <img src={upload} alt="Upload Icon" />
              </UploadIcon>
              <UploadText>
                {file
                  ? file.name
                  : "Drag and drop image here, or click add image"}
              </UploadText>
              {!file && <UploadButton>Add Image</UploadButton>}
            </UploadContent>
          </UploadBox>
        </FormGroup>

        <SubmitButton type="submit">Schedule Live Class</SubmitButton>
      </Form>
    </Container>
  );
};

export default AddLiveClass;
