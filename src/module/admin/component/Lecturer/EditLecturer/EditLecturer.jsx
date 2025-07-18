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
} from "./EditLecturer.styles";
import { useNavigate, useParams } from "react-router-dom";
import { getLectureById, updateLectureById } from "../../../../../api/lecturesApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSubjects } from "../../../../../api/subjectApi";
import JoditEditor from 'jodit-react';
import { getAuth } from "../../../../../utils/authService";

export default function EditLecturer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lectureName: "",
    duration: "",
    description: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
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

        setFormData({
          lectureName: lecture.lectureName || "",
          duration: lecture.duration || "",
          description: lecture.description || "",
        });
        const responseSubjects = await getSubjects();
        const subjectsData = responseSubjects.data.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked: lecture.subjectRef.includes(item._id),
        }));
        setSubjectCheckboxes(subjectsData);

        setCurrentVideo(lecture.videoUrl);
        setVideoPreviewUrl(lecture.videoUrl);
      } catch (error) {
        console.error("Failed to fetch lecture:", error);
        toast.error("Failed to fetch lecture");
      }
    };

    if (id) fetchLecture();
  }, [id]);

  const handleVideoUploadClick = () => videoInputRef.current.click();

  const handleCheckboxChange = (index, setFn) => {
    setFn((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { lectureName, duration, description } = formData;

    if (!lectureName || !duration || !description) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const payload = {
        lectureName,
        duration,
        description,
        subjectRef: subjectCheckboxes.filter((item) => item.checked).map((item) => item.id),
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
  }), [formData.description]);

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
          {/* <Column>
            <FieldWrapper>
              <Label htmlFor="duration">Duration (min)*</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^0-9]/g, "");
                  setFormData({ ...formData, duration: filteredData });
                }}
                placeholder="e.g. 20"
                required
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
          <Column>
            <FieldWrapper>
              <Label>Update Video</Label>
              <UploadArea onClick={handleVideoUploadClick}>
                {videoPreviewUrl ? (
                  <VideoContainer>
                    <VideoPlayer controls>
                      <source src={videoPreviewUrl} type="video/mp4" />
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