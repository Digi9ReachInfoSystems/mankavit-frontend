// src/modules/admin/components/WhyMankavit/WhyMankavit.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  Input,
  Textarea,
  Button,
  TableWrapper,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  ActionsWrapper,
} from './WhyMankavit.styles';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteModal from '../../../component/DeleteModal/DeleteModal';
import {
  createWhy,
  getAllWhy,
  updateWhyById,
  deleteWhyById
} from '../../../../../api/whyApi';

const WhyMankavit = () => {
  // full list
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  // form: if id !== '' we’re editing
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: ''
  });
  const [saving, setSaving] = useState(false);

  // delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // error message
  const [error, setError] = useState('');

  // fetch or refresh the list
  const fetchItems = async () => {
    setLoadingList(true);
    setError('');
    try {
      const data = await getAllWhy();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load items.');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // form field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  // create or update on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setSaving(true);
    setError('');
    try {
      if (formData.id) {
        // update existing
        await updateWhyById(formData.id, {
          title:   formData.title,
          description: formData.description
        });
      } else {
        // create new
        await creteWhy({
          title:   formData.title,
          description: formData.description
        });
      }
      // reset form and refresh list
      setFormData({ id: '', title: '', description: '' });
      await fetchItems();
    } catch (err) {
      console.error(err);
      setError('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // populate form for editing
  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      title: item.title,
      description: item.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // open delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  // perform delete
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setError('');
    try {
      await deleteWhyById(deleteId);
      await fetchItems();
    } catch (err) {
      console.error(err);
      setError('Delete failed. Please try again.');
    } finally {
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <Container>
      <Title>Why Mankavit</Title>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Write title here"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={8}
            placeholder="Write description here"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit" disabled={saving}>
          {saving
            ? 'Saving...'
            : formData.id
              ? 'Update Changes'
              : 'Add Entry'}
        </Button>
      </form>

      <TableWrapper>
        {loadingList ? (
          <p>Loading data…</p>
        ) : items.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {items.map(item => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <BiEditAlt
                        size={20}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(item)}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteClick(item._id)}
                      />
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No entries found.</p>
        )}
      </TableWrapper>

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteId(null);
        }}
        onDelete={handleConfirmDelete}
      />
    </Container>
  );
};

export default WhyMankavit;
