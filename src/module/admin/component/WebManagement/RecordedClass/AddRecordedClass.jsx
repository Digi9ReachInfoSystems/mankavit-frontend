import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  FormRow,
  FormColumn,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  UploadBox,
  UploadInput,
  UploadContent,
  UploadIcon,
  UploadText,
  UploadButton,
  CoursesContainer,
  CoursesHeader,
  CourseList,
  CourseItem,
  CourseLabel,
  CourseCheckbox,
  SubmitButton
} from "../RecordedClass/AddRecordedClass.style";
import upload from "../../../../../assets/upload.png";
import { useLocation } from "react-router-dom";

// sample courses data
const sampleCourses = [
  { id: 1, name: "Mankavit Mock Test - CLAT 2025" },
  { id: 2, name: "Mankavit Mock Test - CLAT 2025" },
  { id: 3, name: "Mankavit Mock Test - CLAT 2025" },
  { id: 4, name: "Mankavit Mock Test - CLAT 2025" },
  { id: 5, name: "Mankavit Mock Test - CLAT 2025" },
  { id: 6, name: "Mankavit Mock Test - CLAT 2025" }
];

const AddRecordedClass = ({ onSubmit }) => {
  const location = useLocation();
  const editingData = location.state?.row; // get data from state if exists

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const fileRef = useRef();

  useEffect(() => {
    if (editingData) {
      setTitle(editingData.title);
      setDescription(editingData.description);
      setSelectedCourses(new Set([editingData.coursesEnrolled])); // adjust logic if multiple courses
    }
  }, [editingData]);

  const handleFile = (f) => {
    if (f) {
      setFile(f);
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

  const toggleCourse = (id) => {
    setSelectedCourses(new Set(editingData.courses || []));
    setSelectedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, file, courses: Array.from(selectedCourses) });
  };

  return (
    <Container>
      <h2>Upload Recorded Class</h2>
      <form onSubmit={submit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            placeholder="write here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={4}
            placeholder="Write here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormRow>
          <FormColumn>
            <Label>Upload Class</Label>
            <UploadBox
              dragOver={dragOver}
              onDragOver={(e) => {
                e.preventDefault(); setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current.click()}
            >
              <UploadInput
                ref={fileRef}
                type="file"
                accept="video/*"
                onChange={onFileChange}
              />
              <UploadContent>
                <UploadIcon>
                    <img src={upload} alt="upload" />
                </UploadIcon>
                <UploadText>
                  {file ? file.name : "Drag and drop video here, or click add image"}
                </UploadText>
                {!file && <UploadButton>Add Video</UploadButton>}
              </UploadContent>
            </UploadBox>
          </FormColumn>

          <FormColumn>
            <CoursesContainer>
              <CoursesHeader>Add Courses (Click Checkbox to Select)</CoursesHeader>
              <CourseList>
                {sampleCourses.map((course) => (
                  <CourseItem key={course.id}>
                    <CourseLabel>{course.name}</CourseLabel>
                    <CourseCheckbox
                      type="checkbox"
                      checked={selectedCourses.has(course.id)}
                      onChange={() => toggleCourse(course.id)}
                    />
                  </CourseItem>
                ))}
              </CourseList>
            </CoursesContainer>
          </FormColumn>
        </FormRow>

        <SubmitButton type="submit">Upload Recorded Class</SubmitButton>
      </form>
    </Container>
  );
};

export default AddRecordedClass;
