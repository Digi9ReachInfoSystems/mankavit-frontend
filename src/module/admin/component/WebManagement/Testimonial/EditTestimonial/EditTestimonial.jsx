import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Container,
  Title,
  Label,
  Input,
  DropZone,
  DropZoneText,
  ImageIcon,
  AddImageText,
  UploadButton,
  PreviewMedia,
  ErrorMessage,
  EditorWrapper
} from './EditTestimonial.style';
import uploadIcon from "../../../../../../assets/upload.png";
import { getTestimonialById, updateTestimonialById } from '../../../../../../api/testimonialApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const EditTestimonial = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    studentName: '',
    rank: '',
    testimonialDetails: '',
    imageFile: null,
    existingMediaUrl: '',
    mediaType: 'image'
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Enter testimonial details here...',
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|', 'font', 'fontsize', '|',
      'align', 'outdent', 'indent', '|', 'link', 'image'
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    style: {
      background: '#f5f5f5',
      color: '#333'
    }
  }), []);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const t = await getTestimonialById(id);
        setFormData({
          studentName: t.name,
          rank: t.rank,
          testimonialDetails: t.description,
          imageFile: null,
          existingMediaUrl: t.testimonial_image || t.testimonial_video || '',
          mediaType: t.testimonial_image ? 'image' : 'video'
        });
        setPreviewUrl(t.testimonial_image || t.testimonial_video || '');
      } catch (err) {
        // // console.error("Error loading testimonial:", err);
        toast.error("Failed to load testimonial");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(fd => ({ ...fd, testimonialDetails: newContent }));
  };

  const handleMediaChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (formData.mediaType === 'image' && !isImage) {
      return toast.error("Please select an image file");
    }
    if (formData.mediaType === 'video' && !isVideo) {
      return toast.error("Please select a video file");
    }
    if (file.size > 50 * 1024 * 1024) {
      return toast.warn("File too large (max 50 MB)");
    }

    setError('');
    setFormData(fd => ({ ...fd, imageFile: file }));
    const reader = new FileReader();
    // // console.log(reader);
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      !formData.studentName.trim() ||
      !formData.rank.trim() ||
      !formData.testimonialDetails.trim()
    ) {
      return toast.error("Name, rank and description are required");
    }

    try {
      setIsUploading(true);

      let mediaUrl = formData.existingMediaUrl;
      if (formData.imageFile) {
        const { blobUrl, message } = await uploadFileToAzureStorage(
          formData.imageFile,
          formData.mediaType === 'image' ? 'upload' : 'upload'
        );
        if (!blobUrl) throw new Error(message || "Upload failed");
        mediaUrl = blobUrl;
      }

      const payload = {
        name: formData.studentName,
        rank: formData.rank,
        description: formData.testimonialDetails,
        ...(formData.mediaType === 'image'
          ? { testimonial_image: mediaUrl }
          : { testimonial_video: mediaUrl })
      };

      await updateTestimonialById(id, payload);
      toast.success("Testimonial updated successfully");
      setTimeout(() => navigate("/admin/web-management/testinomial", { state: { success: true } }), 1000);
    } catch (err) {
      // console.error(err);
      toast.error(err.message || "Failed to update testimonial");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <Container>Loading…</Container>;
  }

  return (
    <Container>
      <Title>Edit Testimonial</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Student Name *</Label>
      <Input
        name="studentName"
        value={formData.studentName}
        onChange={handleInputChange}
        placeholder="Enter student name"
      />

      <Label>Rank *</Label>
      <Input
        name="rank"
        value={formData.rank}
        onChange={handleInputChange}
        placeholder="Enter rank/position"
      />

      <Label>Description *</Label>
      <EditorWrapper>
        <JoditEditor
          ref={editor}
          value={formData.testimonialDetails}
          config={config}
          onBlur={handleEditorChange}
          onChange={handleEditorChange}
        />
      </EditorWrapper>

      <Label>Media Type *</Label>
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            checked={formData.mediaType === 'image'}
            onChange={() => {
              setFormData(fd => ({
                ...fd,
                mediaType: 'image',
                existingMediaUrl: '',
                imageFile: null
              }));
              setPreviewUrl('');
            }}
          />{' '}
          Image
        </label>
        <label>
          <input
            type="radio"
            checked={formData.mediaType === 'video'}
            onChange={() => {
              setFormData(fd => ({
                ...fd,
                mediaType: 'video',
                existingMediaUrl: '',
                imageFile: null
              }));
              setPreviewUrl('');
            }}
          />{' '}
          Video
        </label>
      </div>

      <Label>
        {formData.mediaType === 'image' ? 'Student Image' : 'Testimonial Video'}{' '}
        {formData.existingMediaUrl && '(keep existing if you dont choose new)'}
      </Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept={formData.mediaType + "/*"}
          id="upload-media"
          style={{ display: 'none' }}
          onChange={handleMediaChange}
        />
        <label htmlFor="upload-media" style={{ cursor: 'pointer' }}>
          {previewUrl ? (
            formData.mediaType === 'image' ? (
              <PreviewMedia as="img" src={previewUrl.startsWith('data:') ? previewUrl : `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${previewUrl}`} alt="Preview" />
            ) : (
              <PreviewMedia as="video" src={previewUrl.startsWith('data:') ? previewUrl : `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${previewUrl}`} controls />
            )
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="upload" width="50" height="50" />
              </ImageIcon>
              <DropZoneText>
                Drag & drop {formData.mediaType}, or click to select
              </DropZoneText>
            </>
          )}
          <AddImageText>
            {formData.imageFile ? formData.imageFile.name : `Choose ${formData.mediaType}`}
          </AddImageText>
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? "Updating…" : "Update Testimonial"}
      </UploadButton>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default EditTestimonial;