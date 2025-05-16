import React, { useState } from 'react';
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
  SearchInput,
  StatusWrapper,
  KycDot,
  StatusDot
} from "../StudentManagement/StudentManagement.style";

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";
import Pagination from "../../component/Pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    duration: '2 hours',
    video: 'https://example.com/video.mp4',
    courses: 'NEET, JEE',
    subjects: 'Physics, Chemistry',
  },
  {
    id: 2,
    name: 'Jane Smith',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    duration: '1 hour',
    video: 'https://example.com/video.mp4',
    courses: 'NEET, CET',
    subjects: 'Maths, Biology',
  }
];

const ITEMS_PER_PAGE = 8;

export default function Lecturer() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(mockData);

  const filteredStudents = data.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredStudents.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredStudents.slice(startIndex, endIndex);

  const handleDeleteClick = (id) => {
    setSelectedStudent(id);
    setDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    setData(data.filter((student) => student.id !== selectedStudent));
    setDeleteModalOpen(false);
  };
  
  const handleViewClick = (student) => {
    navigate(`/admin/lecturer-management/view/${student.id}`, {
      state: { student }
    });
    console.log("View student with ID:", student.id);
  };
  
  const handleEdit = (id) => {
    const student = data.find((student) => student.id === id);
    if (student) {
      navigate(`/admin/lecturer-management/edit/${id}`, {
        state: { student }
      });
    }
    console.log("Edit student with ID:", id);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/lecturer-management/create")}>Add Lecturer</CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Lecturers <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>({TOTAL_ENTRIES})</span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value="Name" onChange={() => { }}>
              <option value="Name">Name</option>
              <option value="Status">Status</option>
              <option value="KYCStatus">KYC Status</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
          <SearchInput placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>#</TableHeader>
                <TableHeader>Lecturer Name</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Duration</TableHeader>
                <TableHeader>Video </TableHeader>
                <TableHeader>No of Courses</TableHeader>
                <TableHeader>No of Subject</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {item.duration}
                  </TableCell>
                  <TableCell> <a href="#view" onClick={() => handleViewClick(item)}>View</a></TableCell>
                  <TableCell>{item.courses.length} <a href="#view" onClick={() => handleViewClick(item)}>View</a></TableCell>
                  <TableCell>{item.subjects.length} <a href="#view" onClick={() => handleViewClick(item)}>View</a></TableCell>
                  <TableCell>
                    <ActionsContainer>
                    <IoEyeOutline title="View" color="#000000" size={20} onClick={() => handleViewClick(item)} />
                    <BiEditAlt title="Edit" color="#000000" size={20} onClick={() => handleEdit(item.id)} />
                      <RiDeleteBin6Line size={20} color="#FB4F4F" title="Delete" onClick={() => handleDeleteClick(item.id)} />
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
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

      {viewModalOpen && (
        <CustomModal onClose={() => setViewModalOpen(false)}>
          <h3>Subjects Enrolled</h3>
          <ul>
            {viewStudent.subjects.map((subject, i) => (
              <li key={i}>{subject}</li>
            ))}
          </ul>
        </CustomModal>
      )}

      {deleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}
    </>
  );
}