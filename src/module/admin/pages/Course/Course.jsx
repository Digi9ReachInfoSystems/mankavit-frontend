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
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

// Mock data representing table rows
const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  courseName: "CLAT Coaching",
  internalName: "Anuja Admin",
  subjects: 27,
  mockTests: 12,
  enrolled: 27,
  price: 599,
}));

const TOTAL_ENTRIES = 100;
const ITEMS_PER_PAGE = 10;

export default function CoursesTable() {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  // Slicing data for current page (if you actually had 100 items, you'd slice them accordingly)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, endIndex);

  // Generate page numbers (in a real scenario, you’d base it on total data length)
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <ButtonContainer>
       <Link to={"/admin/courses/create"}><CreateButton>+ Add Course</CreateButton></Link>
      </ButtonContainer>
    <Container>
      
      <HeaderRow>
        <Title>See All Course <span style={{ color: "#6d6e75",
            fontSize: "12px",
            fontWeight: "400" }}>(14/24)</span></Title>
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect value="Name" onChange={() => {}}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
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
              <TableHeader>Price</TableHeader>
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
                <TableCell>₹{item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <ActionsContainer>
                    <FiEdit title="Edit" />
                    <FiTrash title="Delete" />
                    <FiEye title="View Details" />
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
          {pages.slice(0, 5).map((page) => (
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
    </Container>
    </>
  );
}
