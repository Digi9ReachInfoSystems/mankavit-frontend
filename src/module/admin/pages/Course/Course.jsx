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
  ButtonContainer,
  CreateButton,
  SearchWrapper,
  SearchIcon,
  SearchInput
} from "./Course.style";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";


// Mock data representing table rows
const mockData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  courseName: "CLAT Coaching",
  internalName: "Anuja Admin",
  subjects: ["English", "Math", "Reasoning", "Legal Aptitude", "GK"],
  mockTests: ["Test 1", "Test 2", "Test 3"],
  enrolled: ["Alice", "Bob", "Charlie", "Siri", "Rahul", "Alexa", "Akshay", "Robin"],
  dateAndTime: "24-08-2023 16:00 IST",
}));


// const TOTAL_ENTRIES = 100;
const ITEMS_PER_PAGE = 10;

export default function CoursesTable() {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState(mockData);
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);




  const filteredStudents = data.filter((student) =>
    student.courseName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  const TOTAL_ENTRIES = filteredStudents.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);

  // Slicing data for current page (if you actually had 100 items, you'd slice them accordingly)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredStudents.slice(startIndex, endIndex);

  const handleDeleteClick = (id) => {
    setSelectedStudent(id);
    setDeleteModalOpen(true);
  };

  const openModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };


  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => { navigate("/admin/courses/create") }}>Add Course</CreateButton>
      </ButtonContainer>
      <Container>

        <HeaderRow>
          <Title>See All Course <span style={{
            color: "#6d6e75",
            fontSize: "12px",
            fontWeight: "400"
          }}>({currentItems.length}/{TOTAL_ENTRIES})</span></Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value="Name" onChange={() => { }}>
              <option value="Name">Name</option>
              <option value="Price">Date and Time IST</option>
              <option value="Enrolled">Enrolled</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={24} />
          </SearchIcon>
          <SearchInput placeholder="Search" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} />
        </SearchWrapper>

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
                  <TableCell>{item.subjects.length}<a href="#view" onClick={() => openModal("subjects", item.subjects)}>View</a></TableCell>
                  <TableCell>{item.mockTests.length}<a href="#view" onClick={() => openModal("mockTests", item.mockTests)}>View</a></TableCell>
                  <TableCell>{item.enrolled.length}<a href="#view" onClick={() => openModal("enrolled", item.enrolled)}>View</a></TableCell>


                  <TableCell>{item.dateAndTime}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <BiEditAlt title="Edit" color="#000000" size={20} />
                      <RiDeleteBin6Line title="Delete" size={20} color="#FB4F4F" onClick={() => handleDeleteClick(item.id)} />
                    </ActionsContainer>
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
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => {
            setData(prevData => prevData.filter(item => item.id !== selectedStudent));
            setDeleteModalOpen(false);
            setSelectedStudent(null);
          }}
        />

        {modalOpen && (
          <CustomModal
            title={
              modalType === "subjects" ? "mockTests" : "enrolled"
            }
            type={modalType}
            data={modalData}
            onClose={() => setModalOpen(false)}
          />
        )}

      </Container>
    </>
  );
}
