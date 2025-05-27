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
  const [sortConfig, setSortConfig] = useState({
    key: 'displayName',
    direction: 'ascending'
  });

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const [studentResponse, courseResponse] = await Promise.all([
          getAllStudents(),
          getAllCourses()
        ]);
        
        const students = studentResponse.data?.students || [];
        setData(students);

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

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle cases where values might be null or undefined
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Filter and paginate the sorted data
  const filteredStudents = Array.isArray(sortedData)
    ? sortedData.filter((student) =>
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
            See All Students <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>({currentItems.length}/{TOTAL_ENTRIES})</span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect 
              value={sortConfig.key}
              onChange={(e) => requestSort(e.target.value)}
            >
              <option value="displayName">Name</option>
              <option value="kyc_status">KYC Status</option>
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
                <TableHeader 
                  onClick={() => requestSort('displayName')}
                  style={{ cursor: 'pointer' }}
                >
                  Student Name
                  {sortConfig.key === 'displayName' && (
                    sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
                  )}
                </TableHeader>
                <TableHeader>Contact Details</TableHeader>
                <TableHeader>Course enrolled</TableHeader>
                <TableHeader 
                  onClick={() => requestSort('kyc_status')}
                  style={{ cursor: 'pointer' }}
                >
                  KYC Status
                  {sortConfig.key === 'kyc_status' && (
                    sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
                  )}
                </TableHeader>
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
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline title="View" color="#000000" size={20} onClick={() => handleViewClick(item)} />
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