import React, { useEffect, useState } from 'react';
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
import { getAllStudents } from '../../../../api/userApi';
import { getAllCourses } from '../../../../api/courseApi';
// const mockData = [
//   {
//     id: 1,
//     name: "Gaurav N",
//     phone: "+91 9876543210",
//     email: "abcd@gmail.com",
//     subjects: ["Math", "Physics", "Chemistry"],
//     lastActive: "24-07-2024 16:22",
//     kycStatus: "Not Applied",
//     status: "Active",
//     passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
//     idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
//   },
//   {
//     id: 2,
//     name: "Alexa",
//     phone: "+91 9876543210",
//     email: "abcd@gmail.com",
//     subjects: ["English", "History"],
//     lastActive: "24-07-2024 16:22",
//     kycStatus: "Approved",
//     status: "Active",
//     passport : "https://th.bing.com/th/id/R.5f4b139697dd011110215753cc154192?rik=maBoY7975iFZaA&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2017%2f03%2fus-passport.jpg&ehk=V2Hb7izI4QRjBB9rh2OlabRcDeJbnZDdaetVrzD54Lw%3d&risl=&pid=ImgRaw&r=0",
//     idProof : "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
//   },
// ];

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
const [coursesMap, setCoursesMap] = useState({});

useEffect(() => {
  const fetchStudentsAndCourses = async () => {
    try {
      const [studentResponse, courseResponse] = await Promise.all([
        getAllStudents(),
        getAllCourses()
       
      ]);
       console.log("Student response:", studentResponse);

      const students = studentResponse.data?.students || [];
      setData(students);

      // Create map: courseId -> courseName
      const courseMap = {};
      courseResponse.data.forEach((course) => {
        courseMap[course._id] = course.course_name;
      });
      setCoursesMap(courseMap);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };
  fetchStudentsAndCourses();
}, []);



// Moved BELOW the data state
const filteredStudents = Array.isArray(data)
  ? data.filter((student) =>
      (student.displayName || "")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
  : [];


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
    navigate(`/admin/student-management/view/${student._id}`, {
      state: { student }
    });
    console.log("View student with ID:", student._id);
  };
  
 const handleEdit = (_id) => {
  const student = data.find((student) => student._id === _id);
  if (student) {
    navigate(`/admin/student-management/edit/${_id}`, {
      state: { student }
    });
  }
};

const handleDeleteConfirm = () => {
  setData(data.filter((student) => student._id !== selectedStudent));
  setDeleteModalOpen(false);
};
const [modalCourses, setModalCourses] = useState([]);
const [modalOpen, setModalOpen] = useState(false);

const handleViewCourses = (student) => {
  const enrolledNames = (student.subscription || []).map(sub =>
    coursesMap[sub.course_enrolled] || sub.course_enrolled
  );
  setModalCourses(enrolledNames);
  setModalOpen(true);
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
                <TableHeader>Course enrolled</TableHeader>
                <TableHeader>KYC Status</TableHeader>
                {/* <TableHeader>Status</TableHeader> */}
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
           <TableBody>
  {currentItems.map((item, index) => (
    <TableRow key={item._id}>
      <TableCell>{startIndex + index + 1}</TableCell>
      <TableCell>{item.displayName || "N/A"}</TableCell>
      <TableCell>{item.phone}<br />{item.email}</TableCell>
     <TableCell>
  {Array.isArray(item.subscription) && item.subscription.length > 0 ? (
    <>
      {item.subscription.length}{" "}
      <a href="#view" onClick={(e) => {
        e.preventDefault();
        handleViewCourses(item);
      }}>View</a>
    </>
  ) : (
    "No Courses"
  )}
</TableCell>


      <TableCell>
       <StatusWrapper>
  <KycDot status={item.kyc_status} />
  {item.kyc_status}
</StatusWrapper>

      </TableCell>

      {/* <TableCell>
        <StatusWrapper>
          <StatusDot status={item.status || "Inactive"} />
          {item.status || "Inactive"}
        </StatusWrapper>
      </TableCell>
       */}
      <TableCell>
        <ActionsContainer>
          <IoEyeOutline title="View" color="#000000" size={20} onClick={() => handleViewClick(item)} />
          {/* <BiEditAlt title="Edit" color="#000000" size={20} onClick={() => handleEdit(item._id)} /> */}
          {/* <RiDeleteBin6Line size={20} color="#FB4F4F" title="Delete" onClick={() => handleDeleteClick(item._id)} /> */}
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
