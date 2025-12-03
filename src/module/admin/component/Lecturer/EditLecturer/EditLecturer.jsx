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
  VideoWrapper,
  MoveButton,
} from "./EditLecturer.styles";
import VideoPlayerCustom from "../../../../../component/VideoPlayerCustom/VideoPlayerCustom";

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
  const [updating, setUpdating] = useState(false);

  // flag to ignore accidental submits coming from clicks inside the video area
  const ignoreSubmitRef = useRef(false);

  // 🔎 New: search term for subjects
  const [searchSubject, setSearchSubject] = useState("");

  // 🔎 New: filter the visible subjects but keep source of truth in subjectCheckboxes
  const filteredSubjects = useMemo(
    () =>
      subjectCheckboxes.filter((s) =>
        s.label.toLowerCase().includes(searchSubject.toLowerCase())
      ),
    [subjectCheckboxes, searchSubject]
  );

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

 // --- add this helper near the top of the file (once) ---
const getDocCreatedAt = (doc) => {
  if (!doc) return new Date(0);

  if (doc.createdAt) {
    try {
      return new Date(doc.createdAt);
    } catch {
      // fallthrough
    }
  }

  const idCandidate =
    typeof doc._id === "string"
      ? doc._id
      : doc._id && doc._id.$oid
      ? doc._id.$oid
      : null;

  if (typeof idCandidate === "string" && idCandidate.length >= 8) {
    const seconds = parseInt(idCandidate.substring(0, 8), 16);
    return new Date(seconds * 1000);
  }

  return new Date(0);
};

// --- replace your existing useEffect(...) that fetches lecture & subjects with this ---
useEffect(() => {
  const fetchLecture = async () => {
    try {
      const response = await getLectureById(id);
      const lecture = response.data;

      setCurrentVideo(lecture.videoUrl);
      setVideoPreviewUrl(lecture.videoUrl);
      setFormData({
        lectureName: lecture.lectureName || "",
        duration: lecture.duration || "",
        description: lecture.description || "",
        folder: lecture.folder || "",
      });

      // fetch subjects and sort newest-first (prefer createdAt, fallback to ObjectId timestamp)
      const responseSubjects = await getSubjects();
      const rawSubjects = Array.isArray(responseSubjects?.data)
        ? responseSubjects.data
        : Array.isArray(responseSubjects)
        ? responseSubjects
        : [];

      const sortedSubjects = rawSubjects
        .slice() // copy to avoid mutating original
        .sort((a, b) => getDocCreatedAt(b) - getDocCreatedAt(a));

      const subjectsData = sortedSubjects.map((item) => ({
        label: item.subjectName,
        id: item._id,
        // check membership robustly (handles both string ids and object refs)
        checked:
          Array.isArray(lecture.subjectRef) &&
          lecture.subjectRef.some((ref) =>
            typeof ref === "object" ? ref === item._id || ref._id === item._id : ref === item._id
          ),
      }));

      setSubjectCheckboxes(subjectsData);

      // maintain selected order from lecture.subjectRef (use subjectsData, which is sorted for "Available" list)
      const orderedSelectedSubjects = Array.isArray(lecture.subjectRef)
        ? lecture.subjectRef
            .map((subjectId) =>
              subjectsData.find((s) => s.id === (typeof subjectId === "object" ? subjectId._id : subjectId)) || null
            )
            .filter(Boolean)
        : [];

      setSelectedSubjects(orderedSelectedSubjects);
    } catch (error) {
      toast.error("Failed to fetch lecture");
    }
  };

  if (id) fetchLecture();
}, [id]);


  const handleVideoUploadClick = () => videoInputRef.current.click();

  const handleCheckboxChange = (originalIndex) => {
    const updatedCheckboxes = [...subjectCheckboxes];
    updatedCheckboxes[originalIndex].checked = !updatedCheckboxes[originalIndex].checked;
    setSubjectCheckboxes(updatedCheckboxes);

    // Update selected subjects from updatedCheckboxes
    const selected = updatedCheckboxes.filter(item => item.checked);

    // Keep existing order where possible
    const subjectToUpdate = updatedCheckboxes[originalIndex];
    const newSelectedSubjects = [...selectedSubjects];

    if (subjectToUpdate.checked) {
      if (!newSelectedSubjects.some(s => s.id === subjectToUpdate.id)) {
        newSelectedSubjects.push(subjectToUpdate);
      }
    } else {
      const removeIndex = newSelectedSubjects.findIndex(s => s.id === subjectToUpdate.id);
      if (removeIndex !== -1) newSelectedSubjects.splice(removeIndex, 1);
    }

    setSelectedSubjects(newSelectedSubjects);
  };

  const moveSubjectUp = (index) => {
    if (index <= 0) return;
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] =
      [newSelectedSubjects[index - 1], newSelectedSubjects[index]];
    setSelectedSubjects(newSelectedSubjects);
  };

  const moveSubjectDown = (index) => {
    if (index >= selectedSubjects.length - 1) return;
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] =
      [newSelectedSubjects[index + 1], newSelectedSubjects[index]];
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  // main submit handler - now checks ignoreSubmitRef to avoid accidental submits from player clicks
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if the most recent click came from the video area, ignore this submit
    if (ignoreSubmitRef.current) {
      // clear the flag and bail out
      ignoreSubmitRef.current = false;
      return;
    }

    const { lectureName, description } = formData;

    if (!lectureName || !description) {
      toast.error("Please fill all required fields!");
      return;
    }
    setUpdating(true);

    try {
      // Rearrange subjects before submission
      let subjectIds = [];
      if (selectedSubjects.length > 0) {
        subjectIds = selectedSubjects.map(subject => subject.id);
        await rearrangeSubjects(subjectIds);
      }

      let payload = {
        lectureName,
        description,
        subjectRef: subjectIds,
      };

      if (videoPreviewUrl && videoFile) {
        payload.videoUrl = videoFile;
      }

      const response = await updateLectureById(id, payload);
      if (response.success) {
        toast.success("Lecture updated successfully!");
      } else {
        throw new Error(response.message || "Failed to update lecture");
      }
    } catch (error) {
      toast.error("Failed to update lecture");
    } finally {
      setUpdating(false);
    }
  };

  const configDis = useMemo(() => ({
    readonly: false,
    placeholder: formData.description,
  }), []);

  return (
    <Container>
      <Title>Edit Video</Title>
      {/* keep the same submit handler but now it checks ignoreSubmitRef */}
      <FormWrapper onSubmit={handleSubmit}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Video Title*</Label>
              <Input
                id="lectureName"
                name="lectureName"
                value={formData.lectureName}
                onChange={(e) => setFormData({ ...formData, lectureName: e.target.value })}
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
                onBlur={newContent => { setFormData({ ...formData, description: newContent }) }}
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

                <div style={{ marginBottom: "12px" }}>
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                  />
                </div>

                <CheckboxList>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((item) => (
                      <CheckboxLabel key={item.id}>
                        <CheckboxInput
                          type="checkbox"
                          checked={item.checked}
                          onChange={() =>
                            handleCheckboxChange(
                              subjectCheckboxes.findIndex((s) => s.id === item.id)
                            )
                          }
                        />
                        {item.label}
                      </CheckboxLabel>
                    ))
                  ) : (
                    <p style={{ padding: "6px 2px", color: "#666" }}>No subjects found</p>
                  )}
                </CheckboxList>
              </CheckboxSection>

              <SelectedSubjectsContainer>
                <CheckboxSectionTitle>Selected Subjects (Drag to reorder)</CheckboxSectionTitle>
                {selectedSubjects.length > 0 ? (
                  selectedSubjects.map((subject, index) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
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

              {/* UploadArea capture click BEFORE form submit */}
              <UploadArea
                role="button"
                tabIndex={0}
                onClickCapture={(e) => {
                  // mark that the last click originated inside the upload area (or player)
                  // this fires BEFORE the browser's form submit, so handleSubmit can check it
                  ignoreSubmitRef.current = true;
                  // Clear the flag shortly after (so only the immediate submit is ignored)
                  setTimeout(() => {
                    // safety: only clear if still true (in case handleSubmit already reset)
                    if (ignoreSubmitRef.current) ignoreSubmitRef.current = false;
                  }, 50);
                }}
                onClick={(e) => {
                  // Only open picker when clicking UploadArea container itself (not child controls)
                  if (e.target === e.currentTarget) {
                    handleVideoUploadClick();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleVideoUploadClick();
                  }
                }}
              >
               {videoPreviewUrl ? (
  <VideoWrapper>
    <VideoPlayerCustom
      src={
        videoPreviewUrl.startsWith("blob:")
          ? videoPreviewUrl
          : `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${videoPreviewUrl}`
      }
      movingText={formData.lectureName}
      onClick={() => {}}
      onEnded={() => {}}
    />
  </VideoWrapper>
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

        {!readOnlyPermissions && (
          <FormRow>
            <Column>
              <SubmitButton type="submit" disabled={updating}>
                {updating ? "Updating... " : "Update Lecture"}
              </SubmitButton>
            </Column>
          </FormRow>
        )}
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
