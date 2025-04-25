import React, { useState } from "react";
import {
  Container,
  Title,
  Form,
  Input,
  Textarea,
  Button,
  TableWrapper,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  ViewLink,
  // IconButton,
  ActionsWrapper,
  BtnTitle,
  AddTestButton,
  TableHead,
} from "./Testinomial.styles";
import Pagination from "../../../component/Pagination/Pagination"; // This is your component
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";

// Dummy testimonial data
const dummyTestimonials = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  course: "CLAT Coaching",
  testimonial:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  student: "Gaurav N",
  date: "24-07-2024",
  time: "16:22",
}));

const ITEMS_PER_PAGE = 5;

const Testimonial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(dummyTestimonials);
  const [Modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    <>
      <BtnTitle>
        <AddTestButton>Testinomial</AddTestButton>
      </BtnTitle>
      <Container>

        <Title>Testimonial</Title>

        <Form>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            placeholder="Write title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <Textarea
            as="textarea"
            id="description"
            placeholder="Write description here"
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button>Create</Button>

        </Form>

        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Course</TableHeader>
                <TableHeader>Testimonial</TableHeader>
                <TableHeader>Student</TableHeader>
                <TableHeader>View Image/Video</TableHeader>
                <TableHeader>Date Updated</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {currentItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.testimonial}</TableCell>
                  <TableCell>{item.student}</TableCell>
                  <TableCell>
                    <ViewLink href="#">View</ViewLink>
                  </TableCell>
                  <TableCell>
                    {item.date} {item.time}
                  </TableCell>
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
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>
      {Modal && (
        <DeleteModal
          isOpen={Modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}
    </>
  );
};

export default Testimonial;
