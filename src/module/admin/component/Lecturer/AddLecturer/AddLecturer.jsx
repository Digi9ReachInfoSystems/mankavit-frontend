import React, { useState, useRef, useEffect } from "react";
import upload from "../../../../../assets/upload.png";
import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  Input,
  TextArea,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
} from "./AddLecturer.styles";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../../../../../api/lecturesApi";
import { getAllCourses } from "../../../../../api/courseApi";
import { getSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";

export default function AddLecturer() {
  const [lectureName, setLectureName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [subjectsResponse, coursesResponse] = await Promise.all([
          getSubjects(),
          getAllCourses()
        ]);
        setSubjects(subjectsResponse.data || []);
        setCourses(coursesResponse.data || []);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureName || !duration || !description || !videoFile || !selectedSubject || !selectedCourse) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setIsLoading(true);

      // Upload video
      const videoResponse = await uploadFileToAzureStorage(videoFile, "lectures");
      if (!videoResponse?.blobUrl) {
        throw new Error("Video upload failed");
      }

      // Upload thumbnail if available
      let thumbnailUrl = "";
      if (thumbnailFile) {
        const thumbResponse = await uploadFileToAzureStorage(thumbnailFile, "lectures");
        if (!thumbResponse?.blobUrl) {
          throw new Error("Thumbnail upload failed");
        }
        thumbnailUrl = thumbResponse.blobUrl;
      }

      // Build request payload
      const submissionData = {
        lectureName,
        description,
        duration,
        videoUrl: videoResponse.blobUrl,
        courseRef: selectedCourse,
        subjectRef: selectedSubject,
        thumbnail: thumbnailUrl
      };

      const response = await createLecture(submissionData);
      toast.success("Lecture created successfully!");
      navigate("/admin/lecturer-management");

      setLectureName("");
      setDuration("");
      setDescription("");
      setSelectedSubject(null);
      setSelectedCourse(null);
      setVideoFile(null);
      setThumbnailFile(null);
      setPreviewUrl("");
    } catch (error) {
      toast.error("Failed to create lecture");
      console.error("Error creating lecture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Add Lecture</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Lecture Name *</Label>
              <Input id="lectureName" value={lectureName} onChange={(e) => setLectureName(e.target.value)} placeholder="Enter Lecture Name" />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration *</Label>
              <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 20 min" />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Description *</Label>
              <TextArea id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label>Upload Video *</Label>
              <UploadArea onClick={() => videoInputRef.current.click()}>
                {videoFile ? (
                  <p>{videoFile.name}</p>
                ) : (
                  <>
                    <UploadPlaceholder><img src={upload} alt="Upload" /></UploadPlaceholder>
                    <p>Drag and drop video here</p>
                    <p>or <strong>Upload Video</strong></p>
                  </>
                )}
                <FileInput ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoFileChange} />
              </UploadArea>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Subject *</CheckboxSectionTitle>
              <CheckboxList>
                {subjects.map((subject) => (
                  <CheckboxLabel key={subject._id}>
                    <CheckboxInput type="radio" name="subject" checked={selectedSubject === subject._id} onChange={() => setSelectedSubject(subject._id)} />
                    {subject.subjectName}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Course *</CheckboxSectionTitle>
              <CheckboxList>
                {courses.map((course) => (
                  <CheckboxLabel key={course._id}>
                    <CheckboxInput type="radio" name="course" checked={selectedCourse === course._id} onChange={() => setSelectedCourse(course._id)} />
                    {course.courseName}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={() => thumbnailInputRef.current.click()}>
              {thumbnailFile && previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  <p>{thumbnailFile.name}</p>
                </>
              ) : (
                <>
                  <UploadPlaceholder><img src={upload} alt="Upload" /></UploadPlaceholder>
                  <p>Drag and drop image here</p>
                  <p>or <strong>Add Image</strong></p>
                </>
              )}
              <FileInput ref={thumbnailInputRef} type="file" accept="image/*" onChange={handleThumbnailChange} />
            </UploadArea>
          </Column>
        </FormRow>

        <FormRow>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Add Lecture"}
          </SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}
