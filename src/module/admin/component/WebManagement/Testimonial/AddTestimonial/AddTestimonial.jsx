import React, { useEffect, useState, useRef, useMemo } from 'react';
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
  FormRow,
  Column,
  RadioGroup,
  RadioLabel,
  RadioInput,
  EditorWrapper
} from './AddTestimonial.styles';
import uploadIcon from '../../../../../../assets/upload.png';
import { createTestimonials } from '../../../../../../api/testimonialApi';
import { getAllCourses } from '../../../../../../api/courseApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rank: '',
    course: '',
    testimonialDetails: '',
  });
  const [mediaType, setMediaType] = useState('image');
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);
  const navigate = useNavigate();
  const editor = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllCourses();
        setCoursesCheckboxes(
          res.data.map(item => ({
            label: item.courseName,
            id: item._id,
            checked: false
          }))
        );
      } catch (err) {
        toast.error('Failed to fetch courses');
      }
    })();
  }, []);

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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(f => ({ ...f, testimonialDetails: newContent }));
  };

  const handleCheckboxChange = idx => {
    const updated = coursesCheckboxes.map((c, i) => ({
      ...c,
      checked: i === idx ? !c.checked : false
    }));
    setCoursesCheckboxes(updated);
    const sel = updated.find(c => c.checked);
    setFormData(f => ({ ...f, course: sel ? sel.id : '' }));
  };

  const handleMediaChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (mediaType === 'image' && !file.type.match('image.*')) {
      return setError('Please upload an image file');
    }
    if (mediaType === 'video' && !file.type.match('video.*')) {
      return setError('Please upload a video file');
    }
    if (file.size > 50 * 1024 * 1024) {
      return setError(`${mediaType} size too large`);
    }
    
    setError('');
    setMediaFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      !formData.studentName ||
      !formData.rank ||
      !formData.testimonialDetails ||
      !mediaFile
    ) {
      setError('Fill all fields and select/media file');
      return toast.error('Please complete all fields');
    }

    try {
      setIsUploading(true);
      const { blobUrl, message } = await uploadFileToAzureStorage(
        mediaFile,
        mediaType === 'image' ? 'upload' : 'upload'
      );
      if (!blobUrl) throw new Error(message || 'Upload failed');

      const payload = {
        name: formData.studentName,
        rank: formData.rank,
        description: formData.testimonialDetails,
        ...(mediaType === 'image'
          ? { testimonial_image: blobUrl }
          : { testimonial_video: blobUrl })
      };

      await createTestimonials(payload);
      toast.success('Testimonial added');
      setTimeout(() => navigate('/admin/web-management/testinomial', { state: { success: true } }), 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error adding testimonial');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container>
      <Title>Add Testimonial</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Student Name *</Label>
      <Input
        name="studentName"
        value={formData.studentName}
        onChange={handleInputChange}
        placeholder="Enter name"
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

      <FormRow>
        <Column>
          <Label>Rank *</Label>
          <Input
            name="rank"
            value={formData.rank}
            onChange={handleInputChange}
            placeholder="Enter rank"
          />
        </Column>
      </FormRow>

      <Label>Media Type *</Label>
      <RadioGroup>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="mediaType"
            value="image"
            checked={mediaType === 'image'}
            onChange={() => {
              setMediaType('image');
              setMediaFile(null);
              setPreviewUrl('');
            }}
          />
          Image
        </RadioLabel>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="mediaType"
            value="video"
            checked={mediaType === 'video'}
            onChange={() => {
              setMediaType('video');
              setMediaFile(null);
              setPreviewUrl('');
            }}
          />
          Video
        </RadioLabel>
      </RadioGroup>

      <Label>Upload {mediaType === 'image' ? 'Image' : 'Video'} *</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept={mediaType + '/*'}
          style={{ display: 'none' }}
          id="file-input"
          onChange={handleMediaChange}
        />
        <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
          {previewUrl ? (
            mediaType === 'image' ? (
              <PreviewMedia as="img" src={previewUrl} alt="Preview" />
            ) : (
              <PreviewMedia as="video" src={previewUrl} controls />
            )
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="upload" width={50} height={50} />
              </ImageIcon>
              <DropZoneText>
                Drag & drop {mediaType}, or click to select
              </DropZoneText>
            </>
          )}
          <AddImageText>
            {mediaFile ? mediaFile.name : `Add ${mediaType}`}
          </AddImageText>
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Testimonial'}
      </UploadButton>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default AddTestimonial;