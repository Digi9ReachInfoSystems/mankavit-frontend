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
import { getAllCourses } from "../../../../../api/courseApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { createRecordedClass } from "../../../../../api/recordedAPi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AddRecordedClass = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const fileRef = useRef();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        const checkboxes = (response.data || []).map((item) => ({
          label: item?.courseName,
          id: item?._id,
          checked: false,
        }));
        setCoursesCheckboxes(checkboxes);
      } catch (error) {
        setError("Error fetching courses");
      }
    };
    fetchCourses();
  }, []);

  const handleFile = (f) => {
    if (f) {
      // Validate file type and size
      if (!f.type.startsWith('video/')) {
        setError("Please upload a valid video file");
        return;
      }
      
      // 10MB limit (adjust as needed)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (f.size > maxSize) {
        setError(`Video file too large (max ${maxSize/1024/1024}MB)`);
        return;
      }
      
      setFile(f);
      setError("");
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
    setSelectedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !description || !file || selectedCourses.size === 0) {
      setError("Please fill all fields, upload a video, and select at least one course");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      console.log("Starting video upload...");
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      // 1. Upload video to Azure
      const uploadRes = await uploadFileToAzureStorage(file, "recorded-class");
      console.log("Upload response:", uploadRes);
      
  if (!(uploadRes?.blobUrl)) {
  const errorMsg = uploadRes?.message || "Video upload failed";
  console.error("Upload failed:", errorMsg);
  setError(errorMsg);
  return;
}

      console.log("Video uploaded successfully. URL:", uploadRes.blobUrl);
      
const data = {
  title,
  description,
  duration: Number(duration), // Convert to number if API expects that
  videoUrl: uploadRes.blobUrl,
  course_ref: Array.from(selectedCourses),
};
// In your submit function, before making the API call
if (!duration || isNaN(Number(duration))) {
  setError("Please enter a valid duration (numeric value)");
  return;
}


      console.log("Creating recorded class with data:", data);
      const createRes = await createRecordedClass(data);
      navigate('/admin/web-management/recorded-class')
      console.log("Create response:", createRes);
      if (createRes?.success) {
        console.log("Recorded class created successfully");
        setTitle("");
        setDescription("");
        setDuration("");
        setFile(null);
        setSelectedCourses(new Set());
        if (onSubmit) onSubmit();
        message.success("Recorded class uploaded successfully!");
      } else {
        const errorMsg = createRes?.message || "Failed to create recorded class";
        console.error("Creation failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Error in submit:", err);
      setError(err.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Upload Recorded Class</h2>
      {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}
      <form onSubmit={submit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            placeholder="Write here"
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
        <FormGroup>
  <Label htmlFor="duration">Duration</Label>
  <TextInput
    id="duration"
    placeholder="e.g. 2 hours"
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
  />
</FormGroup>


        <FormRow>
          <FormColumn>
            <Label>Upload Class Video</Label>
            <UploadBox
              dragOver={dragOver}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
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
                  {file ? file.name : "Drag and drop video here, or click add video"}
                </UploadText>
                {!file && <UploadButton>Add Video</UploadButton>}
              </UploadContent>
            </UploadBox>
          </FormColumn>

          <FormColumn>
            <CoursesContainer>
              <CoursesHeader>Add Courses (Click Checkbox to Select)</CoursesHeader>
              <CourseList>
                {coursesCheckboxes.map((course) => (
                  <CourseItem key={course.id}>
                    <CourseLabel>{course.label}</CourseLabel>
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

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Recorded Class"}
        </SubmitButton>
      </form>
    </Container>
  );
};

export default AddRecordedClass;
