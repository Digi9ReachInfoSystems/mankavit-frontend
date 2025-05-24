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
  UploadArea,
  FileInput,
  UploadPlaceholder,
  SubmitButton,
  VideoContainer,
  VideoPlayer,
  ThumbnailPreview,
} from "../AddLecturer/AddLecturer.styles";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getLectureById, updateLectureById } from "../../../../../api/lecturesApi";

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

  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);

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

        setCurrentThumbnail(lecture.thumbnail);
        setCurrentVideo(lecture.videoUrl);
        setPreviewUrl(lecture.thumbnail);
        setVideoPreviewUrl(lecture.videoUrl);
      } catch (error) {
        console.error("Failed to fetch lecture:", error);
        toast.error("Failed to load lecture data");
      }
    };

    if (id) fetchLecture();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailUploadClick = () => thumbnailInputRef.current.click();
  const handleVideoUploadClick = () => videoInputRef.current.click();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Create a JSON payload instead of FormData
      const payload = {
        lectureName,
        duration,
        description,
        // Note: If your API accepts file URLs directly, you'll need to handle file uploads separately
        // thumbnail: thumbnailFile ? await uploadFile(thumbnailFile) : currentThumbnail,
        // videoUrl: videoFile ? await uploadFile(videoFile) : currentVideo
      };

      const response = await updateLectureById(id, payload);
      console.log("Update response:", response);

      if (response.success) {
        toast.success("Lecture updated successfully!");
        navigate(-1);
      } else {
        throw new Error(response.message || "Failed to update lecture");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.message || "Error updating lecture");
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>Edit Lecture</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* Basic Fields */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="lectureName">Lecture Name*</Label>
              <Input
                id="lectureName"
                name="lectureName"
                value={formData.lectureName}
                onChange={handleInputChange}
                placeholder="Enter Lecture Name"
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
                onChange={handleInputChange}
                placeholder="e.g. 20"
                required
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label htmlFor="description">Description*</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter detailed description"
                required
              />
            </FieldWrapper>
          </Column>
        </FormRow>

        {/* Thumbnail */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Current Thumbnail</Label>
              {currentThumbnail ? (
                <ThumbnailPreview>
                  <img src={currentThumbnail} alt="Current Thumbnail" />
                </ThumbnailPreview>
              ) : (
                <p>No thumbnail available</p>
              )}
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Update Thumbnail</Label>
              <UploadArea onClick={handleThumbnailUploadClick}>
                {previewUrl && previewUrl !== currentThumbnail ? (
                  <img src={previewUrl} alt="New Thumbnail" />
                ) : (
                  <>
                    <UploadPlaceholder>
                      <img src={upload} alt="Upload" />
                    </UploadPlaceholder>
                    <p>Click to upload new thumbnail</p>
                    <p><strong>or Browse Files</strong></p>
                  </>
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

        {/* Video */}
        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Current Video</Label>
              {currentVideo ? (
                <VideoContainer>
                  <VideoPlayer controls>
                    <source src={currentVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </VideoPlayer>
                </VideoContainer>
              ) : (
                <p>No video available</p>
              )}
            </FieldWrapper>
          </Column>
        </FormRow>

        <FormRow>
          <Column>
            <FieldWrapper>
              <Label>Update Video</Label>
              <UploadArea onClick={handleVideoUploadClick}>
                {videoFile ? (
                  <p>{videoFile.name}</p>
                ) : (
                  <>
                    <UploadPlaceholder>
                      <img src={upload} alt="Upload" />
                    </UploadPlaceholder>
                    <p>Click to upload new video</p>
                    <p><strong>or Browse Files</strong></p>
                  </>
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

        {/* Submit */}
        <FormRow>
          <Column>
            <SubmitButton type="submit">Update Lecture</SubmitButton>
          </Column>
        </FormRow>
      </FormWrapper>
    </Container>
  );
}