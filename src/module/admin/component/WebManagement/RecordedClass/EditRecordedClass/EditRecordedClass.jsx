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
} from "./EditRecordedClass.styles";
import upload from "../../../../../../assets/upload.png";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";
import { updateRecordedClassById } from "../../../../../../api/recordedAPi";
import { getAllCourses } from "../../../../../../api/courseApi";

const EditRecordedClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingData = location.state?.row;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [coursesList, setCoursesList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    if (editingData) {
      setTitle(editingData.title);
      setDescription(editingData.description);
      setDuration(editingData.duration || "");
      setSelectedCourses(new Set([editingData.course_ref]));
    }
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        setCoursesList(res.data || []);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };
    fetchCourses();
  }, [editingData]);

  const handleFile = (f) => {
    if (f) {
      if (!f.type.startsWith("video/")) {
        setError("Please upload a valid video file.");
        return;
      }
      const maxSize = 100 * 1024 * 1024;
      if (f.size > maxSize) {
        setError("Video file too large (max 100MB).");
        return;
      }
      setFile(f);
      setError("");
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

  const toggleCourse = (id) => {
    setSelectedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.clear() && next.add(id); // Only one course allowed
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !description || !duration || selectedCourses.size === 0) {
      setError("Please fill all fields and select a course.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let videoUrl = editingData.videoUrl;

      // Upload new video if changed
      if (file) {
        const uploadRes = await uploadFileToAzureStorage(file, "recorded-class");
        if (!uploadRes?.blobUrl) {
          setError(uploadRes?.message || "Video upload failed");
          return;
        }
        videoUrl = uploadRes.blobUrl;
      }

      const payload = {
        title,
        description,
        duration,
        videoUrl,
        course_ref: Array.from(selectedCourses)[0]
      };

      const updateRes = await updateRecordedClassById(editingData._id, payload);
      if (updateRes?.success) {
        alert("Recorded class updated successfully!");
        navigate(-1); // go back
      } else {
        setError(updateRes?.message || "Update failed.");
      }
    } catch (err) {
      console.error("Error updating recorded class", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Edit Recorded Class</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
                  {file ? file.name : "Drag and drop video here, or click to add video"}
                </UploadText>
                {!file && <UploadButton>Replace Video</UploadButton>}
              </UploadContent>
            </UploadBox>
          </FormColumn>

          <FormColumn>
            <CoursesContainer>
              <CoursesHeader>Select Course</CoursesHeader>
              <CourseList>
                {coursesList.map((course) => (
                  <CourseItem key={course._id}>
                    <CourseLabel>{course.courseName}</CourseLabel>
                    <CourseCheckbox
                      type="checkbox"
                      checked={selectedCourses.has(course._id)}
                      onChange={() => toggleCourse(course._id)}
                    />
                  </CourseItem>
                ))}
              </CourseList>
            </CoursesContainer>
          </FormColumn>
        </FormRow>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Recorded Class"}
        </SubmitButton>
      </form>
    </Container>
  );
};

export default EditRecordedClass;
