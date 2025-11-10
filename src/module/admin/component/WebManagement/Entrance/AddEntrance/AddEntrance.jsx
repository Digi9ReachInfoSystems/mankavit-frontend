// src/modules/admin/components/AddEntrance/AddEntrance.jsx
import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  SubmitButton,
  ErrorText,
  EditorWrapper
} from './Addentrance.style';
import { createEntrnace } from '../../../../../../api/entranceApi';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from '../../../../../../utils/authService';
import JoditEditor from 'jodit-react';

const AddEntrance = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const editor = useRef(null);

  const handleEditorChange = (newContent) => {
    setDescription(newContent);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: '' }));
    }
  };

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"]?.readOnly || false);
        if (response.Permissions["webManagement"]?.readOnly) {
          toast.error('You do not have permission to add entrances.', {
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
    }
    apiCaller();
  }, []);

  const validate = () => {
    const errs = { title: '', description: '' };
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return !errs.title && !errs.description;
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const newEntrance = await createEntrnace({ title, description });
      setTitle('');
      setDescription('');
      setErrors({ title: '', description: '' });

      if (onAdd) onAdd(newEntrance);
      toast.success('Entrance added successfully!');
      setTimeout(() => navigate('/admin/web-management/entrance'), 1000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add entrance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Add New Entrance</h2>
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
              // onChange={handleEditorChange}
            />
          </EditorWrapper>
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </FormGroup>
        
        {!readOnlyPermissions && (
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Adding…' : 'Add New Entrance'}
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

export default AddEntrance;