// src/modules/admin/components/AboutUs/AboutUs.jsx
import React, { useState, useEffect } from "react";
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
} from "./AboutUs.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import {
  createAboutUs,
  getAllAboutUs,
  deleteAboutUsById,
  updateAboutUsById
} from "../../../../../api/aboutUsApi";

const AboutUs = () => {
  // the list
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  // form (id === '' means “new”)
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  // delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // error
  const [error, setError] = useState("");

  // fetch (or re-fetch) the list
  const fetchItems = async () => {
    setLoadingList(true);
    setError("");
    try {
      const data = await getAllAboutUs();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load entries.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  // create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setSaving(true);
    setError("");
    try {
      if (formData.id) {
        await updateAboutUsById(formData.id, {
          title: formData.title,
          description: formData.description,
        });
      } else {
        await createAboutUs({
          title: formData.title,
          description: formData.description,
        });
      }
      // reset form & refresh list
      setFormData({ id: "", title: "", description: "" });
      await fetchItems();
    } catch (err) {
      console.error(err);
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // populate form for editing
  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      title: item.title,
      description: item.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // open delete dialog
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  // confirm deletion
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setError("");
    try {
      await deleteAboutUsById(deleteId);
      await fetchItems();
    } catch (err) {
      console.error(err);
      setError("Delete failed. Please try again.");
    } finally {
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <Container>
      <Title>About us</Title>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* NEW: wrap in <form> */}
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
            placeholder="Write description here"
            rows={8}
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit" disabled={saving}>
          {saving
            ? "Saving..."
            : formData.id
            ? "Update changes"
            : "Add About Us"}
        </Button>
      </form>

      <TableWrapper>
        {loadingList ? (
          <p>Loading...</p>
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
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <BiEditAlt
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(item)}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(item._id)}
                      />
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No records found.</p>
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

export default AboutUs;
