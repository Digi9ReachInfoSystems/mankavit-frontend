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
  KycDot
} from "../StudentManagement/StudentManagement.style";

import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";
import Pagination from "../../component/Pagination/Pagination";
import { getAllStudents } from '../../../../api/userApi';
import { getAllCourses } from '../../../../api/courseApi';

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: 'displayName',
    direction: 'ascending'
  });

  const [modalCourses, setModalCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const [studentResponse, courseResponse] = await Promise.all([
          getAllStudents(),
          getAllCourses()
        ]);

        const students = studentResponse.data?.students || [];
        console.log(students);
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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredStudents = sortedData.filter((student) =>
    (student.displayName || "").toLowerCase().includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredStudents.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteClick = (id) => {
    setSelectedStudent(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter((student) => student._id !== selectedStudent));
    setDeleteModalOpen(false);
  };

  const handleViewClick = (student) => {
    navigate(`/admin/student-management/view/${student._id}`, {
      state: { student }
    });
  };

  const handleEdit = (_id) => {
    const student = data.find((s) => s._id === _id);
    if (student) {
      navigate(`/admin/student-management/edit/${_id}`, {
        state: { student }
      });
    }
  };

  const handleOpenModal = (type, subscription = []) => {
    const courseNames = subscription.map(sub => coursesMap[sub.course_enrolled] || sub.course_enrolled);
    setModalType(type);
    setModalCourses(courseNames);
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
            See All Students{" "}
            <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
              ({currentItems.length}/{TOTAL_ENTRIES})
            </span>
          </Title>

          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect value={sortConfig.key} onChange={(e) => requestSort(e.target.value)}>
              <option value="displayName">Name</option>
              <option value="kyc_status">KYC Status</option>
            </SortSelect>
          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon><CiSearch size={18} /></SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchWrapper>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>#</TableHeader>
                <TableHeader onClick={() => requestSort('displayName')} style={{ cursor: 'pointer' }}>
                  Student Name {sortConfig.key === 'displayName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </TableHeader>
                <TableHeader>Contact Details</TableHeader>
                <TableHeader>Course Enrolled</TableHeader>
                <TableHeader onClick={() => requestSort('kyc_status')} style={{ cursor: 'pointer' }}>
                  KYC Status {sortConfig.key === 'kyc_status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
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
                    {(item.subscription?.length || 0)}{" "}
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal('Enrolled Courses', item.subscription);
                      }}
                      style={{ color: '#007bff', cursor: 'pointer', marginLeft: '5px' }}
                    >
                      View
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusWrapper>
                      <KycDot status={item.kyc_status} />
                      {item.kyc_status}
                    </StatusWrapper>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <IoEyeOutline
                        title="View"
                        color="#000000"
                        size={20}
                        onClick={() => handleViewClick(item)}
                      />
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

      {modalOpen && (
        <CustomModal
          title={modalType === 'Enrolled Courses' ? 'Enrolled Courses' : 'Modal'}
          type={modalType}
          data={modalCourses}
          onClose={() => setModalOpen(false)}
        />
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
