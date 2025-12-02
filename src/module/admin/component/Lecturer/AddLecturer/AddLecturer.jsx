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
  SearchWrapper,
  SearchIcon,
  SearchInput,
  VideoWrapper
} from "./AddLecturer.styles";
import VideoPlayerCustom from "../../../../../component/VideoPlayerCustom/VideoPlayerCustom";
import { useNavigate } from "react-router-dom";
import { createLecture, getFolders } from "../../../../../api/lecturesApi";
import { getAllCourses } from "../../../../../api/courseApi";
import { getSubjects, rearrangeSubjects } from "../../../../../api/subjectApi";
import {
  uploadFileToAzureStorage,
  uploadVideoToAzureStorage,
} from "../../../../../utils/azureStorageService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { sub } from "date-fns";
import { CiSearch } from "react-icons/ci";

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
  const [subjectsCheckboxes, setSubjectsCheckboxes] = useState([]);

  const [searchSubject, setSearchSubject] = useState("");
  const navigate = useNavigate();
  const editor = useRef(null);
  const [folders, setFolders] = useState([]); // folder options from API
  const [selectedFolder, setSelectedFolder] = useState("");
  const [customFolder, setCustomFolder] = useState("");

  // 🔎 FIXED: filter from subjectCheckboxes (not subjectsCheckboxes)
  const filteredSubjects = useMemo(
    () =>
      subjectCheckboxes.filter((subject) =>
        subject.label.toLowerCase().includes(searchSubject.toLowerCase())
      ),
    [subjectCheckboxes, searchSubject]
  );

  // helper: get created time from doc (prefer createdAt, fallback to ObjectId timestamp)
  const getDocCreatedAt = (doc) => {
    if (!doc) return new Date(0);

    if (doc.createdAt) {
      try {
        return new Date(doc.createdAt);
      } catch {
        // fallthrough to fallback
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

  // stable object URL for preview and cleanup
  const videoPreviewUrl = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : null;
  }, [videoFile]);

  useEffect(() => {
    // revoke when component unmounts or when preview URL changes
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [subjectsResponse, coursesResponse, foldersResponse] =
          await Promise.all([getSubjects(), getAllCourses(), getFolders()]);

        // normalize arrays safely
        const subjectsRaw = Array.isArray(subjectsResponse?.data)
          ? subjectsResponse.data
          : Array.isArray(subjectsResponse)
          ? subjectsResponse
          : [];

        const coursesRaw = Array.isArray(coursesResponse?.data)
          ? coursesResponse.data
          : Array.isArray(coursesResponse)
          ? coursesResponse
          : [];

        // sort newest-first for subjects and courses
        const sortedSubjects = subjectsRaw.sort(
          (a, b) => getDocCreatedAt(b) - getDocCreatedAt(a)
        );
        const sortedCourses = coursesRaw.sort(
          (a, b) => getDocCreatedAt(b) - getDocCreatedAt(a)
        );

        setSubjects(sortedSubjects || []);
        setCourses(sortedCourses || []);
        setFolders(
          (foldersResponse || []).map((folder) =>
            folder.endsWith("/") ? folder.slice(0, -1) : folder
          )
        );
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [subjectsResponse, coursesResponse] = await Promise.all([
          getSubjects(),
          getAllCourses(),
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
    const selected = updatedCheckboxes.filter((item) => item.checked);
    setSelectedSubjects(selected);
  };

  const moveSubjectUp = (index) => {
    if (index <= 0) return;

    const newSelectedSubjects = [...selectedSubjects];
    [newSelectedSubjects[index], newSelectedSubjects[index - 1]] = [
      newSelectedSubjects[index - 1],
      newSelectedSubjects[index],
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

  const getFileUrl = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!lectureName || !description || !videoFile) {
        toast.error("Please fill all required fields!");
        return;
      }
      const folderName =
        selectedFolder === "other" ? customFolder : selectedFolder;

      const videoResponse = await uploadVideoToAzureStorage(
        videoFile,
        folderName
      );
      console.log("Video Response:", videoResponse);
      if (!videoResponse?.blobUrl) {
        throw new Error("Video upload failed");
      }
      handleSubmit(videoResponse);
    } catch (error) {
      toast.error("Failed to upload video");
      console.error("Error uploading video:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureName || !description || !videoFile) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setIsLoading(true);
      const folderName =
        selectedFolder === "other" ? customFolder : selectedFolder;

      const subjectIds = selectedSubjects.map((subject) => subject.id);
      const submissionData = {
        lectureName,
        description,
        videoUrl: videoFile,
        subjectRef: subjectIds,
        folder: folderName,
      };

      const response = await createLecture(submissionData);

      toast.success("Lecture created successfully");
      setTimeout(() => {
        navigate("/admin/lecturer-management");
      }, 1000);

      // Reset form
      setLectureName("");
      setDuration("");
      setDescription("");
      setVideoFile(null);
      setSubjectCheckboxes(
        subjectCheckboxes.map((item) => ({ ...item, checked: false }))
      );
      setSelectedSubjects([]);
    } catch (error) {
      toast.error("Failed to create lecture");
      console.error("Error creating lecture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: description,
    }),
    []
  );

  return (
    <Container>
      <Title>Add Video</Title>
      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Video title *</Label>
              <Input
                id="lectureName"
                value={lectureName}
                onChange={(e) => {
                  const filteredData = e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                  );
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
                // onBlur={(newContent) => {}}
                onBlur={(newContent) => {
                  setDescription(newContent);
                }}
              />
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="folderSelect">Select Folder *</Label>
              <select
                id="folderSelect"
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">-- Select a Folder --</option>
                {folders.map((folder, index) => (
                  <option key={index} value={folder}>
                    {folder}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>

              {selectedFolder === "other" && (
                <Input
                  type="text"
                  placeholder="Enter folder name"
                  value={customFolder}
                  onChange={(e) => setCustomFolder(e.target.value)}
                  style={{ marginTop: "10px" }}
                />
              )}
            </FieldWrapper>
          </Column>
        </FormRow>
        <FormRow>
          <Column>
            <SubjectsContainer>
              <CheckboxSection>
                <CheckboxSectionTitle>Available Subjects</CheckboxSectionTitle>

                <SearchWrapper style={{ marginBottom: "15px" }}>
                  <SearchIcon>
                    <CiSearch size={18} />
                  </SearchIcon>
                  <SearchInput
                    placeholder="Search subjects..."
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                  />
                </SearchWrapper>

                {/* 🔎 Use filtered subjects here */}
                <CheckboxList>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((item) => (
                      <CheckboxLabel key={item.id}>
                        <CheckboxInput
                          type="checkbox"
                          checked={item.checked}
                          onChange={() =>
                            handleCheckboxChange(
                              // map back to the original index
                              subjectCheckboxes.findIndex(
                                (subj) => subj.id === item.id
                              )
                            )
                          }
                        />
                        {item.label}
                      </CheckboxLabel>
                    ))
                  ) : (
                    <p style={{ padding: "8px", color: "#666" }}>
                      No subjects found
                    </p>
                  )}
                </CheckboxList>
              </CheckboxSection>

              <SelectedSubjectsContainer>
                <CheckboxSectionTitle>Selected Subjects </CheckboxSectionTitle>
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
          <Column style={{ flex: 1 }}>
            <FieldWrapper>
              <Label>Upload Video *</Label>
              <UploadArea
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  // Only open file picker if user clicked directly on the UploadArea container,
                  // not when clicking any child (like the VideoPlayerCustom controls).
                  if (e.target === e.currentTarget) {
                    videoInputRef.current?.click();
                  }
                }}
                onKeyDown={(e) => {
                  // Allow keyboard activation (Enter or Space) when UploadArea is focused
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    videoInputRef.current?.click();
                  }
                }}
              >
                {videoFile ? (
                  <>
                    <VideoWrapper>
                      <VideoPlayerCustom
                        src={videoPreviewUrl}
                        movingText={lectureName}
                        // optional callbacks
                        onClick={() => {}}
                        onEnded={() => {}}
                      />
                    </VideoWrapper>
                    <p style={{ marginTop: 8, wordBreak: "break-word" }}>
                      {videoFile.name}
                    </p>
                  </>
                ) : (
                  <>
                    <UploadPlaceholder>
                      <img src={upload} alt="Upload" />
                    </UploadPlaceholder>
                    <p>Drag and drop video here</p>
                    <p>
                      or <strong>Upload Video</strong>
                    </p>
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
          <SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
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
        theme="colored"
      />
    </Container>
  );
}
