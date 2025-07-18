import React, { useState, useRef, useEffect, useMemo } from "react";
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
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
  VideoControl,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
} from "./AddLecturer.styles";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../../../../../api/lecturesApi";
import { getAllCourses } from "../../../../../api/courseApi";
import { getSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from 'jodit-react';

export default function AddLecturer() {
  const [lectureName, setLectureName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoInputRef = useRef(null);
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const navigate = useNavigate();
  const editor = useRef(null);

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
        const responseSubjects = await getSubjects();
        const subjectsData = responseSubjects.data.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked: false,
        }));
        setSubjectCheckboxes(subjectsData);

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

  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureName || !duration || !description || !videoFile) {
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

      // Build request payload
      const submissionData = {
        lectureName,
        description,
        duration,
        videoUrl: videoResponse.blobUrl,
        subjectRef: subjectCheckboxes
          .filter((item) => item.checked)
          .map((item) => item.id),
      };
      console.log("submissionData", submissionData);

      const response = await createLecture(submissionData);

      toast.success("Lecture created successfully");
      setTimeout(() => {
        navigate("/admin/lecturer-management");
      }, 1000);

      setLectureName("");
      setDuration("");
      setDescription("");
      setSelectedSubject(null);
      setSelectedCourse(null);
      setVideoFile(null);
      setSubjectCheckboxes(subjectCheckboxes.map((item) => ({ ...item, checked: false })));
    } catch (error) {
      toast.error("Failed to create lecture");
      console.error("Error creating lecture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const config = useMemo(() => ({
    readonly: false,
    placeholder: description,
  }), [description]);

  return (
    <Container>
      <Title>Add Video</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Video title *</Label>
              <Input 
                id="lectureName" 
                value={lectureName}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setLectureName(e.target.value);
                }}
                placeholder="Enter Video Title" 
              />
            </FieldWrapper>
          </Column>
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration *</Label>
              <Input 
                id="duration" 
                value={duration}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^0-9\s]/g, '');
                  setDuration(filteredData);
                }}
                placeholder="e.g. 20 min" 
              />
            </FieldWrapper>
          </Column> */}
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description"> Description</Label>
              <JoditEditor
                ref={editor}
                value={description}
                config={config}
                tabIndex={1}
                onBlur={newContent => { console.log("new", newContent); }}
                onChange={newContent => { setDescription(newContent); }}
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <CheckboxSection>
              <CheckboxSectionTitle>Add Subject</CheckboxSectionTitle>
              <CheckboxList>
                {subjectCheckboxes.map((item, index) => (
                  <CheckboxLabel key={item.id || index}>
                    <CheckboxInput
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index, setSubjectCheckboxes)}
                    />
                    {item.label}
                  </CheckboxLabel>
                ))}
              </CheckboxList>
            </CheckboxSection>
          </Column>
        </FormRow>
        <FormRow>
          <Column style={{ flex: 1 }}>
            <FieldWrapper>
              <Label>Upload Video *</Label>
              <UploadArea onClick={() => videoInputRef.current.click()}>
                {videoFile ? (
                  <>
                    <VideoControl controls>
                      <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                    </VideoControl>
                    <p>{videoFile.name}</p>
                  </>
                ) : (
                  <>
                    <UploadPlaceholder><img src={upload} alt="Upload" /></UploadPlaceholder>
                    <p>Drag and drop video here</p>
                    <p>or <strong>Upload Video</strong></p>
                  </>
                )}
                <FileInput 
                  ref={videoInputRef} 
                  type="file" 
                  accept="video/*" 
                  onChange={handleVideoFileChange} 
                />
              </UploadArea>
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Add Lecture"}
          </SubmitButton>
        </FormRow>
      </FormWrapper>

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
    </Container>
  );
}