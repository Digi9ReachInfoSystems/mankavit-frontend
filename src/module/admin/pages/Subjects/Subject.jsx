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
  ButtonContainer,
} from "../Subjects/Subject.style";
import Pagination from "../../component/Pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../admin/component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";

const mockData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  subjectName: "CLAT Coaching",
  internalName: "Anuja Admin",
  mockTest: ["Mock Test 1", "Mock Test 2", "Mock Test 3", "Mock Test 4", "Mock Test 5", "Mock Test 6", "Mock Test 7", "Mock Test 8", "Mock Test 9"],
  activeCourses: ["Course A", "Course B", "Course C", "Course D", "Course E", "Course F", "Course G", "Course H", "Course I"],
  dateandtime: "2023-06-01 10:00 AM",
}));


// const TOTAL_ENTRIES = 100;       // e.g. total number of subjects
const ITEMS_PER_PAGE = 10;
export default function Subjects() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(mockData);
  const [searchText, setSearchText] = useState("");
  const [Modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);


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

  const handleOpenModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };


  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/subject-management/create")}>
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
            <SortSelect value="Name" onChange={() => { }}>
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
                <TableHeader>Date and Time IST</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.subjectName}</TableCell>
                  <TableCell>{item.internalName}</TableCell>

                  <TableCell>
                    {item.mockTest?.length || 0}{" "}
                    <a href="#view" onClick={() => handleOpenModal("mockTests", item.mockTest)}>View</a>

                  </TableCell>

                  <TableCell>
                    {item.activeCourses?.length || 0}{" "}
                    <a href="#view" onClick={() => handleOpenModal("activeCourses", item.activeCourses)}>View</a>
                  </TableCell>

                  <TableCell>{item.dateandtime}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <BiEditAlt size={20} color="#000000" style={{ cursor: "pointer" }} />
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


      {modalOpen && (
        <CustomModal
          title={modalType === "mockTests" ? "Mock Test Details" : "Active Courses"}
          type={modalType}
          data={modalData}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
