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
  SelectedSubjectsContainer,
  SelectedSubjectItem,
  SubjectName,
  MoveButton,
  SubjectsContainer,
} from "./AddLecturer.styles";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../../../../../api/lecturesApi";
import { getAllCourses } from "../../../../../api/courseApi";
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import { uploadFileToAzureStorage } from "../../../../../utils/azureStorageService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from 'jodit-react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function AddLecturer() {
  const [lectureName, setLectureName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const videoInputRef = useRef(null);
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
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

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...subjectCheckboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setSubjectCheckboxes(updatedCheckboxes);

    // Update selected subjects
    const selected = updatedCheckboxes.filter(item => item.checked);
    setSelectedSubjects(selected);
  };

  const moveSubjectUp = (index) => {
    if (index <= 0) return;
    
    const newSelectedSubjects = [...selectedSubjects];
    // Swap positions
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] = 
      [newSelectedSubjects[index - 1], newSelectedSubjects[index]];
    
    setSelectedSubjects(newSelectedSubjects);
  };

  const moveSubjectDown = (index) => {
    if (index >= selectedSubjects.length - 1) return;
    
    const newSelectedSubjects = [...selectedSubjects];
    // Swap positions
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] = 
      [newSelectedSubjects[index + 1], newSelectedSubjects[index]];
    
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureName  || !description || !videoFile) {
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

      // Rearrange subjects before submission
      const subjectIds = selectedSubjects.map(subject => subject.id);
      await rearrangeSubjects(subjectIds);

      // Build request payload
      const submissionData = {
        lectureName,
        description,
        // duration,
        videoUrl: videoResponse.blobUrl,
        subjectRef: subjectIds,
      };

      const response = await createLecture(submissionData);
      console.log("API Response:", response.data);

      toast.success("Lecture created successfully");
      setTimeout(() => {
        navigate("/admin/lecturer-management");
      }, 1000);

      // Reset form
      setLectureName("");
      setDuration("");
      setDescription("");
      setVideoFile(null);
      setSubjectCheckboxes(subjectCheckboxes.map((item) => ({ ...item, checked: false })));
      setSelectedSubjects([]);
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
  }), []);

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
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Subjects</CheckboxSectionTitle>
                <CheckboxList>
                  {subjectCheckboxes.map((item, index) => (
                    <CheckboxLabel key={item.id || index}>
                      <CheckboxInput
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      {item.label}
                    </CheckboxLabel>
                  ))}
                </CheckboxList>
              </CheckboxSection>
              
              <SelectedSubjectsContainer>
                <CheckboxSectionTitle>Selected Subjects </CheckboxSectionTitle>
                {selectedSubjects.length > 0 ? (
                  selectedSubjects.map((subject, index) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
                      <div>
                        <MoveButton 
                        style={
                          {backgroundColor:"green"}
                        }
                          type="button" 
                          onClick={() => moveSubjectUp(index)}
                          disabled={index === 0}
                        >
                          <FaArrowUp />
                        </MoveButton>
                        <MoveButton 
                        style={
                          {backgroundColor:"red"}}
                          type="button" 
                          onClick={() => moveSubjectDown(index)}
                          disabled={index === selectedSubjects.length - 1}
                        >
                          <FaArrowDown />
                        </MoveButton>
                      </div>
                    </SelectedSubjectItem>
                  ))
                ) : (
                  <p>No subjects selected</p>
                )}
              </SelectedSubjectsContainer>
            </SubjectsContainer>
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