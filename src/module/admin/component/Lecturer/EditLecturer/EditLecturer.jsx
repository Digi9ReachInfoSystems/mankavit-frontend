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
  ThumbnailPreview,
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

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [subjectCheckboxes, setSubjectCheckboxes] = useState([]);
  const thumbnailInputRef = useRef(null);
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

        setCurrentThumbnail(lecture.thumbnail);
        setCurrentVideo(lecture.videoUrl);
        setPreviewUrl(lecture.thumbnail);
        setVideoPreviewUrl(lecture.videoUrl);
      } catch (error) {
        console.error("Failed to fetch lecture:", error);
        toast.error("Failed to fetch lecture");
      }
    };

    if (id) fetchLecture();
  }, [id]);

  const handleThumbnailUploadClick = () => thumbnailInputRef.current.click();
  const handleVideoUploadClick = () => videoInputRef.current.click();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
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
        // Add upload logic for video and thumbnail here if needed
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
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: formData.description,
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []
  );

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
          <Column>
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
        {/* <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Description*</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setFormData({ ...formData, description: filteredData });
                }}
                rows="4"
                placeholder="Enter detailed description"
                required
              />
            </FieldWrapper>
          </Column>
        </FormRow> */}
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

          <Column>
            <FieldWrapper>
              <Label>Update Thumbnail</Label>
              <UploadArea onClick={handleThumbnailUploadClick}>
                {previewUrl && previewUrl !== currentThumbnail ? (
                  <img src={previewUrl} alt="New Thumbnail" className="preview" />
                ) : currentThumbnail ? (
                  <ThumbnailPreview>
                    <img src={currentThumbnail} alt="Current Thumbnail" />
                  </ThumbnailPreview>
                ) : (
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                    <p>No thumbnail available</p>
                    <p><strong>Click to upload</strong></p>
                  </UploadPlaceholder>
                )}
                <FileInput
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
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
