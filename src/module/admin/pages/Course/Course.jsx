// CoursesTable.jsx
import React, { useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
  SortSelect,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ActionsContainer,
  BottomRow,
  PageInfo,
  Pagination,
  PageButton,
  ButtonContainer,
  CreateButton
} from "./Course.style";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../component/DeleteModal/DeleteModal";

// Mock data representing table rows
const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  courseName: "CLAT Coaching",
  internalName: "Anuja Admin",
  subjects: 27,
  mockTests: 12,
  enrolled: 27,
  dateAndTime: "24-08-2023 16:00 IST",
}));

// const TOTAL_ENTRIES = 100;
const ITEMS_PER_PAGE = 10;

export default function CoursesTable() {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
      const [selectedStudent, setSelectedStudent] = useState(null);
    
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  const TOTAL_ENTRIES = mockData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  // Slicing data for current page (if you actually had 100 items, you'd slice them accordingly)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, endIndex);

  // Generate page numbers (in a real scenario, you’d base it on total data length)
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting student:", selectedStudent);
    setDeleteModalOpen(false);
    setSelectedStudent(null);
    // API call goes here
  };

  return (
    <>
    <ButtonContainer>
       <Link to={"/admin/courses/create"}><CreateButton>Add Course</CreateButton></Link>
      </ButtonContainer>
    <Container>
      
      <HeaderRow>
        <Title>See All Course <span style={{ color: "#6d6e75",
            fontSize: "12px",
            fontWeight: "400" }}>({currentItems.length}/{TOTAL_ENTRIES})</span></Title>
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect value="Name" onChange={() => {}}>
            <option value="Name">Name</option>
            <option value="Price">Date and Time IST</option>
            <option value="Enrolled">Enrolled</option>
          </SortSelect>
        </SortByContainer>
      </HeaderRow>

      {/* Table */}
      <TableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>Course Name</TableHeader>
              <TableHeader>Internal Name</TableHeader>
              <TableHeader>No. of Subjects</TableHeader>
              <TableHeader>No. of Mock Test</TableHeader>
              <TableHeader>No. of Student Enrolled</TableHeader>
              <TableHeader>Date and Time IST</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.courseName}</TableCell>
                <TableCell>{item.internalName}</TableCell>
                <TableCell>{item.subjects}</TableCell>
                <TableCell>{item.mockTests}</TableCell>
                <TableCell>
                  {item.enrolled}
                  <a href="#view">View</a>
                </TableCell>
                <TableCell>{item.dateAndTime}</TableCell>
                <TableCell>
                  <ActionsContainer>
                    <BiEditAlt title="Edit" color="#000000" size={20}/>
                    <RiDeleteBin6Line title="Delete" size={20} color="#FB4F4F" onClick={() => handleDeleteClick(item)}/>
                  </ActionsContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>

      {/* Bottom pagination + info row */}
      <BottomRow>
        <PageInfo>
          {/* Hardcoded as "1-10 from 100" for demonstration. In a real app, this should be dynamic. */}
          Showing {startIndex + 1}-{Math.min(endIndex, TOTAL_ENTRIES)} from {TOTAL_ENTRIES}
        </PageInfo>
        <Pagination>
          {pages.map((page) => (
            <PageButton
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageButton>
          ))}
          {/* You can add ellipses / advanced pagination logic as needed */}
        </Pagination>
      </BottomRow>

      <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
    </Container>
    </>
  );
}
