import React, { useState, useRef } from "react";
import {
  Container,
  FormGroup,
  Label,
  ReadOnlyInput,
  TextInput,
  TextArea,
  UploadBox,
  UploadInput,
  UploadContent,
  UploadIcon,
  UploadText,
  UploadButton,
  SubmitButton
} from "../Notification/Notification.style";
import upload from "../../../../../assets/upload.png";
const Notification = ({ scheduleTime = "16:00 IST, 24/08/2025", onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

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
    handleFile(e.dataTransfer.files[0]);
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, file });
  };

  return (
    <Container>
      <h2>Notification</h2>
      <form onSubmit={submit}>
        <FormGroup>
          <Label>Schedule Time</Label>
          <ReadOnlyInput readOnly value={scheduleTime} />
        </FormGroup>

        <FormGroup>
          <Label>Title</Label>
          <TextInput
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            rows={4}
            placeholder="Enter description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Upload Image</Label>
          <UploadBox
            dragOver={dragOver}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current.click()}
          >
            <UploadInput
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <UploadContent>
              <UploadIcon>
                <img src={upload} alt="upload" />
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

        <SubmitButton type="submit">Send Notification</SubmitButton>
      </form>
    </Container>
  );
};

export default Notification;
