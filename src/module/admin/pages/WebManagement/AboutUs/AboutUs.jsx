import React, { useState, useEffect, useMemo, useRef } from "react";
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
  EditorWrapper
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { getAuth } from "../../../../../utils/authService";
import JoditEditor from "jodit-react";

const AboutUs = () => {
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const editor = useRef(null);
  const [error, setError] = useState("");
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"]?.readOnly || false);
      }
    }
    apiCaller();
  }, []);

  const fetchItems = async () => {
    setLoadingList(true);
    setError("");
    try {
      const data = await getAllAboutUs();
      const sorted = (Array.isArray(data) ? data : []).sort(
        (a, b) =>
          new Date(b.createdAt || b.updatedAt) -
          new Date(a.createdAt || a.updatedAt)
      );
      setItems(sorted);
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

  const config = useMemo(() => ({
    readonly: readOnlyPermissions,
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
  }), [readOnlyPermissions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleEditorChange = (newContent) => {
    setFormData((prev) => ({ ...prev, description: newContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(readOnlyPermissions) {
      toast.error("You don't have permission to create or update data.");
      return;
    }
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (formData.id) {
        await updateAboutUsById(formData.id, {
          title: formData.title,
          description: formData.description,
        });
        toast.success("Data updated successfully!");
      } else {
        const newItem = await createAboutUs({
          title: formData.title,
          description: formData.description,
        });
        toast.success("Data added successfully!");
        setItems((prev) => [newItem, ...prev]);
      }
      setFormData({ id: "", title: "", description: "" });
      await fetchItems();
    } catch (err) {
      console.error(err);
      const action = formData.id ? "update" : "create";
      toast.error(`Failed to ${action}. Please try again.`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      title: item.title,
      description: item.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setError("");
    try {
      await deleteAboutUsById(deleteId);
      toast.success("Data deleted successfully!");
      await fetchItems();
    } catch (err) {
      console.error(err);
      setError("Delete failed. Please try again.");
      toast.error("Failed to delete. Please try again.");
    } finally {
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <Container>
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
        theme='colored'
      />

      <Title>About us</Title>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Write title here"
            value={formData.title}
            onChange={(e) => {
              const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
              setFormData({ ...formData, title: filteredData });
            }}
            disabled={readOnlyPermissions}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <EditorWrapper>
            <JoditEditor
              ref={editor}
              value={formData.description}
              config={config}
              onBlur={handleEditorChange}
              onChange={handleEditorChange}
            />
          </EditorWrapper>
        </FormGroup>

        {!readOnlyPermissions && (
          <Button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : formData.id
                ? "Update changes"
                : "Add About Us"}
          </Button>
        )}
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
                {!readOnlyPermissions && <TableHeader>Action</TableHeader>}
              </TableRow>
            </TableHead>
            <tbody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: item.description }} />
                  {!readOnlyPermissions && (
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
                  )}
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