import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from './AddWhyStudyWithUs.styles';
import uploadIcon from '../../../../../../assets/upload.png';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';
import { createWhy } from '../../../../../../api/whyApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';

const AddWhyStudyWithUs = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Enter description here...',
    // buttons: [
    //   'bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'
    // ],
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }), []);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"]?.readOnly || false);
        if (response.Permissions["webManagement"]?.readOnly) {
          toast.error('You do not have permission to add why study with us.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              navigate('/admin/');
            }
          });
        }
      }
    };
    apiCaller();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (newContent) => {
    setFormData((prev) => ({ ...prev, description: newContent }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please upload a valid image file.');
      toast.warn('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      toast.warn('Image size should be less than 5MB.');
      return;
    }

    setError('');
    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      const msg = 'Title and Description are required.';
      setError(msg);
      toast.warn(msg);
      return;
    }
    if (!formData.image) {
      const msg = 'Please select an image.';
      setError(msg);
      toast.warn(msg);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const uploadResult = await uploadFileToAzureStorage(
        formData.image,
        'why'
      );

      const imageUrl =
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

      await createWhy({
        title: formData.title,
        description: formData.description,
        image: imageUrl
      });

      toast.success('Data created successfully!');
      setTimeout(() => {
        navigate('/admin/web-management/why-study-with-us');
      }, 1500);
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to create data, please try again.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Add Why Study With Us</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Why Study With Us Title *</Label>
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

      <Label>Why Study With Us Description *</Label>
      <EditorWrapper>
        <JoditEditor
          ref={editor}
          value={formData.description}
          config={config}
          onBlur={handleEditorChange}
          onChange={handleEditorChange}
        />
      </EditorWrapper>

      <Label>Upload Image *</Label>
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
            <PreviewImage src={previewUrl} alt="Preview" />
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
          {loading ? 'Creating…' : 'Create'}
        </UploadButton>
      )}

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
    </Container>
  );
};

export default AddWhyStudyWithUs;