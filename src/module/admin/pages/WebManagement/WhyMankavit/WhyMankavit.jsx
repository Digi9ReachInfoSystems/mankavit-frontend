import React, { useState } from 'react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  Input,
  Textarea,
  Button,
  TableWrapper,
  Table,  // Add Table styled component
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
  ActionsWrapper,

} from './WhyMankavit.styles';
import {BiEditAlt} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";

const WhyMankavit = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [Modal, setModal] = useState(false);

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setSubmittedData(formData);
    setFormData({ title: '', description: '' }); // Optional: clear the form after update
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = () => {
    const updatedData = data.filter((item) => item.id !== deleteId);
    const newTotalPages = Math.ceil(updatedData.length / ITEMS_PER_PAGE);
    const newCurrentPage =
      currentPage > newTotalPages ? newTotalPages : currentPage;

    setData(updatedData);
    setCurrentPage(newCurrentPage);
    setModal(false);
    setDeleteId(null);
  };

  return (
    <Container>
      <Title>Why Mankavit</Title>

      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Write title here"
          value={formData.title}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <Textarea
          name="description"
          placeholder="Write description here"
          rows={8}
          value={formData.description}
          onChange={handleChange}
        />
      </FormGroup>

      <Button onClick={handleSubmit}>Update changes</Button>

      {/* Show table if data is submitted */}
      {submittedData && (
        <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            <TableRow>
              <TableCell>{submittedData.title}</TableCell>
              <TableCell>{submittedData.description}</TableCell>
              <TableCell>
                    <ActionsWrapper>
                      <BiEditAlt
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                      />
                      <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ActionsWrapper>
                  </TableCell>
            </TableRow>
          </tbody>
        </Table>
        </TableWrapper>
      )}
            {Modal && (
        <DeleteModal
          isOpen={Modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}
    </Container>
  );
};

export default WhyMankavit;
