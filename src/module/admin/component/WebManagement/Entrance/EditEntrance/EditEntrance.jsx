// src/modules/admin/components/EditEntrance/EditEntrance.jsx
import React, { useEffect, useState, useRef, useMemo  } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  TextArea,
  SubmitButton,
  ErrorText,
  EditorWrapper
} from '../EditEntrance/EditEntrance.style';
import { getEntranceById, updateEntrance } from '../../../../../../api/entranceApi';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';
import JoditEditor from 'jodit-react';

const EditEntrance = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
    const editor = useRef(null);
    const handleEditorChange = (newContent) => {
    setDescription(newContent);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: '' }));
    }
  };
  
    const config = useMemo(() => ({
      readonly: false,
      placeholder: 'Enter entrance description here...',
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
      },
      height: 300
    }), []);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"]?.readOnly || false);
        if (response.Permissions["webManagement"]?.readOnly) {
          toast.error('You do not have permission to edit entrances.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              navigate('/admin/web-management/entrance');
            }
          });
        }
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchEntrance = async () => {
      if (!id) return;
      
      setFetching(true);
      try {
        const entranceData = await getEntranceById(id);
        setTitle(entranceData.title || '');
        setDescription(entranceData.description || '');
      } catch (err) {
        console.error('Error fetching entrance:', err);
        toast.error('Failed to load entrance data.');
        navigate('/admin/web-management/entrance');
      } finally {
        setFetching(false);
      }
    };

    fetchEntrance();
  }, [id]);

  const validate = () => {
    const errs = { title: '', description: '' };
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return !errs.title && !errs.description;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await updateEntrance(id, { title, description });
      toast.success('Entrance updated successfully!');
      setTimeout(() => navigate('/admin/web-management/entrance'), 1000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update entrance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container>
        <p>Loading entrance data...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Edit Entrance</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={e => {
              const filtered = e.target.value.replace(/[^a-zA-Z0-9\s\-_,.]/g, '');
              setTitle(filtered);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: '' }));
              }
            }}
            disabled={readOnlyPermissions}
          />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <EditorWrapper>
            <JoditEditor
              ref={editor}
              value={description}
              config={config}
              onBlur={handleEditorChange}
              onChange={handleEditorChange}
            />
          </EditorWrapper>
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </FormGroup>
        
        {!readOnlyPermissions && (
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Updating…' : 'Update Entrance'}
          </SubmitButton>
        )}
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </Container>
  );
};

export default EditEntrance;