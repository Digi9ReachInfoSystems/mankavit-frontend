import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import {
  Container,
  Title,
  Label,
  Input,
  DropZone,
  DropZoneText,
  ImageIcon,
  PreviewImage,
  UploadButton,
  ErrorMessage,
  EditorWrapper
} from './EditWhyOurCourse.styles';
import uploadIcon from '../../../../assets/upload.png';
// import { getWhyById, updateWhyById } from '../../../../../../api/whyApi';
import { uploadFileToAzureStorage } from '../../../../utils/azureStorageService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../utils/authService';
import { getWhyOurCourseById, updateWhyOurCourseById } from '../../../../api/whyOurCourseApi';

const EditWhyOurCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  const config = useMemo(() => ({
    readonly: false,
    // placeholder: 'Enter description here...',
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
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"]?.readOnly || false);
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchWhy = async () => {
      try {
        const resp = await getWhyOurCourseById(id);
        const doc = resp.data ?? resp;
        setFormData({
          title: doc.title || '',
          description: doc.description || '',
          imageFile: null,
        });
        setPreviewUrl(doc.image || '');
      } catch (err) {
        console.error('Error loading item:', err);
        setError('Failed to load the item.');
        toast.error('Failed to load the item.');
      }
    };

    fetchWhy();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({ ...prev, description: newContent }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      const msg = 'Please upload a valid image file.';
      setError(msg);
      toast.warning(msg);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      const msg = 'Image size should be less than 5MB.';
      setError(msg);
      toast.warning(msg);
      return;
    }

    setError('');
    setFormData(prev => ({ ...prev, imageFile: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      const msg = 'Title and Description are required.';
      setError(msg);
      toast.warning(msg);
      return;
    }

    setLoading(true);
    try {
      let imageUrl = previewUrl;

      if (formData.imageFile) {
        const uploadResult = await uploadFileToAzureStorage(
          formData.imageFile,
          'whyOurCourse'
        );

        imageUrl =
          uploadResult?.url ??
          uploadResult?.fileUrl ??
          uploadResult?.filePath ??
          uploadResult?.blobUrl ??
          (typeof uploadResult === 'string' ? uploadResult : null);

        if (!imageUrl) {
          throw new Error(
            `Unexpected upload response format: ${JSON.stringify(
              uploadResult
            )}`
          );
        }
      }

      await updateWhyOurCourseById(id, {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      });

      toast.success('Updated successfully!');
      setTimeout(() => navigate('/admin/web-management/why-our-course'), 1000);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong, please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Title>Edit Why Our Course</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setFormData((prev) => ({ ...prev, title: filteredData }));
        }}
        placeholder="Enter title"
        disabled={readOnlyPermissions}
      />

      <Label>Description *</Label>
      <EditorWrapper>
        <JoditEditor
          ref={editor}
          value={formData.description}
          config={config}
          onBlur={handleEditorChange}
          // onChange={handleEditorChange}
        />
      </EditorWrapper>

      <Label>Image *</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          disabled={readOnlyPermissions}
        />
        <label htmlFor="upload-image" style={{ cursor: readOnlyPermissions ? 'not-allowed' : 'pointer' }}>
          {previewUrl ? (
            <PreviewImage src={previewUrl.startsWith("data:")? previewUrl : `${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${previewUrl}`} alt="Preview" />
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="Upload" width={50} />
              </ImageIcon>
              <DropZoneText>
                Drag & drop image here, or click to select
              </DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      {!readOnlyPermissions && (
        <UploadButton onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating…' : 'Update'}
        </UploadButton>
      )}
    </Container>
  );
};

export default EditWhyOurCourse;