import React, { useState } from "react";
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  PdfLink,
  ActionsWrapper,
  EditButton,
  DeleteButton,
  CreateButton,
  ButtonContainer,
  Container,
  HeaderRow,
  Title
} from "../QuestionPaper/QuestionPaper.style";
import Pagination from "../../../component/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";

const sampleData = [
  {
    id: 1,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: true,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 3,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 4,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 5,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 6,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 7,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 8,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 9,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: true,
  },
  {
    id: 10,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 11,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 12,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 13,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 14,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 15,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 16,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 17,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: true,
  },
  {
    id: 18,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 19,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 20,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 21,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 22,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 23,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 24,
    title: "CLAT Coaching",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  }
];

const ITEMS_PER_PAGE = 10;

const Questionpaper = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(sampleData);
  const [modal, setModal] = useState(false);
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
    const newCurrentPage = currentPage > newTotalPages ? newTotalPages : currentPage;
  
    setData(updatedData);
    setCurrentPage(newCurrentPage);
    setModal(false);
    setDeleteId(null);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/web-management/question-paper/create")}>
          Add Question Paper
        </CreateButton>
      </ButtonContainer>
      <Container>
        <HeaderRow>
          <Title>See all question papers</Title>
        </HeaderRow>
        <TableWrapper>
        <StyledTable>
          <TableHead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>View Pdf</TableHeader>
              <TableHeader>Year</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {currentItems.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <PdfLink href={row.pdfUrl} target="_blank" rel="noopener noreferrer">
                    View
                  </PdfLink>
                </TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>
                  <ActionsWrapper>
                    <BiEditAlt size={20} color="#000" style={{ cursor: "pointer" }} />
                    <RiDeleteBin6Line
                      size={20}
                      color="#FB4F4F"
                      onClick={() => handleDelete(row.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </ActionsWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
        </TableWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {modal && (
        <DeleteModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onDelete={handleClickDelete}
        />
      )}
    </>
  );
};

export default Questionpaper;
