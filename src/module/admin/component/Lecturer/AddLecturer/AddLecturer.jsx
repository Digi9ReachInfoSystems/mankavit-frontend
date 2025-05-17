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
export default function AddLecturer() {
  const [lectureName, setLectureName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch subjects and courses
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

  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lectureName || !duration || !description || !videoUrl || !selectedSubject || !selectedCourse) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append("lectureName", lectureName);
      formData.append("duration", duration);
      formData.append("description", description);
      formData.append("videoUrl", videoUrl);
      formData.append("subjectRef", selectedSubject);
      formData.append("courseRef", selectedCourse);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const response = await createLecture(formData);
      
      toast.success("Lecture created successfully!");
      console.log("Lecture created:", response.data);
      
      // Reset form
      setLectureName("");
      setDuration("");
      setDescription("");
      setVideoUrl("");
      setSelectedSubject(null);
      setSelectedCourse(null);
      setThumbnailFile(null);
      setPreviewUrl("");
      
      // Navigate back to lectures list
      navigate("/admin/lecturer-management");
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
        {/* Row 1 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Lecture Name *</Label>
              <Input
                id="lectureName"
                value={lectureName}
                onChange={(e) => setLectureName(e.target.value)}
                placeholder="Enter Lecture Name"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 20 min"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 2 */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Description *</Label>
              <TextArea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </FieldWrapper>
          </Column>
          <Column>
            <FieldWrapper>
              <Label htmlFor="videoUrl">Video URL *</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter video URL"
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Row 3 */}
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Select Subject *</CheckboxSectionTitle>
              <CheckboxList>
                {subjects.map((subject) => (
                  <CheckboxLabel key={subject._id}>
                    <CheckboxInput
                      type="radio"
                      name="subject"
                      checked={selectedSubject === subject._id}
                      onChange={() => setSelectedSubject(subject._id)}
                    />
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
                    <CheckboxInput
                      type="radio"
                      name="course"
                      checked={selectedCourse === course._id}
                      onChange={() => setSelectedCourse(course._id)}
                    />
                    {course.courseName}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>

        {/* Row 4 */}
        <FormRow>
          <Column style={{ flex: 1 }}>
            <Label>Upload Thumbnail</Label>
            <UploadArea onClick={handleUploadAreaClick}>
              {thumbnailFile && previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  <p>{thumbnailFile.name}</p>
                </>
              ) : (
                <>
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                  </UploadPlaceholder>
                  <p>Drag and drop image here</p>
                  <p>
                    or <strong>Add Image</strong>
                  </p>
                </>
              )}
              <FileInput 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </UploadArea>
          </Column>
        </FormRow>

        {/* Submit */}
        <FormRow>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Add Lecture"}
          </SubmitButton>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}