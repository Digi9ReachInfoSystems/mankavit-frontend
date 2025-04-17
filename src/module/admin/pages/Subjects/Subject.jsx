// SubjectsTable.jsx
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
  CreateButton,
  ButtonContainer
} from "../Subjects/Subject.style"; // Adjust path as needed
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

// Example mock data for rows
const mockData = [
  {
    id: 1,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 2,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 3,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 4,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 5,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 6,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 7,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 8,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 9,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 10,
    subjectName: "CLAT Coaching",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
];

// const TOTAL_ENTRIES = 100;       // e.g. total number of subjects
const ITEMS_PER_PAGE = 10;

export default function Subjects() {
  const [currentPage, setCurrentPage] = useState(1);

  const TOTAL_ENTRIES = mockData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  // Figure out which items to show for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, endIndex);

  // In a real app, you'd set totalPages based on the actual total data length
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
        <>
        <ButtonContainer>
            <Link to={"/admin/subjects/create"}>
            <CreateButton>+ Add Subject</CreateButton></Link>
          </ButtonContainer>
    <Container>
      {/* Table Header Section */}
      <HeaderRow>
        <Title>See All Subjects  <span style={{ color: "#6d6e75",
            fontSize: "12px",
            fontWeight: "400" }}>({currentItems.length}/{TOTAL_ENTRIES})</span></Title>
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect value="Name" onChange={() => {}}>
            <option value="Name">Name</option>
            <option value="MockTests">No. of Mock Test</option>
            <option value="ActiveCourses">Active Courses</option>
          </SortSelect>
        </SortByContainer>
      </HeaderRow>

      {/* Table Wrapper */}
      <TableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>Subject Name</TableHeader>
              <TableHeader>Internal Name</TableHeader>
              <TableHeader>No. of Mock Test</TableHeader>
              <TableHeader>Active Courses</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.subjectName}</TableCell>
                <TableCell>{item.internalName}</TableCell>
                <TableCell>
                  {item.mockTestCount}
                  <a href="#view">View</a>
                </TableCell>
                <TableCell>
                  {item.activeCoursesCount}
                  <a href="#view">View</a>
                </TableCell>
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

      {/* Bottom Info + Pagination */}
      <BottomRow>
        <PageInfo>
          Showing {startIndex + 1}-{Math.min(endIndex, TOTAL_ENTRIES)} from{" "}
          {TOTAL_ENTRIES}
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
        </Pagination>
      </BottomRow>
    </Container>
    </>
  );
}
