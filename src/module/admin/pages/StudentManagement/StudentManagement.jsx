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

const mockData = [
  {
    id: 1,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 2,
    name: "Alexa",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["English", "History"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 3,
    name: "John Doe",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22", 
    kycStatus: "Not Applied", 
    status: "Inactive",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 4,
    name: "Jane Smith",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["English", "History"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 5,
    name: "Alice Johnson",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Inactive",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 6,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 7,
    name: "Alexa",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["English", "History"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 8,
    name: "John Doe",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22", 
    kycStatus: "Not Applied", 
    status: "Inactive",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 9,
    name: "Jane Smith",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["English", "History"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 10,
    name: "Alice Johnson",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Inactive",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 11,
    name: "Gaurav N",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 12,
    name: "Alexa",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["English", "History"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 13,
    name: "John Doe",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22", 
    kycStatus: "Not Applied", 
    status: "Inactive",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 14,
    name: "Jane Smith",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["English", "History"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Approved",
    status: "Active",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
  {
    id: 15,
    name: "Alice Johnson",
    phone: "+91 9876543210",
    email: "abcd@gmail.com",
    subjects: ["Math", "Physics", "Chemistry"],
    lastActive: "24-07-2024 16:22",
    kycStatus: "Not Applied",
    status: "Inactive",
    passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
    idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
  },
];

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
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
    setViewStudent(student);
    setViewModalOpen(true);
  };
  const handleEdit = (id) => {
    const student = data.find((student) => student.id === id);
    if (student) {
      navigate(`/admin/student-management/edit/${id}`, {
        state: { student }
      });
    }
    console.log("Edit student with ID:", id);
    console.log("Student data:", student);
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/student-management/create")}>Add Student</CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Students <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>({TOTAL_ENTRIES})</span>
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
                  <TableCell>{item.phone}<br />{item.email}</TableCell>
                  <TableCell>
                    {item.subjects.length} <a href="#view" onClick={() => handleViewClick(item)}>View</a>
                  </TableCell>
                  <TableCell>{item.lastActive}</TableCell>
                  <TableCell><StatusWrapper><KycDot status={item.kycStatus} />{item.kycStatus}</StatusWrapper></TableCell>
                  <TableCell><StatusWrapper><StatusDot status={item.status} />{item.status}</StatusWrapper></TableCell>
                  <TableCell>
                    <ActionsContainer>
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
