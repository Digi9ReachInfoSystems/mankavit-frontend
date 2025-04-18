// StudentsTable.jsx
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
} from "../StudentManagement/StudentManagement.style"; // adjust path if needed
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

// Example mock data to demonstrate table rows
const mockData = [
  {
    id: 1,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  },
  {
    id: 2,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Pending",
    status: "Active",
  },
  {
    id: 3,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
  {
    id: 4,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Not Active",
  },
  {
    id: 5,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  },
  {
    id: 6,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Pending",
    status: "Active",
  },
  {
    id: 7,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "20-04-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
  {
    id: 8,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  },
  {
    id: 9,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
  {
    id: 10,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjectsEnrolled: 7,
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
];

const ITEMS_PER_PAGE = 10;

export default function StudentManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  const TOTAL_ENTRIES = mockData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <>
      <ButtonContainer>
        <CreateButton>+ Add Student</CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Students{" "}
            <span
              style={{
                color: "#6d6e75",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value="Name" onChange={() => {}}>
              <option value="Name">Name</option>
              <option value="Status">Status</option>
              <option value="KYCStatus">KYC Status</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>#</TableHeader>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Contact Details</TableHeader>
                <TableHeader>Subject Enrolled</TableHeader>
                <TableHeader>Last Active</TableHeader>
                <TableHeader>KYC Status</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.phone}
                    <br />
                    {item.email}
                  </TableCell>
                  <TableCell>
                    {item.subjectsEnrolled}
                    <a href="#view">View</a>
                  </TableCell>
                  <TableCell>{item.lastActive}</TableCell>
                  <TableCell>{item.kycStatus}</TableCell>
                  <TableCell>{item.status}</TableCell>
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

        <BottomRow>
          <PageInfo>
            Showing {startIndex + 1}-{Math.min(endIndex, TOTAL_ENTRIES)} from {TOTAL_ENTRIES}
          </PageInfo>
          <Pagination>
            {pages.map((page) => (
              <PageButton
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? "active" : ""}
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
