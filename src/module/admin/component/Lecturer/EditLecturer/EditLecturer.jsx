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
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
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
} from "./EditLecturer.styles";
import VideoPlayerCustom from "../../../../../component/VideoPlayerCustom/VideoPlayerCustom";

import { useNavigate, useParams } from "react-router-dom";
import { getLectureById, updateLectureById } from "../../../../../api/lecturesApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import JoditEditor from "jodit-react";
import { getAuth } from "../../../../../utils/authService";

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

  const ignoreSubmitRef = useRef(false);
  const [searchSubject, setSearchSubject] = useState("");

  const filteredSubjects = useMemo(
    () =>
      subjectCheckboxes.filter((s) =>
        s.label.toLowerCase().includes(searchSubject.toLowerCase())
      ),
    [subjectCheckboxes, searchSubject]
  );

  // Helper to get createdAt fallback from objectId
  const getDocCreatedAt = (doc) => {
    if (!doc) return new Date(0);
    if (doc.createdAt) {
      try {
        return new Date(doc.createdAt);
      } catch {}
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

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const response = await getAuth();
        if (response?.isSuperAdmin === true) {
          setReadOnlyPermissions(false);
        } else {
          setReadOnlyPermissions(
            !!response?.Permissions?.["courseManagement"]?.readOnly
          );
        }
      } catch (err) {
        // ignore permission fetch failure (keep default false)
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    // fetch lecture and subjects
    const fetchLecture = async () => {
      try {
        const response = await getLectureById(id);
        const lecture = response.data || {};

        setCurrentVideo(lecture.videoUrl || "");
        setVideoPreviewUrl(lecture.videoUrl || "");
        setFormData({
          lectureName: lecture.lectureName || "",
          duration: lecture.duration || "",
          description: lecture.description || "",
          folder: lecture.folder || "",
        });

        const responseSubjects = await getSubjects();
        const rawSubjects = Array.isArray(responseSubjects?.data)
          ? responseSubjects.data
          : Array.isArray(responseSubjects)
          ? responseSubjects
          : [];

        const sortedSubjects = rawSubjects
          .slice()
          .sort((a, b) => getDocCreatedAt(b) - getDocCreatedAt(a));

        const subjectsData = sortedSubjects.map((item) => ({
          label: item.subjectName,
          id: item._id,
          checked:
            Array.isArray(lecture.subjectRef) &&
            lecture.subjectRef.some((ref) =>
              typeof ref === "object" ? ref === item._id || ref._id === item._id : ref === item._id
            ),
        }));

        setSubjectCheckboxes(subjectsData);

        const orderedSelectedSubjects = Array.isArray(lecture.subjectRef)
          ? lecture.subjectRef
              .map((subjectId) =>
                subjectsData.find((s) =>
                  s.id === (typeof subjectId === "object" ? subjectId._id : subjectId)
                ) || null
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

  // When user selects a local file create object URL and revoke old one
  useEffect(() => {
    let prevBlob = null;
    if (videoFile) {
      const blobUrl = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(blobUrl);
      prevBlob = blobUrl;
    }

    return () => {
      if (prevBlob) {
        try {
          URL.revokeObjectURL(prevBlob);
        } catch {}
      }
    };
  }, [videoFile]);

  // Clean up if component unmounts and preview is a blob
  useEffect(() => {
    return () => {
      if (videoPreviewUrl && videoPreviewUrl.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(videoPreviewUrl);
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoUploadClick = () => videoInputRef.current?.click();

  const handleCheckboxChange = (originalIndex) => {
    const updatedCheckboxes = [...subjectCheckboxes];
    if (originalIndex < 0 || originalIndex >= updatedCheckboxes.length) return;
    updatedCheckboxes[originalIndex].checked = !updatedCheckboxes[originalIndex].checked;
    setSubjectCheckboxes(updatedCheckboxes);

    const subjectToUpdate = updatedCheckboxes[originalIndex];
    const newSelectedSubjects = [...selectedSubjects];

    if (subjectToUpdate.checked) {
      if (!newSelectedSubjects.some((s) => s.id === subjectToUpdate.id)) {
        newSelectedSubjects.push(subjectToUpdate);
      }
    } else {
      const removeIndex = newSelectedSubjects.findIndex(
        (s) => s.id === subjectToUpdate.id
      );
      if (removeIndex !== -1) newSelectedSubjects.splice(removeIndex, 1);
    }

    setSelectedSubjects(newSelectedSubjects);
  };

  const moveSubjectUp = (index) => {
    if (index <= 0) return;
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index - 1], newSelectedSubjects[index]] = [
      newSelectedSubjects[index],
      newSelectedSubjects[index - 1],
    ];
    setSelectedSubjects(newSelectedSubjects);
  };

  const moveSubjectDown = (index) => {
    if (index >= selectedSubjects.length - 1) return;
    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index + 1]] = [
      newSelectedSubjects[index + 1],
      newSelectedSubjects[index],
    ];
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleVideoChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      // revoke previous blob if it was a blob URL created earlier
      if (videoPreviewUrl && videoPreviewUrl.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(videoPreviewUrl);
        } catch {}
      }
      setVideoFile(file);
      // setVideoPreviewUrl will be handled by effect above
    }
  };

  const resolveVideoSrc = () => {
    if (!videoPreviewUrl) return "";
    // blob URLs
    if (videoPreviewUrl.startsWith("blob:")) return videoPreviewUrl;
    // absolute URLs
    if (/^https?:\/\//.test(videoPreviewUrl)) return videoPreviewUrl;
    // fallback to VITE endpoint if available (fileKey style)
    const base = (import.meta && import.meta.env && import.meta.env.VITE_APP_IMAGE_ACCESS) || "";
    return base ? `${base}/api/project/resource?fileKey=${videoPreviewUrl}` : videoPreviewUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ignoreSubmitRef.current) {
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
      let subjectIds = [];
      if (selectedSubjects.length > 0) {
        subjectIds = selectedSubjects.map((s) => s.id);
        // optionally rearrange on server
        await rearrangeSubjects(subjectIds);
      }

      const payload = {
        lectureName,
        description,
        subjectRef: subjectIds,
      };

      // If user selected a new local video file, send it as payload.videoUrl (your API expects file)
      if (videoFile) {
        payload.videoUrl = videoFile;
      }

      const response = await updateLectureById(id, payload);
      if (response?.success) {
        toast.success("Lecture updated successfully!");
      } else {
        throw new Error(response?.message || "Failed to update lecture");
      }
    } catch (error) {
      toast.error("Failed to update lecture");
    } finally {
      setUpdating(false);
    }
  };

  const configDis = useMemo(
    () => ({
      readonly: false,
      placeholder: formData.description,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                onBlur={(newContent) => setFormData({ ...formData, description: newContent })}
              />
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
                            handleCheckboxChange(subjectCheckboxes.findIndex((s) => s.id === item.id))
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
                <CheckboxSectionTitle>Selected Subjects</CheckboxSectionTitle>
                {selectedSubjects.length > 0 ? (
                  selectedSubjects.map((subject, index) => (
                    <SelectedSubjectItem key={subject.id}>
                      <SubjectName>{subject.label}</SubjectName>
                      {/* optional move buttons */}
                      <div>
                        <button type="button" onClick={() => moveSubjectUp(index)} disabled={index === 0}>
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSubjectDown(index)}
                          disabled={index === selectedSubjects.length - 1}
                        >
                          ↓
                        </button>
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

              <UploadArea
                role="button"
                tabIndex={0}
                onClickCapture={() => {
                  // mark that the last click originated inside the upload area (used to avoid accidental submit)
                  ignoreSubmitRef.current = true;
                  // clear shortly after
                  setTimeout(() => {
                    if (ignoreSubmitRef.current) ignoreSubmitRef.current = false;
                  }, 100);
                }}
                onClick={(e) => {
                  // Only open file picker if user clicked the UploadArea itself (not an inner control)
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
                      src={resolveVideoSrc()}
                      movingText={formData.lectureName}
                      onClick={() => {}}
                      onEnded={() => {}}
                    />
                  </VideoWrapper>
                ) : (
                  <UploadPlaceholder>
                    <img src={upload} alt="Upload" />
                    <p>Click to upload new video</p>
                    <p>
                      <strong>or Browse Files</strong>
                    </p>
                  </UploadPlaceholder>
                )}

                {/* Download button for previewed video */}
                {videoPreviewUrl && (
                  <a
                    href={resolveVideoSrc()}
                    download={
                      // For blob urls we can't determine original filename reliably; use lectureName fallback
                      videoFile?.name || `${formData.lectureName || "video"}.mp4`
                    }
                    style={{
                      marginTop: "12px",
                      padding: "8px 12px",
                      background: "#fdfdfd",
                      display: "none",
                      color: "white",
                      borderRadius: 6,
                      textDecoration: "none",
                      fontSize: 14,
                      // display: "inline-block",
                    }}
                  >
                    {/* Download Video */}
                  </a>
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
                {updating ? "Updating..." : "Update Lecture"}
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
