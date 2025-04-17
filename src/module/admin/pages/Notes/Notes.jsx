// NotesTable.jsx
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
  SwitchContainer,
  SwitchHandle,
  ActionsContainer,
  BottomRow,
  PageInfo,
  Pagination,
  PageButton,
  ButtonContainer,
  CreateButton
} from "../Notes/Notes.style"; // Adjust path as needed
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

/* Example mock data for rows */
const initialData = [
  {
    id: 1,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
  {
    id: 2,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: false,
  },
  {
    id: 3,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
  {
    id: 4,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
  {
    id: 5,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: false,
  },
  {
    id: 6,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
  {
    id: 7,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
  {
    id: 8,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
  {
    id: 9,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: false,
  },
  {
    id: 10,
    noteTitle: "CLAT Coaching",
    noteDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subjectsCount: 27,
    lastActive: "24-07-2024 16:22",
    active: true,
  },
];

// const TOTAL_ENTRIES = 100;
const ITEMS_PER_PAGE = 10;

export default function NotesManagement() {
  /* State for table data (including toggle states) */
  const [notesData, setNotesData] = useState(initialData);
  /* Current page for pagination */
  const [currentPage, setCurrentPage] = useState(1);

  const TOTAL_ENTRIES = mockData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  /* Slice data for the current page */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = notesData.slice(startIndex, endIndex);

  /* Total pages based on total data length (100 in this example) */
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  /* Handler for pagination */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /* Handler for toggling "active" state in each row */
  const handleToggleActive = (id) => {
    setNotesData((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, active: !note.active } : note
      )
    );
  };

  return (
      <>
        <ButtonContainer>
            <Link to="/admin/notes/create">
            <CreateButton>+ Add Notes</CreateButton>
            </Link>
          </ButtonContainer>
    <Container>
      {/* Header Section */}
      <HeaderRow>
        <Title>See All Notes <span style={{ color: "#6d6e75",
            fontSize: "12px",
            fontWeight: "400" }}>({currentItems.length}/{TOTAL_ENTRIES})</span></Title>
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect value="Name" onChange={() => {}}>
            <option value="Name">Name</option>
            <option value="LastActive">Last Active</option>
            <option value="Active">Active</option>
          </SortSelect>
        </SortByContainer>
      </HeaderRow>

      {/* Table Section */}
      <TableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>Note Title</TableHeader>
              <TableHeader>Note Description</TableHeader>
              <TableHeader>No. of Subjects</TableHeader>
              <TableHeader>View Subjects</TableHeader>
              <TableHeader>View Pdf</TableHeader>
              <TableHeader>Last Active</TableHeader>
              <TableHeader>Active</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                {/* Note Title */}
                <TableCell>{item.noteTitle}</TableCell>

                {/* Note Description */}
                <TableCell>{item.noteDescription}</TableCell>

                {/* No. of Subjects */}
                <TableCell>{item.subjectsCount}</TableCell>

                {/* View Subjects */}
                <TableCell>
                  <a href="#view-subjects">View</a>
                </TableCell>

                {/* View Pdf */}
                <TableCell>
                  <a href="#view-pdf">View</a>
                </TableCell>

                {/* Last Active */}
                <TableCell>{item.lastActive}</TableCell>

                {/* Active (toggle switch) */}
                <TableCell>
                  <SwitchContainer
                    checked={item.active}
                    onClick={() => handleToggleActive(item.id)}
                  >
                    <SwitchHandle checked={item.active} />
                  </SwitchContainer>
                </TableCell>

                {/* Actions (icons) */}
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
