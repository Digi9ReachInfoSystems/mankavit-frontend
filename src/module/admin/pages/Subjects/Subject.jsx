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
  SearchWrapper,
  SearchInput,
  SearchIcon,
  CreateButton,
  ButtonContainer
} from "../Subjects/Subject.style"; // Adjust path as needed
import Pagination from "../../component/Pagination/Pagination";
import {CiSearch} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../admin/component/DeleteModal/DeleteModal";

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
  {
    id: 11,
    subjectName: " math",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
  {
    id: 12,
    subjectName: "social",
    internalName: "Anuja Admin",
    mockTestCount: 12,
    activeCoursesCount: 12,
  },
];

// const TOTAL_ENTRIES = 100;       // e.g. total number of subjects
const ITEMS_PER_PAGE = 10;
export default function Subjects() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(mockData);
  const [searchText, setSearchText] = useState("");
  const [Modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // track which ID is being deleted

  const filteredData = data.filter(
    (item) =>
      item.subjectName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.internalName.toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredData.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleClickDelete = () => {
    setData(prevData => {
      const newData = prevData.filter((item) => item.id !== deleteId);
      const newFiltered = newData.filter(
        (item) =>
          item.subjectName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.internalName.toLowerCase().includes(searchText.toLowerCase())
      );
      const newTotalPages = Math.ceil(newFiltered.length / ITEMS_PER_PAGE);
  
      // ✅ Adjust page if current page becomes invalid
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
  
      return newData;
    });
    setModal(false);
    setDeleteId(null);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/subjects/create")}>
          Add Subject
        </CreateButton>
      </ButtonContainer>

      <Container>
        {/* Header */}
        <HeaderRow>
          <Title>
            See All Subjects{" "}
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
              <option value="MockTests">No. of Mock Test</option>
              <option value="ActiveCourses">Active Courses</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        {/* Search Bar */}
        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={24} />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </SearchWrapper>

        {/* Table */}
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
                    {item.mockTestCount}{" "}
                    <a href="#view" style={{ marginLeft: "5px" }}>View</a>
                  </TableCell>
                  <TableCell>
                    {item.activeCoursesCount}{" "}
                    <a href="#view" style={{ marginLeft: "5px" }}>View</a>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                   <BiEditAlt size={20} color="#000000" style={{cursor: "pointer"}}/>
                   <RiDeleteBin6Line
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={TOTAL_ENTRIES}
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
}
