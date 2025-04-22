import React from "react";
import { useState } from "react";
import {
//   TableWrapper,
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
  PaginationContainer,
  PageButton,
  Container,
  HeaderRow,
  Title
} from "../QuestionPaper/QuestionPaper.style";

// import the icons you like:
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const sampleData = [
  {
    id: 1,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: true,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  {
    id: 2,
    title: "CLAT Coaching",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    pdfUrl: "/path/to/file.pdf",
    year: 2024,
    showcase: false,
  },
  // ...more rows
];const Questionpaper = ({ data = sampleData, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(data.length / rowsPerPage);
  
    const start = (currentPage - 1) * rowsPerPage;
    const pageData = data.slice(start, start + rowsPerPage);
  
    return (
      <>
        <ButtonContainer>
          <Link to="/admin/web-management/question-paper/create">
            <CreateButton>Add Question Paper</CreateButton>
          </Link>
        </ButtonContainer>
        <Container>
                  <HeaderRow>
                    <Title>See all question papers </Title>
                  
                  </HeaderRow>
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
              {pageData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <PdfLink href={row.pdfUrl} target="_blank">
                      View
                    </PdfLink>
                  </TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <EditButton onClick={() => onEdit(row)}>
                        <FaEdit size={16} />
                      </EditButton>
                      <DeleteButton onClick={() => onDelete(row)}>
                        <FaTrash size={16} />
                      </DeleteButton>
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
  
          <PaginationContainer>
            <PageButton
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </PageButton>
  
            {Array.from({ length: totalPages }, (_, i) => (
              <PageButton
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PageButton>
            ))}
  
            <PageButton
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </PageButton>
          </PaginationContainer>
        </Container>
      </>
    );
  };
  
  export default Questionpaper;