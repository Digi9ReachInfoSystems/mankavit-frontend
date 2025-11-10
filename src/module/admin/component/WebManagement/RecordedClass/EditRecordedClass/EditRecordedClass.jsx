import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Container,
  FormRow,
  FormColumn,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  UploadBox,
  UploadInput,
  UploadContent,
  UploadIcon,
  UploadText,
  UploadButton,
  CoursesContainer,
  CoursesHeader,
  CourseList,
  CourseItem,
  CourseLabel,
  CourseCheckbox,
  SubmitButton,
  VideoPreview,
  FileNameShort,
  VideoContainer,
  PreviewControls,
  VideoPlayer
} from "./EditRecordedClass.styles";
import upload from "../../../../../../assets/upload.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { uploadFileToAzureStorage } from "../../../../../../utils/azureStorageService";
import { updateRecordedClassById, getRecordedClassById } from "../../../../../../api/recordedAPi";
import { getAllCourses } from "../../../../../../api/courseApi";
import { toast, ToastContainer } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { getAuth } from "../../../../../../utils/authService";

const EditRecordedClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingData = location.state?.row;
  const { id } = useParams(); // Get ID from URL if needed

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [coursesList, setCoursesList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const [existingVideoUrl, setExistingVideoUrl] = useState('');
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
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
  // Helper to normalize course IDs (handles both string and object IDs)
  const normalizeCourseId = (ref) => {
    if (!ref) return null;
    // Handle MongoDB ObjectId format
    if (typeof ref === "object" && ref.$oid) return ref.$oid;
    // Handle populated course reference
    if (typeof ref === "object" && ref._id) return ref._id;
    // Handle string IDs
    return ref.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If we don't have editingData in location state, fetch it
        const dataToEdit = editingData || (id ? (await getRecordedClassById(id)).data : null);
        // // console.log("dataToEdit", dataToEdit);
        if (dataToEdit) {
          setTitle(dataToEdit.title);
          setDescription(dataToEdit.description);
          setDuration(dataToEdit.duration || "");
          setExistingVideoUrl(dataToEdit.videoUrl);
          // Normalize and set the course reference
          // const courseId = normalizeCourseId(dataToEdit.course_ref);
          // // // console.log("courseIdasa",new Set(dataToEdit.course_ref));
          // if (courseId) {
          //   setSelectedCourses(new Set([courseId]));
          // }
          //   setSelectedCourses(new Set(dataToEdit.course_ref));
        }
        // Initialize selected courses
        if (dataToEdit.course_ref) {
          // Handle both single course (string/object) and array of courses
          const courses = Array.isArray(dataToEdit.course_ref)
            ? dataToEdit.course_ref
            : [dataToEdit.course_ref];

          const normalizedIds = courses
            .map(normalizeCourseId)
            .filter(id => id !== null);

          setSelectedCourses(new Set(normalizedIds));
        }



        // Fetch all courses
        const res = await getAllCourses();
        setCoursesList(res.data || []);
      } catch (err) {
        // // console.error("Error fetching data", err);
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [editingData, id]);

  useEffect(() => {
    // Create preview URL when file is selected
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);

      // Clean up the object URL when component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setVideoPreviewUrl(existingVideoUrl);
    }
  }, [file, existingVideoUrl]);
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  const handleFile = (f) => {
    if (f) {
      if (!f.type.startsWith("video/")) {
        setError("Please upload a valid video file.");
        return;
      }
      const maxSize = 100 * 1024 * 1024;
      if (f.size > maxSize) {
        setError("Video file too large (max 100MB).");
        return;
      }
      setFile(f);
      setError("");
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const toggleCourse = (id) => {
    setSelectedCourses((prev) => {
      const next = new Set(prev);
      const normalizedId = normalizeCourseId(id);
      if (next.has(normalizedId)) {
        next.delete(normalizedId);
      } else {
        // next.clear(); // Clear all first since only one is allowed
        next.add(normalizedId);
      }
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !description || !duration || selectedCourses.size === 0) {
      setError("Please fill all fields and select a course.");
      return;
    }
    if (!file && !existingVideoUrl) {
      setError("Please upload a video or keep the existing one");
      return;
    }
    setLoading(true);
    setError("");

    try {
      let videoUrl = editingData?.videoUrl || (id ? (await getRecordedClassById(id)).data.videoUrl : "");

      // Upload new video if changed
      if (file) {
        const uploadRes = await uploadFileToAzureStorage(file, "recorded-class");
        if (!uploadRes?.blobUrl) {
          setError(uploadRes?.message || "Video upload failed");
          return;
        }
        videoUrl = uploadRes.blobUrl;
      }

      const payload = {
        title,
        description,
        duration,
        videoUrl,
        course_ref: Array.from(selectedCourses),  // Send the first (only) selected course
      };
      // // console.log("pay;load", payload);

      const updateRes = await updateRecordedClassById(editingData?._id || id, payload);

      if (updateRes) {
        toast.success("Recorded class updated successfully!", {
          duration: 3000,
          onClose: () => navigate("/admin/recorded-class")
        });
        // navigate(-1); // go back
      } else {
        setError(updateRes?.message || "Update failed.");
      }
    } catch (err) {
      // // console.error("Error updating recorded class", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const getFilenameFromUrl = (url) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.split('/').pop() || 'Uploaded video';
    } catch {
      return 'Uploaded video';
    }
  }
  const getShortName = (url, maxLength = 20) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      const fullName = urlObj.pathname.split('/').pop() || 'Uploaded video';
      return fullName.length > maxLength
        ? `${fullName.substring(0, maxLength)}...`
        : fullName;
    } catch {
      return 'Uploaded video';
    }
  };
  const configDis = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: description,
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
      <h2>Edit Recorded Class</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            placeholder="Write here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>

          <Label htmlFor="description"> Description</Label>
          <JoditEditor
            ref={editor}
            value={description}
            config={configDis}
            tabIndex={1}
            // onBlur={newContent => { // console.log("new", newContent);
            //    }}
            onBlur={newContent => { setDescription(newContent); }}
          />


        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={4}
            placeholder="Write here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup> */}

        <FormGroup>
          <Label htmlFor="duration">Duration</Label>
          <TextInput
            id="duration"
            placeholder="e.g. 2 hours"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormGroup>

        <FormRow>
          <FormColumn>
            <Label>Upload Class Video</Label>
            <UploadBox
              dragOver={dragOver}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current.click()}
            >
              <UploadInput
                ref={fileRef}
                type="file"
                accept="video/*"
                onChange={onFileChange}
              />
              <UploadContent>
                <UploadIcon>
                  <img src={upload} alt="upload" />
                  {/* {existingVideoUrl && !file && (
                    <VideoContainer>
                      <VideoPreview
                        ref={videoRef}
                        src={existingVideoUrl}
                        controls={false}
                      />
                      <PreviewControls>
                        <button onClick={togglePlayPause}>
                          {isPlaying ? 'Pause' : 'Play'} Preview
                        </button>
                        <FileNameShort>
                          {getShortName(existingVideoUrl)}
                        </FileNameShort>
                      </PreviewControls>
                    </VideoContainer>
                  )}

                  {file && (
                    <div style={{ marginTop: '10px' }}>
                      <FileNameShort>{getShortName(file.name)}</FileNameShort>
                    </div>
                  )} */}
                  {videoPreviewUrl && (
                    <VideoContainer>
                      <VideoPlayer
                        ref={videoRef}
                        src={videoPreviewUrl}
                        controls
                      />
                      <PreviewControls>
                        <FileNameShort>
                          {file ? file.name : getShortName(existingVideoUrl)}
                        </FileNameShort>
                      </PreviewControls>
                    </VideoContainer>
                  )}
                </UploadIcon>
                <UploadText>
                  {file ? file.name : existingVideoUrl ? getShortName(existingVideoUrl) : "Drag and drop video here"}
                </UploadText>
                {!file && <UploadButton>Replace Video</UploadButton>}

              </UploadContent>
            </UploadBox>
          </FormColumn>

          <FormColumn>
            <CoursesContainer>
              <CoursesHeader>Select Course</CoursesHeader>
              <CourseList>
                {coursesList.map((course) => {
                  const courseId = normalizeCourseId(course._id);
                  return (
                    <CourseItem key={courseId}>
                      <CourseCheckbox
                        type="checkbox"
                        checked={selectedCourses.has(courseId)}
                        onChange={() => toggleCourse(courseId)}
                      />
                      <CourseLabel>{course.courseName}</CourseLabel>
                    </CourseItem>
                  );
                })}
              </CourseList>
            </CoursesContainer>
          </FormColumn>
        </FormRow>
        {
          !readOnlyPermissions && (
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Recorded Class"}
            </SubmitButton>
          )
        }


      </form>
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
};

export default EditRecordedClass;