import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ModalOverlay,
  ModalContent,
  CourseList,
  CourseItem,
  CloseButton,
  CloseButtonContainer
} from "../StudentManagement/StudentManagement.style";

import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import CustomModal from "../../component/CustomModal/CustomModal";
import Pagination from "../../component/Pagination/Pagination";
import { getAllStudents } from "../../../../api/userApi";
import { getAllCourses } from "../../../../api/courseApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

const ITEMS_PER_PAGE = 8;

export default function StudentManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt", // default sort by creation time
    direction: "descending", // newest first
  });


  const [modalCourses, setModalCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  const [coursesList, setCoursesList] = useState([]);

  const ts = (item) => {
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.updatedAt) return new Date(item.updatedAt).getTime();
    if (item._id && item._id.length >= 8) {
      return parseInt(item._id.substring(0, 8), 16) * 1000;
    }
    return 0;
  };

  // 1) Fetch all students + courses on mount
  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const [studentResponse, courseResponse] = await Promise.all([
          getAllStudents(), // returns { data: { students: [...] } }
          getAllCourses(),  // returns { data: [ { _id, course_name, … }, … ] }
        ]);

        const students = studentResponse.data?.students || [];
        setData(students.sort((a, b) => ts(b) - ts(a)));

        const courseMap = {};
        (courseResponse.data || []).forEach((course) => {
          courseMap[course._id] = course.course_name;
        });
        setCoursesMap(courseMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setData([]);
        toast.error("Failed to load data. Please try again.");
      }
    };
    fetchStudentsAndCourses();
  }, []);

  // Sorting logic
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];

    if (sortConfig) {
      sortableItems.sort((a, b) => {
        // Handle time-based sort
        if (sortConfig.key === "createdAt") {
          const timeA = ts(a);
          const timeB = ts(b);
          return sortConfig.direction === "ascending"
            ? timeA - timeB
            : timeB - timeA;
        }

        // Handle text-based sorting
        const aValue = (a[sortConfig.key] || "").toString();
        const bValue = (b[sortConfig.key] || "").toString();
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return sortableItems;
  }, [data, sortConfig]);


  // Filtering by “displayName”
  const filteredStudents = sortedData.filter((student) =>
    (student.displayName || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const TOTAL_ENTRIES = filteredStudents.length;
  const totalPages = Math.ceil(TOTAL_ENTRIES / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleViewCourses = (userId) => {
    // 📝 Replace this with an API call if needed
    const dummyCourses = [
      "React Bootcamp",
      "JavaScript Mastery",
      "Node.js Basics",
      "MongoDB Essentials"
    ];

    setCoursesList(dummyCourses);
    setCoursesModalOpen(true);
  };

  // “Delete student” stubs
  const handleDeleteClick = (id) => {
    setSelectedStudent(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    try{
      setData(data.filter((s) => s._id !== selectedStudent));
      setDeleteModalOpen(false);
      toast.success("Data deleted successfully.");
    } catch (err) {
      console.error("Failed to delete item:", err);
      toast.error("Failed to delete data. Please try again.");
    }
  };

  // “View student details” stub
  const handleViewClick = (student) => {
    navigate(`/admin/student-management/view/${student._id}`, {
      state: { student },
    });
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton
          onClick={() => navigate("/admin/student-management/create")}
        >
          Add Student
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            See All Students{" "}
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
            <SortSelect value={sortConfig.key} onChange={(e) => requestSort(e.target.value)}>
              <option value="createdAt">Latest</option>
              <option value="displayName">Name</option>
              <option value="kyc_status">KYC Status</option>
            </SortSelect>

          </SortByContainer>
        </HeaderRow>

        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
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
                <TableHeader
                  onClick={() => requestSort("displayName")}
                  style={{ cursor: "pointer" }}
                >
                  Student Name{" "}
                  {sortConfig.key === "displayName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHeader>
                <TableHeader>Contact Details</TableHeader>
                <TableHeader>Course Enrolled</TableHeader>
                <TableHeader
                  onClick={() => requestSort("kyc_status")}
                  style={{ cursor: "pointer" }}
                >
                  KYC Status{" "}
                  {sortConfig.key === "kyc_status" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHeader>
                <TableHeader>Actions</TableHeader>
                <TableHeader>Update</TableHeader>
                <TableHeader>All Courses</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentItems.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{startIndex + idx + 1}</TableCell>
                  <TableCell>{item.displayName || "N/A"}</TableCell>
                  <TableCell>
                    {item.phone}
                    <br />
                    {item.email}
                  </TableCell>
                  <TableCell>
                    {(item.subscription?.length || 0)}{" "}
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        setModalType("Enrolled Courses");
                        setModalCourses(
                          (item.subscription || []).map(
                            (sub) =>
                              coursesMap[sub.course_enrolled] ||
                              sub.course_enrolled
                          )
                        );
                        setModalOpen(true);
                      }}
                      style={{
                        color: "#007bff",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
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
                      <RiDeleteBin6Line
                        title="Delete"
                        size={20}
                        color="#FB4F4F"
                        onClick={() => handleDeleteClick(item.id)}
                      />
                    </ActionsContainer>
                  </TableCell>
                  <TableCell>
                    {/*
                      Instead of fetching KYC here, we simply navigate
                      to the UpdateKYC page with the user’s ID.
                    */}
                    <FiEdit
                      title="Update KYC"
                      color="#000000"
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/admin/student-management/update-kyc/${item._id}`
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {(item.subscripti?.length || 0)}{" "}

                    <span
                      onClick={() => handleViewCourses(item)}
                      style={{ cursor: "pointer", color: "#007bff", marginLeft: 5 }}
                    >
                      View
                    </span>
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
          title={
            modalType === "Enrolled Courses" ? "Enrolled Courses" : "Modal"
          }
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

      {/* Toast Container for react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {coursesModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ margin: "0rem", backgroundColor: "#f1f1f1", padding: "1rem" }}>All Courses</h2>
            {coursesList.length === 0 ? (
              <p>No courses enrolled.</p>
            ) : (
              <CourseList>
                {coursesList.map((course, index) => (
                  <CourseItem key={index}>{course}</CourseItem>
                ))}
              </CourseList>
            )}
            <CloseButtonContainer>
              <CloseButton onClick={() => setCoursesModalOpen(false)}>Close</CloseButton>
            </CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

    </>
  );
}
