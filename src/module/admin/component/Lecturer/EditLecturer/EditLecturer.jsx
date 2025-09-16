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
  VideoContainer,
  VideoPlayer,
  CheckboxSection,
  CheckboxSectionTitle,
  CheckboxList,
  CheckboxLabel,
  CheckboxInput,
  SubjectsContainer,
  SelectedSubjectsContainer,
  SelectedSubjectItem,
  SubjectName,
  MoveButton,
} from "./EditLecturer.styles";
import { useNavigate, useParams } from "react-router-dom";
import { getLectureById, updateLectureById } from "../../../../../api/lecturesApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import JoditEditor from 'jodit-react';
import { getAuth } from "../../../../../utils/authService";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { uploadVideoToAzureStorage } from "../../../../../utils/azureStorageService";

export default function EditLecturer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lectureName: "",
    duration: "",
    description: "",
    folder: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const videoInputRef = useRef(null);
  const editor = useRef(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["courseManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await getLectureById(id);
        const lecture = response.data;
        console.log("lecture", lecture);
           setCurrentVideo(lecture.videoUrl);
        setVideoPreviewUrl(lecture.videoUrl)
        setFormData({
          lectureName: lecture.lectureName || "",
          duration: lecture.duration || "",
          description: lecture.description || "",
          folder: lecture.folder || "",
        });

        const responseSubjects = await getSubjects();
        const subjectsData = responseSubjects.data.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked: lecture.subjectRef.includes(item._id),
        }));

        setSubjectCheckboxes(subjectsData);

        // Set selected subjects in the correct order
        const orderedSelectedSubjects = lecture.subjectRef.map(subjectId => {
          const subject = subjectsData.find(s => s.id === subjectId);
          return subject ? { ...subject } : null;
        }).filter(Boolean);

        setSelectedSubjects(orderedSelectedSubjects);

      ;
      } catch (error) {
        console.error("Failed to fetch lecture:", error);
        toast.error("Failed to fetch lecture");
      }
    };

    if (id) fetchLecture();
  }, [id]);

  const handleVideoUploadClick = () => videoInputRef.current.click();

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...subjectCheckboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setSubjectCheckboxes(updatedCheckboxes);

    // Update selected subjects
    const selected = updatedCheckboxes.filter(item => item.checked);

    // Maintain the order of already selected subjects
    const newSelectedSubjects = [...selectedSubjects];
    const subjectToUpdate = updatedCheckboxes[index];

    if (subjectToUpdate.checked) {
      // Add to selected if not already there
      if (!newSelectedSubjects.some(s => s.id === subjectToUpdate.id)) {
        newSelectedSubjects.push(subjectToUpdate);
      }
    } else {
      // Remove from selected
      const removeIndex = newSelectedSubjects.findIndex(s => s.id === subjectToUpdate.id);
      if (removeIndex !== -1) {
        newSelectedSubjects.splice(removeIndex, 1);
      }
    }

    setSelectedSubjects(newSelectedSubjects);
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

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    // console.log("file URL changed", URL.createObjectURL(file));
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { lectureName, description } = formData;

    if (!lectureName || !description) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      // Rearrange subjects before submission
      const subjectIds = selectedSubjects.map(subject => subject.id);
      await rearrangeSubjects(subjectIds);
      // Upload video
      const videoResponse = await uploadVideoToAzureStorage(videoFile, formData.folder);
      if (!videoResponse?.blobUrl) {
        throw new Error("Video upload failed");
      }

      const payload = {
        lectureName,
        // duration,
        description,
        subjectRef: subjectIds,
        videoUrl: videoResponse.blobUrl,
      };

      const response = await updateLectureById(id, payload);
      if (response.success) {
        toast.success("Lecture updated successfully!");
        setTimeout(() => navigate("/admin/lecturer-management"), 1000);
      } else {
        throw new Error(response.message || "Failed to update lecture");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update lecture");
    }
  };

  const configDis = useMemo(() => ({
    readonly: false,
    placeholder: formData.description,
  }), []);

  return (
    <Container>
      <Title>Edit Video</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Video Title*</Label>
              <Input
                id="lectureName"
                name="lectureName"
                value={formData.lectureName}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setFormData({ ...formData, lectureName: filteredData });
                }}
                placeholder="Enter Video Name"
                required
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
                value={formData.description}
                config={configDis}
                tabIndex={1}
                onBlur={newContent => { console.log("new", newContent); }}
                onChange={newContent => { setFormData({ ...formData, description: newContent }) }}
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Folder</Label>
              <p style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                background: "#f9f9f9"
              }}>
                  {formData?.folder || "No folder assigned"}
              </p>
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
                <CheckboxSectionTitle>Selected Subjects (Drag to reorder)</CheckboxSectionTitle>
                {selectedSubjects.length > 0 ? (
                  selectedSubjects.map((subject, index) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
                      <div>
                        <MoveButton
                          style={{
                            backgroundColor: "green"
                          }}
                          type="button"
                          onClick={() => moveSubjectUp(index)}
                          disabled={index === 0}
                        >
                          <FaArrowUp />
                        </MoveButton>
                        <MoveButton
                          style={{
                            backgroundColor: "red"
                          }}
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
          <Column>
            <FieldWrapper>
              <Label>Update Video </Label>
              <UploadArea onClick={handleVideoUploadClick}>
                {videoPreviewUrl ? (
                  <VideoContainer>
                    <VideoPlayer key={videoPreviewUrl}  controls>
                      <source src={videoPreviewUrl.startsWith("blob:") ? videoPreviewUrl : `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${videoPreviewUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </VideoPlayer>
                  </VideoContainer>
                ) : (
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                    <p>Click to upload new video</p>
                    <p><strong>or Browse Files</strong></p>
                  </UploadPlaceholder>
                )}
                <FileInput
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </UploadArea>
            </FieldWrapper>
          </Column>
        </FormRow>
        {
          !readOnlyPermissions && (
            <FormRow>
              <Column>
                <SubmitButton type="submit">Update Lecture</SubmitButton>
              </Column>
            </FormRow>
          )
        }
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
        theme="colored"
      />
    </Container>
  );
}