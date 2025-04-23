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
  ButtonContainer,
  CreateButton,
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  StudentList,
  StudentItem,
  CloseButtonContainer,
  CloseButton,
  StatusWrapper,
  KycDot,
  StatusDot,
  SearchWrapper,
  SearchIcon,
  SearchInput
} from "../StudentManagement/StudentManagement.style"; 

import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination"; 


const mockData = [
  {
    id: 1,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: [],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  },
  {
    id: 2,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Pending",
    status: "Active",
  },
  {
    id: 3,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
  {
    id: 4,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Not Active",
  },
  {
    id: 5,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  },
  {
    id: 6,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Pending",
    status: "Active",
  },
  {
    id: 7,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],

    lastActive: "20-04-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
  {
    id: 8,
    name: "Alexa",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
  },
  {
    id: 9,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
  {
    id: 10,
    name: "Siri",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],

    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
  },
];

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
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

  const handleViewClick = (student) => {
    setViewStudent(student);
    setViewModalOpen(true);
  };


  return (
    <>
      <ButtonContainer>
        <CreateButton> Add Student</CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Students{" "}
            <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
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
          <SearchIcon>
            <CiSearch size={24} />
          </SearchIcon>
          <SearchInput placeholder="Search" value={searchText}
          onChange={(e) => setSearchText(e.target.value)}/>
        </SearchWrapper>

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
                    {item.subjects?.length || 0}{" "}
                    <a href="#view" onClick={() => handleViewClick(item)}>View</a>
                  </TableCell>
                  <TableCell>{item.lastActive}</TableCell>

                  <TableCell>
                    <StatusWrapper>
                      <KycDot status={item.kycStatus} />
                      {item.kycStatus}
                    </StatusWrapper>
                  </TableCell>

                  <TableCell>
                    <StatusWrapper>
                      <StatusDot status={item.status} />
                      {item.status}
                    </StatusWrapper>
                  </TableCell>                  <TableCell>
                    <ActionsContainer>
                      <BiEditAlt title="Edit" color="#000000" size={20} />
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
          onPageChange={setCurrentPage}
          totalItems={TOTAL_ENTRIES}
          itemsPerPage = {ITEMS_PER_PAGE}
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


        {viewModalOpen && viewStudent && (
          <ModalOverlay>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>Subjects Enrolled</ModalTitle>
              </ModalHeader>

              <StudentList>
                {viewStudent.subjects?.length > 0 ? (
                  viewStudent.subjects.map((subject, index) => (
                    <StudentItem key={index}>{subject}</StudentItem>
                  ))
                ) : (
                  <StudentItem>No subjects enrolled.</StudentItem>
                )}
              </StudentList>

              <CloseButtonContainer>
                <CloseButton onClick={() => setViewModalOpen(false)}>Close</CloseButton>
              </CloseButtonContainer>
            </ModalContainer>
          </ModalOverlay>
        )}


      </Container>
    </>
  );
}
